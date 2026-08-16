import { portfolioStudies } from '@/lib/data/portfolio-studies'
import StudyCard from '@/components/portfolio/StudyCard'

export default function PortfolioIndexPage() {
  return (
    <>
      <h1 className="mb-2">Selected Work</h1>
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
