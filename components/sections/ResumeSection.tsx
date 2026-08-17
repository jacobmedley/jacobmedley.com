import WaveSeparator from '@/components/ui/WaveSeparator'
import SectionHeader from '@/components/ui/SectionHeader'

const leadershipLeft = [
  {
    title: 'Design Leadership',
    body: 'Directed cross-functional teams to create scalable design systems, ensuring consistency across digital ecosystems and delivering measurable business impact.',
  },
  {
    title: 'Strategic Vision',
    body: 'Aligned product and brand design with user needs and business objectives through comprehensive UX roadmaps and prioritized initiatives.',
  },
  {
    title: 'Inclusive Design Culture',
    body: 'Fostered a culture of collaboration and innovation by mentoring designers, promoting accessibility standards (WCAG), and encouraging experimentation.',
  },
  {
    title: 'Conversion Optimization',
    body: 'Spearheaded conversion rate optimization (CRO) strategies, enhancing user funnels and driving substantial increases in engagement and revenue.',
  },
  {
    title: 'SEO and Content Strategy',
    body: 'Developed SEO-optimized website structures, blending technical performance with engaging user experiences to boost search rankings and user retention.',
  },
]

const leadershipRight = [
  {
    title: 'AI-Powered Tools',
    body: 'Designed and implemented GPT/LLM-based products, including conversational chatbots and intelligent search tools, to improve customer engagement and operational efficiency.',
  },
  {
    title: 'Data-Driven Insights',
    body: 'Applied qualitative and quantitative research to inform design decisions, continuously iterating to exceed user expectations.',
  },
  {
    title: 'End-to-End Design Process',
    body: 'Managed all phases of design, from ideation and prototyping to testing and implementation, delivering seamless user experiences across web and mobile platforms.',
  },
  {
    title: 'Business-Centric Design',
    body: 'Built systems that delivered measurable business outcomes, including 47% of company revenue growth in a single measured year and a 66% reduction in launch time per property.',
  },
  {
    title: 'Collaboration & Alignment',
    body: 'Partnered with marketing, engineering, and product teams to deliver cohesive brand and product experiences across all touchpoints.',
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
      'I joined Health-E Commerce to restructure creative marketing and build an experience design practice the company had never had. Rather than absorbing more requests, I applied systems thinking and UX research methods to identify the right problems to solve, rebuilding intake, process, and creative operations around them. The systems and process work was put to the test during peak season, the highest revenue period of the year. Demand rose about 70% year over year. We met it with about a 7% increase in contractor headcount, and creative delivery held through the strongest peak in the company’s history.',
      'With creative operations stable, we split the department and I moved full time to building the experience design side of the business, a function that had not previously existed. I defined the practice and hired the company’s first dedicated XD/UX designer.',
    ],
  },
  {
    company: 'Mutual of America Financial Group, Boca Raton, FL',
    roles: [{ title: 'Sr. UX Designer', period: '2023 to 2025' }],
    paragraphs: [
      'I led research and scoping for an internally built conversational assistant with two outputs: a Salesforce-integrated helper for customer service and account management, and a customer-facing assistant on the public site. Handling retirement and financial account data meant security, compliance, and accuracy governed every decision.',
      'I reviewed emerging research on LLM behavior and conversational patterns and partnered with a data scientist on the model and data layer. That research identified hallucination risk before it was widely understood. Testing confirmed it: asked for an account balance, the system returned a specific figure and supporting detail. The only compliant answer was to refer the customer to their account manager. I traced the cause to a sample account statement sitting in the training documentation.',
      'I defined the interaction requirements. Conduct came first, since the assistant stood in for the opening minutes of a service conversation. It had to stay courteous, stay useful, and never dead-end a customer. From there: response-time feedback built on the standard anchors, streaming responses, explicit system status and failure states, escalation into a live service channel or the right department, compliance alerting that flagged exposure in what internal users were sending, and account and chat history summaries so the assistant and the agent both opened with context. I specified ingestion quality as well, since the source corpus arrived as mixed PDFs, documents, spreadsheets, presentations, and raster images, and what an assistant knows is settled before any interface question.',
      'A subset of the requirements shipped. I secured tracking on the customer-facing assistant. The data showed early customer engagement followed by rapid dropoff correlated with response speed and friction, and internal adoption that stayed low, with representatives citing accuracy and wait.',
    ],
  },
  {
    company: 'One Park Financial, Coconut Grove, FL',
    roles: [{ title: 'Director UX/UI & Product Design', period: '2021 to 2022' }],
    paragraphs: [
      'At One Park Financial, I oversaw and developed all design processes and workflows, establishing best practices for UX and UI design and usability testing. I collaborated with teams across marketing, product, and engineering, conducting workshops to drive problem-solving and innovation. Partnering with Channel Managers specializing in PPC, SEO, and Affiliate marketing, I helped establish their conversion rate optimization strategies to maximize user engagement and conversion rates.',
      'I evangelized the need for a design system, partnering with the SVP of Marketing to secure executive buy-in for the project. This led to the creation of the Hydra Design System, a unified pattern and component library. This empowered the company to design and engineer rapidly and "fail fast," improving business goals and user experience.',
    ],
  },
  {
    company: 'DentalPlans.com, Plantation, FL',
    roles: [{ title: 'Sr. Manager of UX & UI Design / Product Manager', period: '2015 to 2021' }],
    paragraphs: [
      'I pioneered a design system and code componentization at the company, fostering rapid development and refinement of product features and marketing strategies, crucial for our omnichannel eCommerce platforms. This approach, coupled with DevOps practices and product design for microservices, significantly boosted our testing and iteration capabilities, aligning with product design excellence and business growth.',
      "Leading UX/UI design and development, especially for projects involving product partners, I managed design and development for LAMP stack projects, driving remarkable financial growth. Delivered 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue in a single measured year. Built and owned outright, with no licensed platform beneath it.",
    ],
  },
  {
    company: 'Bluegreen Vacations, Boca Raton, FL',
    roles: [{ title: 'Sr. Digital Designer', period: '2011 to 2015' }],
    paragraphs: [
      'As the design lead, I contributed to the company-wide transition to a data-driven omnichannel marketing platform, incorporating digital signage across 48 resort locations and interactive kiosk interfaces. This role involved crafting engaging user experiences across various marketing platforms and channels, ensuring a seamless integration of digital and physical touchpoints.',
      "In collaboration with stakeholders, cross-functional teams, and external consultants, I played a key role in implementing and integrating a comprehensive marketing experience strategy. This strategy was focused on unifying our messaging and branding across all channels, including the innovative use of digital signage and interactive kiosks, to create a cohesive and dynamic customer journey. My leadership in this area was pivotal in enhancing customer engagement and reinforcing the company's presence in the competitive resort industry.",
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
