import WaveSeparator from '@/components/ui/WaveSeparator'

/**
 * Ports legacy #hi structure (components/section-hi.html) 1:1.
 */
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

              <h1 className="display-4 font-bold text-prime mt-0">Hello, I&apos;m Jacob Medley.</h1>
              <h2 className="display-2 text-prime">UX/UI Designer &amp; Digital Strategist</h2>

              <div className="py-3 w-1/4 mx-auto">
                <hr className="solid-center" />
              </div>

              <p className="display-1">
                I believe there&rsquo;s always a better way, and together we can find it. In this
                portfolio, you&rsquo;ll see highlights from my design journey so far. By
                collaborating with cross-functional teams and applying a creative, scrappy
                approach, I help scale products, create value, and drive business results.
              </p>

              <a className="btn btn-outline-prime-dark mt-4 mb-4 btn-lg rounded-full" href="#work">
                <i className="fa-regular fa-angle-down" aria-hidden="true" />
                <span className="sr-only">Scroll to case studies</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <WaveSeparator waveId="wave-hi" />
    </>
  )
}
