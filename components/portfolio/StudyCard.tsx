import Link from 'next/link'
import type { PortfolioStudy } from '@/lib/data/portfolio-studies'

export default function StudyCard({ study }: { study: PortfolioStudy }) {
  return (
    <Link
      href={`/portfolio/${study.slug}/`}
      className="card block h-full no-underline text-fifth-dark shadow-[var(--shadow-bs)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-bs-lg)]"
    >
      <div className="card-body flex h-full flex-col gap-3">
        <span className="text-xs font-bold tracking-widest text-second uppercase">
          {study.tags.join(' · ')}
        </span>

        <h3 className="h4 mb-0">{study.title}</h3>
        <p className="mb-0">{study.blurb}</p>
      </div>
    </Link>
  )
}
