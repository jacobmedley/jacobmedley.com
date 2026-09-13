// Uses the main site's geometric fields and shared 140px frosted focal anchor.
import ThinkingConnections from '@/components/ui/ThinkingConnections'
import PersonalizationRays from '@/components/ui/PersonalizationRays'
import RoadmapMaze from '@/components/ui/RoadmapMaze'
import type { CSSProperties } from 'react'
const artwork: Record<string, { pattern: string; icon: string }> = {
  platform: { pattern: 'roadmap', icon: 'fa-layer-group' },
  practice: { pattern: 'workshops', icon: 'fa-lightbulb' },
  journey: { pattern: 'call-center-ux', icon: 'fa-headset' },
  navigation: { pattern: 'marketing-auto', icon: 'fa-bullseye-arrow' },
  tokens: { pattern: 'split-test', icon: 'fa-swatchbook' },
  decision: { pattern: 'personas', icon: 'fa-file-check' },
}

export default function StudyIconArt({ kind }: { kind: string }) {
  const art = artwork[kind] ?? artwork.platform
  return (
    <div className={`cs-icon-art thinking-art-${art.pattern}`} aria-hidden="true">
      <div className="thinking-geometry">
        {art.pattern === 'call-center-ux' ? <ThinkingConnections /> : null}
        {art.pattern === 'marketing-auto' ? <PersonalizationRays /> : null}
        {art.pattern === 'roadmap' ? <RoadmapMaze /> : null}
        {Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--layer': i } as CSSProperties} />)}
      </div>
      <div className="thinking-icon-anchor"><i className={`thinking-icon fa-thin ${art.icon}`} /></div>
    </div>
  )
}
