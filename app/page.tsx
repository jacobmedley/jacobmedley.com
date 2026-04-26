import NavMain from '@/components/nav/NavMain'
import HeroSection from '@/components/sections/HeroSection'
import ResultsBanner from '@/components/sections/ResultsBanner'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection'
import VisualDesignSection from '@/components/sections/VisualDesignSection'
import ResumeSection from '@/components/sections/ResumeSection'
import EducationSection from '@/components/sections/EducationSection'

export default function Home() {
  return (
    <>
      <NavMain />
      <main className="md:pl-28">
        <section id="hi">
          <HeroSection />
        </section>

        <ResultsBanner />

        <section id="work">
          <CaseStudiesSection />
        </section>

        <section id="visual-design">
          <VisualDesignSection />
        </section>

        <section id="resume">
          <ResumeSection />
        </section>

        <section id="education">
          <EducationSection />
        </section>
      </main>
    </>
  )
}
