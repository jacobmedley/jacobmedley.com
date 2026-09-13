# Stage 4 artwork and Figma layout refinement

Owner: Jacob. Task: `01a08e51`, new isolated Codex worktree `6fa6`.
Date: September 10 Eastern / September 11 UTC, 2026.
Branch: `codex/website-art-layout-20260910`.
Base and rollback: `09c6125f6c25ad3091410905ba438180798f7d94`.

## Decisions and scope

The twelve latest browser-comment directions are implemented as one local
refinement. No website copy was authored. B44 summaries, detailed modal prose,
metrics, source links and the canonical study JSON are unchanged.

1. Personalization has twelve irregular crossed lines at rest. Hover and focus
   bring them to exact 30-degree intervals about the existing focal circle, then
   rotate the fan on a 32-second loop. The line transition uses 650ms
   `cubic-bezier(.16, 1, .3, 1)` on entry and exit. Rotation suspends at rest.
2. Call Center keeps the Full Stack gold. Its existing 38 nodes and 80 connections
   now share one SVG and one projected 3D model. Hover/focus changes depth, pitch
   and yaw, with exponential fast-to-slow easing. Every edge endpoint consumes the
   same rounded coordinates as its node. Three small packets travel selected
   connections for 1.8 seconds in staggered 11-second cycles. Nodes have thin
   outlines and translucent interiors. The shared component also serves the
   standalone dashboard in its existing theme.
3. A/B Testing separates twelve layers from +200px through -262px in z-space,
   with lateral offsets and a 34-degree turn. Its focal icon and copy stay stable.
4. One Park Financial uses Jacob's supplied blue/green tree icon. Imported
   `public/assets/featured/opf-icon-color.svg` from
   `C:\dev\jacobmedley.com\public\assets\references\opf\opf-icon-color.svg`.
   Both files have SHA-256
   `8FA2FEE66B3A7D096AD9DDBF1F5123146BE2F5811CDD3BA9C64C948B22AC15DF`.
   The original is unchanged. The full logo and white icon variants were inspected;
   the color icon fits the retained circular treatment.
5. All five fields are lighter, with 220px translucent circles and white outlines.
   WebMD and DentalPlans use translucent tinted backing for their white marks.
   Brand assets are unchanged; the OPF asset is the only new asset.
6. DentalPlans uses Resume green tokens. Its exposed schematic connects database,
   cart, email and browser glyphs from the existing Font Awesome Thin kit. Moving
   dashes show information flow on those same SVG paths. All four nodes stay in
   the exposed art region. It is decorative system imagery, not a replacement for
   any canonical case-study diagram.
7. WebMD retains blue tints, enlarges its logo to 194px wide, and adds six health
   glyphs at varied sizes with staggered eight-second expanding rings.
8. The frosted copy panels use 78% white, 30px blur and 140% saturation, generous
   padding, and grouped title/subtitle blocks. Other blocks share the available
   space. Copy and hit areas do not animate. An opaque fallback remains available.
9. Hydra uses Education's burgundy tokens and its existing Thin Hydra glyph.
10. BumblebeeMD uses pale Full Stack gold, nine 150px supplied hexes, reduced
    pattern opacity and the existing bee mark. Generic planes and crossing lines
    are removed from this treatment.
11. UX Roadmaps has a short, restrained CSS blink on the existing mouse glyph.
    No animation library or dependency was downloaded.
