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
        // mobile: bottom bar, white bg, top shadow
        'bottom-0 left-0 right-0 flex flex-row h-16',
        'bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]',
        // desktop: left sidebar
        'md:bottom-auto md:top-0 md:right-auto md:left-0 md:h-screen md:w-[200px]',
        'md:flex-col md:justify-center md:border-t-0 md:border-r md:border-gray-100',
        'md:bg-white md:shadow-[2px_0_8px_rgba(0,0,0,0.04)]'
      )}
      aria-label="Main navigation"
    >
      {navSections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 px-1 text-center',
            'text-[10px] font-medium transition-colors',
            'md:flex-none md:w-full md:flex-col md:items-center md:justify-center',
            'md:gap-1.5 md:py-4 md:px-4 md:text-xs',
            activeId === section.id ? activeBg[section.color] : inactiveFg[section.color]
          )}
          aria-current={activeId === section.id ? 'page' : undefined}
        >
          <i className={cn(section.icon, 'text-xl md:text-2xl')} aria-hidden="true" />
          <span className="leading-tight">{section.label}</span>
        </a>
      ))}

      {/* Desktop only: Resume PDF link pinned to bottom */}
      <a
        href="/JacobMedley-Resume-D.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'hidden md:flex absolute bottom-4 left-0 right-0',
          'flex-col items-center gap-1 py-2 px-4',
          'text-[11px] text-prime-light hover:text-prime transition-colors'
        )}
      >
        <i className="fa-light fa-file-pdf text-base" aria-hidden="true" />
        <span>Resume PDF</span>
      </a>
    </nav>
  )
}
