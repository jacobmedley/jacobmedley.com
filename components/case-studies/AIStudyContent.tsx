'use client'

import study from '@/docs/ai-chat-study.json'
import { CustomerExperience, RepresentativeExperience } from './AIExperience'
import styles from './AIStudyContent.module.css'

const sections = [['finding', 'The finding'], ['waiting', 'Waiting and failure'], ['review', 'Human review'], ['outcome', 'What shipped']] as const

export default function AIStudyContent({ readingPage = false }: { readingPage?: boolean }) {
  const Heading = readingPage ? 'h2' : 'h3'
  return <article className={styles.story}>
    <div className={styles.intro}>
      <p className={styles.lead}>{study.editorial.opening}</p><p>{study.editorial.context}</p>
      <dl className={styles.metadata}><div><dt>My role</dt><dd>{study.role}</dd></div><div><dt>Collaboration</dt><dd>{study.collaboration}</dd></div></dl>
    </div>
    <nav className={styles.sectionNav} aria-label="In this case study">{sections.map(([id,label],index) => <a key={id} href={`#ai-${id}`} onClick={event => {
      event.preventDefault()
      const target = event.currentTarget.closest('article')?.querySelector<HTMLElement>(`#ai-${id}`)
      target?.scrollIntoView({block:'start',behavior:'instant'}); target?.focus({preventScroll:true})
    }}><span aria-hidden="true">0{index+1}</span>{label}<span aria-hidden="true">↗</span></a>)}</nav>
    <section className={styles.section}>
      <div className={styles.sectionCopy}><span className={styles.number} aria-hidden="true">01</span><Heading id="ai-finding" tabIndex={-1}>An answer it should never have given</Heading>{study.editorial.finding.map(text=><p key={text}>{text}</p>)}</div>
      <figure className={styles.evidence}><ol className={styles.nodes}>
        <li><span>Source</span><strong>Sample account statement</strong></li>
        <li><span>Finding</span><strong>Specific balance returned</strong><p>No value shown</p></li>
        <li><span>Required response</span><strong>Refer to an account manager</strong></li>
      </ol><figcaption>{study.assets['P03-E'].caption}</figcaption></figure>
    </section>
    <section className={styles.section}>
      <div className={styles.sectionCopy}><span className={styles.number} aria-hidden="true">02</span><Heading id="ai-waiting" tabIndex={-1}>Ten seconds needed a plan</Heading><p>{study.editorial.waiting[0]}</p><p>{study.editorial.waiting[1]}</p></div>
      <CustomerExperience customer={study.assets['P03-A']} timing={study.assets['P03-C']} headingLevel={readingPage ? 'h3' : 'h4'} />
      <p className={styles.note}>{study.editorial.waiting[2]} {study.editorial.scopeNote}</p>
    </section>
    <section className={styles.section}>
      <div className={styles.sectionCopy}><span className={styles.number} aria-hidden="true">03</span><Heading id="ai-review" tabIndex={-1}>The representative had a different job</Heading><p>{study.editorial.representative}</p></div>
      <RepresentativeExperience asset={study.assets['P03-B']} headingLevel={readingPage ? 'h3' : 'h4'} />
    </section>
    <section className={styles.section}>
      <div className={styles.sectionCopy}><span className={styles.number} aria-hidden="true">04</span><Heading id="ai-outcome" tabIndex={-1}>What the tracking said</Heading><p>{study.editorial.tracking[0]}</p></div>
      <figure className={styles.evidence}><div className={styles.outcomeGrid}><div><strong>Delivery</strong><p>A subset of requirements shipped.</p></div><div><strong>Observed use</strong><p>{study.editorial.tracking[1]}</p></div></div><figcaption>{study.assets['P03-D'].caption} No numerical uplift is established.</figcaption></figure>
      <p className={styles.closing}>{study.editorial.closing}</p>
    </section>
    <p className={styles.note}><a href={readingPage ? '/#work' : `/case-studies/${study.suggestedSlug}/`}>{readingPage ? 'Back to case studies' : 'Open the reading page'} →</a></p>
  </article>
}
