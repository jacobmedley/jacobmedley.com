/** Acceptance adapter for B80–B87. Receives the active in-app Browser handles;
 * never launches a browser. Raw screenshots and rendered text stay local.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

export const ids = ['webmd', 'dentalplans', 'bumblebeemd', 'hydra', 'opfred', 'split-test', 'call-center-ux', 'marketing-auto', 'workshops', 'roadmap', 'personas', 'wrong', 'reveal', 'viva']
export const slugs = ['one-platform-five-properties', 'building-a-design-function', 'one-customer-journey', 'navigation-beyond-opinion', 'tokens-before-pages', 'a-checkout-decision-with-receipts']
export const output = new URL('./shots/reviewed-copy-20260929/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
export const results = { modals: [], stories: [], home: [], demo: {}, motion: {}, failures: [] }
const check = (value, message) => { if (!value) results.failures.push(message) }
export async function evaluate(cdp, fn, arg) {
  const response = await cdp.send('Runtime.evaluate', { expression: `(async()=>JSON.stringify(await (${fn})(${JSON.stringify(arg) ?? ''})))()`, awaitPromise: true, returnByValue: true })
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails))
  return JSON.parse(response.result.value ?? 'null')
}
export async function settle(cdp) {
  await evaluate(cdp, async () => {
    await document.fonts.ready
    await Promise.allSettled(document.getAnimations().filter(a => a.playState === 'running' && a.effect?.getTiming().iterations === 1 && a.effect.getTiming().duration <= 1500).map(a => a.finished))
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
}
export async function layout({ viewport, cdp }, width, textScale = 1) {
  await viewport.set({ width, height: 1000 })
  await evaluate(cdp, scale => {
    document.documentElement.style.fontSize = scale === 1 ? '' : `${scale * 100}%`
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, textScale)
  await settle(cdp)
  check(await evaluate(cdp, width => innerWidth === width, width), `Viewport mismatch: requested ${width}`)
}
export async function screenshot(cdp, name) {
  await settle(cdp)
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  await fs.mkdir(output, { recursive: true })
  await fs.writeFile(path.join(output, `${name}.png`), Buffer.from(shot.data, 'base64'))
}
export async function modals(ctx, width, textScale = 1, subset = ids) {
  const { tab, cdp } = ctx
  await tab.goto('http://localhost:8090/')
  await layout(ctx, width, textScale)
  for (const id of subset) {
    await tab.playwright.locator(`[data-modal-trigger="${id}"]`).click()
    await tab.playwright.getByRole('dialog').waitFor({ state: 'visible' })
    await settle(cdp)
    const label = `modal-${id}-${width}-${textScale}x`
    const state = await evaluate(cdp, async id => {
      const dialog = document.querySelector('[role="dialog"]')
      const body = dialog.querySelector('.modal-body')
      const images = [...dialog.querySelectorAll('img')]
      // Eagerly decode the complete modal's lazy images for asset verification.
      // The temporary attributes disappear when the dialog is unmounted.
      await Promise.allSettled(images.map(img => { img.loading = 'eager'; return img.decode() }))
      const visible = n => { const r = n.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(n).visibility !== 'hidden' }
      const texts = [...body.querySelectorAll('h2,h3,h4,p,li,.badge-work')].filter(visible)
      const arts = [...body.querySelectorAll('.study-supporting-art')].map(n => ({ kind: n.dataset.supportingArt, overflow: n.scrollWidth - n.clientWidth }))
      return {
        id, width: innerWidth, overflow: body.scrollWidth - body.clientWidth,
        focusedInside: dialog.contains(document.activeElement),
        brokenImages: images.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.getAttribute('src')),
        imageCount: images.length,
        textClips: texts.filter(n => n.scrollWidth > n.clientWidth + 2 || (getComputedStyle(n).overflowY === 'hidden' && n.scrollHeight > n.clientHeight + 2)).map(n => n.textContent),
        headings: [...body.querySelectorAll('h2,h3,h4')].map(n => ({ level: n.tagName, text: n.textContent })),
        renderedText: body.innerText, arts,
      }
    }, id)
    check(state.overflow <= 1, `${label} overflow ${state.overflow}`)
    check(state.brokenImages.length === 0, `${label} images ${state.brokenImages}`)
    check(state.focusedInside, `${label} focus not inside`)
    check(state.textClips.length === 0, `${label} text clipping ${JSON.stringify(state.textClips)}`)
    check(state.arts.every(a => a.overflow <= 1), `${label} supporting art overflow`)
    // Record each content heading and the final viewport, preserving actual layout.
    const headings = await evaluate(cdp, () => document.querySelectorAll('.modal-body h3').length)
    await screenshot(cdp, `${label}-top`)
    for (let index = 1; index < headings; index++) {
      await evaluate(cdp, index => document.querySelectorAll('.modal-body h3')[index].scrollIntoView({ block: 'start', behavior: 'instant' }), index)
      await screenshot(cdp, `${label}-section-${index}`)
    }
    await evaluate(cdp, () => { const n = document.querySelector('.modal-body'); n.scrollTop = n.scrollHeight })
    await screenshot(cdp, `${label}-end`)
    results.modals.push({ width, textScale, ...state })
    await tab.playwright.getByRole('dialog').press('Escape')
    await tab.playwright.getByRole('dialog').waitFor({ state: 'hidden' })
    check(await evaluate(cdp, id => document.activeElement?.dataset.modalTrigger === id, id), `${label} focus return`)
  }
  return { checked: subset.length, failures: results.failures }
}
export async function stories(ctx, width, textScale = 1, subset = slugs) {
  const { tab, cdp } = ctx
  for (const slug of subset) {
    await tab.goto(`http://localhost:8090/case-studies/${slug}/`)
    await layout(ctx, width, textScale)
    const label = `story-${slug}-${width}-${textScale}x`
    const state = await evaluate(cdp, () => {
      const visible = n => { const r = n.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(n).visibility !== 'hidden' }
      return {
        width: innerWidth, overflow: document.documentElement.scrollWidth - innerWidth,
        h1Count: document.querySelectorAll('h1').length,
        nav: [...document.querySelectorAll('.cs-story-sidebar nav a')].map(n => ({ text: n.innerText.trim(), href: n.getAttribute('href'), exists: Boolean(document.querySelector(n.getAttribute('href'))), width: n.getBoundingClientRect().width, scrollWidth: n.scrollWidth })),
        textClips: [...document.querySelectorAll('.cs-story p,.cs-story h2,.cs-story li,.cs-story-sidebar a')].filter(visible).filter(n => n.scrollWidth > n.clientWidth + 2).map(n => n.textContent),
        headings: [...document.querySelectorAll('main h1,main h2')].map(n => ({ level: n.tagName, text: n.textContent })),
        renderedText: document.querySelector('main').innerText,
        next: document.querySelector('.cs-next-study a')?.getAttribute('href'),
      }
    })
    check(state.overflow <= 1, `${label} overflow ${state.overflow}`)
    check(state.h1Count === 1 && state.nav.length === 4 && state.nav.every(n => n.exists), `${label} heading/navigation structure`)
    check(state.textClips.length === 0, `${label} text clipping ${JSON.stringify(state.textClips)}`)
    await screenshot(cdp, `${label}-top`)
    for (let index = 0; index < 4; index++) {
      await evaluate(cdp, index => document.querySelectorAll('.cs-story-section')[index].scrollIntoView({ block: 'start', behavior: 'instant' }), index)
      await screenshot(cdp, `${label}-section-${index}`)
    }
    results.stories.push({ slug, width, textScale, ...state })
  }
  return { checked: subset.length, failures: results.failures }
}
export async function enlargedReading(ctx) {
  const { tab, cdp } = ctx
  results.enlargedReading = []
  for (const slug of slugs) {
    await tab.goto(`http://localhost:8090/case-studies/${slug}/`)
    await layout(ctx, 390)
    // Text-only enlargement also covers the reading stylesheet's px fonts.
    // Capture sizes before mutation so nested text is not doubled twice.
    await evaluate(cdp, () => {
      const elements = [...document.querySelectorAll('main *')]
        .filter(n => [...n.childNodes].some(c => c.nodeType === 3 && c.textContent.trim()))
        .map(n => [n, parseFloat(getComputedStyle(n).fontSize)])
      for (const [n, size] of elements) n.style.fontSize = `${size * 2}px`
    })
    await settle(cdp)
    const state = await evaluate(cdp, () => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      clips: [...document.querySelectorAll('main h1,main h2,main p,main li,main a,main dd,main dt')]
        .filter(n => n.clientWidth > 0 && n.scrollWidth > n.clientWidth + 2).map(n => n.textContent),
      paragraphSize: getComputedStyle(document.querySelector('.cs-story-section>p:not(.cs-eyebrow)')).fontSize,
    }))
    await tab.playwright.locator('.cs-story-sidebar a').first().click()
    await settle(cdp)
    state.anchorClear = await evaluate(cdp, () => document.querySelector('.cs-story-section').getBoundingClientRect().top >= document.querySelector('.cs-story-sidebar').getBoundingClientRect().bottom)
    check(state.overflow <= 1 && state.clips.length === 0 && state.anchorClear, `Actual 200% reading text: ${slug}: ${JSON.stringify(state)}`)
    await screenshot(cdp, `actual-enlarged-${slug}`)
    results.enlargedReading.push({ slug, ...state })
  }
  return results.enlargedReading
}
export async function save() {
  await fs.mkdir(output, { recursive: true })
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2))
  return { modals: results.modals.length, stories: results.stories.length, failures: results.failures }
}
