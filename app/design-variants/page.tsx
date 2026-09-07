import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Selected Work Card System | Jacob Medley',
  description: 'Review-only preview of the approved photo and icon card treatments.',
  robots: { index: false, follow: false },
}

const badges = (labels: string[]) => (
  <div className="thinking-badges" aria-label="Disciplines">
    {labels.map((label) => <span key={label}>{label}</span>)}
  </div>
)

export default function DesignVariantsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/#full-stack" className={styles.back}>
          <i className="fa-thin fa-arrow-left" aria-hidden="true" /> Back to selected work
        </Link>
        <p>Approved direction // Review page</p>
        <h1>One system.<br />Two treatments.</h1>
        <p className={styles.intro}>
          Photo and icon cards share the same structure, typography, badges, rule, and action.
          Their media treatments change to match the work.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="selected-card-system">
        <div className={styles.sectionHeading}>
          <div><span>Selected card system</span><h2 id="selected-card-system">Same layout // Different treatments</h2></div>
          <p>Full-color campaign imagery for visual work. Project-specific icons and geometry for methods and process work.</p>
        </div>

        <div className={styles.grid}>
          <article className="thinking-thumb thinking-thumb-photo thinking-art-reveal">
            {badges(['Brand', 'Visual'])}
            <div className="thinking-media thinking-media-image" aria-hidden="true">
              <span className="thinking-photo-image" style={{ backgroundImage: 'url(/images/work/kitchen-sink/reveal-cover.png)' }} />
            </div>
            <div className="thinking-panel">
              <div className="thinking-copy">
                <span className="thinking-eyebrow">Reveal Campaign</span>
                <h3 className="thinking-title">The Choice Is Clear</h3>
              </div>
              <i className="fa-thin fa-arrow-right thinking-arrow" aria-hidden="true" />
            </div>
          </article>

          <article className="thinking-thumb thinking-thumb-icon thinking-art-workshops">
            {badges(['Leadership'])}
            <div className="thinking-media thinking-media-icon" aria-hidden="true">
              <span className="thinking-geometry">
                {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
              </span>
              <span className="thinking-icon-anchor"><i className="fa-thin fa-lightbulb thinking-icon" /></span>
            </div>
            <div className="thinking-panel">
              <div className="thinking-copy">
                <span className="thinking-eyebrow">Facilitation</span>
                <h3 className="thinking-title">Team Workshops</h3>
              </div>
              <i className="fa-thin fa-arrow-right thinking-arrow" aria-hidden="true" />
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
