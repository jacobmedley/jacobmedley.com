import type { SupportingArtKind } from '@/lib/data/projects'

type ArtNode = { label: string; icon: string }

const ART: Record<SupportingArtKind, { eyebrow: string; center?: ArtNode; nodes: ArtNode[] }> = {
  'dental-platform': { eyebrow: 'Shared Platform', center: { label: 'Shared Platform', icon: 'fa-thin fa-diagram-project' }, nodes: [
    { label: 'Product Data', icon: 'fa-thin fa-database' }, { label: 'Search & API', icon: 'fa-thin fa-magnifying-glass' },
    { label: 'Promotions', icon: 'fa-thin fa-tags' }, { label: 'Deployment', icon: 'fa-thin fa-rocket-launch' }
  ] },
  'dental-mvp-one': { eyebrow: 'MVP 01', nodes: [
    { label: 'WordPress', icon: 'fa-thin fa-browser' }, { label: 'Bootstrap', icon: 'fa-thin fa-layer-group' },
    { label: 'Product', icon: 'fa-thin fa-box' }, { label: 'Cart', icon: 'fa-thin fa-cart-shopping' }
  ] },
  'dental-mvp-two': { eyebrow: 'MVP 02', nodes: [
    { label: 'Two Brands', icon: 'fa-thin fa-objects-column' }, { label: 'Shared Product Data', icon: 'fa-thin fa-database' },
    { label: 'Shared Cart', icon: 'fa-thin fa-cart-shopping' }
  ] },
  'dental-mvp-three': { eyebrow: 'MVP 03', nodes: [
    { label: 'Patterns', icon: 'fa-thin fa-grid-2' }, { label: 'Components', icon: 'fa-thin fa-cubes' },
    { label: 'Microservices', icon: 'fa-thin fa-network-wired' }, { label: 'Properties', icon: 'fa-thin fa-buildings' }
  ] },
  'dental-mvp-four': { eyebrow: 'MVP 04', nodes: [
    { label: 'ZIP', icon: 'fa-thin fa-location-dot' }, { label: 'Results', icon: 'fa-thin fa-list' },
    { label: 'Dentist Profile', icon: 'fa-thin fa-user-doctor' }
  ] },
  hydra: { eyebrow: 'Shared Vocabulary', center: { label: 'Shared Vocabulary', icon: 'fa-thin fa-language' }, nodes: [
    { label: 'Patterns', icon: 'fa-thin fa-grid-2' }, { label: 'Components', icon: 'fa-thin fa-cubes' },
    { label: 'Brands', icon: 'fa-thin fa-swatchbook' }, { label: 'Technology Stacks', icon: 'fa-thin fa-layer-group' }
  ] },
  'call-center': { eyebrow: 'Availability System', nodes: [
    { label: 'Site', icon: 'fa-thin fa-browser' }, { label: 'Status Check · 5 min', icon: 'fa-thin fa-clock' },
    { label: 'Call Center API', icon: 'fa-thin fa-headset' }, { label: 'State Response', icon: 'fa-thin fa-code-branch' },
    { label: 'Message + Offer', icon: 'fa-thin fa-message-dollar' }
  ] }
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
            <span className="study-supporting-art-center"><i className={art.center!.icon} />{art.center!.label}</span>
            <span className="study-supporting-art-orbit">
              {art.nodes.map((node) => <span key={node.label}><i className={node.icon} />{node.label}</span>)}
            </span>
          </>
        ) : (
          <div className="study-supporting-art-flow">
            {art.nodes.map((node, index) => (
              <span key={node.label}>
                <b><i className={node.icon} />{node.label}</b>
                {index < art.nodes.length - 1 && <i className="fa-thin fa-arrow-right study-supporting-art-arrow" />}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
