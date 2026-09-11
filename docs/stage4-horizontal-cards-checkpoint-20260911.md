# September 11: horizontal cards and browser comments

Base: `3707584691f05dde35619741db4c247d03a28c65`.
Branch: `codex/website-art-layout-20260910`.
Owner: `codex-website-01a08e51`, isolated worktree `6fa6`.

Jacob authorized the implementation through eighteen browser comments and his
explicit instruction to make the layout decision. The alternating horizontal
layout supersedes the previous Figma mosaic and equal row heights. The reference
image describes composition; page content in the annotations supplies evidence,
not additional instructions. No copy edits, claims, project data, diagrams or
public routes were changed. No B edits were applied or skipped.

## Layout decision

Five full-width stories follow the existing order. WebMD, BumblebeeMD and OPF put
art on the left; DentalPlans and Hydra put art on the right. Each card grows with
its copy instead of inheriting the tallest row. At a card width below 820px,
art moves above the copy. This preserves room for the complete DentalPlans title
and avoids the squeezed columns shown in Comment 16. Identity circles stay
centered within their art region in both orientations.

The copy panel uses Jacob's exact `rgba(255,255,255,.4)` and `blur(3px)` values.
Its subtitle color is slightly darker (`#493e51`) because the previous secondary
ink measured below 4.5:1 in the darkest sampled WebMD glass region. Text, badges
and reading order are unchanged. Static sampled contrast is bounded evidence,
not full-site WCAG certification or proof of every animation frame.

## Comment disposition

| Comment | Implementation |
|---|---|
| 1 | Full Stack circles enlarge to 1.16 on hover/focus and float slowly at rest and during hover. Idle translation is independent of the enlargement transform. |
| 2 | Each crossed Personalization line drifts at rest; the twelve lines still resolve into even sunbeams and slowly rotate on hover/focus. |
| 3 | Call Center nodes drift individually, pulling their connections and packets with them. The default projection has more visible depth. The existing stronger rollover projection remains. |
| 4 | Workshop rings expand and contract more broadly and tilt in depth on hover/focus. Motion continues after the initial transition. |
| 5 | Removed the mouse blink. A shared SVG now draws eighteen right-angle corridor paths around the icon. |
| 6 | A/B triangles continue slow rotation after spreading into the hover depth arrangement. |
| 7 | All nine Full Stack cards have an explicit rounded clipping boundary; copy panels share the bottom radius. Photo artwork cannot paint outside those corners. |
| 8 | Featured circles and their contained marks enlarge together, while their slow float continues. |
| 9 | Hydra now shows a grid, color/radius/spacing tokens, connected interface components and reusable controls in its burgundy palette. These are decorative shapes, not new product claims. |
| 10 | Content-sized cards replace equal-height rows. Art is centered relative to the copy or above it. |
| 11 | Applied exact 40% white glass and 3px blur to all five copy panels. |
| 12 | DP now has twelve system nodes and twenty connections spanning the field, including behind the glass. Data packets follow those connections. |
| 13 | Bumblebee has twenty-four hexagons. Additional shapes appear on rollover while the field and individual hexagons scale and rotate. |
| 14 | Imported the supplied white OPF silhouette unchanged, rendered as a dark monochrome mark through CSS. The color source is preserved. |
| 15 | The wave SVGs overlap their section edge by one pixel, closing fractional-pixel seams. |
| 16 | Removed the narrow side-by-side featured grid and raised the internal stacking threshold to 820px. |
| 17 | Sixteen leaves fall and sway slowly. Their path is copied from the upright leaf in the supplied OPF tree. |
| 18 | Each featured article has one full-card button, opening its existing modal from the artwork, text, Read label or outer field. One keyboard stop, Enter activation and modal focus return are preserved. Right arrows translate right on hover/focus. |

The shared artwork appears on the homepage and standalone case-study index.
Pause, reduced motion, offscreen suspension and page visibility remain part of
the motion contract. Touch opens a case study on the first tap.

## Asset provenance

