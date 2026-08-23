import WaveSeparator from '@/components/ui/WaveSeparator'
import SectionHeader from '@/components/ui/SectionHeader'

const leadershipLeft = [
  {
    title: 'Design Systems',
    body: 'Built token foundations so brand identity became configuration instead of a build. One system carried five ecommerce properties, with one source of truth for products and providers behind all of them.',
  },
  {
    title: 'Accessibility',
    body: 'An automated auditing pipeline covering structure, landmarks, alt text, ARIA, keyboard operability, and rendered contrast. Per-page review dropped from days to hours, and it runs on a schedule against production.',
  },
  {
    title: 'Research and Measurement',
    body: 'Set a usability testing practice at ten participants per round and a HEART-based KPI framework, so design decisions rested on evidence and outcomes had a number to move.',
  },
  {
    title: 'AI Product Design',
    body: 'Led experience research and scoping for two LLM assistants in a regulated financial environment. Wrote the interaction specification: response timing against Nielsen and Doherty anchors, system status, failure states, and escalation paths.',
  },
]

const leadershipRight = [
  {
    title: 'Conversion and Experimentation',
    body: 'Ran conversion work as experiments with hypothesis standards and a defined read. Source attribution changed promotion, copy, and messaging by traffic source, down to individual affiliate IDs.',
  },
  {
    title: 'Business Outcomes',
    body: 'Systems work with numbers attached: 47% of company revenue growth in a single measured year, and a 66% reduction in launch time per property.',
  },
  {
    title: 'Design Leadership',
    body: 'Two design functions that did not exist before I got there. I hired into both, defined the practice, and set a review model that ends in decisions instead of opinions.',
  },
]

type ExperienceRole = {
  title: string
  period: string
}

type ExperienceEntry = {
  company: string
  roles: ExperienceRole[]
  paragraphs: string[]
}

// Text ported verbatim from components/section-resume.html
const experience: ExperienceEntry[] = [
  {
    company: 'Health-E Commerce, New York, NY (Remote)',
    roles: [
      { title: 'Director of User and Experience Design', period: 'Feb 2026 to Present' },
      { title: 'Director of Design', period: 'Feb 2025 to Feb 2026' },
    ],
    paragraphs: [
      'I joined Health-E Commerce to restructure creative marketing and build an experience design practice the company had never had. Four direct reports, a team of seven, and seven contractors across creative marketing, design systems, and UX. Rather than absorbing more requests, I applied systems thinking and UX research methods to find the right problems, then rebuilt intake, process, and creative operations around them. Peak season, the highest revenue period of the year, tested the operating model. Creative output rose about 70% year over year on a 6.6% increase in production hours. Assets per hour went up about 62% and assets per person about 48%. The gain came from rebuilt process and workflow, not proportional labor.',
      'Once creative operations held, we split the department. A new creative director took the creative team and I took everything else, moving full time to the experience design side, a function that had not existed. I defined the practice and the role, then hired the first XD designer into it. Started the year with one direct report and will finish it with three.',
      'Owned the company Figma account including contract renewal, through a large influx of product and engineering seats. After the split I kept everything outside the creative team, ran a seat and usage audit, and got Figma reclassified as a company-wide tool rather than a department one, moving a standing administrative load off design. Own the tooling and research budget and propose the headcount the function needs.',
    ],
  },
  {
    company: 'Mutual of America Financial Group, Boca Raton, FL',
    roles: [{ title: 'Senior UX Designer', period: '2023 to 2025' }],
    paragraphs: [
      'I led research and scoping for an internally built conversational assistant with two outputs: a Salesforce-integrated helper for service and account management representatives, built with a service designer, and a public assistant on the main website. Handling retirement and financial account data meant security, compliance, and accuracy governed every decision.',
      'I reviewed emerging research on LLM behavior and conversational patterns and partnered with a data scientist on the model and data layer. That research identified hallucination risk before it was widely understood. Testing confirmed it: asked for an account balance, the system returned a specific figure and supporting detail. The only compliant answer was to refer the customer to their account manager. I traced the cause to a sample account statement sitting in the training documentation.',
      'I defined the interaction requirements. Conduct came first, since the assistant stood in for the opening minutes of a service conversation. It had to stay courteous, stay useful, and never dead-end a customer. From there: response-time feedback built on the standard anchors, streaming responses, explicit system status and failure states, escalation into a live service channel or the right department, compliance alerting that flagged exposure in what internal users were sending, and account and chat history summaries so the assistant and the agent both opened with context. I specified ingestion quality as well, since the source corpus arrived as mixed PDFs, documents, spreadsheets, presentations, and raster images, and what an assistant knows is settled before any interface question.',
      'A subset of the requirements shipped. I secured tracking on the customer-facing assistant. The data showed early customer engagement followed by rapid dropoff correlated with response speed and friction, and internal adoption that stayed low, with representatives citing accuracy and wait.',
    ],
  },
  {
    company: 'One Park Financial, Coconut Grove, FL',
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
    roles: [{ title: 'Senior Manager of UX & UI Design / Product Manager', period: '2015 to 2021' }],
    paragraphs: [
      'The first property was a WordPress theme with sale pricing typed in by hand, one product at a time. It sold, and the company wanted four more. Cloning it was the obvious path, so I brought a roadmap instead: token-based theming, scheduled multi-phase promotions, one source of truth for products and providers, and one-button deploys per environment. Launch time for a fully branded property fell from six weeks to two. Five properties ran on it. Two people built and maintained the platform, and four experience designers covered every property on it.',
      "I led UX, UI, and front-end work across the LAMP stack, including the properties built with product partners. Source attribution meant the page said what the ad promised. Promotion, copy, and messaging changed based on where the visitor came from, down to individual affiliate IDs. In one measured year finance credited the properties with 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue. The platform was built and owned outright, with nothing licensed beneath it.",
    ],
  },
  {
    company: 'Bluegreen Vacations, Boca Raton, FL',
    roles: [{ title: 'Senior Digital Designer', period: '2011 to 2015' }],
    paragraphs: [
      'I evaluated the digital signage platforms and designed the integration that connected them. Four Winds Interactive for signage and kiosks, Adobe Scene7 for dynamic media, Aprimo Marketing Studio for campaign operations, with WordPress in the middle as the authoring surface. Learning how each system expected to be fed, then designing a path through all four, was most of the work.',
      "The wider effort built a 360 degree view of the customer across email, landing pages, and account management, driven by personas rather than by channel. Campaigns had to cover 48 resorts across four seasons and several personas at once, so variant content came out of a central asset library and a shared data layer instead of being rebuilt per property. I owned UX and UI and worked with a PHP engineer, a data engineer, an outside consultant, and marketing managers. The integration had to stay usable for a wide range of content creators and designers, not only for the people who built it.",
    ],
  },
]

