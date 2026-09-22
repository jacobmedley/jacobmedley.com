# Modal simplification: 24-annotation implementation handoff

Status: reviewed and grouped; **no UI changes implemented in this checkpoint**.
Owner: task `01a0c13f-81b2-7662-907b-eb7667b3abc9`, worktree 2787,
branch `codex/modal-content-quiet-prism-20260920`.
Implementation base and rollback: `a785e5c6921c78091d1bafcc47575368886ea8b8`.
Source: Jacob's latest 24 browser annotations and attached visual references.

## Direction and boundaries

Use the existing Quiet Prism palette, thin edges, typography, icon library,
spacing and `--prism-radius` (28px). A **naked card** is the existing restrained
gradient surface without corner waves, decorative circles, a grid backdrop,
or an unnecessary outer card. Keep one icon and minimal content where the
reference requests it. Long-form narrative reads directly on the modal canvas;
do not put every paragraph column back into a reading card. Group with headings,
rules, consistent gaps and alignment. Prefer peer cards, at most two surface layers.

Preserve source facts and the structure/colors of the existing framework diagram.
The new radius/type/icon/grid annotations narrowly supersede the earlier request
to leave that diagram untouched. Homepage and resume changes are authorized only
where named below. Do not remove all site waves, substitute an icon library,
redesign the modal shell, or copy temporary annotation attributes into source.

## Routing and budget

- Recommended next configuration: **GPT-5.6 Sol / Medium**, one implementation
  pass with the two checkpoints below. This task has not changed its own model.
- Do not fragment mechanical edits among many model/task switches. Use deterministic
  source searches and checks. No local model is needed for an exact annotation list.
- Remaining-work forecast: approximately **8,000–14,000 cloud tokens**, including
  source inspection, implementation, one verification pass and ordinary repair
  overhead; not a guarantee or a conversion from the account allowance.
- If source relationships remain ambiguous, stop only that diagram work for a
  bounded Astra / High decision. Use Astra / Medium for an optional final visual
  acceptance review, not Extra High for routine CSS changes.
- Local workload: source checks, one production build after both implementation
  batches, targeted browser checks and saved representative screenshots. No paid
  fallback, reset, downloads, new dependencies or publishing. Savings unmeasured.
- Intake telemetry: account weekly window 71% used / 29% remaining. It is shared
  account usage, not task tokens or money. Actual task model/effort and token
  consumption were not independently verified by a settings/usage control.

## Batch A: shared surfaces and explicit layout fixes

| Comments | Required result | Verified source owners / cautions |
|---|---|---|
| 1, 2 | Remove visible Explore selected work text; center remaining arrow and rule on the same axis. | `components/ui/KineticHeroIdentity.tsx`, `app/visual-system.css`. Preserve anchor accessible name, keyboard action, reduced-motion fallback. Remove obsolete text animation target. Check actual bounding boxes, not the supplied viewport alone. |
| 3 | Featured case-study book icon is 32px. | `components/ui/WorkCard.tsx`, `.featuredExternal` in `QuietPrism.module.css`. This is the icon size, not a new button or global icon reset. |
| 4 | Find and remove the repeated image edge/shadow artifact. | Inspect shared `ModalStudyImage`, modal brief-image frame, `AnimatedStudyImage`, image pairs and their styles; also sweep other study-image usage. Clipped shadow is a hypothesis, not an established cause. Check the source image before modifying any asset; avoid hiding useful content with arbitrary cropping. |
| 5, 11, 17 | Value Created matches Key Features: title, rule, four readable bullets, larger text and compact even spacing. | `CaseStudyModal.tsx`, `.modal-value-card` in `visual-system.css`. Remove `justify-content: space-between` from its list. Latest supplied reference shows thin right-facing chevrons at the left of each line; follow that image despite earlier wording saying pointing left. Preserve all four claims. No corner wave. |
| 6, 7 | Partner storefront and Core Framework bands use 28px corners; Core Framework labels inherit/read at 16px. | `ProgressBandSection` / `ProgressBarCell`. Outer `.progress` and inner `.progress-bar` must agree on clipping/radius so a rectangular background cannot show behind the band. Scope to diagram components, not every progress element sitewide. |
| 8, 9 | Add 12px bottom padding to the two named band headings. | Shared band renderer with scoped identification; preserve heading size/color and avoid accidentally doubling an existing equivalent gap. |
| 10 | Core Framework six cells form three columns on desktop, two below desktop and one on narrow screens. | Set that row's data `cols` from 5 to 3 in `lib/data/projects.ts`; extend `ROW_COLS_LG` in `CaseStudyModal.tsx` (currently only 4/5). Inspect the data type too. Use existing `lg` breakpoint, not 1484px as a new breakpoint. Other diagram rows keep their counts. |
| 12 | Enlarge icons consistently across framework/service diagram cells, proportional to their space. | `ProgressBarCell` shared icon treatment. Reuse current thin icons; do not enlarge all icons across the entire site. |
| 16 | All four metric cards are naked: remove waves; retain gradient, figures, labels, layout and palette; enlarge icons. | `MetricStat`, `.modal-metric-icon`. Wave removal must be scoped so homepage Career at a Glance is not changed. |
| 18 | Remove waves from the six Hydra nomenclature cards; retain icon/label grid. | `icon-grid` rendering in `CaseStudyModal.tsx`. Apply the naked concept-card family consistently. |
| 19 | Match Hydra diagram corner radii to 28px without changing its relationships or colors. | Shared progress diagram band/cell wrappers and existing radius token. Check narrow cells for label clearance. |
| 21 | Switch has visible Sections label to its left, with no 0/1 text. | `CallCenterDemo.tsx`, `.demo-highlight-control`. Preserve checked state, click/keyboard behavior and accessible association. Small-screen CSS currently stacks the label; update intentionally to satisfy left-label request responsively. |
| 23 | Remove only the bottom-left wave from resume Leadership, expertise and tools panel. | `ResumeSection.tsx`: targeted `CornerWaves both` instance. Keep top-right wave and all copy. |