12. The layout comes from the actual Figma frame, read through
    `get_design_context` before implementation:
    [frame 6:10](https://www.figma.com/design/et28sB9h2RCIgYyhjBty8H/Untitled?node-id=6-10).
    In its 595-unit frame, row one is 333 + 16 + 246; row two is 255 + 16 + 324;
    the fifth card is 450 units, centered. The five existing projects remain in
    DOM order. All three rows have equal content-driven heights. The placeholder
    frame's 180px height grows to fit registered copy and the retained circles.
    These widths remain distinct down to 768px viewport width; below that, the
    entire collection stacks. Within each card, the existing 679/680px content
    breakpoint still determines stacked versus horizontal art/copy.

Pause, offscreen and hidden-tab states suspend the CSS animations and the network
frame callback. Reduced motion is static, including hover/focus depth, pulses and
the mouse blink. Network drawing caps updates near 30fps and uses direct SVG
attribute updates; it creates no React render loop or new external dependency.

## Verification

Types and targeted ESLint pass. The production build compiles, validates types and
lint, generates all 11 static pages, and exports successfully. The existing
annotation, dashboard and motion/network regressions pass. Featured-card and
refinement acceptance also pass against the completed production export, served
locally on port 3011. The final featured suite covers 320, 375, 767, 768, 769, 974,
1131, 1191, 1200, 1440, 1729, 1920 and 2560px. All five widths remain distinct
above the stack breakpoint, all grid rows have equal heights, and every tested
width has zero page overflow and all four DP system nodes exposed.

In-app visual review covered the final 375px DP composition and the desktop
featured fields. Exported screenshots were inspected for the entire 1440px
collection, the A/B depth, Call Center hover and Personalization sunbeams. The
production build was refreshed after the mobile clipping fix and passed again.

Meaningful acceptance evidence includes:

- Five unequal Figma widths, centered fifth card, equal row heights, unchanged
  ordering and no horizontal page overflow. Exact 767/768/769 viewport and
  679/680 card boundaries are included.
- Loaded supplied logos and actual Font Awesome Thin glyphs, 220px identity
  circles, exposed DP schematic nodes, contained copy and rounded artwork.
- Every Call Center endpoint exactly equals its corresponding SVG node center at
  idle and during hover. Visible packet samples stay on their edge segments.
- DP's line/node screen-space error remains below 0.1px during hover.
- Personalization's twelve target angles, slow rotation on hover/focus, return to
  the irregular field, and A/B's z-depth spread.
- Normal motion, emulated touch, direct first-tap activation, reduced motion,
  pause/resume, offscreen suspension and simulated browser visibility events.
- Modal Read/art triggers, Escape/close and focus return, standalone filtering,
  client navigation, and all six public study routes without authentication.
- Conservative worst-case glass contrast: primary `#302c38` 8.04:1; secondary
  `#594c62` 4.71:1 over 78% white composited on pure black. This is bounded text
  contrast evidence, not a full-site WCAG conformance claim.
- `git diff --exit-code 09c6125 -- lib/data/projects.ts
  lib/data/portfolio-studies.ts docs/copy-register.md docs/case-study-site-copy.json`
  confirms no protected source changes. The OPF source/destination hashes match.

Test evidence and screenshots are local, gitignored, under
`scripts/parity/shots/{stage4,refinement,annotations,dashboard}`. The new harness is
`scripts/parity/stage4-refinement-acceptance.mjs`; existing harness expectations
were revised only where the requested layout, artwork or motion supersedes them.

Final preview: `http://localhost:3011/#work`, serving this worktree's `out/` through
`node node_modules/serve/build/main.js out --listen tcp://127.0.0.1:3011 --no-clipboard`,
PID `33696` (session `53938`). This is a static export, so future edits require a
rebuild. The task's Next dev process was stopped by its owning session after PID,
command line and worktree verification. Other servers were not disturbed.

## Coordination, recovery and limits

All required repository and Exchange authorities were read at intake. Genesis
direction event: `20260911T024736Z-deab0ceee23142549c4b5eaf06460ca4`.
Checkpoint reread: `2026-09-11T03:00:24.989799+00:00`, fingerprint
`dfc3ff8db8ccf237f2a6012711106f828c01c4a29383c22a3800d775edb3ce26`.
The newer SSH-workstream event does not change website scope. The laptop inference
hold and no-reset rule remain honored.

`exchange.py status` still rejects the historical Stage 3 event missing provenance.
That event was preserved. Fingerprints use the helper's inventory, exclusion and
hash-encoding algorithm; the new inbox records are separate, uniquely named files.
The sandbox initially denied the inbox write; the authorized escalation succeeded.
Only the coordinator may update the stale shared brief/workstream pointers. No
remote synchronization or other agent's acknowledgement is asserted.

Requested model: GPT-6 Astra/high. No model switch is claimed. The intake estimate
was 30–60k cloud tokens including review/retries, not a usage measurement. Actual
local inference workload is zero; no measured savings are claimed. Offline
dependency installation reused the lockfile and existing npm cache. No model
download, paid fallback, usage reset, push, PR, merge or deployment occurred.

Rollback is the base `09c6125` through a reviewed revert or separate worktree.
Do not reset another checkout or remove another task's lock. The original 8350
worktree/branch and its port-3010 preview were preserved. Browser coverage is
Chromium and the in-app browser with touch emulation. Physical devices, Safari
and Firefox remain untested. Visibility was tested through simulated lifecycle
events; opening another in-app tab did not produce a hidden document and is not
claimed as physical tab-switch acceptance. Later sticky-header and cross-site
release stages remain separate work.

Changed files: `app/globals.css`, `app/case-studies/dashboard.css`,
`components/ui/WorkCard.tsx`, `components/ui/ThinkingConnections.tsx`,
`components/ui/PersonalizationRays.tsx`, `components/sections/FullStackSection.tsx`,
`components/case-studies/StudyIconArt.tsx`,
`public/assets/featured/opf-icon-color.svg`, the four affected acceptance scripts,
this checkpoint, and `docs/STATUS.md` (written last).
