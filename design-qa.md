# Design QA: source-matched Quiet Prism catalog

September 20, 2026. This review supersedes the acceptance claim in `3b2730c`.
The earlier report remains in Git history and must not be treated as evidence
that the rejected imitation specimens matched production.

## Findings and correction history

- **P1, corrected: invented specimens.** The first reference replaced actual
  artwork, markup, copy and states with approximations. It also presented the
  removed pathway cards as current. The rebuilt catalog loads the original
  routes in a same-origin frame, with their original styles and real interactions.
  Signal Tile and Animated Image are explicitly retained components. Their
  separate specimens import the real components and label their supplied props.
- **P1, corrected: incomplete and incorrect mapping.** Added a searchable catalog
  of 51 patterns and 169 examples. Source-file checks found and corrected four
  stale paths. Browser checks corrected seven missing associations, including
  the Reveal/Wrong information cards, roadmap reference disclosure and unused
  animated-image branch. The final source-locator sweep resolved all examples.
- **P2, corrected: focus return from automatic dialog launch.** The reference
  now focuses the original trigger before activation and restores it after the
  source dialog's focus scope closes. This changes only reference orchestration.
- **P2, evidence corrected: screenshot normalization.** Initial captures mixed
  browser zoom, mismatched viewports and compositor artifacts. They were rejected
  as comparison evidence. Source and reference were then captured in the same
  verification tab, with the same CSS viewport and reduced-motion preference.
  The desktop full-view capture has an incomplete offscreen neighboring card;
  the focused WebMD comparison excludes that unrelated capture artifact.

## Source visual truth and comparison evidence

Source: local `/` at baseline `4c2e482c3a706090773e88dd59e8f01595fe7632`.
Implementation: local `/design-system/#spotlight-split`.
Production source was verified unchanged against that baseline by Git diff.

All paths below are relative to `docs/reviews/`.

| Evidence | CSS viewport | Saved pixels | State |
|---|---|---|---|
| `quiet-prism-catalog-desktop.png` | 1440 × 1200 | 1425 × 1188 | WebMD, reduced motion |
| `quiet-prism-webmd-source.png` | 1117 × 680 | 1102 × 671 | Same source card, reduced motion |
| `quiet-prism-webmd-specimen.png` | Frame 1117 × 680 | 1102 × 671 | Normalized frame crop |
| `quiet-prism-webmd-comparison.png` | Matched frame view | 2204 × 671 | Source left, reference right |
| `quiet-prism-webmd-detail.png` | Focused card crop | 1858 × 448 | Source left, reference right |
| `quiet-prism-catalog-tablet.png` | 820 × 1100 | 805 × 1080 | Phone-width specimen |
| `quiet-prism-phone-source.png` | 390 × 680 | 375 × 654 | Original mobile card |
| `quiet-prism-phone-specimen.png` | Frame 390 × 680 | 375 × 654 | Normalized frame crop |
| `quiet-prism-phone-comparison.png` | Matched mobile view | 750 × 654 | Source left, reference right |
| `quiet-prism-catalog-phone.png` | 390 × 844 | Browser-native capture | Catalog navigation and controls |

Device scale factor was 1. The browser screenshot output includes a small
provider resize relative to CSS dimensions. Crop coordinates were scaled using
the captured PNG/CSS width and height ratios, then the reference crop was
normalized to the source image dimensions. Raw rectangles are saved in
`quiet-prism-frame-rect.json` and `quiet-prism-phone-rect.json`. These are visual
comparisons, not claims of pixel-identical screenshots or timing synchronization.
The combined desktop detail and mobile comparison images were opened and
inspected together, not judged from source code alone.

### Required fidelity surfaces

- **Typography:** same URW Form appearance, heading/body hierarchy, weight,
  line wrapping and tracked eyebrow in the matched card views. Computed styles
  now expose the source element's actual font stack, size and line height.
- **Spacing and layout:** the two-column desktop composition and stacked phone
  composition match. Card radius, inset pane, logo placement, badge wrapping and
  footer relationships agree. The frame retains the real page's navigation and
  container; no documentation CSS enters its document.
- **Colors and tokens:** blue field, translucent pane, subdued outlines and
  purple/blue text match. Token values are read from the live element, including
  separate brand, Prism and case-study namespaces. Empty inherited values are
  omitted rather than invented.
- **Assets:** the real WebMD anchor, atmospheric artwork, context icon, book icon
  and arrow are present in both views. No replacement artwork was generated.
- **Copy:** original project title, subtitle, summary, disciplines, View action
  and closing footer match. Production content files were not edited.

## Verification actually run

- Production build and type checking passed after the final focus fix. Export
  preparation checked 288 images and 104 active production asset references.
- `npx eslint app components lib` and `git diff --check` passed.
- `node scripts/verify-design-system.mjs`: 51 patterns, 169 examples, 36 token
  names; no missing files, routes or empty example groups.
- Browser source sweep: all 169 locators resolved. Every catalog entry was also
  opened through its navigation link: 51 successful source-location results.
- Catalog search found three WorkCard-related entries; an unmatched query showed
  the empty state. Clearing by keyboard restored the full catalog.
- Fit/Phone selection and measured frame width checked. Desktop, tablet and phone
  catalog viewports had no horizontal document overflow. Oversized fixed-width
  specimens intentionally scroll inside their labeled preview region.
- Original Systems filter selected correctly and rendered three stories and
  three outcomes. Employment disclosure opened by Enter. Call-center demo changed
  to Busy. Source Pause motion changed its label to Resume motion and applied
  `motion-paused`. Dialog Escape dismissed the actual source dialog.
- Axe WCAG A/AA checks on the catalog shell: zero violations, 28 passing rules,
  one incomplete rule. Iframes were excluded from this shell audit; it is not a
  full accessibility certification of the baseline site. Result saved in
  `quiet-prism-axe.json`.
- No production source differences under components, lib, homepage, shared styles
  or dedicated case-study routes relative to the requested baseline.

## Residual limits and follow-up

- Two transient MutationObserver errors were recorded during page/capture
  teardown in the verification tab. A fresh five-navigation exception trace did
  not reproduce them. Their origin is not established; no claim of a completely
  error-free browser session is made. Treat this as a non-blocking teardown
  investigation, not a reason to modify another task's production files.
- The final automatic-dialog focus-return check is recorded in the closeout
  evidence below. Native screen-reader output, mobile touch gestures, forced
  colors and injected image-network failures were not exhaustively retested.
- The catalog intentionally represents the requested baseline. Concurrent modal
  and focus work is not merged. The modal task's newer rejection was read from
  Exchange event `20260921T004052Z-bfcd530af1bb42ec97408a203c334fdf`.
  Its later correction `a785e5c` was reported in event
  `20260921T010833Z-a7a293cc982a4ff8a71000380b24a599` and remains separate.
- Verification is local. No publish, live-site audit, or user acceptance implied.

Final closeout: after explicitly reloading the final export, automatic launch
followed by Escape returned focus to `data-modal-trigger="webmd"`; no dialog
remained. Earlier in-page hash navigation had retained a cached reference bundle,
so those pre-reload attempts were not accepted as final-build verification.
The observed result is saved in `quiet-prism-interactions.json`.

Final result: passed
