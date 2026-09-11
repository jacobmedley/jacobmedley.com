import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { PNG } from 'pngjs'
import { chromium } from 'playwright'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3011'
const output = 'scripts/parity/shots/refinement'
const results = { errors: [], networks: {}, rays: {}, artwork: {}, contrast: {} }
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const watch = page => {
  page.on('pageerror', e => results.errors.push(e.message))
  page.on('console', m => { if (m.type() === 'error') results.errors.push(m.text()) })
}
const snapshot = locator => locator.evaluate(svg => {
  const read = (n, name) => Number(n.getAttribute(name))
  const nodes = [...svg.querySelectorAll('.thinking-network-node')].map(n => [read(n, 'cx'), read(n, 'cy'), read(n, 'r')])
  let maxError = 0
  const lines = [...svg.querySelectorAll('line')].map(n => {
    const a = nodes[Number(n.dataset.from)], b = nodes[Number(n.dataset.to)]
    const line = [read(n, 'x1'), read(n, 'y1'), read(n, 'x2'), read(n, 'y2')]
    maxError = Math.max(maxError, Math.abs(a[0] - line[0]), Math.abs(a[1] - line[1]), Math.abs(b[0] - line[2]), Math.abs(b[1] - line[3]))
    return line
  })
  const packets = [...svg.querySelectorAll('.thinking-data-packet')].filter(n => read(n, 'opacity') > .01).map(n => {
    const [x1, y1, x2, y2] = lines[Number(n.dataset.edge)]
    const x = read(n, 'cx'), y = read(n, 'cy')
    const length = Math.hypot(x2 - x1, y2 - y1)
    return { distance: Math.abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / length, along: ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / length ** 2 }
  })
  return { nodes, lines: lines.length, maxError, packets, state: svg.dataset.networkState }
})
const verifyNetwork = state => {
  assert.equal(state.nodes.length, 38)
  assert.equal(state.lines, 80)
  assert.equal(state.maxError, 0, 'all endpoints exactly match node centers')
  assert.ok(state.packets.every(p => p.distance < .003 && p.along >= 0 && p.along <= 1), 'packets remain on their connections')
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' })
  watch(page)
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.featured-work-icon'), '::before').content !== 'none')
  const netCard = page.locator('.thinking-thumb.thinking-art-call-center-ux')
  const network = netCard.locator('.thinking-connections')
  await netCard.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  const before = await snapshot(network)
  await page.waitForTimeout(900)
  const idle = await snapshot(network)
  assert.notDeepEqual(before.nodes, idle.nodes, 'network idle changes projected vertices')
  await netCard.hover()
  await page.waitForTimeout(850)
  const hover = await snapshot(network)
  assert.ok(hover.nodes.some((n, i) => Math.hypot(n[0] - idle.nodes[i][0], n[1] - idle.nodes[i][1]) > 8), 'dramatic 3D displacement')
  let packetSamples = 0
  for (let i = 0; i < 22; i++) {
    await page.waitForTimeout(550)
    const sample = await snapshot(network)
    verifyNetwork(sample)
    packetSamples += sample.packets.length
  }
  assert.ok(packetSamples > 2, 'occasional visible packets')
  for (const state of [before, idle, hover]) verifyNetwork(state)
  const outline = await network.locator('.thinking-network-node').first().evaluate(n => ({ fill: getComputedStyle(n).fill, stroke: getComputedStyle(n).stroke, transform: getComputedStyle(n).transform, scale: getComputedStyle(n).scale }))
  assert.equal(outline.stroke, 'rgb(127, 100, 10)')
  assert.notEqual(outline.fill, outline.stroke)
  assert.equal(outline.scale, 'none')
  await netCard.screenshot({ path: `${output}/network-hover.png` })
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click()
  await page.waitForTimeout(100)
  const paused = await snapshot(network)
  await page.waitForTimeout(500)
  assert.deepEqual(await snapshot(network), paused)
  assert.equal(paused.state, 'paused')
  await page.getByRole('button', { name: 'Resume motion', exact: true }).click()
  await page.waitForTimeout(200)
  // Exercise the browser visibility event and the shared class contract. This is
  // a lifecycle simulation; physical tab switching is separately reported.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await page.waitForTimeout(100)
  const hidden = await snapshot(network)
  assert.equal(hidden.state, 'paused')
  await page.waitForTimeout(400)
  assert.deepEqual(await snapshot(network), hidden)
  await page.evaluate(() => {
    delete document.hidden
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await page.waitForTimeout(150)
  assert.equal((await snapshot(network)).state, 'running')
  await netCard.focus()
  await page.waitForTimeout(800)
  verifyNetwork(await snapshot(network))
  await page.locator('.featured-work-card').first().scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  const offscreen = await snapshot(network)
  assert.equal(offscreen.state, 'paused')
  await page.waitForTimeout(300)
  assert.deepEqual(await snapshot(network), offscreen)
  results.networks.home = { before, idle, hover, packetSamples, outline, pause: true, offscreen: true, simulatedVisibility: true }

  const rayCard = page.locator('.thinking-thumb.thinking-art-marketing-auto')
  await rayCard.scrollIntoViewIfNeeded()
  await page.mouse.move(0, 0)
  const rays = rayCard.locator('.personalization-rays')
  const floatStart = await rays.locator('b').first().evaluate(n => getComputedStyle(n).translate)
  await page.waitForTimeout(900)
  assert.notEqual(await rays.locator('b').first().evaluate(n => getComputedStyle(n).translate), floatStart, 'rays drift at rest')
  const scatter = await rays.locator('b').evaluateAll(nodes => nodes.map(n => getComputedStyle(n).transform))
  await rayCard.hover()
  await page.waitForTimeout(750)
  const beams = await rays.locator('b').evaluateAll(nodes => nodes.map(n => {
    const m = new DOMMatrix(getComputedStyle(n).transform)
    return { x: m.m41, y: m.m42, angle: (Math.atan2(m.m12, m.m11) * 180 / Math.PI + 360) % 360 }
  }))
  beams.forEach((b, i) => { assert.ok(Math.abs(b.x) < .01 && Math.abs(b.y) < .01); assert.ok(Math.min(Math.abs(b.angle - i * 30), Math.abs(b.angle - i * 30 - 360)) < .01) })
  const rotation = await rays.evaluate(n => getComputedStyle(n).rotate)
  await page.waitForTimeout(800)
  assert.notEqual(await rays.evaluate(n => getComputedStyle(n).rotate), rotation)
  await rayCard.screenshot({ path: `${output}/sunbeams-hover.png` })
  await page.mouse.move(0, 0)
  await page.waitForTimeout(750)
  assert.deepEqual(await rays.locator('b').evaluateAll(nodes => nodes.map(n => getComputedStyle(n).transform)), scatter)
  assert.equal(await rays.evaluate(n => getComputedStyle(n).animationPlayState), 'paused')
  await rayCard.focus()
  await page.waitForTimeout(750)
  assert.equal(await rays.evaluate(n => getComputedStyle(n).animationPlayState), 'running')
  results.rays = { beams, scatter, hoverRotation: true, focusRotation: true, returnToScatter: true }

  const ab = page.locator('.thinking-thumb.thinking-art-split-test')
  await ab.hover()
  await page.waitForTimeout(750)
  const layers = await ab.locator('.thinking-geometry > i').evaluateAll(nodes => nodes.map(n => getComputedStyle(n).translate))
  assert.ok(layers.some(v => v.endsWith('200px')) && layers.some(v => v.endsWith('-262px')))
  const triangle = ab.locator('.thinking-geometry > i').first()
  const settled = await triangle.evaluate(n => getComputedStyle(n).transform)
  await page.waitForTimeout(1100)
  assert.notEqual(await triangle.evaluate(n => getComputedStyle(n).transform), settled, 'triangles keep moving after the depth transition')
  const anchorScale = await ab.locator('.thinking-icon-anchor').evaluate(n => new DOMMatrix(getComputedStyle(n).transform).a)
  assert.equal(anchorScale, 1.16, 'full-stack circle enlarges')
  const floatA = await ab.locator('.thinking-icon-anchor').evaluate(n => getComputedStyle(n).translate)
  await page.waitForTimeout(900)
  assert.notEqual(await ab.locator('.thinking-icon-anchor').evaluate(n => getComputedStyle(n).translate), floatA, 'hover circle continues floating')
  await ab.screenshot({ path: `${output}/ab-depth-hover.png` })
  const workshop = page.locator('.thinking-thumb.thinking-art-workshops')
  await workshop.hover()
  await page.waitForTimeout(1100)
  const ring = workshop.locator('.thinking-geometry > i').first()
  assert.equal(await ring.evaluate(n => getComputedStyle(n).rotate), 'x 48deg')
  const ripple = await ring.evaluate(n => getComputedStyle(n).scale)
  await page.waitForTimeout(900)
  assert.notEqual(await ring.evaluate(n => getComputedStyle(n).scale), ripple)
  assert.equal(await page.locator('.thinking-thumb .roadmap-maze path').count(), 18)
  const bee = page.locator('.featured-work-card-bumblebeemd')
  await bee.hover()
  await page.waitForTimeout(1400)
  assert.equal(await bee.locator('.featured-work-anchor').evaluate(n => new DOMMatrix(getComputedStyle(n).transform).a), 1.16)
  assert.equal(await bee.locator('.featured-work-honeycomb img').nth(15).evaluate(n => getComputedStyle(n).opacity), '0.65')
  assert.notEqual(await bee.locator('.featured-work-honeycomb img').first().evaluate(n => getComputedStyle(n).rotate), 'none')
  assert.equal(await bee.locator('.fa-arrow-right').evaluate(n => getComputedStyle(n).translate), '5px')
  await bee.screenshot({ path: `${output}/bee-hover.png` })
  const opf = page.locator('.featured-work-card-opfred')
  await opf.scrollIntoViewIfNeeded()
  const leaf = opf.locator('.featured-leaves > span').nth(5)
  const leafStart = await leaf.evaluate(n => getComputedStyle(n).top)
  await page.waitForTimeout(900)
  assert.notEqual(await leaf.evaluate(n => getComputedStyle(n).top), leafStart, 'leaves fall slowly')
  assert.equal(await opf.locator('.featured-leaves > span').count(), 16)
  assert.ok((await opf.locator('.featured-work-logo-opf').getAttribute('src')).endsWith('opf-icon-white.svg'))
  assert.equal(await page.locator('.featured-design-system .design-components rect').count(), 7)
  const mouse = page.locator('.thinking-thumb.thinking-art-roadmap .thinking-icon')
  await mouse.scrollIntoViewIfNeeded()
  assert.equal(await mouse.evaluate(n => getComputedStyle(n, '::before').animationName), 'none')
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click()
  assert.equal(await mouse.evaluate(n => getComputedStyle(n, '::before').animationPlayState), 'paused')
  await page.getByRole('button', { name: 'Resume motion', exact: true }).click()

  results.artwork = await page.evaluate(() => ({
    healthIcons: [...document.querySelectorAll('.featured-work-motif i')].map(n => ({ glyph: getComputedStyle(n, '::before').content, size: getComputedStyle(n).fontSize })),
    systemIcons: [...document.querySelectorAll('.featured-system-node i')].map(n => getComputedStyle(n, '::before').content),
    hexes: document.querySelectorAll('.featured-work-honeycomb img').length,
    hexWidth: getComputedStyle(document.querySelector('.featured-work-honeycomb img')).width,
    palettes: [...document.querySelectorAll('.featured-work-card')].map(n => [n.dataset.projectId, getComputedStyle(n).getPropertyValue('--featured-ink').trim()]),
  }))
  assert.equal(results.artwork.healthIcons.length, 6)
  assert.equal(results.artwork.systemIcons.length, 12)
  assert.ok([...results.artwork.systemIcons, ...results.artwork.healthIcons.map(n => n.glyph)].every(v => !['none', 'normal', '""'].includes(v)))
  assert.ok(new Set(results.artwork.healthIcons.map(n => n.size)).size > 3)
  assert.equal(results.artwork.hexes, 24)
  assert.equal(results.artwork.hexWidth, '150px')
  const system = page.locator('.featured-work-card-dentalplans')
  await system.scrollIntoViewIfNeeded()
  await system.hover()
  await page.waitForTimeout(700)
  const systemAlignment = await system.evaluate(card => {
    const svg = card.querySelector('.featured-system-links')
    const nodes = [...card.querySelectorAll('.featured-system-node')].map(n => n.getBoundingClientRect())
    const edges = [...svg.querySelectorAll('g')].map(g => [Number(g.dataset.from), Number(g.dataset.to)])
    return [...svg.querySelectorAll('g > path:first-child')].map((path, i) => {
      const start = path.getPointAtLength(0).matrixTransform(path.getScreenCTM())
      const end = path.getPointAtLength(path.getTotalLength()).matrixTransform(path.getScreenCTM())
      const a = nodes[edges[i][0]], b = nodes[edges[i][1]]
      return Math.max(Math.hypot(start.x - a.x - a.width / 2, start.y - a.y - a.height / 2), Math.hypot(end.x - b.x - b.width / 2, end.y - b.y - b.height / 2))
    })
  })
  assert.ok(systemAlignment.every(n => n < .1), 'DP schematic connections stay attached during hover')
  results.artwork.systemAlignment = systemAlignment
  assert.ok(results.artwork.palettes.some(([id, ink]) => id === 'dentalplans' && ink === '#426641'))
  assert.ok(results.artwork.palettes.some(([id, ink]) => id === 'hydra' && ink === '#582323'))
  const luminance = rgb => rgb.map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4).reduce((a, n, i) => a + n * [.2126, .7152, .0722][i], 0)
  await page.locator('.motion-control').evaluate(n => n.style.visibility = 'hidden')
  // Sample the actual light fields beneath text with glyphs temporarily hidden.
  // Keep the requested .4 glass intact, including its real blurred diagram layers.
  for (const copy of await page.locator('.featured-work-copy').all()) {
    await copy.scrollIntoViewIfNeeded()
    const colors = await copy.locator('h4,p,.work-card-badges span').evaluateAll(nodes => nodes.map(n => getComputedStyle(n).color))
    await copy.evaluate(n => [...n.children].forEach(c => c.style.visibility = 'hidden'))
    const png = PNG.sync.read(await copy.screenshot({path:`${output}/glass-${await copy.locator('h4').textContent()}.png`}))
    let min = 1
    for (let y = 24; y < png.height - 24; y += 3) for (let x = 24; x < png.width - 24; x += 3) {
      const i = (y * png.width + x) * 4
      const lum = luminance([...png.data.subarray(i, i + 3)])
      min = Math.min(min, lum)
    }
    await copy.evaluate(n => [...n.children].forEach(c => c.style.removeProperty('visibility')))
    const ratios = colors.map(color => (min + .05) / (luminance(color.match(/[\d.]+/g).slice(0,3).map(Number)) + .05))
    assert.ok(ratios.every(r => r >= 4.5), `actual glass contrast: ${ratios}`)
    results.contrast[await copy.locator('h4').innerText()] = Math.min(...ratios)
  }
  await page.close()

  for (const reducedMotion of ['reduce', 'no-preference']) {
    const touch = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion, hasTouch: true, isMobile: true })
    watch(touch)
    await touch.goto(`${base}/`, { waitUntil: 'networkidle' })
    const network = touch.locator('.thinking-thumb.thinking-art-call-center-ux .thinking-connections')
    await network.scrollIntoViewIfNeeded()
    await touch.waitForTimeout(200)
    const start = await snapshot(network)
    await touch.waitForTimeout(800)
    const end = await snapshot(network)
    verifyNetwork(end)
    if (reducedMotion === 'reduce') {
      assert.deepEqual(start, end)
      const names = await touch.evaluate(() => [...document.querySelectorAll('.personalization-rays,.featured-health-ring,.featured-system-packet')].map(n => getComputedStyle(n).animationName))
      assert.ok(names.every(n => n === 'none'))
      assert.equal(await touch.locator('.thinking-thumb.thinking-art-roadmap .thinking-icon').evaluate(n => getComputedStyle(n, '::before').animationName), 'none')
    } else assert.notDeepEqual(start.nodes, end.nodes)
    await touch.locator('.thinking-thumb.thinking-art-call-center-ux').tap()
    await touch.getByRole('dialog').waitFor()
    await touch.keyboard.press('Escape')
    results.networks[reducedMotion] = { static: reducedMotion === 'reduce', directTap: true }
    await touch.close()
  }

  const standalone = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' })
  watch(standalone)
  await standalone.goto(`${base}/case-studies/`, { waitUntil: 'networkidle' })
  const shared = standalone.locator('.thinking-art-call-center-ux .thinking-connections').first()
  await shared.scrollIntoViewIfNeeded()
  await standalone.waitForTimeout(200)
  verifyNetwork(await snapshot(shared))
  const sharedRoot = shared.locator('xpath=ancestor::*[@data-motion-root][1]')
  await sharedRoot.hover()
  await standalone.waitForTimeout(850)
  verifyNetwork(await snapshot(shared))
  results.networks.standalone = { exactAttachment: true, hover: true }
  await standalone.close()
  assert.deepEqual(results.errors, [])
  console.log('Refinement acceptance passed: attached 3D vertices, packet paths, sunbeam hover/focus, depth, palettes, glyphs, contrast, touch, reduced motion, pause and offscreen.')
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
  await browser.close()
}
