import { CornerWaves } from '@/components/ui/QuietPrism'
import WaveSeparator from '@/components/ui/WaveSeparator'
import SectionHeader from '@/components/ui/SectionHeader'
import ExperienceDisclosure from '@/components/ui/ExperienceDisclosure'
import type { CSSProperties } from 'react'

const leadershipLeft = [
  {
    title: "Product judgment",
    icon: 'fa-thin fa-brain',
    body: "I led experience research for a conversational assistant. Accuracy, uncertainty, and the route to human support were product decisions, with consequences for the person asking the question.",
  },
  {
    title: "Shared systems",
    icon: 'fa-thin fa-layer-group',
    body: "I look for work the next project would otherwise repeat. Brand settings, common patterns, and reusable product data give teams a foundation they can use again.",
  },
]

const leadershipRight = [
  {
    title: "Evidence for decisions",
    icon: 'fa-thin fa-chart-line',
    body: "I use research and experimentation to examine a decision. Business results belong beside that work, with enough context to explain what changed and what was actually measured.",
  },
  {
    title: "People with authority",
    icon: 'fa-thin fa-flask',
    body: "I make ownership explicit. People should know which decisions they can make and where they need another owner. I stay available without becoming the approval path for every next step.",
  },
]

const designLeadershipIntro = "A customer experience is capped by what the people delivering it can actually do. I follow the problem back through the decisions and dependencies behind it. I set direction and ownership, then work on the conditions the team needs to deliver."

type ExperienceRole = {
  title: string
  period: string
}

type ExperienceEntry = {
  company: string
  roles: ExperienceRole[]
  paragraphs: string[]
  logo: string
  tone: string
  highlighted?: boolean
}

// B81/B106 website copy; formal roles and dates retain the reconciled records.
const experience: ExperienceEntry[] = [
  {
    company: 'Health-E Commerce, New York, NY (Remote)',
    logo: '/assets/references/hec-icon.svg',
    tone: 'health',
    highlighted: true,
    roles: [
      { title: 'Director of User and Experience Design', period: 'Feb 2026 to present' },
      { title: 'Director of Design', period: 'Feb 2025 to Feb 2026' },
    ],
    paragraphs: [
      "I joined to restructure creative marketing and build an experience design practice the company had never had. I led four direct reports within a team of seven, with seven contractors. I used systems thinking and UX research to find the problems worth solving, then rebuilt intake, workflow and creative operations around them.",
      "Peak-season reporting showed about 72% more creative output year over year, with a much smaller increase in production hours. This is a directional comparison of delivered work.",
      "When the department split, a new creative director took the creative team and I moved full time to experience design. I defined the role and hired into it, giving interface and experience decisions dedicated owners. The function grew from one designer to two full-time designers and a contractor.",
      "I owned the company Figma account and contract renewal as product and engineering added seats. A seat and usage audit made the case for treating Figma as a company-wide tool, moving its administration out of design. I own the tooling and research budget and propose the headcount the function needs."
    ],
  },
  {
    company: 'Mutual of America Financial Group, Boca Raton, FL',
    logo: '/assets/references/moa-icon.svg',
    tone: 'mutual',
    roles: [{ title: 'Senior UX Designer', period: '2023 to 2025' }],
    paragraphs: [
      "I led UX research and wrote interaction requirements for digital services in a regulated financial-services environment. I worked with design and technical specialists to review workflows, clarify requirements and test proposed experiences."
    ],
  },
  {
    company: 'One Park Financial, Coconut Grove, FL',
    logo: '/assets/featured/opf-icon-color.svg',
    tone: 'one-park',
    roles: [{ title: 'Director of UX/UI & Product Design', period: '2021 to 2022' }],
    paragraphs: [
      "I led design within marketing, reporting to the SVP.",
      "I built the case for a shared pattern library and design system, secured backing, and shipped it. Product, marketing, and engineering had been describing the same components in different ways. Work that had taken two sprints could land in one.",
      "The product later ran for about a year without a dedicated design resource.",
      "I owned the design process and set the usability-testing practice. I worked across paid search, organic search, and affiliate channels on conversion strategy for the acquisition funnels."
    ],
  },
  {
    company: 'DentalPlans.com, Plantation, FL',
    logo: '/assets/featured/dentalplans-icon.svg',
    tone: 'dentalplans',
    roles: [{ title: 'Senior Manager of UX & UI Design / Product Manager', period: '2015 to 2021' }],
    paragraphs: [
      "The first storefront had sale pricing typed in by hand, one product at a time. It sold, and the company wanted more properties. I brought a roadmap for shared brand settings, scheduled promotions, product and provider data, and deployment. A fully branded property went from six weeks to launch to two.",
      "I owned the core ecommerce framework and built and maintained it with a part-time engineer. Other designers launched the branded properties. Internal engineering built the microservices and APIs the framework connected to.",
      "I led UX, UI, and front-end work across the commerce funnel. Source attribution meant the page said what the ad promised: promotion, copy, and messaging changed by traffic source, down to individual affiliate IDs.",
      "Five properties ran on the platform. In one measured year, finance credited them with 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue. The company owned the custom platform."
    ],
  },
  {
    company: 'Bluegreen Vacations, Boca Raton, FL',
    logo: '/assets/references/blue-green-dots.svg',
    tone: 'bluegreen',
    roles: [{ title: 'Senior Digital Designer', period: '2011 to 2015' }],
    paragraphs: [
      "I evaluated the digital signage platforms and designed how the systems would connect. Four Winds Interactive handled signage and kiosks, Adobe Scene7 supplied dynamic media, and Aprimo Marketing Studio handled campaign operations. WordPress was the authoring surface.",
      "Campaign content had to cover 48 resorts, four seasons, and several personas. I owned UX and UI for an approach using a central asset library and shared data, so content variants could be reused across properties.",
      "The work involved a PHP engineer, a data engineer, an outside consultant, and the marketing managers who would use it. The publishing path had to make sense to people who had not built the integration."
    ],
  },
]

