import Image from 'next/image'
import { cn } from '@/lib/utils'
import { type Project } from '@/lib/data/projects'

interface WorkCardProps {
  project: Project
  reverse?: boolean
  onOpen?: (id: string) => void
}

export default function WorkCard({ project, reverse = false, onOpen }: WorkCardProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-24 gap-8 md:gap-12 items-center">
      <div
        className={cn(
          'md:col-span-14 relative aspect-[16/10] overflow-hidden rounded-lg bg-second-light/30',
          reverse ? 'md:order-2' : 'md:order-1',
        )}
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      <div
        className={cn(
          'md:col-span-10 flex flex-col gap-4',
          reverse ? 'md:order-1' : 'md:order-2',
        )}
      >
        {project.contributions.length > 0 && (
          <div className="flex flex-wrap gap-2 text-second">
            {project.contributions.map((c) => (
              <span key={c} className="badge-work">{c}</span>
            ))}
          </div>
        )}

        <h3
          className="font-bold leading-tight"
          style={{ fontSize: 'var(--text-h2)' }}
        >
          {project.title}
        </h3>

        <p className="text-base md:text-lg text-second-dark leading-relaxed">
          {project.summary}
        </p>

        <button
          type="button"
          onClick={() => onOpen?.(project.id)}
          className="self-start mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-md bg-second text-white font-semibold hover:bg-second-dark focus-visible:ring-2 focus-visible:ring-second focus-visible:ring-offset-2 outline-none transition-colors cursor-pointer"
        >
          View Case Study
          <i className="fa-regular fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
