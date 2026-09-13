import Link from 'next/link'
import type { CaseStudyOutcome } from '@/lib/data/case-studies'
import Arrow from './Arrow'
import StudyVisual from './StudyVisual'
import StudyIconArt from './StudyIconArt'

export default function OutcomeDashboard({ outcomes }: { outcomes: CaseStudyOutcome[] }) {
  const featured = outcomes.find((outcome) => outcome.slug === 'one-platform-five-properties')
  const supporting = outcomes.filter((outcome) => outcome !== featured)
  // Keep the comparison and its accessible label tied to the same canonical proof.
  const launchWeeks = featured?.value.split(' → ').map(Number) ?? []

  return (
    <section className="cs-container cs-featured-section cs-outcomes" id="filtered-outcomes" aria-labelledby="outcomes-title">
      <div className="cs-featured-label">
        <span className="cs-eyebrow" id="outcomes-title">Selected Outcomes</span>
        <span>{String(outcomes.length).padStart(2, '0')}{' // Sourced Records'}</span>
      </div>
      {featured ? <Link className={`cs-featured cs-theme-${featured.theme}`} href={`/case-studies/${featured.slug}/`}>
        <div className="cs-featured-art" aria-hidden="true"><StudyVisual kind={featured.visual} /></div>
        <div className="cs-featured-copy">
          <div className="cs-badges" aria-label="Disciplines">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <h2>{featured.shortTitle}</h2>
          <p>{featured.context}</p>
          <div className="cs-launch-comparison" role="img" aria-label={`${featured.value} ${featured.label}`}>
            <span className="cs-eyebrow">{featured.label}</span>
            {launchWeeks.map((weeks, index) => ({ label: index === 0 ? 'Before' : 'After', weeks })).map((period) => (
              <div className="cs-launch-row" key={period.label} aria-hidden="true">
                <span>{period.label}</span><strong>{period.weeks}</strong>
                <span className="cs-week-track">{Array.from({ length: launchWeeks[0] }, (_, i) => <i className={i < period.weeks ? 'cs-week-filled' : ''} key={i} />)}</span>
              </div>
            ))}
          </div>
          <span className="cs-text-link">See the source story <Arrow /></span>
        </div>
      </Link> : null}
      <div className="cs-outcome-grid">
        {supporting.map((outcome) => (
          <Link data-motion-root className={`cs-icon-card cs-outcome-card thinking-thumb-icon cs-theme-${outcome.theme}`} href={`/case-studies/${outcome.slug}/`} key={outcome.slug}>
            <StudyIconArt kind={outcome.visual} />
            <div className="cs-icon-copy">
            <div className="cs-badges" aria-label="Disciplines">{outcome.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <span className="cs-outcome-type">Qualitative outcome</span>
            <strong>{outcome.value}</strong>
            <span className="cs-outcome-label">{outcome.label}</span>
            <p>{outcome.context}</p>
            <span className="cs-text-link">See the source story <Arrow /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