Checkpoint A: inspect the diff for unintended global scope, confirm no factual
changes, and record any unresolved image-artifact cause before proceeding.

## Batch B: simpler explanatory diagrams and narrative

| Comments | Required result | Source and content guardrails |
|---|---|---|
| 13 | Replace the circular Shared Platform orbit with a legible connected ecosystem of simple naked cards. | `StudySupportingArt.tsx`, supporting-art CSS, DentalPlans content in `projects.ts`. Existing concepts are Product Data, Search & API, Promotions, Deployment and Shared Platform. Show supported connections/sharing without inventing implementation protocols, directionality or dependencies. Use existing icon/connector primitives; no new aesthetic. |
| 14, 15, 24 | Show the journey as cumulative steps: first MVP, then iterations. Break the icon tiles out of the large enclosing purple card. Keep each stage minimal and show what it adds to the prior stage. | Supporting art currently labels every stage MVP 01–04. Source data alt text also calls stages 2–4 MVPs. Reconcile visible headings and accessible descriptions together, without renumbering accidentally or asserting unverified retained technologies. Preserve narrative facts; flatten long prose columns rather than enclosing them in wave cards. |
| 20 | Why Hydra uses the original icon/mark from its case-study card, not the orbit diagram. | `WorkCard.tsx` uses `FeaturedAnchor` from `FeaturedArtwork.tsx`; its Hydra branch renders `.featured-hydra-mark`. Reuse that source asset treatment, not an invented replacement graphic or generic icon. Keep supporting copy and meaningful accessible description. |
| 22 | Availability System is a readable flow of standalone gradient nodes, with no extra enclosing card. Keep current icon/text sizes. | `StudySupportingArt.tsx` call-center variant. Preserve Site, Status Check (5 min), Call Center API, State Response, Message + Offer and their existing order. Verify wrap/stack connectors at narrow widths. |

Before changing any visible copy or alt text, read the four repository content
authorities and author a scoped B edit in `docs/copy-register.md` first. This
includes the hero-label removal, Sections label and MVP/iteration terminology.
This intake applies no B edits and supplies no unregistered replacement narrative.

Checkpoint B: compare DentalPlans metrics/features/journey and Hydra against
Jacob's supplied naked-card and Value Created references. Confirm a clear reading
order and that connectors communicate existing source relationships. Escalate only
unresolved content/relationship decisions, not the full implementation.

## Proportionate verification and closeout

1. Production build/type/lint and whitespace checks once after both batches;
   rerun relevant checks only for subsequent repairs.
2. Inspect homepage closing alignment/book icon, representative study image edges,
   DentalPlans metrics/framework/ecosystem/journey, Hydra and call-center flow at
   desktop and phone widths. Spot-check tablet wrap and enlarged text.
3. Check the shared renderer across all fourteen dialogs for overflow/regressions,
   using a compact deterministic sweep rather than a screenshot of every state.
4. Verify keyboard focus/close/return, the Sections switch, readable icon/label
   contrast, and retained reduced-motion behavior. Do not call screenshots an
   accessibility certification.
5. Save a small representative before/after set and concise pass/fail notes.
   No new full audit or generated design alternatives unless a real blocker occurs.
6. Update STATUS last, commit locally, release own lock, write unique Exchange update.
   Jacob's visual approval remains separate from mechanical QA.

## Environment and coordination

- Before continuing: read STATUS and working agreement, refresh Genesis records,
  check branch/commit/clean tree and claim `.tree-lock`. This handoff's own commit
  will be newer than the implementation base. Do not treat that docs-only change
  as unexpected source work.
- Existing preview: `http://localhost:8097/`, listener PID 45712, launcher 65792,
  verified serving this worktree's `out`. Do not restart by port or duplicate it.
  Use localhost: the existing Font Awesome kit rejects the 127.0.0.1 origin.
- No build, browser interaction or fresh visual verification ran during this
  intake. Prior evidence validates only the old implementation, not these asks.
- Separate design-system task checkpoint is now `304b66c` in worktree e924;
  separate seam/focus task is `9346cad` in 4f93. Neither is merged here. Their
  ownership and previews are untouched. No publication is authorized.
- Fresh Exchange intake fingerprint:
  `19bd3ee8510d30be79f6d16f662d3a8a3103fe56556e26afbe050a7a100920ed`,
  observed 2026-09-21T02:14:24Z; no sync conflicts reported. Relevant recent
  website events including the corrected design-system checkpoint were read.
- New direction recorded as change event
  `20260921T021528Z-4a034fbe74524096ab55a59650bb283a`. This does not prove
  other tasks have read it. All 24 annotations remain open for implementation.
