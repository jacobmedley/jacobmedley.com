'use client'

import { useEffect, useState } from 'react'

export default function MotionControls() {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('motion-paused', paused)
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('motion-offscreen', !entry.isIntersecting)), { threshold: 0.01 })
      : null
    const observeRoots = (scope: ParentNode) => scope.querySelectorAll<HTMLElement>('[data-motion-root]').forEach((root) => observer?.observe(root))
    observeRoots(document)
    const mutations = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement && node.matches('[data-motion-root]')) observer?.observe(node)
      if (node instanceof HTMLElement) observeRoots(node)
    })))
    mutations.observe(document.body, { childList: true, subtree: true })
    const onVisibilityChange = () => document.documentElement.classList.toggle('motion-hidden', document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => { observer?.disconnect(); mutations.disconnect(); document.removeEventListener('visibilitychange', onVisibilityChange); document.documentElement.classList.remove('motion-paused', 'motion-hidden') }
  }, [paused])

  return <button type="button" className="motion-control" aria-pressed={paused} onClick={() => setPaused((current) => !current)}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>{paused ? 'Resume motion' : 'Pause motion'}</button>
}
