'use client'

import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from './MotionControls'

const ROLES = ['Product', 'UX', 'Systems', 'IxD', 'Human'] as const
const DURATION = 39000
const CHANGES = [4000, 5000, 6000, 7000, 8000, 11000, 14000, 17000, 20000, 23000, 26000, 29000, 32000, 35000]
type Cue = [number, Keyframe]

// Figma 15:244: the supplied 2.2s timeline, sampled from its exact spring
// functions for the existing WAAPI clock. Only spatial values fit the type size.
const spring = (decay: number, frequency: number, damping: number) =>
  `linear(${Array.from({ length: 81 }, (_, i) => {
    const t = i / 80
    return 1 - Math.exp(-t * decay) * (Math.cos(t * frequency) + damping * Math.sin(t * frequency))
  }).join(',')})`
const ARRIVE = spring(7.6657, 6.7605, 1.1339)
const TURN = spring(7.4426, 10.5254, .7071)
const FIGMA = { arrive: 2200 * .2707, turn: 2200 * .3353, upright: 2200 * .4373, spread: 2200 * .5622, open: 2200 * .968 }

/** A finite shared clock drives the mechanism without typing timers or React render loops. */
export default function KineticHeroIdentity() {
  const rootRef = useRef<HTMLDivElement>(null)
  const elapsedRef = useRef(0)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const root = rootRef.current!
    if (reduced || !root.animate) {
      root.dataset.heroState = 'static'
      return
    }
    let animations: Animation[] = []
    let disposed = false
    let resizeFrame = 0
    let inView = root.getBoundingClientRect().bottom > 0 && root.getBoundingClientRect().top < innerHeight
    const find = (selector: string) => root.querySelector<HTMLElement>(selector)!
    const syncPlayback = () => {
      animations.forEach(animation => {
        if (animation.playState === 'finished') return
        if (inView && !document.hidden) animation.play()
        else animation.pause()
      })
      root.dataset.heroState = elapsedRef.current >= DURATION ? 'settled' : inView && !document.hidden ? 'running' : 'paused'
    }
    function build() {
      if (disposed) return
      if (animations.length) elapsedRef.current = Number(animations[0].currentTime ?? elapsedRef.current)
      animations.forEach(animation => animation.cancel())
      animations = []
      const stage = find('.kinetic-stage')
      const name = find('.hero-name')
      const words = [...root.querySelectorAll<HTMLElement>('.kinetic-word')]
      const size = parseFloat(getComputedStyle(stage).fontSize)
      const widths = words.map(word => word.scrollWidth + size * 1.6)
      const nameWidth = name.getBoundingClientRect().width + size * 1.6
      const rootTop = root.getBoundingClientRect().top
      const nameY = name.getBoundingClientRect().top - rootTop + name.offsetHeight / 2 - size * .65
      const roleY = stage.getBoundingClientRect().top - rootTop
      const closingNode = find('.kinetic-closing')
      const tailWidth = find('.kinetic-tail-inner').getBoundingClientRect().width
      const stacked = getComputedStyle(find('.kinetic-assembly')).flexDirection === 'column'
      function track(node: HTMLElement, cues: Cue[]) {
        const animation = node.animate(cues.map(([time, frame]) => ({ easing: 'cubic-bezier(.22,.75,.2,1)', ...frame, offset: time / DURATION })), { duration: DURATION, fill: 'both' })
        animation.pause()
        animation.currentTime = Math.min(elapsedRef.current, DURATION)
        // play() at a paused end time rewinds a finished timeline. Keep it finished.
        if (elapsedRef.current >= DURATION) animation.finish()
        animations.push(animation)
      }
      const pose = (time: number, transform: string, opacity = 1): Cue => [time, { transform, opacity }]
      track(find('.h-jakeicon'), [pose(0, 'translateY(-12px)', 0), pose(540, 'translateY(0)'), pose(DURATION, 'translateY(0)')])
      track(find('.hero-title'), [pose(0, 'translateY(0)', 0), pose(FIGMA.spread, 'translateY(0)', 0), pose(FIGMA.open, 'translateY(0)'), pose(DURATION, 'translateY(0)')])
      const widthCues: Cue[] = [[0, {width: `${widths[0]}px`}]]
      CHANGES.forEach((time,i) => widthCues.push([time,{width:`${widths[i % 5]}px`}],[time+280,{width:`${widths[(i+1)%5]}px`}]))
      widthCues.push([DURATION,{width:`${widths[4]}px`}])
      track(find('.kinetic-bracketed'),widthCues)
      const mechanismWidth: Cue[] = [[0,{width:'0px'}],[FIGMA.spread,{width:'0px',easing:TURN}],[FIGMA.open,{width:`${nameWidth}px`}],[2400,{width:`${nameWidth}px`}],[2900,{width:`${widths[0]-size*.7}px`}]]
      CHANGES.forEach((time,i)=>mechanismWidth.push([time,{width:`${widths[i%5]-size*.7}px`}],[time+280,{width:`${widths[(i+1)%5]-size*.7}px`}]))
      mechanismWidth.push([DURATION,{width:`${widths[4]-size*.7}px`}])
      track(find('.kinetic-mechanism'),mechanismWidth)
      const center = stacked ? 0 : -tailWidth / 2
      track(find('.kinetic-mechanism-motion'),[
        [0,{transform:`translate(0px, ${nameY - 528 * size * .85 / 261.818}px)`,easing:ARRIVE}],
        pose(FIGMA.arrive,`translate(0px, ${nameY}px)`),pose(2400,`translate(0px, ${nameY}px)`),
        pose(2900,`translate(0px, ${roleY}px)`),pose(3100,`translate(0px, ${roleY}px)`),
        pose(3650,`translate(${center}px, ${roleY}px)`),pose(DURATION,`translate(${center}px, ${roleY}px)`),
      ])
      track(find('.kinetic-brace-left'),[
        [0,{transform:'rotate(-90deg)',opacity:0,easing:ARRIVE}],pose(FIGMA.arrive,'rotate(-90deg)'),
        [FIGMA.turn,{transform:'rotate(-90deg)',easing:TURN}],
        pose(FIGMA.upright,'rotate(-180deg)'),pose(DURATION,'rotate(-180deg)'),
      ])
      track(find('.kinetic-brace-right'),[
        [0,{transform:'rotate(90deg)',opacity:0,easing:ARRIVE}],pose(FIGMA.arrive,'rotate(90deg)'),
        [FIGMA.turn,{transform:'rotate(90deg)',easing:TURN}],
        pose(FIGMA.upright,'rotate(0deg)'),pose(DURATION,'rotate(0deg)'),
      ])
      words.forEach((word,roleIndex)=>{
        const frames:Cue[]=[pose(0,'translateY(-.2em)',0)]
        if(roleIndex===0) frames.push(pose(2800,'translateY(-.2em)',0),pose(3000,'translateY(0)'))
        CHANGES.forEach((time,i)=>{
          if(i%5===roleIndex) frames.push(pose(time,'translateY(0)'),pose(time+100,'translateY(.2em)',0))
          if((i+1)%5===roleIndex) frames.push(pose(time+100,'translateY(-.2em)',0),pose(time+280,'translateY(0)'))
        })
        frames.push(pose(DURATION,roleIndex===4?'translateY(0)':'translateY(.2em)',roleIndex===4?1:0))
        track(word,frames)
      })
      track(find('.kinetic-tail'),[[0,{width:'0px'}],[3100,{width:'0px'}],[3650,{width:`${tailWidth}px`}],[DURATION,{width:`${tailWidth}px`}]])
      const plusCues=[pose(0,'rotate(0deg)',0),pose(3150,'rotate(0deg)',0),pose(3550,'rotate(0deg)')]
      CHANGES.forEach((time,i)=>plusCues.push(pose(time,`rotate(${i*180}deg)`),pose(time+280,`rotate(${(i+1)*180}deg)`)))
      plusCues.push(pose(DURATION,`rotate(${CHANGES.length*180}deg)`))
      track(find('.kinetic-plus'),plusCues)
      track(find('.kinetic-design'),[pose(0,'translateX(.4em)',0),pose(3370,'translateX(.4em)',0),pose(3800,'translateX(0)'),pose(DURATION,'translateX(0)')])
      track(closingNode,[[0,{opacity:0}],[8000,{opacity:0}],[9600,{opacity:1}],[DURATION,{opacity:1}]])
      animations[0].onfinish = () => { elapsedRef.current = DURATION; root.dataset.heroState = 'settled' }
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
  }, [reduced])

  return (
    <div ref={rootRef} className="kinetic-identity" data-motion-root data-hero-state="static">
      <p className="display-12 font-bold text-prime mb-0 h-jakeicon" aria-hidden="true"><i className="fa-kit fa-jm-icon-full font-normal" /></p>
      <h1 className="hero-title text-prime"><span className="hero-name">Jacob Medley</span></h1>
      <div className="kinetic-stage" aria-hidden="true">
        <div className="kinetic-assembly">
          <div className="kinetic-bracketed">
            <span className="kinetic-static-brace is-left" />
            {ROLES.map(role => <span key={role} className="kinetic-word" data-role={role}>{role}</span>)}
            <span className="kinetic-static-brace is-right" />
          </div>
          <div className="kinetic-tail"><div className="kinetic-tail-inner"><span className="kinetic-plus" /><span className="kinetic-design">Design</span></div></div>
        </div>
      </div>
      <div className="kinetic-mechanism-motion" aria-hidden="true"><div className="kinetic-mechanism">
        <span className="kinetic-brace kinetic-brace-left" /><span className="kinetic-brace kinetic-brace-right" />
      </div></div>
      <p className="sr-only">Product and design leader</p>
      <p className="kinetic-closing">Let&apos;s Design and Build Something Great Together!</p>
    </div>
  )
}
