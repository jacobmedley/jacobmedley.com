'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { PortfolioStudy, StudyTag } from '@/lib/data/portfolio-studies'
import StudyCard from './StudyCard'
import StudySkeleton from './StudySkeleton'

const ALL = 'All' as const
type Selection = StudyTag | typeof ALL

// How long the incoming set renders as skeletons before the real cards swap
// in. Kept well under 200ms per spec; also the timeout duration must match
// the CSS fade's duration below so the two don't visibly desync.
const TRANSITION_MS = 150

const CHIP_BASE =
  'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prime-dark'
const CHIP_ACTIVE = 'border-prime-dark bg-prime-dark text-white'
const CHIP_INACTIVE = 'border-fifth-light/60 bg-white text-fifth-dark hover:border-prime-dark'

export default function StudyFilter({ studies }: { studies: PortfolioStudy[] }) {
  const [active, setActive] = useState<Selection>(ALL)
  const [transitioning, setTransitioning] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Tags derived from the data (only ones at least one study actually
  // carries) — 'A/B Testing' stays out of this list until a study uses it,
  // per lib/data/portfolio-studies.ts's note that the tag is reserved.
  const tagCounts = useMemo(() => {
    const counts = new Map<StudyTag, number>()
    for (const study of studies) {
      for (const tag of study.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return counts
  }, [studies])
  const tags = useMemo(() => [...tagCounts.keys()], [tagCounts])

  const filtered = useMemo(
    () => (active === ALL ? studies : studies.filter((study) => study.tags.includes(active))),
    [studies, active]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function selectTag(tag: Selection) {
    const next = tag === active ? ALL : tag
    if (next === active) return
    setActive(next)
    setTransitioning(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setTransitioning(false), TRANSITION_MS)
  }

  return (
    <>
      <nav
        id="portfolio-filter"
        aria-label="Filter studies by discipline"
        className="sticky z-20 flex justify-center"
      >
        <div
          id="portfolio-filter-scroll"
          className="m-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-full border border-fifth-light/40 bg-white/75 px-3 py-2 shadow-[var(--shadow-bs)] backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center"
        >
          <button
            type="button"
            aria-pressed={active === ALL}
            onClick={() => selectTag(ALL)}
            className={`${CHIP_BASE} ${active === ALL ? CHIP_ACTIVE : CHIP_INACTIVE}`}
          >
            All ({studies.length})
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={active === tag}
              onClick={() => selectTag(tag)}
              className={`${CHIP_BASE} ${active === tag ? CHIP_ACTIVE : CHIP_INACTIVE}`}
            >
              {tag} ({tagCounts.get(tag)})
            </button>
          ))}
        </div>
      </nav>

      <div
        id="portfolio-grid"
        aria-live="polite"
        className={transitioning ? 'portfolio-filter-transition' : undefined}
      >
        {transitioning
          ? filtered.map((study) => <StudySkeleton key={study.slug} weight={study.weight} />)
          : filtered.map((study) => <StudyCard key={study.slug} study={study} />)}
      </div>
    </>
  )
}
