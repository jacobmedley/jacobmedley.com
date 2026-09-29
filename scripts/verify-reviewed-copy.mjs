// Acceptance for B80–B87. Compare approved wording and protected data with
// the reviewed application base; never load an older, unreconciled revision.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'

const base = '3973411562db116044a337de7586b236ea306260'
const read = file => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
const before = file => execFileSync('git', ['show', `${base}:${file}`], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).replace(/\r\n/g, '\n')
const packetRoot = 'docs/reviews/all-copy-review-20260928/'
const packet = ['01-site-and-projects.md', '02-reading-pages.md', '03-source-and-interface.md'].map(file => read(packetRoot + file))
const register = read('docs/copy-register.md')
const checks = []
const check = (name, action) => { action(); checks.push(name) }
const normalize = value => JSON.parse(JSON.stringify(value))
function loadProjects(source) {
  const exports = {}
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports })
  return normalize(exports.projects)
}
function variables(source, names) {
  const ast = ts.createSourceFile('source.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const result = {}
  const visit = node => {
    if (ts.isVariableDeclaration(node) && names.includes(node.name.getText(ast))) {
      const initializer = node.initializer.getText(ast)
      result[node.name.getText(ast)] = normalize(vm.runInNewContext(`(${initializer})`))
    }
    ts.forEachChild(node, visit)
  }
  visit(ast)
  return result
}
function walk(value, fn) {
  if (!value || typeof value !== 'object') return
  fn(value)
  Object.values(value).forEach(child => walk(child, fn))
}
const values = (value, property) => {
  const found = []
  walk(value, item => { if (typeof item[property] === 'string') found.push(item[property]) })
  return found
}
const strings = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : []
const parts = (text, level) => {
  const matches = [...text.matchAll(new RegExp(`^${'#'.repeat(level)} (.+)$`, 'gm'))]
  return matches.map((m, i) => ({ title: m[1], text: text.slice(m.index + m[0].length, matches[i + 1]?.index ?? text.length).trim() }))
}
const getPart = (text, title, level) => {
  const matches = parts(text, level).filter(s => s.title === title)
  assert.equal(matches.length, 1, title)
  return matches[0].text
}
const paragraphs = text => text.trim().split(/\n\s*\n/).map(p => p.replace(/\n/g, ' '))
const proseOnly = text => paragraphs(text).filter(p =>
  !/^(?:#|\*\*|Evidence:|Placement:|Retain |Keep |Remove |Do not |This completes |No conversion|The two-sprints|Frugal Francine is|Navigation label:|- |Read the |Append a |Original heading|Locate original|Use this )/.test(p))
const projects = loadProjects(read('lib/data/projects.ts'))
const oldProjects = loadProjects(before('lib/data/projects.ts'))
const copy = JSON.parse(read('docs/case-study-site-copy.json'))
const oldCopy = JSON.parse(before('docs/case-study-site-copy.json'))
const site = variables(read('components/sections/ResumeSection.tsx'), ['leadershipLeft', 'leadershipRight', 'designLeadershipIntro', 'experience', 'mentorship', 'expertise', 'tools'])
const oldSite = variables(before('components/sections/ResumeSection.tsx'), ['experience', 'tools'])
const projectIds = ['webmd', 'dentalplans', 'bumblebeemd', 'hydra', 'opfred', 'split-test', 'call-center-ux', 'marketing-auto', 'workshops', 'roadmap', 'personas', 'reveal', 'viva', 'wrong']
const slugs = ['one-platform-five-properties', 'building-a-design-function', 'one-customer-journey', 'navigation-beyond-opinion', 'tokens-before-pages', 'a-checkout-decision-with-receipts']

check('Complete register, unique B80–B87, unchanged B79', () => {
  for (let n = 80; n <= 87; n++) assert.equal((register.match(new RegExp(`^## B${n}\\.`, 'gm')) ?? []).length, 1)
  const ruling = text => text.slice(text.indexOf('## B79.'), text.indexOf('\n---', text.indexOf('## B79.')))
  assert.equal(ruling(register), ruling(before('docs/copy-register.md')))
  for (const file of packet) {
    for (const p of paragraphs(file.slice(file.indexOf('## B8')))) {
      if (p.length > 100 && !p.startsWith('#') && !p.startsWith('Read the adjacent')) assert(register.replace(/\n/g, ' ').includes(p), 'Full reviewed wording registered')
    }
  }
})
check('All 14 project identities and five approved cards', () => {
  assert.deepEqual(projects.map(p => p.id), projectIds)
  projects.forEach((p, i) => {
    const old = oldProjects[i]
    for (const key of ['id', 'section', 'display', 'disciplines', 'visible', 'order', 'caseStudyTheme', 'subtitle', 'thumb', 'cardImage', 'heroBrandImage', 'icon']) assert.deepEqual(p[key], old[key], `${p.id}: ${key}`)
    if (i < 5) for (const key of ['title', 'summary', 'subtitle', 'caseStudyTheme']) assert.equal(p[key], old[key], `${p.id} approved ${key}`)
    assert(!('technologies' in p), `${p.id}: removed inventory`)
  })
  assert(!read('lib/data/projects.ts').includes('technologies:'))
  assert(!read('components/ui/CaseStudyModal.tsx').includes('project.technologies'))
})
check('Every evidence image and diagram retained', () => {
  projects.forEach((p, i) => {
    assert.deepEqual(values(p, 'src').sort(), values(oldProjects[i], 'src').sort(), `${p.id} image multiset`)
    assert.deepEqual(values(p, 'kind').sort(), values(oldProjects[i], 'kind').sort(), `${p.id} explanatory artwork`)
    const diagrams = [], oldDiagrams = []
    walk(p, x => { if (x.type === 'progress-diagram') diagrams.push({ bands: x.bands, rows: x.rows }) })
    walk(oldProjects[i], x => { if (x.type === 'progress-diagram') oldDiagrams.push({ bands: x.bands, rows: x.rows }) })
    assert.deepEqual(diagrams, oldDiagrams, `${p.id} diagram architecture`)
  })
  assert.equal(execFileSync('git', ['diff', '--name-only', base, '--', 'images', 'public/assets'], { encoding: 'utf8' }).trim(), '')
  const expectedAlt = {
    '/images/work/bmd-modal/images.png': 'BumblebeeMD image treatments',
    '/images/work/bmd-modal/buy-box.png': 'BumblebeeMD plan-selection boxes',
  }
  walk(projects, block => {
    if (block.src in expectedAlt) assert.equal(block.alt, expectedAlt[block.src])
  })
  assert(!values(projects, 'alt').includes('BumblebeeMD Homepage Desktop'))
})
check('Complete project prose, contributions, and chapter sequence', () => {
  const featured = parts(getPart(packet[0], 'B82. Five featured case studies [PENDING]', 2), 3)
  const supporting = parts(getPart(packet[0], 'B83. Nine supporting project stories [PENDING]', 2), 3)
  ;[...featured, ...supporting].forEach((review, i) => {
    const actual = strings(projects[i])
    const chapters = parts(review.text, 4)
    assert.equal(projects[i].briefHeading, chapters[0].title)
    for (const chapter of chapters) {
      assert(actual.includes(chapter.title), `${projects[i].id}: heading ${chapter.title}`)
      for (const p of proseOnly(chapter.text)) assert(actual.includes(p), `${projects[i].id}: paragraph missing from ${chapter.title}`)
    }
    const labels = review.text.match(/\*\*Contributions:\*\* (.+)/)[1].split(' · ')
    assert.deepEqual(projects[i].contributions.map(c => c.label), labels)
    for (const p of projects[i].brief.paragraphs) assert(review.text.includes(p), `${projects[i].id}: obsolete opener`)
    walk(projects[i].media, block => {
      if (block.type === 'text') assert(!/^(Evidence:|Placement:|Keep the|Remove the|Retain the|Do not|No conversion-lift)/.test(block.text), `${projects[i].id}: instruction rendered`)
    })
  })
  const web = projects[0], media = web.media
  const headings = media.filter(b => b.type === 'heading').map(b => b.text)
  assert.deepEqual(headings.filter(h => ['The Strategy', 'Recognize Intent', 'Support the Decision', 'Move to Action', 'From design to revenue'].includes(h)), ['The Strategy', 'Recognize Intent', 'Support the Decision', 'Move to Action', 'From design to revenue'])
  const strategy = media.find(b => b.type === 'styled-list')
  assert.deepEqual(strategy.items.map(x => x.label), ['Intent', 'Relevance', 'Commerce'])
  const chapters = { 'Recognize Intent': [], 'Support the Decision': [], 'Move to Action': [] }
  let current
  for (const block of media) {
    if (block.type === 'heading' && block.text in chapters) current = block.text
    if (block.type === 'image-pair') chapters[current].push(path.basename(block.desktop.src))
  }
  assert.deepEqual(chapters, { 'Recognize Intent': ['home-dt.png'], 'Support the Decision': ['plan-search-dt.png', 'plan-compare-dt.png', 'plan-details-dt.png', 'dentist-search-dt.png'], 'Move to Action': ['dentist-profile-dt.png', 'cart-dt.png'] })
  assert.equal(web.media.filter(b => b.type === 'image-pair').length, 7)
  assert.equal(web.media.filter(b => b.type === 'metric-grid').length, 0)
  assert(!projects.find(p => p.id === 'bumblebeemd').contributions.some(c => c.label === 'Usability Testing'))
  assert.deepEqual(projects.find(p => p.id === 'reveal').heroMedia, [{ type: 'contributions' }])
  assert(!projects.find(p => p.id === 'wrong').media.some(b => b.type === 'styled-list'))
})
check('Reconciled credits, timeframe, and metric framing', () => {
  const webText = strings(projects[0]).join('\n')
  assert(webText.includes('I wireframed and designed the site in two weeks. It was complete and live when the Director of Online Marketing returned.'))
  assert(webText.includes('The following two weeks covered campaign wrap-up and launch work with the Director of Online Marketing and SVP of Marketing. The site generated revenue from day one.'))
  const dentalText = strings(projects[1]).join('\n')
  assert(dentalText.includes('A part-time engineer and I built and maintained the core framework and its enhancements. Other designers launched the branded properties. Internal engineering built the microservices and APIs the framework connected to.'))
  assert(dentalText.includes('In one measured year, finance credited the properties with the revenue and lead-capture shares below. Launch time is measured per property.'))
  assert.deepEqual(projects[1].media.find(b => b.type === 'metric-grid').metrics, oldProjects[1].media.find(b => b.type === 'metric-grid').metrics)
  assert(!/66%|67%|sales (?:by|lift)|ROI|\$\d/.test(projects.flatMap(p => [...p.brief.paragraphs, ...values(p.media, 'text')]).join('\n')))
  assert(strings(projects.find(p => p.id === 'hydra')).join('\n').includes('Work that had taken two sprints could land in one. The product later ran for about a year without a dedicated design resource.'))
  assert(!/two sprints|about a year/.test(strings(projects.find(p => p.id === 'opfred')).join('\n')))
})
check('Six reading routes, complete narrative, stable proof indexes and provenance', () => {
  assert.deepEqual(copy.studies.map(s => s.slug), slugs)
  const reviews = parts(packet[1], 2).filter(s => !s.title.startsWith('B84.'))
  copy.studies.forEach((s, i) => {
    const old = oldCopy.studies[i], review = reviews[i]
    for (const key of ['slug', 'category', 'tags', 'theme', 'visual']) assert.deepEqual(s[key], old[key])
    assert.equal(s.proof.length, 3); assert.equal(s.atAGlance.length, 3)
    assert.deepEqual(s.sections.map(x => x.id), ['problem', 'approach', 'solution', 'results'])
    const sections = parts(review.text, 3).filter(p => !['At a glance', 'Proof, in existing index order'].includes(p.title))
    sections.forEach((section, j) => {
      const actual = s.sections[j]
      assert.equal(actual.title, section.title)
      assert.equal(actual.label, section.text.match(/Navigation label: \*\*(.+)\*\*/)[1])
      assert.deepEqual(actual.paragraphs, proseOnly(section.text).filter(p => !p.startsWith('> ')))
    })
    for (const field of ['summary', 'role', 'scope', 'collaboration', 'discipline', 'shortTitle']) assert(review.text.includes(s[field]), `${s.slug}: ${field}`)
  })
  assert.deepEqual(copy.studies[0].proof, [
    { value: '6 → 2', label: 'weeks to launch a property' },
    { value: '5', label: 'properties on one platform' },
    { value: '47%', label: 'of company revenue growth in one measured year' },
  ])
  assert(copy.studies[0].source.includes('One Platform, Five Properties'))
  assert(copy.studies[0].source.includes('B79'))
  assert.equal(read('lib/data/case-studies.ts'), before('lib/data/case-studies.ts'))
  assert.equal(read('components/case-studies/CareerStats.tsx'), before('components/case-studies/CareerStats.tsx'))
  assert.equal(read('components/case-studies/OutcomeDashboard.tsx'), before('components/case-studies/OutcomeDashboard.tsx'))
  assert(!read('app/case-studies/[slug]/page.tsx').includes('mobileSectionLabels'))
  assert(read('app/case-studies/[slug]/page.tsx').includes('Explanatory reconstruction of the approach, based on the project narrative.'))
})
check('Fourteen source narratives and publication boundaries', () => {
  const source = read('docs/case-studies-sanitized.md')
  const expected = parts(getPart(packet[2], 'B85. Source narratives [PENDING]', 2), 3)
  const actual = parts(source, 2)
  assert.equal(actual.length, 14)
  actual.forEach((s, i) => {
    assert.equal(s.title, expected[i].title)
    assert.equal(s.text.replace(/\n\n---$/, ''), expected[i].text.replace(/^(Original heading unchanged\.|Locate original heading: .+\.)\n\n/, ''))
  })
  assert(source.includes('This file is not blanket permission to publish a study.'))
  assert(!source.includes('Cleared for public site and gated portfolio'))
  assert.equal(site.experience.length, 4)
  assert.deepEqual(site.experience.map(({ company, roles }) => ({ company, roles })), oldSite.experience.map(({ company, roles }) => ({ company, roles })))
  assert.equal(fs.existsSync('app/case-studies/webmd'), false)
  assert.equal(fs.existsSync('docs/decision-system-copy.json'), false)
  assert.equal(fs.existsSync('components/case-studies/DecisionSystemStudy.tsx'), false)
  assert.equal(execFileSync('git', ['diff', '--name-only', base, '--', '.github/workflows', '_archive'], { encoding: 'utf8' }).trim(), '')
})
check('Homepage, employment copy, retained credentials and tools, canonical slogan', () => {
  const b81 = getPart(packet[0], 'B81. Homepage, leadership, and online experience [PENDING]', 2)
  site.experience.forEach(job => {
    const review = getPart(b81, job.company, 3).replace(/^Retain .+\n\n/, '')
    assert.deepEqual(job.paragraphs, paragraphs(review))
  })
  assert.deepEqual(site.tools, oldSite.tools)
  for (const text of strings([site.leadershipLeft, site.leadershipRight, site.designLeadershipIntro, site.mentorship, site.expertise])) {
    if (!text.startsWith('fa-')) assert(b81.includes(text), 'Registered homepage prose')
  }
  const hero = read('components/ui/KineticHeroIdentity.tsx')
  assert(hero.includes('Product &amp; Design Leader'))
  assert(!hero.includes('<p className="sr-only">Product and design leader</p>'))
  assert(hero.includes('There is always a better way, together we will find it.'))
  assert.equal(copy.intro.closing, 'There is always a better way, together we will find it.')
  assert(!read('components/sections/ResumeSection.tsx').includes('There is always a better way'))
  assert(!read('components/ui/WorkCard.tsx').includes('Better outcomes'))
  for (const file of ['components/sections/EducationSection.tsx', 'components/case-studies/StudyShell.tsx']) assert.equal(read(file), before(file))
})
check('Demo intervals and design reference wording', () => {
  const demo = read('components/ui/CallCenterDemo.tsx')
  for (const text of ['When availability changes', 'Explore plans while we’re busy.', 'Highlight changing sections', 'The original status feed checked every five minutes; this preview cycles every five seconds.', 'Illustrative interaction demo', 'Reduced motion: choose a state to preview it.', 'Auto cycles every 5 seconds. Choose a state to stop.']) assert(demo.includes(text), text)
  assert(!read('app/design-system/catalog.ts').includes('Pause motion'))
  assert(read('app/design-system/DesignSystemExplorer.tsx').includes('Live site reference'))
  for (const file of ['docs/jacob-style.md', 'docs/voice-and-tone.md', 'docs/data-reporting.md']) assert(read(file).includes('September 29, 2026: reviewed website direction (B87)'))
})

const result = { base, projectCount: projects.length, readingRoutes: copy.studies.length, sourceNarratives: 14, checks }
if (process.argv.includes('--json')) console.log(JSON.stringify(result, null, 2))
else console.log(`Reviewed-copy source acceptance passed: ${checks.length} groups; 14 projects, 6 reading routes, 14 source narratives.`)
