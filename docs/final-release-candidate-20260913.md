# Final release candidate review — September 13, 2026

## Candidate

- Code candidate: `40377c4746e9262a3524aeef0d05a3ab6f546fb6`
- Branch: `codex/website-visual-system-20260912`
- Starting checkpoint: `4aefa908aa6356724ce93a27baab66cb1c7b5f1f`
- Fresh comparison base: `origin/main` at `e6b3672f88e5847d84a854f45ae3d29ca8269952`
- Unpublished range: 38 commits, 134 files changed
- Disposition: ready for pull-request review; no confirmed implementation release blocker remains.

## Blocker reconciliation and fix

ACC-B01 was still reproducible at 320px with 200% root text. The six DentalPlans
and Hydra supporting diagrams retained fixed-height/absolute compositions, clipping
their enlarged labels. They now switch at a `20em` container measure to intrinsic
height. Hub labels stack below the center and flow labels use one content-sized
column. The em-based condition responds to both a narrow card and enlarged type;
wide, normal-text compositions keep the accepted arrangement. All six diagrams and
the call-center schematic now report zero clipped nodes and zero internal overflow.

ACC-B02 is resolved in current source. `MotionControls` renders no visible fixed
control, and the four homepage section headings use relative positioning. Checks at
320, 375, 438, 439, 768, 1100 and 1440px, plus 320px/200% text, found no motion
control, sticky heading or fixed-element collision.

The accepted hero is unchanged byte-for-byte from the starting checkpoint:
connected masks, wider post-reveal spacing, the brace typography switch at the
closed snap, and the finite Product ending are preserved. Project data, canonical
case-study copy and all copy authorities are also unchanged from that checkpoint.

## Verification

- TypeScript: `tsc --noEmit --incremental false` passed.
- ESLint: `app components hooks lib scripts --no-cache` passed.
- Production export: `npm run build` passed under local Node 22.11.0; all 11 static
  pages exported.
- Source preservation: the current final-release source check passed against
  `4aefa908`; the visual-system source check also passed, including original images
  and supplied SVGs.
- Browser acceptance on the rebuilt static export passed with zero console warnings
  or errors: eight homepage layouts, 42 modal scenarios covering all 14 projects,
  12 standalone-route scenarios covering all six stories, all six filters, and the
  call-center Ready/Busy/Closed states, highlight switch and mobile menu.
- Keyboard: modal activation, 30-step focus containment, Escape close and trigger
  focus return passed. Reduced motion produced a static Product hero with no
  animations. Resume disclosure behavior was already accepted in the unchanged
  starting checkpoint; the complete modal and page reflow matrix found no regression.
- Navigation and resume paths: all five homepage anchor targets, standalone index,
  story back/next links and the case-study links to `/#resume` resolve in the export.
- Diff whitespace: `git diff --check origin/main` passed. Three historical parity
  files had only surplus EOF blank lines removed.

The September 11 `release-source-acceptance.mjs` assertion is historical and now
stale: it compares later, registered contribution-label changes to `e6b3672` and
fails on WebMD. It does not describe a change made in this review. The current
checkpoint-bound source check supersedes it for this candidate.

## Coverage limits and deferred work

The in-app Chromium browser does not expose browser-chrome zoom, so native 200%
page zoom was unavailable; 200% root-text reflow was exercised instead. Opening a
second in-app tab left the original page `document.hidden === false` and emitted no
native visibility event, so native hidden-tab suspension remains unverified. The
visibility code and accepted hero implementation were unchanged. Firefox, WebKit,
a physical mobile device and Node 20 CI were unavailable locally and remain PR/CI
review items.

The broader copy rewrite, BumblebeeMD expansion and Reveal image replacement remain
deferred. No copy, project claim, image source, hero motion, deployment workflow or
external resume master changed. No push, pull request, merge or deployment occurred.

Preview at review close: `http://localhost:3013/`, static `out/`, listener PID
34544. The
release-review rollback point is `4aefa908`; fresh main remains `e6b3672`.
