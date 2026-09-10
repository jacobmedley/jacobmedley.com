import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3010'
const output = 'scripts/parity/shots/stage4'
const expectedIds = ['webmd', 'dentalplans', 'bumblebeemd', 'hydra', 'opfred']
const results = { base, widths: {}, motion: {}, modal: {}, viva: {}, errors: [] }

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })

function watch(page, label) {
  page.on('pageerror', error => results.errors.push(`${label}: ${error.message}`))
  page.on('console', message => {
    if (message.type() === 'error') results.errors.push(`${label}: ${message.text()}`)
  })
}

try {
  for (const width of [320, 375, 768, 974, 1191, 1200, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    watch(page, `responsive-${width}`)
    assert.equal((await page.goto(`${base}/`, { waitUntil: 'networkidle' })).status(), 200)
    await page.evaluate(() => document.fonts.ready)

    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      cards: [...document.querySelectorAll('.featured-work-card')].map(card => {
        const anchor = card.querySelector('.featured-work-anchor').getBoundingClientRect()
        const copy = card.querySelector('.featured-work-copy')
        const copyStyle = getComputedStyle(copy)
        const cardStyle = getComputedStyle(card)
        const copyBox = copy.getBoundingClientRect()
        const cardBox = card.getBoundingClientRect()
        return {
          id: card.getAttribute('data-project-id'),
          containerWidth: Math.round(card.closest('.work-item').getBoundingClientRect().width),
          columns: cardStyle.gridTemplateColumns.split(' ').length,
          radius: cardStyle.borderRadius,
          anchor: [Math.round(anchor.width), Math.round(anchor.height)],
          copyBackground: copyStyle.backgroundColor,
          copyBlur: copyStyle.backdropFilter || copyStyle.webkitBackdropFilter,
          copyInsideCard: copyBox.left >= cardBox.left && copyBox.right <= cardBox.right && copyBox.bottom <= cardBox.bottom,
        }
      }),
      logos: [...document.querySelectorAll('.featured-work-logo')].map(image => ({
        src: image.getAttribute('src'),
        complete: image.complete,
        natural: [image.naturalWidth, image.naturalHeight],
        rendered: [Math.round(image.getBoundingClientRect().width), Math.round(image.getBoundingClientRect().height)],
      })),
      iconGlyphs: [...document.querySelectorAll('.featured-work-icon')].map(icon => ({
        content: getComputedStyle(icon, '::before').content,
        font: getComputedStyle(icon).fontFamily,
        weight: getComputedStyle(icon).fontWeight,
      })),
      reducedAnimations: [...document.querySelectorAll('.featured-work-drift, .featured-work-planes, .featured-work-honeycomb img, .featured-work-logo, .featured-work-icon')].map(node => getComputedStyle(node).animationName),
      errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
    }))

    assert.equal(state.overflow, 0, `overflow at ${width}`)
    assert.equal(state.errorOverlay, false, `error overlay at ${width}`)
    assert.deepEqual(state.cards.map(card => card.id), expectedIds)
    assert.ok(state.cards.every(card => card.radius === '32px'))
    assert.ok(state.cards.every(card => card.anchor.join('x') === '140x140'))
    assert.ok(state.cards.every(card => card.columns === (card.containerWidth < 680 ? 1 : 2)), `content breakpoint at ${width}`)
    assert.ok(state.cards.every(card => card.copyBackground === 'rgba(255, 255, 255, 0.88)'))
    assert.ok(state.cards.every(card => card.copyBlur.includes('blur(16px)')))
    assert.ok(state.cards.every(card => card.copyInsideCard), `copy stays inside card at ${width}`)
    assert.deepEqual(state.logos.map(image => image.src), [
      '/assets/featured/webmd-logo-white.svg',
      '/assets/featured/bumblebeemd-icon.svg',
    ])
    assert.ok(state.logos.every(image => image.complete && image.natural[0] > 0 && image.natural[1] > 0))
    assert.deepEqual(state.logos.map(image => image.rendered), [[110, 26], [71, 82]])
    assert.ok(state.iconGlyphs.every(icon => !['none', 'normal', '""'].includes(icon.content) && icon.font.includes('Font Awesome') && icon.weight === '100'))
    assert.ok(state.reducedAnimations.every(name => name === 'none'))
    results.widths[width] = state

    if (width === 375 || width === 1440) {
      await page.locator('#work .container').screenshot({ path: `${output}/work-${width}.png` })
    }
    await page.close()
  }

  const breakpoint = await browser.newPage({ viewport: { width: 1200, height: 900 }, reducedMotion: 'reduce' })
  watch(breakpoint, 'breakpoint')
  await breakpoint.goto(`${base}/`, { waitUntil: 'networkidle' })
  const exact = await breakpoint.locator('.work-item').first().evaluate(node => {
    const card = node.querySelector('.featured-work-card')
    const read = width => {
      node.style.width = `${width}px`
      return getComputedStyle(card).gridTemplateColumns.split(' ').length
    }
    const result = { 679: read(679), 680: read(680) }
    node.style.removeProperty('width')
    return result
  })
  assert.deepEqual(exact, { 679: 1, 680: 2 })

  const viva = await breakpoint.locator('.thinking-art-viva .thinking-photo-image').evaluate(async node => {
    const style = getComputedStyle(node)
    const image = new Image()
    image.src = style.backgroundImage.slice(5, -2)
    await image.decode()
    const box = node.getBoundingClientRect()
    return {
      image: style.backgroundImage,
      position: style.backgroundPosition,
      size: style.backgroundSize,
      visibleSourceWidth: box.width * image.naturalHeight / box.height,
    }
  })
  assert.ok(viva.image.includes('/images/work/viva-modal/vs-3.png'))
  assert.equal(viva.position, '0px 50%')
  assert.equal(viva.size, 'auto 100%')
  assert.ok(viva.visibleSourceWidth < 924, 'Viva visible crop stays inside verified text-free region')
  results.viva = viva
  await breakpoint.close()

  const desktop = await browser.newPage({ viewport: { width: 1200, height: 900 }, reducedMotion: 'no-preference' })
  watch(desktop, 'desktop-motion')
  await desktop.goto(`${base}/`, { waitUntil: 'networkidle' })
  await desktop.locator('.featured-work-card').first().scrollIntoViewIfNeeded()
  const card = desktop.locator('.featured-work-card').first()
  const drift = card.locator('.featured-work-drift')
  const interaction = card.locator('.featured-work-interaction')
  const driftStart = await drift.evaluate(node => getComputedStyle(node).transform)
  await desktop.waitForTimeout(800)
  const driftLater = await drift.evaluate(node => getComputedStyle(node).transform)
  assert.notEqual(driftLater, driftStart, 'desktop idle field advances')
  await card.hover()
  await desktop.waitForTimeout(650)
  const hoverTransform = await interaction.evaluate(node => getComputedStyle(node).transform)
  assert.notEqual(hoverTransform, 'none')
  await desktop.mouse.move(0, 0)
  await card.getByRole('button', { name: 'Open WebMD case study' }).focus()
  await desktop.waitForTimeout(650)
  const focusTransform = await interaction.evaluate(node => getComputedStyle(node).transform)
  assert.notEqual(focusTransform, 'none')
  const focusRing = await card.getByRole('button', { name: 'Open WebMD case study' }).evaluate(node => {
    const style = getComputedStyle(node)
    return [style.outlineColor, style.outlineWidth, style.outlineOffset]
  })
  assert.deepEqual(focusRing, ['rgb(100, 70, 114)', '3px', '4px'])
  await desktop.getByRole('button', { name: 'Pause motion' }).click()
  assert.equal(await desktop.locator('html').getAttribute('class').then(value => value?.includes('motion-paused')), true)
  assert.equal(await interaction.evaluate(node => getComputedStyle(node).transform), 'none')
  results.motion = { driftStart, driftLater, hoverTransform, focusTransform, focusRing }

  const read = card.getByRole('button', { name: 'Read', exact: true })
  await read.click()
  await desktop.getByRole('dialog').waitFor()
  assert.match(await desktop.getByRole('dialog').innerText(), /WebMD/)
  await desktop.getByRole('button', { name: 'Close', exact: true }).first().click()
  assert.equal(await read.evaluate(node => node === document.activeElement), true)
  results.modal.readFocusReturn = true

  const art = card.getByRole('button', { name: 'Open WebMD case study' })
  await art.click()
  await desktop.getByRole('dialog').waitFor()
  await desktop.keyboard.press('Escape')
  assert.equal(await art.evaluate(node => node === document.activeElement), true)
  results.modal.artFocusReturn = true
  await desktop.close()

  const touch = await browser.newPage({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, reducedMotion: 'no-preference' })
  watch(touch, 'touch')
  await touch.goto(`${base}/`, { waitUntil: 'networkidle' })
  const touchDrift = touch.locator('.featured-work-drift').first()
  await touch.locator('.featured-work-card').first().scrollIntoViewIfNeeded()
  await touch.waitForTimeout(150)
  const touchStart = await touchDrift.evaluate(node => getComputedStyle(node).transform)
  await touch.waitForTimeout(800)
  const touchLater = await touchDrift.evaluate(node => getComputedStyle(node).transform)
  assert.notEqual(touchLater, touchStart, 'touch idle field advances')
  await touch.getByRole('button', { name: 'Open WebMD case study' }).tap()
  await touch.getByRole('dialog').waitFor()
  results.motion.touch = { touchStart, touchLater, openedDirectly: true }
  await touch.close()

  assert.deepEqual(results.errors, [])
  console.log('Stage 4 acceptance passed: five responsive cards, exact 679/680 content breakpoint, verified brand assets, clean Viva crop, glass/focus, desktop/touch/reduced motion, and modal focus return.')
} finally {
  await writeFile(`${output}/results.json`, `${JSON.stringify(results, null, 2)}\n`)
  await browser.close()
}
