// Uses the main site's geometric fields and shared 140px frosted focal anchor.
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
      <div className="thinking-geometry">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
      <div className="thinking-icon-anchor"><i className={`thinking-icon fa-thin ${art.icon}`} /></div>
    </div>
  )
}
