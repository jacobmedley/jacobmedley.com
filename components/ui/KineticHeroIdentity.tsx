'use client'

import { useLayoutEffect, useRef } from 'react'
import { useMotionPaused, useReducedMotion } from './MotionControls'

const ROLES = ['Product', 'UX', 'Systems', 'IxD', 'Human'] as const
const DURATION = 39000
const CHANGES = [4000, 5000, 6000, 7000, 8000, 11000, 14000, 17000, 20000, 23000, 26000, 29000, 32000, 35000, 38000]
const FINAL_ROLE = CHANGES.length % ROLES.length
// Continue after Product and the closing copy are revealed; never replay the intro.
const LOOP_START = 9600
const END_SPACE_DURATION = 180
type Cue = [number, Keyframe]

// Figma 15:244: the updated 3.089s timeline, sampled from its exact spring
// functions for the existing WAAPI clock. Only spatial values fit the type size.
const spring = (decay: number, frequency: number, damping: number) =>
  `linear(${Array.from({ length: 81 }, (_, i) => {
    const t = i / 80
    return 1 - Math.exp(-t * decay) * (Math.cos(t * frequency) + damping * Math.sin(t * frequency))
  }).join(',')})`
const ARRIVE = spring(7.6657, 6.7605, 1.1339)
const TURN = spring(7.4426, 10.5254, .7071)
const SNAP = spring(11.1803, .1581, 70.7054)
const FIGMA_DURATION = 3089.468
const FIGMA = {
  arrive: FIGMA_DURATION * .1927, turn: FIGMA_DURATION * .2388,
  upright: FIGMA_DURATION * .3114, spread: FIGMA_DURATION * .4003,
  open: FIGMA_DURATION * .6893,
  nameRest: FIGMA_DURATION * .6893 + END_SPACE_DURATION,
  descend: FIGMA_DURATION * .7121 + END_SPACE_DURATION,
  landed: FIGMA_DURATION * .7594 + END_SPACE_DURATION,
  closed: FIGMA_DURATION * .8257 + END_SPACE_DURATION,
  product: FIGMA_DURATION * .9251 + END_SPACE_DURATION,
  productRest: FIGMA_DURATION * .9251 + END_SPACE_DURATION * 2,
}
type OpeningCue = [time: number, width: number, easing?: string]

