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
