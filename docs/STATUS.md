# Status

## September 8, 2026: main-site annotation checkpoint

Current branch: `codex/portfolio-brand-wave-continuation-20260906`. Release PR #7
has merged at `588b550`; its SiteGround workflow completed successfully
([run](https://github.com/jacobmedley/jacobmedley.com/actions/runs/34172180596)).
This session has not independently verified its live edge cache. The released
baseline was merged into this branch at `2f7ea04`, preserving removal of the internal
`/design-variants/` route and the newer responsive card work.

Latest main-site changes: Wrong image position `center 35%`, Full Stack navigation,
image-only preview zoom inside clipped frames, Read buttons at 18px / `8px 26px`,
Jacob's corrected slogan, and modal icons inheriting text color. See
[annotation checkpoint](browser-annotation-checkpoint.md).

Build, TypeScript, lint and annotation acceptance pass. Six home viewport sizes
(375 through 1440px), four case-study index sizes, and touch motion were checked;
no overflow, console errors or overlays. Stale generated types for the removed
review route were resolved by a clean production build. Two duplicate development
servers were stopped after verifying their command lines and worktree; one preview
was restarted on port 3000. No push to main or deployment by this session.

Genesis observed at `2026-09-08T11:36:21+00:00`, fingerprint
`01278e47e6a59a10e3ac0435e09cbeb9a0d6f567ca68b01efe531ea3c054ac62`.
Direction event: `20260908T112911Z-233ff7d808b348009325294020b88043`.
Local inference and automatic usage resets remain on hold. Astra/high requested;
task settings cannot be changed or verified through available tools.

Next: publish this checkpoint as a PR, then refine the standalone case-study
dashboard and icon cards separately. It is directly addressable, not authenticated;
no auth changes are authorized. Lock remains held by task `01a078e0` during that work.
Recovery: `2f7ea04` before these main-site edits, or the original
`checkpoint/portfolio-before-brand-wave-20260906` (`b8aac95d`).

## Historical launch PR notes, September 7, 2026

**[Pull request 7](https://github.com/jacobmedley/jacobmedley.com/pull/7)** on
`release/portfolio-brand-wave-launch` at `d439d36`, 21 commits and 37 files ahead of
`main`. Nothing is deployed. A pull request does not trigger
`.github/workflows/deploy.yml`; it fires only on push to `main`, so the live site
changes when Jacob merges and not before. Recovery stays at
`checkpoint/portfolio-before-brand-wave-20260906` (`b8aac95d`).

The branch was cut from `f20d21e` rather than committed onto
`codex/portfolio-brand-wave-continuation-20260906`, so the Codex session's worktree
was not disturbed.

Checks on the final tree: `npx tsc --noEmit` clean, `npm run lint` clean,
`npm run build` clean at 10 exported pages, 43 internal links resolve, no horizontal
overflow at 375px or 1265px, no zero-opacity or hidden elements on the home page,
index, or a detail page, no broken images, and a clean console apart from `/images/*`,
which is served from SiteGround and verified `200` live.

**Not verified: motion.** This host forces `prefers-reduced-motion: reduce`, so the
card dolly, geometry, and parallax work could not be observed. Look at it on a normal
browser before merging. No parity or visual regression capture was run either.

The approved four-wave implementation and final browser acceptance are complete on
`codex/portfolio-brand-wave-continuation-20260906` in the assigned Codex worktree.
The continuation commits are `02468cb`, `8a94356`, `53dcbb9`, `e58dd20`, and
`ebb025c`, built on the approved Wave 1 commit `3868955`. Pre-change recovery remains
available at `checkpoint/portfolio-before-brand-wave-20260906` (`b8aac95d`).

Follow-up browser annotations are implemented at `d6e8c55`, and Jacob's selected
photo/icon card system is implemented at `f104b61`, visually refined at `108ce73`,
extended across the main/case-study experience at `c0b87f1`, and given its final
label and A/B geometry refinements at `c98bede`. Shared icon-card motion, expanded
geometry, read-action spacing, and the Font Awesome hydration fix are implemented at
`9530f74`; see
[the annotation checkpoint](browser-annotation-checkpoint.md). Selected Work now uses
one shared card layout with full-color photo and project-specific icon treatments.
Discipline badges and case-study filters use the concise taxonomy without the redundant
word `Design`. `/design-variants/`, the noindex review page, was removed at `d439d36`
before launch so it would not become a reachable public URL; its accepted result stays
recorded in [the annotation checkpoint](browser-annotation-checkpoint.md). Both
treatments share clipped 32px
corners, a translucent blurred caption panel, Title Case eyebrows, and media-only motion.
The six icon cards now use a shared centered circular anchor with project-specific
geometry. Badge metrics are unified without changing colors, the main page no longer
links into the standalone case-study route, and its in-page hero control is a single
48px circular-arrow glyph. Badge labels are Title Case across the main and review
surfaces, card-style actions read `Read` with the arrow, and A/B Testing uses a 140px
translucent blurred icon anchor over expanding, rotating, fading triangle geometry.
All icon cards now use the same 140px translucent blurred anchor, desktop hover/focus
dolly motion, slow touch-device motion, and layered parallax depth; reduced-motion
preferences remain static. Personalization uses twelve warp lines, Personas uses twelve
visible expanding layers, and the main `Read` action uses `10px 26px` padding. The
development preview is error-free after moving the Font Awesome kit to post-hydration
loading.

Responsive collection refinements are checkpointed at `023bb11`. The visible main
section heading is restored to `Full Stack Designer`. Icon cards now stack one, two,
then three columns at the mobile, small-through-large, and extra-large ranges. The
visual cards are ordered Wrong, Reveal, Viva; Wrong spans the row from 576px through
1199px, with Reveal and Viva paired below, and all three share a row from 1200px.
The case-study index action uses a thin down chevron. Shared icon motion values are
collected as custom properties on `.thinking-thumb-icon` for manual tuning. Exact
breakpoint acceptance passed at 375, 768, 974, 1191, 1200, and 1440px with no
horizontal overflow or browser errors. This checkpoint also installs repository-level
agent instructions and the append-only Genesis Exchange protocol; shared direction is
recorded through the Exchange inbox rather than by editing coordinator-owned files.

See [the owning production plan](website-production-plan.md),
[final acceptance](final-brand-wave-acceptance.md), and the individual
[Wave 1](wave-1-browser-acceptance.md), [Wave 2](wave-2-visual-checkpoint.md),
[Wave 3](wave-3-taxonomy-checkpoint.md), and [Wave 4](wave-4-outcomes-checkpoint.md)
checkpoints. The original checkout and its existing ownership marker were preserved
throughout; every session since has worked from its own worktree.

Volatile state. Read this first, write it last.
Durable rulings, wording standards, and figures live in copy-register.md.
If a fact would still be true in three months, it belongs there, not here.

## Surfaces

| Surface | Current | Owner |
|---|---|---|
| Site | main, see git log | site chat |
| Word master | v1r9 | resume workstream |
| Principal IC master | v1r1 | resume workstream |
| Design systems master | v1r1 | resume workstream |
| Designed PDF | v2r3 | resume workstream |
| LinkedIn | unmanaged, out of scope | Jacob |

## Open

Nothing blocking on the site side. The launch is waiting on Jacob at the merge button.

Exchange, at fingerprint `99632dbe`:
  - Publication authorized, recorded as change event
    `20260908T000032Z-fab91547298644b1bace213cd1c120f7`.
  - Launch candidate and checks recorded as update event
    `20260908T000152Z-e608b4c1ce5d488e97da82244645d78f`.
  - Coordinator: `20-workstreams/website.md` still reads "no website action is
    assigned by this card", which is now stale.

Not in this pull request, deliberately:
  - `C:\dev\jacobmedley.com` holds uncommitted case-study files dated September 5 that
    diverge from the branch versions by 23 to 84 lines each. They are an earlier
    iteration of the same feature. Left untouched; they belong to whoever wrote them.

**For the Coordinator, Aug 31. The accessibility claim is dropped, not corrected. The repo
still carries it.**

*Checked September 7: both action items below now appear satisfied. The retirement is
recorded in copy-register.md at "ACCESSIBILITY CLAIM, RETIRED 2026-09-05", and none of
the three retired strings appears in `docs/case-studies-sanitized.md` or anywhere else
outside that register entry and this note. Left standing rather than closed, because
closing another session's open item is not this session's call.*

The masters said "Built an automated accessibility auditing pipeline ... runs on a schedule
against production." Jacob corrected the facts, then dropped the whole claim: he devised a
process letting a non-technical person run a script against an unpublished page, automation
still in progress, and his read is that it is weak beside the rest of the record.

Retired, never reuse: "Built an automated accessibility auditing pipeline," "runs on a
schedule against production," "a two-person function can now flag critical issues before
launch."

Still allowed: accessibility and WCAG as a competency. No pipeline, no automation, no
schedule.

  - docs/case-studies-sanitized.md carries the retired wording. Remove it.
  - docs/copy-register.md should record the retirement so it cannot come back.
  - Full history is in The-Hunt/rules/canonical-figures.md.

The resume workstream cleared its own masters and unsent files. It does not write the repo,
so both items above are the Coordinator's.

Job search state lives in The-Hunt/pipeline.md, not here.

Carried on feat/recruiter-portfolio, unmerged:
  - remove the reviews-that-end-in-decisions study from portfolio-studies.ts
  - fix "Two assistants came out of the same build" per the assistant
    wording standard
  - thumbnails, layout issues
  - Note: docs/case-studies-sanitized.md on feat/ai-assistant-case-study still
    reads "Two assistants came out of the same build." Both resume surfaces are
    already fixed. That branch is the last place it survives.

Carried on feat/ai-assistant-case-study, unmerged:
  - Jacob's wireframes, notes, and spec-versus-shipped content

## Closed, do not re-raise

Anonymization standard, Hydra as a proper noun, pre-2015 LinkedIn scope,
the making-the-work-smaller cap, assistant wording, title standard,
peak-season figures. All recorded in copy-register.md.
