# Design QA: DentalPlans editorial framework

Date: 2026-09-21

## Current review: DentalPlans annotations 1–16

Source visual truth: the sixteen browser annotations in this task, especially
the Shared Platform composition attached to Comment 9, MVP layout in Comments
10–11, and iteration layouts in Comments 14–16. The focus-state reference is
`C:/Users/jacob/AppData/Local/Temp/codex-clipboard-fd2c4c16-dc4b-4db2-81fa-5c074c8168e5.png`.
The platform sketch is an inline conversation attachment; it has no supplied
filesystem path. These references are guidance for the authorized DentalPlans
redesign, not a request to reproduce browser annotation outlines or placeholders.

### Comparison evidence

All implementation paths below are under `docs/reviews/dental-editorial-20260921/`.

- `02-platform-desktop-fixed.png`: six-capability overview and Key Features in
  one composition, compared with the Comment 9 sketch in the current image context.
- `03-mvp-desktop.png`: one column of three tiles; heading, rule, then paragraph.
- `04-iteration-three-desktop.png` and `06-iteration-four-desktop.png`: inward
  column placement, vertically centered prose, and full-column cumulative diagrams.
- `09-keyboard-focus-desktop.png`: visible View action cue, no perimeter outline,
  compared with the attached focus-state screenshot.
- `10-iteration-tablet-final.png`: balanced two-column diagram at the intermediate width.
- `07-platform-mobile.png` and `12-iteration-mobile-final.png`: readable mobile tiles.
- `11-platform-200pct.png`: platform tiles become one column with enlarged text.
- `13-value-created-desktop.png`: final title, bullets, and list margins.
- `checks.json`: before/after overflow checks and final computed style measurements.

Desktop screenshots are 1884×1272 pixels at a 1884×1272 CSS viewport, DPR 1;
tablet is 1024×900 and mobile is 390×840, also DPR 1. The Comment 9 sketch is
2048×913 including a large white canvas; the supplied focus image is a cropped
card. Comparisons use the corresponding content regions and proportional
composition, not canvas edges or an assertion of pixel-exact matching. Focused
checks cover headings/rules, node labels and icons, the Value Created list, and
the keyboard cue. The screenshots preserve the real browser-rendered state.

### Findings and repairs

- P1, resolved: legacy `col-24` also mapped to grid-column 24 once the row used
  CSS Grid, producing zero-width implicit tracks. Explicitly reset grid-column
  on the two editorial columns. Failure: `01-platform-desktop.png`; repaired:
  `02-platform-desktop-fixed.png`, with body width and scroll width both 1308px.
- P2, resolved: the legacy 28rem art query collapsed diagrams too early at tablet
  widths, making the visual much taller than its prose. The scoped iteration
  query now collapses at 20rem. Before: `08-iteration-tablet.png`; after:
  `10-iteration-tablet-final.png`, with two 185px tile tracks.
- P2, resolved: enlarged text overflowed four platform tile labels. Queries now
  use the supporting-art container: two columns below 26rem and one below 14rem.
  `checks.json` records the original overflow and the empty final overflow list;
  `11-platform-200pct.png` confirms readable single-column tiles.

No actionable P0/P1/P2 issue remains in the requested scope.

### Required fidelity surfaces

- Typography: existing font family and icon family retained. Value Created is
  22px, its bullets 18px, narrative paragraphs have 1.5rem leading, foundation
  icons are 24px. The four duplicate art eyebrows are absent. All narrative
  subsection headings precede their rule and paragraph in DOM and visual order.
- Spacing/layout: Value Created list margins measure 22px top and bottom;
  foundation padding is 22px. The desktop journey is capped at 70rem and centered,
  with equal columns, a fluid gutter, and centered short prose. Diagrams measure
  exactly the same width as their art columns. MVP tiles have a 24px gap.
- Colors/tokens: original sage/plum palette, quiet surfaces, 28px radius and thin
  icon strokes preserved. Keyboard focus uses a dark sage View cue with white
  text and an underline, including a system-color alternative in forced colors.
