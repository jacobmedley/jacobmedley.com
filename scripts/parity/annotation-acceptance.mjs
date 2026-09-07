import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:8090'
const outputDir = path.resolve('scripts/parity/shots/annotations')
const browser = await chromium.launch({ headless: true })
const results = { baseUrl, home: {}, variants: {}, errors: [] }

await mkdir(outputDir, { recursive: true })

function watch(page, label) {
  page.on('console', (message) => {
    if (message.type() === 'error') results.errors.push(`${label}: ${message.text()}`)
  })
  page.on('pageerror', (error) => results.errors.push(`${label}: ${error.message}`))
}

for (const width of [375, 1191, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 992 } })
  watch(page, `home-${width}`)
  const response = await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('#hi').screenshot({ path: path.join(outputDir, `hero-${width}.png`) })
  if (width === 1191) await page.locator('#work .container').screenshot({ path: path.join(outputDir, 'case-studies-1191.png') })

  results.home[width] = await page.evaluate(() => {
    const heroIcon = document.querySelector('#hi .h-jakeicon i')
    const sectionIcon = document.querySelector('#work .section-heading-icon i')
    const title = document.querySelector('#hi .hero-title')
    const heroButton = document.querySelector('.hero-case-studies-link')
    const workItems = [...document.querySelectorAll('#work .work-item')]
    const readButtons = [...document.querySelectorAll('#work .case-study-read')]
    const sectionIconBox = sectionIcon?.getBoundingClientRect()
    const sectionTitleBox = document.querySelector('#work .section-heading-title')?.getBoundingClientRect()
    return {
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTitleWeight: title ? getComputedStyle(title).fontWeight : null,
      heroTitleLines: title ? Math.round(title.getBoundingClientRect().height / Number.parseFloat(getComputedStyle(title).lineHeight)) : null,
      heroIconSize: heroIcon ? getComputedStyle(heroIcon).fontSize : null,
      sectionIconSize: sectionIcon ? getComputedStyle(sectionIcon).fontSize : null,
      sectionIconTitleGap: sectionIconBox && sectionTitleBox ? Math.round(sectionTitleBox.top - sectionIconBox.bottom) : null,
      heroButtonSize: heroButton ? [heroButton.clientWidth, heroButton.clientHeight] : null,
      heroButtonAnimation: heroButton?.querySelector('i') ? getComputedStyle(heroButton.querySelector('i')).animationName : null,
      workItems: workItems.length,
      internalRules: workItems.reduce((count, item) => count + item.querySelectorAll('hr').length, 0),
      betweenRules: document.querySelectorAll('#work .work-separator').length,
      summaryLabels: workItems.filter((item) => item.textContent.includes('Summary:')).length,
      workBadgeGroups: workItems.reduce((count, item) => count + item.querySelectorAll('.work-card-badges').length, 0),
      readButtonWeights: [...new Set(readButtons.map((button) => getComputedStyle(button).fontWeight))],
      errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
    }
  })
  results.home[width].status = response?.status()
  await page.close()
}

for (const width of [375, 1191]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } })
  watch(page, `variants-${width}`)
  const response = await page.goto(`${baseUrl}/design-variants/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(outputDir, `design-variants-${width}.png`), fullPage: true })
  results.variants[width] = await page.evaluate(() => ({
    overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    sections: document.querySelectorAll('main > section').length,
    cards: document.querySelectorAll('main article').length,
    headings: [...document.querySelectorAll('main section h2')].map((node) => node.textContent.trim()),
    errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
  }))
  results.variants[width].status = response?.status()
  await page.close()
}

await browser.close()

const failed = results.errors.length > 0 || Object.entries(results.home).some(([width, result]) => (
  result.status !== 200 || result.overflowPx !== 0 || result.errorOverlay ||
  result.internalRules !== 0 || result.betweenRules !== result.workItems - 1 ||
  result.summaryLabels !== 0 || result.workBadgeGroups !== result.workItems ||
  result.readButtonWeights.some((weight) => weight !== '300') ||
  (Number(width) >= 768 && result.heroTitleLines !== 1)
)) || Object.values(results.variants).some((result) => (
  result.status !== 200 || result.overflowPx !== 0 || result.errorOverlay || result.sections !== 2 || result.cards !== 6
))

await writeFile(path.join(outputDir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`)
console.log(JSON.stringify(results, null, 2))
if (failed) process.exitCode = 1