const expertise = [
  'Design Thinking', 'Systems Thinking', 'User Experience Design', 'User Interface Design',
  'Interaction Design', 'Brand & Visual Design', 'Mobile-First & Responsive Design',
  'UX Roadmapping & Prioritization', 'User Testing', 'Facilitating Workshops',
  'A/B Testing & Planning', 'Conversion Rate Optimization', 'Wireframing', 'Prototyping',
  'Accessibility Standards (WCAG)', 'Designing for B2C & B2B', 'Design Systems',
  'Project Management',
  'Agile Workflows', 'Writing User Stories & Acceptance Criteria', 'Front-end Development',
  'HTML and CSS', 'Less and Sass', 'Bootstrap Framework',
]

const tools = [
  'Figma', 'Adobe XD', 'Adobe Creative Suite', 'FigJam', 'Miro', 'Balsamiq', 'Lucidchart',
  'Adobe Target', 'Optimizely', 'VWO', 'FullStory', 'SessionCam', 'Hotjar',
  'UserTesting.com', 'Userlytics', 'Google Analytics', 'New Relic', 'Splunk', 'Lighthouse',
  'ChatGPT', 'VS Code', 'Sublime Text', 'Jira', 'Asana', 'Bitbucket', 'GitHub', 'GitKraken',
]

function SkillList({ items }: { items: string[] }) {
  return (
    <ul className="fa-ul">
      {items.map((skill) => (
        <li key={skill}>
          <span className="fa-li">
            <i className="fa-regular fa-angle-right" aria-hidden="true" />
          </span>
          {skill}
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
          <SectionHeader title="Resume" icon="fa-light fa-fw fa-list-timeline" />

          <div className="row">
            <div className="col-24">
              <h3 className="mb-6">Design Leadership</h3>
              <div className="row">
                {[leadershipLeft, leadershipRight].map((column, i) => (
                  <div key={i} className="col-md-12">
                    <ul className="fa-ul">
                      {column.map((item) => (
                        <li key={item.title} className="mb-4">
                          <span className="fa-li">
                            <i className="fa-regular fa-angle-right" aria-hidden="true" />
                          </span>
                          <strong>{item.title}:</strong> {item.body}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 mb-12">
                <div className="row text-center">
                  <div className="col-24">
                    <hr className="solid-center w-1/4 mx-auto" />
                    <h2 className="py-4">
                      &ldquo;With the right team, anything is possible.
                      <br className="hidden md:block" /> Anything!&rdquo;
                    </h2>
                    <hr className="solid-center w-1/4 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-16">
              <h3 className="mb-6">Experience</h3>
              <div className="row">
                <div className="col-24">
                  {experience.map((job, i) => (
                    <div key={job.company}>
                      <p>
                        <strong>{job.roles[0].title}</strong>
                        <br />
                        {job.company}
                        <br />
                        <em>{job.roles[0].period}</em>
                        {job.roles.slice(1).map((role) => (
                          <span key={role.title}>
                            <br />
                            <strong>{role.title}</strong>
                            <br />
                            <em>{role.period}</em>
                          </span>
                        ))}
                      </p>
                      {job.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                      {i < experience.length - 1 && <hr className="solid-center my-12" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row">
                <div className="col-24">
                  <h3 className="mb-6">Expertise</h3>
                </div>
                <div className="col-24">
                  <SkillList items={expertise} />
                </div>
              </div>
              <div className="row">
                <div className="col-24">
                  <hr className="solid-center my-12" />
                  <h3 className="mb-6">Apps &amp; Tools</h3>
                </div>
                <div className="col-24">
                  <SkillList items={tools} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveSeparator waveId="wave-resume-bottom" className="bottom bottom-0" />
    </section>
  )
}
