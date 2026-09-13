# Design QA

## September 12 browser comments 1-25

The current acceptance record is `docs/browser-refinements-20260912.md`, with
compact evidence in `docs/reviews/browser-refinements-20260912.json` and the
reusable in-app adapter `scripts/parity/browser-refinements-20260912.mjs`.
This pass supersedes B53's technology badge display, Resume timeline/plus,
hero cadence and temporary closing line. B54 governs the curated contribution
labels. Seven normal widths plus two enlarged-text settings passed all 126
modal cases. Actual animation samples, keyboard/full-card activation, reduced
motion, offscreen suspension and settled resize passed. Source facts and
narrative are preserved; the updated supplied MOA knockout is in use.

All 25 visual notes are applied. The full marketing copy rewrite is a later
phase. The earlier deferred Reveal source replacement remains open. Actual
screen-reader, native background-tab, Firefox and WebKit verification remain
outside the available acceptance evidence. This is a local recovery checkpoint,
not a deployment.

## September 12 mechanical visual-system acceptance (4b5e)

Source: Jacob's nineteen-item continuation, B53, his Roadmap clarification and
four supplied SVGs. Implementation details and durable rules are recorded in
`docs/visual-system-implementation-20260912.md`. This entry supersedes the earlier
Read more wording and the earlier build limitation below. Historical Figma work
and screenshots remain evidence for their original scope.

The final production export at `http://localhost:3013/` passed 320, 375, 768, 992,
1440 and 1875px layouts plus 200% text at 320 and 992px. All 14 modals passed at
all eight settings (112 cases): content bounds, circular plaques, shadow-free
nested surfaces, semantic contribution/technology grouping, removed visible
group headings, badge contrast and Escape focus return. Roadmap has no standalone
post-hero image; Reveal has both newly registered section headings.

Resume retains five semantic entries and four leadership items, uses all five
real employer marks, and opens/closes through native Enter/Space activation.
Focus remains on the summary, More changes to Less, and the control remains
below the expanded content. Rapid reversal and reduced-motion behavior passed.
An AST comparison found every employment and leadership string unchanged from
`9508686`; the four supplied SVG copies are byte-identical and original images
are unchanged.

Hero checks covered exact desktop type targets, role order, separated braces,
offscreen clock suspension/resumption, a sampled 65-second ending, persistence
after settled resize, and a complete reduced-motion static composition. Eight
intro phases at 320px with 200% text had zero page overflow. Technology badge
contrast was at least 5.35:1. Reviewed screenshots include enlarged mobile hero,
wide Hydra, narrow Reveal and open Resume. Local screenshots and full browser
results are under `scripts/parity/shots/visual-system-20260912/`; a compact durable
report is committed as `docs/reviews/visual-system-20260912.json`.

Validation caught and fixed: intersecting rotated braces, invisible intro tail
content producing enlarged-text overflow, a settled timeline replaying on resize,
and mobile navigation words fragmenting at enlarged text. An early export failed
with Windows EBUSY because this session's static server held `out/`; stopping
only its verified process allowed the final build to pass. The separate 3012
preview was preserved. TypeScript, ESLint, production export and git diff checks
all pass. There are no unresolved failures in the final acceptance matrix.

Limits: accessibility-tree and keyboard checks are not an actual screen-reader
session. Chromium in-app tabs remain document-visible, so hidden-document
suspension was tested with a temporary document.hidden override and synthetic
visibilitychange event, then restored; native background-tab suspension remains
unverified. Firefox/WebKit were not exercised. The separately deferred
`reveal-clear-01.jpg` replacement remains open. No push or deployment occurred.

## Earlier September 12 visual-system continuation

## Source and scope

The source of truth is Jacob's September 12 browser-comment evidence plus
`docs/visual-system-checkpoint-20260912.md`. The selected-page screenshots are
conversation evidence and do not have repository paths. The implementation was
reviewed at `http://localhost:3012/` in the Codex in-app browser.

This continuation covers the Resume timeline and the later modal notes: remove
the global motion controls, remove the A/B divider, tighten and rebalance the
call-center flow, enlarge its icons, align icon circles, apply a contextual
section-heading treatment, add space around the Wrong mark, remove the two
specified post-hero images, and move Reveal's concept cards below its hero.

## Accepted design rules

- Resume uses a faded vertical rule, project-color icon cards and restrained
  spacing. Health-E Commerce is the single highlighted entry.
