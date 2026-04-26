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
      <main className="md:pl-[200px]">
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

        <footer className="bg-prime text-white py-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Jacob Medley. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}
