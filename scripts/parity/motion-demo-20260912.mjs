/** Focused acceptance through the existing in-app browser. */
import fs from 'node:fs/promises'
import { evaluate, paint, projectIds } from './visual-system-acceptance-20260912.mjs'
export { evaluate, paint }
export const results = { modals: [], hero: [], demo: [], failures: [] }
const shots = new URL('./shots/motion-demo-20260912/', import.meta.url)
function check(ok, message) { if (!ok) results.failures.push(message) }
export async function save() { await fs.mkdir(shots, { recursive: true }); await fs.writeFile(new URL('results.json', shots), JSON.stringify(results, null, 2)) }
export async function capture(tab, name) { await fs.mkdir(shots, { recursive: true }); await fs.writeFile(new URL(`${name}.png`, shots), await tab.screenshot({ fullPage: false })) }

export async function hero({ tab, cdp, viewport }, width, scale = 1) {
  await viewport.set({ width, height: 1000 })
  await evaluate(cdp, scale => { document.documentElement.style.fontSize = `${100 * scale}%`; window.scrollTo({ top: 0, behavior: 'instant' }) }, scale)
  await paint(cdp)
  const frames = []
  for (const time of [0, 595.54, 737.66, 962.06, 1236.84, 2129.6, 3100, 4400, 5400, 6400, 7400, 8100, 9000, 10500, 12000, 16000, 39000]) {
    await evaluate(cdp, time => document.querySelector('.kinetic-identity').getAnimations({ subtree: true }).forEach(a => { a.pause(); a.currentTime = time }), time)
    await paint(cdp)
    const frame = await evaluate(cdp, time => {
      const root = document.querySelector('.kinetic-identity'), el = s => root.querySelector(s), box = s => el(s).getBoundingClientRect(), style = s => getComputedStyle(el(s))
      const plus = box('.kinetic-plus'), brace = box('.kinetic-brace-right'), closing = box('.kinetic-closing')
      return { time, stacked: style('.kinetic-assembly').flexDirection === 'column', overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, name: style('.hero-title').opacity, words: [...root.querySelectorAll('.kinetic-word')].filter(e => +getComputedStyle(e).opacity > .99).map(e => e.textContent), closing: { opacity: style('.kinetic-closing').opacity, transform: style('.kinetic-closing').transform, clip: style('.kinetic-closing').clipPath, top: closing.top }, braces: style('.kinetic-mechanism-motion').opacity, alignment: Math.abs((plus.top + plus.bottom - brace.top - brace.bottom) / 2), weight: style('.kinetic-word').fontWeight, plusMask: style('.kinetic-plus').maskImage, braceMask: style('.kinetic-brace-right').maskImage }
    }, time)
    frames.push(frame)
  }
  check(frames.every(f => f.overflow <= 1), `hero overflow ${width}/${scale}`)
  check(frames.filter(f => f.time < 1237).every(f => f.name === '0'), `hidden name before spread ${width}/${scale}`)
  check(frames.find(f => f.time === 2129.6).name === '1', `name revealed ${width}/${scale}`)
  check(frames.slice(6, 11).map(f => f.words[0]).join() === 'Product,UX,Systems,IxD,Human', `first word cycle ${width}/${scale}`)
  check(frames.slice(7).every(f => f.braces === '1' && (f.stacked || f.alignment < 2)), `retained/aligned braces ${width}/${scale}`)
  check(frames.every(f => f.closing.transform === 'none' && f.closing.clip === 'none'), `opacity-only closing ${width}/${scale}`)
  check(frames.at(-1).closing.opacity === '1' && frames.at(-1).weight === '600', `settled hero ${width}/${scale}`)
  results.hero.push({ width, scale, frames })
  if (scale === 1 && [375, 1706].includes(width)) await capture(tab, `hero-${width}`)
  await save()
  return results.failures
}

