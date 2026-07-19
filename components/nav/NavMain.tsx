'use client'

import { navSections } from '@/lib/data/navigation'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

/**
 * Legacy #the-menu button color classes are keyed by section in
 * globals.css (.hi/.work/.results/.resume/.education — visual-design
 * kept its legacy "results" class name).
 */
const buttonClass: Record<string, string> = {
  hi: 'hi',
  work: 'work',
  'visual-design': 'results',
  resume: 'resume',
  education: 'education',
}

export default function NavMain() {
  const ids = navSections.map((s) => s.id)
  const activeId = useScrollSpy(ids)

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
