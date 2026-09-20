# Full-site integration, September 20, 2026

Owner: coordinator task `01a0bf67-f456-7e32-b581-a233af6149fe`, worktree `6b03`,
branch `codex/full-site-integration-20260920`. This is a local implementation and
review checkpoint. No push, merge to main, PR or deployment was performed.

## Authorization and result

Jacob's instruction in refinement task `01a0bf66`, turn
`01a0bfb7-e5d4-7122-8950-67022ed30378`, authorized the full site, brand/marketing
copy and the dedicated case-study site, with global refinement from this point.
It supersedes the former planning-only scope, lab visual-approval implementation
hold and B57 dedicated-page deferral. Publication still requires an explicit request.

The main portfolio and the six dedicated stories now share the selected Quiet
Prism materials, original wave geometry, typography, accessible motion control
and connected internal navigation. The homepage retains five project dialogs,
nine How I work dialogs, five employers and nine education records. Four entry
cards lead to real sections. B60's four mentorship bullets appear alongside
Expertise and Apps & Tools in one responsive card. Historical tool wording remains.

The dedicated index introduces the longer stories, filters them by discipline and
retains the source-qualified outcomes. Main-site entry links, dedicated home and
experience links stay in the same tab. No prototype selector, lab explanation or
visual-lab route ships in the export.

## Source adoption and rollback

| Source | Treatment |
| --- | --- |
| Planning base `51577f7ff1b2eb1658ffd7edad9a8dfb9e56c6a6` | Starting local checkpoint; contains the previously verified main history. Complete rollback point for this integration. |
| B60 `a32ee8f9708c494b9b6c6d11c3597fe14356653e` | Full-history merge `b7ce8146029e12f1aba0891fff596a8e2b915546`. |
| Foundation `e342d3d24c848bc454461afa47c09c949456707d` | Full-history merge `80b189a6d665767bf78cd42e0faef78a7571c18f`. |
| Final hero/modal `c23b8a39d801500e8e0ec6d435c26fa38860dc70` | Full-history merge `b1c9a02557fa0cc35348418077733b885146fa49`; rollback for the subsequent adoption patch. Superseded modal alternative excluded. |
| Quiet Prism `5fba784bac5526205683de8677fd3e3d0ab522d6` | Selective production extraction. Exact shared clock, wave asset and geometry; reusable primitives and CSS. No whole lab branch merge. Owner's final four tweaks included. |
| Dedicated copy `d8d7380215d6d861725e625c2f462a7f60b0062a` | Six-file B56 manifest adopted under B64; JSON matches this source with role/scope/collaboration initial capitalization only. No whole historical branch replay. |

Merge conflicts were confined to STATUS, with both histories retained. Four
imported Markdown trailing spaces were removed without changing report content.
The final staging check also caught an extra blank line at the imported clock
file EOF; it was normalized without changing code. The original dirty checkout
and all other worktrees remain untouched.

Production adapters add one filter definition per page, genuine button/link
semantics, route/filter membership refresh and page-wide pause. Compared with the
lab, secondary featured-card text is darker after rendered contrast checks;
informational-card focus uses the foundation's solid 3px outline, including forced
colors, instead of the lab glow. These are acceptance fixes, not alternative art.

## Content and brand review

B64 was registered before implementation. B60's four bullets were checked exactly
against the register. All five project summaries and full narratives remain in the
unchanged project data file. Education records are byte-equivalent after newline
normalization. Employment facts and dates retain their existing source.

The dedicated source pass uses concrete first-person decisions, preserves
research leadership rather than claiming every study was personally conducted,
and keeps finance attribution and the measured-year denominator. Six weeks to two
remains launch duration; 47% remains a share of company revenue growth in one year.
No new figures, colleague names, private-source material, unverified current tool
claims or identity for the unnamed fifth property were added. Existing main hero
copy and Jacob's full signature line remain. No B edits were skipped.

## Verification actually performed

See [structured acceptance evidence](reviews/full-site-integration-20260920.json)
and the [WCAG 2.0 A/AA coverage matrix](reviews/full-site-wcag-20260920.md).

