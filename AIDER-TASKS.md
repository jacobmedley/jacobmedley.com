# Aider Task Queue — jacobmedley.com SPA refactor
# Run each block independently. Aider auto-commits each one.
# Model: ollama/jacobmedley-coder (default from .aider.conf.yml)

---

## PHASE 0 — Setup

```bash
# 0-A: Activate Bootstrap 5.3.8 and rebuild CSS
npm install && npm run build
```

```bash
# 0-B: Add dev-dependency scripts and tools to package.json
aider --message "Add the following devDependencies and scripts to package.json.
devDependencies: htmlhint@^1.1.4, stylelint@^16.0.0, stylelint-config-standard-scss@^13.0.0
Scripts to add (keep existing watch and build):
  \"lint:html\": \"htmlhint index.html components/*.html\",
  \"lint:scss\": \"stylelint scss/**/*.scss\",
  \"a11y\": \"echo 'Run axe in browser devtools or via Live Server'\"
Do not remove any existing scripts." package.json
```

---

## PHASE 1 — Archive

```bash
# 1-A: Create archive folder and move files
mkdir -p archive/components archive/js
mv portfolio.html archive/
mv portfolio-of-work.html archive/
mv js/include.js archive/js/
mv components/section-pow-hi.html archive/components/
mv components/section-pow-work.html archive/components/
mv components/section-work.html archive/components/
mv components/nav-main.html archive/components/
mv components/section-results.html archive/components/
mv components/section-quote.html archive/components/
mv components/bu archive/ 2>/dev/null || true
git add -A && git commit -m "archive: move superseded files to archive/"
```

Wait — section-quote.html is being RESTORED to active use by app.js (testimonials).
Do NOT archive section-quote.html. Archive all others listed above.

Corrected command:
```bash
mkdir -p archive/components archive/js
mv portfolio.html archive/
mv portfolio-of-work.html archive/
mv js/include.js archive/js/
mv components/section-pow-hi.html archive/components/
mv components/section-pow-work.html archive/components/
mv components/section-work.html archive/components/
mv components/nav-main.html archive/components/
mv components/section-results.html archive/components/
mv components/bu archive/ 2>/dev/null || true
git add -A && git commit -m "archive: move superseded files to archive/"
```

---

## PHASE 2 — HTML / WCAG Fixes

```bash
# 2-A: Fix deprecated xlink:href → href in all remaining component wave SVGs
# (section-hi.html, section-resume.html, section-education.html, section-quote.html)
aider --message "In all these files, replace every instance of xlink:href with href
in the SVG <use> elements. Do not change anything else." \
  components/section-hi.html \
  components/section-resume.html \
  components/section-education.html \
  components/section-quote.html
```

```bash
# 2-B: Fix heading levels in resume and education sections
aider --message "In section-resume.html, change the outer section heading from h3 to h2
(keep all classes unchanged). In section-education.html, do the same — change
the outer section heading h3 to h2 (keep all classes).
Do not change any other elements." \
  components/section-resume.html \
  components/section-education.html
```

```bash
# 2-C: Add aria-hidden to all decorative Font Awesome icons in section-hi.html
# and section-quote.html that are currently missing it
aider --message "Add aria-hidden=\"true\" to every <i class=\"fa-...\">, <i class=\"fak ...\">
element that is purely decorative (not the only content of a link or button).
Add role=\"img\" and a meaningful aria-label only to icons that ARE the sole
content of a link or button. Apply to both files." \
  components/section-hi.html \
  components/section-quote.html
```

```bash
# 2-D: Wrap section-quote.html testimonials in semantic blockquote + cite markup
aider --message "In section-quote.html, wrap each carousel quote text in a <blockquote>
element and the attribution (name and title) in a <cite> element.
Keep all existing Bootstrap carousel classes and structure intact.
Do not change any CSS classes." \
  components/section-quote.html
```

---

## PHASE 7 — CSS Rebuild (after any SCSS changes)

```bash
npm run build
git add css/styles.css && git commit -m "build: rebuild CSS"
```

---

## Notes
- Run phases in order. Phase 0 must complete before Phase 7.
- Phase 1 archive moves are git-tracked (mv + commit), so /undo works.
- Aider uses jacobmedley-coder (14B) for all edits above.
- Claude Code handles: app.js, router.js, renderer.js, JSON files, index.html — already done.
