'use client'

import { useState } from 'react'
import Image from 'next/image'
import { projects } from '@/lib/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import CaseStudyModal from '@/components/ui/CaseStudyModal'

const visualProjects = projects.filter((p) => p.type === 'visual-design')

export default function VisualDesignSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = activeId ? projects.find((p) => p.id === activeId) ?? null : null

  return (
    <div className="py-24 px-6 md:px-10">
      <div className="max-w-[var(--container-max)] mx-auto">
        <SectionHeader
          sectionId="visual-design"
          title="Visual Design"
          icon="fa-light fa-paintbrush-pencil"
        />

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {visualProjects.map((project) => {
            const src = project.thumbnail ?? project.image
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  className="group relative block w-full overflow-hidden rounded-lg aspect-[4/3] bg-second-light/30 focus-visible:ring-2 focus-visible:ring-third focus-visible:ring-offset-2 outline-none cursor-pointer"
                >
                  {src && (
                    <Image
                      src={src}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-0 flex items-end p-4 bg-prime/0 group-hover:bg-prime/80 transition-colors duration-200 text-white font-semibold opacity-0 group-hover:opacity-100 z-10">
                    {project.title}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <CaseStudyModal
        project={activeProject}
        open={!!activeId}
        onOpenChange={(open) => { if (!open) setActiveId(null) }}
      />
    </div>
  )
}
