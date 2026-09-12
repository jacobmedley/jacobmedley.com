'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from './MotionControls'

/** Native details remains the semantic owner. Only its content height is animated. */
export default function ExperienceDisclosure({ company, children }: { company: string; children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const desiredOpen = useRef(false)
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => () => animationRef.current?.cancel(), [])
  useEffect(() => {
    if (!reduced) return
    animationRef.current?.cancel()
    animationRef.current = null
    if (detailsRef.current) detailsRef.current.open = desiredOpen.current
  }, [reduced])

  function toggle() {
    const details = detailsRef.current!
    const content = contentRef.current!
    const start = details.open ? content.getBoundingClientRect().height : 0
    animationRef.current?.cancel()
    const opening = !desiredOpen.current
    desiredOpen.current = opening
    setExpanded(opening)
    // Keep closing content in the layout until its last frame, with summary below it.
    details.open = true
    if (reduced || !content.animate) {
      details.open = opening
      return
    }
    const animation = content.animate(
      [{ height: `${start}px`, opacity: start === 0 ? 0 : 1 }, { height: `${opening ? content.scrollHeight : 0}px`, opacity: opening ? 1 : 0 }],
      { duration: 360, easing: 'cubic-bezier(.22,.75,.2,1)' },
    )
    animationRef.current = animation
    animation.onfinish = () => {
      details.open = opening
      animationRef.current = null
    }
  }

  return (
    <details ref={detailsRef} className="resume-experience-details" data-expanded={expanded} onToggle={() => {
      // Also support native/scripted activation outside the enhanced click path.
      if (!animationRef.current) {
        desiredOpen.current = detailsRef.current!.open
        setExpanded(desiredOpen.current)
      }
    }}>
      <summary onClick={(event) => { event.preventDefault(); toggle() }}>
        <span>{expanded ? 'Less' : 'More'}<span className="sr-only"> about {company}</span></span>
        <span className="resume-disclosure-plus" aria-hidden="true">+</span>
      </summary>
      <div ref={contentRef} className="resume-experience-content">
        <div className="resume-experience-copy">{children}</div>
      </div>
    </details>
  )
}
