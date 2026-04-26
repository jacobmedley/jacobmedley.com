import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  icon: string
  className?: string
}

export default function SectionHeader({ title, icon, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-center', className)}>
      <p className="text-5xl" aria-hidden="true">
        <i className={icon} />
      </p>
      <h3 className="-mt-4 text-5xl font-bold">{title}</h3>
      <div className="mx-auto mt-6 w-1/4">
        <hr className="border-current opacity-30" />
      </div>
    </div>
  )
}
