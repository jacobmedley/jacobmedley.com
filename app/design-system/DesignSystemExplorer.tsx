'use client'

import { CSSProperties, useState } from 'react'
import Link from 'next/link'
import ExperienceDisclosure from '@/components/ui/ExperienceDisclosure'
import WaveSeparator from '@/components/ui/WaveSeparator'
import { BannerCard, CornerWaves, DirectionalArrow } from '@/components/ui/QuietPrism'
import prismStyles from '@/components/ui/QuietPrism.module.css'
import styles from './design-system.module.css'

type PreviewState = 'default' | 'hover' | 'focus' | 'active' | 'reduced'

const states: { id: PreviewState; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'hover', label: 'Hover' },
  { id: 'focus', label: 'Focus' },
  { id: 'active', label: 'Active' },
  { id: 'reduced', label: 'Reduced motion' },
]

const primitives = [
  ['Prism Field', 'Atmospheric tint behind content', 'body Quiet Prism tokens; .cs-index::before', '--prism-blue, --prism-green, --prism-gold, --prism-rose'],
  ['Crossing Tide', 'Broad section transition', 'WaveSeparator; .waves-wrapper, .parallax', 'MAIN_WAVE_PATH'],
  ['Corner Current', 'Corner-anchored layered wave', 'CornerWaves; .cornerTop, .cornerBottom', '--card-wave'],
  ['Frost Pane', 'Translucent reading layer', '.featuredCopy; .cs-featured-copy', 'quiet-prism-frost, backdrop-filter'],
  ['Inset Light Edge', 'Single clipped light edge', '.edgeShine; .featuredCopy::after', '--atmosphere-shine'],
  ['Tint Edge', 'Tone-aware diagonal hairline', '.modal-*-card::after', '--featured-ink'],
  ['Ribbon Rule', 'Centered fading divider', '--surface-rule; .solid-center', '--rule-max-width'],
  ['Quiet Label', 'Low-volume eyebrow or context', '.eyebrow; .cs-eyebrow', '--prism-purple'],
  ['Discipline Pebble', 'Compact discipline metadata', '.portfolio-badges; .cs-badges', '--featured-ink'],
  ['Context Medallion', 'Circular icon anchor', '.bannerContext; .thinking-icon-anchor', '--nested-icon-size'],
  ['Trail Arrow', 'Directional action cue', 'DirectionalArrow; .cs-arrow', '--prism-card-arrow'],
  ['Focus Halo', 'Keyboard focus boundary', '.featuredCard:has(:focus-visible); .banner:focus-visible', '--focus-tone'],
] as const

const families = [
  ['Spotlight Split', 'Featured homepage work card', 'WorkCard; .featuredCard, .featured-work-card'],
  ['Signal Tile', 'Four-tone information or pathway card', 'BannerCard; .banner.{gold|green|purple|rose}'],
  ['Process Tile', 'How I work project card', 'FullStackSection; .thinking-thumb'],
  ['Role Ledger', 'Expandable employment record', 'ExperienceDisclosure; .resume-experience-card'],
  ['Practice Stack', 'Leadership, expertise and tools surface', 'ResumeSection; .resume-prism-practice'],
  ['Credential Shard', 'Intrinsic-height education card', 'EducationSection; .education-card'],
  ['Outcome Tile', 'Metric and qualitative outcome card', 'CareerStats / OutcomeDashboard; .cs-stat, .cs-outcome-card'],
  ['Story Slate', 'Dedicated case-study index card', 'StudyCollection; .cs-study-card'],
] as const

const modalPatterns = [
  ['Reading Sheet', '.modal-content, .modal-body', 'Scrollable dialog shell and reading focus target'],
  ['Section Plaque', '.modal-section-heading', 'Icon and heading pair'],
  ['Evidence Cluster', '.modal-info-card-grid, .modal-info-card', 'Responsive evidence list'],
  ['Metric Lens', '.modal-metric-card', 'Centered measured result'],
  ['Value Sheet', '.modal-value-card', 'Outcome or value list'],
  ['Data Bay', '.modal-data-panel, .modal-data-grid', 'Grouped evidence and metrics'],
] as const

