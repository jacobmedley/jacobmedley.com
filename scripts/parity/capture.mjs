/**
 * Parity harness — capture step.
 *
 * Screenshots each section of the legacy site (:4000) and the new Next.js
 * site (:3000) at four breakpoints. Both servers must already be running:
 *
 *   legacy: npx serve _archive -p 4000   (archived static site; run
 *           `npm run parity:setup-legacy` first — it junctions
 *           _archive/{images,components,node_modules} to the repo root
 *           so the site's includes and Bootstrap JS resolve)
 *   new:    npm run dev                  (next dev on :3000)
 *
 * NOTE: the legacy site was moved to _archive/ during the react-migration
 * cleanup. This harness is retained for reference; the parity phase is done.
 *
 * Pass --modals to capture the 14 case-study modals instead of the fixed
 * sections (see MODAL capture below). Both modes respect --site=.
 *
 * Output: scripts/parity/shots/{legacy,new}/<section>-<bp>.png
 *         scripts/parity/shots/{legacy,new}/modal-<id>-<bp>.png
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { join } from 'path'

const SHOTS_DIR = fileURLToPath(new URL('./shots/', import.meta.url))

const BREAKPOINTS = [375, 768, 1280, 1920]
const VIEWPORT_HEIGHT = 1080

// Section ids are identical on both sites (NavMain renders id="the-menu").
const SECTIONS = [
  { name: 'nav', selector: '#the-menu' },
  { name: 'hi', selector: '#hi' },
  { name: 'work', selector: '#work' },
  { name: 'visual-design', selector: '#visual-design' },
  { name: 'resume', selector: '#resume' },
  { name: 'education', selector: '#education' },
]

const SITES = [
  { name: 'legacy', url: 'http://localhost:4000/' },
  { name: 'new', url: 'http://localhost:3000/' },
]

const MODAL_BREAKPOINTS = [375, 1280]

// The legacy modal HTML (components/modal-*.html) sets its own DOM id per
// project, unrelated to the project.id slug in lib/data/projects.ts. This
// map is the only place that correspondence is recorded — keep in sync if
// a project's legacy modal id ever changes.
const LEGACY_MODAL_IDS = {
  webmd: 'webmd',
  dentalplans: 'dpprod',
  bumblebeemd: 'bee',
  hydra: 'hydra',
  opfred: 'opfred',
  'split-test': 'split01',
  'call-center-ux': 'cce',
  'marketing-auto': 'ma',
  workshops: 'wb',
  roadmap: 'wb2',
  personas: 'personas',
  reveal: 'reveal',
  viva: 'viva',
  wrong: 'wrong',
}

// Injected before capture: kill transitions/animations (TypeKit FOUT settle
// is handled by the fonts.ready wait + 500ms below).
const FREEZE_CSS = `
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
    caret-color: transparent !important;
    scroll-behavior: auto !important;
  }
  /* Next.js dev-tools overlay — harness noise, not site content */
  nextjs-portal { display: none !important; }
`

// The modal itself is the Bootstrap `.modal` scroll container (position:
// fixed, height: 100%, overflow-y: auto) — a locator screenshot of it only
// captures one viewport-tall slice. Unclip it into normal document flow so
// its true content height renders, then scroll the (now very tall) page to
// trigger native lazy-loading on off-screen images before shooting it.
const MODAL_UNCLIP_CSS = `
  .modal { position: static !important; height: auto !important; overflow: visible !important; }
  .modal-fullscreen { height: auto !important; }
  .modal-content { height: auto !important; max-height: none !important; overflow: visible !important; }
  .modal-body { overflow: visible !important; }
