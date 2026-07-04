'use client'

import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import CaseStudyModal from '@/components/ui/CaseStudyModal'
import WaveSeparator from '@/components/ui/WaveSeparator'

const visualProjects = projects.filter((p) => p.type === 'visual-design')

/**
 * Legacy section-visual-design.html: pop-light gradient section with
 * image-variant thinking-thumbs (btn-reveal / btn-viva / btn-wrong
 * backgrounds defined in globals.css).
 */
export default function VisualDesignSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = activeId ? projects.find((p) => p.id === activeId) ?? null : null

  return (
    <section className="show-me-the-money bg-pop-light bg-gradient-bs">
      <WaveSeparator position="top" waveId="wave-vd" />

      <div className="content">
        <div className="container">
          <SectionHeader title="Visual Design" icon="fa-light fa-fw fa-paintbrush-pencil" />

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 items-center mt-0 sm:mt-4 justify-center thinking-row">
            {visualProjects.map((project) => (
              <div key={project.id} className="col thinking-item">
                <button
                  type="button"
                  className={`btn thinking-thumb btn-${project.id} text-white relative overflow-hidden shadow-[var(--shadow-bs-lg)]`}
                  onClick={() => setActiveId(project.id)}
                >
                  <h6 className="thinking-title font-bold fs-1 z-2 relative">
                    {project.id.charAt(0).toUpperCase() + project.id.slice(1)}
                  </h6>
                  <div className="thinking-view z-2 relative">
                    <i className="fa-regular fa-eye" aria-hidden="true" /> View
                  </div>
                  <div className="screen absolute top-0 left-0 h-full w-full bg-black opacity-50 z-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CaseStudyModal
        project={activeProject}
        open={!!activeId}
        onOpenChange={(open) => {
          if (!open) setActiveId(null)
        }}
      />
    </section>
  )
}
