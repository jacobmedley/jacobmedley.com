/** Browser acceptance for the visible reveal boundary, including the settled gap. */
import fs from 'node:fs/promises'
import { evaluate, paint } from './visual-system-acceptance-20260912.mjs'
export { evaluate, paint }
export const results = { settings: [], failures: [] }
const T = 3089.468
const times = [0, ...Array.from({length:19},(_,i)=>1240+i*45), 2129.57, 2230, 2346.2, 2450, T*.8257, ...Array.from({length:10},(_,i)=>2560+i*30), T*.9251, 3650, 4140, 5400, 6400, 7400, 9000, 39000]
const folder = new URL('./shots/hero-mask-edge-20260913/',import.meta.url)
function check(ok,message) { if(!ok) results.failures.push(message) }
export async function save() { await fs.mkdir(folder,{recursive:true}); await fs.writeFile(new URL('results.json',folder),JSON.stringify(results,null,2)) }
export async function capture(tab,name) { await fs.mkdir(folder,{recursive:true}); await fs.writeFile(new URL(`${name}.png`,folder),await tab.screenshot({fullPage:false})) }
export async function live(cdp,selector,start,end) {
  const frames=await evaluate(cdp,async ({selector,start,end})=>{
    const root=document.querySelector('.kinetic-identity'),node=root.querySelector(selector),animations=root.getAnimations({subtree:true}),frames=[]
    animations.forEach(a=>{a.currentTime=start;a.play()})
    await new Promise(resolve=>{
      function sample() {
        const time=Number(animations[0].currentTime),clip=getComputedStyle(node).clipPath,match=clip.match(/calc\(50% ([+-]) ([\d.]+)px\)/)
        if(match) {
          const box=node.getBoundingClientRect(),left=root.querySelector('.kinetic-brace-left').getBoundingClientRect(),right=root.querySelector('.kinetic-brace-right').getBoundingClientRect(),inset=box.width/2+(match[1]==='-'?-1:1)*Number(match[2])
          frames.push({time,error:Math.max(Math.abs(box.left+inset-left.right),Math.abs(box.right-inset-right.left))})
        }
        if(time>=end) { animations.forEach(a=>a.pause());resolve() }
        else requestAnimationFrame(sample)
      }
      requestAnimationFrame(sample)
    })
    return frames
  },{selector,start,end})
  check(frames.length>5&&frames.every(f=>f.error<.25),`real playback edges ${selector}`)
  results.live??=[]
  results.live.push({selector,frames})
  await save()
  return {selector,samples:frames.length,maxError:Math.max(...frames.map(f=>f.error)),failures:results.failures}
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
      const n=rect('.hero-name'),p=rect('.kinetic-word'),left=rect('.kinetic-brace-left'),right=rect('.kinetic-brace-right'),m=rect('.kinetic-mechanism')
      const aperture=parseFloat(getComputedStyle(root).getPropertyValue('--hero-aperture'))
      function mask(selector,box) {
        const clip=style(selector).clipPath
        const match=clip.match(/calc\(50% ([+-]) ([\d.]+)px\)/)
        const inset=match ? box.width/2+(match[1]==='-'?-1:1)*Number(match[2]) : clip==='inset(0px 50%)' ? box.width/2 : NaN
        return {clip,edgeError:Number.isFinite(inset)?Math.max(Math.abs(box.left+inset-left.right),Math.abs(box.right-inset-right.left)):null,settledGap:Math.max(box.left-left.right,right.left-box.right)}
      }
      return {time,aperture,width:m.width,name:mask('.hero-name',n),product:mask('.kinetic-word',p),nameOpacity:style('.hero-name').opacity,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,size:parseFloat(style('.kinetic-stage').fontSize),braceCenter:(left.right+right.left)/2,braceY:m.y,closingTransform:style('.kinetic-closing').transform,visibleWords:[...root.querySelectorAll('.kinetic-word')].filter(e=>+getComputedStyle(e).opacity>.99).map(e=>e.textContent)}
    },time))
  }
  const label=`${width}px/${scale}x`
  const nameFrames=frames.filter(f=>f.time>=1240&&f.time<T*.6893)
  const productFrames=frames.filter(f=>f.time>=T*.8257&&f.time<T*.9251)
  check([...nameFrames.map(f=>f.name),...productFrames.map(f=>f.product)].every(m=>m.edgeError!==null&&m.edgeError<.25),`visible mask/brace edges ${label}`)
  check(frames.every(f=>Math.abs(f.aperture-f.width)<.1),`single width ${label}`)
  check(frames.every(f=>f.nameOpacity==='1'&&f.overflow<=1),`opacity and overflow ${label}`)
  const fullName=frames.find(f=>f.time===2129.57),fullProduct=frames.find(f=>f.time===T*.9251)
  check(fullName.name.settledGap<=fullName.size*.04+.15&&fullProduct.product.settledGap<=fullProduct.size*.04+.15,`tight settled spacing ${label}`)
  check(frames.find(f=>f.time===6400).visibleWords.includes('IxD')&&frames.at(-1).visibleWords.join()==='Human',`role cycle ${label}`)
  check(frames.filter(f=>f.time>=3650).every(f=>f.closingTransform==='none'),`closing stays still ${label}`)
  results.settings.push({width,scale,frames})
  await save()
  return {label,frames:frames.length,failures:results.failures}
}
