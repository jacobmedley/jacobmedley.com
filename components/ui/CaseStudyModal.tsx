'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { type Project, type ProjectMedia, type ProjectBadge, type ProjectMetric } from '@/lib/data/projects'

interface CaseStudyModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Legacy Bootstrap modal (components/modal-*.html): fullscreen dialog
 * with container-width content, blur behind the modal viewport, fade +
 * translateY(-50px) entrance, circular header close button and centered
 * footer Close button. Body renders the project's typed media blocks in
 * the original legacy section order. Styles in globals.css (.modal…).
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
            // Bootstrap closes when the area outside the dialog content is clicked
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
                    {project?.modalTitle ?? project?.title}
                  </h2>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="btn btn-prime rounded-full btn-close-modal"
                    aria-label="Close"
                  >
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

function BadgeList({ badges }: { badges: ProjectBadge[] }) {
  return (
    <>
      {badges.map((b) => (
        <span key={b.label} className="badge-work">
          <i className={`${b.icon} text-second`} aria-hidden="true" /> {b.label}
        </span>
      ))}
    </>
  )
}

/* eslint-disable @next/next/no-img-element -- legacy parity: native imgs */
function MediaBlock({ block }: { block: ProjectMedia }) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="row">
          <div className="col-24">
            <h5>{block.text}</h5>
            <hr className="solid-center" />
          </div>
        </div>
      )
    case 'text':
      return (
        <div className="row">
          <div className="col-24">
            <p>{block.text}</p>
          </div>
        </div>
      )
    case 'list':
      return (
        <div className="row">
          <div className="col-24">
            <ul className="fa-ul">
              {block.items.map((item) => (
                <li key={item} className="mb-2">
                  <span className="fa-li">
                    <i className="fa-regular fa-angle-right" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    case 'image':
      return (
        <div className="row mb-6 justify-center">
          <div className={block.span ? `col-24 col-lg-${block.span}` : 'col-24'}>
            <p>
              <img loading="lazy" className="img-fluid shadow-[var(--shadow-bs-lg)]" src={block.src} alt={block.alt} />
            </p>
          </div>
        </div>
      )
    case 'image-pair':
      return (
        <div className="row mb-6">
          <div className="col-24 col-lg-18">
            <p className="lg:text-left">
              <i className="fa-regular fa-desktop fa-2x" aria-hidden="true" />
            </p>
            <p>
              <img
                loading="lazy"
                className="img-fluid shadow-[var(--shadow-bs-lg)]"
                src={block.desktop.src}
                alt={block.desktop.alt}
              />
            </p>
          </div>
          <div className="col-24 col-lg-6">
            <p className="lg:text-left">
              <i className="fa-regular fa-mobile fa-2x" aria-hidden="true" />
            </p>
            <p className="text-center">
              <img
                loading="lazy"
                className="img-fluid shadow-[var(--shadow-bs-lg)]"
                src={block.mobile.src}
                alt={block.mobile.alt}
              />
            </p>
          </div>
        </div>
      )
    case 'image-row':
      return (
        <div className="row mb-6 justify-center">
          {block.images.map((img, i) => (
            <div key={img.src} className={`col-24 col-lg-${block.cols[i] ?? 12}`}>
              <p>
                <img loading="lazy" className="img-fluid shadow-[var(--shadow-bs-lg)]" src={img.src} alt={img.alt} />
              </p>
            </div>
          ))}
        </div>
      )
    case 'metric-grid':
      return (
        <div className="row">
          <div className="col-24 mt-5">
            <h4>{block.heading}</h4>
            <hr className="solid-center my-5" />
          </div>
          <div className="col-24 col-lg-16 self-center">
            <div className="row row-cols-2 text-center justify-center g-3">
              {block.metrics.map((metric) => (
                <MetricStat key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
          <div className="col-24 col-lg-8 self-center">
            <h5 className="mb-3">{block.valueCreated.heading}</h5>
            <ul className="fa-ul">
              {block.valueCreated.items.map((item) => (
                <li key={item} className="mb-4">
                  <span className="fa-li">
                    <i className="fa-regular fa-angle-right" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
  }
}

function MetricStat({ metric }: { metric: ProjectMetric }) {
  return (
    <div className="col">
      <h4 className="result mb-0 display-5 fw-bolder">
        {metric.value}
        <small>
          <i
            className={`display-3 text-third fa-regular fa-long-arrow-${metric.direction}`}
            aria-hidden="true"
          />
        </small>
      </h4>
      <p className="result-label mt-0">{metric.label}</p>
    </div>
  )
}

function ModalContent({ project }: { project: Project }) {
  return (
    <>
      {/* Intro row: circular brief image + Project Brief / Contributions / Technology */}
      <div className="row mb-6">
        {project.brief.image && (
          <div className="col-24 col-lg-12 col-xl-10 self-center text-center">
            <p>
              <img
                loading="lazy"
                className="img-fluid shadow-[var(--shadow-bs-lg)] border border-white rounded-full"
                src={project.brief.image.src}
                alt={project.brief.image.alt}
              />
            </p>
          </div>
        )}
        <div className="col-24 col-lg-12 col-xl-14 self-center">
          {project.brief.paragraphs.length > 0 && (
            <>
              <h3>Project Brief:</h3>
              <hr className="solid-center" />
              {project.brief.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </>
          )}

          {project.contributions.length > 0 && (
            <>
              <h4>Contributions:</h4>
              <hr className="solid-center" />
              <BadgeList badges={project.contributions} />
            </>
          )}

          {project.technologies.length > 0 && (
            <>
              <h4 className="mt-6">Technology:</h4>
              <hr className="solid-center" />
              <BadgeList badges={project.technologies} />
            </>
          )}
        </div>
      </div>

      {project.media.map((block, i) => (
        <MediaBlock key={i} block={block} />
      ))}
    </>
  )
}
