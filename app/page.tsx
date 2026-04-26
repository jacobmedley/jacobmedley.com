import NavMain from '@/components/nav/NavMain'
import HeroSection from '@/components/sections/HeroSection'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection'
import VisualDesignSection from '@/components/sections/VisualDesignSection'
import ResumeSection from '@/components/sections/ResumeSection'
import EducationSection from '@/components/sections/EducationSection'

export default function Home() {
  return (
    <>
      <NavMain />
      <main className="lg:pl-[220px] pb-16 lg:pb-0">
        <section id="hi" className="bg-[#faf9fb]">
          <HeroSection />
        </section>

        <section id="work" className="bg-white">
          <CaseStudiesSection />
        </section>

        <section id="visual-design" className="bg-[#faf9fb]">
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
