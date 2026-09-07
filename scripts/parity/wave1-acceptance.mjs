import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:8090'
const outputDir = path.resolve('scripts/parity/shots/wave1')
const widths = [320, 375, 576, 768, 1440]
const detailWidths = [320, 1440]
const slugs = [
  'one-platform-five-properties',
  'building-a-design-function',
  'one-customer-journey',
  'navigation-beyond-opinion',
  'tokens-before-pages',
  'a-checkout-decision-with-receipts',
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = { baseUrl, widths: {}, routes: {}, homepage: {}, errors: [] }

async function openPage(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(250)
  return response
}

function watchConsole(page, label) {
  page.on('console', (message) => {
    if (message.type() === 'error') results.errors.push(`${label}: ${message.text()}`)
  })
  page.on('pageerror', (error) => results.errors.push(`${label}: ${error.message}`))
}

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  watchConsole(page, `index-${width}`)
  const response = await openPage(page, '/case-studies/')
  await page.screenshot({ path: path.join(outputDir, `index-${width}.png`), fullPage: false })
  const facts = await page.evaluate(() => {
    const style = (selector) => getComputedStyle(document.querySelector(selector))
    const wordmarkText = document.querySelector('.cs-wordmark > span')
    const labels = [...document.querySelectorAll('.cs-eyebrow')].map((node) => node.textContent.trim())
    const externalLinks = [...document.querySelectorAll('.cs-header a[target="_blank"], .cs-footer a[target="_blank"]')]
    const overlay = document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')
    return {
      title: document.title,
      hasContent: document.body.innerText.trim().length > 0,
      errorOverlay: Boolean(overlay),
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      brandTextVisible: wordmarkText ? style('.cs-wordmark > span').display !== 'none' : null,
      brandIcon: {
        fontSize: style('.cs-brand-icon').fontSize,
        fontWeight: style('.cs-brand-icon').fontWeight,
        fontFamily: style('.cs-brand-icon').fontFamily,
      },
      wordmarkFontSize: style('.cs-wordmark').fontSize,
      ctaIcon: {
        fontWeight: style('.cs-button-outline i').fontWeight,
        fontFamily: style('.cs-button-outline i').fontFamily,
      },
      eyebrowMargins: [...new Set([...document.querySelectorAll('.cs-eyebrow')].map((node) => getComputedStyle(node).marginBottom))],
      labels,
      externalLinks: externalLinks.map((link) => ({ href: link.getAttribute('href'), target: link.target, rel: link.rel })),
      count: document.querySelector('.cs-section-heading > span')?.textContent.trim(),
      outcomeCards: document.querySelectorAll('.cs-outcome-card').length,
      featuredOutcome: document.querySelector('.cs-featured-metric')?.textContent.replace(/\s+/g, ' ').trim(),
      maximumBadgeCount: Math.max(...[...document.querySelectorAll('.cs-badges')].map((node) => node.children.length)),
    }
  })
  facts.filterCounts = {}
  for (const filter of ['Product', 'Systems', 'UX Research', 'Leadership', 'Brand']) {
    await page.getByRole('button', { name: filter }).click()
    facts.filterCounts[filter] = (await page.locator('.cs-section-heading > span').textContent())?.trim()
  }
  facts.status = response?.status()
  results.widths[width] = facts
  await page.close()
}

for (const width of detailWidths) {
  for (const slug of slugs) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    watchConsole(page, `${slug}-${width}`)
    const response = await openPage(page, `/case-studies/${slug}/`)
    const facts = await page.evaluate(() => {
      const cover = document.querySelector('.cs-detail-cover')?.getBoundingClientRect()
      const diagram = document.querySelector('.cs-detail-cover .cs-diagram')?.getBoundingClientRect()
      const records = [...document.querySelectorAll('.cs-record strong')].map((node) => {
        const computed = getComputedStyle(node)
        return { marginTop: computed.marginTop, marginBottom: computed.marginBottom }
      })
      return {
        h1: document.querySelector('h1')?.textContent.trim(),
        overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
        diagramFits: Boolean(cover && diagram && diagram.left >= cover.left - 1 && diagram.right <= cover.right + 1),
        diagramWidth: diagram?.width ?? null,
        coverWidth: cover?.width ?? null,
        recordTitleMargins: records,
      }
    })
    facts.status = response?.status()
    results.routes[`${slug}@${width}`] = facts
    if (slug === 'a-checkout-decision-with-receipts') {
      await page.screenshot({ path: path.join(outputDir, `detail-${width}.png`), fullPage: false })
    }
    await page.close()
  }
}

for (const width of [320, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  watchConsole(page, `home-${width}`)
  const response = await openPage(page, '/')
  const trigger = page.locator('[data-modal-trigger]').first()
  await trigger.scrollIntoViewIfNeeded()
  await trigger.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog')
  await dialog.waitFor({ state: 'visible' })
  await page.waitForTimeout(400)
  const openFacts = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]')
    const icon = dialog?.querySelector('.btn-close-modal i')
    const iconStyle = icon ? getComputedStyle(icon) : null
    const externalLinks = [...(dialog?.querySelectorAll('a[href^="http"]') ?? [])]
    const active = document.activeElement
    return {
      dialogVisible: Boolean(dialog),
      focusInsideDialog: Boolean(dialog?.contains(active)),
      activeLabel: active?.getAttribute('aria-label') ?? active?.textContent?.trim(),
      closeIconWeight: iconStyle?.fontWeight ?? null,
      closeIconFamily: iconStyle?.fontFamily ?? null,
      externalLinks: externalLinks.map((link) => ({ href: link.href, target: link.target, rel: link.rel })),
    }
  })
  await page.screenshot({ path: path.join(outputDir, `modal-${width}.png`), fullPage: false })
  await page.keyboard.press('Tab')
  openFacts.tabFocusRemainsInDialog = await page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false)
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
  openFacts.escapeClosed = await dialog.isHidden()
  openFacts.focusReturnedToTrigger = await trigger.evaluate((node) => document.activeElement === node)
  const homeFacts = await page.evaluate(() => {
    const hero = document.querySelector('#hi')
    const heroRect = hero?.getBoundingClientRect()
    const heroActions = [...document.querySelectorAll('#hi .fa-circle-arrow-down')]
    const heroIcon = document.querySelector('#hi .h-jakeicon i')
    const heroIconStyle = heroIcon ? getComputedStyle(heroIcon) : null
    const externalLinks = [...document.querySelectorAll('#education a[href^="http"], a[href="/case-studies/"]')]
    return {
      heroVisible: Boolean(heroRect && heroRect.width > 0 && heroRect.height > 0),
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroActionCount: heroActions.length,
      heroActionWeights: heroActions.map((icon) => getComputedStyle(icon).fontWeight),
      brandGlyph: { fontSize: heroIconStyle?.fontSize ?? null, fontWeight: heroIconStyle?.fontWeight ?? null, fontFamily: heroIconStyle?.fontFamily ?? null },
      relevantLinks: externalLinks.map((link) => ({ href: link.getAttribute('href'), target: link.target, rel: link.rel })),
    }
  })
  results.homepage[width] = { status: response?.status(), ...homeFacts, modal: openFacts }
  await page.close()
}

await browser.close()
await writeFile(path.join(outputDir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`)
console.log(JSON.stringify(results, null, 2))
