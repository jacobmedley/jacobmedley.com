'use client'

import Link from 'next/link'

import { Fragment, useState } from 'react'
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
            icon="fa-thin fa-briefcase"
            className="text-second-dark"
            titleClassName="mb-0"
          />

          <div className="work-introduction">
            <p>Five projects across product, brand, and design systems. Open a project for the work, or read the longer stories behind the decisions.</p>
            <Link href="/case-studies/" className="prism-text-link">Explore the full case studies <i className="fa-thin fa-arrow-right" aria-hidden="true" /></Link>
          </div>

          <div className="featured-work-grid">
            {caseStudies.map((project, i) => (
              <Fragment key={project.id}>
                <WorkCard
                  project={project}
                  onOpen={setActiveId}
                />
                {i < caseStudies.length - 1 && <hr className="solid-center work-separator" />}
              </Fragment>
            ))}
          </div>
          <p className="work-more-stories"><Link href="/case-studies/" className="prism-text-link">More stories behind the work <i className="fa-thin fa-arrow-right" aria-hidden="true" /></Link></p>
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
