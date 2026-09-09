# Website refinement: seven separate stages

Owner: Jacob. Recorded September 8 Eastern / September 9 UTC, 2026.
**Current authorization: plan and documentation only.** Nothing below marks the
new annotations implemented. Start each stage in a new chat using
[the handoff prompts](stage-prompts-20260908.md); finish its checkpoint before
starting the next. The [18-item review](annotation-review-20260908.md) owns request
mapping, source findings and asset inventory. [STATUS](STATUS.md) owns current state.

## Routing and budget

| Stage | Deliverable | Recommended model / effort | Estimated cloud tokens, input + output |
|---|---|---|---:|
| 1 | Recoverable baseline, identity/copy decisions, three horizontal design options | GPT-6 Astra / high | 35–60k |
| 2 | Specified content placement, readable type, spacing and glass corrections | GPT-5.6 Luna / medium | 30–45k |
| 3 | Shared motion, connected nodes, radial warp and icon ownership | GPT-5.6 Sol / medium | 40–65k |
| 4 | Selected horizontal card family and verified branded artwork | GPT-5.6 Sol / medium | 40–65k |
| 5 | Sticky section-header behavior and coordinated filter positioning | GPT-5.6 Sol / medium | 35–60k |
| 6 | Independent cross-site acceptance and bounded fixes | GPT-6 Astra / medium | 35–55k |
| 7 | Final checkpoint, documentation and separate PR, if explicitly started for publication | GPT-5.6 Luna / medium | 20–35k |

Forecast: **235–385k cloud input/output tokens across seven fresh chats**, including
repeated required source intake, implementation, review and one bounded retry per
stage. This is a planning range, not a usage measurement, price quote or allowance
conversion; fresh-chat context and retries can materially change it. Check progress
at each stage boundary before broadening scope. Cache treatment is provider-specific.

Astra handles design ambiguity and factual judgment. Luna gets exact approved edits
and packaging. Sol handles component, CSS and interaction implementation. Raise Sol
to high only when transform composition, sticky containment or repeated failures
justify it; escalate a contested design/claim decision to Astra/high. Recommendations
do not switch the active model. Check available settings when each chat starts and
honor Jacob's actual selection. No new paid API route or additional spending.

Use scripts for inventories, counts, exact comparisons, SVG metadata, links and
checks. **Baseline local workload: zero jobs; optional bounded review only after
route qualification.** Genesis specifically holds laptop-routed jobs until a fresh
successful inference result is obtained and accepted; endpoint health alone is
insufficient. An already authorized desktop runner is not automatically covered by
that laptop hold, but still needs fresh health, model and profile verification.
On qualified routes, an optional Qwen3.5 4B job (thinking off, at most 4k input /
500 output tokens) may summarize a bounded evidence set; Qwen3.5 9B (thinking off,
at most 8k / 1k) may review a bounded draft. Run one job at a time, source-check
every finding and allow
one completed-invalid retry. Transport uncertainty needs a health check. No local
TSX patch worker, unqualified Qwen3-Coder route, model download or paid fallback.
Record attempts and local token counts separately. Cloud review still costs work;
no savings have been measured. Existing no-auto-reset rule remains in force.

## Stage 1 — Baseline and design decisions

**Astra/high:** resolve source identity and competing design requirements before
cheaper implementation stages. No production UI changes in this stage.

1. Read the intake files, lock and Git state. The worktree currently has an accepted
   local dashboard implementation without a commit, plus this planning packet.
   Inventory these exact changes and preserve them in a local checkpoint before
   any branch/base operation. Record its actual hash. Never reset the dirty tree.
2. Reconcile PR #8's merged commit `e6b3672f88e5847d84a854f45ae3d29ca8269952`
   with the worktree's older parent `a5fa620`. Inspect current main through GitHub;
   preserve all later work. Plan the next implementation branch from the reconciled
   baseline. Use a separate worktree if another writer owns this one.
3. Produce the entity-icon registry described in the annotation review, including
   actual Font Awesome thin-kit coverage and deliberate collision resolutions.
4. Visually inspect the supplied vectors and Viva candidates. Record the selected
   files and provenance; no source asset copying is needed yet.
5. Author B41 summary drafts in the copy register and review B40 placements and
   B42 motion-control labels. Preserve scope, attribution and established facts.
6. Provide three **reviewable horizontal card designs** as local design artifacts,
   outside production routes. Show desktop and narrow-screen arrangements, the
   same WebMD content, 140px center anchor and frosted content treatment:
   - A: split art and glass — compact health field on the left, quiet text panel on
     the right; strongest continuity with the existing layout.
   - B: continuous glass band — one geometric brand field across the horizontal
     card, with an independently readable frosted text region.
   - C: layered schematic — the logo anchors a central plane with offset abstract
     health linework behind it; text stays on a stable adjoining glass panel.
   These are directions to develop, not a selected or implemented design.
7. Specify the shared type/glass/motion tokens and the section-header hierarchy
   below. Resolve how the standalone outcomes/stories headings cooperate with its
   existing sticky filters, without exposing new homepage links.

