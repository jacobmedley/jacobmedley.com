# Design QA: corrected Quiet Prism modal content

Date: September 20, 2026 (final checks September 21 UTC)
Task: 01a0c13f-81b2-7662-907b-eb7667b3abc9
Implementation: http://localhost:8097/
final result: passed

## Scope and authority

Jacob's four annotations and supplied Career at a Glance image govern this
correction. The previous acceptance at 0c73d12 is withdrawn: its circular
decoration, extra card shells, and altered framework were not faithful to the
requested system. Its screenshot/viewport evidence is not reused as proof.

This review covers the corrected shared modal card families and preservation
of the existing diagrams, imagery, copy, and dialog behavior. It is not a claim
that every historical image or every interaction in every case study was
visually audited from end to end.

## Source and comparison evidence

Source visual: Jacob's attached Career at a Glance reference, corroborated by
the unchanged local /case-studies/ page. Source code: CareerStats.tsx,
dashboard.css .cs-stat, case-studies.css theme variables, site-integration.css
radius, and the existing CornerWaves component.

Evidence directory: docs/reviews/modal-correction-20260920/

- reference-career-desktop.png: original live component, 1440 x 1000.
- dentalplans-metrics-desktop.png: corrected metrics/value layout, 1440 x 1000.
- reference-and-metrics-comparison.png: unscaled source and implementation
  regions in one 1385 x 508 comparison. Left: 544 x 507 source crop.
  Right: 809 x 428 modal metric grid crop.
- dentalplans-features-desktop.png: illustration, Key Features, journey, 1440 x 1000.
- hydra-desktop.png: paired illustration/narrative cards, 1440 x 1000.
- roadmap-expanded-desktop.png: open disclosure, numbered cards and example
  project card, 1440 x 1000.
- information-cards-desktop.png: information-card family and loaded original
  campaign imagery, 1440 x 1000.
- dentalplans-mobile.png: metric section at 390 x 840.
- browser-checks.json: 56 recorded dialog/viewport checks.
- accessibility-checks.json: fresh axe results, keyboard trace, motion check
  and metric-token contrast calculations.

Final captures use actual CSS viewports above at devicePixelRatio 1. No density
resizing was used in the comparison. The implementation grid is wider because
it occupies a modal, not the reference page's sidebar. The comparison tests the
same card pattern, not identical content or identical card widths. Modal metrics
retain their existing labels and values; no invented eyebrows or navigation
arrows were added to these non-interactive cards.

Early captures on 127.0.0.1 exposed an 80% browser zoom and an icon-kit origin
error. All final evidence above was replaced with native-density localhost
captures. Each final image was opened and checked; transient blank/lazy-loaded
captures were replaced, not accepted.

## Findings and corrections

1. [P1, resolved] Wrong surface pattern in 0c73d12.
   Circular corner blobs, heavier figures, and generic radial washes differed
   from the reference. Reused CornerWaves and the existing CareerStats surface
   values: 135-degree wash, thin tinted border, 1.75rem radius, 22px padding,
   light display figures and existing palette. The comparison above shows the
   corrected pattern with the original thin icon font loaded.

2. [P1, resolved] Framework changed without authorization.
   Removed every modal-prism progress/band hook and its CSS overrides. A
   deterministic source comparison confirms the complete ProgressDiagram,
   ProgressBandSection and ProgressBarCell region matches 4c2e482 exactly.
   Original bands, hierarchy, colors, striping and text treatment are restored.
   Existing explanatory artwork and brand marks are intentionally unchanged.

3. [P1, resolved] Extra surfaces and card nesting.
   Removed the metric and highlight group shells. Only uncontained prose
   columns receive a reading card; artwork, screenshots and existing cards
   are not wrapped. All 56 checks report zero nested new card surfaces and
   zero supporting illustrations inside those surfaces. The modal frame plus
   one content card is the new card layering limit; preserved diagrams keep
   their explanatory internal structure.

