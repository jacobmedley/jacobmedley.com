# Case-study dashboard acceptance

**Historical local verification, before Jacob's documentation-only direction.**
The implementation described here remains uncommitted. No runtime source was edited
after that direction. The new 18 annotations are pending in
[the annotation review](annotation-review-20260908.md); their implementation and
acceptance belong to [the seven-stage plan](website-refinement-plan-20260908.md).
In particular, this report does not accept the newly requested desktop idle motion,
unique cross-site entity icons, revised artwork or sticky section headers.

September 8, 2026. Branch: `codex/case-study-dashboard-refinement`.
Baseline and rollback: `a5fa6206ce00a54fd13a0550f8b3552cd42f5dec`, the unchanged
main-site checkpoint in [PR #8](https://github.com/jacobmedley/jacobmedley.com/pull/8).
Current Git/PR state is recorded in `STATUS.md` and the final Genesis inbox update.

## Locally verified implementation before the new annotations

- Intro and headline remain left, with the CTA immediately beneath the headline.
  Four career cards occupy the right at desktop sizes and stack below at smaller sizes.
- B39 records the four career figures and their framing. The platform cards reuse
  canonical proof values and labels. The 47% card visibly identifies finance attribution,
  one measured year, and the share of that year's growth increment. The 20-year card
  links to the main resume in a new tab; B37 is its documented source.
- The six-to-two week comparison derives its numbers from the canonical proof value.
  Six equal marks before and two after retain the original unit; no percentage is added.
- One discipline selection filters outcomes and study cards. The filter bar immediately
  follows the hero, sticks to the viewport top throughout both collections, and offers
  horizontally scrollable controls on phones. Buttons identify both controlled regions;
  the collection count is a polite live announcement.
- Cards reuse the homepage's geometric fields, thin Font Awesome icons, 140px frosted
  anchors and motion variables. Colored backgrounds and translucent content panels
  support vertical and horizontal arrangements. Hover and keyboard focus animate the
  artwork, while touch uses the existing slow motion. Reduced motion stays static.
- The index and all six stories remain directly addressable. The homepage remains
  separate; no authentication, homepage navigation or deployment configuration changes.

Canonical story JSON, source-outcome mappings, `StudyVisual.tsx`, detail page source
and shared `app/globals.css` have zero diff from the baseline. The existing diagrams,
factual copy and other worktrees are preserved.

## Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass, including after the production build |
| `npm run lint` | Pass, no ESLint warnings or errors |
| `npm run build` | Pass, static export with 10 HTML files |
| `node scripts/parity/dashboard-acceptance.mjs` | Pass against development on port 3000 |
| Same acceptance with `ACCEPTANCE_BASE_URL=http://localhost:8090` | Pass against the production export served from `out/` |
| `git diff --check` | Pass |

The dashboard harness checks 320, 375, 576, 699, 700, 768, 974, 1099, 1100,
1196 and 1440px. It verifies:

- Career values, visible attribution/window/share framing, source links and text fit.
- Hero ordering, filter adjacency and sticky positioning, including after filtering.
- Every discipline's outcomes and study URLs, counts and selected button state.
- Font Awesome glyphs, loaded thin font at weight 100, and 140px anchors including borders.
- Keyboard filter activation, visible focus and touch filter activation.
- Advancing touch animation, desktop hover and keyboard motion, and reduced-motion
  cancellation on both desktop and touch contexts.
- A filtered study's client navigation and return, with icons still rendered afterward.
- All six detail URLs at 375 and 1440px, their diagrams, canonical paragraph text and
  absence of horizontal overflow. The home page has no link into `/case-studies/`.
- No browser console or page errors in any monitored context.

Visual review in the Codex browser used the requested
`http://localhost:3000/case-studies/` preview at desktop, tablet and phone widths,
including 320px. Reviewed the hero, career text, vertical and horizontal cards,
frosted panels, sticky filters and Brand filtering. The restored dev preview was
checked again after the build: expected content, no error overlay and no overflow.

Local screenshots and structured results are in the gitignored
`scripts/parity/shots/dashboard/` directory. The final results there are from the
production export run. These are acceptance captures, not a pixel-diff comparison.
Browser/device checks used Chromium emulation; physical devices, Safari and Firefox
were not tested.

## Failures corrected during acceptance

The original six-width harness passed but omitted outcome filtering and the exact
1100px boundary. Expanded checks exposed the older tablet column-span rule at that
boundary. Explicit desktop spans now override it; both sides and 1100px pass.
The new optional revenue note initially needed a TypeScript union guard; the guard
is applied and types pass. Career numbers also scale down at the narrow phone width
to retain space inside the cards. No failure remained in that earlier acceptance
scope; the later requested refinements have not been implemented or tested.

The existing Next lint deprecation notice and Node 22 JSON-import experimental
notice are toolchain notices; neither failed verification. Dependencies were unchanged.

## Ownership and coordination

Worktree: `C:\Users\jacob\.codex\worktrees\8350\jacobmedley.com`.
Jacob explicitly continued the dirty branch from idle task `01a078e0`; its previous
turn had hit a usage limit. Task `01a08244` inspected the lock, branch and eight
existing changed/untracked files before recording the continuation ownership.
No unrelated file was included.

Genesis was read directly at intake and rechecked before acceptance. The acceptance
read at `2026-09-08T18:38:21+00:00` observed fingerprint
`a93784461d23a0fb19dedb0e9d27819e53962d3ec7eee91c64c8804c402ddf0f`.
The helper still reports five pre-existing unresolved changes. They were reread:
the inference hold and no-auto-reset rule remain honored; the website directions
are consistent with Jacob's current PR-only continuation. The shared website card
remains stale and belongs to the coordinator. No remote synchronization is asserted.
Intake acknowledgement: `20260908T182725Z-60b6a91252c648f694b0f5628f10526d`.

The task used the current cloud session, deterministic tools and browser review.
Astra/high was requested; no current-task model switch was performed or claimed.
No local inference, paid fallback, model download or usage reset was used.

The port 3000 dev server was restarted after the build with its command line and
worktree checked. The temporary port 8090 static server was stopped after acceptance.
No merge or deployment was performed. Rollback for this phase is the baseline above;
the earlier whole-site recovery tag remains
`checkpoint/portfolio-before-brand-wave-20260906` at `b8aac95d`.
