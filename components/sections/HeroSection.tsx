import WaveSeparator from '@/components/ui/WaveSeparator'

export default function HeroSection() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[8rem] leading-none font-bold text-prime mb-0" aria-hidden="true">
            <i className="fa-kit fa-jm-icon-full font-normal" />
          </p>

          <h1 className="text-5xl font-bold text-prime mt-0">
            Hello, I&rsquo;m Jacob Medley.
          </h1>
          <h2 className="text-3xl text-prime mt-2">
            UX/UI Designer &amp; Digital Strategist
          </h2>

          <div className="py-6 w-1/4 mx-auto">
            <hr className="border-prime/40" />
          </div>

          <p className="text-xl leading-relaxed">
            I believe there&rsquo;s always a better way, and together we can find it. In this
            portfolio, you&rsquo;ll see highlights from my design journey so far. By collaborating
            with cross-functional teams and applying a creative, scrappy approach, I help scale
            products, create value, and drive business results.
          </p>

          <a
            href="#work"
            className="inline-flex items-center mt-8 mb-8 px-8 py-3 rounded-full border-2 border-prime-dark text-prime-dark hover:bg-prime-dark hover:text-white transition-colors"
            aria-label="View case studies"
          >
            <i className="fa-regular fa-angle-down" aria-hidden="true" />
          </a>
        </div>
      </div>

      <WaveSeparator className="text-second/20" />
    </div>
  )
}
