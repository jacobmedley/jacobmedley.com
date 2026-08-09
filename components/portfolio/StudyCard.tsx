import Link from 'next/link'
import type { PortfolioStudy } from '@/lib/data/portfolio-studies'
import DraftBadge from './DraftBadge'

export default function StudyCard({ study }: { study: PortfolioStudy }) {
  return (
    <Link
      href={`/portfolio/${study.slug}/`}
      className="card block h-full no-underline text-fifth-dark shadow-[var(--shadow-bs)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-bs-lg)]"
    >
      <div className="card-body flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          {study.codename !== '—' ? (
            <span className="text-xs font-bold tracking-widest text-second uppercase">
              {study.codename}
            </span>
          ) : (
            <span />
          )}
          {study.draft && <DraftBadge variant="pill" />}
        </div>

        <h3 className="h4 mb-0">{study.title}</h3>
        <p className="mb-0 text-sm text-fifth">
          {study.role} <span aria-hidden="true">·</span> {study.year}
        </p>
        <p className="mb-0">{study.summary}</p>
      </div>
    </Link>
  )
}
