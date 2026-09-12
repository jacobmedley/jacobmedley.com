/** In-app browser adapter: run against the production export using the Browser skill.
 * Pass its existing {tab, cdp, viewport}; this module never opens another browser.
 * Source fidelity checks also run directly with: node <this-file> --source
 */
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'

export const widths = [320, 375, 768, 992, 1440, 1875]
export const projectIds = ['webmd', 'dentalplans', 'bumblebeemd', 'hydra', 'opfred', 'split-test', 'call-center-ux', 'marketing-auto', 'workshops', 'roadmap', 'personas', 'reveal', 'viva', 'wrong']
export const output = new URL('./shots/visual-system-20260912/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
export const results = { widths: [], modals: [], motion: {}, source: {}, failures: [] }

function check(condition, message) { if (!condition) results.failures.push(message) }
export async function evaluate(cdp, fn, arg) {
  const response = await cdp.send('Runtime.evaluate', { expression: `(async () => JSON.stringify(await (${fn})(${JSON.stringify(arg) ?? ''})))()`, awaitPromise: true, returnByValue: true })
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails))
  return JSON.parse(response.result.value ?? 'null')
}
export async function paint(cdp) {
  await evaluate(cdp, () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)))))
}
export async function capture(tab, name) {
  await fs.mkdir(output, { recursive: true })
  await fs.writeFile(path.join(output, `${name}.png`), await tab.screenshot({ fullPage: false }))
}
export async function save() {
  await fs.mkdir(output, { recursive: true })
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2))
}

