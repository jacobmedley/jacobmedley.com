import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Selected Work Card Variants | Jacob Medley',
  description: 'Review-only visual and icon card directions for the selected-work section.',
  robots: { index: false, follow: false },
}

const visualVariants = [
  { number: '01', name: 'Editorial crop', note: 'Photography leads. The discipline and title sit in a quiet caption band.' },
  { number: '02', name: 'Campaign stack', note: 'Multiple executions make the card read as a body of visual work.' },
  { number: '03', name: 'Type-led frame', note: 'A graphic label and cropped image create a more art-directed portfolio tile.' },
]

const iconVariants = [
  { number: '01', name: 'Facilitator orbit', note: 'A single thin icon gains presence through rings and a focal center.' },
  { number: '02', name: 'Workshop map', note: 'Connected participant nodes communicate facilitation without photography.' },
  { number: '03', name: 'Workshop toolkit', note: 'A small system of objects represents the methods used in the room.' },
]

export default function DesignVariantsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/#full-stack" className={styles.back}><i className="fa-thin fa-arrow-left" aria-hidden="true" /> Back to selected work</Link>
        <p>Review page // No option applied</p>
        <h1>Selected-work<br />card directions.</h1>
        <p className={styles.intro}>Two separate visual languages: image-led treatments for Visual Design and illustrative symbols for icon-led work.</p>
      </header>

      <section className={styles.section} aria-labelledby="visual-variants-title">
        <div className={styles.sectionHeading}>
          <div><span>Visual Design</span><h2 id="visual-variants-title">Reveal // image-led</h2></div>
          <p>Three directions that preserve the work itself as the focal point.</p>
        </div>
        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.editorial}`}>
            <div className={styles.imageFrame}><Image src="/images/work/kitchen-sink/btn-reveal.png" alt="Reveal campaign portrait" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
            <div className={styles.caption}><span>Brand Design // Visual Design</span><h3>Reveal</h3></div>
          </article>
          <article className={`${styles.card} ${styles.stack}`}>
            <div className={styles.stackGrid}>
              <div><Image src="/images/work/kitchen-sink/btn-reveal.png" alt="Reveal campaign portrait" fill sizes="(max-width: 767px) 100vw, 22vw" /></div>
              <div><Image src="/images/work/kitchen-sink/reveal-clear-01.jpg" alt="Reveal clarity campaign execution" fill sizes="(max-width: 767px) 50vw, 11vw" /></div>
              <div><Image src="/images/work/kitchen-sink/reveal-clear-02.jpg" alt="Reveal clarity campaign execution" fill sizes="(max-width: 767px) 50vw, 11vw" /></div>
            </div>
            <div className={styles.stackLabel}><span>Campaign system</span><strong>Reveal</strong></div>
          </article>
          <article className={`${styles.card} ${styles.typeLed}`}>
            <Image src="/images/work/kitchen-sink/btn-reveal.png" alt="Reveal campaign portrait" fill sizes="(max-width: 767px) 100vw, 33vw" />
            <span className={styles.index}>R / 01</span>
            <div className={styles.typePanel}><span>Visual Design</span><h3>Clear ideas.<br />Visible work.</h3></div>
          </article>
        </div>
        <div className={styles.notes}>{visualVariants.map((variant) => <div key={variant.number}><span>{variant.number}</span><strong>{variant.name}</strong><p>{variant.note}</p></div>)}</div>
      </section>

      <section className={`${styles.section} ${styles.iconSection}`} aria-labelledby="icon-variants-title">
        <div className={styles.sectionHeading}>
          <div><span>Icon Design</span><h2 id="icon-variants-title">Team Workshops // illustrative</h2></div>
          <p>Three directions built from symbols and structure rather than campaign imagery.</p>
        </div>
        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.iconCard}`}>
            <div className={styles.orbit}><i className="fa-thin fa-screen-users" aria-hidden="true" /></div>
            <div className={styles.iconCaption}><span>Design Leadership</span><h3>Team Workshops</h3></div>
          </article>
          <article className={`${styles.card} ${styles.iconCard}`}>
            <div className={styles.map} aria-hidden="true"><i /><i /><i /><i /><i /><span /></div>
            <div className={styles.iconCaption}><span>Design Leadership</span><h3>Team Workshops</h3></div>
          </article>
          <article className={`${styles.card} ${styles.iconCard}`}>
            <div className={styles.toolkit} aria-hidden="true"><i className="fa-thin fa-note-sticky" /><i className="fa-thin fa-marker" /><i className="fa-thin fa-lightbulb-on" /></div>
            <div className={styles.iconCaption}><span>Design Leadership</span><h3>Team Workshops</h3></div>
          </article>
        </div>
        <div className={styles.notes}>{iconVariants.map((variant) => <div key={variant.number}><span>{variant.number}</span><strong>{variant.name}</strong><p>{variant.note}</p></div>)}</div>
      </section>
    </main>
  )
}

