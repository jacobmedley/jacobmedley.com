import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.ACCEPTANCE_BASE_URL || 'http://localhost:3012';
const output=process.env.EXTRA_OUTPUT || 'scripts/parity/shots/acceptance-20260911/dev-extra';
await mkdir(output,{recursive:true});
const b=await chromium.launch({headless:true,ignoreDefaultArgs:['--hide-scrollbars']});
const results={base,errors:[],reflow:[],resize:[],focus:[],sticky:[]};
async function load(p,url){await p.goto(base+url,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);}
async function measure(p,scope='body'){return p.locator(scope).evaluate(n=>{
const r=n.getBoundingClientRect(), vw=document.documentElement.clientWidth;
const text=[];for(const e of n.querySelectorAll('h1,h2,h3,h4,p,button,a,li,strong,.study-supporting-art-orbit > span,.study-supporting-art-center')){
const s=getComputedStyle(e),r=e.getBoundingClientRect();if(!e.textContent.trim()||e.closest('.sr-only')||!r.width||!r.height||s.visibility==='hidden'||s.display==='none')continue;
if(e.scrollWidth>e.clientWidth+2 && e.clientWidth>0 && !['inline','contents'].includes(s.display) && s.overflowX!=='auto')text.push({tag:e.tagName,cls:e.className,text:e.textContent.trim().slice(0,55),client:e.clientWidth,scroll:e.scrollWidth});}
return {pageOverflow:document.documentElement.scrollWidth-vw,bodyOverflow:n.scrollWidth-n.clientWidth,box:[r.x,r.width],text:text.slice(0,35)};});}
try{
for(const mode of ['normal','text200','spacing'])for(const width of [320,375,768,1100,1440]){
const p=await b.newPage({viewport:{width,height:900},reducedMotion:'reduce'});p.on('pageerror',e=>results.errors.push(e.message));
for(const route of ['/','/case-studies/']){
await load(p,route);if(mode==='text200')await p.addStyleTag({content:'html{font-size:200%!important}'});if(mode==='spacing')await p.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});
results.reflow.push({mode,width,route,...await measure(p)});
if(route==='/'){
for(const id of await p.locator('[data-modal-trigger]').evaluateAll(ns=>ns.map(n=>n.dataset.modalTrigger))){
await p.locator(`[data-modal-trigger="${id}"]`).click();await p.getByRole('dialog').waitFor();await p.waitForTimeout(60);
results.reflow.push({mode,width,route,id,...await measure(p,'.modal-body'),header:await measure(p,'.modal-header'),footer:await measure(p,'.modal-footer')});
if(width===320 && mode!=='normal' && ['dentalplans','hydra','webmd'].includes(id))await p.screenshot({path:`${output}/${mode}-${id}-${width}.png`});
await p.keyboard.press('Escape');await p.getByRole('dialog').waitFor({state:'hidden'});
}
}
if(width===320)await p.screenshot({path:`${output}/${mode}-${route==='/'?'home':'index'}.png`,fullPage:true});
}
await p.close();
}
const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await load(p,'/');
for(const id of await p.locator('[data-modal-trigger]').evaluateAll(ns=>ns.map(n=>n.dataset.modalTrigger))){
await p.locator(`[data-modal-trigger="${id}"]`).click();await p.getByRole('dialog').waitFor();
for(const width of [320,375,679,680,767,768,819,820,899,900,1099,1100,1440]){
await p.setViewportSize({width,height:900});await p.waitForTimeout(80);results.resize.push({id,width,...await measure(p,'.modal-body'),field:await p.evaluate(()=>{const f=document.querySelector('.modal-bleed-field'),h=document.querySelector('.modal-featured-hero');return f?Math.abs(f.getBoundingClientRect().bottom-h.getBoundingClientRect().bottom):null})});
}
const f={id,trapped:true,headerClose:false,return:false};for(let i=0;i<35;i++){await p.keyboard.press('Tab');f.trapped&&=await p.getByRole('dialog').evaluate(n=>n.contains(document.activeElement));}
await p.locator('.modal-header button').click();await p.getByRole('dialog').waitFor({state:'hidden'});f.headerClose=true;await p.waitForFunction(id=>document.activeElement?.getAttribute('data-modal-trigger')===id,id,{timeout:2000}).catch(()=>{});f.return=await p.locator(`[data-modal-trigger="${id}"]`).evaluate(n=>n===document.activeElement);results.focus.push(f);
}
// Two-sided exact sticky entry, after fonts and resized content settle.
for(const width of [320,375,768,1100,1440]){
await p.setViewportSize({width,height:900});await load(p,'/');await p.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
for(const id of ['work','full-stack','resume','education']){
const s=`#${id} .section-heading-sentinel`;for(const delta of [-5,5,-5]){
await p.locator(s).evaluate((n,d)=>scrollTo(0,n.getBoundingClientRect().top+scrollY+d),delta);await p.waitForTimeout(500);
results.sticky.push({width,id,delta,...await p.locator(s).evaluate(n=>({y:n.getBoundingClientRect().top,compact:n.nextElementSibling.classList.contains('is-compact'),scrollY}))});
}}
}
await p.close();
const source=JSON.parse(await (await import('node:fs/promises')).readFile('docs/case-study-site-copy.json','utf8'));
results.direct=[];
const d=await b.newPage({viewport:{width:320,height:900},reducedMotion:'reduce'});
for(const width of [320,375,768,1100,1440])for(const mode of ['normal','text200','spacing'])for(const study of source.studies){
await d.setViewportSize({width,height:900});await load(d,`/case-studies/${study.slug}/`);
if(mode==='text200')await d.addStyleTag({content:'html{font-size:200%!important}'});
if(mode==='spacing')await d.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});
results.direct.push({width,mode,slug:study.slug,...await measure(d)});
}
await d.close();
results.touch=[];const t=await b.newPage({viewport:{width:375,height:812},isMobile:true,hasTouch:true,reducedMotion:'no-preference'});await load(t,'/');
for(const id of await t.locator('[data-modal-trigger]').evaluateAll(ns=>ns.map(n=>n.dataset.modalTrigger))){await t.locator(`[data-modal-trigger="${id}"]`).tap();await t.getByRole('dialog').waitFor();results.touch.push({id,firstTap:true});await t.locator('.modal-header button').tap();await t.getByRole('dialog').waitFor({state:'hidden'});}
await t.close();
}finally{await writeFile(`${output}/results.json`,JSON.stringify(results,null,2));await b.close();}
console.log(JSON.stringify({reflow:results.reflow.length,resize:results.resize.length,focus:results.focus,failures:results.reflow.filter(x=>x.bodyOverflow>2||x.text.length||x.header?.text.length||x.footer?.text.length).map(x=>({mode:x.mode,width:x.width,route:x.route,id:x.id,overflow:x.bodyOverflow,text:x.text,header:x.header?.text,footer:x.footer?.text})),stickyFailures:results.sticky.filter(x=>(x.delta>0)!==x.compact)},null,2));
