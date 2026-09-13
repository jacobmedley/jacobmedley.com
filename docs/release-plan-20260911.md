# Finish the refinement and release it

September 11, 2026. This is a plan, not an instruction to deploy during the
planning task. Use the separate prompts in [release-prompts-20260911.md](release-prompts-20260911.md).
Submitting the final publication prompt explicitly authorizes that release.

## Current baseline

- Checkout: `C:/Users/jacob/.codex/worktrees/6fa6/jacobmedley.com`.
- Branch: `codex/website-art-layout-20260910`.
- Latest application checkpoint: `d7999d5dfe5f23b33b8e7a47d92d5f28a8818384`.
- GitHub main freshly read for this plan: `e6b3672f88e5847d84a854f45ae3d29ca8269952`.
  PR #8 is merged; there are no open PRs. Main is an ancestor of the application
  checkpoint, with 15 local commits after it. Recheck before execution/publication.
- Export preview is recorded at `http://localhost:3011/#work`, PID 56584.
  Verify the process/path before reuse. Source edits require a new export.
- Deployment is the existing GitHub Actions **Deploy to SiteGround** workflow,
  triggered by main. It builds with Node 20 and FTP-deploys `out/`. It is not Vercel.
  Preserve `dangerous-clean-slate: false` and the unmanaged server directories.

This packet supersedes the unfinished execution sequence in the September 8
seven-stage plan. It does not reopen completed stages or restore superseded
copy/design choices. Historical checkpoints remain evidence of their own versions.

## What stays finished

Preserve the alternating, content-sized horizontal featured cards and their
820px internal stacking boundary; full-card navigation; 40% white/3px glass;
shared slow motion; stronger hover circles; connected moving nodes; maze paths;
Hydra component artwork; OPF white silhouette and falling leaves; rounded clipping
and wave joins. Preserve the current icon ownership and loaded-glyph fallbacks.

The website resume now uses **Twenty years. One belief.**, the existing slogan,
larger introduction, divider and balanced bullets. B44/B45/B46 govern the current
copy and labels; B41/B40/B42 are superseded. Do not resurrect pending approvals
from older reports. Five modal heroes now extend behind the native scrollbar and
glass header/footer; all fourteen modals share reading surfaces and controls.

The standalone index and six full stories remain directly addressable, separate
from homepage navigation and unauthenticated. Preserve their data, metrics,
attribution, source links and canonical diagrams.

## Remaining work, including paused items

| Item | Required disposition | Owner/checkpoint |
|---|---|---|
| Original Stage 5: sticky major headings | Finish Case Studies, Full Stack Designer, Resume and Education. Expanded stacked headings become centered inline icon/title bars. Fix Education's short containing wrapper. | Sol, implementation checkpoint A |
| Standalone sticky context/filter assembly | Use the approved outcomes/stories context plus discipline filters as one measured stack. Preserve filtering, anchors, result announcements and source headings. | Sol, checkpoint A |
| Five DentalPlans supporting cartoons | Replace `dpprod-modal/rocket.png` and `mvp-one.png` through `mvp-four.png` in the presentation with source-backed artifacts or restrained schematics of the existing section content. Keep originals. The opening cartoon is already replaced. | Sol, checkpoint B |
| Other decorative images | Resolve Hydra `hydra/why.jpg`, A/B `split01-modal/thumb.png`, and Personas `kitchen-sink/persona-one.webp`. Prefer actual system, control/winner or `Persona-Cards.png` evidence. Correct the Personas alt with the replacement. | Sol, checkpoint B |
| Personalization supporting art | Review `automation.gif` and supporting images. Prefer a restrained rendering of the existing documented workflow if it improves clarity; otherwise explicitly retain the canonical diagram with a reason. Preserve facts and pause behavior. | Sol, checkpoint B |
| Global visual consistency | Review all modal media branches, badges, rules, buttons, arrows and corners after replacements. Preserve genuine product screenshots, including historic cartoons inside actual client-site screenshots. Do not repaint source evidence. | Sol, checkpoint B |
| Independent full acceptance | Complete original Stage 6 plus the September 10/11 motion, card, resume, modal and full-bleed requests. Check browser, responsive, accessibility, source and publication boundaries. | Astra, acceptance checkpoint |
| Separate PR | Reconcile current main, review the complete unpublished diff and open the branch's own PR. | Luna, PR checkpoint |
| Merge, deploy and verify public cache | Release only the accepted PR head using the existing main-triggered workflow; verify actual public delivery and recovery readiness. | Astra, publication checkpoint |
| External resume masters | Word v1r6 and the designed PDF rebuild were already owned by the resume workstream. Verify the site's resume/download links and record current owners/status; do not silently rewrite external masters or claim they are updated. | Handoff item, not automatically a website release blocker |
| Genesis profile, lane and malformed event | Optional coordinator work. Do not turn website release into a runner/infrastructure repair. | Optional Genesis prompt |