- Production build with bundled Node 24.19.0, Next 15.5.25; TypeScript and build
  lint passed. Separate ESLint pass over app, components and lib passed. Initial
  sandbox build failed with process-spawn EPERM; authorized elevated builds passed.
- Export verifier matched 288 images and 104 active image references to tracked
  source. The new Quiet Prism asset also matches the final source and export:
  SHA-256 `9abdf71c5c6032fdf5a13fb5ed9e0614d2cdabc2dfbe5e7375061d7e3de558b4`.
- Eight public routes at 320, 375, 768, 992 and 1440 CSS pixels: 40 measurements,
  no horizontal page overflow or failed loaded images. Exactly one frost-filter
  definition and one h1 on every route. Desktop and narrow screenshots reviewed.
- All fourteen dialogs opened by Enter, trapped Tab focus, closed with Escape,
  and restored trigger focus, page scroll, URL and history. Background was hidden
  from accessibility navigation and scroll-locked. Stationary page, 18px blur and
  400ms desktop entrance preserved. At 320/375/600/768, the tested WebMD dialog and
  internal reading area fit the viewport.
- Axe-core 4.13.0 WCAG 2 A/AA checks: zero remaining detected violations across
  eight routes and fourteen dialogs. Gradient/image contrast remains a manual
  check; these results are not a conformance certificate.
- The audit found twelve dialogs whose reading areas lacked a keyboard focus
  stop. The shared body now has one; Page Down scrolled all fourteen. Its focus
  outline is 3px. Generic labeled badge/phone-preview containers now have group
  semantics. Main section/education/How I work heading hierarchy was corrected.
- A muted sage label failed solid-background contrast at 4.27:1; removing its
  opacity corrected it. Rendered background sampling at 90 featured-card text
  positions across desktop/mobile found additional low-contrast secondary text.
  Shared ink was darkened. The two final mobile footer retests measured 5.69:1
  and 4.96:1. Sampling uses the darkest first percentile in an inset background
  crop with text temporarily transparent; it is bounded evidence, not proof for
  every animation frame, browser or source screenshot.
- All five experience disclosures opened and closed with Enter, retained focus,
  exposed complete content heights and survived rapid reversal. Reduced motion
  opens immediately without content animations.
- Five card families showed the shared focus burst near 6.90x and hold near .12x;
  tested release settled toward 1x. The informational family was retested after
  hydration because its first measurement began before listeners were ready.
  Pause stopped all running CSS and hero animations. Paused dialogs open fully
  visible and close immediately, without a suspended entrance/exit animation. The
  automatic demo held its state for over 20 seconds while visible and paused; the
  hero resumed its clock afterward. Reduced motion now produces zero
  running animations, including the older page waves; the hero is static.
- Filters produced 6/3/3/2/3/1 stories for All Work/Product/Systems/UX Research/
  Leadership/Brand, with correct pressed state, live count and tag membership.
  Main-to-index-to-story-to-home navigation worked in one tab.
- No WebMD evidence image requests before intent; focusing its trigger requested
  three. A simulated image error exposed Retry; the real retry request loaded.
  Browser error log was empty in the observed review session before test-only
  evaluation errors. Those instrumentation errors did not change application code.
- Export HTML audit: all eight routes had titles, no duplicate IDs and no broken
  same-page/internal route links.
- React review: one decorative controller, passive scroll handling, effect
  cleanup, bounded preload, no new runtime dependencies or data-fetch waterfalls.

## Limits and remaining work

Jacob's global visual/content refinement and publication decision remain. Physical
touch hardware, Safari/Firefox, native 200% browser zoom and screen-reader speech
were not tested in this session. The attempted in-app zoom shortcut did not change
the page zoom and is not counted. Mobile checks are browser viewport emulation;
the approved source owner's swipe checks are historical, not a new device test.
Source screenshots and every possible animated-background frame are not fully
audited for contrast. No formal WCAG conformance claim is made.

No network throttling, live production performance or deployment/cache test was
performed. Image retry used a synthetic error event, not an actual failed network.
The static preview is local; fonts/icons/analytics retain their existing external
dependencies. Existing publication safety and post-deploy checks still apply.

## Preview and coordination

- Integrated preview: `http://localhost:8090/`, PID 52456, Python HTTP server bound
  to 127.0.0.1 with explicit directory `6b03/jacobmedley.com/out`.
