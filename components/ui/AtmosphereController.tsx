'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMotionPaused } from './MotionControls'
import { useAtmosphericMotion } from './useAtmosphericMotion'

/** One page controller; refresh only when card membership changes. */
export default function AtmosphereController() {
  const root = useRef<HTMLElement | null>(null)
  const [revision, setRevision] = useState(0)
  const pathname = usePathname()
  const paused = useMotionPaused()

  useEffect(() => {
    root.current = document.body
    const hasCard = (node: Node) => node instanceof Element &&
      (node.matches('[data-atmosphere]') || !!node.querySelector('[data-atmosphere]'))
    const observer = new MutationObserver(records => {
      if (records.some(record => [...record.addedNodes, ...record.removedNodes].some(hasCard))) {
        setRevision(value => value + 1)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  useAtmosphericMotion(root, paused, `${pathname}:${revision}`)
  return null
}
