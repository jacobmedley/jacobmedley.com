import type { PortfolioStudy } from '@/lib/data/portfolio-studies'
import { StudyBlock } from './StudyBlocks'
import DraftBadge from './DraftBadge'

export default function StudyPage({ study }: { study: PortfolioStudy }) {
  return (
    <article>
      {study.draft && <DraftBadge variant="banner" />}

      <header className="mb-8">
        {study.codename !== '—' && (
          <p className="mb-1 text-xs font-bold tracking-widest text-second uppercase">
            {study.codename}
          </p>
        )}
        <h1 className="mb-2">{study.title}</h1>
        <p className="text-fifth">
          {study.role} <span aria-hidden="true">·</span> {study.context}{' '}
          <span aria-hidden="true">·</span> {study.year}
        </p>
        <hr className="solid-center" />
        <p>{study.summary}</p>
      </header>

      {study.blocks.map((block, i) => (
        <StudyBlock key={i} block={block} />
      ))}
    </article>
  )
}
