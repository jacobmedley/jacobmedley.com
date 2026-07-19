# Execution Brief — Weekend Parity Sprint

**Branch:** `refactor/react-migration`
**Mission:** Bring the Next.js scaffold to pixel parity with the legacy site, verified by an automated diff harness — then finish the data-driven project system so adding/removing a project is a data-only change.
**Deadline:** Sunday night. Work phases in order. Do not skip Phase 0.

---

## Definition of Done

1. Every section passes the visual diff harness at all 4 breakpoints with < 2% pixel difference (excluding image-loading noise and animated elements).
2. `npm run build` produces a clean static export. Zero TypeScript errors, zero ESLint errors.
3. Adding a project requires ONLY: (a) one object in `lib/data/projects.ts`, (b) images in one folder. Removing a project requires flipping one boolean.
4. `git status` shows ZERO modified legacy files (`.html`, `.scss`, `.css`, `/js/`, `/components/`).

---

## Guardrails

### File whitelist (only these may be created/modified)
- `app/**` (Next.js app dir)
- `components/react/**` or the scaffold's component dir — NOT the legacy `/components/*.html`
- `lib/**`
- `styles/globals.css` (Tailwind v4 entry)
- `scripts/parity/**` (new — the diff harness)
- `docs/parity-values.md` (new)
- `package.json` / lockfile (devDependencies only: playwright, pixelmatch, pngjs, serve)

### Do-not-touch list (read-only, always)
- All legacy `.html` files (root and `/components/`)
- `/scss/`, `/css/` (including `styles.css`, `styles-dist.css`)
- `/js/`, `include.js`, Prepros config
- `/images/` (read via the existing junction; never write)
- TypeKit kit `zps8jqb`, FA Pro kit `644e13edf7`, GTM `GTM-PC65Z8` — IDs must appear in the new layout exactly as-is

### Escalation criteria — STOP and ask Medley if:
- A legacy value conflicts with the confirmed design intent in this brief (e.g., legacy shows a 2-col work grid but brief says alternating rows → brief wins; flag anything else)
- Parity requires modifying a whitelisted file in a way that breaks another section's passing diff
- A dependency install fails or Playwright cannot launch
- Any change would touch a do-not-touch file
- A section cannot get below 5% diff after two focused attempts — report the diff image and move on rather than thrashing

### Pre-completion gate (run before declaring any phase done)
```bash
npm run lint && npx tsc --noEmit && npm run build
git status --porcelain | grep -vE '^(\?\?|.M) (app/|components/react|lib/|styles/|scripts/parity/|docs/|package)' && echo "LEGACY FILES TOUCHED — REVERT" || echo "clean"
```

---

## Phase 0 — Parity Harness (build the ruler first)

**Goal:** objective, repeatable pixel comparison between legacy and new, running locally.

1. Install dev deps: `playwright`, `pixelmatch`, `pngjs`, `serve`.
2. Serve legacy site: `npx serve . -p 4000` from repo root (the legacy `index.html` + client-side includes work as static files).
3. Run new site: `next dev` on port 3000.
4. Create `scripts/parity/capture.mjs`:
   - Breakpoints: **375, 768, 1280, 1920** (width × 1080 viewport, full-page scroll screenshots per section).
   - Sections keyed by selector on BOTH sites: `#hi`, `#work`, `#visual-design`, `#resume`, `#education`, plus the fixed nav (`#the-menu` legacy / NavMain new).
   - Wait for `networkidle` + 500ms settle (TypeKit FOUT); disable CSS animations via injected `* { transition: none !important; animation: none !important; }` before capture.
   - Output: `scripts/parity/shots/legacy/<section>-<bp>.png` and `.../new/<section>-<bp>.png`.
5. Create `scripts/parity/diff.mjs`: pixelmatch each pair, write diff PNGs + a `report.md` table (section × breakpoint × % diff). Threshold: pass < 2%.
6. Add npm scripts: `parity:capture`, `parity:diff`, `parity` (both).
7. Run once to establish the baseline report. Commit the harness (gitignore the shots dir).