function MappingTable({ rows }: { rows: readonly (readonly string[])[] }) {
  return <div className={styles.tableWrap}><table><thead><tr><th>Name</th><th>Use</th><th>Source</th>{rows[0]?.length === 4 ? <th>Token</th> : null}</tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={cell}>{i === 0 ? <strong>{cell}</strong> : <code>{cell}</code>}</td>)}</tr>)}</tbody></table></div>
}

function FeaturedSpecimen() {
  const tone = {
    '--featured-light': '#edf7fc', '--featured-mid': '#dcecf4', '--featured-dark': '#b9d9e8', '--featured-ink': '#36566b',
  } as CSSProperties
  return <article className={`${prismStyles.featuredCard} featured-work-card ${styles.featuredDemo}`} style={tone} data-motion-root data-atmosphere>
    <CornerWaves both />
    <div className={`${prismStyles.featuredArt} featured-work-art`}>
      <span className={styles.orbit} aria-hidden="true"><i className="fa-thin fa-compass-drafting" /></span>
      <div className={prismStyles.featuredIdentity}><p className={prismStyles.eyebrow}>Case Study</p><h3>Spotlight Split</h3><p>Open field, anchored identity.</p></div>
    </div>
    <div className={`${prismStyles.featuredCopy} featured-work-copy`}>
      <div className={prismStyles.featuredMeta}><div className="portfolio-badges"><span>Systems</span><span>Product</span></div><span className={prismStyles.featuredExternal}><i className="fa-thin fa-book-open" /></span></div>
      <div className="featured-work-heading"><h3 className="h2">A focal card with a reading pane</h3></div>
      <p className="featured-work-summary">The art field carries atmosphere. The pane carries the decision.</p>
      <div className={prismStyles.featuredFooter}><span className={prismStyles.featuredLink}>View <DirectionalArrow /></span><span>Featured family</span></div>
      <button className="featured-work-open" type="button" aria-label="Inspect Spotlight Split specimen" />
    </div>
  </article>
}

