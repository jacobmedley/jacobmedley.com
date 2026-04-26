import { cn } from '@/lib/utils'

const sectionStyles = {
  hi:               { color: 'text-prime',  bg: 'bg-prime'  },
  work:             { color: 'text-second', bg: 'bg-second' },
  'visual-design':  { color: 'text-third',  bg: 'bg-third'  },
  resume:           { color: 'text-fourth', bg: 'bg-fourth' },
  education:        { color: 'text-fifth',  bg: 'bg-fifth'  },
} as const

interface SectionHeaderProps {
  sectionId: keyof typeof sectionStyles
  title: string
  icon?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ sectionId, title, icon, align = 'left' }: SectionHeaderProps) {
  const s = sectionStyles[sectionId]
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <header className={cn('flex flex-col gap-4', alignment)}>
      {icon ? (
        <i className={cn(icon, 'text-4xl md:text-5xl', s.color)} aria-hidden="true" />
      ) : null}
      <h2
        className="font-bold leading-tight"
        style={{ fontSize: 'var(--text-h2)' }}
      >
        {title}
      </h2>
      <hr className={cn('border-0 h-1 w-16 rounded-full', s.bg)} />
    </header>
  )
}
