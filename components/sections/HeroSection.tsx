import WaveSeparator from '@/components/ui/WaveSeparator'

/**
 * Legacy #hi structure (components/section-hi.html) with the confirmed
 * design change: headline "Designing for Results" and the four metric
 * blocks inline in the hero row (formerly a separate banner section).
 */
const metrics = [
  { value: '47%', direction: 'up', label: <>New Sales</> },
  {
    value: '20%',
    direction: 'up',
    label: (
      <>
        <span className="hidden lg:inline">Company </span>Revenue
      </>
    ),
  },
  {
    value: '27%',
    direction: 'up',
    label: (
      <>
        Lead Gen<span className="hidden lg:inline">eration</span>
      </>
    ),
  },
  { value: '66%', direction: 'down', label: <>Reduction Project Timelines</> },
] as const

export default function HeroSection() {
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row text-center justify-center row-content">
            <div className="col-24 col-lg-14 self-center">
              <p className="display-12 font-bold text-prime mb-0 h-jakeicon">
                <i className="fa-kit fa-jm-icon-full font-normal" aria-hidden="true" />
              </p>

              <h1 className="display-4 font-bold text-prime mt-0">Designing for Results</h1>
              <h2 className="display-2 text-prime">UX/UI Designer &amp; Digital Strategist</h2>

              <div className="py-4 w-1/4 mx-auto">
                <hr className="solid-center" />
              </div>

              <p className="display-1">
                I believe there&rsquo;s always a better way, and together we can find it. In this
                portfolio, you&rsquo;ll see highlights from my design journey so far. By
                collaborating with cross-functional teams and applying a creative, scrappy
                approach, I help scale products, create value, and drive business results.
              </p>

              <a className="btn btn-outline-prime-dark mt-6 mb-6 btn-lg rounded-full" href="#work">
                <i className="fa-regular fa-angle-down" aria-hidden="true" />
                <span className="sr-only">Scroll to case studies</span>
              </a>
            </div>

            <div className="col-24 self-start text-prime-dark">
              <div className="row row-cols-2 row-cols-lg-4 text-center justify-center g-3">
                {metrics.map((m) => (
                  <div className="col" key={m.value}>
                    <h4 className="mb-0 display-4 font-bold">
                      {m.value}
                      <small>
                        <i
                          className={`display-2 text-prime-dark fa-regular fa-long-arrow-${m.direction}`}
                          aria-hidden="true"
                        />
                      </small>
                    </h4>
                    <p className="mt-0">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveSeparator waveId="wave-hi" />
    </>
  )
}