**Checkpoint:** Jacob can compare all three finished options and choose one before
Stage 4. Record the choice, approved copy, icon map, asset gaps, responsive sketches
and the actual recovery commit. Stage 2/3 can proceed from their approved specs if
the horizontal choice is still pending; Stage 4 depends on that choice.

## Stage 2 — Specified content, spacing, readability and glass

**Luna/medium:** apply Stage 1's exact decisions. Use Sol/medium if the approved
solution requires component restructuring beyond these scoped edits.

- Implement #1 with a paragraph-specific 48px bottom margin across sizes, preserving
  the existing responsive grid spacing unless the approved total-gap spec changes it.
- Apply B40: B37 body becomes the introductory paragraph; AI Product Design leads
  the left column, Business Outcomes the right. On phones the introduction precedes
  left then right content in DOM order. Do not duplicate the removed bullet.
- Apply the approved B41 summaries to all five main featured records.
- Correct #14 clipping in shared photo/card frames and #18 filter translucency;
  preserve outer radius, stable hit areas, filter semantics and sticky behavior.
- Implement #15's approved eyebrow/readability tokens on both sites, including
  qualitative labels and career notes. Begin contrast evidence before motion changes.

Likely files: `ResumeSection.tsx`, `FullStackSection.tsx`, `lib/data/projects.ts`,
`app/globals.css`, `app/case-studies/dashboard.css`, and the copy register. Any new
shared primitive needs a stated reason. No factual story or diagram edits.

**Checkpoint:** copy diff matches register; no changed claims; main/dash phone,
tablet and desktop screenshots, measured text contrast and intact rounded corners.
Run types, lint and appropriate existing annotation/dashboard checks. If a harness
asserts superseded values, update only the relevant expectation and preserve its
other protections. Record the local commit; no push or merge at this stage.

## Stage 3 — One motion system and owned icons

**Sol/medium:** implement #2–4, #16 and the approved #17 registry. Both surfaces
consume the same motion parameters and entity assignments. Current shared fields
are a starting point, not proof that desktop idle already exists.

- Animate media/artwork at idle on desktop and touch; photo motion should use a
  smaller amplitude than geometry. Keep titles, caption panels and controls still.
- Use a fast-start/slow-end curve for hover and focus, initially test
  `cubic-bezier(.16, 1, .3, 1)` over roughly 450–650ms. Tune from actual review.
- Test perceptible field loops around 6–10 seconds and slower full radial rotation
  around 24–36 seconds; these are proposed starting values, not final acceptance
  measurements. Avoid abrupt loop seams or restarting everything on pointer exit.
- Build a connected Call Center node field and rotating Personalization fan whose
  streaks travel outward during interaction. Separate nested transforms for idle,
  hover/focus and geometry. Use keyboard focus as the hover equivalent.
- Touch keeps idle motion while scroll/tap navigation remains immediate; don't
  require a first tap to reveal a hover state. Stop offscreen/hidden-tab animation.
- Provide an accessible pause/resume control for continuing autoplay, shared across
  both surfaces, with clear current state. Reduced motion starts static and removes
  geometry, zoom, parallax and header transitions. Pausing must not alter navigation.

**Checkpoint:** inspect at least two idle loop cycles; verify a visible change over
time on desktop and touch, continuous node connections, smooth enter/leave, focus,
pause persistence and reduced motion. Check font hydration after client navigation,
all entity glyph ownership, browser errors and overflow. Record a local commit.

## Stage 4 — Horizontal cards and supplied artwork

**Sol/medium:** implement Jacob's Stage 1 selection, #5 and #10–13. Import the
selected new SVGs into the working branch with provenance and preserve originals.

Use the selected family in `WorkCard.tsx` for WebMD, DentalPlans, BumblebeeMD, Hydra
and One Park Financial. Preserve the existing modal/read actions and factual copy.
Use a horizontal layout where both art and copy fit; stack at an evidenced content
breakpoint. Don't impose 1100px simply because it was the annotation viewport.

WebMD gets its correctly proportioned white logo on a suitable circle backing,
with thin abstract health iconography. DentalPlans gets the reserved thin tooth
and layered platform art, separating quickly in z-space with a sharp focal anchor
and restrained depth blur. BumblebeeMD gets the verified bee vector and finite
nested honeycomb. Hydra and One Park Financial use the same card family with their
approved identity assignments; don't invent a new factual narrative for artwork.
Viva uses a verified text-free couple source, preserving the real title and badges.

**Checkpoint:** desktop/narrow variants match the chosen option; originals are
unchanged; no stretched logos, leaked corners, accidental image-text fragments,
layout motion or unavailable glyphs. Validate modal keyboard/close/focus return,
touch, reduced motion and Stage 2 contrast under the new artwork. Record a local
commit. A missing Viva source stays an explicit open item, not a false completion.

## Stage 5 — Sticky section headers