`

async function assertReachable({ name, url }) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  } catch (err) {
    console.error(`\n✗ ${name} site not reachable at ${url} (${err.message})`)
    console.error(
      name === 'legacy'
        ? '  Start it with: npx serve . -p 4000'
        : '  Start it with: npm run dev'
    )
    process.exit(1)
  }
}

/** Scroll through the whole page to trigger lazy loading, then back to top. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
}

async function captureSite(browser, site) {
  const results = []
  for (const bp of BREAKPOINTS) {
    const context = await browser.newContext({
      viewport: { width: bp, height: VIEWPORT_HEIGHT },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    await page.goto(site.url, { waitUntil: 'load', timeout: 60_000 })
    // networkidle can hang forever on GTM/analytics beacons — best effort.
    await page
      .waitForLoadState('networkidle', { timeout: 15_000 })
      .catch(() => {})
    await page.evaluate(() => document.fonts.ready)
    await scrollThrough(page)
    await page.addStyleTag({ content: FREEZE_CSS })
    await page.waitForTimeout(500)

    const dir = join(SHOTS_DIR, site.name)
    mkdirSync(dir, { recursive: true })

    for (const section of SECTIONS) {
      // The fixed menu lands at arbitrary y inside scrolled element
      // captures — hide it except when it is the capture target.
      await page.addStyleTag({
        content:
          section.name === 'nav'
            ? '#the-menu { visibility: visible !important; }'
            : '#the-menu { visibility: hidden !important; }',
      })
      const locator = page.locator(section.selector).first()
      const file = join(dir, `${section.name}-${bp}.png`)
      try {
        await locator.screenshot({
          path: file,
          animations: 'disabled',
          timeout: 20_000,
        })
        results.push({ site: site.name, section: section.name, bp, ok: true })
        console.log(`  ✓ ${site.name}/${section.name}-${bp}.png`)
      } catch (err) {
        results.push({
          site: site.name,
          section: section.name,
          bp,
          ok: false,
          error: err.message.split('\n')[0],
        })
        console.warn(
          `  ✗ ${site.name}/${section.name}-${bp} — ${err.message.split('\n')[0]}`
        )
      }
    }
    await context.close()
  }
  return results
}

/** Locator for the trigger that opens `project`'s modal on this site. */
function triggerLocator(page, site, project) {
  return site.name === 'legacy'
    ? page.locator(`[data-bs-target="#${LEGACY_MODAL_IDS[project.id]}"]`).first()
    : page.locator(`[data-modal-trigger="${project.id}"]`).first()
}

/** Locator for the open modal's content on this site. */
function modalContentLocator(page, site, project) {
  return site.name === 'legacy'
    ? page.locator(`#${LEGACY_MODAL_IDS[project.id]} .modal-content`)
    : page.locator('.modal .modal-content')
}

async function captureModalsForSite(browser, site, projects) {
  const results = []
  for (const bp of MODAL_BREAKPOINTS) {
    const context = await browser.newContext({
      viewport: { width: bp, height: VIEWPORT_HEIGHT },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    await page.goto(site.url, { waitUntil: 'load', timeout: 60_000 })
    await page
      .waitForLoadState('networkidle', { timeout: 15_000 })
      .catch(() => {})
    await page.evaluate(() => document.fonts.ready)
    await page.addStyleTag({ content: FREEZE_CSS })
    // The fixed/sticky main nav (#the-menu) isn't part of modal content —
    // left visible, it re-renders at every scroll offset once the modal is
    // unclipped into normal flow, smearing across the stitched screenshot.
    await page.addStyleTag({ content: '#the-menu { visibility: hidden !important; }' })

    const dir = join(SHOTS_DIR, site.name)
    mkdirSync(dir, { recursive: true })

    for (const project of projects) {
      const file = join(dir, `modal-${project.id}-${bp}.png`)
      try {
        await triggerLocator(page, site, project).click()
        const content = modalContentLocator(page, site, project)
        await content.waitFor({ state: 'visible', timeout: 10_000 })
        await page.addStyleTag({ content: MODAL_UNCLIP_CSS })
        await scrollThrough(page)
        await page
          .waitForLoadState('networkidle', { timeout: 15_000 })
          .catch(() => {})
        await page.waitForTimeout(500)

        await content.screenshot({ path: file, animations: 'disabled', timeout: 20_000 })
        results.push({ site: site.name, section: `modal-${project.id}`, bp, ok: true })
        console.log(`  ✓ ${site.name}/modal-${project.id}-${bp}.png`)

        await page.keyboard.press('Escape')
        await page.waitForTimeout(300)
      } catch (err) {
        results.push({
          site: site.name,
          section: `modal-${project.id}`,
          bp,
          ok: false,
          error: err.message.split('\n')[0],
        })
        console.warn(
          `  ✗ ${site.name}/modal-${project.id}-${bp} — ${err.message.split('\n')[0]}`
        )
        // Best-effort recovery so one bad modal doesn't take down the rest.
        await page.keyboard.press('Escape').catch(() => {})
        await page.waitForTimeout(300)
      }
    }
    await context.close()
  }
  return results
}

const only = process.argv.find((a) => a.startsWith('--site='))?.split('=')[1]
const sites = only ? SITES.filter((s) => s.name === only) : SITES
const modalsMode = process.argv.includes('--modals')

for (const site of sites) await assertReachable(site)

const browser = await chromium.launch()
const all = []
if (modalsMode) {
  const { projects } = await import('../../lib/data/projects.ts')
  const visible = projects.filter((p) => p.visible)
  for (const site of sites) {
    console.log(`\nCapturing ${visible.length} modals on ${site.name} (${site.url})`)
    all.push(...(await captureModalsForSite(browser, site, visible)))
  }
} else {
  for (const site of sites) {
    console.log(`\nCapturing ${site.name} (${site.url})`)
    all.push(...(await captureSite(browser, site)))
  }
}
await browser.close()

const failed = all.filter((r) => !r.ok)
console.log(
  `\nCapture complete: ${all.length - failed.length}/${all.length} shots.`
)
if (failed.length) {
  console.warn('Missing captures:')
  for (const f of failed)
    console.warn(`  - ${f.site}/${f.section}-${f.bp}: ${f.error}`)
}
