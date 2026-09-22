'use client'

import { CornerWaves } from '@/components/ui/QuietPrism'
import prismStyles from './QuietPrism.module.css'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from './MotionControls'

/** Native details remains the semantic owner. Only its content height is animated. */
export default function ExperienceDisclosure({ company, header, children }: { company: string; header: ReactNode; children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const animationsRef = useRef<Animation[]>([])
  const transitionRef = useRef(0)
  const desiredOpen = useRef(false)
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const settle = () => {
      transitionRef.current += 1
      animationsRef.current.forEach(animation => animation.cancel())
      animationsRef.current = []
      if (detailsRef.current) detailsRef.current.open = desiredOpen.current
    }
    if (reduced) settle()
    window.addEventListener('resize', settle)
    return () => { settle(); window.removeEventListener('resize', settle) }
  }, [reduced])

  function toggle() {
    const details = detailsRef.current!
    const content = contentRef.current!
    const start = details.open ? content.getBoundingClientRect().height : 0
    const opacity = details.open ? Number(getComputedStyle(content).opacity) : 0
    animationsRef.current.forEach(animation => animation.cancel())
    animationsRef.current = []
    const transition = ++transitionRef.current
    const opening = !desiredOpen.current
    desiredOpen.current = opening
    setExpanded(opening)
    // Keep native content available until the close has faded and collapsed.
    details.open = true
    if (reduced || !content.animate) {
      details.open = opening
      return
    }
    const fadeOut = opening || opacity === 0 ? 0 : 180
    const resizeDuration = opening ? 600 : 480
    const resize = content.animate(
      [{ height: `${start}px` }, { height: `${opening ? content.scrollHeight : 0}px` }],
      { duration: resizeDuration, delay: fadeOut, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' },
    )
    const fade = content.animate(
      [{ opacity }, { opacity: opening ? 1 : 0 }],
      { duration: opening ? 280 : fadeOut, delay: opening ? resizeDuration : 0, easing: 'ease-out', fill: 'both' },
    )
    animationsRef.current = [resize, fade]
    void Promise.all([resize.finished, fade.finished]).then(() => {
      if (transition !== transitionRef.current) return
      details.open = opening
      animationsRef.current.forEach(animation => animation.cancel())
      animationsRef.current = []
    }).catch(() => { /* A newer toggle, resize or motion preference owns the state. */ })
  }

  return (
    <article className="resume-experience-card" data-motion-root data-atmosphere data-expanded={expanded} onClick={event => {
      if ((event.target as HTMLElement).closest('a,button,input,select,textarea,summary') || window.getSelection()?.toString()) return
      const summary = detailsRef.current?.querySelector('summary')
      summary?.focus({ preventScroll: true })
      summary?.click()
    }}>
      <CornerWaves both />
      <span className={prismStyles.edgeShine} aria-hidden="true" />
      {header}
      <span className="resume-disclosure-plus" aria-hidden="true" />
    <details ref={detailsRef} className="resume-experience-details" data-expanded={expanded} onToggle={() => {
      // Also support native/scripted activation outside the enhanced click path.
      if (animationsRef.current.length === 0) {
        desiredOpen.current = detailsRef.current!.open
        setExpanded(desiredOpen.current)
      }
    }}>
      <summary onClick={(event) => { event.preventDefault(); toggle() }}>
        <span>{expanded ? 'Less' : 'More'}<span className="sr-only"> about {company}</span></span>
        <i className="fa-thin fa-chevron-down resume-disclosure-chevron" aria-hidden="true" />
      </summary>
      <div ref={contentRef} className="resume-experience-content">
        <div className="resume-experience-copy">{children}</div>
      </div>
    </details>
    </article>
  )
}
