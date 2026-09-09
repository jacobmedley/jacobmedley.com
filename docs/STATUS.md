# Status

## September 9, 2026: Stage 1 complete — choice pending

**Current direction:** Stage 1 only is complete. No production UI edits, option
selection or Stage 2 work. This section supersedes the historical uncommitted
dashboard/planning handoff below. Start the next stage with the
[Stage 1 checkpoint](stage1-checkpoint-20260909.md), which records all design,
asset, icon, copy, motion, glass, type and sticky-header decisions and limitations.

### Local state and recovery

- Worktree: `C:\Users\jacob\.codex\worktrees\8350\jacobmedley.com`.
- Branch: `codex/website-refinement-stage1-20260909`.
- Stage 1 HEAD is the local documentation commit containing this STATUS update.
  Resolve with `git log -1`; the final response and unique Genesis update record
  its actual hash. The immediate preserved baseline is
  `69a6b220a4c8333d8a9c8a7f20a3c917af0bfd7d`.
- Before any branch/base operation, the existing 15-file dashboard/docs diff was
  reviewed and committed as `8ee13104b9412ff9c35ce9af1c1ea3abc1c1e9c2`, tagged
  `checkpoint/dashboard-before-stage1-20260909`. The original dashboard branch
  remains there. No unrelated checkout was changed.
- Main rechecked at `e6b3672f88e5847d84a854f45ae3d29ca8269952`; PR #8 is MERGED.
  Its source tree equals the old a5fa620 baseline. Replayed the preserved checkpoint
  onto merged main; zero full-tree diff between 8ee1310 and 69a6b22. No stacked PR
  assumption remains. No PR exists for this Stage 1 branch at closeout.
- Intake tree matched the preceding STATUS (7 modified, 8 untracked); no lock
  existed. Task 01a084cd claimed it. Release only this task's lock after committing;
  the next stage must inspect and reclaim actual ownership before writing.
- Rollback: recover 69a6b22 in a separate worktree, or revert this Stage 1 docs
  commit after checking ownership. Original recovery is 8ee1310/the named tag.
  Never reset an unrelated or subsequently changed working tree.

### Review packet and decisions

- [Comparison board](reviews/stage1-20260909/index.html), served locally at
  `http://localhost:8091/`: A split art/glass, B continuous glass band, C layered
  schematic. All have desktop and narrow specimens/screenshots. No default
  recommendation or selection is recorded. The Desktop control selects a viewing
  width, not a design option.
- [Copy register](copy-register.md): B41 five source-reviewed drafts, 25–33 words,
  remain pending Jacob's approval. B40 placement/order reviewed; B42 action/status
  behavior specified. None applied to production.
- [Source/icon sheet](reviews/stage1-20260909/assets.html): supplied WebMD/BMD
  vectors inspected, original hashes preserved. Viva vs-3 has a verified clean
  same-couple region; raw untoned photo remains unavailable among inspected sources.
- Registry reserves 24 project/study/metric/section identities, explains repeated
  semantic diagram symbols, and preserves factual diagrams. Existing kit rendered
  all 85 thin candidates and two custom marks; four legacy technology brands remain
  unresolved. No fallback purchase, package or model download.
- Changed files for Stage 1: this STATUS, copy-register.md,
  stage1-checkpoint-20260909.md, and docs/reviews/stage1-20260909/ (five HTML pages,
  six JPEG screenshots, source/registry/kit/layout/check/process evidence JSON).
  Production app/components/lib/hooks/public/scripts are unchanged from 69a6b22.

### Checks, previews and coordination

TypeScript, lint and diff whitespace checks pass. Actual 320/375/768/1440 browser
layouts have no horizontal document/copy overflow and retain 140px anchors. Exact
register/artifact copy equality, source SVG hashes, canonical IDs, review isolation
and full-tree baseline preservation pass. The raw 39-file closeout digest is
3CF659D17ACA0DA2FC98A4E646E8D87DCAF472E94491D6D3506E9E591630488A; it differs from
the intake byte digest while Git-tracked source content remains identical. See the
checkpoint for method and the distinction from source-tree equality.

Next dev is running at loopback 3000 (PID 25352 at closeout); / and /case-studies/
were opened successfully. The standalone page remains directly addressable without
authentication and separated from the homepage. Review-only loopback 8091 serves
the docs directory (PID 16792); export port 8090 is stopped. Process evidence is in
the packet. No production rebuild for docs-only changes. OS reduced motion was
active: normal-motion and later sticky/UI acceptance remain for their own stages.

