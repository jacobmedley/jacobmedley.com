import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:8090'
const outputDir = path.resolve('scripts/parity/shots/wave4')
const browser = await chromium.launch({ headless: true })
const results = { baseUrl, widths: {}, errors: [] }

await mkdir(outputDir, { recursive: true })

for (const width of [375, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } })
  page.on('console', (message) => {
    if (message.type() === 'error') results.errors.push(`${width}: ${message.text()}`)
  })
  page.on('pageerror', (error) => results.errors.push(`${width}: ${error.message}`))

  const response = await page.goto(`${baseUrl}/case-studies/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const outcomes = page.locator('.cs-outcomes')
  await outcomes.screenshot({ path: path.join(outputDir, `outcomes-${width}.png`) })

  results.widths[width] = await outcomes.evaluate((section) => {
    const cards = [...section.querySelectorAll('.cs-outcome-card')]
    return {
      outcomeRecords: 1 + cards.length,
      supportingCards: cards.length,
      featuredValue: section.querySelector('.cs-featured-metric strong')?.textContent.trim(),
      sourceLinks: section.querySelectorAll('a[href^="/case-studies/"]').length,
      maximumBadgeCount: Math.max(...[...section.querySelectorAll('.cs-badges')].map((node) => node.children.length)),
      clippedCards: cards.filter((card) => card.scrollWidth > card.clientWidth).length,
      pageOverflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  results.widths[width].status = response?.status()
  await page.close()
}

await browser.close()

const failed = results.errors.length > 0 || Object.values(results.widths).some((result) => (
  result.status !== 200 || result.outcomeRecords !== 6 || result.sourceLinks !== 6 ||
  result.maximumBadgeCount > 2 || result.clippedCards > 0 || result.pageOverflowPx !== 0 || result.featuredValue !== '6 → 2'
))

await writeFile(path.join(outputDir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`)
console.log(JSON.stringify(results, null, 2))
if (failed) process.exitCode = 1

