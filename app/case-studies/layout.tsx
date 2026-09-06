import { StudyHeader, StudyFooter } from '@/components/case-studies/StudyShell'
import './case-studies.css'

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <div className="cs-site" id="top"><a href="#main-content" className="cs-skip-link">Skip to content</a><StudyHeader />{children}<StudyFooter /></div>
}