export async function modals({ tab, cdp, viewport }, width, scale = 1) {
  await viewport.set({ width, height: 1000 })
  await evaluate(cdp, scale => { document.documentElement.style.fontSize = `${100 * scale}%` }, scale)
  for (const id of projectIds) {
    await tab.playwright.locator(`[data-modal-trigger="${id}"]`).click()
    await tab.playwright.getByRole('dialog').waitFor({ state: 'visible' })
    await paint(cdp)
    const result = await evaluate(cdp, () => {
      const d = document.querySelector('[role="dialog"]'), body = d.querySelector('.modal-body')
      return { overflow: body.scrollWidth - body.clientWidth, noWave: !d.querySelector('.modal-hero-wave'), badges: [...d.querySelectorAll('.badge-work')].map(e => { const s = getComputedStyle(e); return { size: s.fontSize, padding: s.padding, background: s.backgroundColor, icon: getComputedStyle(e.querySelector('i')).fontSize } }), icons: [...d.querySelectorAll('.modal-section-heading > span')].map(e => ({ background: getComputedStyle(e).backgroundColor, border: getComputedStyle(e).borderTopWidth, direction: getComputedStyle(e.parentElement).flexDirection })) }
    })
    check(result.overflow <= 1 && result.noWave, `modal layout ${id}/${width}/${scale}: ${result.overflow}`)
    check(result.badges.every(b => b.size === `${14 * scale}px` && b.icon === b.size && b.padding === `${8 * scale}px ${16 * scale}px` && b.background === 'rgba(255, 255, 255, 0.4)'), `badge tokens ${id}/${width}/${scale}`)
    check(result.icons.every(i => i.background === 'rgba(0, 0, 0, 0)' && i.border === '0px' && i.direction === (width <= 575 ? 'column' : 'row')), `bare icon ${id}/${width}/${scale}`)
    results.modals.push({ id, width, scale, ...result })
    if (id === 'call-center-ux') {
      await evaluate(cdp, () => document.querySelector('.call-center-demo-section').scrollIntoView({ behavior: 'instant', block: 'start' }))
      await paint(cdp)
      const demo = await evaluate(cdp, () => {
        const root = document.querySelector('.call-center-demo'), phone = root.querySelector('.demo-phone').getBoundingClientRect(), controls = root.querySelector('.demo-controls').getBoundingClientRect(), body = document.querySelector('.modal-body'), h = document.querySelector('.modal-content-section .modal-section-heading h4').getBoundingClientRect(), p = document.querySelector('.modal-content-section .modal-section-content p').getBoundingClientRect(), content = root.getBoundingClientRect()
        return { overflow: body.scrollWidth - body.clientWidth, phoneWidth: phone.width, phoneLeft: phone.left, phoneRight: phone.right, controlsLeft: controls.left, controlsTop: controls.top, phoneTop: phone.top, textInset: p.left - h.left, contentRight: content.right, inset: getComputedStyle(root).paddingLeft, phoneScroll: root.querySelector('.demo-phone-screen').scrollWidth - root.querySelector('.demo-phone-screen').clientWidth }
      })
      check(demo.overflow <= 1 && demo.phoneScroll <= 1 && Math.abs(demo.textInset) < 2, `demo/text inset ${width}/${scale}: ${JSON.stringify(demo)}`)
      check(width < 992 ? demo.controlsTop < demo.phoneTop : demo.controlsLeft > demo.phoneRight, `demo arrangement ${width}/${scale}`)
      results.demo.push({ width, scale, ...demo })
      if (scale === 1 && [375, 1706].includes(width)) await capture(tab, `demo-${width}`)
    }
    await tab.playwright.getByRole('dialog').press('Escape')
    await tab.playwright.getByRole('dialog').waitFor({ state: 'hidden' })
    check(await evaluate(cdp, id => document.activeElement.getAttribute('data-modal-trigger') === id, id), `focus return ${id}/${width}/${scale}`)
  }
  await save()
  return results.failures
}
