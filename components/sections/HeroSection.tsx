import WaveSeparator from '@/components/ui/WaveSeparator'

const stats = [
  { stat: '47%', label: 'New Sales' },
  { stat: '20%', label: 'Revenue' },
  { stat: '27%', label: 'Lead Generation' },
  { stat: '66%', label: 'Timeline Reduction' },
]

export default function HeroSection() {
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen py-24 px-8 md:px-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prime-light mb-3">
            Jacob Medley
          </p>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-gradient-prime mb-4">
            Designing for Results
          </h1>

          <h2 className="text-xl md:text-2xl text-second font-normal mb-6">
            UX/UI Designer &amp; Digital Strategist
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-gray-600 mb-10 max-w-lg">
            I believe there&rsquo;s always a better way, and together we can find it. By
            collaborating with cross-functional teams and applying a creative, scrappy approach,
            I help scale products, create value, and drive business results.
          </p>

          <hr className="border-prime/30 mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ stat, label }) => (
              <div key={label}>
                <p className="text-4xl md:text-5xl font-bold text-prime leading-none">{stat}</p>
                <p className="text-xs uppercase tracking-widest mt-2 text-second">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WaveSeparator className="text-second/10" />
    </>
  )
}
