'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CaseStudy, CaseStudyOutcome } from '@/lib/data/case-studies'
import StudyIconArt from './StudyIconArt'
import OutcomeDashboard from './OutcomeDashboard'
import Arrow from './Arrow'

const categories = ['All Work', 'Product', 'Systems', 'UX Research', 'Leadership', 'Brand']
type StudyPreview = Pick<CaseStudy, 'slug' | 'shortTitle' | 'category' | 'tags' | 'theme' | 'visual' | 'summary'>

export default function StudyCollection({ studies, outcomes }: { studies: StudyPreview[]; outcomes: CaseStudyOutcome[] }) {
  const [category, setCategory] = useState('All Work')
  const filtered = category === 'All Work' ? studies : studies.filter((study) => study.tags.includes(category))
  const filteredOutcomes = category === 'All Work' ? outcomes : outcomes.filter((outcome) => outcome.tags.includes(category))

  return (
    <div className="cs-browse">
      <div className="cs-filter-bar" id="selected-work">
        <div className="cs-container cs-filters" role="group" aria-label="Filter case studies by discipline">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="filtered-outcomes filtered-stories" onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      <OutcomeDashboard outcomes={filteredOutcomes} />
      <section className="cs-collection cs-container" aria-labelledby="selected-work-title" id="filtered-stories">
      <div className="cs-section-heading"><h2 id="selected-work-title">Different problems. Deliberate decisions.</h2><span aria-live="polite" aria-atomic="true">{filtered.length}{' // '}{filtered.length === 1 ? 'Case Study' : 'Case Studies'}</span></div>
      <div className="cs-study-grid">
        {filtered.map((study) => (
          <Link className={`cs-study-card cs-icon-card thinking-thumb-icon cs-theme-${study.theme}`} key={study.slug} href={`/case-studies/${study.slug}/`} aria-label={`Read ${study.shortTitle}`}>
            <StudyIconArt kind={study.visual} />
            <div className="cs-card-copy"><div className="cs-badges" aria-label="Disciplines">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{study.shortTitle}</h3><p>{study.summary}</p><span className="cs-text-link">Read <Arrow /></span></div>
          </Link>
        ))}
      </div>
      </section>
    </div>
  )
}
