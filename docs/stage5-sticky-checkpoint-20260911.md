# Stage 5 sticky headings checkpoint

September 11, 2026. Checkpoint A completes the original Stage 5 specification
from `docs/stage1-checkpoint-20260909.md` on
`codex/website-art-layout-20260910`, starting from planning checkpoint `821e379`
and application baseline `d7999d5`. This checkpoint is local only. It does not
authorize checkpoint B acceptance, a push, PR, merge or deployment.

## Implemented behavior

- The homepage's Case Studies, Full Stack Designer, Resume and Education headings
  retain one semantic heading and their expanded stacked icon/title on entry.
  Crossing the owning section boundary changes that same heading to a centered,
  inline icon/title surface with a 12px gap, 90% white frost, 24px blur and the
  shared 350ms easing. The outer heading reservation stays stable while the visual
  surface changes, so content does not jump.
- The sticky heading remains contained by the section's full `.container`. The
  Education heading was removed from its short row/column wrapper, fixing its
  containing block. Previous headings yield before the next owner; no independently
  sticky subheads were added.
- Compact surfaces are at least 64px on larger widths and 56px on narrow widths.
  Narrow titles wrap instead of truncating. Their measured unobscured region reserves
  room for the fixed motion control, preserving the exact visible motion labels and
  preventing overlap.
- The standalone index uses one `.cs-browse-sticky` stack: an aria-hidden context
  row followed by the existing discipline filters. The context reads the existing
  `Selected Outcomes` label before the stories boundary and the existing
  `Different problems. Deliberate decisions.` heading afterward. Both source labels
  remain in their sections; no new accessible heading or public navigation was added.
- `ResizeObserver` measures the complete standalone assembly and supplies the real
  scroll-padding value. The own `#selected-work` anchor cancels that offset; outcome
  and story targets receive a small visible gap beneath it. Filtering recalculates
  context without returning the reader to the hero. The assembly yields at the end
  of `.cs-browse`, but remains visible while one of its filter controls owns focus.
- Shared z-index remains content 0/10, new sticky surfaces 30, navigation 950 and
  modal dialog 1055. Reduced motion removes the heading and yield transitions.

## Files

- `components/ui/SectionHeader.tsx`
- `components/sections/EducationSection.tsx`
- `components/case-studies/StudyCollection.tsx`
- `app/globals.css`
- `app/case-studies/dashboard.css`
- `scripts/parity/dashboard-acceptance.mjs`
- `scripts/parity/stage5-sticky-acceptance.mjs` (new)
- this checkpoint and `docs/STATUS.md` (written last)

No registered copy, factual claim, project data, source link, canonical diagram or
asset changed. No B edit was required or applied.

## Verification

Development checks used `http://localhost:3012`, then that temporary server was
stopped before export. The focused Stage 5 suite passed at 320, 375, 768, 1100 and
1440px: four forward and backward crossings per width, one semantic heading per
owner, no top pileup, inline left icon, centered unobscured content, 12px gap,
measured compact minimums, motion-control separation, reduced-motion relocation,
modal z-index/Escape/focus return and 200% text fit for every sticky surface.
At 320px the naturally wrapped surfaces measured 75px for Case Studies and 99px
for Full Stack Designer; Resume and Education measured 56px. At 768px and above
all four measured 64px.

The same suite checked the 375px standalone stack: 114px measured total, 48px
context, 64px filter row and 114px document scroll padding. Keyboard filtering
updated both collections while preserving focus and stayed within `.cs-browse`;
the assembly yielded to top/bottom `-126/0` before the through-line. The separate
dashboard regression passed all 11 existing widths, both filtered collections,
keyboard/touch, thin icons, motion preferences, client navigation and all six
direct story routes.

Production `next build` compiled, type-checked, generated 11 static pages and
exported two route groups. The first export attempt reached successful compilation
and static generation but Windows returned `ENOTEMPTY` while verified PID 56584
served `out/`; that exact process was stopped and the clean rerun passed. The
restored export preview is PID 38296 at `http://localhost:3011`, serving this
worktree's `out/`; homepage and standalone index both returned 200. Both Stage 5
and dashboard suites passed again against that final export.

Final deterministic checks passed:

- `node node_modules/typescript/bin/tsc --noEmit --incremental false`
- `node node_modules/eslint/bin/eslint.js app components scripts/parity/stage5-sticky-acceptance.mjs scripts/parity/dashboard-acceptance.mjs --no-cache`
- `git diff --check`
- `node node_modules/next/dist/bin/next build`

Local Node is 22.11.0; CI's Node 20 remains a release-time verification item.
Visual review covered phone and desktop homepage captures plus the phone standalone
stack in Windows Chromium. Firefox, WebKit and physical devices were not installed
or claimed. The focused 200% check proves the new sticky surfaces fit; it also
records unrelated whole-page overflow from existing art and the Education footer
contact button for checkpoint B's global consistency sweep.

## Coordination and recovery

GPT-5.6 Sol / medium is exposed by the host and was Jacob's selected route. The
fresh Genesis read retained the profile-root mismatch, uncertified persistent lane
ownership and laptop inference hold, so local workload was zero jobs/tokens. No
download, paid fallback, usage reset, extra spending or infrastructure change
occurred. The Exchange helper still rejects the preserved malformed Stage 3 event;
a unique manual-fingerprint direction record was added before implementation.

Rollback for checkpoint A is `821e379`; use a reviewed revert after checking
ownership rather than resetting shared history. Checkpoint B remains responsible
for every imagery/consistency disposition in the release plan, including the
existing 200% footer-control overflow. Independent acceptance remains separate.

## Independent acceptance return, September 11, 2026

ACC-B02 is release-blocking on final candidate
`fcfe2722c9a62e823772a61f89815f528db76071`. The fixed global motion status does not
reserve its actual dimensions in page navigation or sticky context. At 200% text,
its reduced-motion label obscures the Full Stack title at 768px (only Designer
remains visible) and overlaps headings at 1100px. The font-relative narrow helper
fits at a 384px header container but switches back at 385px, where the overlap
returns. Exact viewport/container pairs are 437/384 and 438/385 at root text 200%.
The sweep also flags the standalone index and all six detail headers, including
normal-size reduced-motion status. At enlarged text, it covers filter context and
some filter buttons. This needs a deliberate shared placement/space-reservation
solution for the longest status, pause/resume states and each route; raising one
arbitrary breakpoint is insufficient. Preserve B46 labels and accessible state.

Evidence: `scripts/parity/shots/acceptance-20260911/fcfe272-boundaries.json`,
`fcfe272-header-overlap-768.png`, `fcfe272-motion-overlap-sweep.json` and the two
`fcfe272-index-motion-overlap-*.png` files. The sweep has 90 route/viewport/state
cases; 83 geometric intersections are flags, not 83 independently certified visual
failures. Representative screenshots substantiate the obscured content. All six
direct routes share the affected header. The original sticky suite passed finally,
but it checks title fit, not enlarged status/title intersection. Earlier boundary
timeouts remain in their logs; a focused 80-sample trace was stable. Do not treat
those observations as a resolved root-cause diagnosis or weaken the assertions.

The bounded acceptance fixes are retained. No new copy or B edit was introduced.
Return to this checkpoint's design owner before release; see the independent
acceptance report for every request group, exact source SHA and environment limits.
