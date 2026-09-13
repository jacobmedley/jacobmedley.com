# Stage 4 checkpoint

Date: September 9, 2026

Branch: `codex/website-refinement-stage1-20260909`

Preceding checkpoint: `7e078f3`

## Scope completed

- Implemented Jacob's selected B family as five full-card fields with a darker
  end behind an inset, 88%-opaque glass copy panel and three nested schematic
  planes. The cards switch from a 40/60 horizontal layout at a 680px card width
  to a stacked layout at 679px, while the artwork retains a fixed 140px identity
  anchor and stable copy, hit areas and modal behavior.
- WebMD uses the supplied white logo and only the approved health motifs. DentalPlans
  uses the approved thin tooth/depth schematic. BumblebeeMD uses the supplied bee
  mark and a bounded field built from the supplied hex asset. Hydra and One Park
  Financial retain their approved thin cubes and building-column treatments.
- Viva now uses the supplied, text-free `images/work/viva-modal/vs-3.png` source,
  cropped from the left through CSS. The source file is unchanged from the
  preceding commit (Git blob `c4715cae3faa4bcc4ef565dbe152635e3ff7db69`, SHA-256
  `0CFC759AF22F8E6D4EF8CF8194A161606761B4EA4DA60A6B73C2D8C0BAC1765D`).
- Preserved both modal triggers, Escape/close focus return, registered production
  summaries, canonical case-study data and diagrams. No visible copy was authored,
  so `docs/copy-register.md` is unchanged and B41 remains pending.
- Extended the Stage 3 pause/offscreen/hidden/reduced-motion contract to the new
  field, planes and honeycomb. The older dashboard and annotation harnesses were
  made deterministic for document-clamped sticky state, offscreen suspension and
  the existing Call Center connection node; no dashboard product behavior changed.

Imported brand assets are byte-for-byte copies of the supplied sources:

- `webmd-logo-white.svg`: `410BB5F75210086DD9D57CB93825D4AA73BEE32AFD2467397FFEEE6614485D12`
- `bumblebeemd-icon.svg`: `5CDCA0AA75656770F2AA3408925082F223FFF84B74BD30A91B7FE803EA62B050`
- `bumblebeemd-hex.svg`: `14C9AF0CB49BB200BC6238951C1B134F0D905453BF5C5F30D83C9BF08402E41D`

## Verification evidence

- `git diff --check`: pass.
- `npx tsc --noEmit --incremental false`: pass.
- Targeted no-cache ESLint over the changed TypeScript and acceptance scripts:
  pass.
- Stage 4 Playwright acceptance: pass at 320, 375, 768, 974, 1191, 1200 and
  1440px, including the exact 679/680 card breakpoint, no horizontal overflow,
  loaded identity assets and thin icons, Viva crop bounds, glass/focus styling,
  desktop idle/hover/focus, touch idle/direct activation, reduced motion,
  pause reset, both modal triggers and focus return.
- Existing annotation acceptance: pass at its six homepage and four standalone
  widths, with no browser errors. Existing dashboard acceptance: pass at 11
  widths with filtering, sticky contract, keyboard/touch, motion preferences,
  navigation and source-story preservation.
- Visual review of generated 1440px and 375px screenshots confirmed all five
  identities, responsive composition, readable glass and no error overlay.
- Conservative contrast calculation for the 88%-white glass over a black
  worst-case composite (`#e0e0e0`) is 10.31:1 for `#302c38` and 6.04:1 for
  secondary `#594c62`.
- `/`, `/case-studies/` and `/case-studies/one-platform-five-properties/`
  returned HTTP 200 from the dedicated `http://localhost:3010/` preview.
  Canonical `docs/case-study-site-copy.json` is byte-identical to the preceding
  commit.

## Model, coordination and limits

GPT-5.6 Sol at medium effort was recommended for this scoped component stage;
host metadata confirmed that combination is available. This task cannot inspect
or change Jacob's actual selected model, so no model switch is claimed. No model
inference ran: the laptop-inference hold was honored, and there was no paid
fallback, model download, usage reset or automatic execution of model output.

Genesis's status helper is currently blocked by the pre-existing malformed
`10-inbox/20260909T-stage3-26c176a-7e078f3.json`, which lacks event provenance.
That prior event was not edited. The final Stage 4 event is appended separately
after the required freshness reread and local commit.

No full production build, physical-device run, Safari or Firefox check is claimed;
Stage 6 owns cross-site acceptance. No push, PR, merge or deployment occurred.
PR #8 and `main` were rechecked through GitHub at intake: PR #8 is merged and its
merge commit/current remote `main` is `e6b3672f88e5847d84a854f45ae3d29ca8269952`.

Rollback is the preceding local checkpoint `7e078f3`, after checking worktree
ownership. Do not reset or clean this worktree. The dedicated preview on port 3010
is the only service started by this stage and remains available for local review.
Stage 5 owns sticky section headings; Stage 6 owns cross-site acceptance.
