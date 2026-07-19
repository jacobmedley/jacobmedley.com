import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  icon: string
  /** Color utilities for the header row (e.g. legacy text-second-dark) */
  className?: string
  /** Extra classes for the h3 (legacy work adds mb-0, education adds text-fourth-light) */
  titleClassName?: string
  /** Extra classes for the icon (education uses text-fourth-light) */
  iconClassName?: string
  /** White hr gradient for dark sections (legacy .light) */
  light?: boolean
}

/**
 * Legacy section header: display-4 icon over display-4 bold title pulled
 * up with mt-n4, followed by a solid-center hr in a narrower column.
 */
export default function SectionHeader({
  title,
  icon,
  className,
  titleClassName,
  iconClassName,
  light = false,
}: SectionHeaderProps) {
  return (
    <>
      <div className={cn('row text-center justify-center', className)}>
        <div className="col-24 self-center">
          <p className="display-4">
            <i className={cn(icon, iconClassName)} aria-hidden="true" />
          </p>
          <h3 className={cn('display-4 font-bold -mt-6', titleClassName)}>{title}</h3>
        </div>
      </div>
      <div className="row text-center justify-center">
        <div className="col-24 col-xl-16 col-xxl-14 py-12">
          <hr className={cn('solid-center', light && 'light')} />
        </div>
      </div>
    </>
  )
}
