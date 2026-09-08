# Wave 2 visual checkpoint

Accepted locally on September 6, 2026. No deployment or remote push was performed.

## Applied treatments

- Case-study collection cards now bind illustration and story copy inside one themed border and radius.
- The colored case-study hero dashes are replaced by a single faded rule.
- The perspective block follows eyebrow, faded rule, quote, faded rule, source line.
- Shared main-site section headings use a scoped thin icon up to 4rem and a 500-weight title up to 3rem.
- Selected-work tiles use a full image or icon field with a bottom information rail. The rail uses translucent blur when supported and an opaque fallback otherwise.

## Evidence

- Representative case-study cards, perspective treatment and selected-work grids were captured at 375 and 1440px with Playwright Chromium.
- The first unified card measured 585px wide with equal 583px content/scroll widths and no clipping.
- Mobile and desktop captures retained readable title/action contrast, complete card bounds and the fixed navigation behavior.
- `npx tsc --noEmit`, targeted ESLint, `npm run build` and `git diff --check` passed after the changes.
- Model route: GPT-5.6 Sol with medium reasoning. Deterministic browser and repository tools supplied the acceptance evidence; no local-model route executed.

Generated PNGs remain under the ignored `scripts/parity/shots/wave1/` folder. The repeatable Wave 1 harness continues to cover interaction and responsive regressions.