export async function checkWidth({tab, cdp, viewport}, width, textScale = 1) {
  await viewport.set({width, height: 1000})
  await evaluate(cdp, scale => {
    document.documentElement.style.fontSize = scale === 1 ? '' : `${scale * 100}%`
    document.documentElement.style.scrollBehavior = 'auto'
    document.querySelectorAll('.resume-experience-details').forEach(node => { node.open = false })
    window.scrollTo({top: 0, behavior: 'instant'})
  }, textScale)
  await paint(cdp)
  const home = await evaluate(cdp, () => {
    const css = selector => getComputedStyle(document.querySelector(selector))
    return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length, name: document.querySelector('h1').textContent,
      sizes: ['.hero-title', '.kinetic-stage', '.kinetic-closing'].map(selector => css(selector).fontSize),
      leadership: document.querySelectorAll('.resume-leadership-grid > li').length,
      logos: [...document.querySelectorAll('.resume-brand-logo')].map(node => getComputedStyle(node).maskImage),
      resumeOverflow: document.querySelector('.resume-timeline').scrollWidth - document.querySelector('.resume-timeline').clientWidth,
      controls: document.querySelectorAll('.motion-control').length,
      headerGaps: [...document.querySelectorAll('.resume-experience-header')].map(header => header.querySelector('.resume-experience-roles').getBoundingClientRect().top - header.querySelector('.resume-experience-company').getBoundingClientRect().bottom)
    }
  })
  check(home.overflow <= 1 && home.resumeOverflow <= 1, `home overflow ${width}/${textScale}: ${JSON.stringify(home)}`)
  check(home.h1 === 1 && home.name === 'Jacob Medley', `semantic name ${width}`)
  check(home.leadership === 4 && home.logos.length === 5 && home.logos.every(mask => mask !== 'none'), `Resume structure ${width}`)
  check(home.headerGaps.every(gap => gap >= 0 && gap <= 12), `company overlap/gap ${width}/${textScale}`)
  check(home.controls === 0, `visible control ${width}`)
  if (width === 1875 && textScale === 1) check(home.sizes.join() === '54px,59.4px,26px', 'wide type targets')
  results.widths.push({width, textScale, home})
  if (width === 320 || width === 1875) await capture(tab, `hero-${width}-${textScale}`)

  await evaluate(cdp, () => document.querySelector('.resume-timeline').scrollIntoView({behavior: 'instant'}))
  const summary = tab.playwright.locator('.resume-experience-details summary').first()
  await summary.press('Enter')
  await evaluate(cdp, async () => { await Promise.all(document.querySelector('.resume-experience-content').getAnimations().map(a => a.finished)); return true })
  const disclosure = await evaluate(cdp, () => {
    const d = document.querySelector('.resume-experience-details'), summary = d.querySelector('summary'), content = d.querySelector('.resume-experience-content')
    return {open: d.open, text: summary.textContent, focus: document.activeElement === summary,
      bottomGap: Math.abs(summary.getBoundingClientRect().bottom - d.getBoundingClientRect().bottom),
      order: summary.getBoundingClientRect().top >= content.getBoundingClientRect().bottom - 1,
      contentOverflow: content.scrollWidth - content.clientWidth}
  })
  check(disclosure.open && disclosure.text.startsWith('Less') && disclosure.focus && disclosure.bottomGap < 1 && disclosure.order && disclosure.contentOverflow <= 1, `disclosure ${width}/${textScale}: ${JSON.stringify(disclosure)}`)
  results.widths.at(-1).disclosure = disclosure
  await summary.press('Space')
  await evaluate(cdp, async () => { await Promise.all(document.querySelector('.resume-experience-content').getAnimations().map(a => a.finished)); return true })
  check(await evaluate(cdp, () => !document.querySelector('.resume-experience-details').open && document.activeElement.tagName === 'SUMMARY'), `collapse/focus ${width}`)
  if (width === 375 || width === 1875) await capture(tab, `resume-${width}-${textScale}`)

  for (const id of projectIds) {
    const trigger = tab.playwright.locator(`[data-modal-trigger="${id}"]`)
    await trigger.click()
    await tab.playwright.getByRole('dialog').waitFor({state: 'visible'})
    await paint(cdp)
    const modal = await evaluate(cdp, id => {
      const dialog = document.querySelector('[role="dialog"]'), body = dialog.querySelector('.modal-body')
      const plaques = [...dialog.querySelectorAll('.modal-section-heading > span')]
      const nested = [...dialog.querySelectorAll('.modal-info-card,.modal-metric-card,.modal-value-card,.study-supporting-art-flow b,.call-center-wireframe')]
      const contributions = dialog.querySelector('[aria-label="Contributions"]'), tech = dialog.querySelector('[aria-label="Technologies"]')
      const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
      function luminance(color) {
        ctx.clearRect(0,0,1,1); ctx.fillStyle=color; ctx.fillRect(0,0,1,1)
        return [...ctx.getImageData(0,0,1,1).data].slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)
      }
      const techContrast = [...dialog.querySelectorAll('.modal-badges-technologies .badge-work')].map(node=>{
        const style=getComputedStyle(node), a=luminance(style.color), b=luminance(style.backgroundColor)
        return Math.round((Math.max(a,b)+.05)/(Math.min(a,b)+.05)*100)/100
      })
      return { id, overflow: body.scrollWidth - body.clientWidth,
        techContrast,
        headings: [...dialog.querySelectorAll('h2,h3,h4,h5')].map(node => node.textContent),
        circles: plaques.every(node => getComputedStyle(node).borderRadius === '50%'),
        shadows: nested.map(node => getComputedStyle(node).boxShadow),
        techAfter: !tech || !contributions || Boolean(contributions.compareDocumentPosition(tech) & Node.DOCUMENT_POSITION_FOLLOWING),
        followup: Boolean(dialog.querySelector('.modal-hero-followup')),
        source: id === 'reveal' ? Boolean(dialog.querySelector('img[src$="reveal-clear-01.jpg"]')) : null,
        theme: getComputedStyle(dialog.querySelector('.modal-content')).getPropertyValue('--featured-ink').trim(),
        hiddenHeading: [...dialog.querySelectorAll('h4')].some(node => /^(Contributions|Technologies):$/.test(node.textContent)),
        bounds: [...dialog.querySelectorAll('.modal-info-card,.call-center-wireframe')].every(node => node.getBoundingClientRect().right <= body.getBoundingClientRect().right + 1)
      }
    }, id)
    check(modal.overflow <= 1 && modal.bounds, `modal overflow ${id}/${width}/${textScale}`)
    check(modal.circles && modal.shadows.every(shadow => shadow === 'none') && !modal.hiddenHeading && modal.techAfter, `modal system ${id}/${width}/${textScale}: ${JSON.stringify(modal)}`)
    check(modal.techContrast.every(ratio=>ratio>=4.5), `technology contrast ${id}/${width}: ${modal.techContrast}`)
    if (id === 'roadmap') check(!modal.followup, 'Roadmap image removed')
    if (id === 'reveal') check(modal.headings.includes('The thinking behind the idea') && modal.headings.includes('Visual expression of the concept') && modal.source, 'Reveal identities/source retained')
    results.modals.push({width, textScale, ...modal})
    if ((width === 375 || width === 1875) && ['hydra','reveal','call-center-ux','roadmap'].includes(id)) await capture(tab, `${id}-${width}-${textScale}`)
    await tab.playwright.getByRole('dialog').press('Escape')
    await tab.playwright.getByRole('dialog').waitFor({state: 'hidden'})
    await paint(cdp)
    check(await evaluate(cdp, id => document.activeElement?.dataset.modalTrigger === id, id), `modal focus return ${id}/${width}`)
  }
  await save()
  return {width, textScale, failures: results.failures}
}

