import Image from 'next/image'
import { cn } from '@/lib/utils'
import { type Project } from '@/lib/data/projects'

interface WorkCardProps {
  project: Project
  onOpen: (id: string) => void
  reverse?: boolean
}

export default function WorkCard({ project, onOpen, reverse = false }: WorkCardProps) {
  return (
    <div className="mb-4 pb-12">
      <div
        className={cn(
          'flex flex-col gap-8',
          reverse ? 'md:flex-row-reverse' : 'md:flex-row',
          'md:items-center'
        )}
      >
        <div className="w-full md:w-1/2">
          {project.image && (
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              className="group block w-full p-0 border-0 bg-transparent cursor-pointer"
              aria-label={`View ${project.title} case study`}
            >
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </button>
          )}
        </div>

        <div className="w-full md:w-1/2 md:px-8">
          <h4 className="text-[2rem] font-bold leading-tight mb-1">{project.title}</h4>
          <p className="text-lg opacity-60 mb-4">{project.subtitle}</p>
          <p className="leading-relaxed text-gray-600 mb-6">{project.summary}</p>

          {project.contributions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.contributions.map((c) => (
                <span key={c} className="badge-work">{c}</span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-second text-white hover:bg-second-dark transition-colors cursor-pointer"
          >
            View Case Study
            <i className="fa-regular fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <hr className="mt-12 border-gray-100" />
    </div>
  )
}