export default function DesignSystemExplorer() {
  const [state, setState] = useState<PreviewState>('default')
  return <main className={styles.page} data-preview-state={state} id="main-content">
    <header className={styles.hero}>
      <Link className={styles.back} href="/">Jacob Medley <span>Home</span></Link>
      <p className={styles.kicker}>Visual system reference // Local baseline 4c2e482</p>
      <h1>Quiet Prism</h1>
      <p className={styles.dek}>A field guide to the surfaces, edges, cards, actions and motion already in use across JacobMedley.com.</p>
      <nav className={styles.jump} aria-label="Design system sections"><a href="#primitives">Primitives</a><a href="#cards">Cards</a><a href="#states">States</a><a href="#modal">Modal patterns</a><a href="#source-map">Source map</a></nav>
    </header>

    <WaveSeparator className={styles.wave} />

    <section className={styles.section} id="primitives">
      <div className={styles.sectionIntro}><p>01 // Foundations</p><h2>Primitives with handles</h2><span>The names are new. The visual behavior is not.</span></div>
      <div className={styles.primitiveGrid}>
        <article className={`${styles.primitive} ${styles.field}`}><span>Prism Field</span><strong>Atmosphere without a box.</strong></article>
        <article className={`${styles.primitive} ${styles.frost}`}><span>Frost Pane</span><strong>Content stays legible while color survives behind it.</strong></article>
        <article className={`${styles.primitive} ${styles.edge}`}><span>Inset Light Edge</span><strong>One clipped edge. No stacked masks.</strong></article>
        <article className={`${styles.primitive} ${styles.corner}`}><CornerWaves /><span>Corner Current</span><strong>Movement belongs to the corner.</strong></article>
        <article className={`${styles.primitive} ${styles.rule}`}><span>Ribbon Rule</span><hr /><strong>Separation that fades before the container ends.</strong></article>
        <article className={`${styles.primitive} ${styles.language}`}><span className={styles.quietLabel}>Quiet Label</span><span className={styles.pebble}>Discipline Pebble</span><span className={styles.medallion}><i className="fa-thin fa-compass-drafting" /></span><span className={styles.arrow}>Trail Arrow <DirectionalArrow /></span></article>
      </div>
    </section>

    <section className={`${styles.section} ${styles.cardSection}`} id="cards">
      <div className={styles.sectionIntro}><p>02 // Families</p><h2>Eight cards, eight jobs</h2><span>Similar material. Different information pressure.</span></div>
      <FeaturedSpecimen />
      <div className={styles.signalGrid}>
        <BannerCard tone="gold" eyebrow="Signal Tile" title="Framed guidance" description="Gold carries method and attention." icon="fa-thin fa-lightbulb" action="Inspect" href="#source-map" />
        <BannerCard tone="green" eyebrow="Signal Tile" title="Practical evidence" description="Green carries experience and operation." icon="fa-thin fa-leaf" action="Inspect" href="#source-map" />
        <BannerCard tone="purple" eyebrow="Signal Tile" title="System thinking" description="Purple carries structure and leadership." icon="fa-thin fa-diagram-project" action="Inspect" href="#source-map" />
        <BannerCard tone="rose" eyebrow="Signal Tile" title="Human consequence" description="Rose carries learning and reflection." icon="fa-thin fa-people-group" action="Inspect" href="#source-map" />
      </div>
      <div className={styles.compactGrid}>
        <article className={`thinking-thumb ${styles.process}`}><div className="thinking-media thinking-media-icon"><span className="thinking-icon-anchor"><i className="thinking-icon fa-thin fa-route" /></span></div><div className="thinking-panel"><div className="thinking-badges"><span>Process Tile</span></div><h3 className="thinking-title">A method with a focal idea</h3><span className="thinking-arrow"><DirectionalArrow /></span></div></article>
        <div className={styles.role}><ExperienceDisclosure company="Reference role" header={<><div className="resume-job-heading"><h3>Role Ledger</h3><p>Expandable work history</p></div><p className="resume-experience-company">Quiet Prism reference</p></>}><p>The header remains useful when the detail is closed. Open and close it to inspect the real production disclosure behavior.</p></ExperienceDisclosure></div>
        <section className={`resume-prism-practice ${styles.practice}`}><CornerWaves both /><div className="resume-practice-column"><h3><i className="fa-thin fa-people-group" /> Practice Stack</h3><p>Related material sits in one shared surface.</p></div><div className="resume-practice-column"><h3><i className="fa-thin fa-toolbox" /> Tools</h3><p>Rules divide the content, not nested cards.</p></div></section>
        <article className={`education-card education-tone-4 ${styles.credential}`}><CornerWaves /><header><i className="fa-thin fa-graduation-cap" /><h3>Credential Shard</h3><p>Intrinsic height, compact proof.</p></header><a href="#source-map" aria-label="Inspect Credential Shard source"><i className="fa-thin fa-arrow-up-right-from-square" /></a></article>
        <article className={styles.outcome}><span className={styles.quietLabel}>Outcome Tile</span><strong>20+</strong><p>A number or result with room to breathe.</p><DirectionalArrow /></article>
        <article className={styles.story}><div><span className={styles.medallion}><i className="fa-thin fa-layer-group" /></span></div><section><span className={styles.pebble}>Story Slate</span><h3>A reading path, not a dialog</h3><p>Dedicated pages pair focal art with deliberate summary.</p><span className={styles.arrow}>Read <DirectionalArrow /></span></section></article>
      </div>
    </section>

    <section className={styles.section} id="states">
      <div className={styles.sectionIntro}><p>03 // Behavior</p><h2>State is part of the component</h2><span>Use the switcher to pin a review state across these specimens.</span></div>
      <div className={styles.statePicker} role="group" aria-label="Preview component state">{states.map(item => <button key={item.id} type="button" aria-pressed={state === item.id} onClick={() => setState(item.id)}>{item.label}</button>)}</div>
      <div className={styles.stateStage}>
        <button className={styles.demoAction} type="button"><span>Trail action</span><DirectionalArrow /></button>
        <button className={styles.demoTile} type="button"><span className={styles.medallion}><i className="fa-thin fa-sparkles" /></span><strong>State specimen</strong><span>Hover lifts. Focus rings. Active settles.</span></button>
        <div className={styles.motionSpecimen} aria-label="Motion behavior specimen"><i /><i /><i /><span>{state === 'reduced' ? 'Static composition' : 'Independent drift'}</span></div>
      </div>
      <div className={styles.stateNotes}>
        <p><strong>Hover</strong><span>Lift, arrow travel and atmospheric acceleration appear only where pointer capability exists.</span></p>
        <p><strong>Focus</strong><span>Focus Halo is visible, offset, tone-aware and forced-color safe.</span></p>
        <p><strong>Active</strong><span>Legacy buttons darken. Quiet Prism cards return toward the surface rather than adding another effect.</span></p>
        <p><strong>Reduced motion</strong><span>Animation and transition stop. Meaning, order, focus, and visible controls remain.</span></p>
        <p><strong>Disabled</strong><span>Undefined. No production Quiet Prism selector or token currently owns a disabled treatment.</span></p>
        <p><strong>Responsive</strong><span>Spotlight Split collapses at 820px. Signal Tile tightens at 560px. Masonry moves through one, two, and three columns at 600px and 1200px.</span></p>
      </div>
    </section>

    <section className={`${styles.section} ${styles.modalSection}`} id="modal">
      <div className={styles.sectionIntro}><p>04 // Modal-relevant</p><h2>The reading kit</h2><span>These patterns document the current dialog language. They do not revise modal content.</span></div>
      <div className={styles.readingSheet}>
        <div className={styles.sheetBar}><span /><strong>Reading Sheet</strong><button type="button" aria-label="Decorative close-control specimen">×</button></div>
        <div className={styles.sectionPlaque}><span><i className="fa-thin fa-compass-drafting" /></span><h3>Section Plaque</h3></div>
        <div className={styles.evidenceGrid}><article><span className={styles.medallion}><i className="fa-thin fa-lightbulb" /></span><div><strong>Evidence Cluster</strong><p>A compact claim with its context attached.</p></div></article><article className={styles.metric}><strong>62%</strong><span>Metric Lens</span></article><article className={styles.value}><strong>Value Sheet</strong><p>A short list of consequences or created value.</p></article></div>
        <div className={styles.dataBay}><span>Data Bay</span><strong>Grouped evidence gets one containing surface.</strong></div>
      </div>
      <MappingTable rows={modalPatterns} />
    </section>

    <section className={styles.section} id="source-map">
      <div className={styles.sectionIntro}><p>05 // Source map</p><h2>Name it, then find it</h2><span>Citation names point back to existing components, selectors and tokens.</span></div>
      <h3>Primitives</h3><MappingTable rows={primitives} />
      <h3>Card families</h3><MappingTable rows={families} />
      <div className={styles.motionMap}><h3>Motion and accessibility contracts</h3><ul><li><code>data-motion-root</code> marks an independently observable motion region.</li><li><code>data-atmosphere</code> joins shared hover, focus and scroll-speed behavior.</li><li><code>.motion-paused</code>, <code>.motion-hidden</code>, and <code>.motion-offscreen</code> stop work without removing content.</li><li><code>prefers-reduced-motion: reduce</code> resolves every decorative animation to a static composition.</li><li><code>forced-colors: active</code> restores system outlines and surface boundaries.</li></ul></div>
    </section>

    <footer className={styles.footer}><p>Quiet Prism // baseline 4c2e482</p><Link href="/">Return to JacobMedley.com</Link></footer>
  </main>
}
