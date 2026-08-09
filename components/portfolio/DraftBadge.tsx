/**
 * Amber "this is placeholder copy" flag, two variants: a small pill for
 * StudyCard tiles, a full-width banner for StudyPage. Colors are arbitrary
 * Tailwind values (not new brand tokens, not new globals.css rules) since
 * amber isn't one of the site's six brand colors.
 */
export default function DraftBadge({ variant = 'pill' }: { variant?: 'pill' | 'banner' }) {
  if (variant === 'banner') {
    return (
      <div className="mb-6 flex items-center gap-2 rounded-lg border border-[#f59e0b] bg-[#fef3c7] px-4 py-3 text-[#92400e]">
        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
        <strong>DRAFT</strong> — placeholder copy, not final.
      </div>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#f59e0b] bg-[#fef3c7] px-3 py-1 text-xs font-bold tracking-wide text-[#92400e] uppercase">
      <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" /> Draft
    </span>
  )
}