Every requested visual item needs an implementation or an explicit, source-based
disposition in checkpoint B. A new unresolved design decision is not silently
marked complete. Essential navigation, lost content, broken media, inaccessible
controls, misleading claims, clipped full-bleed edges or broken deployment are
release blockers. Browser environments that cannot be tested must be identified
as release limitations; do not certify full WCAG conformance from automation.

## Model sequence and cost discipline

| Order | Model and effort | Work | Estimated remaining cloud input/output tokens |
|---|---|---|---:|
| Optional G | Luna / medium coordinator, then qualified desktop Qwen3.5 9B with thinking off | Establish whether bounded local review is usable; skip immediately if not | 1–3k cloud overhead, additional to baseline |
| 1 | GPT-5.6 Sol / medium | Sticky headers, then imagery and consistency; two local checkpoints in one task | 20–38k |
| 2 | GPT-6 Astra / medium | Independent acceptance of the final implementation; bounded fixes and affected rechecks | 16–28k |
| 3 | GPT-5.6 Luna / medium | Final source-of-truth reconciliation, reviewed branch push and separate PR | 4–7k |
| 4 | GPT-6 Astra / high | Exact-head release decision, merge, deployment observation and public verification | 6–10k |

Baseline remaining execution estimate: **46–83k cloud tokens**, excluding this
planning task and including normal intake, one bounded fix/review cycle and
handoffs. This is a forecast, not usage, a dollar quote or measured savings. No
subscription allowance percentage is a token balance. Reforecast at checkpoints
if new design work or repeated failures exceed the range; keep required checks.

The current host tool catalog exposes Luna, Sol and Astra with the recommended
efforts. This is availability evidence, not a switch of the current task's model.

Use four main execution prompts rather than restarting all seven historical
stages. Let the Sol task retain context through its two checkpoints. Use one
writer; parallelize deterministic read-only checks where safe. A small read-only
review can run beside implementation, but don't spawn a duplicate full audit.
Concurrent source writers require separate worktrees and an integration owner.

Run existing scripts for inventories and comparisons. Share compact failure
reports, changed excerpts and source hashes, not full histories or screenshot
batches with every worker. After a failing check, rerun the affected check; repeat
the final matrix only after a relevant implementation/base change. Do not save
tokens by removing coverage or weakening assertions. Upgrade Sol to high only
for persistent layout/interaction failures; use Astra/high only for a specific
design, factual or release risk that requires it.

Use existing source artifacts and vector geometry first for replacement art.
If a new raster illustration is necessary, read the imagegen skill and use the
available image tool within existing authorized entitlement, with at most two
initial batches and a focused correction. No paid API fallback, model download,
usage reset or extra spending. No raster generation is assumed in the budget.

## Genesis eligibility and bounded review contract

The refreshed Luna audit found desktop Qwen3.5 9B installed, reachable and not
loaded; queue metadata showed no queued/running jobs. That is not dispatch
permission: the `jacobmedley` runner profile points at `C:/dev/jacobmedley.com`,
not this worktree, and live ownership of the persistent worker kernel lock was
not certified. Laptop Qwen3.5 4B is installed/reachable, but its inference hold
remains; endpoint health alone does not release it. No inference ran in planning.

Default local workload: **zero jobs**. Optional maximum: two serial desktop review
jobs, each at most 6k input/800 output tokens, with one invalid-output retry total.
Estimated local workload if qualified: up to 18k input/2.4k output including that
retry. Record actual counts and all attempts. Local review does not eliminate
cloud supervision, source validation or acceptance.

Before any submission, an authorized coordinator must establish an exact source
binding for this worktree/revision and verify the worker lane, live endpoint,
installed model, qualification and runner permissions. Pasting excerpts does not
by itself repair a profile-root mismatch. Do not remove a lock, repoint a profile,
copy the checkout or displace a loaded model merely to enable local inference.
Any required profile/infrastructure change stays with its authorized owner.

Suitable jobs are (1) compare the scoped changed selectors/JS with the motion and
sticky contract, or (2) compare the annotation status table against cited evidence.
Each spec includes worktree/revision, full source-file hashes, exact excerpt line
bounds, context fingerprint, task ID and this output schema:

`{ findings: [{ source, lines, requirement, evidence, concern }], unknowns: [] }`

No new copy, code patches, commands or invented runtime results. Validate every
finding against source before accepting it. The website supervisor implements
changes; model output is never auto-executed. If the route fails eligibility,
continue with scripts and the named subscription models; do not wait on Genesis.

The Exchange helper still rejects historical event
`20260909T-stage3-26c176a-7e078f3.json` for missing provenance. Preserve it. Fresh
manual reads and a matching inventory fingerprint are the current workaround;
only the Genesis coordinator can reconcile shared rules/current/workstream files.

## Shared execution contract for every prompt

Read `docs/STATUS.md` first, then `docs/working-agreement.md` and
`docs/genesis-exchange.md`. Read this plan and the preceding checkpoint. Before
copy/alt changes, read the copy register, Jacob style, voice/tone and data-reporting
authorities; author the B edit first. Latest user instructions and applied copy
supersede historical prompts. No private source-data reads or new factual claims.

Freshly read the Exchange entry point, Jacob notes, current brief, coordination,
model routing, website card and relevant unresolved/new inbox records. Respect
owners and holds. Verify lock, branch, HEAD and working tree before writes. Treat
unexpected overlapping changes as a structural stop; preserve them. Do not reset,
clean, force-push or modify another worktree. Reuse the owning branch and known
preview after checking their actual state; ports in old documents are not proof
of ownership. Confirm PID, command line and repository path before stopping a
process. No double builds against the same `.next`/`out` directories.

Recommend the named model/effort, verify availability in current tooling and honor
Jacob's actual selection. Recommendations are not model switches. Local inference
is conditional on the contract above. No extra spending or automatic resets.

At each checkpoint, record decisions, actual commands/results, changed files,
browser evidence, unresolved items, source revision, preview PID/port and rollback.
Write STATUS last, save the local checkpoint, freshly recheck Exchange and append
one unique update with the final commit. Release only your own lock. Do not rewrite
old evidence into a pass for a newer build. Publication is limited to the stage's
explicitly submitted prompt. No automatic transition from PR creation to merge.

## Acceptance commands and evidence

Inspect current package/scripts before running; use installed binaries and lockfile.
The older `npm run lint` invokes `next lint`, which may not match the installed
Next version. Use the available ESLint CLI directly and document genuine baseline
failures; don't delete rules or edit a harness only to turn it green.

```powershell
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/eslint/bin/eslint.js . --no-cache
node node_modules/next/dist/bin/next build
git diff --check
$env:ACCEPTANCE_BASE_URL='http://localhost:3011'
$env:PREVIEW_URL='http://localhost:3011'
node scripts/parity/annotation-acceptance.mjs
node scripts/parity/dashboard-acceptance.mjs
node scripts/parity/stage4-acceptance.mjs
node scripts/parity/stage4-motion-network-acceptance.mjs
node scripts/parity/stage4-refinement-acceptance.mjs
node scripts/parity/stage4-surface-acceptance.mjs
node scripts/parity/housekeeping-acceptance.mjs
```

Port 3011 is the current export preview, not a required universal port. Set both
URL variables to the verified development preview for affected development checks.
Use `localhost`: the icon kit previously returned 403 for `127.0.0.1`. Preserve
housekeeping's visible native scrollbar launch setting and wait for thumb repaint
before drag tests. Add focused Stage 5 checks to cover the new behavior.

Acceptance must cover:

- Original annotation IDs 1–18, the separate September 11 card-comment IDs 1–18,
  September 10 artwork/layout comments 1–12, housekeeping comments 1–5,
  continuous hero and conditional full-bleed requests.
  Namespace these groups; repeated numbers are different requests.
- Homepage, all fourteen modals, standalone filters/outcomes/cards and all six
  directly loaded stories. Preserve source JSON, link targets, metrics and diagrams.
- 320/375/768/1100/1440 widths; 699/700 and 1099/1100 dashboard boundaries;
  819/820 card, 899/900 resume and measured modal-container boundaries. Test both
  sides of any new breakpoint, open-modal resize, high-DPI fractional seams and
  zoom/text resize to 200%. Test user text spacing and 320 CSS-pixel reflow.
- Sticky sections forward/backward, anchors, filtering at scrolled positions,
  focus visibility, mobile navigation, safe areas and modal stacking. No header
  pileup, jump, clipping, trapped controls or duplicate accessible headings.
