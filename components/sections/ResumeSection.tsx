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
    body: 'Created user-centered solutions that achieved business goals, such as increasing sales by 47% and reducing project timelines by 66%.',
  },
  {
    title: 'Collaboration & Alignment',
    body: 'Partnered with marketing, engineering, and product teams to deliver cohesive brand and product experiences across all touchpoints.',
  },
]

// Text ported verbatim from components/section-resume.html
const experience = [
  {
    title: 'Sr. UX Designer',
    company: 'Mutual of America Financial Group, Boca Raton, FL',
    period: '2023 to current',
    paragraphs: [
      'At Mutual of America, I collaborate with stakeholders and cross-functional teams to identify and resolve key user experience challenges. I lead strategic planning sessions and facilitate workshops to align design objectives and strategies. By defining user-centric epics and crafting detailed user stories and acceptance criteria for the main website, I ensure that our digital products meet and exceed user needs. I established best practices for A/B testing to inform design decisions and optimize usability. Additionally, I contributed to the design and development of a GPT/LLM conversational search application within Salesforce and the public websites.',
    ],
  },
  {
    title: 'Director UX/UI & Product Design',
    company: 'One Park Financial, Coconut Grove, FL',
    period: '2021 to 2022',
    paragraphs: [
      'At One Park Financial, I oversaw and developed all design processes and workflows, establishing best practices for UX and UI design and usability testing. I collaborated with teams across marketing, product, and engineering, conducting workshops to drive problem-solving and innovation. Partnering with Channel Managers specializing in PPC, SEO, and Affiliate marketing, I helped establish their conversion rate optimization strategies to maximize user engagement and conversion rates.',
      'I evangelized the need for a design system, partnering with the SVP of Marketing to secure executive buy-in for the project. This led to the creation of the Hydra Design System, a unified pattern and component library. This empowered the company to design and engineer rapidly and "fail fast," improving business goals and user experience.',
    ],
  },
  {
    title: 'Sr. Manager UX/UI Designer',
    company: 'DentalPlans.com, Plantation, FL',
    period: '2015 to 2021',
    paragraphs: [
      'I pioneered a design system and code componentization at the company, fostering rapid development and refinement of product features and marketing strategies, crucial for our omnichannel e-commerce platforms. This approach, coupled with DevOps practices and product design for microservices, significantly boosted our testing and iteration capabilities, aligning with product design excellence and business growth.',
      "Leading UX/UI design and development, especially for projects involving product partners, I managed design and development for LAMP stack projects, driving remarkable financial growth. These strategic initiatives resulted in over 47% of new revenue, 27% of total lead generation, and contributed to 20% of the company's overall revenue, highlighting the essential role of strategic product design and development in business expansion and profitability.",
    ],
  },
  {
    title: 'Sr. Digital Designer',
    company: 'Bluegreen Corp., Boca Raton, FL',
    period: '2011 to 2015',
    paragraphs: [
      'As the design lead, I contributed to the company-wide transition to a data-driven omnichannel marketing platform, incorporating digital signage across 48 resort locations and interactive kiosk interfaces. This role involved crafting engaging user experiences across various marketing platforms and channels, ensuring a seamless integration of digital and physical touchpoints.',
      "In collaboration with stakeholders, cross-functional teams, and external consultants, I played a key role in implementing and integrating a comprehensive marketing experience strategy. This strategy was focused on unifying our messaging and branding across all channels, including the innovative use of digital signage and interactive kiosks, to create a cohesive and dynamic customer journey. My leadership in this area was pivotal in enhancing customer engagement and reinforcing the company's presence in the competitive resort industry.",
    ],
  },
]

const expertise = [
  'Design Thinking', 'System Thinking', 'User Experience Design', 'User Interface Design',
  'Interaction Design', 'Brand & Visual Design', 'Mobile-First & Responsive Design',
  'UX Roadmapping & Prioritization', 'User Testing', 'Facilitating Workshops',
  'A/B Testing & Planning', 'Conversion Rate Optimization', 'Wireframing', 'Prototyping',
  'Accessibility Standards (WCAG)', 'Designing for B2C & B2B', 'Design Systems',
  'Mobile & Responsive Design', 'Accessibility Design', 'Project Management',
  'Agile Workflows', 'Writing User Stories & Acceptance Criteria', 'Front-end Development',
  'HTML and CSS', 'Less and Sass', 'Bootstrap Framework',
]

const tools = [
  'Figma', 'Adobe XD', 'Adobe Creative Suite', 'FigJam', 'Miro', 'Balsamiq', 'Lucid Chart',
  'Adobe Target', 'Optimizely', 'VWO', 'Fullstory', 'SessionCam', 'HotJar',
  'UserTesting.com', 'Userlytics', 'Google Analytics', 'Newrelic', 'Splunk', 'Lighthouse',
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
                      &ldquo;With the right team anything,
                      <br className="hidden md:block" /> is possible. Anything!&rdquo;
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
                    <div key={job.title}>
                      <p>
                        <strong>{job.title}</strong>
                        <br />
                        {job.company}
                        <br />
                        <em>{job.period}</em>
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
