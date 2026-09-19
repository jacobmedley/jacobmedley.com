# Browser annotations 1–8: local acceptance

## Published after Jacob's explicit approval

Jacob requested "Push live" after local acceptance. PR #11 merged as
1325c6bf31dce1b3483f17da1386d44d610accf2, deploying application cb9ebdf and the
preceding reviewed refinements. CI iteration calculation yields v12.160.
Rollback: f2a6f57a91cfef79cfc7a6cc8676b1846eb03070 (prior live application 7bcb9e0).

- Ubuntu Node 20 verification 35418408691 passed typecheck, authored lint,
  production build/image verification, dependency audit and artifact retention.
- Production deployment 35418473415 succeeded at 03:25:53 UTC. Workflow and
  dangerous-clean-slate:false were unchanged. Dedicated case-study source unchanged.
- Normal homepage response is 200; Last-Modified 03:25:50 UTC matches upload.
  Cache-Control:no-cache,must-revalidate and X-Proxy-Cache-Info:DT:1; no stale
  content observed and no cache purge needed.
- Ten homepage Next assets return 200. All eight public routes return 200 after
  canonical trailing-slash redirects. Protected /musings/ and
  /interaction-design-concepts/response-times/ both return 200.
- Fresh normal production browser load shows the section divider, five plus
  controls, visible historical tools list, and nine grouped education sources.
  Keyboard expansion/closure works; plus settles at 225deg, card outline is 2px
  inset and summary outline is none. Screenshots visually inspected.
  Education has three equal columns, 31px/20px vertical padding, and heading
  rgb(245,237,240). A browser scroll call timed out but fresh inspection confirmed
  it had scrolled and the disclosure was closed; no application failure observed.
- B59 and subsequent focus/divider refinements are live; B58 remains a preserved
  draft off-page. Leadership placement and dedicated study work remain deferred.

Release worktree X:\website-release-20260919, branch
codex/main-site-wrapup-20260919. Documentation-only closeout uses [skip ci]; final
commit recorded in Genesis. Clean after commit; own lock released. Existing
preview8090/PID11136 unchanged. Original dirty checkout and other services untouched.
No source changes beyond the accepted local commits, no added spending, no local
inference, and no new full cross-browser/accessibility certification.
Exchange refreshed 03:28:00 UTC, fingerprint
aa6b0c0433f259ef29aade4e9df5c7b6192f7d08fbda90b2d4b4fef25351d6b1.
Unresolved historical inbox events remain coordinator-owned; Jacob's latest
explicit publication instruction supersedes this task's local-only hold.

## Follow-up: focus border and experience divider

Jacob requested a softer active/focus treatment without glow, then a rule between
the outcomes cards and Experience/Expertise. The shared card now uses one 2px
inset outline, mixed from 65% employer ink and white. The duplicate rectangular
summary outline is suppressed; focus remains visible on the containing card.
Existing ambient card shadows are unchanged; no focus shadow is added.

A semantic hr uses the existing solid-center rule. Half the fluid section-rhythm
token sits on each side; the old column top margin is removed for this adjacency.
The rule adds only its 1px stroke, not another block of spacing. No new breakpoint.
No copy or B-edit status changed.

Production build/types and image verification (288 source hashes, 104 references)
passed, as did diff checking. Browser-skill verification checked all five native
summaries with keyboard opening/closing: one 2px inset card outline, summary
outline-style none, all five closed afterward. Desktop1376 and mobile375 had no
horizontal overflow; the mobile disclosure opened successfully. The divider
measured 1px high, 1120.81px wide at desktop and 340.81px at mobile, opacity .25.
Saved and inspected 17-focus-refined-desktop.png, 18-focus-refined-mobile.png and
19-experience-section-divider.png in this task's local artifact folder.
Scoped Chromium checks only; no new cross-browser/accessibility certification.

Local rollback 6771ef3da640fdd0de1d688a3709acc18f84a4b9. Same worktree and branch
as below; final checkpoint ID recorded in Genesis. Preview8090/PID11136 replaces
this task's verified PID10348. No push, merge, deployment or added spending.
Changed source: app/visual-system.css and components/sections/ResumeSection.tsx;
handoff: this report and STATUS.md. Own lock released after clean local commit.
Exchange refreshed at 03:16:48 UTC, fingerprint
ef20365afcd7730f398f97024012a05c7a225f440b032f714deab7282ca6c6e6;
only this task's new direction event changed intake context. No peer awareness claimed.

Jacob requested these refinements against the local B58 preview. B59 records
the changed direction. No push, merge, or publication is part of this pass.

