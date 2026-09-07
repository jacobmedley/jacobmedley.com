import { cn } from '@/lib/utils'
import { type Project } from '@/lib/data/projects'

interface WorkCardProps {
  project: Project
  reverse?: boolean
  onOpen?: (id: string) => void
}

/**
 * Legacy .work-item editorial row (components/section-work-v2.html):
 * full-width image button + title/summary column, alternating via
 * flex-row-reverse.
 */
export default function WorkCard({
  project,
  reverse = false,
  onOpen,
}: WorkCardProps) {
  const open = () => onOpen?.(project.id)

  return (
    <div className="work-item py-2 lg:py-6 2xl:py-12">
      <div className={cn('row items-start 2xl:items-center', reverse && 'flex-row-reverse')}>
        <div className="col-24 col-lg-12 mb-12 lg:mb-0">
          <button
            type="button"
            className="btn p-0 m-0"
            onClick={open}
            data-modal-trigger={project.id}
          >
            {project.cardImage && (
              // eslint-disable-next-line @next/next/no-img-element -- legacy parity: native img, natural aspect
              <img
                loading="lazy"
                src={project.cardImage.src}
                alt={project.cardImage.alt}
                className="img-fluid rounded-2xl shadow-[var(--shadow-bs-lg)] btn-art"
              />
            )}
          </button>
        </div>

        <div className="col-24 col-lg-12">
          <h4 className="h2">{project.title}</h4>
          <p className="h5">{project.subtitle}</p>
          <div className="portfolio-badges work-card-badges" aria-label="Disciplines">
            {project.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
          </div>
          <p>{project.summary}</p>

          <div className="row text-center md:text-left">
            <div className="col-24">
              <button
                type="button"
                className="btn btn-lg btn-second-dark rounded-full action-label case-study-read"
                onClick={open}
              >
                Read Case Study <i className="fa-thin fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
