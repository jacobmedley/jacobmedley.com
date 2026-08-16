import { portfolioStudies } from '@/lib/data/portfolio-studies'
import StudyCard from '@/components/portfolio/StudyCard'

// Featured studies render first in DOM order; #portfolio-grid's dense flow
// (app/globals.css) lets standard cards backfill the gaps their 2-column
// span leaves behind.
const orderedStudies = [
  ...portfolioStudies.filter((s) => s.weight === 'featured'),
  ...portfolioStudies.filter((s) => s.weight === 'standard'),
]

export default function PortfolioIndexPage() {
  return (
    <>
      <h1 className="mb-2">Selected Work</h1>
      <hr className="solid-center" />

      <div id="portfolio-grid" className="mt-4">
        {orderedStudies.map((study) => (
          <StudyCard key={study.slug} study={study} />
        ))}
      </div>
    </>
  )
}