**Gate:** baseline `report.md` exists showing current % diff per section. This is the scoreboard for the rest of the weekend.

---

## Phase 1 — Value Extraction

**Goal:** replace every "verify in DevTools" approximation with exact values from the legacy source. Grep `scss/styles.scss` (source of truth for intent) and cross-check `css/styles-dist.css` (compiled truth).

Write `docs/parity-values.md` containing at minimum the values below (already verified from the legacy source — extend by grepping for anything missing):

### Grid & typography foundation
- Bootstrap grid: **24 columns**, gutter **1.2rem** — replicate column fractions accordingly (e.g., `col-lg-12` = 50%).
- Font stack: `urw-form, 'Manrope', sans-serif` (body and headings). Headings weight 500, line-height 1.2.
- Heading scale: h1 `calc(1.375rem + 1.5vw)` → `2.5rem` @≥1200px; h2 `calc(1.325rem + .9vw)` → `2rem`; h3 `calc(1.3rem + .6vw)` → `1.75rem`; h4 `calc(1.275rem + .3vw)` → `1.5rem`; h5 `1.25rem`; h6 `1rem`.

### NavMain (legacy `#the-menu`)
- Fixed, z-index 950, white bg. **Mobile: bottom bar, full width.** md+: left 0, width **8rem**, vertically centered (`height: fit-content; margin: auto 0`), radius `0 1rem 1rem 0`, `border-right: 2px solid #fff`.
- Ultra-wide left offsets: ≥1600px `left: 4%`; ≥1800 `8%`; ≥1900 `10%`; ≥1999 `12%`; ≥2199 `14%`; ≥2299 `16%`; ≥2399 `18%`; ≥2499 `20%`.
- Buttons — mobile: width **25%** (20% @sm), padding `10px 0`, font-size **.8rem**, `border-bottom: 6px solid`, radius 0, no other border. md+: `display: block; width: 100%`, padding `20px 0`, font-size **1rem**, `border-left: 8px solid`; **hover: border-left-width 16px**; transitions `background-color .3s ease-in-out, border-left-width .1s ease-in-out`.
- Per-section border colors follow the token system (hi = prime, work = second, results = pop, etc.) with the tint/shade hover states — extract exact hex values from `styles-dist.css` compiled output rather than recomputing Sass tint/shade.
- Logo icon: **82px** wide, **98px** @md+.

### HeroSection (legacy `#hi`)
- Headline is **"Designing for Results" with inline metrics** — not a separate banner (confirmed design intent; the metric blocks with display-4 numbers + arrow icons live inside the hero row).
- `.h-jakeicon` font-size: `calc(2rem + 28vw)`; sm: `calc(2rem + 22vw)` + `margin-top: -8rem`; md: `+16vw`; lg: `+10vw`; xl: `+12vw`; xxl: `+10vw`.
- `.h-hello`: `calc(1rem + 3vw)`, its `small`: `calc(.7rem + 2vw)` (sm: `calc(.5rem + 2vw)`).
- `.h-believe`: `calc(.8rem + 2vw)`; sm: `calc(.4rem + 2vw)`; xxl: `calc(.1rem + 2vw)`.
- Background: layered radial gradients on white — `ellipse at center center` white→transparent, `at top center` second-light→transparent, `at top right` third-light→transparent, `at top left` pop-light→transparent.
- `.row-content`: height **90vh** (check md+ override in styles.scss).
- `hr` variants use gradient `border-image` (solid-left / solid-right / solid-center) — port exactly.

### Work section (CaseStudiesSection + WorkCard)
- **Full-width alternating editorial rows, not a 2-col grid** (confirmed intent). Extract row/column structure from `components/section-work-v2.html` and the `#work` styles; extract exact spacing, badge (`.badge-work`: inline-block, margin-right 1rem, margin-bottom 1rem, nowrap) and card shadows from compiled CSS.

