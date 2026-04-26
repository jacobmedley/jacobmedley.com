'use client'

import { navSections } from '@/lib/data/navigation'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

const sectionColor: Record<string, 'prime' | 'second' | 'third' | 'fourth' | 'fifth'> = {
  hi:               'prime',
  work:             'second',
  'visual-design':  'third',
  resume:           'fourth',
  education:        'fifth',
}

const colorMap = {
  prime:  { active: 'bg-prime text-white',   inactive: 'text-prime  hover:bg-prime/10',  ring: 'focus-visible:ring-prime'  },
  second: { active: 'bg-second text-white',  inactive: 'text-second hover:bg-second/10', ring: 'focus-visible:ring-second' },
  third:  { active: 'bg-third text-white',   inactive: 'text-third  hover:bg-third/10',  ring: 'focus-visible:ring-third'  },
  fourth: { active: 'bg-fourth text-white',  inactive: 'text-fourth hover:bg-fourth/10', ring: 'focus-visible:ring-fourth' },
  fifth:  { active: 'bg-fifth text-white',   inactive: 'text-fifth  hover:bg-fifth/10',  ring: 'focus-visible:ring-fifth'  },
} as const

const shortLabel: Record<string, string> = {
  hi:               'Hello',
  work:             'Work',
  'visual-design':  'Visual',
  resume:           'Resume',
  education:        'edu',
}

export default function NavMain() {
  const ids = navSections.map((s) => s.id)
  const activeId = useScrollSpy(ids)

  return (
    <nav
      id="the-menu"
      aria-label="Main navigation"
      className={cn(
        'fixed z-50 bg-white',
        // mobile: fixed bottom bar
        'bottom-0 left-0 right-0 flex flex-row h-16',
        'border-t border-second-light/40',
        'pb-[env(safe-area-inset-bottom)]',
        // desktop: fixed left sidebar
        'lg:top-0 lg:bottom-auto lg:right-auto lg:left-0',
        'lg:h-screen lg:w-[220px]',
        'lg:flex-col lg:justify-center lg:gap-2 lg:p-4',
        'lg:border-t-0 lg:border-r lg:border-second-light/40',
        'lg:shadow-[2px_0_8px_rgba(0,0,0,0.04)]',
      )}
    >
      {navSections.map((section) => {
        const color = sectionColor[section.id] ?? 'prime'
        const c = colorMap[color]
        const isActive = activeId === section.id

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'transition-colors outline-none',
              'focus-visible:ring-2 focus-visible:ring-inset lg:focus-visible:ring-offset-2 lg:focus-visible:ring-inset-0',
              c.ring,
              // mobile layout
              'flex flex-col items-center justify-center gap-0.5 w-1/5 py-2 px-1',
              'text-[11px] font-semibold text-center',
              // desktop layout
              'lg:flex-row lg:items-center lg:justify-start',
              'lg:w-full lg:gap-3 lg:px-4 lg:py-3 lg:rounded-md',
              'lg:text-sm lg:text-left',
              isActive ? c.active : c.inactive,
            )}
          >
            <i className={cn(section.icon, 'text-xl lg:text-base shrink-0')} aria-hidden="true" />
            <span className="lg:hidden leading-tight">{shortLabel[section.id] ?? section.label}</span>
            <span className="hidden lg:inline leading-tight">{section.label}</span>
          </a>
        )
      })}

      <a
        href="/JacobMedley-Resume-D.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'hidden lg:flex absolute bottom-4 left-0 right-0',
          'flex-col items-center gap-1 py-2 px-4',
          'text-[11px] text-prime-light hover:text-prime transition-colors',
        )}
      >
        <i className="fa-light fa-file-pdf text-base" aria-hidden="true" />
        <span>Resume PDF</span>
      </a>
    </nav>
  )
}
