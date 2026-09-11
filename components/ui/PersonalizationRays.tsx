import type { CSSProperties } from 'react'

// Deliberately crossed at rest, with twelve exact 30-degree destinations.
const scattered = [23, -42, 118, 9, -74, 156, 46, -18, 102, -63, 31, 139]

export default function PersonalizationRays() {
  return <span className="personalization-rays">
    {scattered.map((angle, index) => <b key={index} style={{
      '--ray-index': index,
      '--ray-angle': `${angle}deg`,
      '--ray-target': `${index * 30}deg`,
      '--ray-x': `${((index * 41) % 119) - 59}px`,
      '--ray-y': `${((index * 67) % 149) - 74}px`,
    } as CSSProperties} />)}
  </span>
}
