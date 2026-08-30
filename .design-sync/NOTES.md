# Design Sync notes

## Scope decision, 2026-08-29

This repo is a Next.js app (`private: true`), not an npm component-library
package — no `main`/`module`/`exports`, no `dist/` build, no `.d.ts` exports.
There's also no Storybook (`.storybook/`, `*.stories.*`: zero matches,
confirmed with the user).

Jacob confirmed **tokens-only** scope: ship the design tokens from
`app/globals.css` (color families, font stacks, shadow scale) with an empty
component bundle. Deliberately excluded:

- `components/ui/*` (WorkCard, WaveSeparator, SectionHeader, CaseStudyModal) —
  small reusable pieces, but out of scope for this first sync by Jacob's
  choice. Candidate for a future re-sync via `componentSrcMap` (remove their
  `null` entries) if he wants them added later.
- `components/sections/*` (ResumeSection, HeroSection, FullStackSection,
  EducationSection, CaseStudiesSection) and `components/nav/NavMain` — these
  take no props and render hardcoded page copy. Not reusable design-system
  components; recommended against syncing even in a future pass unless
  they're refactored to accept props.

All 10 discovered PascalCase exports are `null`-mapped in `componentSrcMap`
to force the tokens-only path (`[ZERO_MATCH] no component exports — treating
as tokens-only DS`), since the synth-entry scan over `components/` would
otherwise pick all of them up automatically. In practice, on the observed
first run, `srcRoot` auto-detected to `lib/` (it exists and is checked before
`components/` in the priority list `src/ | lib/ | components/`), which has no
`.tsx` files of its own — so the null-map never even had to filter anything
out on this run. It's still load-bearing: `deriveComponentsFromSrc()` filters
by `componentSrcMap` regardless of which directory wins as `srcRoot`, so if
`lib/` ever stops existing (or gains `.tsx` files first), `components/`'s
exports still get excluded correctly. `--entry ./dist/index.js` in config is
a deliberately nonexistent placeholder path — its only job is making
`package-build.mjs`'s PKG_DIR walk-up land on the repo root (this repo has no
real `dist/`), not a real build artifact.

**`guidelinesGlob` explicitly set to `[]`.** The default glob (`docs/*.md`)
would otherwise sweep up every file in `docs/`, none of which are design
guidelines — they're copywriting/content-governance rules
(`copy-register.md`, `data-reporting.md`, `jacob-style.md`,
`voice-and-tone.md`, `working-agreement.md`, etc.), and some explicitly note
they hold content that must never appear in a public deliverable. Do not
remove this override without checking `docs/` content first.

## CSS and fonts, first-build fixes

- **`cssEntry` points at `.design-sync/.cache/compiled-globals.css`, not
  `app/globals.css`.** The raw source still has an unresolved
  `@import "tailwindcss";` (Tailwind v4 CSS-first config) — shipping it
  verbatim tripped `[CSS_IMPORT_MISSING]` (a design build can't resolve a bare
  npm-package import). The compiled output from `next build`
  (`.next/static/css/<hash>.css`) has everything resolved: real `:root`
  custom properties and only the utility classes actually used on the site.
  Its filename is content-hashed and changes every build, so
  `.design-sync/prepare-css.mjs` (durable, committed) copies it to the stable
  cache path `cssEntry` points at. `cfg.buildCmd` runs `next build` then this
  script — re-run it before every re-sync if the build script changes.
- **`urw-form` (Adobe Fonts / Typekit, `app/layout.tsx`'s
  `<link href="https://use.typekit.net/zps8jqb.css">`) is in
  `runtimeFontPrefixes`, not shipped.** It's a commercially licensed kit
  loaded at runtime from Adobe's CDN — can't be redistributed as `@font-face`
  files. Practical effect: previews built in claude.ai/design won't actually
  load this font (nothing in the shipped bundle triggers that external
  `<link>`), so headings render in the fallback there. Accepted trade-off,
  not fixable without shipping licensed font files.
- **Manrope (the site's declared fallback behind `urw-form`) is genuinely
  never loaded anywhere on the live site** — checked `.next/static/css` and
  `app/layout.tsx`, no `@font-face` or Google Fonts link for it exists
  today. It's open-license (SIL OFL 1.1), so sourced real files via
  `@fontsource/manrope` (installed isolated in `.ds-sync/node_modules`, not
  the app's own deps) — Latin-subset-only, weights 400/700 (matching the
  site's `--font-weight-normal`/`--font-weight-bold` tokens), copied to
  `.design-sync/fonts/manrope-latin-{400,700}.woff2` + a hand-authored
  `manrope-latin.css`, wired via `cfg.extraFonts`. This is a real
  improvement over the live site, not just a design-sync workaround — worth
  mentioning to Jacob as something the live site itself could adopt (an
  actual self-hosted Manrope fallback instead of an unloaded font-family
  name).

## Re-sync risks

- If `app/globals.css` is restructured (tokens moved to a different file,
  Tailwind config changed to `tailwind.config.*`), `cssEntry` needs updating.
- If Jacob later wants `components/ui/*` included, remove those four names
  from `componentSrcMap` (leave the six `sections`/`nav` ones excluded) and
  re-run — this repo still has no `dist/`, so it'll go through synth-entry
  mode with weaker `.d.ts` inference; expect to iterate.
- No conventions.md authored yet for a components-bearing sync — if
  components are ever added, author `.design-sync/conventions.md` per the
  base skill's step before that upload.
