'use client'

import { useEffect, useSyncExternalStore } from 'react'

let paused = false
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }
const getSnapshot = () => paused
const getServerSnapshot = () => false
const subscribeReduced = (listener: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', listener)
  return () => query.removeEventListener('change', listener)
}
const getReducedSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduced, getReducedSnapshot, getServerSnapshot)
}

export function useMotionPaused() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function MotionToggle({ className = '' }: { className?: string }) {
  const isPaused = useMotionPaused()
  const reduced = useReducedMotion()
  if (reduced) return <span className={`motion-control motion-status ${className}`}>Motion off: reduced motion</span>
  return <button type="button" className={`motion-control ${className}`} onClick={() => {
    paused = !paused
    document.documentElement.classList.toggle('motion-paused', paused)
    listeners.forEach(listener => listener())
  }}><span aria-hidden="true">{isPaused ? '▶' : 'Ⅱ'}</span>{isPaused ? 'Resume motion' : 'Pause motion'}</button>
}

export default function MotionControls() {
  useEffect(() => {
    document.documentElement.classList.toggle('motion-paused', paused)
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('motion-offscreen', !entry.isIntersecting)), { threshold: 0.01 })
      : null
    const observeRoots = (scope: ParentNode) => scope.querySelectorAll<HTMLElement>('[data-motion-root]').forEach((root) => observer?.observe(root))
    observeRoots(document)
    const mutations = new MutationObserver((records) => records.forEach((record) => {
      record.removedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return
        if (node.matches('[data-motion-root]')) observer?.unobserve(node)
        node.querySelectorAll('[data-motion-root]').forEach(root => observer?.unobserve(root))
      })
      record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.matches('[data-motion-root]')) observer?.observe(node)
        if (node instanceof HTMLElement) observeRoots(node)
      })
    }))
    mutations.observe(document.body, { childList: true, subtree: true })
    const onVisibilityChange = () => document.documentElement.classList.toggle('motion-hidden', document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => { observer?.disconnect(); mutations.disconnect(); document.removeEventListener('visibilitychange', onVisibilityChange); document.documentElement.classList.remove('motion-paused', 'motion-hidden') }
  }, [])

  return <MotionToggle />
}
