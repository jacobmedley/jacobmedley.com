# Motion and modal refinement — annotations 4 and 9

Owner: Codex task `01a0ba6e-e37a-7ee3-bff1-63b5baf86fa5`  
Coordinator: Codex task `01a0b75f-e43c-7772-b8ea-d78334ce9284`  
Baseline: `909ea2275104bc73f483ba7f1c5591db4d17a5b1` (`origin/main` at intake)  
Branch: `codex/motion-modal-refinement-20260919`  
Publication: not authorized; production remains v12.160 / `1325c6b`

## September 19 continuation: perceptible desktop camera pull-back

Jacob found the first desktop treatment too quick and too shallow to read as a
camera move. This continuation starts from its clean checkpoint
`27e361f243d0588d871b673e54222bbb5a5c6613` and supersedes only the earlier
desktop timing/depth description below. It is implemented on
`codex/modal-camera-pullback-refinement-20260919` in isolated worktree `5a43`.

Desktop open now runs for 980ms. The site recedes to a 0.93 scale with 82px of
perspective depth, 5px blur, reduced saturation and 0.82 opacity. The dialog
begins enlarged at 1.1 scale, 210px toward the camera, 16px out of focus and
transparent. It becomes legible while crossing the focal plane, then resolves
to an untransformed, unblurred reading surface. The 820ms exit reverses that
relationship. The component's cleanup clock is 840ms so background restoration
continues through the full exit instead of dropping the camera state early.

The implementation deliberately avoids splitting the site or adding a literal
camera rig. Transform/filter/opacity remain the only desktop scene properties.
CSS keyframes carry the staged focal crossing; the existing React/Radix lifecycle
still owns presence, focus, Escape, outside click and scroll isolation. The patch
is reversible by removing the desktop camera media block, restoring the earlier
background values/timings, and returning the cleanup clock to 340ms.

Mobile remains the established short bottom sheet. A verification run exposed
that the desktop background camera selector was still active below 768px and
that a 52px footer floor exceeded the current 45px measured menu. The mobile
rule now explicitly removes camera transforms, and the footer uses the measured
menu height while retaining a 44px Close control and expansion for bottom safe
area. At 320, 360, 375 and 390px the menu and footer both measured 45px.

### Continuation acceptance

The reusable Chromium suite now saves three desktop frames:

- `desktop-camera-begin.png`, before the modal plane becomes visible;
- `desktop-camera-passing-plane.png`, during the defocused crossing;
- `desktop-camera-settled.png`, with the modal sharp and the site recessed.

All three were inspected. At the measured midframe the dialog was scaled 1.017,
blurred 2.03px and 0.945 opaque; the site was scaled 0.934 and blurred 4.74px.
At rest the dialog filter was `blur(0px)`. The close sample retained
`data-modal-camera="closing"` and an intermediate dialog opacity. The suite also
interrupts the second modal during entrance, switches immediately back to WebMD,
and completes the next close.

The final run passed focus trap/return, ten Tab presses, Escape, background
isolation, body/internal scroll, unchanged URL/history, bounded intent preload,
slow/error/retry media, handle-only swipe, visible close controls and all four
mobile geometries. Reduced motion reported no running dialog animation, no page
transform and no page filter. A 1.2-second opening sample recorded 25 frames, a
133.3ms largest frame gap under headless screenshot/test load, zero long tasks
and no page/console errors. This is a bounded local Chromium performance check,
not a device-frame-rate guarantee.

TypeScript, scoped ESLint, `git diff --check` and the production export pass.
Next 15.5.25 exported 11 pages and verified all 288 images plus 104 active image
references. Existing exact-lock dependencies were reused from the prior clean
worktree through a local ignored junction; no dependency was downloaded or
changed. Preview `8094` serves this worktree's export. Ports `8090` and `8092`
were not operated.

Safari, iOS browser chrome, physical devices/safe areas, VoiceOver and other
engines remain unverified. No WCAG certification, push, merge, deployment,
additional spending, model download or local inference is claimed.

## Scope and ownership

This checkpoint owns only the hero kinetic sequence, case-study modal lifecycle,
their scoped CSS, and a focused browser acceptance script. It does not change
copy, case-study narratives, parent foundation selectors, visual-lab work,
navigation source, `main`, deployment configuration, or the parent preview on
8090. No B edit applies.

Jacob corrected the mobile requirement during implementation. The accepted
direction is a sheet that covers the fixed bottom menu, not one that ends above
it. The standard Genesis record helper hung before publishing on three attempts,
so append-only change event
`20260919T163720Z-bd8e4aa785134200a5ffa11d66349dd3` was written manually with
the same schema. No shared pointer or another worker's record was edited.

## Decisions and implementation

### Hero reveal

The old sequence first opened the Jacob Medley and Product apertures almost to
their text edges, then added resting space in a second beat. Both reveals now
open directly to the aperture already used by their settled pose. The shared
clock, five-role loop, offscreen/visibility pausing, resize rebuild, typography,
semantic heading and reduced-motion static state are unchanged.

Measured at 1440px after fonts settled:

- Jacob Medley reveal and rest aperture: 365.226px in both frames; text width
  289.25px at a 47.4848px role size.
- Product reveal and rest aperture: 214.736px in both frames; word width 172px.

### Desktop modal

The page now recedes by 1.5%, moves 24px back in perspective, softens by 3px and
slightly desaturates while the dialog settles forward from a shallow z offset.
Close reverses the same relationship. The movement is intentionally short and
small; it does not pan or zoom the page through a large distance. The previous
full-viewport 10px backdrop blur was removed so the foreground dialog remains
the sharp focal plane rather than being blurred with its background.