export async function sourceChecks() {
  const file = 'components/sections/ResumeSection.tsx'
  const current = await fs.readFile(file, 'utf8')
  const baseline = execFileSync('git', ['show', `9508686:${file}`], {encoding:'utf8'})
  function copy(text) {
    const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const found = {}
    function values(node) {
      if (ts.isPropertyAssignment(node) && ['icon','logo','initials'].includes(node.name.getText(tree))) return []
      if (ts.isStringLiteral(node)) return [node.text]
      const strings = []; ts.forEachChild(node, child => { strings.push(...values(child)) }); return strings
    }
    function visit(node) {
      if (ts.isVariableDeclaration(node) && ['experience','leadershipLeft','leadershipRight','designLeadershipIntro'].includes(node.name.getText(tree))) found[node.name.getText(tree)] = values(node.initializer)
      ts.forEachChild(node, visit)
    }
    visit(tree); return found
  }
  assert.deepEqual(copy(current), copy(baseline), 'Every employment and leadership string matches recovery commit')
  assert.equal(execFileSync('git', ['diff','9508686','--','images'], {encoding:'utf8'}), '', 'Original source images untouched')
  const sourcePaths = { 'hec-icon.svg':'hec', 'moa-icon.svg':'moa', 'blue-green-dots.svg':'bgv', 'hydra-icon.svg':'hydra' }
  for (const [name, folder] of Object.entries(sourcePaths)) assert.deepEqual(await fs.readFile(`public/assets/references/${name}`), await fs.readFile(`C:/dev/jacobmedley.com/public/assets/references/${folder}/${name}`), name)
  results.source = {copy:'exact match to 9508686', originalImages:'unchanged', newAssets:'four byte-identical supplied SVGs'}
  return results.source
}

