import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3011'
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
  for (const width of [320, 375, 767, 768, 797, 819, 820, 900, 974, 1131, 1191, 1200, 1440, 1729, 1920, 2560]) {
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
          artCenter: (() => { const a = card.querySelector('.featured-work-art').getBoundingClientRect(); return { x: a.x + a.width/2, y: a.y + a.height/2, width: a.width }; })(),
          anchorCenter: { x: anchor.x + anchor.width/2, y: anchor.y + anchor.height/2 },
          copyBox: { x: copyBox.x, y: copyBox.y, width: copyBox.width, height: copyBox.height },
          hugging: Math.abs(cardBox.height - copyBox.height - 2 * parseFloat(cardStyle.paddingTop) - 2) < 2,
          copyInsideCard: copyBox.left >= cardBox.left && copyBox.right <= cardBox.right && copyBox.bottom <= cardBox.bottom,
          box: { left: Math.round(cardBox.left), top: Math.round(cardBox.top), width: Math.round(cardBox.width), height: Math.round(cardBox.height) },
        }
      }),
      logos: [...document.querySelectorAll('.featured-work-logo')].map(image => ({
        src: image.getAttribute('src'),
        complete: image.complete,
        natural: [image.naturalWidth, image.naturalHeight],
        rendered: [Math.round(image.getBoundingClientRect().width), Math.round(image.getBoundingClientRect().height)],
      })),
      iconGlyphs: [...document.querySelectorAll('.featured-work-icon')].map(icon => ({
        className: icon.className,
        content: getComputedStyle(icon, '::before').content,
        font: getComputedStyle(icon).fontFamily,
        weight: getComputedStyle(icon).fontWeight,
      })),
      reducedAnimations: [...document.querySelectorAll('.featured-work-drift, .featured-work-planes, .featured-work-honeycomb img, .featured-work-logo, .featured-work-icon')].map(node => getComputedStyle(node).animationName),
      separatorMargins: [...document.querySelectorAll('.work-separator')].map(rule => ({
        display: getComputedStyle(rule).display,
        top: getComputedStyle(rule).marginTop,
        bottom: getComputedStyle(rule).marginBottom,
      })),
      summaries: [...document.querySelectorAll('.featured-work-summary')].map(node => node.textContent.trim()),
      errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
      systemNodesVisible: [...document.querySelectorAll('.featured-system-node')].every(node => {
        const box = node.getBoundingClientRect()
        const card = node.closest('.featured-work-card')
        const boundary = card.getBoundingClientRect()
        return box.left >= boundary.left && box.right <= boundary.right && box.top >= boundary.top && box.bottom <= boundary.bottom
      }),
    }))

    results.widths[width] = state
    assert.equal(state.overflow, 0, `overflow at ${width}`)
    assert.equal(state.errorOverlay, false, `error overlay at ${width}`)
    assert.equal(state.systemNodesVisible, true, `all DP system icons contained at ${width}`)
    assert.deepEqual(state.cards.map(card => card.id), expectedIds)
    assert.ok(state.cards.every(card => card.radius === '32px'))
    assert.ok(state.cards.every(card => card.anchor.join('x') === '220x220'))
    assert.ok(state.cards.every(card => card.columns === (card.containerWidth < 820 ? 1 : 2)), `content breakpoint at ${width}`)
    assert.ok(state.cards.every(card => card.copyBackground === 'rgba(255, 255, 255, 0.4)'))
    assert.ok(state.cards.every(card => card.copyBlur.includes('blur(3px)')))
    assert.ok(state.cards.every(card => card.copyInsideCard), `copy stays inside card at ${width}`)
    assert.deepEqual(state.logos.map(image => image.src), [
      '/assets/featured/webmd-logo-white.svg',
      '/assets/featured/dentalplans-icon.svg',
      '/assets/featured/bumblebeemd-icon.svg',
      '/assets/featured/opf-icon-white.svg',
    ])
    assert.ok(state.logos.every(image => image.complete && image.natural[0] > 0 && image.natural[1] > 0))
    assert.deepEqual(state.logos.map(image => image.rendered), [[194, 45], [132, 132], [112, 129], [132, 124]])
    assert.ok(state.iconGlyphs.every(icon => !['none', 'normal', '""'].includes(icon.content) && icon.font.includes('Font Awesome') && icon.weight === '100'))
    assert.deepEqual(state.iconGlyphs.map(icon => icon.className), ['fa-thin fa-hydra featured-work-icon'])
    assert.ok(state.reducedAnimations.every(name => name === 'none'))
    assert.ok(Math.max(...state.summaries.map(summary => summary.length)) - Math.min(...state.summaries.map(summary => summary.length)) <= 24)
    assert.ok(state.summaries.every(summary => !/retired/i.test(summary)))
    assert.ok(state.separatorMargins.every(rule => rule.display === 'none'))
    const first = state.cards[0]
    state.cards.forEach((card, i) => {
      assert.equal(card.box.width, first.box.width)
      assert.equal(card.box.left, first.box.left)
      assert.ok(Math.abs(card.artCenter.x - card.anchorCenter.x) < 1 && Math.abs(card.artCenter.y - card.anchorCenter.y) < 1, `centered identity at ${width}`)
      if (card.columns === 2) {
        assert.ok(card.hugging, `card hugs copy at ${width}`)
        assert.ok(i % 2 ? card.artCenter.x > card.copyBox.x + card.copyBox.width : card.artCenter.x < card.copyBox.x, `alternating artwork at ${width}`)
      }
      if (i) assert.ok(card.box.top > state.cards[i-1].box.top + state.cards[i-1].box.height)
    })
    if ([375, 1131, 1440, 1729].includes(width)) {
      await page.locator('#work .container').screenshot({ path: `${output}/work-${width}.png` })
    }
    await page.close()
  }

  const breakpoint = await browser.newPage({ viewport: { width: 1200, height: 900 }, reducedMotion: 'reduce' })
  watch(breakpoint, 'breakpoint')
  await breakpoint.goto(`${base}/`, { waitUntil: 'networkidle' })
  const exact = await breakpoint.locator('.work-item-opfred').evaluate(node => {
    const card = node.querySelector('.featured-work-card')
    const read = width => {
      node.style.width = `${width}px`
      return getComputedStyle(card).gridTemplateColumns.split(' ').length
    }
    const result = { 819: read(819), 820: read(820) }
    node.style.removeProperty('width')
    return result
  })
  assert.deepEqual(exact, { 819: 1, 820: 2 })

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
  assert.deepEqual(focusRing, ['rgb(70, 49, 80)', '3px', '-5px'])
  await desktop.getByRole('button', { name: 'Pause motion' }).click()
  assert.equal(await desktop.locator('html').getAttribute('class').then(value => value?.includes('motion-paused')), true)
  assert.equal(await interaction.evaluate(node => getComputedStyle(node).transform), 'none')
  results.motion = { driftStart, driftLater, hoverTransform, focusTransform, focusRing }

  const read = card.getByRole('button', { name: 'Open WebMD case study' })
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
  console.log('Stage 4 acceptance passed: five responsive cards, exact 819/820 content breakpoint, verified brand assets, clean Viva crop, glass/focus, desktop/touch/reduced motion, and modal focus return.')
} finally {
  await writeFile(`${output}/results.json`, `${JSON.stringify(results, null, 2)}\n`)
  await browser.close()
}
