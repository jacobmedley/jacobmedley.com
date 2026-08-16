import Link from 'next/link'
import type { PortfolioStudy, StudyTag } from '@/lib/data/portfolio-studies'
import type { BrandToken } from '@/lib/data/projects'

// Deterministic slug -> brand token, so a study's fallback panel is always
// the same color. Six buckets, one per existing brand hue (see
// app/globals.css's --color-* tokens) — no new palette introduced.
const BRAND_TOKENS: BrandToken[] = ['prime', 'second', 'third', 'fourth', 'fifth', 'pop']

function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function tokenForSlug(slug: string): BrandToken {
  return BRAND_TOKENS[hashSlug(slug) % BRAND_TOKENS.length]
}

// Tailwind's scanner needs literal class strings, not `bg-${token}-light`
// (same constraint CaseStudyModal.tsx works around for BG_LIGHT_25).
const PANEL_BG: Record<BrandToken, string> = {
  prime: 'bg-prime-light',
  second: 'bg-second-light',
  third: 'bg-third-light',
  fourth: 'bg-fourth-light',
  fifth: 'bg-fifth-light',
  pop: 'bg-pop-light',
}
const PANEL_TEXT: Record<BrandToken, string> = {
  prime: 'text-prime-dark',
  second: 'text-second-dark',
  third: 'text-third-dark',
  fourth: 'text-fourth-dark',
  fifth: 'text-fifth-dark',
  pop: 'text-pop-dark',
}

// Base intrinsic sizes for the two thumbnail ratios. Real pixel dimensions
// don't matter once CSS takes over the displayed size — only the ratio
// they encode, which is what keeps the browser from reflowing on image
// load (see StudyCard's aspect-ratio container).
const THUMB_SIZE = {
  featured: { width: 1200, height: 675 }, // 16:9
  standard: { width: 800, height: 600 }, // 4:3
} as const

function TagBadges({ tags }: { tags: StudyTag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-fifth-light/25 px-2 py-0.5 text-xs font-bold tracking-widest text-fifth-dark uppercase"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default function StudyCard({ study }: { study: PortfolioStudy }) {
  const featured = study.weight === 'featured'
  const token = tokenForSlug(study.slug)
  const size = THUMB_SIZE[study.weight]
  const primaryTag = study.tags[0]

  return (
    <Link
      href={`/portfolio/${study.slug}/`}
      data-weight={study.weight}
      className="card block h-full overflow-hidden no-underline text-fifth-dark shadow-[var(--shadow-bs)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-bs-lg)]"
    >
      <div className={featured ? 'aspect-video' : 'aspect-[4/3]'}>
        {study.thumbnail ? (
          <img
            src={study.thumbnail}
            alt=""
            width={size.width}
            height={size.height}
            className="h-full w-full object-cover"
            loading={featured ? 'eager' : 'lazy'}
            decoding={featured ? undefined : 'async'}
            {...(featured ? { fetchPriority: 'high' as const } : {})}
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${PANEL_BG[token]}`}
          >
            {primaryTag && (
              <span
                className={`text-xs font-bold tracking-widest uppercase ${PANEL_TEXT[token]}`}
              >
                {primaryTag}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="card-body flex flex-col gap-3">
        <TagBadges tags={study.tags} />
        <h3 className={featured ? 'h3 mb-0' : 'h4 mb-0'}>{study.title}</h3>
        <p className={featured ? 'mb-0 text-lg' : 'mb-0'}>{study.blurb}</p>
      </div>
    </Link>
  )
}
