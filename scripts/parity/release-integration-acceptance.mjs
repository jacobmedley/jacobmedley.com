import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:8099'
const output = process.env.INTEGRATION_OUTPUT ?? 'scripts/parity/shots/release-integration-20260922'
const manifest = JSON.parse(execFileSync(process.execPath, ['scripts/verify-design-system.mjs', '--manifest'], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }))
const examples = manifest.flatMap(pattern => pattern.examples.map(example => ({ pattern: pattern.id, ...example })))
const routes = [...new Set(examples.map(example => example.route))]
const results = { base, routes: [], modals: [], catalog: { patterns: manifest.length, examples: examples.length, failures: [] }, focus: {}, abortedRequests: [], errors: [] }

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const baseOrigin = new URL(base).origin

function watch(page, label) {
  page.on('pageerror', error => results.errors.push(`${label}: ${error.message}`))
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().includes('Failed to load resource')) {
      results.errors.push(`${label}: ${message.text()}`)
    }
  })
  page.on('requestfailed', request => {
    if (new URL(request.url()).origin === baseOrigin) {
      const errorText = request.failure()?.errorText ?? 'unknown'
      const detail = `${label}: request failed ${request.url()} (${errorText})`
      if (errorText === 'net::ERR_ABORTED') results.abortedRequests.push(detail)
      else results.errors.push(detail)
    }
  })
}

async function load(page, route) {
  const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' })
  assert.equal(response?.status(), 200, `${route} must return 200`)
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function inspectRoute(page, route, width) {
  await load(page, route)
  const state = await page.evaluate(() => ({
    textLength: document.body.innerText.trim().length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    overlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
    brokenImages: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src),
    title: document.title,
  }))
  assert.ok(state.textLength > 100, `${route} must render meaningful content`)
  assert.ok(state.overflow <= 1, `${route} has ${state.overflow}px horizontal overflow at ${width}px`)
  assert.equal(state.overlay, false, `${route} must not show a framework error overlay`)
  assert.deepEqual(state.brokenImages, [], `${route} has broken images`)
  results.routes.push({ route, width, ...state })
}

try {
  const routePage = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })
  watch(routePage, 'routes')
  for (const route of routes) await inspectRoute(routePage, route, 1280)
  for (const route of ['/', '/case-studies/', '/case-studies/one-platform-five-properties/', '/design-system/']) {
    await routePage.setViewportSize({ width: 390, height: 844 })
    await inspectRoute(routePage, route, 390)
    await routePage.setViewportSize({ width: 1280, height: 900 })
  }
  await routePage.close()

  const modalPage = await browser.newPage({ viewport: { width: 1440, height: 950 }, reducedMotion: 'reduce' })
  watch(modalPage, 'modals')
  await load(modalPage, '/')
  const modalIds = await modalPage.locator('[data-modal-trigger]').evaluateAll(nodes => nodes.map(node => node.dataset.modalTrigger))
  assert.equal(modalIds.length, 14, 'all fourteen homepage case-study dialogs must remain available')
  for (const id of modalIds) {
    const trigger = modalPage.locator(`[data-modal-trigger="${id}"]`)
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    const dialog = modalPage.getByRole('dialog')
    await dialog.waitFor()
    const state = await dialog.evaluate(node => {
      const body = node.querySelector('.modal-body')
      return {
        textLength: body?.innerText.trim().length ?? 0,
        overflow: body ? body.scrollWidth - body.clientWidth : null,
        brokenImages: [...node.querySelectorAll('img')].filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src),
      }
    })
    assert.ok(state.textLength > 200, `${id} dialog must render its study content`)
    assert.ok(state.overflow !== null && state.overflow <= 1, `${id} dialog has horizontal overflow`)
    assert.deepEqual(state.brokenImages, [], `${id} dialog has broken images`)
    results.modals.push({ id, ...state })
    await modalPage.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    await modalPage.waitForFunction(modalId => document.activeElement?.getAttribute('data-modal-trigger') === modalId, id, { timeout: 2000 })
    assert.equal(await trigger.evaluate(node => node === document.activeElement), true, `${id} must restore focus to its trigger`)
  }
  await modalPage.close()

  const focusPage = await browser.newPage({ viewport: { width: 1440, height: 950 }, reducedMotion: 'no-preference' })
  watch(focusPage, 'focus')
  await load(focusPage, '/')
  const focusTrigger = focusPage.locator('[data-modal-trigger="webmd"]')
  await focusTrigger.scrollIntoViewIfNeeded()
  await focusTrigger.focus()
  await focusPage.waitForTimeout(450)
  results.focus = await focusTrigger.evaluate(node => {
    const card = node.closest('.featured-work-card')
    const style = getComputedStyle(card)
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, outlineOffset: style.outlineOffset, animationName: style.animationName }
  })
  assert.equal(results.focus.outlineStyle, 'solid', 'featured card must expose the shared focus outline')
  assert.notEqual(results.focus.outlineWidth, '0px', 'featured card focus outline must be visible')
  await focusPage.screenshot({ path: `${output}/home-focus-desktop.png`, fullPage: false })
  await focusPage.close()

  const grouped = new Map()
  for (const example of examples) {
    const key = `${example.route}|${example.modal ?? ''}`
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(example)
  }
  const catalogPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  watch(catalogPage, 'catalog')
  for (const group of grouped.values()) {
    const { route, modal } = group[0]
    await load(catalogPage, route)
    if (modal) {
      const trigger = catalogPage.locator(`[data-modal-trigger="${modal}"]`)
      if (await trigger.count()) {
        await trigger.click()
        await catalogPage.getByRole('dialog').waitFor()
      } else {
        results.catalog.failures.push({ route, modal, reason: 'missing modal trigger' })
        continue
      }
    }
    for (const example of group) {
      if (await catalogPage.locator(example.selector).count() === 0) {
        results.catalog.failures.push({ pattern: example.pattern, route, modal, selector: example.selector })
      }
    }
  }
  await catalogPage.close()
  assert.deepEqual(results.catalog.failures, [], 'every source-backed catalog locator must resolve on the integrated tree')
  assert.deepEqual(results.errors, [], 'browser errors must be empty')
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
  await browser.close()
}

console.log(`Release integration acceptance passed: ${results.routes.length} route/viewport checks, ${results.modals.length} dialogs, ${results.catalog.examples} catalog locators, and shared card focus.`)
