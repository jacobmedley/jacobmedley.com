import type { SupportingArtKind } from '@/lib/data/projects'
import { FeaturedAnchor } from './FeaturedArtwork'

type ArtNode = { label: string; icon: string; note?: string }
type ArtMode = 'ecosystem' | 'iteration' | 'mark' | 'flow'
type ArtDefinition = { eyebrow?: string; mode: ArtMode; center?: ArtNode; history?: ArtNode[]; nodes: ArtNode[] }

const MVP_FOUNDATION: ArtNode[] = [
  { label: 'WordPress', icon: 'fa-thin fa-browser' },
  { label: 'Bootstrap', icon: 'fa-thin fa-layer-group' },
  { label: 'Cart', icon: 'fa-thin fa-cart-shopping' }
]

const ITERATION_TWO_FOUNDATION: ArtNode[] = [
  ...MVP_FOUNDATION,
  { label: 'Two Brands', icon: 'fa-thin fa-objects-column' },
  { label: 'Shared Plan Data', icon: 'fa-thin fa-database' },
  { label: 'Shared Cart', icon: 'fa-thin fa-cart-shopping' }
]

const ITERATION_THREE_FOUNDATION: ArtNode[] = [
  ...ITERATION_TWO_FOUNDATION,
  { label: 'Patterns', icon: 'fa-thin fa-grid-2' },
  { label: 'Components', icon: 'fa-thin fa-cubes' },
  { label: 'Microservices', icon: 'fa-thin fa-network-wired' },
  { label: 'Properties', icon: 'fa-thin fa-buildings' }
]

const ART: Record<SupportingArtKind, ArtDefinition> = {
  'dental-platform': {
    mode: 'ecosystem',
    center: { label: 'Shared Platform', icon: 'fa-thin fa-diagram-project' },
    nodes: [
      { label: 'Plan Data', icon: 'fa-thin fa-database' },
      { label: 'Dentist Data', icon: 'fa-thin fa-user-doctor' },
      { label: 'Search & API', icon: 'fa-thin fa-magnifying-glass' },
      { label: 'Promotions', icon: 'fa-thin fa-tags' },
      { label: 'Deployment', icon: 'fa-thin fa-rocket-launch' }
    ]
  },
  'dental-mvp-one': { eyebrow: 'MVP', mode: 'iteration', nodes: [
    { label: 'WordPress', icon: 'fa-thin fa-browser', note: 'Manually added plans' },
    { label: 'Bootstrap', icon: 'fa-thin fa-layer-group' },
    { label: 'Cart', icon: 'fa-thin fa-cart-shopping' }
  ] },
  'dental-mvp-two': { eyebrow: 'Iteration 2', mode: 'iteration', history: MVP_FOUNDATION, nodes: [
    { label: 'Two Brands', icon: 'fa-thin fa-objects-column' }, { label: 'Shared Plan Data', icon: 'fa-thin fa-database' },
    { label: 'Shared Cart', icon: 'fa-thin fa-cart-shopping' }
  ] },
  'dental-mvp-three': { eyebrow: 'Iteration 3', mode: 'iteration', history: ITERATION_TWO_FOUNDATION, nodes: [
    { label: 'Patterns', icon: 'fa-thin fa-grid-2' }, { label: 'Components', icon: 'fa-thin fa-cubes' },
    { label: 'Microservices', icon: 'fa-thin fa-network-wired' }, { label: 'Properties', icon: 'fa-thin fa-buildings' }
  ] },
  'dental-mvp-four': { eyebrow: 'Iteration 4', mode: 'iteration', history: ITERATION_THREE_FOUNDATION, nodes: [
    { label: 'ZIP', icon: 'fa-thin fa-location-dot' }, { label: 'Results', icon: 'fa-thin fa-list' },
    { label: 'Dentist Profile', icon: 'fa-thin fa-user-doctor' }
  ] },
  hydra: { mode: 'mark', nodes: [] },
  'call-center': { eyebrow: 'Availability System', mode: 'flow', nodes: [
    { label: 'Site', icon: 'fa-thin fa-browser' }, { label: 'Status Check · 5 min', icon: 'fa-thin fa-clock' },
    { label: 'Call Center API', icon: 'fa-thin fa-headset' }, { label: 'State Response', icon: 'fa-thin fa-code-branch' },
    { label: 'Message + Offer', icon: 'fa-thin fa-message-dollar' }
  ] }
}

function Nodes({ nodes, connectors = false }: { nodes: ArtNode[]; connectors?: boolean }) {
  return <div className="study-supporting-art-flow">
    {nodes.map((node, index) => (
      <span key={node.label}>
        <b><i className={node.icon} />{node.label}{node.note && <small>{node.note}</small>}</b>
        {connectors && index < nodes.length - 1 && <i className="fa-thin fa-arrow-right study-supporting-art-arrow" />}
      </span>
    ))}
  </div>
}

function IterationDiagram({ art }: { art: ArtDefinition }) {
  return <div className="study-iteration">
    {art.history && (
      <div className="study-iteration-foundation">
        <strong>Platform to date</strong>
        <ul>
          {art.history.map((node) => <li key={node.label}><i className={node.icon} />{node.label}</li>)}
        </ul>
      </div>
    )}
    {art.history && <p className="study-iteration-added">Added in this iteration</p>}
    <Nodes nodes={art.nodes} />
  </div>
}

export default function StudySupportingArt({ kind, alt }: { kind: SupportingArtKind; alt: string }) {
  const art = ART[kind]

  return (
    <div className={`study-supporting-art study-supporting-art-is-${art.mode}`} role="img" aria-label={alt} data-supporting-art={kind}>
      {art.eyebrow && <p className="study-supporting-art-eyebrow" aria-hidden="true">{art.eyebrow}</p>}
      <div className="study-supporting-art-diagram" aria-hidden="true">
        {art.mode === 'ecosystem' && art.center ? (
          <div className="study-ecosystem">
            <strong className="study-ecosystem-center"><i className={art.center.icon} />{art.center.label}</strong>
            <i className="fa-thin fa-arrows-up-down study-ecosystem-bridge" />
            <div className="study-ecosystem-nodes">
              {art.nodes.map((node) => (
                <span className="study-ecosystem-node" key={node.label}>
                  <b><i className={node.icon} />{node.label}</b>
                </span>
              ))}
            </div>
          </div>
        ) : art.mode === 'mark' ? (
          <div className="study-hydra-mark"><FeaturedAnchor projectId="hydra" /></div>
        ) : art.mode === 'iteration' ? (
          <IterationDiagram art={art} />
        ) : (
          <Nodes nodes={art.nodes} connectors={art.mode === 'flow'} />
        )}
      </div>
    </div>
  )
}
