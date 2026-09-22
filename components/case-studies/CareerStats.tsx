import { CornerWaves } from '@/components/ui/QuietPrism'
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
        <Link data-motion-root data-atmosphere className="cs-stat cs-theme-plum" href="/#resume" aria-label="20+ years in design. Read experience">
          <CornerWaves />
          <span className="cs-stat-top">Experience <i className="fa-thin fa-compass-drafting" aria-hidden="true" /></span>
          <strong>20+</strong><span className="cs-stat-label">Years in design</span><i className="cs-arrow fa-thin fa-arrow-right" aria-hidden="true" />
        </Link>
        {metrics.map((metric) => (
          <Link data-motion-root data-atmosphere className={`cs-stat cs-theme-${metric.theme}`} href={`/case-studies/${platform.slug}/`} key={metric.eyebrow}>
            <CornerWaves />
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
