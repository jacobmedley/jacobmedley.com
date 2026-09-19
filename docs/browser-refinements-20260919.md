# Browser annotations 1–8: local acceptance

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
