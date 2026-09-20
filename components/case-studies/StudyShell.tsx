import Link from 'next/link'
import { caseStudyIntro } from '@/lib/data/case-studies'

export function StudyHeader() {
  return (
    <header className="cs-header">
      <div className="cs-container cs-header-inner">
        <Link href="/" className="cs-wordmark" aria-label="Jacob Medley, home"><i className="cs-brand-icon fa-kit fa-jm-icon-full font-normal" aria-hidden="true" /><span>Jacob Medley<small>Product &amp; Design Leader</small></span></Link>
        <nav aria-label="Main navigation"><Link href="/case-studies/">Case Studies</Link><Link href="/#resume">About &amp; experience</Link></nav>
      </div>
    </header>
  )
}

export function StudyFooter() {
  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div className="cs-footer-top"><p>{caseStudyIntro.closing}</p><Link href="/#resume" className="cs-button">More about Jacob</Link></div>
        <div className="cs-footer-bottom"><Link href="/" className="action-label">Jacob Medley <span>{'//'} Product &amp; Design Leader</span></Link><a href="#top" className="action-label">Back to top <i className="fa-thin fa-arrow-up" aria-hidden="true" /></a></div>
      </div>
    </footer>
  )
}
