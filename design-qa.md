# Design QA: Layout rhythm follow-up

Date: 2026-09-22

## Source and implementation

Source visual truth: the six browser-comment screenshots attached to the current
task. They are inline conversation artifacts without filesystem paths. The blue
annotation outlines and markers are review overlays, not production styling.

Implementation evidence is in `docs/reviews/layout-rhythm-20260922/`:

- `dental-iteration-two-1376x915.png`
- `dental-iteration-four-1376x915.png`
- `hydra-shared-language-rule-1376x915.png`
- `hydra-why-centered-1376x915.png`
- `home-how-i-work-1376x915.png`
- `home-about-experience-1376x915.png`
- `checks.json`

The source browser evidence and implementation captures were compared in the
same task context at the annotated 1376×915 CSS viewport. Implementation images
are 1376×915 pixels at deviceScaleFactor 1. The compact fallback was checked at
390×844 CSS pixels, also at deviceScaleFactor 1. Content regions, rather than
the annotation overlays or surrounding browser canvas, were used for comparison.

## State and interactions

- DentalPlans modal open at iterations two and four.
- Hydra modal open at “A Shared Language” and “Why Hydra?”.
- Homepage at the expanded “How I work” and “About and experience” headings.
- Modal open, Escape close, and cross-modal reopening were exercised.
- Desktop and compact layouts report zero horizontal overflow in the changed diagrams.

## Findings

- P1, resolved — The shared `SectionHeader` measurement observed the surface it
  was also resizing. Fractional rounding created a feedback loop, growing the
  “How I work” reserve to 433px and “About and experience” to 599px. Measurement
  now observes the natural inner content plus surface padding. Both reserves are
  stable at 211px, with an identical 84.07px title-to-rule interval.
- P2, resolved — Three-item DentalPlans diagrams used a two-column odd-item
  layout. Iterations two and four now use three equal desktop columns; the MVP
  remains the requested single-column stack and iteration three remains 2×2.
- P2, resolved — A first responsive pass left three 102px tiles at the 390px
  viewport. The supporting-art container now switches diagrams to one column
  below 24rem, eliminating cramped labels while preserving the desktop row.
- P2, resolved — The Hydra explanation surface occupied the full 1048px region.
  Its scoped layout is now centered at a 768px maximum and remains fluid below it.
- P2, resolved — “A Shared Language” suppressed the shared heading rule. The
  standard rule is restored between the heading and its first paragraph.

No actionable P0/P1/P2 issue remains in the requested scope.

## Required fidelity surfaces

- Fonts and typography: existing families, sizes, weights, line heights, and
  copy are unchanged; no new wrapping regression is visible.
- Spacing and layout rhythm: the two homepage title/rule intervals are now
  consistent, Hydra is centered, and both requested three-item rows are even.
- Colors and tokens: all existing Quiet Prism fills, borders, rules, and theme
  colors are retained.
- Image and icon fidelity: supplied images and Font Awesome icons are unchanged;
  no placeholder or code-drawn replacement was introduced.
- Copy and content: unchanged. “Multi-Brand,” “Shared Plan Data,” “Shared Cart,”
  “ZIP,” “Results,” and “Dentist Profile” remain intact.
- Responsiveness and accessibility: compact diagrams stack without overflow;
  modal keyboard close behavior remains intact. The change adds no new control,
  motion, or focus treatment.

## Comparison history

The first pass correctly produced the desktop three-column layout but also
overrode the intentionally vertical MVP and kept compact tiles too narrow. The
MVP received a more specific one-column rule and the compact threshold was
raised from 20rem to 24rem. Post-fix computed evidence is recorded in
`checks.json`; final desktop and compact checks have zero horizontal overflow.

final result: passed
