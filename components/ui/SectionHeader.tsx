'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  icon: string
  /** Color utilities for the header row (e.g. legacy text-second-dark) */
  className?: string
  /** Extra classes for the h2 (legacy work adds mb-0, education adds text-fourth-light) */
  titleClassName?: string
  /** Extra classes for the icon (education uses text-fourth-light) */
  iconClassName?: string
  /** White hr gradient for dark sections (legacy .light) */
  light?: boolean
}

/**
 * Shared brand-wave section header: thin 4rem icon over a 3rem/500 title,
 * followed by the existing centered rule in a narrower column.
 */
export default function SectionHeader({
  title,
  icon,
  className,
  titleClassName,
  iconClassName,
  light = false,
}: SectionHeaderProps) {
  const sentinelRef = useRef<HTMLSpanElement>(null)
  const reserveRef = useRef<HTMLDivElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [compact, setCompact] = useState(false)

  useLayoutEffect(() => {
    const reserve = reserveRef.current
    const surface = surfaceRef.current
    const inner = innerRef.current
    if (!reserve || !surface || !inner) return

    const measure = () => {
      if (!reserve.classList.contains('is-compact')) {
        const styles = getComputedStyle(surface)
        const verticalPadding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom)
        const naturalHeight = Math.ceil(inner.getBoundingClientRect().height + verticalPadding)
        reserve.style.setProperty('--section-heading-expanded-height', `${naturalHeight}px`)
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    let frame = 0
    const update = () => {
      frame = 0
      const topInset = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-top')) || 0
      setCompact(sentinel.getBoundingClientRect().top <= topInset)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <span ref={sentinelRef} className="section-heading-sentinel" aria-hidden="true" />
      <div ref={reserveRef} className={cn('section-heading-reserve', compact && 'is-compact')}>
        <div ref={surfaceRef} className={cn('section-heading-surface', className)}>
          <div ref={innerRef} className="section-heading-inner">
            <p className="section-heading-icon">
              <i className={cn(icon, iconClassName)} aria-hidden="true" />
            </p>
            <h2 className={cn('section-heading-title', titleClassName)}>{title}</h2>
          </div>
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
