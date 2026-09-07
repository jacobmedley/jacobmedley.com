'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CaseStudy } from '@/lib/data/case-studies'
import StudyVisual from './StudyVisual'
import Arrow from './Arrow'

const categories = ['All Work', 'Product', 'Systems', 'UX Research', 'Leadership', 'Brand']
type StudyPreview = Pick<CaseStudy, 'slug' | 'shortTitle' | 'category' | 'tags' | 'theme' | 'visual' | 'summary'>

export default function StudyCollection({ studies }: { studies: StudyPreview[] }) {
  const [category, setCategory] = useState('All Work')
  const filtered = category === 'All Work' ? studies : studies.filter((study) => study.tags.includes(category))

  return (
    <section className="cs-collection cs-container" id="selected-work" aria-labelledby="selected-work-title">
      <div className="cs-section-heading"><h2 id="selected-work-title">Different problems. Deliberate decisions.</h2><span aria-live="polite" aria-atomic="true">{filtered.length}{' // '}{filtered.length === 1 ? 'Case Study' : 'Case Studies'}</span></div>
      <div className="cs-filters" role="group" aria-label="Filter case studies by discipline">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="cs-study-grid">
        {filtered.map((study) => (
          <Link className={`cs-study-card cs-theme-${study.theme}`} key={study.slug} href={`/case-studies/${study.slug}/`} aria-label={`Read ${study.shortTitle}`}>
            <div className="cs-card-art" aria-hidden="true"><StudyVisual kind={study.visual} /></div>
            <div className="cs-card-copy"><div className="cs-badges" aria-label="Disciplines">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{study.shortTitle}</h3><p>{study.summary}</p><span className="cs-text-link">Read the story <Arrow /></span></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
