'use client'

import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    let frame = 0

    const compute = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      const doc = document.documentElement

      // At the bottom of the page the last section can never cross the
      // line, so pin it explicitly.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActiveId(sectionIds[sectionIds.length - 1] ?? '')
        return
      }

      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sectionIds])

  return activeId
}
