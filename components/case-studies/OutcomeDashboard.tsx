import Link from 'next/link'
import { caseStudyOutcomes } from '@/lib/data/case-studies'
import Arrow from './Arrow'
import StudyVisual from './StudyVisual'

export default function OutcomeDashboard() {
  const [featured, ...supporting] = caseStudyOutcomes

  return (
    <section className="cs-container cs-featured-section cs-outcomes" aria-labelledby="outcomes-title">
      <div className="cs-featured-label">
        <span className="cs-eyebrow" id="outcomes-title">Selected Outcomes</span>
        <span>06 // Sourced Records</span>
      </div>
      <Link className={`cs-featured cs-theme-${featured.theme}`} href={`/case-studies/${featured.slug}/`}>
        <div className="cs-featured-art" aria-hidden="true"><StudyVisual kind={featured.visual} /></div>
        <div className="cs-featured-copy">
          <div className="cs-badges" aria-label="Disciplines">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <h2>{featured.shortTitle}</h2>
          <p>{featured.context}</p>
          <div className="cs-featured-metric"><strong>{featured.value}</strong><span>{featured.label}</span></div>
          <span className="cs-text-link">See the source story <Arrow /></span>
        </div>
      </Link>
      <div className="cs-outcome-grid">
        {supporting.map((outcome) => (
          <Link className={`cs-outcome-card cs-theme-${outcome.theme}`} href={`/case-studies/${outcome.slug}/`} key={outcome.slug}>
            <div className="cs-badges" aria-label="Disciplines">{outcome.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <span className="cs-outcome-type">Qualitative outcome</span>
            <strong>{outcome.value}</strong>
            <span className="cs-outcome-label">{outcome.label}</span>
            <p>{outcome.context}</p>
            <span className="cs-text-link">See the source story <Arrow /></span>
          </Link>
        ))}
      </div>
    </section>
  )
}
