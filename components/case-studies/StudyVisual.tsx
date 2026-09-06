// Explanatory diagrams, composed from the cleared narratives. These are not
// screenshots or claims to be original project artifacts. Text remains HTML.
export default function StudyVisual({ kind }: { kind: string }) {
  if (kind === 'platform') {
    return (
      <div className="cs-diagram cs-platform">
        <div className="cs-diagram-caption">Shared Foundation // Distinct Experiences</div>
        <div className="cs-storefronts">
          {['A', 'B', 'C', 'D', 'E'].map((brand, i) => (
            <div className={`cs-storefront cs-brand-${i}`} key={brand}>
              <div className="cs-window-bar"><span /><span /><span /></div>
              <div className="cs-mini-brand">{brand}</div>
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
        <div className="cs-diagram-caption">Build The Practice // Ship The Product</div>
        <div className="cs-practice-heading"><span>From a blank page</span><strong>to a working practice<span>.</span></strong></div>
        <div className="cs-practice-grid">{[['01', 'Design system', 'A foundation to build on'], ['02', 'Research', 'Evidence for the next decision'], ['03', 'Measurement', 'Experience in the numbers'], ['04', 'Facilitation', 'A way to work together']].map(([n, title, note]) => <div key={n}><span>{n}</span><strong>{title}</strong><small>{note}</small></div>)}</div>
        <div className="cs-diagram-foot">Foundations built alongside delivery </div>
      </div>
    )
  }

  if (kind === 'journey') {
    return (
      <div className="cs-diagram cs-journey">
        <div className="cs-diagram-caption">Follow The Customer // Across The Handoffs</div>
        <div className="cs-journey-path">{['Awareness', 'Subscription', 'Refill'].map((step, i) => <div key={step}><span className="cs-journey-node">0{i + 1}</span><strong>{step}</strong></div>)}</div>
        <div className="cs-handoff"><i className="fa-thin fa-arrow-turn-down" aria-hidden="true" /> The gaps between teams are part of the experience.</div>
        <div className="cs-note-grid"><div><small>The Session</small><strong>Concrete scenarios</strong></div><div><small>The Record</small><strong>A shared journey</strong></div></div>
      </div>
    )
  }

  if (kind === 'navigation') {
    return (
      <div className="cs-diagram cs-navigation">
        <div className="cs-diagram-caption">Observe // Understand // Decide</div>
        <div className="cs-research-question">“Where would I find<br />what I need?”</div>
        <div className="cs-path-option"><span>Catalog structure</span></div>
        <div className="cs-path-option selected"><span><small>Stronger Entry Path</small>Shop by Condition</span></div>
        <div className="cs-diagram-foot">The customer’s problem becomes the starting point.</div>
      </div>
    )
  }

  if (kind === 'tokens') {
    return (
      <div className="cs-diagram cs-tokens">
        <div className="cs-diagram-caption">Shared Decisions // Room For The Brand</div>
        <div className="cs-token-row"><strong>Aa</strong><div className="cs-swatches"><i /><i /><i /><i /></div><div className="cs-spacing-bars"><i /><i /><i /></div></div>
        <div className="cs-token-layer"><span>01</span><strong>Foundation</strong><small>Color // Type // Space</small></div>
        <div className="cs-token-layer"><span>02</span><strong>Brand theme</strong><small>Identity as a layer</small></div>
        <div className="cs-token-layer"><span>03</span><strong>Components</strong><small>Shared rules, applied</small></div>
        <div className="cs-diagram-foot">Change a token. Let the pages inherit it.</div>
      </div>
    )
  }

  return (
    <div className="cs-diagram cs-decision">
      <div className="cs-diagram-caption">From Conflicting Sources // To A Buildable Decision</div>
      <div className="cs-document-stack"><div><span>Requirements</span><strong>Itemized fee</strong></div><div><span>Latest Direction</span><strong>Combined price</strong></div></div>
      <div className="cs-decision-arrow"><i className="fa-thin fa-arrow-down" aria-hidden="true" /></div>
      <div className="cs-record"><span className="cs-record-check"><i className="fa-thin fa-check" aria-hidden="true" /></span><div><small>Experience Decision</small><strong>One combined price</strong><span>Reasoning recorded. Sources attached.</span></div></div>
      <div className="cs-diagram-foot">AI cross-references. Design makes the call.</div>
    </div>
  )
}
