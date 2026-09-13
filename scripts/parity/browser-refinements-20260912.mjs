/** Runs through the existing in-app browser, never opens a standalone browser. */
import fs from 'node:fs/promises'
import { evaluate, paint, projectIds, sourceChecks } from './visual-system-acceptance-20260912.mjs'
export { evaluate, paint }
const output = new URL('./shots/browser-refinements-20260912/', import.meta.url)
export const results = { layouts: [], modals: [], hero: [], motion: {}, source: {}, failures: [] }
function check(ok, message) { if (!ok) results.failures.push(message) }
export async function save() { await fs.mkdir(output, {recursive:true}); await fs.writeFile(new URL('results.json',output),JSON.stringify(results,null,2)) }
export async function capture(tab,name) { await fs.mkdir(output,{recursive:true}); await fs.writeFile(new URL(`${name}.png`,output),await tab.screenshot({fullPage:false})) }
async function finishDisclosure(cdp) { await evaluate(cdp,async()=>{await Promise.all(document.querySelector('.resume-experience-content').getAnimations().map(a=>a.finished));return true}) }

export async function layout({tab,cdp,viewport},width,scale=1) {
  await viewport.set({width,height:1000})
  await evaluate(cdp,scale=>{document.documentElement.style.fontSize=scale===1?'':`${scale*100}%`;document.documentElement.style.scrollBehavior='auto';window.scrollTo({top:0,behavior:'instant'})},scale)
  await paint(cdp)
  const home=await evaluate(cdp,()=>{
    const row=document.querySelector('.resume-columns'),cols=[...row.children].map(n=>n.getBoundingClientRect()),first=document.querySelector('.resume-experience-card'),icon=first.querySelector('.resume-brand-logo').getBoundingClientRect(),card=first.getBoundingClientRect()
    return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,columns:getComputedStyle(row).gridTemplateColumns,balanced:Math.abs(cols[0].width-cols[1].width)<1,noTimeline:getComputedStyle(document.querySelector('.resume-timeline'),'::before').content==='none',logoInside:icon.left>=card.left && icon.right<=card.right,education:[...document.querySelectorAll('.education-card')].map(e=>({right:e.getBoundingClientRect().right,title:e.querySelector('h4').textContent,href:e.querySelector('a').href})),leadershipPadding:getComputedStyle(document.querySelector('.resume-leadership-grid>li')).padding}
  })
  check(home.overflow<=1,`page overflow ${width}/${scale}: ${home.overflow}`)
  check(home.balanced && home.noTimeline && home.logoInside,`Resume geometry ${width}/${scale}`)
  check(home.education.length===10 && home.education.every(e=>e.href.startsWith('https://') && e.right<=width),`education ${width}/${scale}`)
  await tab.playwright.locator('.resume-experience-company').first().click()
  await finishDisclosure(cdp)
  const opened=await evaluate(cdp,()=>({open:document.querySelector('.resume-experience-details').open,label:document.querySelector('.resume-experience-details summary').textContent,focused:document.activeElement.tagName,chevron:getComputedStyle(document.querySelector('.resume-disclosure-chevron')).rotate}))
  check(opened.open && opened.label.startsWith('Less') && opened.chevron==='180deg',`whole-card toggle ${width}/${scale}`)
  await tab.playwright.locator('.resume-experience-details summary').first().press('Space')
  await finishDisclosure(cdp)
  check(await evaluate(cdp,()=>!document.querySelector('.resume-experience-details').open && document.activeElement.tagName==='SUMMARY'),`keyboard close ${width}/${scale}`)
  results.layouts.push({width,scale,home,opened})
  if ([375,1706].includes(width) && scale===1) { await evaluate(cdp,()=>document.querySelector('.resume-columns').scrollIntoView({behavior:'instant'}));await paint(cdp);await capture(tab,`resume-${width}`) }

  for(const id of projectIds) {
    await tab.playwright.locator(`[data-modal-trigger="${id}"]`).click()
    await tab.playwright.getByRole('dialog').waitFor({state:'visible'})
    await paint(cdp)
    const modal=await evaluate(cdp,()=>{
      const d=document.querySelector('[role="dialog"]'),body=d.querySelector('.modal-body'),wave=d.querySelector('.modal-hero-wave'),groups=[...d.querySelectorAll('.modal-badges')],badges=[...d.querySelectorAll('.badge-work')]
      return {overflow:body.scrollWidth-body.clientWidth,badges:groups.map(e=>e.children.length),labels:badges.map(e=>e.textContent.trim()),noTech:!d.querySelector('.modal-badges-technologies'),pills:badges.every(e=>getComputedStyle(e).borderRadius==='999px' && getComputedStyle(e).borderTopWidth==='0px'),wave:!!wave && getComputedStyle(wave).animationName==='none',waveHeight:wave?.getBoundingClientRect().height,topGap:getComputedStyle(d.querySelector('.modal-study-content')).paddingTop,geometry:d.querySelector('.project-geometry')?.className??null,headings:[...d.querySelectorAll('.modal-section-heading>span')].every(e=>{const r=e.getBoundingClientRect();return Math.abs(r.width-r.height)<1})}
    })
    check(modal.overflow<=1 && modal.noTech && modal.pills && modal.wave && modal.headings && modal.badges.every(n=>n<=4),`modal ${id}/${width}/${scale}: ${JSON.stringify(modal)}`)
    results.modals.push({width,scale,id,...modal})
    if ([375,1706].includes(width) && scale===1 && ['dentalplans','hydra','marketing-auto','call-center-ux','split-test','workshops','roadmap'].includes(id)) await capture(tab,`${id}-${width}`)
    await tab.playwright.getByRole('dialog').press('Escape')
    await tab.playwright.getByRole('dialog').waitFor({state:'hidden'})
    await paint(cdp)
    check(await evaluate(cdp,id=>document.activeElement?.getAttribute('data-modal-trigger')===id,id),`focus return ${id}/${width}`)
  }
  await save()
  return {width,scale,failures:results.failures}
}

