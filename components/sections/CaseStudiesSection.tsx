'use client'

import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import WorkCard from '@/components/ui/WorkCard'
import CaseStudyModal from '@/components/ui/CaseStudyModal'
import WaveSeparator from '@/components/ui/WaveSeparator'

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order

const caseStudies = projects
  .filter((p) => p.visible && p.section === 'work' && p.display === 'feature')
  .sort(byOrder)
const designModules = projects
  .filter((p) => p.visible && p.section === 'work' && p.display === 'thumb')
  .sort(byOrder)

// Legacy renders the design-thinking thumbs as rows of three.
const moduleRows: (typeof designModules)[] = []
for (let i = 0; i < designModules.length; i += 3) {
  moduleRows.push(designModules.slice(i, i + 3))
}

export default function CaseStudiesSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = activeId ? projects.find((p) => p.id === activeId) ?? null : null

  return (
    <section className="my-work">
      <WaveSeparator position="top" waveId="wave-work" />

      <div className="content">
        <div className="container">
          <SectionHeader
            title="Case Studies"
            icon="fa-light fa-briefcase"
            className="text-second-dark"
            titleClassName="mb-0"
          />

          {caseStudies.map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              reverse={i % 2 === 1}
              closingHrSpacer={i % 2 === 0 && i !== caseStudies.length - 1}
              onOpen={setActiveId}
            />
          ))}

          {/* Full-Stack Designer interstitial + design-thinking thumbs
              (legacy nests these rows inside one outer centered row) */}
          <div className="row justify-center">
            <div className="row justify-center">
              <div className="col-24 py-2 lg:py-4 2xl:py-6">
                <hr className="solid-center" />
              </div>
              <div className="col-24 col-lg-16 text-center">
                <p className="display-4">
                  <i className="fa-thin fa-toolbox" aria-hidden="true" />
                </p>
                <p className="display-3">Full-Stack Designer</p>
                <p className="display-1">
                  Here are some examples showcasing the diverse skill sets and methods I&rsquo;ve
                  used to create better user experiences and business outcomes.
                </p>
              </div>
              <div className="col-24 py-2 lg:py-4 2xl:py-6">
                <hr className="solid-center" />
              </div>
            </div>

            {moduleRows.map((row, rowIndex) => (
              <div key={rowIndex} className={cnRow(rowIndex)}>
                {row.map((module) => (
                  <div key={module.id} className="col-24 col-sm-8 col-xxl-6 thinking-item">
                    <button
                      type="button"
                      className="btn thinking-thumb"
                      onClick={() => setActiveId(module.id)}
                    >
                      <i className={`${module.icon ?? 'fa-light fa-star'} thinking-icon`} aria-hidden="true" />
                      <h6 className="thinking-title">{module.title}</h6>
                      <div className="thinking-view">
                        <i className="fa-regular fa-eye" aria-hidden="true" /> View
                      </div>
                    </button>
                  </div>
                ))}
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

function cnRow(rowIndex: number) {
  return rowIndex === 0
    ? 'row items-center mt-4 justify-center thinking-row'
    : 'row items-center mt-0 sm:mt-4 justify-center thinking-row'
}
