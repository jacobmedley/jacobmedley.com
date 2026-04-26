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
    <div
      className={cn(
        'py-8 flex flex-col gap-8',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
        'md:items-start xl:items-center'
      )}
    >
      <div className="w-full md:w-1/2">
        {project.image && (
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="block w-full p-0 border-0 bg-transparent cursor-pointer"
            aria-label={`View ${project.title} case study`}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={500}
              className="w-full rounded-2xl shadow-xl"
              loading="lazy"
            />
          </button>
        )}
      </div>

      <div className="w-full md:w-1/2">
        <h4 className="text-3xl font-bold">{project.title}</h4>
        <p className="text-xl mt-1 opacity-70">{project.subtitle}</p>
        <hr className="my-4 border-current opacity-20" />
        <p className="font-bold text-lg mb-1">Summary:</p>
        <p className="leading-relaxed">{project.summary}</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-second text-white hover:bg-second-dark transition-colors cursor-pointer"
          >
            Case Study
          </button>
        </div>
        <hr className="mt-6 border-current opacity-20" />
      </div>
    </div>
  )
}
