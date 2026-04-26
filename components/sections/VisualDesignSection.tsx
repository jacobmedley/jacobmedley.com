'use client'

import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import CaseStudyModal from '@/components/ui/CaseStudyModal'
import { cn } from '@/lib/utils'

const visualProjects = projects.filter((p) => p.type === 'visual-design')

export default function VisualDesignSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  return (
    <div className="py-16 px-4 bg-pop-light/30">
      <div className="container mx-auto">
        <SectionHeader
          title="Visual Design"
          icon="fa-light fa-paintbrush-pencil"
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {visualProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProject(project.id)}
              className={cn(
                'relative overflow-hidden rounded-2xl shadow-xl aspect-video',
                'flex flex-col items-center justify-center text-white',
                'bg-fifth bg-cover bg-center cursor-pointer',
                `bg-[url(/images/work/${project.id}-bg.jpg)]`
              )}
            >
              <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
              <h6 className="relative z-10 text-3xl font-bold">{project.title}</h6>
              <span className="relative z-10 flex items-center gap-1 text-sm mt-2 opacity-80">
                <i className="fa-regular fa-eye" aria-hidden="true" /> View
              </span>
            </button>
          ))}
        </div>
      </div>

      <CaseStudyModal projectId={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}
