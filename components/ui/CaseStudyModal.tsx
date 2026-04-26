'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { projects, type Project } from '@/lib/data/projects'

interface CaseStudyModalProps {
  projectId: string | null
  onClose: () => void
}

const typeLabels: Record<string, string> = {
  'case-study':    'Case Study',
  'design-module': 'Design Module',
  'visual-design': 'Visual Design',
}

export default function CaseStudyModal({ projectId, onClose }: CaseStudyModalProps) {
  const project = projectId ? projects.find((p) => p.id === projectId) ?? null : null

  return (
    <Dialog.Root open={!!project} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content
          className={cn(
            'modal-panel',
            'fixed top-0 right-0 z-50',
            'h-screen w-full max-w-2xl',
            'bg-white overflow-y-auto',
            'shadow-2xl focus:outline-none'
          )}
        >
          <Dialog.Close
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-prime hover:text-white transition-colors cursor-pointer"
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
            loading="lazy"
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
        <Dialog.Description className="text-lg text-second mb-8">
          {project.subtitle}
        </Dialog.Description>

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
            <div className="flex flex-wrap gap-2">
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
