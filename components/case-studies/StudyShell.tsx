import Link from 'next/link'
import { caseStudyIntro } from '@/lib/data/case-studies'
import Arrow from './Arrow'

export function StudyHeader() {
  return (
    <header className="cs-header">
      <div className="cs-container cs-header-inner">
        <a href="/" target="_blank" rel="noopener noreferrer" className="cs-wordmark" aria-label="Jacob Medley, home (opens in a new tab)"><i className="cs-brand-icon fa-kit fa-jm-icon-full font-normal" aria-hidden="true" /><span>Jacob Medley<small>Product &amp; Design Leader <Arrow external /></small></span></a>
        <nav aria-label="Main navigation"><Link href="/case-studies/">Case Studies</Link><a href="/#resume" target="_blank" rel="noopener noreferrer">About &amp; experience <Arrow external /><span className="sr-only"> (opens in a new tab)</span></a></nav>
      </div>
    </header>
  )
}

export function StudyFooter() {
  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div className="cs-footer-top"><p>{caseStudyIntro.closing}</p><a href="/#resume" className="cs-button" target="_blank" rel="noopener noreferrer">More about Jacob <Arrow external /><span className="sr-only"> (opens in a new tab)</span></a></div>
        <div className="cs-footer-bottom"><a href="/" className="action-label" target="_blank" rel="noopener noreferrer">Jacob Medley <span>{'//'} Product &amp; Design Leader</span><Arrow external /><span className="sr-only"> (opens in a new tab)</span></a><a href="#top" className="action-label">Back to top <i className="fa-thin fa-arrow-up" aria-hidden="true" /></a></div>
      </div>
    </footer>
  )
}