- Assets: existing library icons replace the sketch's placeholder stars. No new
  raster assets, substitute logos, generated artwork or dependencies were needed.
- Copy: B71 applied. Multi-Brand identifies the second release's capability;
  Five Brands appears in both later platform summaries. Microservices is added
  to the overview. Existing Promotions remains instead of the sketch's duplicate
  Plan Data label. Narrative and financial metrics are unchanged.

### Verification and limits

Final production build, type checking, static export, 288-image and 104-reference
checks, scoped ESLint and whitespace checks passed. Browser checks found no
horizontal overflow at 1884px, 1024px, 390px, or 390px with 200% root text.
Actual keyboard Tab reaches the DentalPlans button and shows the new action cue;
Enter opens the dialog; Escape returns focus to that button. Errors/warnings
were empty. Temporary text and viewport overrides were reset.

The React review found no new hooks, effects, network calls, dependencies, or
unstable list keys. Shared renderer changes are opt-in data variants; new style
rules and card focus changes are scoped to DentalPlans. Other studies were not
redesigned. This is a focused visual and interaction review, not a full-site
accessibility certification. Publishing remains outside this task.

Implementation checklist: all sixteen annotations addressed; focus repaired;
responsive repairs recaptured; copy registered; preview running. No P3 follow-up
is required for this checkpoint.

## Historical QA checkpoints

## Follow-up QA — browser comments 1–13

### Source visual truth

- The current task's browser annotations 1–13, with visual emphasis on Comment 2 (one composite Hydra card), Comment 4 (A Shared Language layout), Comment 5 (Value Created rule spacing), Comment 6 (framework icon hierarchy), Comment 11 (Dentist Data), and Comment 13 (cumulative iteration diagrams).
- The rendered local implementation at `http://localhost:8097/#work`, compared side by side with those annotated references.

### Final implementation evidence

- `docs/reviews/modal-followup-20260921/01-dental-platform-desktop.png`
- `docs/reviews/modal-followup-20260921/02-iteration-two-desktop.png`
- `docs/reviews/modal-followup-20260921/03-iteration-three-desktop.png`
- `docs/reviews/modal-followup-20260921/06-hydra-language-final-desktop.png`
- `docs/reviews/modal-followup-20260921/07b-dental-iteration-mobile.png`
- `docs/reviews/modal-followup-20260921/08b-hydra-why-mobile.png`
- `docs/reviews/modal-followup-20260921/09b-framework-icon-hierarchy-desktop.png`
- `docs/reviews/modal-followup-20260921/10b-value-spacing-final-desktop.png`
- `docs/reviews/modal-followup-20260921/checks.json`

Reviewed at 1484 × 1272 CSS px and 390 × 840 CSS px, plus 200% root text at 390 px. DentalPlans and Hydra both remained free of horizontal overflow. Escape closed the modal and returned focus to the DentalPlans trigger. Browser console errors and warnings were empty.

### Follow-up rubric result

- Layout and spacing — Pass. A Shared Language is vertically centered, inset one grid column at desktop, and expands to half-width columns before stacking. The Value Created title-to-rule and rule-to-first-bullet gaps both measure 12 px.
- Typography and hierarchy — Pass. Plan and Results use the smaller subsection treatment, and the framework heading icon measures 44 px versus 32 px for its capability icons.
- Content and assets — Pass. Duplicate Shared Platform and Shared Vocabulary eyebrows are removed; Plan Data, Dentist Data, the WordPress note, and cumulative iteration additions are present.
- Responsive behavior — Pass. The five-node platform and three cumulative iteration diagrams stay within the modal at desktop, mobile, and 200% text scale.
- Accessibility and interaction — Pass. Diagram alt text was updated with the changed content, and modal focus return remains intact.
- Implementation quality — Pass. The changes reuse existing data-driven components, icons, spacing tokens, and prism surfaces.

### Follow-up issue history

- P1, resolved: the first A Shared Language pass placed the heading in the preceding row and used a grid span unsupported by the current stylesheet. The heading now belongs to the correct row, with supported 12-column spans that narrow to 11 columns at the larger breakpoint.
- P2, resolved: the first Value Created spacing selector lost to a more specific rule, leaving unequal 31.6 px and 19.6 px gaps. The final selector produces equal 12 px gaps.

