import { cn } from '@/lib/utils'

interface WaveSeparatorProps {
  /** 'top' rotates the wave 180° to cap the top of a section (legacy .waves-wrapper.top) */
  position?: 'top' | 'bottom'
  /** Unique per instance to avoid duplicate SVG defs ids */
  waveId?: string
}

/**
 * Legacy animated wave separator (scss .waves / .parallax). Fill colors
 * come from globals.css (.wave-one … .wave-four, with per-section
 * overrides under #visual-design and #resume).
 */
export default function WaveSeparator({ position = 'bottom', waveId = 'gentle-wave' }: WaveSeparatorProps) {
  return (
    <div className={cn('waves-wrapper', position === 'top' && 'top')} aria-hidden="true">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id={waveId}
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use href={`#${waveId}`} className="wave-four" x="48" y="0" />
          <use href={`#${waveId}`} className="wave-three" x="48" y="3" />
          <use href={`#${waveId}`} className="wave-two" x="48" y="5" />
          <use href={`#${waveId}`} className="wave-one" x="48" y="7" />
        </g>
      </svg>
    </div>
  )
}
