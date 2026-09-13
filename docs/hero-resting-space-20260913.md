# Hero resting space, typography and Product finale

Jacob accepted the connected mask and clarified that the original end gap was
desirable. This follow-up starts from `c7a6627` in worktree 4b5e on
`codex/website-visual-system-20260912`.

The shared aperture remains unchanged during each reveal. After its mask
releases, a separate 180ms outward move adds the original resting space:
.8em per side around the name and .45em around the role. The name width
continues to respect the existing container cap at enlarged text sizes.
No breakpoint was added. Downward transfer and the initial tail entrance
shift 180ms to accommodate this extra step; the existing spring curves and
later role-change times remain, with a final Product transition at 38000ms.

At the closed Product snap, the original Figma vectors switch discretely to
actual curly characters using Design's font family, 1em size and weight 600.
There is no cross-fade. A -.08em optical vertical offset aligns the URW Form
curly center with the plus. The reduced-motion braces use the same typography.
The 39-second finite sequence now stops on Product; its final width and
visibility derive from the final role index together.

## Verification and limits

- TypeScript, targeted ESLint, whitespace checks and final production export
  pass (11 pages). Project data, call-center demo and reference SVGs match
  `c7a6627`. No copy changes or B edits applied/skipped.
- 280 frame checks across 1706, 992, 768, 375 and 320px plus 200% text at
  320/992px pass. They verify connected masks, mask release before end-space
  expansion, restored gaps, discrete font swap, matching typography, later
  role changes, final Product and zero page overflow.
- The exact decimal snap boundary rounded just before the transition in
  Chromium. The assertion now checks the following frame, while preserving
  a separate pre-snap assertion. No source timing workaround was necessary.
- The sequence was started at zero and allowed to run naturally. Subsequent
  inspection found all 19 tracks finished at 39000ms, Product alone visible,
  and state settled. Resizing preserves that result. Reduced motion has zero
  animations, Product visible and both static braces at weight 600.
- Two attempted long CDP recorder calls timed out. The second followed current
  tracks to accommodate font/layout rebuilds; the timeout was still observed.
  End-state snapshots verify completion, but a complete live frame recording
  is not claimed. The recorder uses short end-state reads in the saved script.
- Screenshots confirm the fully revealed name with resting space and the
  final Product typography. An early screenshot taken during layout changes
  was replaced by a stable name-rest confirmation. Chromium only; other
  browser engines and physical devices were not tested.

Reproduction: `scripts/parity/hero-resting-space-20260913.mjs`. Compact
evidence: `docs/reviews/hero-resting-space-20260913.json`. Full frame results
and screenshots: ignored `scripts/parity/shots/hero-resting-space-20260913/`.

## Handoff

Six files changed: KineticHeroIdentity.tsx, visual-system.css, the focused
verification script, this report, compact evidence and STATUS. This remains
the same scoped implementation/model route as the prior refinement. No model
switch, local inference or additional spending occurred.

Exchange was freshly read at intake (04:15:18Z September 13), fingerprint
`ffa451075f29786ba55bc74ec68e7aaea829f26f29784c6986e53e6ad6b6e938`.
Direction event: `20260913T041533Z-31fac2cae2614f479e444498e5a22921`.
Acceptance check at 04:25:01Z, fingerprint
`205c1b9e6f57786674c01fae5d031091fee1e8be24435e2664ce6d70c0ed723c`.
No conflicts. The completion event records the final commit. Shared pointers
remain coordinator-owned; no remote acknowledgement is claimed.

Preview http://localhost:3013/: this worktree's out/, PID 25608, HTTP 200.
Test overrides were cleared and normal playback restored. No other checkout's
service was operated. No push, PR, merge or deployment. Rollback: `c7a6627`.
STATUS is written last, then the local recovery commit and owned lock release.
No unresolved implementation work for this request. Previously deferred copy,
BumblebeeMD expansion and Reveal source replacement remain open.
