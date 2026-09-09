import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import copy from '../../docs/case-study-site-copy.json' with { type: 'json' }

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3000'
const output = 'scripts/parity/shots/dashboard'
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = { widths: {}, errors: [], motion: {}, details: {}, navigation: {} }
const platform = copy.studies.find(study => study.slug === 'one-platform-five-properties')
const expectedStats = ['20', ...[1, 2, 0].map(index => platform.proof[index].value)]
const watchErrors = page => {
  page.on('pageerror', error => results.errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') results.errors.push(message.text()) })
}
async function readIcons(page) {
  await page.evaluate(() => document.fonts.ready)
  return page.locator('.cs-icon-art .thinking-icon').evaluateAll(nodes => nodes.map(node => {
    const style = getComputedStyle(node)
    const glyph = getComputedStyle(node, '::before').content
    return { glyph, font: style.fontFamily, weight: style.fontWeight, loaded: document.fonts.check(`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`) }
  }))
}
function assertIcons(icons, count) {
  assert.equal(icons.length, count)
  assert.ok(icons.every(icon => !['none', 'normal', '""'].includes(icon.glyph) && icon.font.includes('Font Awesome') && icon.weight === '100' && icon.loaded), 'thin icon font and glyphs loaded')
}
try {
  for (const width of [320, 375, 576, 699, 700, 768, 974, 1099, 1100, 1196, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    watchErrors(page)
    assert.equal((await page.goto(`${base}/case-studies/`, { waitUntil: 'networkidle' })).status(), 200)
    await page.evaluate(() => document.fonts.ready)
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      stats: [...document.querySelectorAll('.cs-stat > strong')].map(node => node.textContent),
      icons: [...document.querySelectorAll('.cs-icon-art .thinking-icon')].map(node => ({
        content: getComputedStyle(node, '::before').content,
        font: getComputedStyle(node).fontFamily,
      })),
      anchors: [...document.querySelectorAll('.cs-icon-art .thinking-icon-anchor')].map(node => [node.clientWidth, node.clientHeight]),
      backgroundMotion: getComputedStyle(document.querySelector('.cs-index'), '::before').animationName,
      motion: [...document.querySelectorAll('.cs-icon-art .thinking-icon-anchor')].map(node => getComputedStyle(node).animationName),
      frame: getComputedStyle(document.querySelector('.cs-outcome-card:last-child')).display,
      outcomeWidths: [...document.querySelectorAll('.cs-outcome-card')].map(node => node.getBoundingClientRect().width),
      hero: Object.fromEntries(['.cs-hero-heading', '.cs-index-hero h1', '.cs-hero-heading > .cs-button', '.cs-career', '.cs-index-hero', '.cs-filter-bar'].map(selector => {
        const { left, right, top, bottom } = document.querySelector(selector).getBoundingClientRect()
        return [selector, { left, right, top, bottom }]
      })),
      statTextFits: [...document.querySelectorAll('.cs-stat > strong, .cs-stat-label, .cs-stat-note')].every(node => {
        const range = document.createRange()
        range.selectNodeContents(node)
        const text = range.getBoundingClientRect()
        const card = node.closest('.cs-stat').getBoundingClientRect()
        return text.left >= card.left && text.right <= card.right && text.bottom <= card.bottom
      }),
    }))
    assert.equal(state.overflow, 0, `overflow at ${width}`)
    assert.deepEqual(state.stats, expectedStats)
    assert.ok(state.statTextFits, `career text fits at ${width}`)
    assert.ok(state.hero['.cs-hero-heading > .cs-button'].top > state.hero['.cs-index-hero h1'].bottom, 'CTA beneath headline')
    assert.ok(Math.abs(state.hero['.cs-index-hero'].bottom - state.hero['.cs-filter-bar'].top) < 2, 'filters directly below hero')
    if (width >= 1100) assert.ok(state.hero['.cs-career'].left >= state.hero['.cs-hero-heading'].right, 'career stats right of intro')
    else assert.ok(state.hero['.cs-career'].top >= state.hero['.cs-hero-heading'].bottom, 'career stats stack below intro')
    assert.match(await page.locator('.cs-stat.cs-theme-gold').innerText(), /Finance Attributed[\s\S]*47%[\s\S]*of company revenue growth in one measured year[\s\S]*Share of that year's growth increment\./)
    assert.deepEqual(await page.locator('.cs-stat').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), ['/#resume', ...Array(3).fill(`/case-studies/${platform.slug}/`)])
    assert.equal(await page.locator('.cs-stat').first().getAttribute('target'), '_blank')
    assert.deepEqual(await page.locator('.cs-launch-row').evaluateAll(nodes => nodes.map(node => node.querySelectorAll('.cs-week-filled').length)), [6, 2])
    assertIcons(await readIcons(page), 11)
    assert.equal(state.icons.length, 11)
    assert.ok(state.icons.every(icon => icon.content !== 'none' && icon.content !== 'normal' && icon.font.includes('Font Awesome')))
    assert.ok(state.anchors.every(([w, h]) => w === 138 && h === 138))
    assert.equal(state.backgroundMotion, 'none')
    assert.ok(state.motion.every(name => name === 'none'))
    if (width >= 700 && width < 1100) assert.ok(state.outcomeWidths.at(-1) > state.outcomeWidths[0] * 1.9, 'tablet pairs with full-width final outcome')
    if (width >= 1100) assert.ok(state.outcomeWidths.at(-1) > state.outcomeWidths[0] * 1.4, 'three vertical outcomes followed by two wider horizontal outcomes')
    await page.screenshot({ path: `${output}/hero-${width}.png` })
    if ([375, 974, 1196].includes(width)) await page.locator('.cs-outcome-grid').screenshot({ path: `${output}/outcomes-${width}.png` })
    await page.getByRole('link', { name: 'Explore the case studies', exact: true }).click()
    await page.evaluate(() => window.scrollBy(0, 300))
    assert.ok(Math.abs(await page.locator('.cs-filter-bar').evaluate(node => node.getBoundingClientRect().top)) < 2, 'filters stay at viewport top')
    for (const category of ['Product', 'Systems', 'UX Research', 'Leadership', 'Brand', 'All Work']) {
      await page.getByRole('button', { name: category, exact: true }).click()
      const expected = copy.studies.filter(study => category === 'All Work' || study.tags.includes(category))
      assert.equal(await page.locator('.cs-study-card').count(), expected.length)
      assert.equal(await page.getByRole('button', { name: category, exact: true }).getAttribute('aria-pressed'), 'true')
      const hrefs = await page.locator('.cs-study-card').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))
      assert.deepEqual(hrefs, expected.map(study => `/case-studies/${study.slug}/`))
      const outcomeHrefs = await page.locator('.cs-outcomes a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))
      assert.deepEqual(outcomeHrefs, hrefs, `both collections filter for ${category} at ${width}`)
      assert.equal(await page.locator('.cs-featured').count(), expected.some(study => study.slug === platform.slug) ? 1 : 0)
      assert.equal(await page.locator('.cs-filters [aria-pressed="true"]').count(), 1)
      assert.equal(await page.locator('.cs-section-heading [aria-live]').innerText(), `${expected.length} // ${expected.length === 1 ? 'Case Study' : 'Case Studies'}`)
      assert.equal(await page.getByRole('button', { name: category, exact: true }).getAttribute('aria-controls'), 'filtered-outcomes filtered-stories')
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0)
      assert.ok(Math.abs(await page.locator('.cs-filter-bar').evaluate(node => node.getBoundingClientRect().top)) < 2, `sticky after ${category}`)
      assertIcons(await readIcons(page), expected.length * 2 - (expected.some(study => study.slug === platform.slug) ? 1 : 0))
    }
    // Keyboard activation and focus remain available after result replacement.
    await page.getByRole('button', { name: 'Brand', exact: true }).focus()
    await page.keyboard.press('Enter')
    assert.equal(await page.locator('.cs-study-card').count(), 1)
    assert.equal(await page.locator('.cs-filters button:focus-visible').innerText(), 'Brand')
    await page.getByRole('button', { name: 'All Work', exact: true }).click()
    results.widths[width] = state
    await page.close()
  }
  const touch = await browser.newPage({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, reducedMotion: 'no-preference' })
  watchErrors(touch)
  await touch.goto(`${base}/case-studies/`, { waitUntil: 'networkidle' })
  results.motion.touch = await touch.locator('.cs-icon-art .thinking-icon-anchor').first().evaluate(node => getComputedStyle(node).animationName)
  assert.equal(results.motion.touch, 'thinking-dolly-anchor-mobile')
  const touchAnchor = touch.locator('.cs-icon-art .thinking-icon-anchor').first()
  const initialTouch = await touchAnchor.evaluate(node => getComputedStyle(node).transform)
  await touch.waitForTimeout(700)
  assert.notEqual(await touchAnchor.evaluate(node => getComputedStyle(node).transform), initialTouch, 'touch animation advances')
  await touch.getByRole('link', { name: 'Explore the case studies', exact: true }).tap()
  await touch.getByRole('button', { name: 'Systems', exact: true }).tap()
  assert.equal(await touch.locator('.cs-study-card').count(), 3)
  assert.equal(await touch.locator('.cs-outcomes a').count(), 3)
  await touch.emulateMedia({ reducedMotion: 'reduce' })
  results.motion.touchReduced = await touch.locator('.cs-icon-art .thinking-icon-anchor').first().evaluate(node => getComputedStyle(node).animationName)
  assert.equal(results.motion.touchReduced, 'none')
  assert.ok(await touch.locator('.cs-icon-art *').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).animationName === 'none')))
  await touch.close()
  const desktop = await browser.newPage({ viewport: { width: 1196, height: 900 }, reducedMotion: 'no-preference' })
  watchErrors(desktop)
  await desktop.goto(`${base}/case-studies/`, { waitUntil: 'networkidle' })
  const card = desktop.locator('.cs-outcome-card').first()
  const anchor = card.locator('.thinking-icon-anchor')
  const original = await anchor.evaluate(node => getComputedStyle(node).transform)
  await card.hover()
  await desktop.waitForTimeout(800)
  results.motion.desktop = await anchor.evaluate(node => getComputedStyle(node).transform)
  assert.notEqual(results.motion.desktop, original)
  await desktop.emulateMedia({ reducedMotion: 'reduce' })
  results.motion.desktopReduced = await anchor.evaluate(node => getComputedStyle(node).transform)
  assert.equal(results.motion.desktopReduced, original, 'reduced motion cancels hover scale')
  await desktop.emulateMedia({ reducedMotion: 'no-preference' })
  await desktop.mouse.move(0, 0)
  await card.focus()
  await desktop.waitForTimeout(800)
  assert.notEqual(await anchor.evaluate(node => getComputedStyle(node).transform), original, 'keyboard focus animates art')

  // Follow a filtered card through client navigation and back to check hydration.
  await desktop.getByRole('button', { name: 'Brand', exact: true }).click()
  await desktop.locator('.cs-study-card').click()
  await desktop.waitForURL(`**/case-studies/tokens-before-pages/`)
  assert.equal(await desktop.locator('h1').innerText(), copy.studies.find(study => study.slug === 'tokens-before-pages').title)
  await desktop.getByRole('link', { name: 'All case studies', exact: true }).click()
  await desktop.waitForURL('**/case-studies/')
  await desktop.getByRole('button', { name: 'All Work', exact: true }).click()
  assertIcons(await readIcons(desktop), 11)
  results.navigation.clientRoundTrip = true

  // Each source remains directly addressable and retains its diagram and prose.
  for (const width of [375, 1440]) {
    await desktop.setViewportSize({ width, height: 900 })
    for (const study of copy.studies) {
      assert.equal((await desktop.goto(`${base}/case-studies/${study.slug}/`, { waitUntil: 'networkidle' })).status(), 200)
      assert.equal(await desktop.locator('h1').innerText(), study.title)
      assert.equal(await desktop.locator('.cs-detail-cover .cs-diagram').count(), 1)
      for (const section of study.sections) {
        assert.deepEqual(await desktop.locator(`#${section.id} > p:not(.cs-eyebrow)`).allTextContents(), section.paragraphs)
      }
      assert.equal(await desktop.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0, `detail overflow: ${study.slug} at ${width}`)
      results.details[`${study.slug}-${width}`] = '200; canonical prose and diagram; no overflow'
    }
  }
  await desktop.goto(`${base}/`, { waitUntil: 'networkidle' })
  assert.equal(await desktop.locator('a[href^="/case-studies/"]').count(), 0, 'homepage remains separate')
  results.navigation.homepageSeparation = true
  await desktop.close()
  assert.deepEqual(results.errors, [])
  console.log('Dashboard acceptance passed: 11 widths, both filtered collections, career provenance, sticky bar, keyboard/touch, thin icons, motion preferences, client navigation and six preserved source stories at phone/desktop.')
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
  await browser.close()
}
