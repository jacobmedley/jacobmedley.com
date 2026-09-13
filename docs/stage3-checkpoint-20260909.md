# Stage 3 checkpoint

Date: September 9, 2026
Branch: `codex/website-refinement-stage1-20260909`
Preceding checkpoint: `59f5c63` (Stage 2)

## Scope completed

- B43 was authored in `docs/copy-register.md` before implementation. The shared
  control uses the labels `Pause motion` and `Resume motion`, with `aria-pressed`
  exposing its state.
- `MotionControls` is mounted once from the root layout and observes all current
  and newly navigated `[data-motion-root]` elements. It pauses animation when the
  user requests it, when a root is offscreen, and when the document is hidden.
- The shared motion contract now runs on desktop and touch: restrained idle
  movement for photos, featured images, icon anchors, icons and geometry; a
  `cubic-bezier(.16, 1, .3, 1)` rollover transition; and reduced-motion static
  behavior. Text, badges, panels and hit areas do not move.
- Call Center now renders 14 SVG connections whose endpoints match the existing
  node positions. Personalization has an independent slow radial rotation and
  its streaks retain separate interaction transforms.
- Homepage full-stack cards, homepage featured work images, standalone outcome
  cards and standalone study cards all participate in the same suspension and
  pause behavior. Touch navigation remains direct and does not depend on hover.

## Verification evidence

- `git diff --check`: pass.
- `npx tsc --noEmit --incremental false`: pass.
- Targeted `npx eslint --no-cache` over all changed TSX files: pass.
- Dedicated preview: `http://localhost:3010/`, served from this worktree. The
  existing port 3000 service was not disturbed.
- Playwright Chromium, 1280×800, `reducedMotion: no-preference`: 14 Call Center
  connection lines, Personalization animation name `personalization-rotate`,
  changing geometry translation, pause state `paused` with `Resume motion`, no
  page errors, and client navigation to a study detail route passed.
- Playwright Chromium, 375×800 touch emulation: mobile idle animation name
  `thinking-dolly-field-mobile` passed. Back navigation reattached the observer.
- Playwright Chromium with `reducedMotion: reduce`: animation name `none` and
  play state `paused` passed for icon geometry.

## Limits and recovery

The full repository `npm run lint` remains unable to write its Next cache in this
worktree (`EPERM`); the no-cache targeted ESLint run passed. No production build
was run because Stage 2 documented the worktree development-output lock and the
stage instruction stops at this checkpoint. Physical devices, Safari and Firefox
were not tested. No push, PR, merge, deployment or local-model job was performed.

Rollback is the preceding Stage 2 commit `59f5c63`, after checking ownership. Do
not reset or clean the worktree. Stage 4 owns the selected horizontal card family
and supplied artwork; Stage 5 owns sticky section headers; Stage 6 owns cross-site
acceptance.