No open P0, P1, or P2 issues remain in the follow-up scope.

## Source visual truth

- User browser annotations 1–24 in the current task, especially Comment 17 (Value Created list), Comment 24 (naked-card reference), Comment 15 (Rise of Hydra layout), and Comments 13, 14, and 22 (ecosystem, iteration, and flow diagrams).
- Existing site primitives and layout behavior in the local preview at `http://localhost:8097/`.

## Rendered implementation evidence

- `docs/reviews/modal-naked-card-20260921/01-home-desktop.png`
- `docs/reviews/modal-naked-card-20260921/03-dental-metrics-desktop.png`
- `docs/reviews/modal-naked-card-20260921/04-dental-framework-desktop.png`
- `docs/reviews/modal-naked-card-20260921/06b-dental-ecosystem-tablet.png`
- `docs/reviews/modal-naked-card-20260921/07-dental-mvp-tablet.png`
- `docs/reviews/modal-naked-card-20260921/08-hydra-nomenclature-tablet.png`
- `docs/reviews/modal-naked-card-20260921/09-hydra-why-tablet.png`
- `docs/reviews/modal-naked-card-20260921/10-call-center-flow-tablet.png`
- `docs/reviews/modal-naked-card-20260921/11-sections-switch-tablet.png`
- `docs/reviews/modal-naked-card-20260921/12-dental-value-mobile.png`
- `docs/reviews/modal-naked-card-20260921/13-image-edge-tablet.png`
- `docs/reviews/modal-naked-card-20260921/desktop-modal-checks.json`
- `docs/reviews/modal-naked-card-20260921/mobile-modal-checks.json`

Comparison input: the current task contains both the user-supplied reference images and the rendered screenshots above. Visual review used the references as the design truth and the screenshots as the implementation under test.

## Coverage

- Desktop: 1440 × 1000 CSS px, all 14 modal variants.
- Tablet: 900 × 1000 CSS px, representative DentalPlans, Hydra, WebMD, and call-center sections.
- Mobile: 390 × 840 CSS px, all 14 modal variants.
- Text scaling: 200% root text size on the DentalPlans modal at 390 px.
- Interaction: Sections switch, Escape-to-close, and focus return.

## Rubric result

- Layout and spacing — Pass. Modal prose is flat by default, card layers are limited, 28 px radii are consistent where frames remain, Core Framework uses three desktop columns, and no checked modal overflows horizontally.
- Typography and hierarchy — Pass. Value Created has a title rule and four readable 16 px bullets; framework labels and icons meet the requested scale; MVP is reserved for the initial release and later stages read as iterations.
- Styling and color — Pass. New visuals reuse the site's quiet-prism gradients, borders, radii, icon set, and case-study mark instead of introducing a new pattern.
- Content and assets — Pass. All requested content remains legible; modal decorative waves are removed; loaded case-study image frames no longer clip their image shadows.
- Responsive behavior — Pass. Fourteen desktop and fourteen mobile modal sweeps report no horizontal overflow; the representative 200% text-scale check also reports no overflow.
- States and interaction — Pass. The Sections switch preserves switch semantics and toggles without 0/1 text. Escape closes the modal and returns focus to the originating trigger.
- Accessibility — Pass. The removed hero label remains the link's accessible name, visual diagrams retain descriptive image labels, and the change adds no new motion.
- Implementation quality — Pass. Existing components, tokens, Font Awesome icons, and content data are reused; no temporary preview attributes were copied into source.

## Issue history

- P2, resolved: the first ecosystem pass repeated connector arrows beside each capability, making the relationship feel detached and busy. Replaced them with one centered exchange indicator and recaptured `06b-dental-ecosystem-tablet.png`.
- P2, resolved: the hero rule inherited an 80% max-width and appeared offset from the arrow. The owning rule now sets both width and max-width to 100%; measured center delta is 0 px for the rule and less than 0.01 px for the arrow.

No open P0, P1, or P2 issues remain in the reviewed scope.

final result: passed