Source: `C:/dev/jacobmedley.com/public/assets/references/opf/opf-icon-white.svg`.
Destination: `public/assets/featured/opf-icon-white.svg`.
Both SHA-256 values:
`0E6A8FD53E38EBC3B14FAB649C7999A8BF4ADC12441CFA74CE11C2D09A54FEB5`.
The leaf path in `WorkCard.tsx` is verbatim from that source. No private data was
read or copied, no raster assets were generated, and no dependencies were added.

## Verification

TypeScript, targeted no-cache ESLint, diff checks and the final production
build/export passed. All eleven static pages were generated. The first export
attempt encountered an `ENOTEMPTY` file lock while the owned static preview was
running. The process was verified by PID, command line and worktree, then stopped
through its owning session; the export passed on retry. No other preview was
stopped or directory deleted.

Browser verification caught an optimizer interaction that folded independent
scale into transform. The final hover transforms explicitly include both
centering and scale; the idle animation changes translation separately. This is
checked against the production export, not just source CSS.

All six acceptance suites passed: annotation, dashboard, Stage 4 layout,
motion/network, refinement, and surfaces. Layout, refinement, surfaces and
dashboard passed against the final production export; annotation and focused
network checks passed before the final subtitle-only adjustment. Coverage includes sixteen widths
from 320 to 2560px, exact 819/820 card boundaries, artwork centering, alternating
orientation, copy-driven height, full-card hit areas, focus return, all original
source routes, node/connection/packet attachment, persistent hover animation,
glyph loading and motion preferences. Pixel checks cover 375x812, 797x1272,
1695x1272, 1887x1272 at 1.25 device scale, and 1440x901 at 1.5 device scale.

Detailed local results and screenshots are gitignored under
`scripts/parity/shots/{stage4,refinement,surfaces,annotations,dashboard}`.
In-app visual review covered WebMD glass, the wave join, Hydra components and OPF
leaves. The final 375px and 1440px collection screenshots, photo corners and A/B
hover were inspected. Sampled subtitle contrast was 5.09:1 to 8.26:1. All five
wave-join pixel samples matched the adjoining solid fill with zero channel delta. Physical devices, Safari and Firefox remain untested; hidden-page tests
simulate visibility events rather than certify a native tab switch.

## Files and handoff

Sixteen files: `app/globals.css`; `components/ui/WorkCard.tsx`,
`ThinkingConnections.tsx`, `PersonalizationRays.tsx`, `RoadmapMaze.tsx`;
`components/sections/FullStackSection.tsx`;
`components/case-studies/StudyIconArt.tsx`; the white OPF SVG; six acceptance
scripts (`annotation`, `dashboard`, `stage4`, `stage4-motion-network`,
`stage4-refinement`, `stage4-surface`); this checkpoint and `docs/STATUS.md`.
STATUS is written last before the local checkpoint commit.

Preview: `http://localhost:3011/#work`, serving this worktree's final `out/`
through the existing `serve` package, verified PID `53340` (session `55814`).
Future source edits need a rebuild. No push, PR, merge or deployment is authorized
or performed. Rollback is `3707584` through a reviewed revert or separate worktree,
after checking ownership. Later sticky-header and release stages remain separate.

Genesis changed-direction event:
`20260911T040531Z-25e3fe04a8e4411584cf2355ef82162d`.
Fresh checkpoint observation: `2026-09-11T04:29:20.003852+00:00`, fingerprint
`0d7ae31752c621a60ac24b44af1ee88896df626a79e9dbb63347c429934358c1`.
No newer relevant direction was present. The helper still rejects the historical
Stage 3 record missing provenance; that record is preserved. Manual fingerprints
use its inventory and hash encoding. A unique update records the final commit and
verification at handoff; only the coordinator updates shared brief/workstream
pointers. No remote synchronization or another agent's acknowledgement is claimed.

Model recommendation: GPT-6 Astra/high; Jacob's selection was retained. The
25–50k cloud-token intake estimate includes review/retries and is not measured
usage. Local inference workload is zero; no measured savings are claimed. No usage
reset, new model, paid fallback or additional spending occurred.