4. [P2, resolved] First correction allowed a three-column metric grid.
   Restored a stable two-by-two desktop grid and a single column on narrow
   screens. The metric group and value card align on common top/bottom edges.

5. [P2, resolved] Short Hydra narrative looked like a disconnected strip.
   Aligned the summary card and illustration as peers; centered the short
   copy vertically without adding another enclosing surface.

6. [P2, resolved] Number punctuation wrapped in the roadmap cards.
   Reserved a non-shrinking number column and kept the number/punctuation
   together. The final expanded-roadmap capture shows intact numbering.

7. [P2, resolved] Reused corner-wave animation continued in reduced motion.
   Added a modal-scoped reduced-motion rule. Fresh computed-style checks on
   the final build return animation-name none for the new card waves.

8. [P2, environment resolved] Original icon kit rejected 127.0.0.1.
   Browser response was 403, Not allowed for origin. The same existing server
   at localhost loads Font Awesome 6 Pro correctly. No kit configuration,
   replacement icon family, new asset, or dependency change was made.

## Required fidelity surfaces

- Typography: existing urw-form/Manrope stack; 300-weight display figures,
  14px metric labels and the original thin-line icon family. Actual figures
  remain 47%, 20%, 27%, and 6 to 2. Long text wraps within the cards.
- Spacing/layout: reference-derived card padding/radius; 14px metric gaps;
  existing section rhythm; flat section groups; aligned peer columns.
  The desktop composition and phone stacking were visually inspected.
- Colors/tokens: metric palette uses the exact plum, sage, gold and slate
  source values. Other cards inherit their established project palette.
  No new palette or circular decorative surface was introduced.
- Imagery: CornerWaves is the existing source component, not a redrawn asset.
  Original supporting illustrations, framework and project screenshots remain.
  Representative campaign images were confirmed loaded before final capture.
- Copy/content: project data files are unchanged from 4c2e482. No B edit,
  factual rewrite, added claim, or generated copy was applied.

## Verification actually performed

- Final npm run build passed compilation, TypeScript, build lint and static
  export; export verification checked 288 images and 104 active references.
- Authored renderer ESLint and git diff --check passed.
- Deterministic framework-source comparison against 4c2e482 passed.
- Project data diff against 4c2e482 is empty.
- All 14 dialogs checked at 1440 x 1000, 800 x 1000, 390 x 840,
  and 390 x 840 with 32px root text (200%). Zero reading-area horizontal
  overflow, overflowing new cards, nested new cards, or extra artwork shells.
  Roadmap's disclosure was opened in each size. Original card icons loaded.
- Escape returned focus to each exact trigger in all 56 checks.
- Actual successive Tab and Shift+Tab input stayed inside the DentalPlans
  dialog, and Escape returned to its trigger.
- Axe-core found zero detected WCAG 2 A/AA violations across all 14 dialogs;
  gradient color-contrast remained incomplete, not automatically passed.
  New metric ink against its tinted base calculates gold 6.17:1,
  sage 6.84:1, plum 9.04:1, slate 6.61:1. Visible text placement was reviewed
  against the wave backgrounds. This is not whole-site accessibility certification.
- New card waves stop under reduced-motion emulation.
- Final browser warning/error log returned no entries on localhost.

## Remaining limits and handoff

No actionable P0/P1/P2 remains in this scoped correction. Jacob's visual
acceptance is still his decision. Native browser zoom, physical touch,
screen-reader speech, Safari and Firefox remain untested. Root-font enlargement
is not claimed as a native-zoom test.

Use localhost:8097 for review; the 127.0.0.1 icon-kit restriction remains an
external configuration condition. No deployment, push, merge or PR occurred.
Branch: codex/modal-content-quiet-prism-20260920. Starting checkpoint: 0c73d12.
Preferred pre-redesign rollback: 4c2e482c3a706090773e88dd59e8f01595fe7632.
Detailed repository handoff is the newest entry in docs/STATUS.md.

Implementation checklist: corrected cards, restored diagrams, flattened groups,
responsive/keyboard/motion checks, visual comparison and evidence completed.
