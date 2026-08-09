import NavMain from '@/components/nav/NavMain'
import HeroSection from '@/components/sections/HeroSection'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection'
import FullStackSection from '@/components/sections/FullStackSection'
import ResumeSection from '@/components/sections/ResumeSection'
import EducationSection from '@/components/sections/EducationSection'

// Mirrors legacy index.html: #hi is a section.row-content; the other
// anchors are div wrappers whose inner <section> (with its background)
// comes from the component.
export default function Home() {
  return (
    <>
      <NavMain />

      <section id="hi" className="row-content">
        <HeroSection />
      </section>

      <div id="work">
        <CaseStudiesSection />
      </div>

      <div id="full-stack">
        <FullStackSection />
      </div>

      <div id="resume">
        <ResumeSection />
      </div>

      <div id="education">
        <EducationSection />
      </div>
    </>
  )
}