export async function checkLifecycle({tab, cdp, viewport}) {
  await viewport.set({width:1875, height:1000})
  await evaluate(cdp, () => { document.documentElement.style.fontSize = ''; window.scrollTo({top:0,behavior:'instant'}) })
  await paint(cdp)
  const probe = () => {
    const root = document.querySelector('.kinetic-identity'), animations = root.getAnimations({subtree:true})
    return {state:root.dataset.heroState, times:animations.map(a=>a.currentTime), paused:animations.every(a=>a.playState==='paused'), finished:animations.every(a=>a.playState==='finished')}
  }
  await evaluate(cdp, () => document.querySelector('.kinetic-identity').getAnimations({subtree:true}).forEach(a=>{a.currentTime=5000;a.play()}))
  await evaluate(cdp, () => document.querySelector('#resume').scrollIntoView({behavior:'instant'}))
  await paint(cdp)
  const off1=await evaluate(cdp,probe)
  await evaluate(cdp,()=>new Promise(resolve=>setTimeout(()=>resolve(true),220)))
  const off2=await evaluate(cdp,probe)
  check(off1.paused && JSON.stringify(off1.times)===JSON.stringify(off2.times),'offscreen clock suspension')
  await evaluate(cdp,()=>window.scrollTo({top:0,behavior:'instant'}))
  await paint(cdp)
  check(!(await evaluate(cdp,probe)).paused,'offscreen resume')
  // In-app tabs stay document-visible; this explicitly tests the visibility event path.
  await evaluate(cdp,()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))})
  const hidden1=await evaluate(cdp,probe)
  await evaluate(cdp,()=>new Promise(resolve=>setTimeout(()=>resolve(true),220)))
  const hidden2=await evaluate(cdp,probe)
  check(hidden1.paused && JSON.stringify(hidden1.times)===JSON.stringify(hidden2.times),'hidden-document event suspension')
  await evaluate(cdp,()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))})
  check(!(await evaluate(cdp,probe)).paused,'visibility resume')

  const frames=[]
  for (const time of [850,1760,2400,5000,10500,16000,21500,27000,64000]) {
    await evaluate(cdp,time=>document.querySelector('.kinetic-identity').getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time}),time)
    await paint(cdp)
    frames.push(await evaluate(cdp,time=>{const root=document.querySelector('.kinetic-identity'),left=root.querySelector('.kinetic-brace-left').getBoundingClientRect(),right=root.querySelector('.kinetic-brace-right').getBoundingClientRect();return {time,braceGap:right.left-left.right,words:[...root.querySelectorAll('.kinetic-word')].filter(n=>+getComputedStyle(n).opacity>.99).map(n=>n.textContent),ctaOpacity:getComputedStyle(root.querySelector('.kinetic-closing')).opacity}},time))
  }
  check(frames.every(frame=>frame.braceGap>0),'contracted braces never touch')
  check(frames.filter(f=>f.time>=5000 && f.time<=27000).map(f=>f.words[0]).join()==='Product,UX,Systems,IdX,Human','role order')
  await evaluate(cdp,()=>document.querySelector('.kinetic-identity').getAnimations({subtree:true}).forEach(a=>a.finish()))
  await paint(cdp)
  const settled=await evaluate(cdp,probe)
  check(settled.finished && settled.state==='settled','finite clock settles')
  await viewport.set({width:1440,height:1000})
  await paint(cdp)
  check((await evaluate(cdp,probe)).finished,'settled hero stays finished after resize')
  await viewport.set({width:1875,height:1000})
  await paint(cdp)
  await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  await paint(cdp)
  const reduced=await evaluate(cdp,()=>({state:document.querySelector('.kinetic-identity').dataset.heroState,animations:document.querySelector('.kinetic-identity').getAnimations({subtree:true}).length,product:getComputedStyle(document.querySelector('[data-role="Product"]')).opacity,cta:getComputedStyle(document.querySelector('.kinetic-closing')).opacity}))
  check(reduced.state==='static' && reduced.animations===0 && reduced.product==='1' && reduced.cta==='1','reduced motion complete static hero')
  await tab.playwright.locator('[data-modal-trigger="hydra"]').click()
  await tab.playwright.getByRole('dialog').waitFor({state:'visible'})
  const reducedField=await evaluate(cdp,()=>document.querySelector('.modal-bleed-field').getAnimations({subtree:true}).filter(a=>a.playState==='running').length)
  check(reducedField===0,'reduced motion static modal/Hydra')
  await tab.playwright.getByRole('dialog').press('Escape')
  await tab.playwright.getByRole('dialog').waitFor({state:'hidden'})
  await cdp.send('Emulation.setEmulatedMedia',{features:[]})
  await paint(cdp)
  const summary=tab.playwright.locator('.resume-experience-details summary').first()
  await evaluate(cdp,()=>document.querySelector('.resume-timeline').scrollIntoView({behavior:'instant'}))
  await summary.press('Enter')
  const expanding=await evaluate(cdp,()=>document.querySelector('.resume-experience-content').getAnimations().length)
  await summary.press('Space')
  await summary.press('Enter')
  await evaluate(cdp,async()=>{await Promise.all(document.querySelector('.resume-experience-content').getAnimations().map(a=>a.finished));return true})
  const reversal=await evaluate(cdp,()=>({open:document.querySelector('.resume-experience-details').open,label:document.querySelector('.resume-experience-details summary').textContent,focus:document.activeElement.tagName}))
  check(expanding>0 && reversal.open && reversal.label.startsWith('Less') && reversal.focus==='SUMMARY','animated rapid disclosure reversal')
  const tree=await cdp.send('Accessibility.getFullAXTree')
  const semantics=tree.nodes.filter(n=>!n.ignored && /^(Experience|Less about|More about|Jacob Medley|Product and design)/.test(n.name?.value??'')).map(n=>({role:n.role?.value,name:n.name?.value,properties:n.properties}))
  check(semantics.some(n=>n.role==='heading' && n.name==='Jacob Medley'),'accessible H1')
  check(semantics.some(n=>['DisclosureTriangle','button'].includes(n.role) && n.name.startsWith('Less about')),'native accessible disclosure')
  await summary.press('Space')
  await evaluate(cdp,async()=>{await Promise.all(document.querySelector('.resume-experience-content').getAnimations().map(a=>a.finished));return true})
  results.motion={...results.motion,offscreen:{paused:off1.paused,unchanged:JSON.stringify(off1.times)===JSON.stringify(off2.times)},hidden:{method:'synthetic visibilitychange with temporary document.hidden override; restored',paused:hidden1.paused,unchanged:JSON.stringify(hidden1.times)===JSON.stringify(hidden2.times)},frames,settled,reduced,reducedField,reversal,semantics}
  await save()
  return {motion:results.motion,failures:results.failures}
}
if (typeof process !== 'undefined' && process.argv.includes('--source')) console.log(await sourceChecks())
