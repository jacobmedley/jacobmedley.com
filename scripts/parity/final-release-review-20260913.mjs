/** In-app Browser acceptance adapter for the final unpublished candidate.
 * It receives the existing Browser skill tab/CDP/viewport and never launches
 * or installs a browser. Large screenshots remain local and ignored.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

export const projectIds = ['webmd', 'dentalplans', 'bumblebeemd', 'hydra', 'opfred', 'split-test', 'call-center-ux', 'marketing-auto', 'workshops', 'roadmap', 'personas', 'reveal', 'viva', 'wrong']
export const slugs = ['one-platform-five-properties', 'building-a-design-function', 'one-customer-journey', 'navigation-beyond-opinion', 'tokens-before-pages', 'a-checkout-decision-with-receipts']
export const widths = [320, 375, 438, 439, 768, 1100, 1440]
export const output = new URL('./shots/final-release-20260913/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
export const results = { home: [], modals: [], stories: [], filters: [], demo: {}, motion: {}, logs: [], failures: [] }
export const startingCheckpoint = '4aefa908aa6356724ce93a27baab66cb1c7b5f1f'

const check = (condition, message) => { if (!condition) results.failures.push(message) }
export async function evaluate(cdp, fn, arg) {
  const response = await cdp.send('Runtime.evaluate', { expression: `(async()=>JSON.stringify(await (${fn})(${JSON.stringify(arg) ?? ''})))()`, awaitPromise: true, returnByValue: true })
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails))
  return JSON.parse(response.result.value ?? 'null')
}
const paint = cdp => evaluate(cdp, () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
const settle = async (tab, cdp) => { await tab.playwright.waitForTimeout(60); await paint(cdp) }

async function setLayout(viewport, cdp, width, textScale = 1) {
  await viewport.set({ width, height: 900 })
  await evaluate(cdp, scale => {
    document.documentElement.style.fontSize = scale === 1 ? '' : `${scale * 100}%`
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, textScale)
  await paint(cdp)
}

export async function runHome({ tab, cdp, viewport }, baseUrl) {
  await tab.goto(`${baseUrl}/`)
  for (const width of widths) {
    await setLayout(viewport, cdp, width)
    const state = await evaluate(cdp, () => {
      const visible = node => { const s = getComputedStyle(node); const r = node.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0 }
      const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
      const headings = [...document.querySelectorAll('.section-heading-reserve')].filter(visible)
      const fixed = [...document.querySelectorAll('body *')].filter(node => visible(node) && getComputedStyle(node).position === 'fixed')
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        motionControls: document.querySelectorAll('.motion-control').length,
        stickyHeadings: headings.filter(node => getComputedStyle(node).position === 'sticky').length,
        fixedHeadingCollisions: fixed.flatMap(a => headings.filter(b => intersects(a.getBoundingClientRect(), b.getBoundingClientRect())).map(b => `${a.className} / ${b.className}`)),
        nav: [...document.querySelectorAll('#the-menu a')].map(a => a.getAttribute('href')),
        heroRoles: [...document.querySelectorAll('.kinetic-word')].map(n => n.textContent),
        finalRole: document.querySelector('.kinetic-word:last-of-type')?.textContent,
      }
    })
    check(state.overflow <= 1, `home horizontal overflow at ${width}px: ${state.overflow}`)
    check(state.motionControls === 0 && state.stickyHeadings === 0 && state.fixedHeadingCollisions.length === 0, `ACC-B02 overlap/control regression at ${width}px`)
    check(state.nav.join() === '#hi,#work,#full-stack,#resume,#education', `home navigation targets at ${width}px`)
    check(state.heroRoles.join() === 'Product,UX,Systems,IxD,Human', 'accepted hero role sequence changed')
    results.home.push({ width, ...state })
  }

  await setLayout(viewport, cdp, 320, 2)
  const enlarged = await evaluate(cdp, () => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, visibleFixed: [...document.querySelectorAll('body *')].filter(n => getComputedStyle(n).position === 'fixed' && getComputedStyle(n).display !== 'none').map(n => n.className) }))
  check(enlarged.overflow <= 1, `home overflow at 320px / 200% text: ${enlarged.overflow}`)
  check(!enlarged.visibleFixed.some(name => String(name).includes('motion-control')), 'motion control visible at enlarged text')
  results.home.push({ width: 320, textScale: 2, ...enlarged })
}

export async function runModals({ tab, cdp, viewport }, baseUrl) {
  for (const scenario of [{ width: 375, textScale: 1 }, { width: 1440, textScale: 1 }, { width: 320, textScale: 2 }]) {
    await tab.goto(`${baseUrl}/`)
    await setLayout(viewport, cdp, scenario.width, scenario.textScale)
    for (const id of projectIds) {
      const trigger = tab.playwright.locator(`[data-modal-trigger="${id}"]`)
      await trigger.click()
      await tab.playwright.getByRole('dialog').waitFor({ state: 'visible' })
      await settle(tab, cdp)
      const modal = await evaluate(cdp, id => {
        const dialog = document.querySelector('[role="dialog"]'); const body = dialog.querySelector('.modal-body')
        const arts = [...dialog.querySelectorAll('.study-supporting-art')].map(art => {
          const frame = art.getBoundingClientRect()
          const nodes = [...art.querySelectorAll('.study-supporting-art-center,.study-supporting-art-orbit>span,.study-supporting-art-flow b')]
          return { kind: art.dataset.supportingArt, overflowX: art.scrollWidth - art.clientWidth, overflowY: art.scrollHeight - art.clientHeight,
            nodesInside: nodes.every(node => { const r = node.getBoundingClientRect(); return r.left >= frame.left - 1 && r.right <= frame.right + 1 && r.top >= frame.top - 1 && r.bottom <= frame.bottom + 1 }) }
        })
        return { id, overflow: body.scrollWidth - body.clientWidth, arts, dialogName: dialog.getAttribute('aria-label') || dialog.getAttribute('aria-labelledby'), demo: Boolean(dialog.querySelector('.call-center-demo')) }
      }, id)
      check(modal.overflow <= 1, `modal overflow ${id} at ${scenario.width}px/${scenario.textScale}x: ${modal.overflow}`)
      check(modal.arts.every(art => art.overflowX <= 1 && art.overflowY <= 1 && art.nodesInside), `schematic clipping ${id} at ${scenario.width}px/${scenario.textScale}x: ${JSON.stringify(modal.arts)}`)
      if (id === 'call-center-ux') check(modal.demo, 'call-center interactive demo missing')
      results.modals.push({ ...scenario, ...modal })
      await tab.playwright.getByRole('dialog').press('Escape')
      await tab.playwright.getByRole('dialog').waitFor({ state: 'hidden' })
      check(await evaluate(cdp, id => document.activeElement?.dataset.modalTrigger === id, id), `modal focus did not return for ${id} at ${scenario.width}px/${scenario.textScale}x`)
    }
  }
}

export async function runDemo({ tab, cdp, viewport }, baseUrl) {
  await tab.goto(`${baseUrl}/`); await setLayout(viewport, cdp, 375)
  await tab.playwright.locator('[data-modal-trigger="call-center-ux"]').click(); await tab.playwright.getByRole('dialog').waitFor({ state: 'visible' })
  for (const label of ['Ready', 'Busy', 'Closed']) {
    await tab.playwright.getByRole('button', { name: label, exact: true }).click(); await settle(tab, cdp)
    const state = await evaluate(cdp, () => ({ state: document.querySelector('.call-center-demo').dataset.state, pressed: document.querySelector('.demo-state-buttons [aria-pressed="true"]')?.textContent.trim(), offer: document.querySelector('.demo-selected-state p')?.textContent }))
    check(state.pressed === label, `call-center ${label} state did not activate`); results.demo[label.toLowerCase()] = state
  }
  const toggle = tab.playwright.getByRole('switch', { name: 'Highlight' }); await toggle.click()
  results.demo.highlight = await toggle.getAttribute('aria-checked'); check(results.demo.highlight === 'true', 'call-center highlight toggle did not activate')
  await tab.playwright.getByRole('button', { name: 'Open mobile menu' }).click()
  check(await tab.playwright.getByRole('navigation', { name: 'Demo store navigation' }).count() === 1, 'call-center mobile menu did not open')
  await tab.playwright.getByRole('dialog').press('Escape'); await tab.playwright.getByRole('dialog').waitFor({ state: 'hidden' })
}

export async function runIndexAndStories({ tab, cdp, viewport }, baseUrl) {
  await tab.goto(`${baseUrl}/case-studies/`); await setLayout(viewport, cdp, 375)
  for (const category of ['All Work', 'Product', 'Systems', 'UX Research', 'Leadership', 'Brand']) {
    await tab.playwright.getByRole('button', { name: category, exact: true }).click(); await settle(tab, cdp)
    const state = await evaluate(cdp, category => ({ category, pressed: document.querySelector('.cs-filters [aria-pressed="true"]')?.textContent, cards: [...document.querySelectorAll('.cs-study-card')].map(card => [...card.querySelectorAll('.cs-badges span')].map(n => n.textContent)) }), category)
    check(state.pressed === category && (category === 'All Work' || state.cards.every(tags => tags.includes(category))), `case-study filter ${category}`)
    results.filters.push(state)
  }
  for (const scenario of [{ width: 1440, textScale: 1 }, { width: 320, textScale: 2 }]) {
    for (const slug of slugs) {
      await tab.goto(`${baseUrl}/case-studies/${slug}/`); await setLayout(viewport, cdp, scenario.width, scenario.textScale)
      const story = await evaluate(cdp, slug => ({ slug, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, h1: document.querySelectorAll('h1').length, storyNav: document.querySelectorAll('.cs-story-sidebar nav a').length, next: Boolean(document.querySelector('.cs-next-study a[href*="/case-studies/"]')), back: document.querySelector('.cs-back-link')?.getAttribute('href') }), slug)
      check(story.overflow <= 1 && story.h1 === 1 && story.storyNav === 4 && story.next && story.back === '/case-studies/', `standalone route ${slug} at ${scenario.width}px/${scenario.textScale}x: ${JSON.stringify(story)}`)
      results.stories.push({ ...scenario, ...story })
    }
  }
}

export async function runMotionAndKeyboard({ tab, cdp, viewport }, baseUrl) {
  await tab.goto(`${baseUrl}/`); await setLayout(viewport, cdp, 375)
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await paint(cdp)
  results.motion.reduced = await evaluate(cdp, () => ({ state: document.querySelector('.kinetic-identity').dataset.heroState, animations: document.querySelector('.kinetic-identity').getAnimations({ subtree: true }).length, product: getComputedStyle(document.querySelector('[data-role="Product"]')).opacity, cta: getComputedStyle(document.querySelector('.kinetic-closing')).opacity }))
  check(results.motion.reduced.state === 'static' && results.motion.reduced.animations === 0 && results.motion.reduced.product === '1' && results.motion.reduced.cta === '1', `reduced-motion hero: ${JSON.stringify(results.motion.reduced)}`)
  await cdp.send('Emulation.setEmulatedMedia', { features: [] }); await tab.reload(); await settle(tab, cdp)
  await tab.playwright.locator('[data-modal-trigger="hydra"]').press('Enter'); await tab.playwright.getByRole('dialog').waitFor({ state: 'visible' })
  await tab.playwright.getByRole('dialog').press('Escape'); await tab.playwright.getByRole('dialog').waitFor({ state: 'hidden' })
  results.motion.keyboardFocusReturn = await evaluate(cdp, () => document.activeElement?.dataset.modalTrigger)
  check(results.motion.keyboardFocusReturn === 'hydra', 'keyboard modal focus return')
}

export async function runAll(ctx, baseUrl = 'http://localhost:3013') {
  await runHome(ctx, baseUrl)
  await runModals(ctx, baseUrl)
  await runDemo(ctx, baseUrl)
  await runIndexAndStories(ctx, baseUrl)
  await runMotionAndKeyboard(ctx, baseUrl)
  results.logs = await ctx.tab.dev.logs({ levels: ['error', 'warn'] })
  check(results.logs.length === 0, `browser console warnings/errors: ${JSON.stringify(results.logs)}`)
  await fs.mkdir(output, { recursive: true })
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2))
  return results
}

export async function sourceChecks() {
  const preserved = [
    'components/ui/KineticHeroIdentity.tsx',
    'components/ui/MotionControls.tsx',
    'lib/data/projects.ts',
    'docs/case-study-site-copy.json',
    'docs/copy-register.md',
    'docs/jacob-style.md',
    'docs/voice-and-tone.md',
    'docs/data-reporting.md',
  ]
  for (const file of preserved) {
    const current = (await fs.readFile(file, 'utf8')).replace(/\r\n/g, '\n')
    const checkpoint = execFileSync('git', ['show', `${startingCheckpoint}:${file}`], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).replace(/\r\n/g, '\n')
    if (current !== checkpoint) throw new Error(`${file} changed after the accepted starting checkpoint`)
  }
  return { startingCheckpoint, preserved }
}

if (process.argv.includes('--source')) console.log(JSON.stringify(await sourceChecks(), null, 2))