No push, PR, merge, deployment, local inference job, usage reset or additional
spending. PR #8's prior deployment is historical; live edge cache was not verified.
Astra/high is available in host metadata and was recommended; no unsupported model
switch is claimed. Initial cloud estimate 35–60k includes review overhead and is
not measured usage/savings. Zero local jobs were dispatched.

Genesis controls and seven unresolved directions were reread before closeout;
2026-09-09T07:57:35Z fingerprint
6fef3e064d31c3223c78ca748f5b22fb75efdecbf5274dcaac6713b7633e731f. The laptop hold
and no-reset rule remain. Stage 1 direction event is
20260909T061953Z-6157cbd8624a4faca1fa800e3c36a79d. Append a unique update after
final commit with actual hash; coordinator-owned CURRENT/website pointers remain
untouched. Local freshness does not assert remote sync or acknowledgement.

**Remaining:** Jacob chooses A/B/C and reviews B41. Later stages require their own
instruction. Stage 1 stops here; no option has been chosen on Jacob's behalf.

---

## September 9, 2026: documentation-only handoff for September 8 annotations

**Current direction:** Jacob requested a review and staged plan for 18 browser
annotations, with a fresh chat per stage. Only documentation changed after that
instruction. The previously completed local dashboard work is preserved. Commit,
push and separate-PR closeout are deferred to the future stages; no new site edits
or publication are authorized by this planning handoff.

Start with the [seven-stage plan](website-refinement-plan-20260908.md),
[18-item source review and asset inventory](annotation-review-20260908.md), and
[paste-ready stage prompts](stage-prompts-20260908.md). Stage 1 is Astra/high:
preserve a recoverable local checkpoint, reconcile the merged baseline, resolve
icon ownership and copy, and present three horizontal card options. Later stages
use Luna/medium for specified edits, Sol/medium for components/motion/sticky headers,
Astra/medium for acceptance, and Luna/medium for explicitly authorized PR packaging.
The plan contains token ranges, qualified local-model boundaries and checkpoints.

### Git and release state

- Assigned worktree: `C:\Users\jacob\.codex\worktrees\8350\jacobmedley.com`.
  The initial handoff's `jacob.codex` path was corrected to this existing directory.
- Branch: `codex/case-study-dashboard-refinement`.
- Current HEAD: `a5fa6206ce00a54fd13a0550f8b3552cd42f5dec`. **No new commit**;
  dashboard implementation and this documentation packet remain uncommitted.