### VisualDesignSection thumbnails (legacy `.thinking-thumb`)
- 100% width, height **180px**, radius **2rem**, margin `0 0 20px 0`, no border, white bg, `box-shadow: 0 0 1.5rem rgba(0,0,0,.10)`, transition `all .2s ease-in-out`.
- **Hover: `transform: scale(1.02)`, background → secondary token, color → white.**
- Image variants: `btn-reveal.png`, `btn-viva.png`, `btn-wrong.png` as `background-size: cover`.
- `.thinking-icon`: 48px. `.thinking-title` margin `15px 0 0`. `.btn-art` hover: `scale(1.06)`.

### CaseStudyModal
- Backdrop: `backdrop-filter: blur(10px) saturate(150%)`.
- Header close button: circle, **2.8rem × 2.8rem**.
- Footer: centered; close button width 100% mobile, **180px** @≥576px.
- **Slide-in direction:** match the legacy Bootstrap modal entrance (fade + translate from top). Fix the current Radix animation to match — extract the exact transform/duration from Bootstrap's `.modal.fade .modal-dialog` rules in `styles-dist.css`.

**Gate:** `docs/parity-values.md` committed; no remaining "approximate" or "verify" flags for the seven components.

---

## Phase 2 — Component Parity Passes

Work strictly in this order. After each component: run `npm run parity`, confirm the section's diff drops below threshold at all 4 breakpoints, commit with message `parity(<component>): <before%> → <after%>`.

1. **globals.css** — final audit against Phase 1 foundation values (grid gutter var, heading scale, hr border-image utilities, font tokens).
2. **NavMain** — button sizing, hover border growth, mobile bottom-bar layout, ultra-wide offsets.
3. **HeroSection** — headline restructure to "Designing for Results" + inline metrics, typography calcs, gradient background, 90vh row.
4. **CaseStudiesSection + WorkCard** — restructure to full-width alternating rows driven by `projects.ts`.
5. **CaseStudyModal** — slide-in fix, backdrop blur, close-button specs, per-project content render.
6. **VisualDesignSection** — thumbnail hover states, background-image variants.
7. **SectionHeader / Resume / Education** — remaining spacing + hr treatments.

---

## Phase 3 — Data-Driven Project System

1. Harden the `Project` interface in `lib/data/projects.ts`:
```ts
interface Project {
  id: string;                // stable slug, used by modal
  title: string;
  section: 'work' | 'visual-design';
  visible: boolean;          // false = removed from render, data retained
  order: number;
  summary: string;
  contributions: { icon: string; label: string }[];  // FA Pro icon names
  media: ProjectMedia[];     // typed blocks: heading | image | image-pair | text | list
  thumb?: { src: string; alt: string };
}
```
2. All 14 projects present, content ported from the legacy modal HTML files (`/components/modal-*.html`). Media arrays preserve the original section order (headings, hr, image rows).
3. Sections render by `projects.filter(p => p.visible && p.section === X).sort(by order)` — zero hardcoded project references in components.
4. **Acceptance test:** add a dummy 15th project object → it appears in the correct section with a working modal, no component edits. Flip `visible: false` → it disappears. Delete the dummy afterward.

---

## Phase 4 — Final Verification & Ship

1. Full `npm run parity` — every section, every breakpoint, report attached to final commit.
2. Pre-completion gate commands (see Guardrails) — must be clean.
3. Lighthouse on the static build: performance ≥ legacy site's score, accessibility ≥ 90.
4. `next build` static export succeeds; spot-check the export locally with `npx serve out`.
5. Deploy preview (Vercel or existing host path) and post the URL + final `report.md` for Medley's review.

---

## Operating Notes for Claude Code

- The legacy code in this repo IS the live site. Never fetch jacobmedley.com for values — grep the repo.
- `styles.scss` tells you intent; `styles-dist.css` tells you the computed truth (tint/shade colors are pre-baked there). When they disagree, dist wins.
- "Faithful-but-cleaned-up" standard: match visual intent and proportions; do NOT reproduce obvious legacy accidents (duplicate rules, dead commented code, stray `!important` wars). If unsure whether something is intent or accident, it goes in the escalation list — do not silently decide.
- Commit small and often. One component per commit minimum during Phase 2.
