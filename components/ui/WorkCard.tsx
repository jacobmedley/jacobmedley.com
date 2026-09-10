import { cn } from '@/lib/utils'
import { type Project } from '@/lib/data/projects'

interface WorkCardProps {
  project: Project
  reverse?: boolean
  onOpen?: (id: string) => void
}

const FEATURED_ICONS: Record<string, string[]> = {
  webmd: [
    'fa-thin fa-heart-pulse',
    'fa-thin fa-stethoscope',
    'fa-thin fa-capsules',
    'fa-thin fa-dna',
  ],
}

function FeaturedAnchor({ projectId }: { projectId: string }) {
  if (projectId === 'webmd') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand asset
      <img
        src="/assets/featured/webmd-logo-white.svg"
        alt=""
        width={110}
        height={26}
        className="featured-work-logo featured-work-logo-webmd"
      />
    )
  }

  if (projectId === 'bumblebeemd') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand asset
      <img
        src="/assets/featured/bumblebeemd-icon.svg"
        alt=""
        width={71}
        height={82}
        className="featured-work-logo featured-work-logo-bumblebee"
      />
    )
  }

  const icon = projectId === 'dentalplans'
    ? 'fa-thin fa-tooth'
    : projectId === 'hydra'
      ? 'fa-thin fa-cubes'
      : 'fa-thin fa-building-columns'

  return <i className={`${icon} featured-work-icon`} aria-hidden="true" />
}

function FeaturedField({ projectId }: { projectId: string }) {
  const icons = FEATURED_ICONS[projectId] ?? []

  return (
    <div className="featured-work-scene" aria-hidden="true">
      <div className="featured-work-interaction">
        <div className="featured-work-drift">
          <div className="featured-work-planes">
            <span className="featured-work-plane" />
            <span className="featured-work-plane" />
            <span className="featured-work-plane" />
          </div>
          <span className="featured-work-orbit" />
          <span className="featured-work-orbit featured-work-orbit-second" />
          <span className="featured-work-line" />
          <span className="featured-work-line featured-work-line-second" />
          {icons.map((icon, index) => (
            <i key={icon} className={`${icon} featured-work-motif featured-work-motif-${index + 1}`} />
          ))}
          {projectId === 'bumblebeemd' ? (
            <div className="featured-work-honeycomb">
              {Array.from({ length: 18 }, (_, index) => (
                // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand geometry
                <img
                  key={index}
                  src="/assets/featured/bumblebeemd-hex.svg"
                  alt=""
                  width={72}
                  height={66}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function WorkCard({
  project,
  reverse = false,
  onOpen,
}: WorkCardProps) {
  const open = () => onOpen?.(project.id)

  return (
    <div className="work-item py-2 lg:py-6 2xl:py-12">
      <article
        className={cn(
          'featured-work-card',
          `featured-work-card-${project.id}`,
          reverse && 'featured-work-card-even',
        )}
        data-motion-root
        data-project-id={project.id}
      >
        <FeaturedField projectId={project.id} />

        <button
          type="button"
          className="btn featured-work-art"
          onClick={open}
          data-modal-trigger={project.id}
          aria-label={`Open ${project.title} case study`}
        >
          <span className="featured-work-anchor">
            <FeaturedAnchor projectId={project.id} />
          </span>
        </button>

        <div className="featured-work-copy">
          <div className="portfolio-badges work-card-badges" aria-label="Disciplines">
            {project.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
          </div>
          <h4 className="h2">{project.title}</h4>
          <p className="h5 featured-work-subtitle">{project.subtitle}</p>
          <p className="featured-work-summary">{project.summary}</p>

          <button
            type="button"
            className="btn btn-lg btn-second-dark rounded-full action-label case-study-read"
            onClick={open}
            data-modal-trigger={project.id}
          >
            Read <i className="fa-thin fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  )
}
