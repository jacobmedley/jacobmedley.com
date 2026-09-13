# Stage 4 browser-comment checkpoint

Date: September 9, 2026

Branch: `codex/website-refinement-stage1-20260909`

Preceding checkpoint: `fa9ca5d`

## Comments resolved

- Halved the vertical margin around the four featured-card divider rules from
  `clamp(2.5rem, 6vw, 5rem)` to `clamp(1.25rem, 3vw, 2.5rem)`. The rules remain
  visible in the linear layout below 1200px and are hidden when the desktop
  mosaic supplies its own gaps.
- Replaced DentalPlans' generic tooth with the supplied
  `public/assets/references/dp/dp_icon.svg`, copied byte-for-byte to the featured
  asset directory. Source and destination SHA-256 are
  `5F370A37183C4F83A9CF20E4203007CBEB4A11918E78121C54FD46FAAF324FBB`.
- Replaced Hydra's cubes with Font Awesome's Classic Thin `fa-hydra`. Browser
  acceptance confirmed a nonempty glyph from Font Awesome 6 Pro at weight 100.
- Enlarged every featured identity circle to 220 by 220px and scaled each logo
  or icon proportionally inside it.
- Applied registered copy edit B44 to the five homepage excerpts. Their character
  counts are 182, 203, 179, 201 and 189. The BumblebeeMD homepage excerpt no
  longer mentions retirement. Detailed modal paragraphs were not changed.
- Retiled the five cards at 1200px and wider into a responsive mosaic: tall WebMD
  at upper left, DentalPlans at upper right, tall BumblebeeMD below it, Hydra at
  lower left and a full-width One Park Financial closing card. Narrower layouts
  keep the linear card sequence.

## Verification

- `git diff --check`: pass.
- `npx tsc --noEmit --incremental false`: pass.
- Targeted no-cache ESLint over the changed TypeScript and acceptance script:
  pass.
- Stage 4 Playwright acceptance: pass at 320, 375, 768, 974, 1131, 1191,
  1200, 1440 and 1729px. It verifies the supplied assets, exact 220px circles,
  thin Hydra glyph, B44 character spread, no homepage retirement sentence,
  half-size divider margins, desktop mosaic geometry, card containment, zero
  overflow, reduced motion, touch/desktop motion, focus, modal opening and focus
  return.
- Existing annotation acceptance: pass with no recorded browser errors.
- Existing standalone dashboard acceptance: pass across 11 widths, filters,
  keyboard/touch, motion preferences and client navigation.
- Visual inspection: pass at the annotated 1131px and 1729px widths and at
  375px and 1440px.

The dedicated preview is `http://localhost:3010/`. No build, push, PR, merge or
deployment occurred. Rollback is `fa9ca5d` after checking ownership; do not reset
or clean the worktree.
