import WaveSeparator from '@/components/ui/WaveSeparator'

const metrics = [
  { value: '47%', label: 'New Sales' },
  { value: '20%', label: 'Company Revenue' },
  { value: '27%', label: 'Lead Generation' },
  { value: '66%', label: 'Reduction Project Timelines' },
]

export default function HeroSection() {
  return (
    <>
      <div className="w-full px-6 md:px-10 py-20 md:py-32 max-w-[var(--container-max)] mx-auto">
        <p
          className="font-semibold uppercase tracking-[0.2em] text-prime-light mb-3"
          style={{ fontSize: 'var(--text-eyebrow)' }}
        >
          Jacob Medley
        </p>

        <h1
          className="text-gradient-prime font-bold tracking-tight"
          style={{ fontSize: 'var(--text-display)' }}
        >
          Designing for Results
        </h1>

        <hr className="mt-6 mb-10 h-1 w-24 border-0 bg-prime rounded-full" />

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {metrics.map((m) => (
            <li key={m.value} className="flex flex-col items-start">
              <span
                className="text-prime font-bold leading-none"
                style={{ fontSize: 'var(--text-metric)' }}
              >
                {m.value}
              </span>
              <span className="mt-2 text-sm md:text-base text-second-dark max-w-[12ch]">
                {m.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <WaveSeparator className="text-second/10" />
    </>
  )
}
