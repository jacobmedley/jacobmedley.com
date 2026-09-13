'use client'

import { useEffect, useSyncExternalStore } from 'react'

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
  return false
}

export default function MotionControls() {
  useEffect(() => {
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
    onVisibilityChange()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => { observer?.disconnect(); mutations.disconnect(); document.removeEventListener('visibilitychange', onVisibilityChange); document.documentElement.classList.remove('motion-hidden') }
  }, [])

  return null
}