| Comment | Implemented change |
| --- | --- |
| 1 | Shared rule above More/Less on all five experience cards. |
| 2 | Chevron immediately beside the More/Less label; direction follows state. |
| 3 | Top-right plus rotates 225 degrees into an X in 620ms with content expansion; closing returns it to zero. Native summary remains the keyboard control. |
| 4 | Fluid separation before experience columns; narrower column gap; single-column grouped lists; mobile company text reserves room for the indicator. |
| 5 | Developing people removed from rendering and preserved verbatim in B58. Apps & Tools is fully visible, with the historical-use qualification retained. |
| 6 | Education-only top padding is clamp(1.4rem, 2.25vw, 1.9375rem), bottom 1.25rem. At 1376px this measures 30.96px/20px. Other cards retain their tokens. |
| 7 | Source moved into the title header. Equal desktop columns replace oversized/narrow spans. Cards fit content without stretched blank space. |
| 8 | Education heading remains #f5edf0 before and after crossing the viewport top. |

## Responsive decisions

Education retains its existing 600px and 1200px viewport thresholds, with one,
two, and three equal columns. An 18rem **card content-width** container query
moves the source beneath both icon and title on narrow cards. It responds to
actual available width, not just a device label. The legacy mobile float override
was removed so this grid applies consistently. No temporary browser annotation
attributes were copied into source.

The heading bug was reproduced in the first browser check: the scrolled title
became rgb(48,44,56). Legacy important declarations inside the components layer
outranked later unlayered theme styling. Their importance was removed for both
the title and icon; the Education title is explicitly light in both states.
Sticky behavior remains dormant. No unrelated header refactor.

## Verification actually run

- Authored-source ESLint passed. Three production builds passed, including the
  final mobile corrections; each checked types and verified 288 source-matched
  images and 104 active image references. `git diff --check` passed.
- All five cards have a rule, plus, and footer chevron. Summary height measured
  54.4px. Keyboard opening exposed content on each card; closing restored native
  details.open=false and data-expanded=false on every card.
- Normal motion showed three running 620ms animations (content, plus, chevron),
  then settled at plus=225deg / chevron=180deg. Four repeated keyboard toggles
  settled closed at plus=0deg. Reduced motion changed state without animation.
- Zero horizontal overflow at 320, 375, 768, 1280, and 1376px. A 320px disclosure
  opened without overflow. Final 375px company padding measured 24px; inspected
  screenshot shows names clear of the plus. Education header remains grid.
- Source layout measured column 2 at 375px and full width at 320px and 768px
  (where two cards share the row). Title/source/URLs are unchanged.
- Final Education color measured rgb(245,237,240) both with and without
  is-compact. At 1376px padding measured 30.96px top and 20px bottom.
- No Developing people heading or tools disclosure remains in the DOM.
- Browser and React skills guided visible checks, native semantics, reduced
  motion, animation cleanup, stable keys, and avoiding new dependencies/state.

Saved and inspected screenshots in this task's local artifact folder:
11-experience-refined-desktop.png, 12-experience-open-desktop.png,
13-education-refined-desktop.png, 14-education-refined-mobile.png,
15-experience-refined-mobile.png, 16-education-narrow.png.
Initial captures caught a stale preview connection and legacy mobile overrides;
the final captures above were refreshed after the fixes. These are scoped
Chromium checks, not full accessibility or cross-browser certification. No new
screen-reader, native zoom, Ubuntu CI, dependency audit, or live-site check.

## Handoff

Branch: codex/main-site-wrapup-20260919. Worktree: X:\website-release-20260919.
Local rollback: c6b559b07b1d2ed028c39bf762fab09c382f4643.
Changed: app/globals.css, app/visual-system.css, EducationSection.tsx,
ResumeSection.tsx, ExperienceDisclosure.tsx, copy-register.md, this report, STATUS.
Final local commit is recorded in Genesis. Working tree clean after commit;
own lock released. Preview8090/PID10348 serves the final out/; only this task's
identified preview processes were replaced. Original dirty checkout and other
worktrees preserved. Production remains v12.155 / 7bcb9e0.

Leadership wording and placement remain Jacob-owned decisions. No new claims,
dedicated case-study work, dependency changes, or deployment settings changed.
Selected Astra/high retained; no local inference or added spending. Exact token
telemetry unavailable; no measured savings claimed. Exchange checked 03:04:50 UTC,
fingerprint 138dea9670bb6bc213c4df633e7da50d0c8ba82ef1520e28985f134ef49ee335.
Only this session's B59 direction event changed the prior context; no peer
acknowledgement or shared-card reconciliation is asserted.
