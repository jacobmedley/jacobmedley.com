import type { Metadata } from 'next'
import { caseStudies, caseStudyIntro, caseStudyOutcomes } from '@/lib/data/case-studies'
import StudyCollection from '@/components/case-studies/StudyCollection'
import CareerStats from '@/components/case-studies/CareerStats'
import './dashboard.css'

export const metadata: Metadata = {
  title: 'Case Studies | Jacob Medley, Product & Design Leader',
  description: caseStudyIntro.description,
  alternates: { canonical: 'https://jacobmedley.com/case-studies/' },
  openGraph: { title: 'The thinking behind the work. | Jacob Medley', description: caseStudyIntro.description, url: 'https://jacobmedley.com/case-studies/', type: 'website' },
}

export default function CaseStudiesPage() {
  const previews = caseStudies.map(({ slug, shortTitle, category, tags, theme, visual, summary }) => ({ slug, shortTitle, category, tags, theme, visual, summary }))

  return (
    <main id="main-content" className="cs-index" tabIndex={-1}>
      <section className="cs-index-hero cs-container">
        <div className="cs-hero-heading">
          <p className="cs-eyebrow">{caseStudyIntro.eyebrow}</p>
          <h1>The thinking<br />behind the <span>work.</span></h1>
          <a className="cs-button cs-button-outline" href="#selected-work">Explore the case studies <i className="fa-thin fa-chevron-down" aria-hidden="true" /></a>
          <p className="cs-hero-description">{caseStudyIntro.description}</p>
        </div>
        <CareerStats />
      </section>

      <StudyCollection studies={previews} outcomes={caseStudyOutcomes} />
      <section className="cs-perspective cs-container"><hr className="cs-perspective-rule" aria-hidden="true" /><p>“You create velocity by<br className="cs-desktop-break" /> making the work smaller.”</p><hr className="cs-perspective-rule" aria-hidden="true" /><span className="cs-perspective-credit">Jacob Medley // From the platform case study</span></section>
    </main>
  )
}
