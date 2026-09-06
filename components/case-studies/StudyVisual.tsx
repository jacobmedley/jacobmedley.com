// Explanatory diagrams, composed from the cleared narratives. These are not
// screenshots or claims to be original project artifacts. Text remains HTML.
export default function StudyVisual({ kind }: { kind: string }) {
  if (kind === 'platform') {
    return (
      <div className="cs-diagram cs-platform">
        <div className="cs-diagram-caption"><span className="cs-tiny-dot" /> SHARED FOUNDATION / DISTINCT EXPERIENCES</div>
        <div className="cs-storefronts">
          {['A', 'B', 'C', 'D', 'E'].map((brand, i) => (
            <div className={`cs-storefront cs-brand-${i}`} key={brand}>
              <div className="cs-window-bar"><span /><span /><span /></div>
              <div className="cs-mini-brand">{brand}<i className="fa-regular fa-arrow-up-right" aria-hidden="true" /></div>
              <div className="cs-mini-image" />
              <div className="cs-mini-line" /><div className="cs-mini-line short" />
              <div className="cs-mini-button" />
            </div>
          ))}
        </div>
        <div className="cs-connectors"><i /><i /><i /><i /><i /></div>
        <div className="cs-foundation"><span className="cs-foundation-icon">✳</span><div><strong>One commerce platform</strong><span>Designed once. Inherited by every property.</span></div></div>
        <div className="cs-foundation-parts"><span>Theme tokens</span><span>Shared data</span><span>Promotions</span><span>Deployment</span></div>
      </div>
    )
  }

  if (kind === 'practice') {
    return (
      <div className="cs-diagram cs-practice">
        <div className="cs-diagram-caption">BUILD THE PRACTICE / SHIP THE PRODUCT</div>
        <div className="cs-practice-heading"><span>From a blank page</span><strong>to a working practice<span>.</span></strong></div>
        <div className="cs-practice-grid">{[['01', 'Design system', 'A foundation to build on'], ['02', 'Research', 'Evidence for the next decision'], ['03', 'Measurement', 'Experience in the numbers'], ['04', 'Facilitation', 'A way to work together']].map(([n, title, note]) => <div key={n}><span>{n}</span><strong>{title}</strong><small>{note}</small></div>)}</div>
        <div className="cs-diagram-foot">Foundations built alongside delivery <i className="fa-regular fa-arrow-up-right" aria-hidden="true" /></div>
      </div>
    )
  }

  if (kind === 'journey') {
    return (
      <div className="cs-diagram cs-journey">
        <div className="cs-diagram-caption">FOLLOW THE CUSTOMER / ACROSS THE HANDOFFS</div>
        <div className="cs-journey-path">{['Awareness', 'Subscription', 'Refill'].map((step, i) => <div key={step}><span className="cs-journey-node">0{i + 1}</span><strong>{step}</strong></div>)}</div>
        <div className="cs-handoff"><span>↳</span> The gaps between teams are part of the experience.</div>
        <div className="cs-note-grid"><div><small>THE SESSION</small><strong>Concrete scenarios</strong></div><div><small>THE RECORD</small><strong>A shared journey</strong></div></div>
      </div>
    )
  }

  if (kind === 'navigation') {
    return (
      <div className="cs-diagram cs-navigation">
        <div className="cs-diagram-caption">OBSERVE / UNDERSTAND / DECIDE</div>
        <div className="cs-research-question">“Where would I find<br />what I need?”</div>
        <div className="cs-path-option"><span>Catalog structure</span><i className="fa-regular fa-arrow-up-right" aria-hidden="true" /></div>
        <div className="cs-path-option selected"><span><small>STRONGER ENTRY PATH</small>Shop by Condition</span><i className="fa-regular fa-arrow-up-right" aria-hidden="true" /></div>
        <div className="cs-diagram-foot">The customer’s problem becomes the starting point.</div>
      </div>
    )
  }

  if (kind === 'tokens') {
    return (
      <div className="cs-diagram cs-tokens">
        <div className="cs-diagram-caption">SHARED DECISIONS / ROOM FOR THE BRAND</div>
        <div className="cs-token-row"><strong>Aa</strong><div className="cs-swatches"><i /><i /><i /><i /></div><div className="cs-spacing-bars"><i /><i /><i /></div></div>
        <div className="cs-token-layer"><span>01</span><strong>Foundation</strong><small>Color · Type · Space</small></div>
        <div className="cs-token-layer"><span>02</span><strong>Brand theme</strong><small>Identity as a layer</small></div>
        <div className="cs-token-layer"><span>03</span><strong>Components</strong><small>Shared rules, applied</small></div>
        <div className="cs-diagram-foot">Change a token. Let the pages inherit it.</div>
      </div>
    )
  }

  return (
    <div className="cs-diagram cs-decision">
      <div className="cs-diagram-caption">FROM CONFLICTING SOURCES / TO A BUILDABLE DECISION</div>
      <div className="cs-document-stack"><div><span>REQUIREMENTS</span><strong>Itemized fee</strong></div><div><span>LATEST DIRECTION</span><strong>Combined price</strong></div></div>
      <div className="cs-decision-arrow">↓</div>
      <div className="cs-record"><span className="cs-record-check">✓</span><div><small>EXPERIENCE DECISION</small><strong>One combined price</strong><span>Reasoning recorded. Sources attached.</span></div></div>
      <div className="cs-diagram-foot">AI cross-references. Design makes the call.</div>
    </div>
  )
}
