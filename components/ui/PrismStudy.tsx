import type { ReactNode } from 'react'

export type PrismTone = 'plum' | 'sage' | 'gold' | 'slate'

/** The surface contract used by the Product Framework modal. */
export function PrismStudySurface({ children, tone = 'plum', className = '' }: {
  children: ReactNode; tone?: PrismTone; className?: string
}) {
  return <div className={`modal-prism-surface ${className}`} data-prism-tone={tone}>{children}</div>
}

export function PrismStudyHeading({ id, icon, children, level = 'h3' }: {
  id: string; icon: string; children: ReactNode; level?: 'h2' | 'h3'
}) {
  const Heading = level
  return <>
    <div className="modal-section-heading prism-study-heading" id={id} tabIndex={-1}>
      <span aria-hidden="true"><i className={`fa-thin ${icon}`} /></span>
      <Heading>{children}</Heading>
    </div>
    <hr className="solid-center" />
  </>
}
