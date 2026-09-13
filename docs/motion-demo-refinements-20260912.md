# September 12: motion and call-center refinements

Jacob's latest eight browser comments are implemented in worktree 4b5e on
`codex/website-visual-system-20260912`, from rollback `99409f0`.
This is a local preview checkpoint, with no push, merge or deployment.

## Requested changes and decisions

1. Page separator periods are four times longer: 28, 40, 52 and 80 seconds.
   Existing colors, shapes and reduced-motion treatment remain.
2. Modal section icons have no circle, border, background or extra padding.
   A 2rem icon plus 1rem gap defines a shared 3rem content inset on both sides.
   At 575px and below, icons stack above titles and the inset is zero. This
   replaces the contextual 99px annotation and scales with text enlargement.
   Headings with icons group their following media so content shares the inset.
3. The call-center study renders an interactive ecommerce phone and a control
   panel. Auto/Ready/Busy/Closed form one native button group; Highlight is a
   keyboard-operable switch. Header, banner and hero share a single state.
   Ready has no offer, Busy offers 15% online only, Closed offers 10% online.
   The menu and primary actions stay inside the simulated preview. Controls
   appear above the phone below the existing 992px large-layout breakpoint;
   the smaller 575px layout compresses explanatory controls to keep the phone
   visible. The screenshot's old three-card layout is replaced. No separate
   Highlight Dynamic block was present in the current source.
4. Figma file `X9tbhBL2oYEBxwcYEKr5UT`, node `15:244`, was read with design
   context and recursive motion context. Its two animated vector nodes,
   `15:211` and `15:212`, export a shared 2200ms timeline. The local raw response
   is in `docs/reviews/hero-motion-figma-20260912.json`. Exact SVG bytes are
   preserved, using CSS masks to apply the site's purple instead of reference
   red/green. The user-supplied plus.svg is also byte-identical to its source.
   The brace spring functions and timing fractions are retained in the existing
   WAAPI clock: arrive 595.54ms, turn 737.66ms, upright 962.06ms, spread 1236.84ms,
   open 2129.6ms. Easing functions are sampled at 81 points into CSS linear().
   Spatial travel scales to the type size and measured name width, with centered
   spreading instead of absolute canvas coordinates. Both vector rotation
   anchors remain 0% 50%. The plus rotates around its geometric 50% 50% center.
   The Figma loop is used once for the entrance, as required by the site's
   retained name/role sequence. Braces then move to and remain around each role.
   The closing line has opacity-only keyframes after the first word cycle.
5. `IxD` replaces `IdX`. Role and Design weight increases from 500 to 600.
6. Contribution pills globally use .875rem text and icons, .5rem / 1rem padding,
   and #ffffff66 backgrounds. At default text size these are 14px / 8px / 16px.
7. BumblebeeMD expansion is recorded as a future copy task in B55. Its current
   brief is unchanged. No new historical claim was written.
8. The modal hero wave SVG and its CSS rule are removed from the shared renderer.
   This applies to every modal hero; page separators use the slower treatment.

## Verification

- TypeScript, ESLint, production export of 11 static pages, and git diff whitespace
  checks pass. No dependencies were added. The React checklist was applied to
  effect cleanup, native controls, stable rendering, derived state and focus.
- The export passed 98 modal cases (then all seven hero settings were rerun
  after the final brace-only centering adjustment): all 14 studies at 320, 375, 768, 992 and
  1706px, plus 200% text at 320 and 992px. No horizontal overflow, unwanted modal
  wave, badge-token mismatch, icon plaque or focus-return failure was found.
- Seven hero settings each sample 17 timeline points. Name reveal, five-role
  order, retained braces, weight and opacity-only closing pass. Plus and brace
  centers differ by at most 0.008px when on the same line after a final .025em
  adjustment. Mid-rotation samples also keep the center fixed. At narrow container widths,
  the established stacked role/Design layout is intentional.
- A real-time hero run finished all 16 animations at 39000ms with Human visible.
  Resizing afterward kept every animation finished at that time.
- Native state changes produce the requested header/banner/hero messages and
  offers. Space toggles Highlight for three regions. Enter opens the simulated
  plan view and focuses its heading; Back to home returns focus to the CTA.
  The mobile menu, phone support preview and plan preview were exercised.
- Auto changed Ready to Closed over an observed 13.6 seconds, consistent with
  its two 5-second transitions. It remained Closed for 20.4 seconds offscreen.
  Reduced motion remained Ready for 24.6 seconds with zero demo animations;
  choosing Busy still works. The static hero shows Product, both braces and
  the closing line with zero animations.
- The supplied plus SHA256 is
  `02b55e463bf12ae910aac3aedf3f38a942e267c2dd859a2aebaa9518894c9027`.
  Original image files, project narrative, Resume and education source match
  rollback `99409f0`. The prior deterministic source check also passes.

Detailed measured results are in `docs/reviews/motion-demo-20260912.json`.
Reproducible viewport checks are in `scripts/parity/motion-demo-20260912.mjs`.
Screenshots remain under the ignored `scripts/parity/shots/motion-demo-20260912/`.

## Corrections and limits

An initial alignment assertion assumed every desktop viewport kept the hero on
one line. At 992px with 200% text the container correctly stacks it. The test
now checks the actual layout before comparing centers. A 5.2-second CDP await
exceeded the tool's per-command timeout; later observations use separate reads.
Neither issue was a production error. One multi-file patch failed anchor
validation without applying changes and was then split and applied correctly.

The visual review covers the available Chromium preview, not Safari, Firefox or
a physical phone. Auto visibility was verified by scrolling the modal, not by
switching to a real background tab. The phone is an illustrative demo with no
call-center API, real call or purchase. Reference canvas positions are adapted
for responsive text; this is not an absolute-coordinate clone of the Figma page.

Broader copy work, the BumblebeeMD brief expansion, and the previously deferred
Reveal source-image replacement remain open. No private data or original images
were changed. No local inference or additional paid service was used; token
savings are not claimed.

## Handoff

Exchange intake: 2026-09-13T02:50:40Z, fingerprint
`d4479e5739b7511a551f2032c91f020ccf3dec64964e43c1a318d16aa0ff48b5`.
Change event: `20260913T025133Z-ab0a322e187242b1a12ec3443540e394`.
Refreshed during implementation and acceptance, no conflicts. The completion
event will contain the final recovery commit. CURRENT and the website workstream
card remain coordinator-owned and stale; no remote acknowledgement is asserted.

Preview: `http://localhost:3013/`, static export in this worktree, PID 34976.
The other worktree was not operated; port 3012 was no longer listening at
closeout. Rollback is `99409f0`; the final
commit contains this report and STATUS. The owned lock is released on closeout.
