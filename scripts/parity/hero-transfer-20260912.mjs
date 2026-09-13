/** Hero-only acceptance through the established in-app browser. */
import fs from 'node:fs/promises'
import { evaluate, paint } from './visual-system-acceptance-20260912.mjs'
export { evaluate, paint }
export const results = { settings: [], failures: [] }
const shots = new URL('./shots/hero-transfer-20260912/', import.meta.url)
const T = 3089.468
const times = [0, 595, 738, 962, T*.4003, 1300, 1400, 1600, T*.6893, T*.7121, 2230, 2270, T*.7594, 2450, T*.8257, 2620, 2700, T*.9251, 3100, 4140, 5400, 6400, 7400, 9000, 39000]
function check(ok,message) { if (!ok) results.failures.push(message) }
export async function save() { await fs.mkdir(shots,{recursive:true}); await fs.writeFile(new URL('results.json',shots),JSON.stringify(results,null,2)) }
export async function capture(tab,name) { await fs.mkdir(shots,{recursive:true}); await fs.writeFile(new URL(`${name}.png`,shots),await tab.screenshot({fullPage:false})) }
export async function inspect({tab,cdp,viewport},width,scale=1) {
  await viewport.set({width,height:1000})
  await evaluate(cdp,scale=>{document.documentElement.style.fontSize=`${scale*100}%`;window.scrollTo({top:0,behavior:'instant'})},scale)
  await paint(cdp)
  const frames=[]
  for(const time of times) {
    await evaluate(cdp,time=>document.querySelector('.kinetic-identity').getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time}),time)
    await paint(cdp)
    frames.push(await evaluate(cdp,time=>{
      const root=document.querySelector('.kinetic-identity'),el=s=>root.querySelector(s),rect=s=>el(s).getBoundingClientRect(),style=s=>getComputedStyle(el(s))
      const n=rect('.hero-name'),p=rect('.kinetic-word'),m=rect('.kinetic-mechanism')
      const inset=s=>parseFloat(style(s).clipPath.match(/inset\(0px ([\d.-]+)px\)/)?.[1]??'NaN')
      const ni=inset('.hero-name'),pi=inset('.kinetic-word'),plus=rect('.kinetic-plus'),brace=rect('.kinetic-brace-right')
      return {time,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,nameOpacity:style('.hero-name').opacity,titleOpacity:style('.hero-title').opacity,nameWidth:n.width,nameAperture:n.width-2*ni,nameEdgeDelta:Math.abs(n.left+ni-m.left),productAperture:p.width-2*pi,productEdgeDelta:Math.abs(p.left+pi-m.left),mechanism:{x:m.x,width:m.width,y:m.y,center:m.x+m.width/2},plusDelta:Math.abs((plus.top+plus.bottom-brace.top-brace.bottom)/2),stacked:style('.kinetic-assembly').flexDirection==='column',closing:{opacity:style('.kinetic-closing').opacity,transform:style('.kinetic-closing').transform},words:[...root.querySelectorAll('.kinetic-word')].filter(e=>+getComputedStyle(e).opacity>.99).map(e=>e.textContent)}
    },time))
    if(width===1706 && scale===1 && [1400,2230,2450,2620].includes(time)) await capture(tab,`phase-${time}`)
  }
  check(frames.every(f=>f.overflow<=1),`overflow ${width}/${scale}`)
  check(frames.every(f=>f.nameOpacity==='1' && f.titleOpacity==='1'),`no name fade ${width}/${scale}`)
  check(frames.filter(f=>f.time<=T*.6893).every(f=>f.nameEdgeDelta<1),`mask follows name braces ${width}/${scale}`)
  check(Math.abs(frames[0].nameAperture)<1 && frames.find(f=>f.time===T*.6893).nameAperture>=frames[0].nameWidth-.1,`closed-to-full name mask ${width}/${scale}`)
  const drop=frames.filter(f=>f.time>=T*.7121 && f.time<=T*.7594)
  check(Math.max(...drop.map(f=>f.mechanism.center))-Math.min(...drop.map(f=>f.mechanism.center))<.1 && Math.max(...drop.map(f=>f.mechanism.width))-Math.min(...drop.map(f=>f.mechanism.width))<.1,`straight drop before snap ${width}/${scale}`)
  check(Math.abs(frames.find(f=>f.time===T*.8257).mechanism.width)<.1,`braces meet ${width}/${scale}`)
  check(frames.filter(f=>f.time>=T*.8257 && f.time<=T*.9251).every(f=>f.productEdgeDelta<1),`Product mask follows spring ${width}/${scale}`)
  check(frames.filter(f=>f.time>=3100).every(f=>f.closing.transform==='none'),`closing stays still ${width}/${scale}`)
  check(frames.find(f=>f.time===6400).words.includes('IxD') && frames.at(-1).words.join()==='Human',`later role cycle ${width}/${scale}`)
  check(frames.filter(f=>!f.stacked && f.time>=4140).every(f=>f.plusDelta<.1),`plus center ${width}/${scale}`)
  results.settings.push({width,scale,frames})
  await save()
  return results.failures
}