- Preserved preview 3016: PID 12504, final refinement export in 6d80.
- Preserved dev 3000: PID 16740, Next server in a003. No process was killed.
- Local screenshots/raw measurements are under the task's visualization directory
  `C:/Users/jacob/.codex/visualizations/2026/09/20/01a0bf67-f456-7e32-b581-a233af6149fe`.
- Exchange intake change `20260920T165158Z-044abb83bb8c4dfca7358cfcc6764053`;
  merge checkpoint `20260920T165410Z-648e8b32c6e444899e150c852acb49bc`;
  final primitive handoff `20260920T170039Z-592f7bf501e04f4b80fe2f89bdd116a9` read.
  Fresh reads at 17:14:19 and 17:35:10 UTC found fingerprint
  `42245077a5e1119c1835066eb5ca90a4c2db4d993d1c19078c04f01391a8b729` and no conflicts.
  Shared CURRENT/card pointers are historical; direct instruction and newer inbox
  records govern this work. Only append-only website events were written.

Cloud estimate at expansion was 35–65k tokens including review/retries, not a
measured balance or saving. Deterministic extraction/checks and cloud review ran;
no local inference, new model download, paid fallback or reset redemption ran.
The user-selected configuration was retained. No verified per-turn cloud-token
total is available. Final commit, clean-tree/lock result and final Exchange receipt
are recorded in the task handoff after STATUS is written last and committed.

## Browser-directed refinement checkpoint

Jacob's September 20 browser comments are implemented locally as B65. The hero
now occupies one full small viewport, keeps a pure-white center field, clips one
bottom wave at its midpoint, and flows directly into selected work without the
former blank band between the paired wave halves. The four pathway cards are removed. The closing hero
sequence begins with the first UX role and drops in the build paragraph, bold
better-way line, rule, action label, and arrow in order. The rule uses the same
gap on both sides. Reduced motion keeps the complete settled state visible.

Experience is a two-part desktop layout: five full-width employment cards in one
left column and the unified leadership/expertise/tools card on the right. Its
three sections stack with horizontal rules; narrow layouts return to one column.
All education cards have equal 22px padding, zero title/source row gap, clipped
corner art, no divider, and a 44px icon-only external link in the top-right. Link
names retain the credential title and new-tab context. The secondary case-study
action now includes a lock icon; password enforcement remains outside this pass.

The production build, type check, build lint, export preparation, 288-image and
104-reference asset verification, and whitespace check passed. In-app browser
review at 1484x1272 confirmed a 1272px hero, a 281.83px wave with 140.91px visible,
no pathway cards, no blank boundary gap, five 819.34px employment cards, a 422.09px
stacked side card, and horizontal divider backgrounds. Education review confirmed
nine cards, zero visible View labels, zero card dividers, 22px padding, zero
title/source gap, clipped overflow, and a 44px link 10.8px from the top/right.
At 390x844 the hero measured exactly 844px, exposed 43.2px of an 86.39px wave,
had no horizontal overflow, and each resume/education area used one column. The
browser enforced reduced motion, so static fallback was inspected there; normal
motion was then checked with a temporary no-preference emulation. At 4.2 seconds
UX was 88% visible while the build paragraph was already 83% visible and the
later elements remained staged above their resting positions. By 5.3 seconds the
paragraph, bold line, rule, action label, and arrow were fully settled. The
browser's original reduced-motion preference was restored afterward.

### Selected-work correction

B66 restores the flipped wave half at the top of selected work, removes the
introductory `Explore the full case studies` link, and removes the scoped CSS
uppercase treatment from the repeated `Case Study` eyebrow. This correction
supersedes the earlier all-caps exception and wave-removal interpretation.

At 1484x1272, the hero and selected-work boundaries met with a measured zero-pixel
gap; the restored flipped half occupied 139.91px below the seam. At 390x844, the
same boundary had a zero-pixel gap and a 42.19px flipped half. Both widths had no
horizontal overflow. Browser inspection found no introductory link and five
visible `Case Study` labels with `text-transform: none`. The production build,
TypeScript/build lint, 288-image and 104-reference export verification, authored-
source ESLint, and whitespace check passed after the correction.
