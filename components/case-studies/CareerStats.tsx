import Link from 'next/link'
import { getCaseStudy } from '@/lib/data/case-studies'
import Arrow from './Arrow'

export default function CareerStats() {
  const platform = getCaseStudy('one-platform-five-properties')!
  const metrics = [
    { ...platform.proof[1], eyebrow: 'Shared Foundation', theme: 'sage', icon: 'fa-layer-group' },
    { ...platform.proof[2], eyebrow: 'Finance Attributed', theme: 'gold', icon: 'fa-chart-line', note: "Share of that year's growth increment." },
    { ...platform.proof[0], eyebrow: 'Launch Cycle', theme: 'slate', icon: 'fa-stopwatch' },
  ]
  return (
    <aside className="cs-career" aria-labelledby="career-title">
      <h2 className="cs-eyebrow" id="career-title">Career at a Glance</h2>
      <div className="cs-career-grid">
        <a className="cs-stat cs-theme-plum" href="/#resume" target="_blank" rel="noopener noreferrer" aria-label="20 years in design. Read experience, opens in a new tab">
          <span className="cs-stat-top">Experience <i className="fa-thin fa-compass-drafting" aria-hidden="true" /></span>
          <strong>20</strong><span className="cs-stat-label">Years in design</span><i className="cs-arrow fa-thin fa-arrow-up-right-from-square" aria-hidden="true" />
        </a>
        {metrics.map((metric) => (
          <Link className={`cs-stat cs-theme-${metric.theme}`} href={`/case-studies/${platform.slug}/`} key={metric.eyebrow}>
            <span className="cs-stat-top">{metric.eyebrow}<i className={`fa-thin ${metric.icon}`} aria-hidden="true" /></span>
            <strong>{metric.value}</strong>
            <span className="cs-stat-label">{metric.label}</span>
            {'note' in metric ? <span className="cs-stat-note">{metric.note}</span> : null}
            <Arrow />
          </Link>
        ))}
      </div>
    </aside>
  )
}
