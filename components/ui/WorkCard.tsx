import { type Project } from '@/lib/data/projects'
import { FeaturedAnchor, FeaturedField } from './FeaturedArtwork'
import { DirectionalArrow, PrismWave } from './QuietPrism'
import styles from './QuietPrism.module.css'

const contextIcons: Record<string, string> = {
  webmd: 'fa-heart-pulse', dentalplans: 'fa-diagram-project',
  hydra: 'fa-layer-group', bumblebeemd: 'fa-hexagon', opfred: 'fa-leaf',
}

export default function WorkCard({ project, onOpen }: { project: Project; onOpen?: (id: string) => void }) {
  return (
    <div className={`work-item work-item-${project.id} py-2 lg:py-6 2xl:py-12`}>
      <article className={`${styles.featuredCard} featured-work-card featured-work-card-${project.id}`}
        data-motion-root data-atmosphere data-project-id={project.id}>
        <PrismWave />
        <FeaturedField projectId={project.id} />
        <div className={`${styles.featuredArt} featured-work-art`}>
          <span className={styles.featuredContextIcon} aria-hidden="true"><i className={`fa-thin ${contextIcons[project.id]}`} /></span>
          <span className="featured-work-anchor" aria-hidden="true"><FeaturedAnchor projectId={project.id} /></span>
          <div className={styles.featuredIdentity}>
            <p className={styles.eyebrow}>Case Study</p>
            <h3>{project.title}</h3>
          </div>
        </div>
        <div className={`${styles.featuredCopy} featured-work-copy`}>
          <div className={styles.featuredMeta}>
            <div className="portfolio-badges work-card-badges" role="group" aria-label="Disciplines">
              {project.disciplines.map(discipline => <span key={discipline}>{discipline}</span>)}
            </div>
            <span className={styles.featuredExternal} aria-hidden="true"><i className="fa-thin fa-briefcase" /></span>
          </div>
          <div className="featured-work-heading"><h3 className="h2">{project.subtitle}</h3></div>
          <p className="featured-work-summary">{project.summary}</p>
          <div className={styles.featuredFooter}>
            <span className={styles.featuredLink}>View <DirectionalArrow /></span>
            <span>People <b>·</b> Process <b>·</b> Better outcomes</span>
          </div>
        </div>
        <button type="button" className="featured-work-open" onClick={() => onOpen?.(project.id)}
          data-modal-trigger={project.id} aria-label={`Open ${project.title} case study`} />
      </article>
    </div>
  )
}
