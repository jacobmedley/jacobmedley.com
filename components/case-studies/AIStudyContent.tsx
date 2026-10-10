'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import study from '@/docs/ai-chat-study.json'
import { PrismStudyHeading, PrismStudySurface, type PrismTone } from '@/components/ui/PrismStudy'
import { CustomerExperience } from './AIExperience'
import AIServiceWorkspace from './AIServiceWorkspace'
import AIDemoEntry from './AIDemoEntry'
import StudyIntro from '@/components/ui/StudyIntro'
import ExperienceDisclosure from '@/components/ui/ExperienceDisclosure'
import Arrow from './Arrow'
import styles from './AIStudyContent.module.css'

const sections = [
  ['finding', 'Discovery', 'fa-magnifying-glass', 'gold'],
  ['research', 'Research', 'fa-book-open', 'slate'],
  ['waiting', 'Customer', 'fa-comments', 'plum'],
  ['review', 'Agent', 'fa-user', 'sage'],
  ['outcome', 'Outcome', 'fa-chart-line', 'gold'],
] as const
const e = study.editorial

function StudyCard({ card, headingLevel = 'h4', stacked = false }: {
  card: { heading: string; icon: string; tone: string; body: string; label?: string }
  headingLevel?: 'h3' | 'h4'; stacked?: boolean
}) {
  const Heading = headingLevel
  return <PrismStudySurface tone={card.tone as PrismTone} className={`${styles.card} ${stacked ? styles.stackedCard : ''}`}>
    <i className={`fa-thin ${card.icon}`} aria-hidden="true" />
    <div>{card.label && <span className={styles.badge}>{card.label}</span>}<Heading>{card.heading}</Heading><p>{card.body}</p></div>
  </PrismStudySurface>
}

