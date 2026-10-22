"""Read-only release checks for exported HTML. No external requests."""
import json
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.ids, self.links, self.images, self.text = [], [], [], []
        self.hidden = 0
        self.title = False
        self.title_text = ''
        self.description = ''
        self.h1 = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'):
            self.hidden += 1
        if tag == 'title':
            self.title = True
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description = attrs.get('content', '')
        if tag == 'h1':
            self.h1 += 1
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'img':
            self.images.append(attrs)

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.hidden -= 1
        if tag == 'title':
            self.title = False

    def handle_data(self, text):
        if self.title:
            self.title_text += text
        elif not self.hidden and text.strip():
            self.text.append(text.strip())


root = Path(sys.argv[1]).resolve()
pages = {p: Page(p.read_text(encoding='utf-8')) for p in root.rglob('*.html')}
issues, inventory, client_routes = [], [], []
catalog = Path(__file__).resolve().parents[3] / 'app/design-system/catalog.ts'
pattern_ids = set(re.findall(r"pattern\('([^']+)'", catalog.read_text(encoding='utf-8')))
for path, page in pages.items():
    route = '/' + path.relative_to(root).as_posix()
    route = route.removesuffix('index.html')
    duplicates = [key for key, count in Counter(page.ids).items() if count > 1]
    if duplicates:
        issues.append({'route': route, 'duplicate_ids': duplicates})
    if page.h1 != 1:
        issues.append({'route': route, 'h1_count': page.h1})
    if not page.title_text or not page.description:
        issues.append({'route': route, 'metadata': 'missing title or description'})
    for image in page.images:
        if 'alt' not in image:
            issues.append({'route': route, 'missing_alt': image.get('src')})
    for href in page.links:
        url = urlsplit(urljoin('https://local.test' + route, href))
        if url.scheme not in ('http', 'https') or url.netloc != 'local.test':
            continue
        target = root / unquote(url.path).lstrip('/')
        if target.is_dir():
            target /= 'index.html'
        if not target.exists():
            issues.append({'route': route, 'missing_link': href})
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            if route == '/design-system/' and url.fragment in pattern_ids:
                client_routes.append(href)
            else:
                issues.append({'route': route, 'missing_anchor': href})
    text = ' '.join(page.text)
    for token in ['Lorem ipsum', '[NEED:', 'Reading the tea leaves', 'How not to design an AI assistant', '\ufffd']:
        if token.casefold() in text.casefold():
            issues.append({'route': route, 'stale_or_placeholder': token})
    inventory.append({'route': route, 'title': page.title_text, 'description': page.description,
                      'h1': page.h1, 'links': len(page.links), 'images': len(page.images)})

result = {'export_root': str(root), 'pages': len(pages), 'issues': issues,
          'client_routes': sorted(set(client_routes)),
          'client_route_note': 'DesignSystemExplorer handles these declared pattern IDs through hashchange. Runtime navigation remains unverified.',
          'inventory': inventory}
print(json.dumps(result, indent=2, ensure_ascii=True))
sys.exit(bool(issues))
