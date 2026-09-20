'use client'

import { useEffect, type RefObject } from 'react'

/** Adjust existing CSS animation clocks without restarting their phase.
 * Only interaction/scroll settling needs JS frames; idle stays in CSS.
 * Disclosure animations deliberately remain outside this decorative controller.
 */
export function useAtmosphericMotion(rootRef: RefObject<HTMLElement | null>, paused: boolean, revision: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cards = [...root.querySelectorAll<HTMLElement>('[data-atmosphere]')].map(element => ({
      element, visible: false, pointer: window.matchMedia('(hover: hover)').matches && element.matches(':hover'),
      focus: element.matches(':focus-within'), entered: performance.now(),
      rate: 1, shine: 0, animations: [] as Animation[],
    }))
    let frame = 0
    let lastFrame = 0
    let scrollY = window.scrollY
    let scrollTime = performance.now()
    let velocity = 0
    const blocked = () => paused || reduced.matches || document.hidden
    const collect = () => cards.forEach(card => {
      card.animations = card.element.getAnimations({ subtree: true }).filter(animation => animation instanceof CSSAnimation)
    })
    const sync = () => {
      collect()
      cards.forEach(card => card.animations.forEach(animation => {
        if (blocked() || !card.visible) animation.pause()
        else animation.play()
      }))
    }
    const tick = (now: number) => {
      frame = 0
      const dt = Math.min(now - (lastFrame || now - 16), 48)
      lastFrame = now
      if (blocked()) return
      velocity *= Math.exp(-dt / 180)
      let settling = Math.abs(velocity) > .005
      for (const card of cards) {
        if (!card.visible) continue
        const held = card.pointer || card.focus
        const elapsed = now - card.entered
        // A pronounced launch, then a fast brake into sustained bullet time.
        const target = held ? elapsed < 180 ? 7 : .12 : 1
        card.rate += (target - card.rate) * (1 - Math.exp(-dt / (held ? elapsed < 180 ? 45 : 32 : 300)))
        const targetShine = Math.min(1, Math.abs(velocity) * .65 + (held ? .38 : 0))
        card.shine += (targetShine - card.shine) * (1 - Math.exp(-dt / 100))
        card.animations.forEach(animation => animation.playbackRate = card.rate)
        card.element.style.setProperty('--atmosphere-shine', card.shine.toFixed(3))
        card.element.style.setProperty('--atmosphere-shift', `${(velocity * 8 + (held ? 18 : 0)).toFixed(2)}%`)
        settling ||= (held && elapsed < 600) || Math.abs(card.rate - target) > .002 || Math.abs(card.shine - targetShine) > .002
      }
      if (settling) frame = requestAnimationFrame(tick)
    }
    const wake = () => {
      if (!frame && !blocked()) { lastFrame = 0; frame = requestAnimationFrame(tick) }
    }
    const cleanup = cards.map(card => {
      const engage = (kind: 'pointer' | 'focus', active: boolean) => {
        const wasHeld = card.pointer || card.focus
        card[kind] = active
        if (!wasHeld && (card.pointer || card.focus)) card.entered = performance.now()
        wake()
      }
      const enter = (event: PointerEvent) => { if (event.pointerType !== 'touch') engage('pointer', true) }
      const leave = () => engage('pointer', false)
      const down = (event: PointerEvent) => { if (event.pointerType === 'touch') engage('pointer', true) }
      const up = (event: PointerEvent) => { if (event.pointerType === 'touch') engage('pointer', false) }
      const focus = () => engage('focus', true)
      const blur = (event: FocusEvent) => { if (!card.element.contains(event.relatedTarget as Node)) engage('focus', false) }
      card.element.addEventListener('pointerenter', enter)
      card.element.addEventListener('pointerleave', leave)
      card.element.addEventListener('pointerdown', down)
      card.element.addEventListener('pointerup', up)
      card.element.addEventListener('pointercancel', leave)
      card.element.addEventListener('focusin', focus)
      card.element.addEventListener('focusout', blur)
      return () => {
        card.element.removeEventListener('pointerenter', enter)
        card.element.removeEventListener('pointerleave', leave)
        card.element.removeEventListener('pointerdown', down)
        card.element.removeEventListener('pointerup', up)
        card.element.removeEventListener('pointercancel', leave)
        card.element.removeEventListener('focusin', focus)
        card.element.removeEventListener('focusout', blur)
      }
    })
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const card = cards.find(item => item.element === entry.target)
        if (card) card.visible = entry.isIntersecting
      })
      sync()
      wake()
    }, { threshold: .01 })
    cards.forEach(card => observer.observe(card.element))
    const onScroll = () => {
      const now = performance.now()
      velocity = Math.max(-1.5, Math.min(1.5, (window.scrollY - scrollY) / Math.min(80, Math.max(16, now - scrollTime))))
      scrollY = window.scrollY
      scrollTime = now
      wake()
    }
    const onPreference = () => {
      sync()
      if (reduced.matches) cards.forEach(card => {
        card.element.style.removeProperty('--atmosphere-shine')
        card.element.style.removeProperty('--atmosphere-shift')
      })
      wake()
    }
    // A preference change recreates CSS animations; collect after styles update.
    reduced.addEventListener('change', onPreference)
    document.addEventListener('visibilitychange', onPreference)
    window.addEventListener('scroll', onScroll, { passive: true })
    sync()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      cleanup.forEach(remove => remove())
      reduced.removeEventListener('change', onPreference)
      document.removeEventListener('visibilitychange', onPreference)
      window.removeEventListener('scroll', onScroll)
    }
  }, [rootRef, paused, revision])
}
