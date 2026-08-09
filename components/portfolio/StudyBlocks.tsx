import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { StyledListBlock, CardBlock, SplitRowBlock } from '@/lib/data/projects'
import type { ContentBlock } from '@/lib/data/portfolio-studies'

/**
 * FORKED renderer, not shared with the public site.
 *
 * components/ui/CaseStudyModal.tsx has the "real" versions of this logic
 * (BlockContent / MediaBlock / SplitRow / StyledListContent / CardContent),
 * but none of it is exported — only the default CaseStudyModal component is
 * — and the isolation rules for this feature forbid editing that file to
 * export them. So this is a deliberate fork, trimmed to the four block
 * types the portfolio placeholder data actually uses (split-row /
 * styled-list / card / divider — see lib/data/portfolio-studies.ts).
 *
 * It reuses the same global `.row`/`.col-*`/`.card`/`.list-group` classes
 * from app/globals.css (unchanged, shared with the public site) so the
 * output matches CaseStudyModal's typography/spacing without duplicating
 * any CSS. If the portfolio ever needs the other ProjectMedia variants
 * (heading, text, image, image-row, metric-grid, progress-diagram, ...),
 * port them into this file too rather than reaching back into the modal.
 */
export function StudyBlock({ block }: { block: ContentBlock }): ReactNode {
  switch (block.type) {
    case 'divider':
      return (
        <div className="row">
          <div className="col-24 my-12">
            <hr className="solid-center" />
          </div>
        </div>
      )
    case 'styled-list':
      return (
        <div className="row">
          <div className="col-24">
            <StyledList block={block} />
          </div>
        </div>
      )
    case 'card':
      return (
        <div className="row">
          <div className="col-24">
            <Card block={block} />
          </div>
        </div>
      )
    case 'split-row':
      return <SplitRow block={block} />
    default:
      // Not one of the four types the portfolio's placeholder data uses.
      return null
  }
}

const SPLIT_ROW_REVERSE_CLASS = { md: 'md:flex-row-reverse', lg: 'lg:flex-row-reverse' } as const

function SplitRow({ block }: { block: SplitRowBlock }) {
  const bp = block.breakpoint ?? 'lg'
  return (
    <div className={cn('row items-start', block.reverse && SPLIT_ROW_REVERSE_CLASS[bp])}>
      <div className={`col-24 col-${bp}-${block.leftSpan ?? 12}`}>
        {block.left.map((child, i) => (
          <StudyBlockBare key={i} block={child} />
        ))}
      </div>
      <div className={`col-24 col-${bp}-${block.rightSpan ?? 12}`}>
        {block.right.map((child, i) => (
          <StudyBlockBare key={i} block={child} />
        ))}
      </div>
    </div>
  )
}

/** Same block content as StudyBlock, without the outer `.row`/`.col-24`
 * wrapper — for use inside SplitRow's own columns (matches CaseStudyModal's
 * BlockContent-vs-MediaBlock split). */
function StudyBlockBare({ block }: { block: ContentBlock }): ReactNode {
  switch (block.type) {
    case 'styled-list':
      return <StyledList block={block} />
    case 'card':
      return <Card block={block} />
    case 'divider':
      return <hr className="solid-center my-12" />
    default:
      return null
  }
}

function StyledList({ block }: { block: StyledListBlock }) {
  const rich = block.numbered || block.shadow || block.items.some((item) => item.bg)

  if (!rich) {
    return (
      <ul className="list-disc pl-6">
        {block.items.map((item, i) => (
          <li key={i}>
            {item.label && <strong>{item.label} </strong>}
            {item.body}
          </li>
        ))}
      </ul>
    )
  }

  const ListTag = block.numbered ? 'ol' : 'ul'
  return (
    <ListTag
      className={cn(
        'list-group',
        block.numbered && 'list-group-numbered',
        block.shadow && 'shadow-[var(--shadow-bs-lg)]'
      )}
    >
      {block.items.map((item, i) => (
        <li key={i} className="list-group-item flex justify-between items-start">
          <div className="ms-2 me-auto">
            {item.label && <div className="font-bold">{item.label}</div>}
            {item.body}
          </div>
        </li>
      ))}
    </ListTag>
  )
}

function Card({ block }: { block: CardBlock }) {
  return (
    <div className={cn('card', block.shadow && 'shadow-[var(--shadow-bs-lg)]')}>
      <div className="card-header">{block.header}</div>
      <div className="card-body">
        {block.rows.map((row) => (
          <div key={row.label}>
            <p className="mb-0">
              <strong>{row.label}</strong>
            </p>
            <p>{row.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
