import { portfolioStudies } from '@/lib/data/portfolio-studies'
import WaveSeparator from '@/components/ui/WaveSeparator'
import StudyFilter from '@/components/portfolio/StudyFilter'

// Featured studies render first in DOM order; #portfolio-grid's dense flow
// (app/globals.css) lets standard cards backfill the gaps their 2-column
// span leaves behind. StudyFilter reuses this same order for every filtered
// subset.
const orderedStudies = [
  ...portfolioStudies.filter((s) => s.weight === 'featured'),
  ...portfolioStudies.filter((s) => s.weight === 'standard'),
]

export default function PortfolioIndexPage() {
  return (
    <div id="portfolio-shell" className="relative">
      <WaveSeparator position="top" waveId="portfolio-wave-top" />

      {/* Clears the header + fixed top wave + sticky chip nav so nothing
          starts hidden underneath them on load (see the matching
          calc() in the #portfolio-shell rules in globals.css). */}
      <div className="portfolio-top-spacer">
        <h1 className="mb-2">Selected Work</h1>
        <hr className="solid-center" />
      </div>

      <StudyFilter studies={orderedStudies} />

      {/* Clears the fixed bottom wave so the last grid row isn't hidden
          underneath it. */}
      <div className="portfolio-bottom-spacer" />

      <WaveSeparator position="bottom" waveId="portfolio-wave-bottom" />
    </div>
  )
}
