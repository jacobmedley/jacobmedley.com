import HomePathways from './HomePathways'
import WaveSeparator from '@/components/ui/WaveSeparator'
import KineticHeroIdentity from '@/components/ui/KineticHeroIdentity'

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
              <KineticHeroIdentity />

              <div className="hero-rule-wrap">
                <hr className="solid-center rule-heading" />
              </div>

              <a className="btn action-label mt-4 mb-4 hero-case-studies-link" href="#work" aria-label="Explore selected work">
                <span>Explore selected work</span>
                <i className="fa-thin fa-circle-arrow-down" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container"><HomePathways /></div>
      <WaveSeparator waveId="wave-hi" />
    </>
  )
}
