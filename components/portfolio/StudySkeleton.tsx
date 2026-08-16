import type { StudyWeight } from '@/lib/data/portfolio-studies'

/**
 * Ghost version of StudyCard, structurally identical down to the same
 * wrapper/aspect-ratio/card-body classes, so a real StudyCard swaps in at
 * the same size with zero layout shift. Not wired into
 * app/portfolio/page.tsx today — this page is statically exported, so real
 * content is already in the HTML at first paint and the skeleton would
 * only ever flash on a slow connection. It exists for that slow-connection
 * case and for Phase 2B's filter transition, which will mount it while the
 * grid re-sorts.
 */
export default function StudySkeleton({ weight }: { weight: StudyWeight }) {
  const featured = weight === 'featured'

  return (
    <div
      data-weight={weight}
      aria-hidden="true"
      className="card block h-full overflow-hidden shadow-[var(--shadow-bs)]"
    >
      <div className={featured ? 'aspect-video' : 'aspect-[4/3]'}>
        <div className="study-skeleton-tone h-full w-full" />
      </div>

      <div className="card-body flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="study-skeleton-tone h-5 w-16 rounded-full" />
          <span className="study-skeleton-tone h-5 w-20 rounded-full" />
        </div>
        <div className={`study-skeleton-tone rounded ${featured ? 'h-8 w-3/4' : 'h-7 w-3/4'}`} />
        <div className="flex flex-col gap-2">
          <div className="study-skeleton-tone h-4 w-full rounded" />
          <div className="study-skeleton-tone h-4 w-2/3 rounded" />
        </div>
      </div>
    </div>
  )
}
