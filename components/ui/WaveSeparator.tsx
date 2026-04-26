interface WaveSeparatorProps {
  className?: string
}

export default function WaveSeparator({ className }: WaveSeparatorProps) {
  return (
    <div className={`overflow-hidden leading-none ${className ?? ''}`} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        className="block w-full h-12"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <use href="#gentle-wave" x="48" y="0" fill="currentColor" opacity="0.4" />
        <use href="#gentle-wave" x="48" y="3" fill="currentColor" opacity="0.6" />
        <use href="#gentle-wave" x="48" y="5" fill="currentColor" opacity="0.8" />
        <use href="#gentle-wave" x="48" y="7" fill="currentColor" />
      </svg>
    </div>
  )
}
