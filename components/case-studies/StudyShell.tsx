import Link from 'next/link'
import { caseStudyIntro } from '@/lib/data/case-studies'
import Arrow from './Arrow'

export function StudyHeader() {
  return (
    <header className="cs-header">
      <div className="cs-container cs-header-inner">
        <Link href="/" className="cs-wordmark" aria-label="Jacob Medley, home"><i className="cs-brand-icon fa-kit fa-jm-icon-full" aria-hidden="true" /><span>Jacob Medley<small>Product Design Leader</small></span></Link>
        <nav aria-label="Main navigation"><Link href="/case-studies/" aria-current="page">Case studies</Link><Link href="/#resume">About &amp; experience <Arrow diagonal /></Link></nav>
      </div>
    </header>
  )
}

export function StudyFooter() {
  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div className="cs-footer-top"><p>{caseStudyIntro.closing}</p><Link href="/#resume" className="cs-button">More about Jacob <Arrow /></Link></div>
        <div className="cs-footer-bottom"><Link href="/">Jacob Medley <span>/ Product Design Leader</span></Link><a href="#top">Back to top <i className="fa-regular fa-arrow-up" aria-hidden="true" /></a></div>
      </div>
    </footer>
  )
}
