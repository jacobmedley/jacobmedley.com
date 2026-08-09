import { portfolioStudies } from '@/lib/data/portfolio-studies'
import StudyCard from '@/components/portfolio/StudyCard'

export default function PortfolioIndexPage() {
  return (
    <>
      <h1 className="mb-2">Selected Work</h1>
      <p className="text-fifth">
        ⚠ LOREM — REWRITE: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <hr className="solid-center" />

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-4">
        {portfolioStudies.map((study) => (
          <div key={study.slug} className="col mb-6">
            <StudyCard study={study} />
          </div>
        ))}
      </div>
    </>
  )
}
