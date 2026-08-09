'use client'

import { navSections } from '@/lib/data/navigation'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

/**
 * Legacy #the-menu button color classes are keyed by section in
 * globals.css (.hi/.work/.results/.resume/.education — full-stack
 * (formerly visual-design) kept its legacy "results" class name).
 */
const buttonClass: Record<string, string> = {
  hi: 'hi',
  work: 'work',
  'full-stack': 'results',
  resume: 'resume',
  education: 'education',
}

// Stable reference — useScrollSpy re-runs its effect whenever this array
// identity changes, so it can't be recreated inline on every render.
const NAV_IDS = navSections.map((s) => s.id)

export default function NavMain() {
  const activeId = useScrollSpy(NAV_IDS)

  return (
    <nav
      id="the-menu"
      aria-label="Main"
      className="the-menu flex content-center flex-wrap shadow-[var(--shadow-bs-lg)] text-center"
    >
      {navSections.map((section) => {
        const isActive = activeId === section.id

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'btn nav-link',
              buttonClass[section.id],
              isActive && 'active',
              section.id === 'hi' && 'hidden sm:block',
            )}
          >
            <i className={section.icon} aria-hidden="true" role="img" />
            <div className="capitalize">{section.id === 'education' ? 'edu' : section.label}</div>
          </a>
        )
      })}
    </nav>
  )
}
