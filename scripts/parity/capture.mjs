/**
 * Parity harness — capture step.
 *
 * Screenshots each section of the legacy site (:4000) and the new Next.js
 * site (:3000) at four breakpoints. Both servers must already be running:
 *
 *   legacy: npx serve . -p 4000   (repo root)
 *   new:    npm run dev           (next dev on :3000)
 *
 * Output: scripts/parity/shots/{legacy,new}/<section>-<bp>.png
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

const only = process.argv.find((a) => a.startsWith('--site='))?.split('=')[1]
const sites = only ? SITES.filter((s) => s.name === only) : SITES

for (const site of sites) await assertReachable(site)

const browser = await chromium.launch()
const all = []
for (const site of sites) {
  console.log(`\nCapturing ${site.name} (${site.url})`)
  all.push(...(await captureSite(browser, site)))
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
