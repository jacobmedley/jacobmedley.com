import { cn } from '@/lib/utils'
import { type Project } from '@/lib/data/projects'
import type { CSSProperties } from 'react'

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
    'fa-thin fa-heart-pulse',
    'fa-thin fa-stethoscope',
  ],
}

function FeaturedAnchor({ projectId }: { projectId: string }) {
  if (projectId === 'opfred') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- byte-verified supplied OPF icon
      <img src="/assets/featured/opf-icon-color.svg" alt="" width={132} height={124} className="featured-work-logo featured-work-logo-opf" />
    )
  }
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

  if (projectId === 'dentalplans') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand asset
      <img
        src="/assets/featured/dentalplans-icon.svg"
        alt=""
        width={132}
        height={132}
        className="featured-work-logo featured-work-logo-dentalplans"
      />
    )
  }

  const icon = projectId === 'hydra'
    ? 'fa-thin fa-hydra'
    : 'fa-thin fa-building-columns'

  return <i className={`${icon} featured-work-icon`} aria-hidden="true" />
}

function FeaturedField({ projectId }: { projectId: string }) {
  const icons = FEATURED_ICONS[projectId] ?? []

  return (
    <div className="featured-work-scene" aria-hidden="true">
      <div className="featured-work-interaction">
        <div className="featured-work-drift">
          {['hydra', 'opfred'].includes(projectId) ? <div className="featured-work-planes">
            <span className="featured-work-plane" />
            <span className="featured-work-plane" />
            <span className="featured-work-plane" />
          </div> : null}
          {['hydra', 'opfred'].includes(projectId) ? <>
          <span className="featured-work-orbit" />
          <span className="featured-work-orbit featured-work-orbit-second" />
          <span className="featured-work-line" />
          <span className="featured-work-line featured-work-line-second" />
          </> : null}
          {icons.map((icon, index) => (
            <span key={`${icon}-${index}`} className={`featured-work-motif featured-work-motif-${index + 1}`} style={{ '--pulse-delay': `${-index * 1.7}s` } as CSSProperties}>
              <i className={icon} /><b className="featured-health-ring" /><b className="featured-health-ring featured-health-ring-second" />
            </span>
          ))}
          {projectId === 'dentalplans' ? <DentalSystem /> : null}
          {projectId === 'bumblebeemd' ? (
            <div className="featured-work-honeycomb">
              {Array.from({ length: 9 }, (_, index) => (
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

const systemNodes = [
  { x: 8, y: 8, icon: 'fa-database' },
  { x: 92, y: 8, icon: 'fa-cart-shopping' },
  { x: 8, y: 92, icon: 'fa-envelope' },
  { x: 92, y: 92, icon: 'fa-browser' },
]
const systemEdges = [[0, 1], [0, 2], [1, 3], [2, 3], [0, 3]]

function DentalSystem() {
  return <div className="featured-system">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="featured-system-links">
      {systemEdges.map(([from, to], i) => {
        const a = systemNodes[from], b = systemNodes[to]
        const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`
        return <g key={`${from}-${to}`}>
          <path d={d} />
          <path d={d} pathLength="100" className="featured-system-packet" style={{ animationDelay: `${-i * 1.8}s` }} />
        </g>
      })}
    </svg>
    {systemNodes.map(({ x, y, icon }) => <span key={icon} className="featured-system-node" style={{ left: `${x}%`, top: `${y}%` }}>
      <i className={`fa-thin ${icon}`} />
    </span>)}
  </div>
}

export default function WorkCard({
  project,
  reverse = false,
  onOpen,
}: WorkCardProps) {
  const open = () => onOpen?.(project.id)

  return (
    <div className={`work-item work-item-${project.id} py-2 lg:py-6 2xl:py-12`}>
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
          <div className="featured-work-heading">
            <h4 className="h2">{project.title}</h4>
            <p className="h5 featured-work-subtitle">{project.subtitle}</p>
          </div>
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
