'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { projects, type Project } from '@/lib/data/projects'

interface CaseStudyModalProps {
  projectId: string | null
  onClose: () => void
}

export default function CaseStudyModal({ projectId, onClose }: CaseStudyModalProps) {
  const project = projectId ? projects.find((p) => p.id === projectId) ?? null : null

  return (
    <Dialog.Root open={!!project} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'w-[calc(100vw-2rem)] max-w-4xl max-h-[90vh] overflow-y-auto',
            'bg-white rounded-2xl shadow-2xl p-6 md:p-10',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
          )}
        >
          {project && <ModalContent project={project} />}
          <Dialog.Close
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <i className="fa-light fa-xmark text-xl" aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ModalContent({ project }: { project: Project }) {
  return (
    <div>
      <Dialog.Title className="text-3xl font-bold mb-1 pr-8">{project.title}</Dialog.Title>
      <Dialog.Description className="text-xl text-second mb-6">
        {project.subtitle}
      </Dialog.Description>

      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={900}
          height={560}
          className="w-full rounded-xl shadow-lg mb-8"
          loading="lazy"
        />
      )}

      {project.contributions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Contributions
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.contributions.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full text-sm bg-prime/10 text-prime font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.technologies.length > 0 && (
        <div className="mb-8">
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

      {project.problem && (
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-3 text-prime">The Problem</h4>
          <p className="leading-relaxed">{project.problem}</p>
        </div>
      )}

      {project.solution && (
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-3 text-prime">The Solution</h4>
          <p className="leading-relaxed">{project.solution}</p>
        </div>
      )}

      {project.results && project.results.length > 0 && (
        <div>
          <h4 className="text-xl font-bold mb-3 text-prime">Results</h4>
          <ul className="space-y-2">
            {project.results.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <i
                  className="fa-regular fa-angle-right mt-1 text-prime shrink-0"
                  aria-hidden="true"
                />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
