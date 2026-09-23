'use client'

import { CornerWaves } from '@/components/ui/QuietPrism'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { CaseStudy, CaseStudyOutcome } from '@/lib/data/case-studies'
import StudyIconArt from './StudyIconArt'
import OutcomeDashboard from './OutcomeDashboard'
import Arrow from './Arrow'

const categories = ['All Work', 'Product', 'Systems', 'UX Research', 'Leadership', 'Brand']
type StudyPreview = Pick<CaseStudy, 'slug' | 'shortTitle' | 'category' | 'tags' | 'theme' | 'visual' | 'summary'>

export default function StudyCollection({ studies, outcomes }: { studies: StudyPreview[]; outcomes: CaseStudyOutcome[] }) {
  const [category, setCategory] = useState('All Work')
  const [context, setContext] = useState<'outcomes' | 'stories'>('outcomes')
  const [yielded, setYielded] = useState(false)
  const browseRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const storiesRef = useRef<HTMLElement>(null)
  const filtered = category === 'All Work' ? studies : studies.filter((study) => study.tags.includes(category))
  const filteredOutcomes = category === 'All Work' ? outcomes : outcomes.filter((outcome) => outcome.tags.includes(category))

  useLayoutEffect(() => {
    const browse = browseRef.current
    const sticky = stickyRef.current
    if (!browse || !sticky) return

    const measure = () => {
      const height = Math.ceil(sticky.getBoundingClientRect().height)
      browse.style.setProperty('--cs-browse-sticky-height', `${height}px`)
      document.documentElement.style.setProperty('--cs-scroll-padding', `${height}px`)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(sticky)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--cs-scroll-padding')
    }
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const stickyHeight = stickyRef.current?.getBoundingClientRect().height ?? 0
      const storiesTop = storiesRef.current?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY
      const browseBottom = browseRef.current?.getBoundingClientRect().bottom ?? Number.POSITIVE_INFINITY
      const stickyHasFocus = stickyRef.current?.contains(document.activeElement) ?? false
      setContext(storiesTop <= stickyHeight + 16 ? 'stories' : 'outcomes')
      setYielded(!stickyHasFocus && browseBottom <= stickyHeight + 64)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('focusin', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('focusin', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [category])

  return (
    <div className="cs-browse" ref={browseRef}>
      <div className={`cs-browse-sticky${yielded ? ' is-yielded' : ''}`} id="selected-work" ref={stickyRef}>
        <div className="cs-browse-context" aria-hidden="true">
          <span className="cs-container">{context === 'outcomes' ? 'Selected Outcomes' : 'Different problems. Deliberate decisions.'}</span>
        </div>
        <div className="cs-filter-bar">
          <div className="cs-container cs-filters" role="group" aria-label="Filter case studies by discipline">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="filtered-outcomes filtered-stories" onClick={() => setCategory(item)}>{item}</button>)}</div>
        </div>
      </div>
      <OutcomeDashboard outcomes={filteredOutcomes} />
      <section ref={storiesRef} className="cs-collection cs-container" aria-labelledby="selected-work-title" id="filtered-stories">
      <div className="cs-section-heading"><h2 id="selected-work-title">Different problems. Deliberate decisions.</h2><span aria-live="polite" aria-atomic="true">{filtered.length}{' // '}{filtered.length === 1 ? 'Case Study' : 'Case Studies'}</span></div>
      <div className="cs-study-grid">
        {filtered.map((study) => (
          <Link data-motion-root data-atmosphere className={`cs-study-card cs-icon-card thinking-thumb-icon cs-theme-${study.theme}`} key={study.slug} href={`/case-studies/${study.slug}/`} aria-label={`Read ${study.shortTitle}`}>
            <CornerWaves />
            <StudyIconArt kind={study.visual} />
            <div className="cs-card-copy"><div className="cs-badges" role="group" aria-label="Disciplines">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{study.shortTitle}</h3><p>{study.summary}</p><span className="cs-text-link">Read <Arrow /></span></div>
          </Link>
        ))}
      </div>
      </section>
    </div>
  )
}
