import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:8099'
const output = process.env.TEXT_REFLOW_OUTPUT ?? 'scripts/parity/shots/release-text-reflow-20260922'
const widths = [320, 375, 768, 1100, 1440]
const results = { base, pages: [], modals: [], errors: [] }

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })

function watch(page, scope) {
  page.on('pageerror', error => results.errors.push({ scope, type: 'pageerror', message: error.message }))
  page.on('console', message => {
    if (message.type() === 'error') results.errors.push({ scope, type: 'console', message: message.text() })
  })
}

async function load(page) {
  const response = await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  assert.equal(response?.status(), 200, 'homepage must return 200')
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function inspect(page, scope = 'body') {
  return page.locator(scope).evaluate(root => {
    const candidates = root.querySelectorAll('h1,h2,h3,h4,p,button,a,li,strong')
    const clippedText = []
    for (const element of candidates) {
      if (element.closest('.sr-only,[aria-hidden="true"]')) continue
      const text = element.textContent?.trim()
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      if (!text || !rect.width || !rect.height || style.visibility === 'hidden' || style.display === 'none') continue
      if (['inline', 'contents'].includes(style.display) || ['auto', 'scroll'].includes(style.overflowX)) continue
      if (element.scrollWidth > element.clientWidth + 2) {
        clippedText.push({
          tag: element.tagName,
          className: typeof element.className === 'string' ? element.className : '',
          text: text.slice(0, 80),
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
        })
      }
    }
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      scopeOverflow: root.scrollWidth - root.clientWidth,
      clippedText,
    }
  })
}

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    watch(page, `page-${width}`)
    await load(page)
    const state = await inspect(page)
    results.pages.push({ width, ...state })
    assert.ok(state.pageOverflow <= 1, `homepage has ${state.pageOverflow}px horizontal overflow at ${width}px and 200% text`)
    assert.deepEqual(state.clippedText, [], `homepage clips visible text at ${width}px and 200% text`)

    if (width === 320) {
      const modalIds = await page.locator('[data-modal-trigger]').evaluateAll(nodes => nodes.map(node => node.dataset.modalTrigger))
      for (const id of modalIds) {
        await page.locator(`[data-modal-trigger="${id}"]`).click()
        const dialog = page.getByRole('dialog')
        await dialog.waitFor()
        const modalState = await inspect(page, '.modal-body')
        results.modals.push({ id, ...modalState })
        assert.ok(modalState.scopeOverflow <= 1, `${id} dialog has ${modalState.scopeOverflow}px horizontal overflow at 320px and 200% text`)
        assert.deepEqual(modalState.clippedText, [], `${id} dialog clips visible text at 320px and 200% text`)
        await page.keyboard.press('Escape')
        await dialog.waitFor({ state: 'hidden' })
      }
    }
    await page.close()
  }
  assert.deepEqual(results.errors, [], 'browser errors must be empty')
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
  await browser.close()
}

console.log(`Text reflow acceptance passed: ${results.pages.length} viewport checks and ${results.modals.length} dialogs at 200% text.`)
