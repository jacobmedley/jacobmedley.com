# Wave 1 browser acceptance

Accepted locally on September 6, 2026 against production export commit `3868955` plus the modal focus-return correction in this continuation branch. No deployment or remote push was performed.

## Story and environment

Visitors enter through the homepage or case-study index, interact with local project data and modals, and reach six statically rendered story routes with responsive branding, accessible controls, and correct external-link behavior.

- Preview: production export served from inside `out/` at `http://localhost:8090/`.
- Browser: bundled Playwright Chromium in headless mode. The optional `agent-browser` executable was unavailable in this task, so the repository's installed Playwright dependency ran the deterministic acceptance harness.
- Repeatable check: `node scripts/parity/wave1-acceptance.mjs`.
- Generated screenshots and raw JSON: `scripts/parity/shots/wave1/`, intentionally ignored by Git.
- Model route: GPT-5.6 Sol with medium reasoning. No local model or alternate cloud route executed.

## Evidence

| Boundary | Result | Observable evidence |
|---|---|---|
| Production build | Pass | Next 15.5.15 compiled, checked types and lint, generated 11 static pages, and exported successfully. |
| Responsive index | Pass | 320, 375, 576, 768 and 1440px returned 200 with zero horizontal overflow and no error overlay. |
| Brand lockup | Pass | Text hidden at 320/375px and visible from 576px; wordmark scales 18–30px; custom glyph resolves to Font Awesome Kit at 78px/400. |
| Thin glyphs | Pass | Case-study CTA, homepage hero CTA and modal close icon resolve to Font Awesome 6 Pro at weight 100. |
| Filters | Pass | All Work: `6 // Case Studies`; Design Systems: `2 // Case Studies`; Product Design: `1 // Case Study`. |
| Labels and spacing | Pass | Rendered case-study labels use the approved Title Case inventory; every sampled `.cs-eyebrow` computes to a 4px bottom margin. |
| External destinations | Pass | Case-study links back to the main site and education links use `_blank`, `noopener noreferrer`, and accessible new-tab descriptions where context requires them. |
| Detail routes | Pass | All six routes returned 200 at 320 and 1440px, with zero horizontal overflow and diagrams contained by their covers. The checkout record title computes to zero top/bottom margin. |
| Homepage modal | Pass after correction | Keyboard Enter opens; initial focus and Tab stay inside; Escape closes; focus returns to the invoking control at 320 and 1440px. |
| Content integrity | Pass | After normalizing only approved eyebrow, category and section-label casing, checkpoint and current canonical JSON share SHA-256 `902BCA8E0F4745D90372C32AAE753DCEFDDB5D2AB0E576DD27C19F5D57EFEE7B`. Narrative and metrics are unchanged. |
| Console/runtime | Pass | Final localhost run reported no console errors, page errors or framework overlays. |

## Local-host note

The licensed Font Awesome kit allows `localhost` and returns 403 for `127.0.0.1`. Acceptance therefore uses `http://localhost:8090/`. The first diagnostic run against the numeric host correctly exposed fallback fonts; it is not evidence of a production defect.

## Correction made during acceptance

The controlled Radix modal had no trigger component from which it could restore focus. `CaseStudyModal` now records the active invoking element during open autofocus and restores it during close autofocus. This applies to both homepage modal collections without changing their content or visual treatment.
