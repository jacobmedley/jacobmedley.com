import { BannerCard } from '@/components/ui/QuietPrism'

export default function HomePathways() {
  return <nav className="home-pathways" aria-label="Explore Jacob’s work and background">
    <BannerCard eyebrow="How I Work" title="Start with people, find a better way" description="I follow the customer’s problem through the teams, tools, and steps behind it." icon="fa-thin fa-briefcase" action="Read my approach" href="#resume" tone="gold" />
    <BannerCard eyebrow="Approach & Outcome" title="From insight to implementation" description="I turn research into practical solutions and work across disciplines to make them real." icon="fa-thin fa-list-timeline" action="See how I work" href="#full-stack" tone="green" />
    <BannerCard eyebrow="Experience" title="Across teams and contexts" description="Product, design, and systems work in a variety of environments." icon="fa-thin fa-list-timeline" action="Explore experience" href="#resume-experience-heading" tone="purple" />
    <BannerCard eyebrow="Education" title="Continuous learning" description="Formal education and ongoing professional development." icon="fa-thin fa-brain" action="View education" href="#education" tone="rose" />
  </nav>
}