- [PR #8](https://github.com/jacobmedley/jacobmedley.com/pull/8) merged at
  `2026-09-08T23:28:27Z`, merge commit
  `e6b3672f88e5847d84a854f45ae3d29ca8269952`. GitHub main was verified at that
  same commit during this handoff. Its [SiteGround workflow](https://github.com/jacobmedley/jacobmedley.com/actions/runs/34290806205)
  reports success. This task did not initiate the merge or deployment and has not
  independently checked the live edge cache.
- No PR exists for the dashboard branch in the GitHub query at handoff. The earlier
  plan to stack work on open PR #8 is stale. Future work must reconcile the merged
  baseline, preserve later changes and use a separate PR. Do not reopen, overwrite,
  merge or deploy as part of this planning task.
- Lock was handed over from idle task `01a078e0` under Jacob's explicit continuation
  and held by task `01a08244` during edits. Release this task's own lock at closeout;
  next stage checks the actual lock and claims ownership before writing. Original
  checkout ownership and assets were not changed.

### Completed locally before the documentation-only instruction

The dashboard has the left hero/CTA, four source-backed career cards, shared
outcome/story filters and responsive frosted icon cards. The 47% card names finance,
one measured year and the share of that year's growth increment. Six-to-two timing
uses the canonical proof value. Exact 1100px outcome-grid behavior and narrow stat
text fit were fixed. Canonical story JSON, source mappings, existing diagrams,
detail pages and shared global CSS were preserved. See the detailed
[local dashboard verification](case-study-dashboard-acceptance.md).

Before the scope change, TypeScript, lint, production build, expanded dashboard
acceptance against dev port 3000 and export port 8090, and `git diff --check` passed.
The harness covers 11 widths from 320 to 1440px, both collections' filters, sticky
placement, thin-font hydration, keyboard/touch motion, reduced motion, client
navigation, all six detail routes and horizontal overflow. Chromium browser review
covered desktop, tablet and phone. Physical devices, Safari and Firefox were not
tested. These results do not accept the newly requested annotations.

### Documentation-only changes and verification

Documentation paths changed or added in this worktree:

- `docs/STATUS.md` — this current handoff, updated last.
- `docs/copy-register.md` — B39 explicitly local; B40 placement, B41 summary drafts
  and B42 motion-control labels are pending. Site surface pointer reflects PR #8.
- `docs/annotation-review-20260908.md` — all 18 requests, owning sources, icon
  collisions, deterministic summary counts and four supplied SVG hashes.
- `docs/website-refinement-plan-20260908.md` — seven stages, model/effort, budgets,
  dependencies, accessibility criteria and acceptance checkpoints.
- `docs/stage-prompts-20260908.md` — common intake plus one prompt per new chat.
- `docs/case-study-dashboard-acceptance.md` — prior local evidence, with a clear
  boundary separating it from the pending annotation work.
- `docs/browser-annotation-checkpoint.md` and `docs/website-production-plan.md` —
  historical records now point to the current plan and release state.

Preserved uncommitted implementation paths: `app/case-studies/page.tsx`,
`app/case-studies/dashboard.css`, `components/case-studies/CareerStats.tsx`,
`components/case-studies/StudyIconArt.tsx`,
`components/case-studies/OutcomeDashboard.tsx`,
`components/case-studies/StudyCollection.tsx`, and
`scripts/parity/dashboard-acceptance.mjs`.

Planning verification: all annotation IDs 1–18 occur once in the request table;
both plan and prompts contain stages 1–7; B39–B42 are unique; new packet file links,
code fences and whitespace pass; the four SVG hashes match the untouched originals.
`git diff --check` passes. Runtime sources were not rebuilt or retested for doc edits.
The 39-file fingerprint over sorted `rg --files app components lib scripts` excluding
`scripts/parity/shots/**` is unchanged before/after planning:
`8BB2352270C82E0FE6C54F172E4B4431BB566DA28FD76DF3D4A1F0056A4F2CEF`.
It hashes newline-joined `relative-path:SHA256` entries, UTF-8, with uppercase hashes.

### Preview, recovery and remaining work

The worktree's dev preview remains at `http://localhost:3000/case-studies/` and
returns HTTP 200. At handoff, listener PID 42540 belongs to parent PID 43448;
both command lines identify this worktree's Next server. Temporary export port 8090
is stopped. Future sessions verify PID and command line before any service action.
Prior captures/results are local, ignored files in `scripts/parity/shots/dashboard/`;
the old PR-body draft there predates the planning direction and must not be published.

Rollback reference for the dashboard code is `a5fa620`; whole-site historical
recovery is `checkpoint/portfolio-before-brand-wave-20260906` at `b8aac95d`.
The new local work has no commit yet: these references do not recover uncommitted
files. Stage 1 must preserve them in a reviewed checkpoint before branch/base changes.
Do not use a reset or clean to reconcile this dirty tree. Current main's merged
release reference is `e6b3672`, distinct from the dashboard's parent.

All 18 new requests remain pending. Open decisions are the horizontal design
selection, complete icon registry, verified clean Viva source, exact B41 copy,
motion/readability tokens and standalone sticky-header hierarchy. New BMD/WebMD
vectors exist only in the original checkout and were inventoried, not copied.
Later implementation needs fresh cross-site motion and WCAG 2.2 AA acceptance;
the user phrase "WCAG 3.2 AA" is clarified with W3C sources in the plan.

Genesis was reread before this handoff at fingerprint
`10e92eb906768540d36a46c974bead83cbbea490ad39501ef9708d8add368373`, observed
`2026-09-09T04:01:21+00:00`. Six unresolved change records were reread and reconciled:
the latest docs-only direction governs this task; laptop inference hold and no-auto-
reset remain honored. No conflicts were reported. Direction event:
`20260909T034932Z-8dbc50d0b48c4648acb71f185d80b057`.
A unique `update` event follows this final repository documentation write, recording
the actual unchanged HEAD, verification, PR/deployment state and recovery reference.
The coordinator still needs to refresh the stale website card/current brief;
no other machine's synchronization or acknowledgement is asserted.

This task used deterministic tools and the existing cloud session; no local model,
paid fallback, model download, reset or additional spending. Model recommendations
are not a claim that current-task settings were switched.

## Historical September 8, 2026: main-site annotation checkpoint

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
