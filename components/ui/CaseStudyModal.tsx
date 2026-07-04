'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { type Project } from '@/lib/data/projects'

interface CaseStudyModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const typeLabels: Record<string, string> = {
  'case-study':    'Case Study',
  'design-module': 'Design Module',
  'visual-design': 'Visual Design',
}

export default function CaseStudyModal({ project, open, onOpenChange }: CaseStudyModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-[fadeIn_200ms_ease-out] data-[state=closed]:animate-[fadeOut_200ms_ease-in]"
        />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed right-0 top-0 z-50 h-screen w-full md:w-[min(640px,90vw)] bg-white shadow-2xl outline-none overflow-y-auto data-[state=open]:animate-[slideInRight_300ms_ease-out] data-[state=closed]:animate-[slideOutRight_250ms_ease-in]"
        >
          <Dialog.Close
            className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-second-light/40 focus-visible:ring-2 focus-visible:ring-prime outline-none cursor-pointer"
            aria-label="Close"
          >
            <i className="fa-light fa-xmark text-xl" aria-hidden="true" />
          </Dialog.Close>

          {project && <ModalContent project={project} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ModalContent({ project }: { project: Project }) {
  return (
    <div>
      {project.image && (
        <div className="relative w-full h-[280px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
        </div>
      )}

      <div className="p-8 pb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-prime-light mb-3">
          {typeLabels[project.type]}
        </span>
        <Dialog.Title className="text-3xl font-bold mb-1 pr-8">
          {project.title}
        </Dialog.Title>
        <p className="text-lg text-second mb-8">{project.subtitle}</p>

        <div className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Summary
          </h4>
          <p className="leading-relaxed">{project.summary}</p>
        </div>

        {project.problem && (
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              The Problem
            </h4>
            <p className="leading-relaxed">{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              The Solution
            </h4>
            <p className="leading-relaxed">{project.solution}</p>
          </div>
        )}

        {project.results && project.results.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Results
            </h4>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <i className="fa-regular fa-check mt-1 text-prime shrink-0" aria-hidden="true" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.contributions.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Contributions
            </h4>
            <div className="flex flex-wrap gap-2 text-second">
              {project.contributions.map((c) => (
                <span key={c} className="badge-work">{c}</span>
              ))}
            </div>
          </div>
        )}

        {project.technologies.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Technology
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-sm bg-second/10 text-second font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
