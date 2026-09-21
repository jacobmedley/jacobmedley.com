# Design QA: Quiet Prism modal content

Date: September 20, 2026

Scope: all fourteen case-study dialogs

Source truth: Jacob's browser annotations 3 and 5 in task `01a0c125-1e07-7d31-ae3f-034e84f6259d`, plus the source preview at `http://127.0.0.1:8096/`

Implementation: `http://127.0.0.1:8097/`
Comparison: `docs/reviews/modal-quiet-prism-20260920/comparison-hydra-dentalplans.png`

## Evidence

The source and implementation were captured in the same in-app browser. Hydra's
`Why Hydra?` block and DentalPlans' outcomes/value area were scrolled into view in
each version. Source captures are 2000 x 1125 pixels. Implementation captures are
2250 x 1719 pixels. The comparison board normalizes them into equal-width columns;
it is a composition comparison, not a pixel-diff claim. The implementation's main
responsive pass used a 1440 x 1100 CSS viewport. Phone checks used 390 x 844 CSS
pixels. Browser density was controlled by the in-app surface and was not asserted
as 1x.

Full-view evidence:

- `docs/reviews/modal-quiet-prism-20260920/source-hydra-desktop.png`
- `docs/reviews/modal-quiet-prism-20260920/implementation-hydra-desktop.png`
- `docs/reviews/modal-quiet-prism-20260920/source-dentalplans-desktop.png`
- `docs/reviews/modal-quiet-prism-20260920/implementation-dentalplans-desktop.png`

Focused region comparison was not needed beyond the matched viewport captures.
The target defects are large content regions, and their type, spacing, card edges,
and grouping remain legible in the comparison board.

## Findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: existing Manrope/URW hierarchy and factual copy are
  preserved. Metric emphasis, card headings, supporting labels, and long list
  text reflow without horizontal overflow at phone width and at 200% root text.
- Spacing and layout rhythm: Hydra's loose art-and-paragraph row is now one paired
  prism composition. DentalPlans' metrics, value statement, and framework bands
  use a consistent inset edge, radius, padding rhythm, and content density.
- Colors and visual tokens: every new surface derives tint, wash, edge, and ink
  from each dialog's existing `featured-*` theme variables. No one-off palette
  was introduced.
- Image quality and asset fidelity: all existing evidence images, diagrams, crops,
  and brand art are unchanged. The redesign adds layout surfaces only.
- Copy and content: no labels, prose, metrics, or factual data changed. No copy
  register entry was required.
- Affordances and behavior: dialog opening, reading-area scrolling, Escape close,
  focus return, and reduced motion are preserved. The Hydra trigger regained focus
  after Escape. Reduced-motion emulation found no active dialog animation styles.
- Accessibility: axe-core 4.11.3 found zero WCAG 2 A/AA violations in each of the
  fourteen open dialogs. This automated result is bounded and is not a conformance
  claim.

## Comparison history

Initial evidence showed legacy white cards, stacked gray list groups, striped
progress panels, loose split narratives, and inconsistent visual density. The
first implementation introduced themed prism surfaces for the shared card, list,
metric, value, diagram, and icon-grid families. The Hydra comparison then exposed
that narrative split rows whose heading sat in the preceding block were not being
classified as section cards. The renderer was corrected to identify narrative
content directly. Post-fix Hydra and DentalPlans captures show the intended paired
composition and unified proof/value hierarchy.

## Implementation checklist

- [x] Shared Quiet Prism tokens applied to every modal content-block family
- [x] Hydra narrative split classified and contained
- [x] DentalPlans metrics, value card, and system bands unified
- [x] Fourteen desktop dialog screenshots reviewed
- [x] Fourteen phone-width overflow checks completed
- [x] Fourteen enlarged-text checks completed
- [x] Fourteen WCAG 2 A/AA automated checks completed
- [x] Escape, focus return, reduced motion, scrolling, and console checked

## Follow-up polish

No P3 visual follow-up is required for this scope. Physical touch, Safari/Firefox,
native browser zoom, and screen-reader speech remain outside this local pass.

final result: passed