- Every employment entry stays skimmable when closed. Native `details` and
  `summary` expose longer registered copy through a `Read more` button.
- Contextual modal section titles use a circular icon plaque, Title Case text
  and a faded rule. This is the reviewed example for broader hierarchy work,
  not an automatic treatment for every heading.
- Display treatments never force all caps. Standard acronyms remain unchanged.
- Motion pause/resume controls are not rendered anywhere. Reduced-motion,
  offscreen and hidden-document protections remain active.
- Call-center flow cards hug their content with proportional padding, use equal
  tracks on wider containers, reorder to one column on narrow containers and
  use icons four times the former size.

## Responsive and accessibility verification

The Resume and call-center surfaces were exercised at 320, 375, 768, 992, 1440
and 1875 CSS pixels.

- Resume: five semantic ordered-list entries, one highlighted entry, five
  closed disclosures and no horizontal overflow at every width.
- Keyboard: Enter opens a focused `Read more` disclosure; Space closes it; focus
  remains on the summary control in both directions.
- Screen-reader semantics: `Experience` labels the ordered list; each entry is
  an article; every summary is exposed as a button named `Read more`.
- 200% text: 320px Resume and call-center checks retained zero page, section,
  content and card overflow. The mobile kinetic hero was allowed to wrap so it
  no longer created page-level overflow at that setting.
- Reduced motion: the animated modal field computed to no animation and no
  visible motion control existed. The newer global no-control rule supersedes
  the earlier pause/resume-control acceptance item.
- Modal focus return: Escape closed representative modals and restored focus to
  the invoking project control.
- Call center: one flow column at 320/375; five equal columns from 768 upward.
  All five icons compute to 80px and all flow/card bounds remain inside the
  modal at every tested width.

## Modal-comment verification

- A/B Testing begins directly with content; the redundant leading divider is
  gone.
- Call-center availability and responsive-state icon circles are centered.
- `Messaging and State Change` and `Responsive site states` share the accepted
  contextual heading treatment.
- Wrong's hero mark has 56px padding at the 1875px review width.
- Data-Driven Personalization and Team Workshops no longer render their selected
  post-hero images. Source files are retained.
- Reveal's three concept cards now follow the hero, use the shared information
  card construction and carry three related brand-tinted surfaces. Their icon
  circles are centered.
- No rendered modal inspected in this pass had horizontal overflow.

## Deterministic checks

- `npx tsc --noEmit --incremental false`: pass.
- `npx eslint app components hooks lib scripts --no-cache`: pass.
- `git diff --check`: pass.
- Authored source contains no `MotionToggle`, hero/modal motion-control selector
  or forced-uppercase declaration.
- `npm run build`: not accepted in this pass. Next.js reached optimized-build
  startup, then the active development preview's `.next/trace` handle returned
  Windows `EPERM`. A later continuation confirmed that stale same-worktree
  preview was returning the Next.js 404, stopped only its verified parent and
  child processes, and restarted the project successfully on port 3012. An HTTP
  request to `/` then returned 200 with the expected portfolio title.

## Copy and asset fidelity

Employment company names, titles, dates, metrics and paragraph strings are
unchanged. B50–B52 register the disclosure label and the browser-authorized
presentation changes. `reveal-clear-01.jpg` is unchanged; its replacement remains
blocked until Jacob supplies or approves a corrected source.

## Editable Figma source

Jacob selected `Medley In Design` (Full/Pro) as the standing Figma owner. The
editable source is:

`https://www.figma.com/design/X9tbhBL2oYEBxwcYEKr5UT`

The file contains Cover, Foundations, Components and Wireframes pages. Its
`Call Center State` component set has Open, Busy and Closed variants plus
editable Brand, Status, Status message, Offer and Action properties. Desktop
and 375px mobile assemblies use six component instances rather than detached
copies. The five availability steps are editable vectors and text.

Figma validation found and corrected an inherited white status-copy fill, solid
state backgrounds where 9% tints were intended, one exact duplicate blank row
from a failed outer call, and one completed-section placeholder. The final
audit found no unnamed nodes or active placeholders. All 39 wireframe text
layers use Manrope, the site's declared fallback because `urw-form` was not
available in Figma. Final screenshots show equal flow cards, centered icons,
readable state tints, uncropped content and one-column mobile ordering.

## Result

The implemented website scope and editable call-center Figma handoff pass the
available acceptance evidence. Only the separately deferred Reveal source
replacement remains open.
