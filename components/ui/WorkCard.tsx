import { cn } from '@/lib/utils'
import { type Project } from '@/lib/data/projects'
import { FeaturedAnchor, FeaturedField } from './FeaturedArtwork'

interface WorkCardProps {
  project: Project
  reverse?: boolean
  onOpen?: (id: string) => void
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

        <div className="featured-work-art" aria-hidden="true">
          <span className="featured-work-anchor">
            <FeaturedAnchor projectId={project.id} />
          </span>
        </div>

        <div className="featured-work-copy">
          <div className="portfolio-badges work-card-badges" aria-label="Disciplines">
            {project.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
          </div>
          <div className="featured-work-heading">
            <h4 className="h2">{project.title}</h4>
            <p className="h5 featured-work-subtitle">{project.subtitle}</p>
          </div>
          <p className="featured-work-summary">{project.summary}</p>

          <span className="btn btn-lg btn-second-dark rounded-full action-label case-study-read" aria-hidden="true">
            Read case study <i className="fa-thin fa-arrow-right" />
          </span>
        </div>
        <button type="button" className="featured-work-open" onClick={open}
          data-modal-trigger={project.id} aria-label={`Open ${project.title} case study`} />
      </article>
    </div>
  )
}
