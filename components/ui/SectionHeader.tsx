import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  icon: string
  className?: string
}

export default function SectionHeader({ title, icon, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      <p className="text-[2rem] mb-2" aria-hidden="true">
        <i className={icon} />
      </p>
      <h3 className="text-[1.75rem] font-bold leading-tight">{title}</h3>
      <div className="mt-3 w-12">
        <hr className="border-2 border-current opacity-60" />
      </div>
    </div>
  )
}
