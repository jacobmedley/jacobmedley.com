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
    title: "The Data Scientist’s Toolbox",
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
    <section className="bg-fourth-dark bg-gradient-bs text-white">
      <div className="content py-12">
        <div className="container">
          <div className="row">
            <div className="col-24 md:text-center mb-12">
              <SectionHeader
                title="Education"
                icon="fa-light fa-brain-circuit"
                iconClassName="text-fourth-light"
                titleClassName="text-fourth-light"
                light
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center">
            {educationItems.map((item, i) => (
              <div key={item.title} className="col">
                <div
                  className="card h-full rounded-[2rem] shadow-[var(--shadow-bs-lg)]"
                  /* legacy sets min-height:220px on the first seven cards only */
                  style={i < 7 ? { minHeight: 220 } : undefined}
                >
                  <div className="card-body text-fourth-dark">
                    <p>
                      <i className={`${item.icon} fa-2x mt-4`} aria-hidden="true" />
                    </p>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.source}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <a
                      className="stretched-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-fourth-dark">
                        <i className="fa-regular fa-eye" aria-hidden="true" /> View
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row text-center justify-center mt-12">
            <div className="col-24">
              <hr className="solid-center mt-12 light" />
            </div>
            <div className="col-24 mt-6 py-12">
              <a
                href="mailto:hi@jacobmedley.com"
                className="btn btn-lg btn-fourth-light rounded-full shadow-[var(--shadow-bs-lg)]"
              >
                <i className="fa-light fa-envelope" aria-hidden="true" /> hi@jacobmedley.com{' '}
                <i className="fa-thin fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
            <div className="col-24 mt-12 py-12">
              <p className="display-4 mb-0">
                <i className="fa-kit fa-jm-icon-full" aria-hidden="true" />
              </p>
              <p>© {year} by Jacob Medley</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
