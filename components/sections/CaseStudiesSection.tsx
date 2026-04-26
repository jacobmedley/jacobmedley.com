'use client'

import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import WorkCard from '@/components/ui/WorkCard'
import CaseStudyModal from '@/components/ui/CaseStudyModal'

const caseStudies = projects.filter((p) => p.type === 'case-study')
const designModules = projects.filter((p) => p.type === 'design-module')

export default function CaseStudiesSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <SectionHeader
          title="Case Studies"
          icon="fa-light fa-briefcase"
          className="text-second-dark mb-12"
        />

        {caseStudies.map((project, i) => (
          <WorkCard
            key={project.id}
            project={project}
            onOpen={setActiveProject}
            reverse={i % 2 !== 0}
          />
        ))}

        <div className="my-16 text-center">
          <hr className="border-current opacity-20 mb-10" />
          <p className="text-5xl mb-4" aria-hidden="true">
            <i className="fa-thin fa-toolbox" />
          </p>
          <p className="text-4xl mb-4">Full-Stack Designer</p>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Here are some examples showcasing the diverse skill sets and methods I&rsquo;ve used
            to create better user experiences and business outcomes.
          </p>
          <hr className="border-current opacity-20 mt-10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {designModules.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => setActiveProject(module.id)}
              className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-second/30 hover:border-second hover:bg-second/5 transition-all text-center cursor-pointer"
            >
              <i
                className={`${module.icon ?? 'fa-light fa-star'} text-4xl text-second`}
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">{module.title}</span>
              <span className="text-sm text-second flex items-center gap-1">
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
