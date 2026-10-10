'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import study from '@/docs/ai-chat-study.json'
import { PrismStudyHeading, PrismStudySurface } from '@/components/ui/PrismStudy'
import { CustomerExperience, RepresentativeExperience } from './AIExperience'
import styles from './AIStudyContent.module.css'

const sections = [['finding', 'Findings'], ['waiting', 'Failure'], ['review', 'Human'], ['outcome', 'Shipped']] as const

export default function AIStudyContent({ readingPage = false }: { readingPage?: boolean }) {
  const articleRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string>('finding')
  const headingLevel = readingPage ? 'h2' : 'h3'
  const DraftHeading = readingPage ? 'h3' : 'h4'
  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const root = article.closest('.modal-body')
    const scroller = root ?? window
    let frame = 0
    const update = () => {
      frame = 0
      const top = (root?.getBoundingClientRect().top ?? 0) + 110
      let current: string = 'finding'
      for (const [id] of sections) {
        const target = article.querySelector(`#ai-${id}`)
        if (target && target.getBoundingClientRect().top <= top) current = id
      }
      const scrollElement = root ?? document.documentElement
      if (scrollElement.scrollHeight - scrollElement.clientHeight - scrollElement.scrollTop <= 2) current = 'outcome'
      setActive(current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <article ref={articleRef} className={styles.story}>
    <div className={styles.intro}>
      <div><p className={styles.lead}>{study.editorial.opening}</p><p>{study.editorial.needs}</p><p>{study.editorial.context}</p><p>{study.editorial.launchDecision}</p></div>
      <dl className={styles.metadata}><div><dt>My role</dt><dd>{study.role}</dd></div><div><dt>Collaboration</dt><dd>{study.collaboration}</dd></div></dl>
    </div>
    <nav className={styles.sectionNav} aria-label="In this case study">{sections.map(([id,label],index) => <a key={id} href={`#ai-${id}`} aria-current={active === id ? 'location' : undefined} onClick={event => {
      event.preventDefault()
      const target = articleRef.current?.querySelector<HTMLElement>(`#ai-${id}`)
      target?.scrollIntoView({block:'start',behavior:'instant'})
      target?.focus({preventScroll:true})
      setActive(id)
    }}><span aria-hidden="true">0{index+1}</span>{label}</a>)}</nav>
    <p className={styles.sectionCopy}>{study.editorial.requirementsIntro}</p>

    <section className={styles.section} aria-labelledby="ai-finding">
      <PrismStudyHeading id="ai-finding" icon="fa-magnifying-glass" level={headingLevel}>An answer it should never have given</PrismStudyHeading>
      <div className={styles.split}>
        <div className={styles.sectionCopy}>{study.editorial.finding.map(text=><p key={text}>{text}</p>)}</div>
        <figure className={styles.evidence}>
          <PrismStudySurface tone="gold">
            <ol className={styles.nodes}>
              <li><i className="fa-thin fa-file-lines" aria-hidden="true" /><div><span>Source</span><strong>Sample account statement</strong></div></li>
              <li><i className="fa-thin fa-comment" aria-hidden="true" /><div><span>Finding</span><strong>Specific balance returned</strong><p>No value shown</p></div></li>
              <li><i className="fa-thin fa-user" aria-hidden="true" /><div><span>Required response</span><strong>Refer to an account manager</strong></div></li>
            </ol>
          </PrismStudySurface>
          <figcaption>{study.assets['P03-E'].caption}</figcaption>
        </figure>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="ai-waiting">
      <PrismStudyHeading id="ai-waiting" icon="fa-stopwatch" level={headingLevel}>Requirements for waiting and failure</PrismStudyHeading>
      <div className={styles.split}>
        <div className={styles.sectionCopy}><p>{study.editorial.waiting[0]}</p><p>{study.editorial.waiting[1]}</p><p className={styles.note}>{study.editorial.waiting[2]} {study.editorial.scopeNote}</p></div>
        <CustomerExperience customer={study.assets['P03-A']} timing={study.assets['P03-C']} headingLevel={readingPage ? 'h3' : 'h4'} />
      </div>
      <figure className={`${styles.evidence} ${styles.draftEvidence}`}>
        <PrismStudySurface tone="gold">
          <DraftHeading>{study.editorial.originalDrafts.heading}</DraftHeading>
          <hr className="solid-center" />
          <p className={styles.sectionCopy}>{study.editorial.originalDrafts.intro}</p>
          <ol className={styles.draftSteps}>{study.editorial.originalDrafts.steps.map(step => <li key={step.heading}><strong>{step.heading}</strong><p>{step.body}</p></li>)}</ol>
          <p className={styles.sectionCopy}>{study.editorial.originalDrafts.review}</p>
        </PrismStudySurface>
        <figcaption>{study.editorial.originalDrafts.caption}</figcaption>
      </figure>
    </section>

    <section className={styles.section} aria-labelledby="ai-review">
      <PrismStudyHeading id="ai-review" icon="fa-user" level={headingLevel}>Requirements for the representative</PrismStudyHeading>
      <div className={styles.split}>
        <div className={styles.sectionCopy}><p>{study.editorial.representative}</p></div>
        <RepresentativeExperience asset={study.assets['P03-B']} headingLevel={readingPage ? 'h3' : 'h4'} />
      </div>
    </section>

    <section className={styles.section} aria-labelledby="ai-outcome">
      <PrismStudyHeading id="ai-outcome" icon="fa-chart-line" level={headingLevel}>The launch decision and the result</PrismStudyHeading>
      <p className={styles.sectionCopy}>{study.editorial.tracking[0]}</p>
      <table className={styles.requirements}>
        <caption>Requirements and launch scope</caption>
        <thead><tr><th scope="col">Requirement</th><th scope="col">At launch</th></tr></thead>
        <tbody>{study.editorial.requirements.map(row => <tr key={row.requirement}><th scope="row">{row.requirement}</th><td>{row.status}</td></tr>)}</tbody>
      </table>
      <figure className={styles.evidence}>
        <div className={styles.outcomeGrid}>
          <PrismStudySurface tone="slate"><i className="fa-thin fa-layer-group" aria-hidden="true" /><strong>Launch scope</strong><hr className="solid-center" /><p>{study.editorial.delivery}</p></PrismStudySurface>
          <PrismStudySurface tone="sage"><i className="fa-thin fa-chart-line" aria-hidden="true" /><strong>Observed use</strong><hr className="solid-center" /><p>{study.editorial.tracking[1]}</p></PrismStudySurface>
        </div>
        <figcaption>{study.assets['P03-D'].caption} No numerical uplift is established.</figcaption>
      </figure>
      <p className={`${styles.sectionCopy} ${styles.lesson}`}>{study.editorial.lesson}</p>
      <p className={styles.closing}>{study.editorial.closing}</p>
    </section>
    {readingPage && <p className={styles.note}><Link href="/#work">Back to case studies →</Link></p>}
  </article>
}
