'use client'

import { navSections } from '@/lib/data/navigation'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

const activeBg: Record<string, string> = {
  prime:  'bg-prime  text-white',
  second: 'bg-second text-white',
  pop:    'bg-pop    text-fifth',
  third:  'bg-third  text-white',
  fourth: 'bg-fourth text-white',
}

const inactiveFg: Record<string, string> = {
  prime:  'text-prime  hover:bg-prime/10',
  second: 'text-second hover:bg-second/10',
  pop:    'text-pop    hover:bg-pop/10',
  third:  'text-third  hover:bg-third/10',
  fourth: 'text-fourth hover:bg-fourth/10',
}

export default function NavMain() {
  const ids = navSections.map((s) => s.id)
  const activeId = useScrollSpy(ids)

  return (
    <nav
      id="the-menu"
      className={cn(
        'fixed z-50',
        // mobile: bottom bar
        'bottom-0 left-0 right-0 flex flex-row h-16',
        // desktop: left sidebar
        'md:bottom-auto md:top-0 md:right-auto md:left-0 md:h-screen md:w-28 md:flex-col'
      )}
      aria-label="Main navigation"
    >
      {navSections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            'flex flex-1 flex-col items-center justify-center gap-0.5 p-2 text-center text-[11px] font-medium transition-colors',
            'md:flex-none md:w-full md:py-5 md:gap-1.5 md:text-xs',
            activeId === section.id ? activeBg[section.color] : inactiveFg[section.color]
          )}
          aria-current={activeId === section.id ? 'page' : undefined}
        >
          <i className={cn(section.icon, 'text-lg md:text-2xl')} aria-hidden="true" />
          <span className="leading-tight">{section.label}</span>
        </a>
      ))}
    </nav>
  )
}
