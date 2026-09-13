import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const base = process.env.PREVIEW_URL ?? 'http://localhost:3011'
const browser = await chromium.launch({ headless: true })
const errors = []
const watch = (page) => {
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
  watch(desktop)
  assert.equal((await desktop.goto(`${base}/#full-stack`, { waitUntil: 'networkidle' })).status(), 200)

  const callCenter = desktop.locator('.thinking-art-call-center-ux')
  await callCenter.scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(250)

  const before = await callCenter.evaluate((card) => {
    const read = (selector) => {
      const node = card.querySelector(selector)
      const style = getComputedStyle(node)
      return { name: style.animationName, state: style.animationPlayState, transform: style.transform, translate: style.translate, cx: node.getAttribute('cx'), x1: node.getAttribute('x1') }
    }
    return {
      nodes: card.querySelectorAll('.thinking-network-node').length,
      lines: card.querySelectorAll('.thinking-connections line').length,
      anchor: read('.thinking-icon-anchor'),
      network: read('.thinking-connections'),
      node: read('.thinking-network-node'),
      line: read('.thinking-connections line'),
      networkState: card.querySelector('.thinking-connections').dataset.networkState,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  await desktop.waitForTimeout(700)
  const after = await callCenter.evaluate((card) => ({
    anchor: getComputedStyle(card.querySelector('.thinking-icon-anchor')).translate,
    network: getComputedStyle(card.querySelector('.thinking-connections')).transform,
    node: card.querySelector('.thinking-network-node').getAttribute('cx'),
    line: card.querySelector('.thinking-connections line').getAttribute('x1'),
  }))

  assert.equal(before.nodes, 38)
  assert.equal(before.lines, 80)
  assert.equal(before.overflow, 0)
  assert.deepEqual(
    [before.anchor.name, before.network.name, before.node.name, before.line.name],
    ['focal-float', 'none', 'none', 'none'],
  )
  assert.ok([before.anchor.state, before.network.state, before.node.state, before.line.state].every((state) => state === 'running'))
  assert.notEqual(before.anchor.translate, after.anchor)
  assert.equal(before.networkState, 'running')
  assert.notEqual(before.node.cx, after.node)
  assert.notEqual(before.line.x1, after.line)
  assert.equal(after.node, after.line, 'first connection remains attached to its node')

  await callCenter.hover()
  await desktop.waitForTimeout(100)
  const hoverStates = await callCenter.evaluate((card) => [
    '.thinking-icon-anchor', '.thinking-connections', '.thinking-network-node', '.thinking-connections line',
  ].map((selector) => getComputedStyle(card.querySelector(selector)).animationPlayState))
  assert.equal(hoverStates[0], 'running')

  const photo = desktop.locator('.thinking-thumb-photo').first()
  await photo.scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(250)
  assert.equal(await photo.locator('.thinking-photo-image').evaluate((node) => getComputedStyle(node).animationName), 'photo-idle')
  assert.equal(await photo.locator('.thinking-photo-image').evaluate((node) => getComputedStyle(node).animationPlayState), 'running')

  await desktop.getByRole('button', { name: 'Pause motion' }).click()
  assert.equal(await photo.locator('.thinking-photo-image').evaluate((node) => getComputedStyle(node).animationPlayState), 'paused')
  assert.equal(await desktop.locator('html').evaluate((node) => node.classList.contains('motion-paused')), true)
  await desktop.close()

  const reduced = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce', hasTouch: true, isMobile: true })
  watch(reduced)
  assert.equal((await reduced.goto(`${base}/#full-stack`, { waitUntil: 'networkidle' })).status(), 200)
  const reducedCard = reduced.locator('.thinking-art-call-center-ux')
  await reducedCard.scrollIntoViewIfNeeded()
  const reducedNames = await reducedCard.evaluate((card) => [
    '.thinking-icon-anchor', '.thinking-connections', '.thinking-network-node', '.thinking-connections line',
  ].map((selector) => getComputedStyle(card.querySelector(selector)).animationName))
  assert.ok(reducedNames.every((name) => name === 'none'))
  assert.equal(await reduced.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0)
  await reduced.close()

  assert.deepEqual(errors, [])
  console.log(JSON.stringify({ desktop: before, after, hoverStates, reducedNames, errors }, null, 2))
} finally {
  await browser.close()
}
