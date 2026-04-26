import SectionHeader from '@/components/ui/SectionHeader'

const educationItems = [
  {
    icon: 'fa-light fa-graduation-cap',
    title: 'Degree in Digital Design',
    source: 'Full Sail University, Winter Park, Florida',
    url: 'https://www.fullsail.edu/',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'AI for Designers',
    source: 'Interaction Design Foundation (IDxF)',
    url: 'https://www.interaction-design.org/members/jacob-medley/certificate/course/1ad7ed0b-29c1-469c-b7f5-33a667742a51?certificateType=course',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'Design Patterns for AI UX',
    source: 'Interaction Design Foundation (IDxF)',
    url: 'https://www.interaction-design.org/members/jacob-medley/certificate/masterclass/mcc_e4727ae8f711444c86808940cbcd5d85',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'Micro-Usability: How to Design for Frictionless UX',
    source: 'Interaction Design Foundation (IDxF)',
    url: 'https://www.interaction-design.org/members/jacob-medley/certificate/masterclass/mcc_6df3907c7b334a35a200fa4ccf54b396',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'Customer Experience: Service Blueprinting',
    source: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/certificates/af9d4b98fedbda3d694ff953e161744abbab9d172b797cafbd833147de88d312',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'Hands-On with Design Systems',
    source: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/certificates/62a25dd45a4a798d8c27d6d36df0c2628f789b47103fab2d15a6b28d7965f5c6',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'Figma for UX Design',
    source: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/certificates/887ea326db7a6daf00b8cdc518fc26ce94fe9f862001804ae8de7c98c9485cb5',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'Figma Essential Training',
    source: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/certificates/80471654eb3eafc9528e253bd08e8557e220718f49c46bde684890efd5d8196d',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: "The Data Scientist's Toolbox",
    source: 'Johns Hopkins University',
    url: 'https://www.coursera.org/account/accomplishments/verify/3JE7KWFED4',
  },
  {
    icon: 'fa-light fa-file-certificate',
    title: 'Certificate of Membership',
    source: 'Interaction Design Foundation (IDxF)',
    url: 'https://www.interaction-design.org/members/jacob-medley/certificate/membership/mc_V0FMlS9wR',
  },
]

export default function EducationSection() {
  const year = new Date().getFullYear()

  return (
    <section className="bg-[#faf9fb] py-24 px-6 md:px-10">
      <div className="max-w-[var(--container-max)] mx-auto">
        <SectionHeader
          sectionId="education"
          title="Education"
          icon="fa-light fa-brain-circuit"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12">
          {educationItems.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-3xl shadow-xl bg-white text-fifth-dark hover:shadow-2xl hover:-translate-y-0.5 transition-all min-h-[220px] group"
            >
              <div className="flex-1 p-6 text-center flex flex-col items-center">
                <i className={`${item.icon} text-3xl mt-3 mb-4 text-fifth`} aria-hidden="true" />
                <h5 className="font-bold text-sm mb-2 leading-snug">{item.title}</h5>
                <p className="text-xs text-gray-500">{item.source}</p>
              </div>
              <div className="p-4 pt-0 text-center">
                <span className="text-fifth-dark text-xs flex items-center justify-center gap-1 group-hover:text-fifth-dark/70">
                  <i className="fa-regular fa-eye" aria-hidden="true" /> View
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-16">
          <hr className="border-fifth/20 mb-10" />
          <a
            href="mailto:hi@jacobmedley.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-fifth text-fifth hover:bg-fifth hover:text-white transition-colors"
          >
            <i className="fa-light fa-envelope" aria-hidden="true" />
            hi@jacobmedley.com
            <i className="fa-thin fa-arrow-right" aria-hidden="true" />
          </a>
          <div className="mt-12 py-8">
            <p className="text-5xl mb-2 text-fifth" aria-hidden="true">
              <i className="fa-kit fa-jm-icon-full" />
            </p>
            <p className="text-sm text-fifth/60">© {year} by Jacob Medley</p>
          </div>
        </div>
      </div>
    </section>
  )
}
