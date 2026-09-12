'use client'

import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from './MotionControls'

const ROLES = ['Product', 'UX', 'Systems', 'IdX', 'Human'] as const
const DURATION = 65000
const CHANGES = [9000, 14500, 20000, 25500, 33000, 40000, 47000, 54000, 61000]
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
      const y = name.getBoundingClientRect().top + name.offsetHeight / 2 - (stage.getBoundingClientRect().top + stage.offsetHeight / 2)
      const collapsed = size * 2.65 // Includes the diagonal bounds of rotating braces, not just glyph width.
      const tailWidth = find('.kinetic-tail-inner').getBoundingClientRect().width
      function track(node: HTMLElement, cues: Cue[]) {
        const animation = node.animate(cues.map(([time, frame]) => ({ ...frame, offset: time / DURATION, easing: 'cubic-bezier(.22,.75,.2,1)' })), { duration: DURATION, fill: 'both' })
        animation.pause()
        animation.currentTime = Math.min(elapsedRef.current, DURATION)
        // play() at a paused end time rewinds a finished timeline. Keep it finished.
        if (elapsedRef.current >= DURATION) animation.finish()
        animations.push(animation)
      }
      const pose = (time: number, transform: string, opacity = 1): Cue => [time, { transform, opacity }]
      track(find('.h-jakeicon'), [pose(0, 'translateY(-12px)', 0), pose(440, 'translateY(0)'), pose(DURATION, 'translateY(0)')])
      track(find('.hero-title'), [pose(0, 'translateY(-10px)', 0), pose(140, 'translateY(-10px)', 0), pose(600, 'translateY(0)'), pose(1080, 'translateY(0)'), pose(1400, 'translateY(5px)', 0), pose(1900, 'translateY(-5px)', 0), pose(2420, 'translateY(0)'), pose(DURATION, 'translateY(0)')])
      track(find('.kinetic-assembly'), [pose(0, `translate(-50%, ${y}px)`), pose(2520, `translate(-50%, ${y}px)`), pose(3060, 'translate(-50%, 0px)'), pose(DURATION, 'translate(-50%, 0px)')])
      const widthCues: Cue[] = [[0, { width: `${nameWidth + size}px` }], [850, { width: `${collapsed}px` }], [1760, { width: `${collapsed}px` }], [2360, { width: `${nameWidth}px` }], [2540, { width: `${nameWidth}px` }], [3040, { width: `${collapsed}px` }], [3540, { width: `${widths[0]}px` }]]
      CHANGES.forEach((time, i) => widthCues.push([time, { width: `${widths[i % 5]}px` }], [time + 680, { width: `${widths[(i + 1) % 5]}px` }]))
      widthCues.push([DURATION, { width: `${widths[4]}px` }])
      track(find('.kinetic-bracketed'), widthCues)
      track(find('.kinetic-brace-left'), [pose(0, 'translateY(-.7em) rotate(-90deg)', 0), pose(480, 'translateY(-.7em) rotate(-90deg)', 0), pose(820, 'translateY(0) rotate(-90deg)'), pose(1240, 'rotate(0deg)'), pose(1580, 'rotate(90deg)'), pose(2100, 'rotate(0deg)'), pose(DURATION, 'rotate(0deg)')])
      track(find('.kinetic-brace-right'), [pose(0, 'translateY(-.7em) rotate(90deg)', 0), pose(640, 'translateY(-.7em) rotate(90deg)', 0), pose(980, 'translateY(0) rotate(90deg)'), pose(1390, 'rotate(0deg)'), pose(1750, 'rotate(-90deg)'), pose(2260, 'rotate(0deg)'), pose(DURATION, 'rotate(0deg)')])
      words.forEach((word, roleIndex) => {
        const frames: Cue[] = [pose(0, 'translateY(-.28em)', 0)]
        if (roleIndex === 0) frames.push(pose(3180, 'translateY(-.28em)', 0), pose(3640, 'translateY(0)'))
        CHANGES.forEach((time, i) => {
          if (i % 5 === roleIndex) frames.push(pose(time, 'translateY(0)'), pose(time + 300, 'translateY(.28em)', 0))
          if ((i + 1) % 5 === roleIndex) frames.push(pose(time + 340, 'translateY(-.28em)', 0), pose(time + 820, 'translateY(0)'))
        })
        frames.push(pose(DURATION, roleIndex === 4 ? 'translateY(0)' : 'translateY(.28em)', roleIndex === 4 ? 1 : 0))
        track(word, frames)
      })
      track(find('.kinetic-tail'), [[0, { width: '0px' }], [3640, { width: '0px' }], [4360, { width: `${tailWidth}px` }], [DURATION, { width: `${tailWidth}px` }]])
      const plusCues = [pose(0, 'translateX(-.5em) rotate(0deg)', 0), pose(3760, 'translateX(-.5em) rotate(0deg)', 0), pose(4050, 'translateX(0) rotate(0deg)'), pose(4230, 'rotate(0deg)'), pose(4750, 'rotate(360deg)')]
      CHANGES.forEach((time, i) => plusCues.push(pose(time, `rotate(${360 + i * 180}deg)`), pose(time + 820, `rotate(${540 + i * 180}deg)`)))
      plusCues.push(pose(DURATION, 'rotate(1980deg)'))
      track(find('.kinetic-plus'), plusCues)
      track(find('.kinetic-design'), [pose(0, 'translateX(.6em) scale(1.07)', 0), pose(4190, 'translateX(.6em) scale(1.07)', 0), pose(4620, 'translateX(0) scale(1.07)'), pose(5000, 'translateX(0) scale(1)'), pose(DURATION, 'translateX(0) scale(1)')])
      const closing = (time: number, clip: number, opacity: number, y = 0): Cue => [time, { clipPath: `inset(0 ${clip}% 0 0)`, opacity, transform: `translateY(${y}px)` }]
      track(find('.kinetic-closing'), [closing(0, 100, 0), closing(5100, 100, 1), closing(6900, 0, 1), closing(8900, 0, 1), closing(9600, 0, 0, 12), closing(DURATION, 0, 0, 12)])
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
            <span className="kinetic-brace kinetic-brace-left">{'{'}</span>
            {ROLES.map(role => <span key={role} className="kinetic-word" data-role={role}>{role}</span>)}
            <span className="kinetic-brace kinetic-brace-right">{'}'}</span>
          </div>
          <div className="kinetic-tail"><div className="kinetic-tail-inner"><span className="kinetic-plus">+</span><span className="kinetic-design">Design</span></div></div>
        </div>
      </div>
      <p className="sr-only">Product and design leader</p>
      <p className="kinetic-closing">Let&apos;s Design and Build Something Great Together!</p>
    </div>
  )
}
