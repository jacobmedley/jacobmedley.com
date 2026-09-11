import type { CSSProperties } from 'react'
import type { SupportingArtKind } from '@/lib/data/projects'

const ART: Record<SupportingArtKind, { eyebrow: string; center?: string; nodes: string[] }> = {
  'dental-platform': { eyebrow: 'Shared Platform', center: 'Shared Platform', nodes: ['Product Data', 'Search & API', 'Promotions', 'Deployment'] },
  'dental-mvp-one': { eyebrow: 'MVP 01', nodes: ['WordPress', 'Bootstrap', 'Product', 'Cart'] },
  'dental-mvp-two': { eyebrow: 'MVP 02', nodes: ['Two Brands', 'Shared Product Data', 'Shared Cart'] },
  'dental-mvp-three': { eyebrow: 'MVP 03', nodes: ['Patterns', 'Components', 'Microservices', 'Properties'] },
  'dental-mvp-four': { eyebrow: 'MVP 04', nodes: ['ZIP', 'Results', 'Dentist Profile'] },
  hydra: { eyebrow: 'Shared Vocabulary', center: 'Shared Vocabulary', nodes: ['Patterns', 'Components', 'Brands', 'Technology Stacks'] }
}

export default function StudySupportingArt({ kind, alt }: { kind: SupportingArtKind; alt: string }) {
  const art = ART[kind]
  const hub = Boolean(art.center)

  return (
    <div className={`study-supporting-art study-supporting-art-${hub ? 'hub' : 'flow'}`} role="img" aria-label={alt} data-supporting-art={kind}>
      <div className="study-supporting-art-grid" aria-hidden="true" />
      <p className="study-supporting-art-eyebrow" aria-hidden="true">{art.eyebrow}</p>
      <div className="study-supporting-art-diagram" aria-hidden="true">
        {hub ? (
          <>
            <span className="study-supporting-art-center">{art.center}</span>
            <span className="study-supporting-art-orbit">
              {art.nodes.map((node, index) => <span key={node} style={{ '--node': index } as CSSProperties}>{node}</span>)}
            </span>
          </>
        ) : (
          <div className="study-supporting-art-flow">
            {art.nodes.map((node, index) => (
              <span key={node}>
                <b>{node}</b>
                {index < art.nodes.length - 1 && <i className="fa-thin fa-arrow-right" />}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
