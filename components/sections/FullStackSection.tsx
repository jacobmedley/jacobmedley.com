'use client'

import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/ui/SectionHeader'
import CaseStudyModal from '@/components/ui/CaseStudyModal'
import WaveSeparator from '@/components/ui/WaveSeparator'

const fullStackProjects = projects
  .filter((p) => p.visible && p.section === 'work' && p.display === 'thumb')
  .sort((a, b) => a.order - b.order)

/**
 * Full-Stack Designer: carries the old Visual Design section's pop-light
 * gradient treatment (was section-visual-design.html). Tiles are a mix of
 * image thumbs (Reveal / Viva / Wrong) and icon thumbs (the rest) — icon
 * tiles reuse the design-thinking icon markup that used to live inline in
 * CaseStudiesSection's interstitial, on .thinking-thumb's default white
 * background so both variants share the same dimensions and hover
 * treatment; only image tiles get the dark screen overlay + white text.
 */
export default function FullStackSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = activeId ? projects.find((p) => p.id === activeId) ?? null : null

  return (
    <section className="show-me-the-money bg-pop-light bg-gradient-bs">
      <WaveSeparator position="top" waveId="wave-vd" />

      <div className="content">
        <div className="container">
          <SectionHeader title="Full-Stack Designer" icon="fa-thin fa-toolbox" />

          <div className="row justify-center">
            <div className="col-24 col-lg-16 text-center">
              <p className="display-1">
                Here are some examples showcasing the diverse skill sets and methods I&rsquo;ve
                used to create better user experiences and business outcomes.
              </p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 items-center mt-0 sm:mt-4 justify-center thinking-row">
            {fullStackProjects.map((project) => (
              <div key={project.id} className="col thinking-item">
                <button
                  type="button"
                  className="btn thinking-thumb relative overflow-hidden shadow-[var(--shadow-bs-lg)]"
                  onClick={() => setActiveId(project.id)}
                  data-modal-trigger={project.id}
                >
                  <div
                    className={cn('thinking-media', project.thumb ? 'thinking-media-image' : 'thinking-media-icon')}
                    style={project.thumb ? { backgroundImage: `url(${project.thumb.src})` } : undefined}
                    aria-hidden="true"
                  >
                    {!project.thumb && <i className={`${project.icon ?? 'fa-thin fa-star'} thinking-icon`} />}
                  </div>
                  <div className="thinking-panel">
                    <h6 className="thinking-title">{project.title}</h6>
                    <span className="thinking-view action-label">
                      View <i className="fa-thin fa-arrow-right" aria-hidden="true" />
                    </span>
                  </div>
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
