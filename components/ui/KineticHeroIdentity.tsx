'use client'

import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from './MotionControls'

const ROLES = ['Product', 'UX', 'Systems', 'IdX', 'Human'] as const
const DURATION = 39000
const CHANGES = [4000, 5000, 6000, 7000, 8000, 11000, 14000, 17000, 20000, 23000, 26000, 29000, 32000, 35000]
type Cue = [number, Keyframe]

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
      const closingY = closingNode.getBoundingClientRect().top - rootTop + closingNode.offsetHeight / 2 - size * .65
      const closingWidth = Math.min(root.clientWidth - size, closingNode.scrollWidth + size * .3)
      const tailWidth = find('.kinetic-tail-inner').getBoundingClientRect().width
      const stacked = getComputedStyle(find('.kinetic-assembly')).flexDirection === 'column'
      function track(node: HTMLElement, cues: Cue[]) {
        const animation = node.animate(cues.map(([time, frame]) => ({ ...frame, offset: time / DURATION, easing: 'cubic-bezier(.22,.75,.2,1)' })), { duration: DURATION, fill: 'both' })
        animation.pause()
        animation.currentTime = Math.min(elapsedRef.current, DURATION)
        // play() at a paused end time rewinds a finished timeline. Keep it finished.
        if (elapsedRef.current >= DURATION) animation.finish()
        animations.push(animation)
      }
      const pose = (time: number, transform: string, opacity = 1): Cue => [time, { transform, opacity }]
      track(find('.h-jakeicon'), [pose(0, 'translateY(-12px)', 0), pose(540, 'translateY(0)'), pose(DURATION, 'translateY(0)')])
      track(find('.hero-title'), [pose(0, 'translateY(0)', 0), pose(1650, 'translateY(0)', 0), pose(2250, 'translateY(0)'), pose(DURATION, 'translateY(0)')])
      const widthCues: Cue[] = [[0, {width: `${widths[0]}px`}]]
      CHANGES.forEach((time,i) => widthCues.push([time,{width:`${widths[i % 5]}px`}],[time+280,{width:`${widths[(i+1)%5]}px`}]))
      widthCues.push([DURATION,{width:`${widths[4]}px`}])
      track(find('.kinetic-bracketed'),widthCues)
      const mechanismWidth: Cue[] = [[0,{width:'0px'}],[1200,{width:'0px'}],[2200,{width:`${nameWidth}px`}],[2400,{width:`${nameWidth}px`}],[2900,{width:`${widths[0]-size*.7}px`}]]
      CHANGES.slice(0,4).forEach((time,i)=>mechanismWidth.push([time,{width:`${widths[i]-size*.7}px`}],[time+280,{width:`${widths[i+1]-size*.7}px`}]))
      mechanismWidth.push([8000,{width:`${widths[4]-size*.7}px`}],[8620,{width:'0px'}],[9450,{width:`${closingWidth}px`}],[10000,{width:`${closingWidth}px`}],[DURATION,{width:`${closingWidth}px`}])
      track(find('.kinetic-mechanism'),mechanismWidth)
      const center = stacked ? 0 : -tailWidth / 2
      track(find('.kinetic-mechanism-motion'),[
        pose(0,`translate(0px, ${nameY}px)`),pose(2400,`translate(0px, ${nameY}px)`),
        pose(2900,`translate(0px, ${roleY}px)`),pose(3100,`translate(0px, ${roleY}px)`),
        pose(3650,`translate(${center}px, ${roleY}px)`),pose(8000,`translate(${center}px, ${roleY}px)`),
        pose(8620,`translate(0px, ${closingY}px)`),pose(9700,`translate(0px, ${closingY}px)`),
        pose(10300,`translate(0px, ${closingY+16}px)`,0),pose(DURATION,`translate(0px, ${closingY+16}px)`,0),
      ])
      track(find('.kinetic-brace-left'),[
        pose(0,'translate(-50%, -.28em) rotate(-90deg)',0),pose(580,'translate(-50%, -.28em) rotate(-90deg)',0),
        pose(940,'translate(-50%, -.28em) rotate(-90deg)'),pose(1180,'translate(-50%, -.28em) rotate(-90deg)'),
        pose(1690,'translate(-50%, 0) rotate(0deg)'),pose(DURATION,'translate(-50%, 0) rotate(0deg)'),
      ])
      track(find('.kinetic-brace-right'),[
        pose(0,'translate(50%, .28em) rotate(-90deg)',0),pose(680,'translate(50%, .28em) rotate(-90deg)',0),
        pose(1040,'translate(50%, .28em) rotate(-90deg)'),pose(1180,'translate(50%, .28em) rotate(-90deg)'),
        pose(1690,'translate(50%, 0) rotate(0deg)'),pose(DURATION,'translate(50%, 0) rotate(0deg)'),
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
      const plusCues=[pose(0,'translateY(.06em) rotate(0deg)',0),pose(3150,'translateY(.06em) rotate(0deg)',0),pose(3550,'translateY(.06em) rotate(0deg)')]
      CHANGES.forEach((time,i)=>plusCues.push(pose(time,`translateY(.06em) rotate(${i*180}deg)`),pose(time+280,`translateY(.06em) rotate(${(i+1)*180}deg)`)))
      plusCues.push(pose(DURATION,`translateY(.06em) rotate(${CHANGES.length*180}deg)`))
      track(find('.kinetic-plus'),plusCues)
      track(find('.kinetic-design'),[pose(0,'translateX(.4em)',0),pose(3370,'translateX(.4em)',0),pose(3800,'translateX(0)'),pose(DURATION,'translateX(0)')])
      const closing=(time:number,clip:number,opacity:number):Cue=>[time,{clipPath:`inset(0 ${clip}% 0 0)`,opacity}]
      track(closingNode,[closing(0,100,0),closing(8500,100,0),closing(8650,100,1),closing(9450,0,1),closing(DURATION,0,1)])
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
            {ROLES.map(role => <span key={role} className="kinetic-word" data-role={role}>{role}</span>)}
          </div>
          <div className="kinetic-tail"><div className="kinetic-tail-inner"><span className="kinetic-plus">+</span><span className="kinetic-design">Design</span></div></div>
        </div>
      </div>
      <div className="kinetic-mechanism-motion" aria-hidden="true"><div className="kinetic-mechanism">
        <span className="kinetic-brace kinetic-brace-left">{'{'}</span><span className="kinetic-brace kinetic-brace-right">{'}'}</span>
      </div></div>
      <p className="sr-only">Product and design leader</p>
      <p className="kinetic-closing">Let&apos;s Design and Build Something Great Together!</p>
    </div>
  )
}