Radix Dialog continues to own the modal contract: focus trap, Escape, outside
click, background hiding/isolation, scroll lock and close autofocus. The task
adds no URL or history entry. A cleanup clock keeps the reverse background
transition alive through the dialog's exit animation and then removes the body
state.

### Mobile sheet

At widths below 768px the dialog is a full-width sheet from a safe top gap to the
dynamic viewport bottom. It overlays the fixed site menu at the existing modal
z-index. The footer measures `#the-menu` with `offsetHeight`, after the Radix
portal exists, and reuses that footprint. Its 44px Close control remains visible.
The footer uses the larger of that measured footprint and the minimum needed for
the bottom safe-area inset, which avoids adding the inset twice while keeping a
home-indicator area from obscuring the control. `100dvh`, the fixed top/bottom
edges and internal `.modal-body` scrolling cover changing mobile browser chrome.

A dedicated 28px grabber is the only swipe sensor. It uses pointer capture and
`touch-action: none`; the reading surface keeps native vertical scrolling, so a
content scroll cannot accidentally dismiss the sheet. A downward drag over 88px,
or a shorter deliberate flick, closes it. Cancellation settles the sheet back
instead of dismissing it. The header X and footer Close remain non-gesture paths.

### Loading and performance

Intent listeners are shared by the two modal owners rather than duplicated.
Pointer hover/down or keyboard focus warms at most the first three assets for one
project, once per page session. Nothing walks or loads every study at startup.
Case-study evidence images remain native lazy images and now expose a visible
loading surface, an accurate error state, and a Retry action. Retry changes the
request URL without altering the canonical source path.

Reduced motion disables dialog/camera transitions and loading shimmer. The modal
appears in place, while all focus, scrolling, loading and close behavior remains.

## Verification

Production build and deterministic checks:

- `git fetch --prune origin`: intake HEAD and `origin/main` both `909ea22`,
  divergence `0 0`.
- TypeScript: `tsc --noEmit` passed.
- Authored lint: changed TSX and acceptance script passed with no errors/warnings.
- Lockfile-exact production build passed with Next 15.5.25 under the bundled
  supported Node 24.19.0 runtime: 11 static pages; homepage 46.7kB, 149kB
  first-load JS as reported by the build.
- Production asset preparation verified 288 exported images byte-for-byte and
  all 104 active production image references.
- `git diff --check` passed.

Browser acceptance runs against the isolated static export at
`http://localhost:8092/`. Detailed machine-readable evidence is generated at
`scripts/parity/shots/motion-modal-20260919/results.json`; screenshots cover the
hero Product rest, desktop WebMD modal and mobile WebMD sheet.

The final Chromium run passed:

- exact hero reveal/rest apertures for Jacob Medley and Product;
- desktop open/reverse-close camera state, sharp dialog, background isolation,
  focus trap, ten Tab presses, Escape, visible close, internal scroll, body scroll
  restoration and trigger focus return;
- unchanged URL and history length across modal open/close;
- representative WebMD open/close and immediate switch to the split-test study;
- 375x812 full-width sheet covering the bottom menu, 71px measured nav and
  71px footer, 44px header close, internal scrolling and downward swipe close;
- 320x568, 360x640 and 390x664 short/narrow viewports: 12px top gap, sheet to
  viewport bottom, measured 71px footer parity, 44px close and scrollable body;
- a body-content pointer move did not trigger the grabber gesture;
- reduced motion with no running dialog animation, page transform or blur;
- delayed image loading feedback, forced failure feedback, and successful Retry;
- no collected page or console errors outside the deliberately failed image.

Screenshots were visually inspected. Desktop retains a sharp reading surface over
a modestly recessed page. Mobile covers the nav, keeps both close controls, and
shows the sheet/grabber without clipping at the top or bottom.

## Limits and integration notes

- Chromium touch/viewports are emulation. Safari, iOS changing browser chrome,
  physical safe areas, VoiceOver, other browser engines and physical devices
  were not available and remain unverified.
- This is not the program's final WCAG 2.0 A/AA evaluation and makes no
  certification claim. That review remains intentionally after integration.
- Parent foundation checkpoint `e342d3d24c848bc454461afa47c09c949456707d`
  changes `app/visual-system.css` plus the Hydra asset. This branch changes
  `app/globals.css` and the modal/kinetic modules, so there is no known same-line
  implementation overlap. The taller parent hero CTA still needs one integrated
  visual pass after cherry-pick.
- The acceptance script and report are reusable for the coordinator's integration
  run. Re-run it after applying the parent foundation and any approved visual or
  editorial work; do not treat this isolated pass as integration acceptance.
- No push, merge, deployment, cache operation, production request, added spending,
  model download, or local inference occurred.

## Making-of evidence notes

- Initial problem: brace openings briefly stopped at text edges; modal motion was
  a flat fade/vertical slide; mobile reused a fullscreen desktop shell.
- User intent: keep the current information architecture and behavior while making
  depth, focus and mobile handling feel deliberate rather than decorative.
- Rejected directions: large camera travel, scroll-linked modal motion, gestures
  on the reading surface, eager study loading, a gesture-only close path, and the
  superseded sheet-above-nav geometry.
- Accessibility/performance choices: small transforms, immediate reduced-motion
  path, Radix lifecycle preservation, 44px close targets, handle-only gesture,
  internal overscroll containment, three-asset intent cap and explicit recovery.
- Findings and retests: a synthetic DOM click produced invalid focus-return test
  evidence and was replaced with a real touch tap; the first footer measurement
  ran before the portal ref existed and fell back to 60px, while the nav was 71px.
  A portal-aware animation-frame connection fixed it, and all four mobile
  configurations then measured exact footer/nav parity.
