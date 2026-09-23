# Design QA: full-site release integration

Date: 2026-09-22

## Reviewed workstream tips

- `bfe6ac0`: final modal layout-rhythm, DentalPlans framework, and Hydra refinements.
- `9346cad`: final shared card focus bloom and section-seam correction.
- `304b66c`: corrected source-backed Quiet Prism design-system catalog.

Rejected intermediate modal and catalog treatments remain in Git history only;
the release tree uses the final tips above. The independent workstream captures,
measurements, and structured checks remain under `docs/reviews/` and in each
workstream's preserved `docs/STATUS.md` entries.

## Integration review

The three workstreams share `4c2e482` as their last common application baseline.
The modal workstream already contains the complete full-site integration history.
The card workstream adds the approved cross-surface focus/seam treatment, and the
catalog workstream adds an unlinked, noindex source-reference route without
changing production components.

Combined build, static-export, authored-source lint, deterministic catalog,
responsive browser, keyboard, reduced-motion, and production-reference checks
are recorded here after the merged tree is verified.

## Release result

No open P0, P1, or P2 integration issue remains. The release candidate builds
as a 13-route static export, retains all 14 case-study dialogs, and resolves all
169 live examples in the 51-pattern source-backed design-system catalog.

The final review found four visible text-reflow squeezes that did not create
page-level horizontal scrolling: practice headings at 320/375px, full-stack
titles at 768px, a prior-role line at 1100px, and one call-center demo action at
320px. Intrinsic flex wrapping, constrained-card container queries, and explicit
word breaking now preserve all content at 200% root text. A dedicated regression
checks 320, 375, 768, 1100, and 1440px plus all 14 dialogs.

The historical sticky-heading position suite is intentionally non-applicable to
this release. `app/globals.css` keeps that treatment dormant for visual review,
so its old `position: sticky` expectation conflicts with the approved current
state. The broader suite still verifies the live compact-state class behavior.

## Verification performed

- `npm ci`, production build, static export, 288-image export check, and 104
  active production-image references passed.
- TypeScript and authored-source ESLint passed; `npm audit --audit-level=high`
  reported zero vulnerabilities.
- `scripts/verify-design-system.mjs` passed with 51 patterns, 169 examples, 36
  tokens, and zero errors.
- Integrated Chromium acceptance passed 13 route/viewport checks, all 14
  dialogs, every catalog locator, shared card keyboard focus, broken-image,
  page-overflow, error-overlay, Escape-close, and focus-return checks.
- Text reflow acceptance passed five viewport widths and all 14 dialogs at 200%
  root text.
- Motion/modal acceptance passed deterministic hero apertures, desktop entrance
  and exit states, focus/history/scroll behavior, the mobile sheet and swipe,
  reduced motion, and slow/error/retry states. The harness gates blocking frame
  gaps and long tasks rather than a host-dependent raw frame count.
- The broad matrix covers 240 homepage/index/dialog reflow cases, 182 modal
  resize cases, 90 direct-route reflow cases, 20 section compact-state checks,
  and 14 touch-open/close paths. It completed with zero page-level overflow,
  zero visible-text clipping, all focus checks true, and no compact-state
  mismatch. The collector excludes intentionally clipped `.sr-only` content and
  empty icon-only controls from visible-text geometry reports.

Ignored screenshots and structured browser results are under
`scripts/parity/shots/release-integration-20260922/`. This was automated Chromium
acceptance against the production export, not a physical Safari, screen-reader,
or assistive-technology audit.