export async function hero({tab,cdp,viewport},width,scale=1) {
  await viewport.set({width,height:1000})
  await evaluate(cdp,scale=>{document.documentElement.style.fontSize=scale===1?'':`${scale*100}%`;window.scrollTo({top:0,behavior:'instant'})},scale)
  await paint(cdp)
  const frames=[]
  for(const time of [400,1050,2300,3100,4400,5400,6400,7400,9000,10500,12000,39000]) {
    await evaluate(cdp,time=>document.querySelector('.kinetic-identity').getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time}),time)
    await paint(cdp)
    frames.push(await evaluate(cdp,time=>{const root=document.querySelector('.kinetic-identity');return {time,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,name:getComputedStyle(root.querySelector('.hero-title')).opacity,words:[...root.querySelectorAll('.kinetic-word')].filter(e=>+getComputedStyle(e).opacity>.99).map(e=>e.textContent),closing:getComputedStyle(root.querySelector('.kinetic-closing')).opacity,braces:getComputedStyle(root.querySelector('.kinetic-mechanism-motion')).opacity}},time))
  }
  check(frames.every(f=>f.overflow<=1),`hero overflow ${width}/${scale}`)
  check(frames[0].name==='0' && frames[1].name==='0' && frames[2].name==='1',`name reveal ${width}/${scale}`)
  check(frames.slice(3,8).map(f=>f.words[0]).join()==='Product,UX,Systems,IdX,Human',`fast role cycle ${width}/${scale}`)
  check(frames.at(-1).closing==='1' && frames.at(-1).braces==='0',`persistent closing ${width}/${scale}`)
  results.hero.push({width,scale,frames})
  if([375,1706].includes(width)) await capture(tab,`hero-settled-${width}-${scale}`)
  await save()
}

export async function animation({tab,cdp,viewport}) {
  await viewport.set({width:1706,height:1000})
  await evaluate(cdp,()=>{document.documentElement.style.fontSize='';document.querySelector('#full-stack').scrollIntoView({behavior:'instant'})})
  await paint(cdp)
  const iconPeriods=await evaluate(cdp,()=>[...document.querySelectorAll('.thinking-thumb-icon .thinking-icon')].map(e=>getComputedStyle(e).animationDuration))
  check(new Set(iconPeriods).size>2,'staggered icon periods')
  const fields=[]
  for(const id of ['hydra','split-test','call-center-ux','marketing-auto','workshops','roadmap']) {
    await tab.playwright.locator(`[data-modal-trigger="${id}"]`).click();await tab.playwright.getByRole('dialog').waitFor({state:'visible'});await paint(cdp)
    const sample=()=>[...document.querySelector('.modal-bleed-field').querySelectorAll('.hydra-component,.hydra-toggle-thumb,.project-geometry>i,.personalization-rays>b,.roadmap-maze path,.thinking-network-node')].map(e=>{const s=getComputedStyle(e);return [s.transform,s.scale,s.translate,s.strokeDashoffset,e.getAttribute('cx'),e.getAttribute('cy')].join('|')})
    const a=await evaluate(cdp,sample);await evaluate(cdp,()=>new Promise(r=>setTimeout(()=>r(true),400)));const b=await evaluate(cdp,sample)
    const moving=JSON.stringify(a)!==JSON.stringify(b)
    check(moving,`actual field movement ${id}`);fields.push({id,moving})
    await tab.playwright.getByRole('dialog').press('Escape');await tab.playwright.getByRole('dialog').waitFor({state:'hidden'})
  }
  await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await paint(cdp)
  const reduced=await evaluate(cdp,()=>({state:document.querySelector('.kinetic-identity').dataset.heroState,count:document.querySelector('.kinetic-identity').getAnimations({subtree:true}).length,closing:getComputedStyle(document.querySelector('.kinetic-closing')).opacity}))
  check(reduced.state==='static' && reduced.count===0 && reduced.closing==='1','static reduced hero')
  await cdp.send('Emulation.setEmulatedMedia',{features:[]});await paint(cdp)
  results.motion={iconPeriods,fields,reduced}
  results.source=await sourceChecks()
  await save()
  return {motion:results.motion,failures:results.failures}
}
