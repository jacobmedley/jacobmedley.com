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
            </div>
          </div>
        </div>
      </div>

      <WaveSeparator waveId="wave-hi" />
    </>
  )
}
