'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Pattern } from './catalog'
import styles from './design-system.module.css'

type Inspection = { width:number; height:number; values:[string,string][]; tokens:[string,string][] }

export default function DesignSystemExplorer({patterns,tokenNames}:{patterns:Pattern[];tokenNames:string[]}) {
  const [selected,setSelected]=useState('spotlight-split')
  const [query,setQuery]=useState('')
  const [variant,setVariant]=useState(0)
  const [width,setWidth]=useState('fit')
  const [revision,setRevision]=useState(0)
  const [status,setStatus]=useState('Loading source example…')
  const [inspection,setInspection]=useState<Inspection|null>(null)
  const frame=useRef<HTMLIFrameElement>(null)
  const observer=useRef<ResizeObserver|null>(null)
  const dialogObserver=useRef<MutationObserver|null>(null)
  const dialogCleanup=useRef<(()=>void)|null>(null)
  const generation=useRef(0)
  const pattern=patterns.find(item=>item.id===selected)??patterns[0]
  const example=pattern.examples[variant]??pattern.examples[0]
  const visible=patterns.filter(item=>`${item.name} ${item.group} ${item.description} ${item.anatomy.join(' ')} ${item.sources.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim()))
  const groups=[...new Set(visible.map(item=>item.group))]

  useEffect(()=>{
    const readHash=()=>{
      const id=window.location.hash.slice(1)
      if(patterns.some(item=>item.id===id)){setSelected(id);setVariant(0)}
    }
    readHash();window.addEventListener('hashchange',readHash)
    return()=>window.removeEventListener('hashchange',readHash)
  },[patterns])
  useEffect(()=>()=>{generation.current++;observer.current?.disconnect();dialogObserver.current?.disconnect();dialogCleanup.current?.()},[example])

  const inspect=useCallback(()=>{
    const target=frame.current?.contentDocument?.querySelector<HTMLElement>(example.selector)
    const view=frame.current?.contentWindow
    if(!target||!view)return
    const computed=view.getComputedStyle(target)
    const properties=['font-family','font-size','font-weight','line-height','letter-spacing','color','background-color','border','border-radius','padding','gap','box-shadow','backdrop-filter']
    setInspection({width:view.innerWidth,height:view.innerHeight,values:properties.map(name=>[name,computed.getPropertyValue(name)]),tokens:tokenNames.map(name=>[name,computed.getPropertyValue(name).trim()] as [string,string]).filter(([,value])=>value)})
  },[example,tokenNames])

  const locate=useCallback(async()=>{
    const current=++generation.current
    observer.current?.disconnect();dialogObserver.current?.disconnect();dialogCleanup.current?.();setInspection(null);setStatus('Locating source example…')
    try{
      const sourceDocument=frame.current?.contentDocument
      const sourceWindow=frame.current?.contentWindow
      if(!sourceDocument||!sourceWindow)throw new Error('Source document is unavailable.')
      if(sourceWindow.location.pathname!==example.route){setStatus('You navigated within the live example. Reset example returns to the selected pattern.');return}
      await Promise.race([sourceDocument.fonts.ready,new Promise(resolve=>setTimeout(resolve,1800))])
      let target:HTMLElement|null=null
      for(let attempt=0;attempt<35;attempt++){
        if(current!==generation.current)return
        if(example.modal&&!sourceDocument.querySelector('.modal[data-state="open"]')&&attempt%5===0){
          const trigger=sourceDocument.querySelector<HTMLButtonElement>(`[data-modal-trigger="${example.modal}"]`)
          trigger?.focus({preventScroll:true})
          trigger?.click()
        }
        target=sourceDocument.querySelector<HTMLElement>(example.selector)
        if(target)break
        await new Promise(resolve=>setTimeout(resolve,100))
      }
      if(current!==generation.current)return
      if(!target)throw new Error(`No matching source element: ${example.selector}`)
      // Reveal the real native disclosure when the selected specimen is inside it.
      const disclosure=target.parentElement?.closest('details')
      if(disclosure&&!disclosure.open)disclosure.querySelector('summary')?.click()
      await new Promise(resolve=>setTimeout(resolve,400))
      if(current!==generation.current)return
      const scrollBody=target.closest<HTMLElement>('.modal-body')
      if(scrollBody)scrollBody.scrollTo({top:scrollBody.scrollTop+target.getBoundingClientRect().top-scrollBody.getBoundingClientRect().top-24,behavior:'instant'})
      else if(!target.closest('.modal')){
        const sticky=sourceDocument.querySelector<HTMLElement>('.cs-browse-sticky')
        const offset=sticky&&!sticky.contains(target)&&target.closest('.cs-browse')?sticky.offsetHeight+24:24
        sourceWindow.scrollTo({top:Math.max(0,sourceWindow.scrollY+target.getBoundingClientRect().top-offset),behavior:'instant'})
      }
      inspect();observer.current=new ResizeObserver(inspect);observer.current.observe(sourceDocument.documentElement)
      if(example.modal&&sourceDocument.body){
        const returnToTrigger=()=>window.setTimeout(()=>{
          if(frame.current?.contentDocument===sourceDocument&&!sourceDocument.querySelector('.modal[data-state="open"]')){
            sourceDocument.querySelector<HTMLElement>(`[data-modal-trigger="${example.modal}"]`)?.focus({preventScroll:true})
          }
        },450)
        const onEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')returnToTrigger()}
        const onCloseClick=(event:MouseEvent)=>{if((event.target as Element)?.closest('.btn-close-modal'))returnToTrigger()}
        sourceDocument.addEventListener('keydown',onEscape,true)
        sourceDocument.addEventListener('click',onCloseClick,true)
        dialogCleanup.current=()=>{
          sourceDocument.removeEventListener('keydown',onEscape,true)
          sourceDocument.removeEventListener('click',onCloseClick,true)
        }
        let wasOpen=!!sourceDocument.querySelector('.modal[data-state="open"]')
        dialogObserver.current=new MutationObserver(()=>{
          const isOpen=!!sourceDocument.querySelector('.modal[data-state="open"]')
          if(wasOpen&&!isOpen){
            // Wait for the source focus scope and inert state to finish closing.
            returnToTrigger()
          }
          wasOpen=isOpen
        })
        dialogObserver.current.observe(sourceDocument.body,{subtree:true,childList:true,attributes:true,attributeFilter:['data-state']})
      }
      setStatus('Source located. The page below is live and fully interactive.')
    }catch(error){setStatus(error instanceof Error?error.message:'Could not load the source example. Use Open source page.')}
  },[example,inspect])

  function choose(id:string){
    if(id===selected&&variant===0){void locate();return}
    generation.current++;observer.current?.disconnect();setSelected(id);setVariant(0);setInspection(null);setStatus('Loading source example…')
  }

  return <div className={styles.root}>
    <a className={styles.skip} href="#pattern-detail">Skip to selected pattern</a>
    <header className={styles.header}>
      <a className={styles.brand} href="#spotlight-split" onClick={()=>choose('spotlight-split')}>Quiet Prism<span>Design reference</span></a>
      <p>Baseline <code>4c2e482</code><span>Local reference · September 20, 2026</span></p>
      <a className={styles.sourceLink} href="/" target="_blank" rel="noopener noreferrer">Open site ↗<span className={styles.srOnly}> in a new tab</span></a>
    </header>
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Pattern catalog">
        <label htmlFor="pattern-search">Find a pattern</label>
        <input id="pattern-search" type="search" placeholder="Name, component or selector" value={query} onChange={e=>setQuery(e.target.value)}/>
        <p className={styles.count} aria-live="polite">{visible.length} of {patterns.length} patterns</p>
        <nav aria-label="Design patterns">{groups.map(group=><section key={group}><h2>{group}</h2>{visible.filter(item=>item.group===group).map(item=><a key={item.id} href={`#${item.id}`} aria-current={item.id===pattern.id?'page':undefined} onClick={()=>choose(item.id)}>{item.name}{item.retained&&<span>Retained</span>}</a>)}</section>)}{!visible.length&&<p>Nothing matches this search.</p>}</nav>
      </aside>
      <main id="pattern-detail" className={styles.detail} tabIndex={-1}>
        <div className={styles.intro}><p>The source, in context.</p><span>Browse the actual components, artwork and states used on the site.</span></div>
        <div className={styles.titleRow}><div><p className={styles.category}>{pattern.group}</p><h1>{pattern.name}</h1></div><a href={`#${pattern.id}`} className={styles.permalink} aria-label={`Permanent link to ${pattern.name}`}>#{pattern.id}</a></div>
        <p className={styles.description}>{pattern.description}</p>
        {pattern.retained&&<p className={styles.notice}>Retained, not on the homepage. These are labeled documentation specimens.</p>}
        <section className={styles.preview} aria-label="Live example">
          <div className={styles.toolbar}>
            <label>Example<select value={variant} onChange={e=>{generation.current++;setVariant(Number(e.target.value));setInspection(null);setStatus('Loading source example…')}}>{pattern.examples.map((item,i)=><option key={`${item.label}-${i}`} value={i}>{item.label}</option>)}</select></label>
            <div className={styles.widths} role="group" aria-label="Example viewport">{[['fit','Fit'],['820','Tablet'],['390','Phone']].map(([value,label])=><button key={value} type="button" aria-pressed={width===value} onClick={()=>{setWidth(value);requestAnimationFrame(()=>requestAnimationFrame(()=>void locate()))}}>{label}</button>)}</div>
            <button type="button" onClick={()=>{generation.current++;setRevision(v=>v+1);setInspection(null);setStatus('Loading source example…')}}>Reset example</button>
          </div>
          <div className={styles.frameScroll} tabIndex={0} role="region" aria-label="Scrollable live source preview"><iframe ref={frame} key={`${pattern.id}-${variant}-${revision}`} src={example.route} title={`${pattern.name}: ${example.label}, live source page`} onLoad={()=>void locate()} style={{width:width==='fit'?'100%':`${width}px`}}/></div>
          <div className={styles.previewFooter}><span>{inspection?`${inspection.width} × ${inspection.height} CSS px`:'Source viewport'} · No scaling</span><button type="button" onClick={()=>void locate()}>Locate again</button><a href={example.route} target="_blank" rel="noopener noreferrer">Open source page ↗<span className={styles.srOnly}> in a new tab</span></a></div>
          <p className={styles.status} role="status">{status}</p>
        </section>
        <p className={styles.explanation}>This frame loads the original route and scrolls to the selected element. Its page layout, artwork, copy and interactions come from the site itself. Scroll inside it to see neighboring content. Separate modal and focus refinements are not included in this baseline.</p>
        <div className={styles.notes}><section><h2>Behavior</h2><p>{pattern.behavior}</p></section><section><h2>Responsive</h2><p>{pattern.responsive}</p></section></div>
        <section className={styles.source}><h2>Source &amp; anatomy</h2><div className={styles.sourceColumns}><div><h3>Implementation</h3><ul>{pattern.sources.map(path=><li key={path}><code>{path}</code></li>)}</ul></div><div><h3>Parts and selectors</h3><ul>{pattern.anatomy.map(part=><li key={part}><code>{part}</code></li>)}</ul><h3>Located element</h3><code className={styles.selector}>{example.selector}</code></div></div></section>
        <details className={styles.computed}><summary>Computed styles</summary><p>Read from the located source element at the current preview width.</p>{inspection?<dl>{inspection.values.map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>:<p>Available after the source element loads.</p>}</details>
        <details className={styles.computed} open={pattern.id==='brand-palette'}><summary>Tokens</summary><p>Only tokens inherited by the located element are listed. Empty values are omitted.</p>{inspection?<dl>{inspection.tokens.map(([name,value])=><div key={name}><dt>{name}</dt><dd>{/^#[\da-f]{3,8}$/i.test(value)&&<span className={styles.swatch} style={{backgroundColor:value}} aria-hidden="true"/>}{value}</dd></div>)}</dl>:<p>Available after the source element loads.</p>}</details>
        <footer className={styles.footer}>Reference names describe the source. They do not create new production components or APIs.</footer>
      </main>
    </div>
  </div>
}
