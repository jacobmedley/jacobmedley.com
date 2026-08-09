import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Recruiter-portfolio chrome: a plain header/main/footer, linear scroll.
 * Deliberately NOT the public site's shell — no hero art, no fixed side
 * nav (NavMain), no wave separators. Fonts (TypeKit), FA Pro kit, and the
 * brand color tokens all come from the shared root layout/globals.css, so
 * this only adds structure, not a second design system.
 */
export default function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <div id="portfolio" className="flex min-h-screen flex-col bg-white text-fifth-dark">
      <header className="border-b border-fifth-light/40">
        <div className="container flex items-center justify-between py-6">
          <Link href="/portfolio/" className="flex items-center gap-3 no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element -- shared brand asset, matches CaseStudyModal usage */}
            <img
              src="/images/brand/SVG/jm-icon-full-brand-prime.svg"
              alt="Jacob Medley"
              width={40}
              height={40}
            />
            <span className="font-heading text-lg font-bold text-prime-dark">
              Jacob Medley <span className="font-normal text-fifth">— Portfolio</span>
            </span>
          </Link>
          <Link href="/" className="btn btn-second-dark rounded-full">
            <i className="fa-regular fa-arrow-left" aria-hidden="true" /> Main site
          </Link>
        </div>
      </header>

      <main className="container flex-1 py-12">{children}</main>

      <footer className="border-t border-fifth-light/40 py-6 text-center text-sm text-fifth">
        <div className="container">
          <p className="mb-0">
            © {new Date().getFullYear()} Jacob Medley. Private portfolio — not indexed, not for
            distribution.
          </p>
        </div>
      </footer>
    </div>
  )
}
