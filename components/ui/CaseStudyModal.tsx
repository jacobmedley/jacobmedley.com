'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { type Project } from '@/lib/data/projects'

interface CaseStudyModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Legacy Bootstrap modal chrome (components/modal-*.html): fullscreen
 * dialog with container-width content, blur behind the modal viewport,
 * fade + translateY(-50px) entrance, circular header close button and
 * a centered footer Close button. Styles in globals.css (.modal…).
 */
export default function CaseStudyModal({ project, open, onOpenChange }: CaseStudyModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-backdrop" />
        <Dialog.Content
          aria-describedby={undefined}
          className="modal"
          onClick={(e) => {
            // Bootstrap closes when the area outside .modal-dialog's content is clicked
            if (!(e.target as HTMLElement).closest('.modal-content')) onOpenChange(false)
          }}
        >
          <div className="modal-dialog modal-fullscreen md:py-6">
            <div className="modal-content container rounded-lg">
              <div className="modal-header">
                <Dialog.Title asChild>
                  <h2 className="modal-title">
                    {/* eslint-disable-next-line @next/next/no-img-element -- legacy brand asset */}
                    <img
                      loading="lazy"
                      src="/images/brand/SVG/jm-icon-full-brand-prime.svg"
                      alt="Jacob Medley | UX UI Designer"
                      height={58}
                      width={58}
                    />{' '}
                    {project?.title}
                  </h2>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button type="button" className="btn btn-prime rounded-full btn-close-modal" aria-label="Close">
                    <i className="fa-sharp fa-regular fa-xmark-large" aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="modal-body">
                <div className="container">{project && <ModalContent project={project} />}</div>
              </div>

              <div className="modal-footer">
                <Dialog.Close asChild>
                  <button type="button" className="btn btn-prime btn-lg rounded-full btn-close-modal">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ModalContent({ project }: { project: Project }) {
  return (
    <>
      <div className="row">
        {project.image && (
          <div className="col-24 col-lg-12 col-xl-10 self-center">
            <p>
              {/* eslint-disable-next-line @next/next/no-img-element -- legacy parity */}
              <img
                loading="lazy"
                className="img-fluid shadow-[var(--shadow-bs-lg)] border border-white rounded-full"
                src={project.image}
                alt=""
              />
            </p>
          </div>
        )}
        <div className="col-24 col-lg-12 col-xl-14 self-center">
          <h3>Project Brief:</h3>
          <hr className="solid-center" />
          <p>{project.summary}</p>

          {project.problem && <p>{project.problem}</p>}
          {project.solution && <p>{project.solution}</p>}

          {project.contributions.length > 0 && (
            <>
              <h4>Contributions:</h4>
              <hr className="solid-center" />
              {project.contributions.map((c) => (
                <span key={c} className="badge-work">
                  <i className="fa-regular fa-circle-check text-second" aria-hidden="true" /> {c}
                </span>
              ))}
            </>
          )}

          {project.technologies.length > 0 && (
            <>
              <h4 className="mt-6">Technology:</h4>
              <hr className="solid-center" />
              {project.technologies.map((t) => (
                <span key={t} className="badge-work">
                  <i className="fa-regular fa-gear text-second" aria-hidden="true" /> {t}
                </span>
              ))}
            </>
          )}
        </div>
      </div>

      {project.results && project.results.length > 0 && (
        <div className="row mb-6">
          <div className="col-24">
            <h5>Results</h5>
            <hr className="solid-center" />
            <ul className="fa-ul ml-8">
              {project.results.map((r) => (
                <li key={r} className="mb-2">
                  <span className="fa-li">
                    <i className="fa-regular fa-angle-right" aria-hidden="true" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
