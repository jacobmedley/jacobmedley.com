# Hero reveal and transfer refinement

Jacob's updated Figma 15:244 request is implemented from rollback `1c6535a`
on `codex/website-visual-system-20260912`, worktree 4b5e.

The name is fully opaque throughout. A center-out clip mask uses the same
opening widths, timestamps and easing as the braces, including spring overshoot.
After opening, the name remains revealed. The braces descend at their existing
width with no horizontal travel, snap together at the role line, then spring
open around a matching masked Product reveal. Later roles, plus rotation,
closing fade, demo and all copy remain unchanged.

The refreshed Figma motion context reports a 3089.468ms cohort. Its original
vector assets still match the committed files exactly. The full motion response
is preserved in `docs/reviews/hero-transfer-figma-20260912.json`.
Three distinct exported spring functions remain distinct in the WAAPI clock:

- Arrival and Product reopening: decay 7.6657, frequency 6.7605, damping 1.1339.
- Rotation, name opening and descent: 7.4426, 10.5254, .7071.
- Snap closed: 11.1803, .1581, 70.7054.

The supplied functions are sampled at 81 points into CSS linear() easing.
Timeline fractions come directly from the updated snippets, mapped against the
cohort duration. Measured text widths and line positions replace fixed canvas
coordinates. The prior 39-second overall clock and later word timings remain.

At enlarged text sizes, the name reserves one role-em of horizontal room for
its braces. The old mechanism max-width could clamp spring overshoot while the
mask continued moving; it was removed after that mismatch appeared in testing.
The measured name target still fits the container. All tested layouts have no
page overflow, including 200% text at 320px.

## Verification and limits

- TypeScript, targeted ESLint, production export (11 static pages) and
  whitespace checks pass. No new dependencies or copy edits.
- 175 frame samples cover 320, 375, 768, 992 and 1706px plus 200% text at 320
  and 992px. Checks cover mask/brace edge equality, constant name opacity,
  straight descent before closure, zero-width snap, connected Product reveal,
  later IxD/Human states, fixed plus center and the unmoving closing line.
- Real playback collected 34 observations from time 0 through 3302.7ms.
  It starts with a closed mask and opaque name and completes the transfer.
- Reduced motion shows an unmasked name and both static braces with zero
  animations. Seeking the finite endpoint and resizing keeps all 17 tracks
  finished at 39000ms. The full 39 seconds was not replayed in real time in
  this scoped pass; its unchanged lifecycle was verified in the prior pass.
- Refreshed Figma SVG response contents equal both existing asset files.
  Project data, demo source and reference assets match `1c6535a`.

The first enlarged-text checks found the max-width mismatch above; all seven
settings passed after the correction and rebuild. An initial real-playback
measurement exceeded the browser command's default timeout. It was repeated
successfully with an explicit 10-second command allowance. No page test
overrides remain after the final reload. Browser verification is Chromium only.

Reproduction: `scripts/parity/hero-transfer-20260912.mjs` runs through the
existing in-app browser. Compact tracked evidence is in
`docs/reviews/hero-transfer-20260912.json`; full frame data and screenshots
are under the ignored `scripts/parity/shots/hero-transfer-20260912/` folder.

## Handoff

Changed source: `components/ui/KineticHeroIdentity.tsx` and
`app/visual-system.css`. Other changes are this report, two review JSON files,
the focused verification script and STATUS. No B edit was needed or skipped:
this request changes presentation without changing registered words.

The active model was retained; Sol/medium was recommended, but no supported
in-place model switch was performed. Deterministic tools and the existing
subscription were used, without local inference or additional spending.

Exchange freshly read at 2026-09-13T03:41:23Z, fingerprint
`ab35017895580fd62ceb03b918cb7e708dcd333ee82e221e94c28bc1c57760b2`.
Direction event: `20260913T034229Z-5bb937bdc91f41b0b0a4e8497bfa1388`.
Subsequent checks report fingerprint
`4409d3ec67f00709c9febd4db5d44ce72859162aee1fece2d3b77f255dc0c3d1`,
with no conflicts. The completion event records the final commit. Shared
CURRENT and website pointers remain coordinator-owned; no remote read is claimed.

Preview: http://localhost:3013/, static out/ in this worktree, PID 62276,
HTTP 200. No other checkout or service was operated. No push, merge or deployment.
Rollback: `1c6535a`. The recovery commit contains STATUS; the owned lock is
released on closeout. No remaining work for this refinement. Previously deferred
broader copy, BumblebeeMD expansion and Reveal source replacement remain open.