- Mouse, keyboard, touch emulation; first-tap navigation; Escape and both modal
  close controls; focus trap/return; native wheel and scrollbar dragging. Confirm
  background continuity at both edges, behind the track/header and while scrolling.
- At least two idle cycles, hover/focus enter/leave, node/edge/packet attachment,
  global/modal pause sync, GIF freeze, live reduced-preference changes, offscreen
  suspension, actual tab visibility changes and client-navigation/font hydration.
- Rendered contrast over moving glass/photo surfaces in active states: normal text
  4.5:1, qualifying large text 3:1, applicable essential UI/state boundaries 3:1.
  Log actual colors/ratios and sample limits; decorative strokes are not automatically
  essential UI. Check targets and focus against WCAG 2.2 AA, without a blanket claim.
- Existing accessible Chromium plus available Firefox/WebKit/physical devices.
  Inventory first; no silent installation or model/browser download. If unavailable,
  give a concrete untested-browser risk disposition for release, not a fabricated pass.

Full required suites run once against the final export after integration; targeted
development checks run during implementation. Rerun affected suites after fixes or
base reconciliation. Keep enough screenshots/JSON locally and commit a compact
evidence manifest so a new task can validate the result without rerunning everything.
Compare the local runtime with CI's Node 20. Use that existing runtime if available;
otherwise record the mismatch and verify the actual CI build before deployment
acceptance. Do not upgrade dependencies to resolve an unrelated tool warning.

## Release and recovery

Luna pushes only the reviewed implementation branch and opens its own PR against
fresh main. Include the acceptance commit, actual limitations and rollback in the
PR. Documentation-only packaging commits must be inspected; material code/base
changes invalidate affected acceptance. Inspect the entire diff from main, including
the standalone dashboard and earlier unpublished stages, not just modal changes.

The final Astra prompt authorizes merging only that reviewed PR head. Capture the
then-current production/main commit as the release rollback, recheck PR head/base,
mergeability and checks immediately before merge, and avoid direct pushes to main.
Observe the real deployment run to completion and associate it with the merged SHA.
Do not change the FTP workflow or use an alternative hosting provider.

Verify ordinary public requests and cache-bypassed requests for the homepage,
standalone index, every detail URL and changed static assets. Verify normal-browser
resume/modal/card/sticky flows. Record status, `X-Proxy-Cache`, `Last-Modified` and
visible build/version evidence where available; HTTP 200 alone is insufficient.
If SiteGround serves stale content, use existing authorized Site Tools access to
purge and recheck. If access is unavailable, report the exact cache blocker and do
not claim the release is publicly verified.

Check `/musings/` and the known `/interaction-design-concepts/response-times/`
before and after release. A 403 on the latter directory's root alone is expected
and does not verify its content. Never delete these unmanaged directories or
enable clean-slate FTP deployment.

If a verified deployment regression occurs, stop further release changes. The
publication prompt includes permission for a reviewed revert of this release only,
preserving intervening work, followed by redeployment and public/cache checks.
Never reset or force-push main; if recovery would overwrite others' work, report
the specific conflict. Final handoff must distinguish merged, workflow-complete,
publicly verified, rolled back, and blocked states.
Write post-deployment observations in a local documentation checkpoint on a
non-main branch plus the Genesis inbox. Do not push a documentation-only main
commit merely to record success, since that would trigger another deployment.

## Planning checkpoint

Planning changed only this file, `docs/release-prompts-20260911.md` and
`docs/STATUS.md` (written last). No application, asset, workflow, copy-register,
preview or deployment changes. No B edits. The existing preview was verified as
PID 56584 serving this worktree's export on 3011 and left running.

Checks: fresh GitHub main/PR reads, local ancestry and clean-baseline inspection,
required path/harness existence, five prompt sections, balanced code fences,
relative document links and `git diff --check`. No application tests were rerun
for this documentation-only plan. One existing Luna agent performed the read-only
Genesis eligibility refresh; no other model was started and no inference job ran.

Exchange observation at 2026-09-11T19:49:18.797322+00:00:
`6bfdaef395f60fcf68d49a2b3409b4ef405f93f5298fd165ea8aec7288e69955`.
Direction event: `20260911T194918Z-a663379783474ee18fd16c9fad56510a`.
The final update records the actual planning commit. Rollback for these documents
is application checkpoint `d7999d5`; preserve later work with a reviewed revert or
isolated checkout. No push, PR, merge or deployment occurred in planning.