**Sol/medium:** implement #9 and reconcile #18 using Stage 1's approved hierarchy.
Escalate effort only for unresolved containment or interaction failures.

Major homepage sections are Case Studies, Full Stack Designer, Resume and Education,
owned by `SectionHeader`. Preserve their expanded stacked heading at entry; as each
section reaches the top, keep its header visible and smoothly move the icon inline
left of its centered title over frosted white. The current section yields to the
next; headers must not accumulate. Resume's Design Leadership/Experience/Expertise
subheads are not additional sticky bars. Hero branding is separate.

On the standalone index, coordinate outcomes/stories section context with the
persistent discipline filter bar. Use a single defined top stack; it must not cover
the filters, create duplicate active headings, or obscure the selected result.
Individual study-detail subsection headings stay out of scope unless explicitly
included in Stage 1's approved hierarchy. Preserve heading semantics and anchors.

Fix short containing blocks, especially Education's header-only nested wrapper.
Measure compact header height and reserve space to prevent jumps. Account for the
homepage's mobile bottom navigation and desktop side navigation, safe areas, zoom,
anchor scroll margins, keyboard focus and modal z-order. Prefer stable layout with
transform/opacity transitions; reduced motion switches states without animation.

**Checkpoint:** scroll every section in both directions at desktop/tablet/phone;
inspect exact entry/exit boundaries, anchor navigation, filter changes, zoom and
focus visibility. No sticky pileup, jitter, covered controls, duplicate accessible
headings or horizontal overflow. Record a local commit.

## Stage 6 — Cross-site acceptance

**Astra/medium:** audit the completed story against every annotation, rather than
relying only on implementation-shaped assertions. Bounded fixes are included;
unresolved design choices return to their owning stage.

Run and fix `npx tsc --noEmit`, `npm run lint`, `npm run build`,
`node scripts/parity/dashboard-acceptance.mjs`, the existing homepage annotation
harness, and `git diff --check`. Inspect the production export as well as
`http://localhost:3000/` and `http://localhost:3000/case-studies/`. Inspect harness
expectations when requirements intentionally supersede old behavior; never delete
a test merely to get a green run.

Check 320, 375, 768, 1100 and 1440px plus both sides of every changed breakpoint;
retain dashboard's 699/700 and 1099/1100 boundaries. Verify all category outcomes
and cards, sticky positioning after filtering, direct detail URLs, source values,
diagrams, modal focus return, client navigation and loaded thin glyphs. Include
mouse, keyboard, touch, pause, normal/reduced motion, zoom, no console errors and
no horizontal overflow. Emulation is not physical-device testing; name browsers
actually used and record untested environments. Reuse the existing runner stack.

The requested "WCAG 3.2 AA" is recorded as **WCAG 2.2 AA**: WCAG 2.2 is a
[W3C Recommendation](https://www.w3.org/TR/WCAG22/); WCAG 3 is a
[Working Draft](https://www.w3.org/TR/wcag-3.0/), not a 3.2 AA certification target.

- Measure normal text at 4.5:1 and qualifying large text at 3:1 against the actual
  worst-case composite background; see [contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
  Test moving artwork, photos, glass, hovered/focused and filter-selected states.
- Essential UI boundaries and state indicators need applicable 3:1 contrast;
  decorative geometric fields are not automatically essential UI. See
  [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- Trial eyebrow size around 14px with readable weight/spacing, adjusted by visual
  review. This is a project readability target, not a WCAG minimum font-size rule.
  Verify text resize to 200%, 320 CSS-pixel reflow and user text-spacing overrides.
- Continuing autoplay must satisfy [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).
  An OS reduced-motion preference alone is not the complete pause mechanism.
- Sticky elements must not entirely hide focused controls under
  [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html);
  aim for fully visible focus. Verify keyboard operation, visible focus and touch
  targets, including the new motion control.

**Checkpoint:** an evidence table maps IDs 1–18 to screenshots/behavior/contrast
measurements and pass or unresolved status. Do not claim full WCAG conformance
from automated checks alone. Record actual commands, browser limits, local commit,
preview process identity and recovery point. No publication during this stage.

## Stage 7 — Final checkpoint and separate PR

**Luna/medium:** execute packaging only when Jacob starts this stage with the
publication prompt. Re-read current Genesis and GitHub status. PR #8 merged on
September 8 and its deploy workflow succeeded; do not reuse it or overwrite main.

Review the final diff against current main after confirming all prior stage commits
and acceptance. Update stale handoffs and the copy register's applied states, then
write STATUS last. Commit the reviewed final checkpoint, push only the implementation
branch and open a separate PR targeting the reconciled main baseline. Use the exact
commit and PR URL in a unique Genesis `update` event. Do not merge or deploy.

Describe resulting behavior and verification in the PR, with any actual remaining
limitations. Record changed files, all actual checks, preview state, release state,
rollback commit and open work. If main moved materially after acceptance, perform
the affected checks after reconciliation before opening the PR. Each completed
stage's commit is its recovery point; preserve history rather than force-pushing.
