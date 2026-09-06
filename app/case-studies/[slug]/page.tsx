import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudy } from '@/lib/data/case-studies'
import StudyVisual from '@/components/case-studies/StudyVisual'
import Arrow from '@/components/case-studies/Arrow'

const mobileSectionLabels: Record<string, string> = {
  problem: 'Problem',
  approach: 'Journey',
  solution: 'Solution',
  results: 'Results',
}

export const dynamicParams = false
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug)
  if (!study) return {}
  return { title: `${study.shortTitle} | Jacob Medley`, description: study.summary, alternates: { canonical: `https://jacobmedley.com/case-studies/${study.slug}/` }, openGraph: { title: study.shortTitle, description: study.summary, type: 'article', url: `https://jacobmedley.com/case-studies/${study.slug}/` } }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug)
  if (!study) notFound()
  const index = caseStudies.indexOf(study)
  const nextStudy = caseStudies[(index + 1) % caseStudies.length]

  return (
    <main id="main-content" tabIndex={-1} className={`cs-detail cs-theme-${study.theme}`}>
      <section className="cs-detail-hero cs-container">
        <Link href="/case-studies/" className="cs-back-link"><i className="fa-thin fa-arrow-left" aria-hidden="true" /> All case studies</Link>
        <div className="cs-detail-meta"><span className="cs-eyebrow">{study.category}</span><span>Case Study // {String(index + 1).padStart(2, '0')}</span></div>
        <h1>{study.title}</h1><p className="cs-detail-deck">{study.summary}</p>
        <dl className="cs-role-grid"><div><dt>My role</dt><dd>{study.role}</dd></div><div><dt>The scope</dt><dd>{study.scope}</dd></div><div><dt>Working together</dt><dd>{study.collaboration}</dd></div></dl>
      </section>

      <div className="cs-container"><div className="cs-detail-cover" aria-hidden="true"><StudyVisual kind={study.visual} /></div><p className="cs-figure-caption">Explanatory reconstruction of the approach, based on the project narrative.</p></div>

      <section className="cs-at-glance cs-container" aria-label="Case study at a glance">{['Problem', 'Solution', 'Result'].map((label, i) => <div key={label}><span className="cs-eyebrow">0{i + 1}{' // '}{label}</span><p>{study.atAGlance[i]}</p></div>)}</section>

      <div className="cs-story-layout cs-container">
        <aside className="cs-story-sidebar"><nav aria-label="In this case study"><span className="cs-eyebrow">In This Story</span>{study.sections.map((section, i) => <a href={`#${section.id}`} key={section.id}><span>0{i + 1}</span><span className="cs-nav-label-full">{section.label}</span><span className="cs-nav-label-mobile">{mobileSectionLabels[section.id] ?? section.label}</span></a>)}</nav><div className="cs-sidebar-note">{study.discipline}</div></aside>
        <article className="cs-story">
          {study.sections.map((section, i) => (
            <section className="cs-story-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
              <p className="cs-eyebrow">0{i + 1}{' // '}{section.label}</p><h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.decision && <div className="cs-decision-callout"><span className="cs-eyebrow">The Decision</span><p>{section.decision}</p></div>}
              {section.points && <ul className="cs-solution-points">{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              {section.id === 'results' && <dl className="cs-results-grid">{study.proof.map((proof) => <div key={proof.value}><dt>{proof.value}</dt><dd>{proof.label}</dd></div>)}</dl>}
              {section.takeaway && <blockquote>{section.takeaway}</blockquote>}
            </section>
          ))}
        </article>
      </div>

      <section className="cs-next-study cs-container" aria-label="Continue reading"><span className="cs-eyebrow">Next Case Study</span><Link href={`/case-studies/${nextStudy.slug}/`}><div><span>{nextStudy.category}</span><h2>{nextStudy.shortTitle}</h2></div><span className="cs-open-circle"><Arrow /></span></Link><Link className="cs-text-link" href="/case-studies/">View all case studies <Arrow /></Link></section>
    </main>
  )
}