/** One shared clock reveals the identity, then keeps the role sequence moving. */
export default function KineticHeroIdentity() {
  const rootRef = useRef<HTMLDivElement>(null)
  const elapsedRef = useRef(0)
  const reduced = useReducedMotion()
  const paused = useMotionPaused()

  useLayoutEffect(() => {
    const root = rootRef.current!
    if (reduced || paused || !root.animate) {
      root.dataset.heroState = 'static'
      return
    }
    let animations: Animation[] = []
    let disposed = false
    let resizeFrame = 0
    let inView = root.getBoundingClientRect().bottom > 0 && root.getBoundingClientRect().top < innerHeight
    const find = (selector: string) => root.querySelector<HTMLElement>(selector)!
    const syncPlayback = () => {
      if (disposed) return
      if (animations[0]?.playState === 'finished') {
        elapsedRef.current = LOOP_START
        animations.forEach(animation => {
          animation.pause()
          animation.currentTime = LOOP_START
        })
      }
      animations.forEach(animation => {
        if (inView && !document.hidden) animation.play()
        else animation.pause()
      })
      root.dataset.heroState = inView && !document.hidden ? 'running' : 'paused'
    }
    function build() {
      if (disposed) return
      if (animations.length) elapsedRef.current = Number(animations[0].currentTime ?? elapsedRef.current)
      if (elapsedRef.current >= DURATION) elapsedRef.current = LOOP_START
      animations.forEach(animation => animation.cancel())
      animations = []
      const stage = find('.kinetic-stage')
      const name = find('.hero-name')
      const words = [...root.querySelectorAll<HTMLElement>('.kinetic-word')]
      const size = parseFloat(getComputedStyle(stage).fontSize)
      // Open directly to the same roomy aperture used by the settled identity.
      // This keeps both reveals from visually stopping at the text edges.
      const widths = words.map(word => word.scrollWidth + size * 1.6)
      const nameTextWidth = name.getBoundingClientRect().width
      const nameRestWidth = Math.min(nameTextWidth + size * 1.6, root.clientWidth - size)
      const rootTop = root.getBoundingClientRect().top
      const nameY = name.getBoundingClientRect().top - rootTop + name.offsetHeight / 2 - size * .65
      const roleY = stage.getBoundingClientRect().top - rootTop
      const tailWidth = find('.kinetic-tail-inner').getBoundingClientRect().width
      const stacked = getComputedStyle(find('.kinetic-assembly')).flexDirection === 'column'
      function track(node: HTMLElement, cues: Cue[]) {
        const animation = node.animate(cues.map(([time, frame]) => ({ easing: 'cubic-bezier(.22,.75,.2,1)', ...frame, offset: time / DURATION })), { duration: DURATION, fill: 'both' })
        animation.pause()
        animation.currentTime = Math.min(elapsedRef.current, DURATION)
        animations.push(animation)
      }
      const pose = (time: number, transform: string, opacity = 1): Cue => [time, { transform, opacity }]
      track(find('.h-jakeicon'), [pose(0, 'translateY(-12px)', 0), pose(540, 'translateY(0)'), pose(DURATION, 'translateY(0)')])
      // The mask reads the SAME animated property as the brace width every frame.
      // Only its release is discrete; there is no separately interpolated mask.
      const nameOpening: OpeningCue[] = [[0,0],[FIGMA.spread,0,TURN],[FIGMA.open,nameRestWidth]]
      const masked = (node: HTMLElement, start: number, end: number) => {
        const connected = 'inset(0px calc((100% - var(--hero-aperture)) / 2))'
        const cues: Cue[] = [[0,{clipPath:start === 0 ? connected : 'inset(0px 50%)',easing:'steps(1,end)'}]]
        if (start > 0) cues.push([start,{clipPath:connected,easing:'steps(1,end)'}])
        cues.push([end,{clipPath:'none',easing:'steps(1,end)'}],[DURATION,{clipPath:'none'}])
        track(node,cues)
      }
      masked(name,0,FIGMA.open)
      const widthCues: Cue[] = [[0, {width: `${widths[0]}px`}]]
      CHANGES.forEach((time,i) => widthCues.push([time,{width:`${widths[i % 5]}px`}],[time+280,{width:`${widths[(i+1)%5]}px`}]))
      widthCues.push([DURATION,{width:`${widths[FINAL_ROLE]}px`}])
      track(find('.kinetic-bracketed'),widthCues)
      const productWidth = widths[0]-size*.7
      const productOpening: OpeningCue[] = [[FIGMA.closed,0,ARRIVE],[FIGMA.product,productWidth]]
      const mechanismOpening: OpeningCue[] = [...nameOpening,[FIGMA.nameRest,nameRestWidth],[FIGMA.landed,nameRestWidth,SNAP],...productOpening,[FIGMA.productRest,productWidth]]
      const mechanismWidth: Cue[] = mechanismOpening.map(([time,width,easing]) => [time,{'--hero-aperture':`${width}px`,...(easing ? {easing} : {})}])
      CHANGES.forEach((time,i)=>mechanismWidth.push([time,{'--hero-aperture':`${widths[i%5]-size*.7}px`}],[time+280,{'--hero-aperture':`${widths[(i+1)%5]-size*.7}px`}]))
      mechanismWidth.push([DURATION,{'--hero-aperture':`${widths[FINAL_ROLE]-size*.7}px`}])
      track(root,mechanismWidth)
      const center = stacked ? 0 : -tailWidth / 2
      track(find('.kinetic-mechanism-motion'),[
        [0,{transform:`translate(0px, ${nameY - 528 * size * .85 / 261.818}px)`,easing:ARRIVE}],
        pose(FIGMA.arrive,`translate(0px, ${nameY}px)`),
        [FIGMA.descend,{transform:`translate(0px, ${nameY}px)`,easing:TURN}],
        pose(FIGMA.landed,`translate(0px, ${roleY}px)`),pose(3100+END_SPACE_DURATION,`translate(0px, ${roleY}px)`),
        pose(3650+END_SPACE_DURATION,`translate(${center}px, ${roleY}px)`),pose(DURATION,`translate(${center}px, ${roleY}px)`),
      ])
      track(find('.kinetic-brace-left'),[
        [0,{transform:'rotate(-90deg)',opacity:0,easing:ARRIVE}],pose(FIGMA.arrive,'rotate(-90deg)'),
        [FIGMA.turn,{transform:'rotate(-90deg)',easing:TURN}],
        pose(FIGMA.upright,'rotate(-180deg)'),
        [FIGMA.closed-1,{transform:'rotate(-180deg)',opacity:1,easing:'steps(1,end)'}],
        pose(FIGMA.closed,'rotate(-180deg)',0),pose(DURATION,'rotate(-180deg)',0),
      ])
      track(find('.kinetic-brace-right'),[
        [0,{transform:'rotate(90deg)',opacity:0,easing:ARRIVE}],pose(FIGMA.arrive,'rotate(90deg)'),
        [FIGMA.turn,{transform:'rotate(90deg)',easing:TURN}],
        pose(FIGMA.upright,'rotate(0deg)'),
        [FIGMA.closed-1,{transform:'rotate(0deg)',opacity:1,easing:'steps(1,end)'}],
        pose(FIGMA.closed,'rotate(0deg)',0),pose(DURATION,'rotate(0deg)',0),
      ])
      // Swap to the role's actual font at the closed snap, with no cross-fade.
      root.querySelectorAll<HTMLElement>('.kinetic-type-brace').forEach(brace=>track(brace,
        [[0,{opacity:0,easing:'steps(1,end)'}],[FIGMA.closed,{opacity:1}],[DURATION,{opacity:1}]]))
      words.forEach((word,roleIndex)=>{
        const frames:Cue[]=[pose(0,roleIndex===0?'translateY(0)':'translateY(-.2em)',roleIndex===0?1:0)]
        if(roleIndex===0) masked(word,FIGMA.closed,FIGMA.product)
        CHANGES.forEach((time,i)=>{
          if(i%5===roleIndex) frames.push(pose(time,'translateY(0)'),pose(time+100,'translateY(.2em)',0))
          if((i+1)%5===roleIndex) frames.push(pose(time+100,'translateY(-.2em)',0),pose(time+280,'translateY(0)'))
        })
        frames.push(pose(DURATION,roleIndex===FINAL_ROLE?'translateY(0)':'translateY(.2em)',roleIndex===FINAL_ROLE?1:0))
        track(word,frames)
      })
      track(find('.kinetic-tail'),[[0,{width:'0px'}],[3100+END_SPACE_DURATION,{width:'0px'}],[3650+END_SPACE_DURATION,{width:`${tailWidth}px`}],[DURATION,{width:`${tailWidth}px`}]])
      const plusCues=[pose(0,'rotate(0deg)',0),pose(3150+END_SPACE_DURATION,'rotate(0deg)',0),pose(3550+END_SPACE_DURATION,'rotate(0deg)')]
      CHANGES.forEach((time,i)=>plusCues.push(pose(time,`rotate(${i*180}deg)`),pose(time+280,`rotate(${(i+1)*180}deg)`)))
      plusCues.push(pose(DURATION,`rotate(${CHANGES.length*180}deg)`))
      track(find('.kinetic-plus'),plusCues)
      track(find('.kinetic-design'),[pose(0,'translateX(.4em)',0),pose(3370+END_SPACE_DURATION,'translateX(.4em)',0),pose(3800+END_SPACE_DURATION,'translateX(0)'),pose(DURATION,'translateX(0)')])
      const reveal = (selector: string, start: number) => track(find(selector), [
        [0, { opacity: 0, transform: 'translateY(-1rem)' }],
        [start, { opacity: 0, transform: 'translateY(-1rem)' }],
        [start + 520, { opacity: 1, transform: 'translateY(0)' }],
        [DURATION, { opacity: 1, transform: 'translateY(0)' }],
      ])
      // Start the closing sequence with the first UX role, then let each
      // element fall softly into its settled position.
      reveal('.kinetic-build', CHANGES[0])
      reveal('.kinetic-better', CHANGES[0] + 200)
      reveal('.hero-rule-wrap', CHANGES[0] + 400)
      reveal('.hero-case-studies-button', CHANGES[0] + 600)
      animations[0].onfinish = syncPlayback
      syncPlayback()
    }
    build()
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncPlayback() }, { threshold: .05 })
    observer.observe(root)
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(build)
    })
    resize.observe(root)
    document.fonts.ready.then(() => { if (!disposed) build() })
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      disposed = true
      elapsedRef.current = Number(animations[0]?.currentTime ?? elapsedRef.current)
      animations.forEach(animation => animation.cancel())
      cancelAnimationFrame(resizeFrame)
      observer.disconnect()
      resize.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
    }
  }, [reduced, paused])

  return (
    <div ref={rootRef} className="kinetic-identity" data-motion-root data-hero-state="static">
      <p className="display-12 font-bold text-prime mb-0 h-jakeicon" aria-hidden="true"><i className="fa-kit fa-jm-icon-full font-normal" /></p>
      <h1 className="hero-title text-prime"><span className="hero-name">Jacob Medley</span></h1>
      <div className="kinetic-stage" aria-hidden="true">
        <div className="kinetic-assembly">
          <div className="kinetic-bracketed">
            <span className="kinetic-static-brace is-left">{'{'}</span>
            {ROLES.map(role => <span key={role} className="kinetic-word" data-role={role}>{role}</span>)}
            <span className="kinetic-static-brace is-right">{'}'}</span>
          </div>
          <div className="kinetic-tail"><div className="kinetic-tail-inner"><span className="kinetic-plus" /><span className="kinetic-design">Design</span></div></div>
        </div>
      </div>
      <div className="kinetic-mechanism-motion" aria-hidden="true"><div className="kinetic-mechanism">
        <span className="kinetic-brace kinetic-brace-left" /><span className="kinetic-brace kinetic-brace-right" />
        <span className="kinetic-type-brace is-left">{'{'}</span><span className="kinetic-type-brace is-right">{'}'}</span>
      </div></div>
      <p className="sr-only">Product and design leader</p>
      <div className="kinetic-closing">
        <p className="kinetic-build">I build the teams and systems that make the work smaller, so people can launch sooner, learn faster, and grow what works.</p>
        <p className="kinetic-better"><strong>There is always a better way, together we can find it.</strong></p>
        <div className="hero-rule-wrap">
          <hr className="solid-center rule-heading" />
        </div>
        <a className="btn action-label hero-case-studies-link" href="#work" aria-label="Explore selected work">
          <i className="fa-thin fa-circle-arrow-down hero-case-studies-button" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
