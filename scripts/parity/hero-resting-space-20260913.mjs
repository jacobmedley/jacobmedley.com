/** Browser acceptance: connected reveals, separate resting space, type braces and Product finale. */
import fs from 'node:fs/promises'
import { evaluate, paint } from './visual-system-acceptance-20260912.mjs'
export { evaluate, paint }
export const results = { settings: [], failures: [] }
const T = 3089.468
const CLOSED = T*.8257+180, PRODUCT = T*.9251+180
const times = [0, 1240, 1300, 1400, 1600, T*.6893-1, T*.6893, T*.6893+90, T*.6893+180, T*.7121+180, T*.7594+180, CLOSED-1, CLOSED, CLOSED+1, ...Array.from({length:10},(_,i)=>CLOSED+10+i*30), PRODUCT, PRODUCT+90, PRODUCT+180, 3280, 3830, 4140, 5400, 6400, 7400, 9000, 35100, 35300, 38000, 38100, 38280, 39000]
const folder = new URL('./shots/hero-resting-space-20260913/',import.meta.url)
function check(ok,message) { if(!ok) results.failures.push(message) }
export async function save() { await fs.mkdir(folder,{recursive:true}); await fs.writeFile(new URL('results.json',folder),JSON.stringify(results,null,2)) }
export async function capture(tab,name) { await fs.mkdir(folder,{recursive:true}); await fs.writeFile(new URL(`${name}.png`,folder),await tab.screenshot({fullPage:false})) }
// Read after natural playback; a single long CDP evaluation can hit the browser timeout.
export async function playbackSnapshot(cdp) {
  results.playback=await evaluate(cdp,()=>{
    const root=document.querySelector('.kinetic-identity')
    return {state:root.dataset.heroState,words:[...root.querySelectorAll('.kinetic-word')].filter(e=>+getComputedStyle(e).opacity>.99).map(e=>e.textContent),tracks:root.getAnimations({subtree:true}).map(a=>({state:a.playState,time:a.currentTime}))}
  })
  check(results.playback.words.join()==='Product'&&results.playback.tracks.every(a=>a.state==='finished'&&a.time===39000),'natural playback settles on Product')
  await save()
  return results.playback
}
export async function inspect({cdp,viewport},width,scale=1) {
  await viewport.set({width,height:1000})
  await evaluate(cdp,scale=>{document.documentElement.style.fontSize=`${scale*100}%`;window.scrollTo({top:0,behavior:'instant'})},scale)
  await paint(cdp)
  const frames=[]
  for(const time of times) {
    await evaluate(cdp,time=>document.querySelector('.kinetic-identity').getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time}),time)
    await paint(cdp)
    frames.push(await evaluate(cdp,time=>{
      const root=document.querySelector('.kinetic-identity'),el=s=>root.querySelector(s),rect=s=>el(s).getBoundingClientRect(),style=s=>getComputedStyle(el(s))
      const n=rect('.hero-name'),p=rect('.kinetic-word'),left=rect(time<2730.9737275999996?'.kinetic-brace-left':'.kinetic-type-brace.is-left'),right=rect(time<2730.9737275999996?'.kinetic-brace-right':'.kinetic-type-brace.is-right'),m=rect('.kinetic-mechanism')
      const aperture=parseFloat(getComputedStyle(root).getPropertyValue('--hero-aperture'))
      function mask(selector,box) {
        const clip=style(selector).clipPath
        const match=clip.match(/calc\(50% ([+-]) ([\d.]+)px\)/)
        const inset=match ? box.width/2+(match[1]==='-'?-1:1)*Number(match[2]) : clip==='inset(0px 50%)' ? box.width/2 : NaN
        return {clip,edgeError:Number.isFinite(inset)?Math.max(Math.abs(box.left+inset-left.right),Math.abs(box.right-inset-right.left)):null,settledGap:Math.max(box.left-left.right,right.left-box.right)}
      }
      const design=style('.kinetic-design'),type=style('.kinetic-type-brace'),nBox=rect('.hero-name')
      return {time,aperture,width:m.width,nameWidth:nBox.width,rootWidth:root.clientWidth,type:{font:type.fontFamily,size:type.fontSize,weight:type.fontWeight,opacity:type.opacity},design:{font:design.fontFamily,size:design.fontSize,weight:design.fontWeight},vectorOpacity:style('.kinetic-brace-left').opacity,name:mask('.hero-name',n),product:mask('.kinetic-word',p),nameOpacity:style('.hero-name').opacity,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,size:parseFloat(style('.kinetic-stage').fontSize),braceCenter:(left.right+right.left)/2,braceY:m.y,closingTransform:style('.kinetic-closing').transform,visibleWords:[...root.querySelectorAll('.kinetic-word')].filter(e=>+getComputedStyle(e).opacity>.99).map(e=>e.textContent)}
    },time))
  }
  const label=`${width}px/${scale}x`
  const nameFrames=frames.filter(f=>f.time>=1240&&f.time<T*.6893)
  const productFrames=frames.filter(f=>f.time>=CLOSED&&f.time<PRODUCT)
  check([...nameFrames.map(f=>f.name),...productFrames.map(f=>f.product)].every(m=>m.edgeError!==null&&m.edgeError<.25),`connected reveal edges ${label}`)
  check(frames.every(f=>Math.abs(f.aperture-f.width)<.1),`single width ${label}`)
  check(frames.every(f=>f.nameOpacity==='1'&&f.overflow<=1),`opacity and overflow ${label}`)
  const nameDone=frames.find(f=>f.time===T*.6893),nameRest=frames.find(f=>f.time===T*.6893+180)
  const productDone=frames.find(f=>f.time===PRODUCT),productRest=frames.find(f=>f.time===PRODUCT+180)
  check(nameDone.name.clip==='none'&&nameRest.name.clip==='none'&&productDone.product.clip==='none'&&productRest.product.clip==='none',`masks release before padding ${label}`)
  check(Math.abs(nameRest.width-Math.min(nameRest.nameWidth+nameRest.size*1.6,nameRest.rootWidth-nameRest.size))<.1,`original name end space ${label}`)
  check(productRest.width>productDone.width&&Math.abs(productRest.product.settledGap-productRest.size*.45)<.6,`original Product end space ${label}`)
  // Sample after the boundary: decimal millisecond offsets can round either side.
  check(frames.filter(f=>f.time>CLOSED+.1).every(f=>f.type.font===f.design.font&&f.type.size===f.design.size&&f.type.weight===f.design.weight&&f.type.opacity==='1'&&f.vectorOpacity==='0'),`role typography after snap ${label}`)
  check(frames.find(f=>f.time===CLOSED-1).type.opacity==='0',`font changes only at closed snap ${label}`)
  check(frames.find(f=>f.time===6400).visibleWords.includes('IxD')&&frames.at(-1).visibleWords.join()==='Product',`Product finale ${label}`)
  check(frames.filter(f=>f.time>=3830).every(f=>f.closingTransform==='none'),`closing stays still ${label}`)
  results.settings.push({width,scale,frames})
  await save()
  return {label,frames:frames.length,failures:results.failures}
}
