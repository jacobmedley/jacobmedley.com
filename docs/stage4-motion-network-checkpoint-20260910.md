# Stage 4 Full Stack motion and Call Center network checkpoint

Date: September 10, 2026

Branch: `codex/website-refinement-stage1-20260909`

Preceding checkpoint: `a9367f2`

## Decisions and implementation

- Kept Stage 3's shared motion contract, including the pause control, offscreen
  suspension, hidden-tab suspension, hover/focus behavior and reduced-motion
  static state.
- Increased the perceptible in-view movement for all nine Full Stack cards.
  Icon anchors, icons and geometric fields now have a clearer staggered idle
  range; the three photo cards use a slow pan-and-scale treatment. Text, badges,
  panels and hit areas remain stationary.
- Replaced Call Center's sparse 12-node treatment with a deterministic network
  based on Jacob's supplied visual reference: 38 varied ring/filled nodes and 80
  solid connections. The shared component updates both the homepage Full Stack
  card and the standalone case-study artwork without changing source copy or
  diagrams.
- Preserved the site's gold Full Stack palette and the standalone dashboard's
  theme tokens rather than copying the reference image's blue color.
- No copy-register change was required because no visible text changed.

## Verification

- `git diff --check`: pass.
- `npx tsc --noEmit --incremental false`: pass.
- Targeted no-cache ESLint over the changed TypeScript and acceptance scripts:
  pass. Stylesheets remain ignored by the repository's ESLint configuration.
- Focused motion/network acceptance: pass at 1440px normal motion and 375px
  reduced motion. It verifies 38 nodes, 80 connections, changing anchor/network/
  node/line values, hover pause, global pause, photo motion and zero overflow.
- Homepage annotation acceptance: pass at six widths from 375px through 1440px,
  including the 140px untransformed anchor contract, responsive layout, touch
  motion and the dense Call Center field.
- Existing Stage 4 featured-card acceptance: pass.
- Standalone dashboard acceptance: pass at 11 widths with filters, keyboard,
  touch, motion preferences, client navigation and six preserved stories.
- In-app browser review at 1887px confirmed the updated Full Stack first row,
  solid network connections, loaded thin icons and no horizontal overflow.

Preview remains local at `http://localhost:3010/#full-stack`. No push, PR, merge
or deployment occurred. Rollback is `a9367f2` after checking ownership; do not
reset or clean the worktree.
