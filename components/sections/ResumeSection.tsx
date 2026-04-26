import WaveSeparator from '@/components/ui/WaveSeparator'
import SectionHeader from '@/components/ui/SectionHeader'

const leadershipLeft = [
  {
    title: 'Design Leadership',
    body: 'Directed cross-functional teams to create scalable design systems, ensuring consistency across digital ecosystems and delivering measurable business impact.',
  },
  {
    title: 'Strategic Vision',
    body: "Aligned product and brand design with user needs and business objectives through comprehensive UX roadmaps and prioritized initiatives.",
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

const experience = [
  {
    title: 'Sr. UX Designer',
    company: 'Mutual of America Financial Group',
    location: 'Boca Raton, FL',
    period: '2023 to current',
    paragraphs: [
      'At Mutual of America, I collaborate with stakeholders and cross-functional teams to identify and resolve key user experience challenges. I lead strategic planning sessions and facilitate workshops to align design objectives and strategies. By defining user-centric epics and crafting detailed user stories and acceptance criteria for the main website, I ensure that our digital products meet and exceed user needs. I established best practices for A/B testing to inform design decisions and optimize usability. Additionally, I contributed to the design and development of a GPT/LLM conversational search application within Salesforce and the public websites.',
    ],
  },
  {
    title: 'Director UX/UI & Product Design',
    company: 'One Park Financial',
    location: 'Coconut Grove, FL',
    period: '2021 to 2022',
    paragraphs: [
      'At One Park Financial, I oversaw and developed all design processes and workflows, establishing best practices for UX and UI design and usability testing. I collaborated with teams across marketing, product, and engineering, conducting workshops to drive problem-solving and innovation. Partnering with Channel Managers specializing in PPC, SEO, and Affiliate marketing, I helped establish their conversion rate optimization strategies to maximize user engagement and conversion rates.',
      'I evangelized the need for a design system, partnering with the SVP of Marketing to secure executive buy-in for the project. This led to the creation of the Hydra Design System, a unified pattern and component library. This empowered the company to design and engineer rapidly and "fail fast," improving business goals and user experience.',
    ],
  },
  {
    title: 'Sr. Manager UX/UI Designer',
    company: 'DentalPlans.com',
    location: 'Plantation, FL',
    period: '2015 to 2021',
    paragraphs: [
      'I pioneered a design system and code componentization at the company, fostering rapid development and refinement of product features and marketing strategies, crucial for our omnichannel e-commerce platforms. This approach, coupled with DevOps practices and product design for microservices, significantly boosted our testing and iteration capabilities, aligning with product design excellence and business growth.',
      'Leading UX/UI design and development, especially for projects involving product partners, I managed design and development for LAMP stack projects, driving remarkable financial growth. These strategic initiatives resulted in over 47% of new revenue, 27% of total lead generation, and contributed to 20% of the company\'s overall revenue, highlighting the essential role of strategic product design and development in business expansion and profitability.',
    ],
  },
  {
    title: 'Sr. Digital Designer',
    company: 'Bluegreen Corp.',
    location: 'Boca Raton, FL',
    period: '2011 to 2015',
    paragraphs: [
      'As the design lead, I contributed to the company-wide transition to a data-driven omnichannel marketing platform, incorporating digital signage across 48 resort locations and interactive kiosk interfaces. This role involved crafting engaging user experiences across various marketing platforms and channels, ensuring a seamless integration of digital and physical touchpoints.',
      'In collaboration with stakeholders, cross-functional teams, and external consultants, I played a key role in implementing and integrating a comprehensive marketing experience strategy focused on unifying messaging and branding across all channels.',
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

export default function ResumeSection() {
  return (
    <section className="bg-white">
      <div className="py-24 px-4">
        <div className="container mx-auto">
          <SectionHeader title="Resume" icon="fa-light fa-list-timeline" className="mb-12" />

          <h3 className="text-2xl font-bold mb-6">Design Leadership</h3>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <ul className="space-y-4">
              {leadershipLeft.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <i className="fa-regular fa-angle-right mt-1 shrink-0 text-third" aria-hidden="true" />
                  <span><strong>{item.title}:</strong> {item.body}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {leadershipRight.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <i className="fa-regular fa-angle-right mt-1 shrink-0 text-third" aria-hidden="true" />
                  <span><strong>{item.title}:</strong> {item.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center my-12">
            <hr className="w-1/4 mx-auto border-current opacity-20 mb-6" />
            <h2 className="text-3xl py-3">
              &ldquo;With the right team anything, is possible. Anything!&rdquo;
            </h2>
            <hr className="w-1/4 mx-auto border-current opacity-20 mt-6" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6">Experience</h3>
              <div className="space-y-8">
                {experience.map((job, i) => (
                  <div key={job.title}>
                    <p className="mb-3">
                      <strong>{job.title}</strong>
                      <br />
                      {job.company}, {job.location}
                      <br />
                      <em>{job.period}</em>
                    </p>
                    {job.paragraphs.map((p, j) => (
                      <p key={j} className="leading-relaxed mb-3">{p}</p>
                    ))}
                    {i < experience.length - 1 && (
                      <hr className="mt-8 border-current opacity-20" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Expertise</h3>
              <ul className="space-y-1 mb-8">
                {expertise.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm">
                    <i className="fa-regular fa-angle-right text-third shrink-0" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>

              <hr className="my-8 border-current opacity-20" />

              <h3 className="text-2xl font-bold mb-6">Apps &amp; Tools</h3>
              <ul className="space-y-1">
                {tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-sm">
                    <i className="fa-regular fa-angle-right text-third shrink-0" aria-hidden="true" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WaveSeparator className="text-fourth-dark" />
    </section>
  )
}