const mentorship = [
  "I walk beside junior staff, asking questions until they can name the next step, dependency, or piece they can move now.",
  "I make authority explicit. People can assess the risk and decide without bringing every next step back for permission.",
  "I stay available and remove blockers beyond their control.",
  "We review outcomes together. We change the conditions behind mistakes and understand good results well enough to repeat them."
]

const expertise = [
  "Leadership: design practice, coaching, hiring, research operations, UX roadmapping, and executive facilitation.",
  "Product: customer research, interaction design, information architecture, usability testing, conversion testing, and accessibility.",
  "Systems: design systems, shared commerce platforms, brand architecture, and delivery practices."
]

const tools = [
  "Design and collaboration: Figma, FigJam, Adobe Creative Suite, Miro.",
  "Research and experimentation: FullStory, Hotjar, UserTesting.com, Google Analytics, Optimizely, VWO, Adobe Target.",
  "Delivery: Jira, Asana, GitHub, VS Code."
]

function SkillList({ items, labelled = false }: { items: string[]; labelled?: boolean }) {
  return (
    <ul className="fa-ul">
      {items.map((skill) => (
        <li key={skill}>
          <span className="fa-li">
            <i className="fa-thin fa-angle-right" aria-hidden="true" />
          </span>
          {labelled ? <><strong>{skill.slice(0, skill.indexOf(':') + 1)}</strong>{skill.slice(skill.indexOf(':') + 1)}</> : skill}
        </li>
      ))}
    </ul>
  )
}

export default function ResumeSection() {
  return (
    <section className="bg-third-light bg-gradient-bs">
      <WaveSeparator position="top" waveId="wave-resume-top" />

      <div className="content">
        <div className="container">
          <SectionHeader title="About and experience" icon="fa-thin fa-fw fa-list-timeline" />

          <div className="row">
            <div className="col-24">
              <div className="resume-belief">
                <h3>How I lead the work</h3>
                <p className="resume-leadership-intro">{designLeadershipIntro}</p>
              </div>
              <hr className="solid-center resume-belief-divider" />
              <ul className="resume-leadership-grid">
                {[leadershipLeft[0], leadershipLeft[1], leadershipRight[0], leadershipRight[1]].map((item) => (
                  <li key={item.title}>
                    <span className="resume-value-icon" aria-hidden="true"><i className={item.icon} /></span>
                    <div><h4>{item.title}</h4><hr className="solid-center" /><p>{item.body}</p></div>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          <hr className="solid-center resume-experience-divider" />
          <div className="row resume-columns">
            <div className="col-24 resume-experience-column">
              <ol className="resume-timeline" aria-label="Experience">
                {experience.map((job) => (
                  <li className={`resume-timeline-entry resume-timeline-entry-${job.tone}${job.highlighted ? ' is-highlighted' : ''}`} key={job.company}>
                    <ExperienceDisclosure company={job.company} header={
                      <header className="resume-experience-header">
                        <span className="resume-company-mark" aria-hidden="true">
                          <span className="resume-brand-logo" style={{ '--resume-logo': `url("${job.logo}")` } as CSSProperties} />
                        </span>
                        <div className="resume-job-heading">
                          <p className="resume-experience-company">{job.company}</p>
                          <div className="resume-experience-roles">
                            {job.roles.map((role, index) => (
                              <p key={role.title} className={index > 0 ? 'resume-prior-role' : undefined}>
                                <strong>{role.title}</strong><em>{role.period}</em>
                              </p>
                            ))}
                          </div>
                        </div>
                      </header>
                    }>
                      {job.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </ExperienceDisclosure>
                  </li>
                ))}
              </ol>
            </div>

            <section className="resume-prism-practice" aria-label="Leadership, expertise and tools" data-motion-root data-atmosphere>
              <CornerWaves softened />
              <div className="resume-practice-column">
                <h3><i className="fa-thin fa-people-group" aria-hidden="true" /> Team Building and Mentorship</h3>
                <SkillList items={mentorship} />
              </div>
              <div className="resume-practice-column">
                <h3><i className="fa-thin fa-bullseye-arrow" aria-hidden="true" /> Expertise</h3>
                <SkillList items={expertise} labelled />
              </div>
              <div className="resume-practice-column">
                <h3><i className="fa-thin fa-screwdriver-wrench" aria-hidden="true" /> Apps &amp; Tools</h3>
                <p className="resume-tools-context">Tools used across these roles</p>
                <SkillList items={tools} labelled />
              </div>
            </section>
          </div>
        </div>
      </div>

      <WaveSeparator waveId="wave-resume-bottom" className="bottom bottom-0" />
    </section>
  )
}
