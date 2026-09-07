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

const cardKickers: Record<string, string> = {
  'split-test': 'Experimentation',
  'call-center-ux': 'Service Experience',
  'marketing-auto': 'Personalization',
  workshops: 'Facilitation',
  roadmap: 'Planning',
  personas: 'Research Synthesis',
  reveal: 'Reveal Campaign',
  viva: 'Viva Brand',
  wrong: 'Wrong Campaign',
}

const cardTitles: Record<string, string> = {
  reveal: 'The Choice Is Clear',
  viva: 'Viva Medicare',
  wrong: 'Modular Experience for Growth',
}

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
          <SectionHeader title="Selected Work" icon="fa-thin fa-toolbox" />

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
                  className={cn(
                    'btn thinking-thumb relative overflow-hidden shadow-[var(--shadow-bs-lg)]',
                    project.thumb ? 'thinking-thumb-photo' : 'thinking-thumb-icon',
                    `thinking-art-${project.id}`,
                  )}
                  onClick={() => setActiveId(project.id)}
                  data-modal-trigger={project.id}
                >
                  <div className="thinking-badges" aria-label="Disciplines">
                    {project.disciplines.map((discipline) => discipline ? <span key={discipline}>{discipline}</span> : null)}
                  </div>
                  <div className={cn('thinking-media', project.thumb ? 'thinking-media-image' : 'thinking-media-icon')} aria-hidden="true">
                    {project.thumb ? (
                      <span className="thinking-photo-image" style={{ backgroundImage: `url(${project.thumb.src})` }} />
                    ) : (
                      <>
                        <span className="thinking-geometry">
                          {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
                        </span>
                        <span className="thinking-icon-anchor">
                          <i className={`${project.id === 'workshops' ? 'fa-thin fa-lightbulb' : project.icon ?? 'fa-thin fa-star'} thinking-icon`} />
                        </span>
                      </>
                    )}
                  </div>
                  <div className="thinking-panel">
                    <div className="thinking-copy">
                      <span className="thinking-eyebrow">{cardKickers[project.id] ?? 'Selected work'}</span>
                      <h6 className="thinking-title">{cardTitles[project.id] ?? project.title}</h6>
                    </div>
                    <i className="fa-thin fa-arrow-right thinking-arrow" aria-hidden="true" />
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
