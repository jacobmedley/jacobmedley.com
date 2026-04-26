'use client'

import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import CaseStudyModal from '@/components/ui/CaseStudyModal'

const visualProjects = projects.filter((p) => p.type === 'visual-design')

export default function VisualDesignSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  return (
    <div className="py-24 px-4">
      <div className="container mx-auto">
        <SectionHeader
          title="Visual Design"
          icon="fa-light fa-paintbrush-pencil"
          className="text-pop"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {visualProjects.map((project) => {
            const bg = project.thumbnail ?? project.image
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProject(project.id)}
                className="group relative overflow-hidden rounded-2xl h-64 flex flex-col justify-end text-left cursor-pointer bg-fifth bg-cover bg-center"
                style={bg ? { backgroundImage: `url(${bg})` } : undefined}
              >
                {/* Dark base overlay — lightens on hover */}
                <div
                  className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-20"
                  aria-hidden="true"
                />
                {/* Gold accent overlay — fades in on hover */}
                <div
                  className="absolute inset-0 bg-pop/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="relative z-10 p-5">
                  <h6 className="text-xl font-bold text-white">{project.title}</h6>
                  <p className="text-sm text-white/70 mt-1">{project.subtitle}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <CaseStudyModal projectId={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}
