'use client'

import { useState, useEffect } from 'react'

export function useScrollSpy(
  sectionIds: string[],
  options?: IntersectionObserverInit
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-10% 0px -60% 0px',
        ...options,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, options])

  return activeId
}
