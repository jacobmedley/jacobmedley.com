import { CornerWaves } from '@/components/ui/QuietPrism'
import WaveSeparator from '@/components/ui/WaveSeparator'
import SectionHeader from '@/components/ui/SectionHeader'
import ExperienceDisclosure from '@/components/ui/ExperienceDisclosure'
import type { CSSProperties } from 'react'

const leadershipLeft = [
  {
    title: "AI product design",
    icon: 'fa-thin fa-brain',
    body: "I led experience research for a conversational assistant serving customers and internal teams. My work defined how it should respond, handle uncertainty, and get a person to the right help.",
  },
  {
    title: "Design systems",
    icon: 'fa-thin fa-layer-group',
    body: "I build shared foundations that let teams launch new products and brands without repeating the same design work. One platform supported five branded commerce sites.",
  },
]

const leadershipRight = [
  {
    title: "Business outcomes",
    icon: 'fa-thin fa-chart-line',
    body: "The commerce platform I led supported five properties. In one measured year, finance credited those properties with 47% of the company’s revenue growth.",
  },
  {
    title: "Conversion and experimentation",
    icon: 'fa-thin fa-flask',
    body: "I use research and testing to find where the experience loses people. That has included matching a landing page to the ad that brought someone there, and testing what customers need before they decide to buy.",
  },
]

const designLeadershipIntro = "A customer experience is capped by what the people delivering it can actually do. I follow the customer’s problem back through the teams, tools, and steps behind it. Sometimes the work is a product. Sometimes it is the team or system that needs to exist before the product can work. I have built all three."

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

// Text ported verbatim from components/section-resume.html
const experience: ExperienceEntry[] = [
  {
    company: 'Health-E Commerce, New York, NY (Remote)',
    logo: '/assets/references/hec-icon.svg',
    tone: 'health',
    highlighted: true,
    roles: [
      { title: 'Director of User and Experience Design', period: 'Feb 2026 to Present' },
      { title: 'Director of Design', period: 'Feb 2025 to Feb 2026' },
    ],
    paragraphs: [
      "I joined Health-E Commerce to rebuild creative operations and create an experience design practice. Four direct reports, a team of seven, and seven contractors across creative marketing, design systems, and UX. I redesigned intake and workflow around the problems the team needed to solve.\nDuring comparable peak seasons, creative output rose about 72% on 6.6% more production hours. Output per hour rose about 62%, and output per person about 48%. These are directional comparisons; some monthly output counts were extrapolated.",
      "After the department split, I built the company’s experience design practice. I defined its remit, created the first designer role, and hired into it. The team grew from one direct report to two full-time designers and a contractor.",
      "I owned the company Figma account and contract renewal as product and engineering added seats. A seat and usage audit made the case for treating Figma as a company-wide tool, moving its administration out of design. I own the tooling and research budget and propose the headcount the function needs.",
    ],
  },
  {
    company: 'Mutual of America Financial Group, Boca Raton, FL',
    logo: '/assets/references/moa-icon.svg',
    tone: 'mutual',
    roles: [{ title: 'Senior UX Designer', period: '2023 to 2025' }],
    paragraphs: [
      "I led experience research and scoping for one internally built conversational assistant with two deployments: an internal helper integrated with Salesforce, designed with a service designer, and a public assistant on the main website. Work with retirement and financial account information made accuracy, security, and escalation central to the design.",
      "I flagged hallucination risk during scoping and tested it with a data scientist. Asked for an account balance, the assistant returned a specific figure. The required response in that situation was a referral to an account manager. I traced the answer to a sample account statement in the source documentation.",
      "I wrote requirements for response feedback, system status, failures, escalation to human support, compliance alerts, and account and conversation summaries. I also specified how mixed source documents should be prepared before ingestion. Conduct mattered: the assistant was taking the opening minutes of a service conversation.",
      "I secured analytics on the public assistant. After release, the record showed early engagement followed by dropoff. Internal representatives cited accuracy and waiting as barriers to use. A subset of the interaction requirements had shipped.",
    ],
  },
  {
    company: 'One Park Financial, Coconut Grove, FL',
    logo: '/assets/featured/opf-icon-color.svg',
    tone: 'one-park',
    roles: [{ title: 'Director UX/UI & Product Design', period: '2021 to 2022' }],
    paragraphs: [
      'Design leadership inside the marketing organization, reporting to the SVP. Three contract reports covering engineering, visual design, and graphic design, with two full-time roles approved and in recruiting.',
      'Built the case for a unified pattern library and design system, then shipped it. Product, marketing, and engineering had been describing the same components three different ways. Delivery time halved, with work that had taken two sprints landing in one.',
      'The system was complete enough that the product ran for about a year afterward with no design resource, on one engineer and one product manager.',
      'Owned design process and set the usability testing practice. Worked with PPC, SEO, and affiliate channels on conversion rate strategy across acquisition funnels.',
    ],
  },
  {
    company: 'DentalPlans.com, Plantation, FL',
    logo: '/assets/featured/dentalplans-icon.svg',
    tone: 'dentalplans',
    roles: [{ title: 'Senior Manager of UX & UI Design / Product Manager', period: '2015 to 2021' }],
    paragraphs: [
      "The first property was a WordPress theme with sale pricing typed in by hand, one product at a time. It sold, and the company wanted four more. I brought a roadmap for shared brand settings, scheduled promotions, product and provider data, and deployment. A fully branded property went from six weeks to two. Five properties ran on it.\nI built and maintained the platform with a part-time offshore engineer. Four experience designers covered the properties.",
      "I led UX, UI, and front-end work across the commerce funnel. Source attribution meant the page said what the ad promised: promotion, copy, and messaging changed by traffic source, down to individual affiliate IDs. In one measured year, finance credited the properties with 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue. The company owned the custom platform.",
    ],
  },
  {
    company: 'Bluegreen Vacations, Boca Raton, FL',
    logo: '/assets/references/blue-green-dots.svg',
    tone: 'bluegreen',
    roles: [{ title: 'Senior Digital Designer', period: '2011 to 2015' }],
    paragraphs: [
      'I evaluated the digital signage platforms and designed the integration that connected them. Four Winds Interactive for signage and kiosks, Adobe Scene7 for dynamic media, Aprimo Marketing Studio for campaign operations, with WordPress in the middle as the authoring surface. Learning how each system expected to be fed, then designing a path through all four, was most of the work.',
      "Campaign content had to cover 48 resorts, four seasons, and several personas. I owned UX and UI for an approach using a central asset library and shared data, so content variants could be reused across properties. I worked with a PHP engineer, a data engineer, an outside consultant, and the marketing managers who would use it. The publishing tools had to work for people beyond the team that built them.",
    ],
  },
]

const mentorship = [
  'I walk beside junior staff, asking questions until they can name the next step, dependency, or piece they can move now.',
  'I make authority explicit. People can assess the risk and decide without bringing every next step back for permission.',
  'I stay available and remove blockers beyond their control.',
  'We review outcomes together. We change the conditions behind mistakes and understand good results well enough to repeat them.',
]

const expertise = [
  "Leadership: design practice, hiring, research operations, UX roadmapping, workshop leadership.",
  "Product: UX research, interaction design, information architecture, usability testing, conversion testing, accessibility and WCAG.",
  "Systems and craft: design systems, brand and visual design, prototyping, responsive interfaces, front-end development."
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
                <p className="resume-belief-slogan">There is always a better way, together we can find it.</p>
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
