# Design QA — modal quiet-prism refinement

Date: 2026-09-21

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

DESIGN QA: passed
