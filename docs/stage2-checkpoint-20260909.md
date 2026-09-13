# Stage 2 checkpoint

Date: September 9, 2026
Branch: `codex/website-refinement-stage1-20260909`
Base: `7651df72026c70b5e2d7fef257732f0f7c7b8162`

## Scope completed

Implemented only the independent Stage 2 items authorized by the Stage 1
specification:

- Annotation 1: the Full Stack introduction has a scoped 48px bottom margin;
  the existing responsive grid spacing remains in place, yielding 48px below
  576px and 64px from the `sm` grid margin upward.
- Annotations 6–8 / B40: the exact Design Leadership body is now the section
  introduction. AI Product Design leads the left column, Business Outcomes
  leads the right column, and the old duplicate Design Leadership bullet is
  removed. Existing source wording and figures remain unchanged.
- Annotation 14: homepage image frames and standalone cards use one 32px outer
  clipping contour with isolated stacking contexts, preventing scaled artwork
  from exposing lower corners around the glass surfaces.
- Annotation 15: homepage badges and eyebrows, standalone eyebrows, badges,
  outcome types, career notes, stat labels and filters use the registered 14px
  readability token, with the registered secondary ink `#594c62` on the
  standalone surface.
- Annotation 18: the standalone filter bar uses the registered 90% white
  glass fallback, 24px blur, 115% saturation, visible borders and 44px filter
  targets at all widths.

B41 featured-study summaries were not applied. The copy register and all five
`lib/data/projects.ts` summary fields remain unchanged because Jacob's approval
is still pending. No featured-art family, new motion, icon ownership, sticky
header, source asset or interaction semantics were changed.

## Verification

- `git diff --check`: pass.
- `npx tsc --noEmit --incremental false`: pass. The default incremental check
  could not rewrite the existing `tsconfig.tsbuildinfo` because this worktree's
  file guard denied the write.
- Targeted ESLint: no errors; CSS files were reported as ignored because the
  repository ESLint configuration has no CSS rule set.
- `scripts/parity/dashboard-acceptance.mjs` against `http://localhost:3000`:
  pass at 11 widths, both filtered collections, career provenance, sticky bar,
  keyboard/touch, thin icons, reduced-motion behavior, client navigation and
  six preserved source stories.
- `scripts/parity/annotation-acceptance.mjs` against `http://localhost:3000`:
  pass at homepage widths 375, 768, 974, 1191, 1200 and 1440, standalone
  widths 375, 974, 1200 and 1440, plus mobile motion. All routes returned 200,
  overflow was zero, and no browser errors or overlays were reported.
- Stage 1 token evidence remains valid for the registered ink values: #302c38
  9.618:1, #594c62 5.633:1, #18394d 8.573:1, #394d5d 6.2:1, #644672
  5.578:1 and white on #214b65 9.296:1. These are token checks, not a claim
  of exhaustive composited WCAG acceptance over every moving or photographic
  background; later cross-site acceptance remains responsible for that audit.
- `npm run build` was started but stopped after it remained blocked by the
  active worktree development output. No build result is claimed.

## Recovery and remaining work

The implementation rollback is the preceding Stage 1 commit
`7651df72026c70b5e2d7fef257732f0f7c7b8162`, after checking ownership. Do not
reset or clean the worktree. Stage 2 stops here. B41 approval, Stage 3 motion,
Stage 4 selected card implementation, Stage 5 sticky behavior, Stage 6 full
acceptance and Stage 7 PR packaging remain separate work.