export default function AIStudyContent({ readingPage = false, onWorkspaceChange }: {
  readingPage?: boolean; onWorkspaceChange?: (open: 'customer' | 'service' | null) => void
}) {
  const articleRef = useRef<HTMLElement>(null)
  const entryRef = useRef<HTMLButtonElement>(null)
  const customerEntryRef = useRef<HTMLButtonElement>(null)
  const returnEntry = useRef<HTMLButtonElement | null>(null)
  const savedScroll = useRef<number | null>(null)
  const [workspace, setWorkspace] = useState<'customer' | 'service' | null>(null)
  const [active, setActive] = useState<string>('finding')
  const headingLevel = readingPage ? 'h2' : 'h3'
  const subheading = readingPage ? 'h3' : 'h4'
  const Subheading = subheading

  useLayoutEffect(() => {
    if (savedScroll.current === null) return
    const root = articleRef.current?.closest('.modal-body')
    const top = workspace ? 0 : savedScroll.current
    if (root) root.scrollTop = top
    else window.scrollTo({ top, behavior: 'instant' })
    if (!workspace) returnEntry.current?.focus({ preventScroll: true })
  }, [workspace])

  useEffect(() => {
    const article = articleRef.current
    if (!article || workspace) return
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
      const element = root ?? document.documentElement
      if (element.scrollHeight - element.clientHeight - element.scrollTop <= 2) current = 'outcome'
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
  }, [workspace])

  const openWorkspace = (view: 'customer' | 'service') => {
    returnEntry.current = view === 'customer' ? customerEntryRef.current : entryRef.current
    savedScroll.current = articleRef.current?.closest('.modal-body')?.scrollTop ?? window.scrollY
    setWorkspace(view)
    onWorkspaceChange?.(view)
  }
  const closeWorkspace = () => { setWorkspace(null); onWorkspaceChange?.(null) }

  return <article ref={articleRef} className={styles.story} data-ai-workspace={workspace || undefined}>
    {workspace === 'service' && <AIServiceWorkspace onBack={closeWorkspace} />}
    {workspace === 'customer' && <CustomerExperience customer={study.assets['P03-A']} timing={study.assets['P03-C']} headingLevel={subheading} onBack={closeWorkspace} />}
    <div hidden={!!workspace}>
      <nav className={styles.sectionNav} aria-label="In this case study">{sections.map(([id, label, icon, tone]) => <a key={id} data-prism-tone={tone} href={`#ai-${id}`} aria-current={active === id ? 'location' : undefined} onClick={event => {
        event.preventDefault()
        const target = articleRef.current?.querySelector<HTMLElement>(`#ai-${id}`)
        target?.scrollIntoView({ block: 'start', behavior: 'instant' })
        target?.focus({ preventScroll: true })
        setActive(id)
      }}><i className={`fa-thin ${icon}`} aria-hidden="true" /><span>{label}</span></a>)}</nav>
      <StudyIntro role={study.role} collaboration={study.collaboration}>
        <p className={styles.lead}>{e.opening}</p><p>{e.context}</p><p>{e.approach}</p>
      </StudyIntro>
      <Subheading className={styles.eyebrow}>User requirements</Subheading>
      <div className={`${styles.threeCards} ${styles.needs}`}>{e.needs.map(card => <StudyCard key={card.heading} card={card} headingLevel={subheading} />)}</div>

      <section className={styles.section} aria-labelledby="ai-finding">
        <PrismStudyHeading id="ai-finding" icon="fa-magnifying-glass" level={headingLevel}>{e.discovery.heading}</PrismStudyHeading>
        <p className={styles.sectionCopy}>{e.discovery.intro}</p>
        <div className={styles.threeCards}>{e.discovery.cards.map(card => <StudyCard key={card.heading} card={card} headingLevel={subheading} />)}</div>
        <figure className={styles.evidence}>
          <PrismStudySurface tone="gold"><ol className={styles.nodes}>{e.discovery.chain.map((node, index) => <li key={node.label}>{index > 0 && <span className={styles.connector}><Arrow /></span>}<i className={`fa-thin ${node.icon}`} aria-hidden="true" /><div className={styles.nodeHeading}><span>{node.label}</span><strong>{node.heading}</strong></div><p>{node.body}</p></li>)}</ol></PrismStudySurface>
          <figcaption>{study.assets['P03-E'].caption}</figcaption>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="ai-research">
        <PrismStudyHeading id="ai-research" icon="fa-book-open" level={headingLevel}>{e.research.heading}</PrismStudyHeading>
        <div className={styles.proseColumns}><p>{e.research.intro}</p><p>{e.research.application}</p></div>
        <div className={styles.papers} id="ai-research-papers">{e.research.papers.map((paper, index) => <PrismStudySurface key={paper.id} tone={index === 0 ? 'sage' : index === 1 ? 'slate' : 'gold'} className={styles.paper}>
          <header><span className={styles.eyebrow}>{paper.date} · Research paper</span>
          <Subheading><a href={paper.url} target="_blank" rel="noreferrer">{paper.title}{' '}<Arrow external /><span className="sr-only"> (opens in a new tab)</span></a></Subheading>
          <p className={styles.note}>{paper.authors}</p></header>
          <blockquote><i className="fa-thin fa-quotes" aria-hidden="true" /><div><p>“{paper.quote}”</p><cite>{paper.location}</cite></div></blockquote>
          <p>{paper.finding}</p><p className={styles.implication}>{paper.application}</p><p className={styles.note}>{paper.limit}</p>
        </PrismStudySurface>)}</div>
        <p className={styles.sectionCopy}>The design reading connected those findings to the interface. <a href={e.research.articles[0].url} target="_blank" rel="noreferrer">Jakob Nielsen’s account of intent-based interaction</a> and <a href={e.research.articles[6].url} target="_blank" rel="noreferrer">Luke Wroblewski’s conversational interface explorations</a> helped frame the questions: how to show progress, expose sources, and give people controls around the answer.</p>
      </section>

      <section className={styles.section} aria-labelledby="ai-waiting">
        <PrismStudyHeading id="ai-waiting" icon="fa-stopwatch" level={headingLevel}>{e.waiting.heading}</PrismStudyHeading>
        <div className={styles.timings} id="ai-response-timings">{e.waiting.timings.map(item => <PrismStudySurface key={item.label} tone={item.tone as PrismTone} className={styles.timingCard}><i className={`fa-thin ${item.icon}`} aria-hidden="true" /><div><span>{item.label}</span><strong>{item.value}</strong></div></PrismStudySurface>)}</div>
        <p className={styles.note}>{e.waiting.measurementNote}</p>
        <div className={styles.proseColumns}><div>{e.waiting.paragraphs.slice(0, 2).map(text => <p key={text}>{text}</p>)}</div><div>{e.waiting.paragraphs.slice(2).map(text => <p key={text}>{text}</p>)}<p>{e.waiting.requirements}</p></div></div>
        <p className={styles.note}>{e.waiting.note}</p>
        <AIDemoEntry id="ai-customer-entry" icon="fa-comments" tone="plum" title="Customer response and recovery" body="Explore the proposed response states, replay the wait, and try the routes to help. The conversation uses sample content." action="Explore the customer experience" buttonRef={customerEntryRef} onOpen={() => openWorkspace('customer')} headingLevel={subheading} />
        <div className={styles.feedback} id="ai-feedback-flow">
          <div><Subheading>{e.originalDrafts.heading}</Subheading><p>{e.originalDrafts.intro}</p><p>{e.originalDrafts.review}</p></div>
          <div className={styles.cardStack}>{e.originalDrafts.steps.map(card => <StudyCard key={card.heading} card={card} headingLevel={subheading} stacked />)}</div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ai-review">
        <PrismStudyHeading id="ai-review" icon="fa-user" level={headingLevel}>{e.representative.heading}</PrismStudyHeading>
        <div className={styles.split}><div className={styles.cardStack} id="ai-representative-context">{e.representative.cards.map(card => <StudyCard key={card.heading} card={card} headingLevel={subheading} stacked />)}</div><div className={styles.cardStack}>{e.representative.priorities.map(card => <StudyCard key={card.label} card={card} headingLevel={subheading} stacked />)}</div></div>
        <AIDemoEntry id="ai-workspace-entry" icon="fa-table-columns" tone="slate" title="Requirements and future concepts" body={e.representative.demoNote} action={e.representative.cta} buttonRef={entryRef} onOpen={() => openWorkspace('service')} headingLevel={subheading} />
      </section>

      <section className={styles.section} aria-labelledby="ai-outcome">
        <PrismStudyHeading id="ai-outcome" icon="fa-chart-line" level={headingLevel}>{e.conclusion.heading}</PrismStudyHeading>
        <div className={styles.twoCards}><PrismStudySurface tone="sage"><Subheading>Delivered</Subheading><p>{e.conclusion.delivery}</p></PrismStudySurface><PrismStudySurface tone="slate"><Subheading>Observed use</Subheading><p>{e.conclusion.observed}</p></PrismStudySurface></div>
        <p className={styles.sectionCopy}>{e.conclusion.gap}</p><p className={`${styles.sectionCopy} ${styles.lesson}`}>{e.conclusion.lesson}</p><p className={styles.closing}>{e.conclusion.closing}</p>
      </section>
      {readingPage && <p><Link href="/#work">Back to case studies <Arrow /></Link></p>}
      <div className={styles.reading} id="ai-design-reading" data-prism-tone="slate">
        <ExperienceDisclosure company="design reading, 2023–2024" header={<header className="resume-experience-header">
          <i className="fa-thin fa-book-open" aria-hidden="true" />
          <div><Subheading>Design reading, 2023–2024</Subheading><span>{e.research.articles.length} articles</span></div>
        </header>}>
          <p>{e.research.periodNote}</p>
          <ul>{e.research.articles.map(article => <li key={article.url}><hr className="solid-center" aria-hidden="true" /><a href={article.url} target="_blank" rel="noreferrer">{article.title}{' '}<Arrow external /><span className="sr-only"> (opens in a new tab)</span></a><span>{article.author} · {article.date}</span><p>{article.note}</p></li>)}</ul>
        </ExperienceDisclosure>
      </div>
    </div>
  </article>
}
