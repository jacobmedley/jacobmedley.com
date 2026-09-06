import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies, caseStudyIntro } from '@/lib/data/case-studies'
import StudyCollection from '@/components/case-studies/StudyCollection'
import StudyVisual from '@/components/case-studies/StudyVisual'
import Arrow from '@/components/case-studies/Arrow'

export const metadata: Metadata = {
  title: 'Case Studies | Jacob Medley, Product Design Leader',
  description: caseStudyIntro.description,
  alternates: { canonical: 'https://jacobmedley.com/case-studies/' },
  openGraph: { title: 'The thinking behind the work. | Jacob Medley', description: caseStudyIntro.description, url: 'https://jacobmedley.com/case-studies/', type: 'website' },
}

export default function CaseStudiesPage() {
  const featured = caseStudies[0]
  const previews = caseStudies.map(({ slug, shortTitle, category, theme, visual, summary }) => ({ slug, shortTitle, category, theme, visual, summary }))

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="cs-index-hero cs-container">
        <div className="cs-hero-heading"><p className="cs-eyebrow"><span className="cs-status-dot" /> {caseStudyIntro.eyebrow}</p><h1>The thinking<br />behind the <span>work.</span></h1></div>
        <div className="cs-hero-aside"><p>{caseStudyIntro.description}</p><a className="cs-text-link" href="#selected-work">Explore the case studies <span aria-hidden="true">↓</span></a><div className="cs-color-signature" aria-hidden="true"><i /><i /><i /><i /><i /></div></div>
      </section>

      <section className="cs-container cs-featured-section" aria-labelledby="featured-title">
        <div className="cs-featured-label"><span className="cs-eyebrow">A closer look</span><span>01 / Platform thinking</span></div>
        <Link className="cs-featured cs-theme-plum" href={`/case-studies/${featured.slug}/`}>
          <div className="cs-featured-art" aria-hidden="true"><StudyVisual kind="platform" /></div>
          <div className="cs-featured-copy"><span className="cs-eyebrow">{featured.category}</span><h2 id="featured-title">One platform.<br />Five properties.</h2><p>{featured.summary}</p><div className="cs-featured-metric"><strong>6 <span>→</span> 2</strong><span>weeks to launch<br />a branded property</span></div><span className="cs-text-link">Inside the case study <Arrow /></span></div>
        </Link>
      </section>

      <StudyCollection studies={previews} />
      <section className="cs-perspective cs-container"><span className="cs-eyebrow">A through-line</span><p>“You create velocity by<br className="cs-desktop-break" /> making the work smaller.”</p><span className="cs-perspective-credit">Jacob Medley / From the platform case study</span></section>
    </main>
  )
}
