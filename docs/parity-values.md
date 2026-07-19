# Parity Values — extracted from legacy source

Source of truth: `scss/styles.scss` (intent) cross-checked against `css/styles-dist.css`
(compiled truth — all tint/shade colors below are the pre-baked dist values).
Structure references: `index.html`, `components/*.html`. All values are exact; nothing
here is approximate.

---

## Color tokens (compiled `:root` values)

| Token | base | light (tint 50%) | dark (shade 30%) |
|---|---|---|---|
| `prime` (english-violet) | `#644672` | `#b2a3b9` | `#463150` |
| `second` (faded-glory) | `#8391a3` | `#c1c8d1` | `#5c6672` |
| `pop` (monarch) | `#e3b211` | `#f1d988` | `#9f7d0c` |
| `third` (irish-stone) | `#5E915D` | `#afc8ae` | `#426641` |
| `fourth` (red-falling) | `#7e3232` | `#bf9999` | `#582323` |
| `fifth` (charcoal) | `#454336` | `#a2a19b` | `#302f26` |

Other roots: `--bs-body-color: #212529`, `--bs-body-bg: #fff`, `--bs-heading-color: inherit`,
`--bs-border-radius: .375rem`, `-sm: .25rem`, `-lg: .5rem`, `-xl: 1rem`, `-xxl: 2rem`,
`-pill: 50rem`; `--bs-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)`,
`-sm: 0 .125rem .25rem rgba(0,0,0,.075)`, `-lg: 0 1rem 3rem rgba(0,0,0,.175)`;
`--bs-gradient: linear-gradient(180deg, rgba(255,255,255,.15), rgba(255,255,255,0))`
(`.bg-gradient` = that image over the bg color).

## Grid & typography foundation

- Bootstrap grid: **24 columns**, gutter `--bs-gutter-x: 1.2rem` (±0.6rem half-gutters),
  `$grid-row-columns: 12`. Column fractions: `col-lg-12` = 50%, `col-xl-16` = 66.667%,
  `col-xxl-14` = 58.333%, `col-sm-8` = 33.333%, `col-xxl-6` = 25%, `col-lg-18` = 75%.
- Body font: `--bs-font-sans-serif: urw-form, "Manrope", sans-serif`, size `1rem`,
  weight 400, line-height 1.5 (Bootstrap default).
- Headings: family `urw-form, sans-serif` (no Manrope), **weight 500, line-height 1.2**,
  margin `0 0 .5rem`.
- Heading scale (fluid → ≥1200px): h1 `calc(1.375rem + 1.5vw)` → `2.5rem`;
  h2 `calc(1.325rem + .9vw)` → `2rem`; h3 `calc(1.3rem + .6vw)` → `1.75rem`;
  h4 `calc(1.275rem + .3vw)` → `1.5rem`; h5 `1.25rem`; h6 `1rem`.
- **Custom display scale** (weight 300, lh 1.2; fluid → ≥1200px):
  `display-1` → `1.5rem`, `display-2` → `2rem`, `display-3` → `3rem`, `display-4` → `4rem`,
  … `display-N` → `N rem` up to 20 (e.g. `display-12` `calc(2.325rem + 12.9vw)` → `12rem`).
  Legacy uses `display-1` as large body text, `display-4` for section headings,
  `display-12` for the hero glyph.
- Section content offset: `section .content { padding-left: 0; z-index: 10 }`,
  **md+: `padding-left: 9rem`** (menu width 8rem + 1rem clearance).
- `hr` gradient variants (`border-image: <gradient> 1`):
  `.solid-left` `to right, #000 → transparent`; `.solid-right` `to left, #000 → transparent`;
  `.solid-center` `to left, transparent → #000 → transparent`; `.light` versions use `#fff`.
  Per-section recolors: `#work` uses `$second` (#8391a3); `#resume` text/hr color
  shade($third, 68%) = compiled `#1e2e1e`; education section uses `.light` (white)
  variants on dark bg.

## NavMain (legacy `#the-menu`)

- `position: fixed; z-index: 950; background: #fff; text-align: center`, classes
  `d-flex align-content-center flex-wrap shadow-lg`.
- **Mobile (<768px): bottom bar** — `bottom: 0; width: 100%; height: auto`.
- md+ (≥768px): `top: 0; left: 0; width: 8rem; height: fit-content;
  margin-top: auto; margin-bottom: auto` (vertically centered), radius `0 1rem 1rem 0`,
  `border-right: 2px solid #fff`, `overflow: hidden`.
- Ultra-wide `left`: ≥1600px `4%`; ≥1800 `8%`; ≥1900 `10%`; ≥1999 `12%`; ≥2199 `14%`;
  ≥2299 `16%`; ≥2399 `18%`; ≥2499 `20%`.
- Icons: `1.5rem`, md+ `2rem`. Logo `.logo-icon`: 82px wide, 98px @md+ (nav uses icon
  font `fak fa-jm-icon-cropped`, not the img logo).
- Buttons (base, mobile): `width: 25%` (sm: `20%`), `padding: 10px 0`, `margin: 0`,
  `font-size: .8rem`, `border: none` + `border-bottom: 6px solid`, `border-radius: 0`,
  bg `#fff`, color `#000`,
  `transition: background-color .3s ease-in-out, border-left-width .1s ease-in-out`.
- Buttons md+: `display: block; width: 100%; padding: 20px 0; font-size: 1rem`,
  `border: none` + `border-left: 8px solid`; `:hover` and `.active:hover`:
  `border-left-width: 16px`.
- Home ("Hello") button is `d-none d-sm-block` — hidden on the xs bottom bar (4 visible
  buttons at 25%); at sm (≥576) 5 buttons at 20%.
- Per-button compiled colors (border / text, then hover, then active):

| Button | rest border / color | hover border / bg / color | active border / color / bg |
|---|---|---|---|
| `.hi` | `#b2a3b9` / `#463150` | `#644672` / `#ece9ee` / `#0c080e` | `#463150` / `#e0dae3` / `#644672` |
| `.work` | `#c1c8d1` / `#5c6672` | `#8391a3` / `#f0f2f4` / `#101114` | `#49515b` / `white` / `#66717f` |
| `.results` (→ #visual-design) | `#f1d988` / `#7f640a` | `#e3b211` / `#fcf6e2` / `#1b1502` | `#9f7d0c` / `white` / `#e3b211` |
| `.resume` | `#afc8ae` / `#426641` | `#5E915D` / `white` / `#0b110b` | `#426641` / `white` / `#5e915d` |
| `.education` | `#bf9999` / `#582323` | `#7e3232` / `#f0e6e6` / `#0f0606` | `#582323` / `#e5d6d6` / `#7e3232` |

## HeroSection (`#hi`)

- **Structure (confirmed design intent — differs from live legacy):** headline is
  "Designing for Results" with the four inline metric blocks inside the hero row.
  Live legacy has "Hello, I'm Jacob Medley." in `#hi` and the metrics in a separate
  unnamed `.bg-prime-light` banner (`index.html` 116–170). Brief wins.
  ⚠ Consequence for the harness: the legacy `#hi` element capture excludes the metrics
  banner, so the hero diff measures the shared parts (glyph, typography, gradient,
  waves), not the restructure itself.
- Metric blocks (from the legacy banner, to be reused inline): `row row-cols-2
  row-cols-lg-4 g-3 text-center justify-content-center`; each value
  `h4.display-4 fw-bolder mb-0` with `small > i.display-2 fa-long-arrow-up|-down`;
  label `p.result-label mt-0` (`.result`, `.result-label`, `.light` have **no CSS
  rules** — inert semantic classes). Values: 47%↑ New Sales, 20%↑ Revenue,
  27%↑ Lead Gen, 66%↓ Reduction Project Timelines.
- Hero glyph `.h-jakeicon` (`p.display-12 fw-bold text-prime mb-0`, icon
  `fak fa-jm-icon-full`): font-size `calc(2rem + 28vw)`; sm: `calc(2rem + 22vw)` +
  `margin-top: -8rem`; md: `calc(2rem + 16vw)`; lg: `+10vw`; xl: `+12vw`; xxl: `+10vw`.
- `.h-hello`: `calc(1rem + 3vw)`; its `small`: `calc(.7rem + 2vw)` (sm+:
  `calc(.5rem + 2vw)`). Gradient text: `background: linear-gradient($prime-dark →
  $prime-light)` i.e. `#463150` → `#b2a3b9`, `background-clip: text`,
  `text-fill-color: transparent` (also `.text-gradiant-primary`).
- `.h-believe`: `calc(.8rem + 2vw)`; sm: `calc(.4rem + 2vw)`; xxl: `calc(.1rem + 2vw)`.
- Section background: `background-color: #fff` +
  `radial-gradient(ellipse at center center, #fff, transparent),
   radial-gradient(ellipse at top center, #c1c8d1, transparent),
   radial-gradient(ellipse at top right, #afc8ae, transparent),
   radial-gradient(ellipse at top left, #f1d988, transparent)`.
- `.row-content` height: **90vh mobile, 100vh @md+** (`#hi.row-content, #hi .row-content`).
- Layout: `.content > .container > .row.text-center.justify-content-center.row-content >
  .col-24.col-lg-14.align-self-center`; h1 `display-4 fw-bold text-prime mt-0`;
  h2 `display-2 text-prime`; divider `div.py-3.w-25.mx-auto > hr.solid-center`; intro
  `p.display-1`; CTA `a.btn.btn-outline-prime-dark.btn-lg.rounded-pill.mt-4.mb-4` with
  `far fa-angle-down`.
- Bottom waves: `.waves-wrapper` relative z-5, `bottom: 10vh` (md+: `22vh`); `.waves`
  height `10vh` (md+: `22vh`); fills: wave-one `#b2a3b9`, wave-two `rgba(131,145,163,.25)`,
  wave-three `rgba(94,145,93,.25)`, wave-four `rgba(227,178,17,.25)`; animation
  `move-forever` translate3d(-90px→85px) durations 7/10/13/20s delays -2/-3/-4/-5s.

## Work section (CaseStudiesSection + WorkCard)

- **Full-width alternating editorial rows** (confirmed intent, matches
  `section-work-v2.html`). Each project: `div.work-item.py-2.py-lg-4.py-xxl-5 >
  row.align-items-start.align-items-xxl-center` (+ `flex-row-reverse` on alternating
  items: dp, hydra; webmd, bee, opf-red normal).
- Image col `col-24 col-lg-12 mb-5 mb-lg-0`: image is a `button.btn.p-0.m-0` wrapping
  `img.img-fluid.rounded-4.shadow-lg.btn-art` (radius 1rem, shadow
  `0 1rem 3rem rgba(0,0,0,.175)`).
- `.btn-art`: `transition: transform .2s ease-in-out`; hover `transform: scale(1.06)`.
- Text col `col-24 col-lg-12`: `h4.h2` title, `p.h5` subtitle, `hr.solid-center`,
  `p.h4` "Summary:", summary `p`, CTA row `text-center text-md-start`.
- CTA: `button.btn.btn-lg.btn-second-dark.rounded-pill` (bg `#5c6672`, hover `#4e5761`,
  active `#4a525b`, white text; btn-lg: padding `.5rem 1rem`, font `1.25rem`) containing
  `img[src=images/the-eye-third-reverse.gif]` width 36px `mix-blend-screen mt-n2`
  + "Case Study".
- Section header: `p.display-4 > i.fa-light.fa-briefcase` +
  `h3.display-4.fw-bold.mt-n4.mb-0` "Case Studies"; hr row `col-24 col-xl-16
  col-xxl-14 py-5 > hr.solid-center`. Section wrapper `.my-work` (no custom CSS) with
  top waves; `#work` hr gradients use `#8391a3`.
- `.badge-work`: `display: inline-block; margin-right: 1rem; margin-bottom: 1rem;
  white-space: nowrap` (used in modals).
- `.work-item` has **no custom CSS** — spacing entirely from `py-*` utilities.
- Bottom of #work: "Full-Stack Designer" interstitial (`p.display-4 fa-toolbox` icon,
  `p.display-3` heading, `p.display-1` copy in `col-24 col-lg-16`) + two
  `.thinking-row`s of 3 icon thumbnails (`col-24 col-sm-8 col-xxl-6.thinking-item`,
  `button.btn.btn-outline-second-light.thinking-thumb` with `i.thinking-icon`,
  `h6.thinking-title`, `.thinking-view`) — icon variant, white bg (one has `border-5`
  on split-test). Modals: `#split01, #cce, #ma, #wb, #wb2, #personas`.

## VisualDesignSection (`.thinking-thumb` image variant)

- Section: `.show-me-the-money.bg-pop-light.bg-gradient` (bg `#f1d988` + gradient
  overlay) with top waves (fills all white: wave-one 100%, others 25%).
- Grid: `row.row-cols-1.row-cols-sm-2.row-cols-md-3.align-items-center.mt-0.mt-sm-3.
  justify-content-center.thinking-row`, items `div.col.thinking-item`.
- `.thinking-thumb`: 100% width, height **180px**, radius **2rem**, margin `0 0 20px 0`,
  border none, bg `#fff`, color shade($second,50%) = `#424952` (dist), `box-shadow:
  0 0 1.5rem rgba(0,0,0,.10)`, `transition: all .2s ease-in-out`.
- **Hover: `transform: scale(1.02)`, background → `$secondary` (Bootstrap secondary
  `#6c757d`), color → `#fff`.** (Compiled `.thinking-thumb:hover` uses the Bootstrap
  `$secondary` var, not the site's `second` token — faithful port keeps the dist value.)
- Image variants (bg `url(/images/work/kitchen-sink/btn-<reveal|viva|wrong>.png)`,
  `background-size: cover`), buttons additionally `text-white position-relative
  overflow-hidden shadow-lg`, title `h6.thinking-title.fw-bold.fs-1.z-2`, view row
  `.thinking-view.z-2`, plus dark overlay `div.screen.position-absolute.top-0.start-0.
  h-100.w-100.bg-black.opacity-50.z-1`.
- `.thinking-icon`: 48px. `.thinking-title`: margin `15px 0 0`. `.thinking-view`:
  `margin-top: 12px; margin-bottom: 0`.
- Modals: `#reveal`, `#viva`, `#wrong`.

## CaseStudyModal

- Legacy structure: `.modal.fade > .modal-dialog.modal-fullscreen.py-md-4 >
  .modal-content.container.rounded-3` — fullscreen dialog, content constrained to
  container width, custom `.modal-content { max-height: 100%; overflow: hidden }`.
- Backdrop: `.modal-backdrop` black at opacity .5, plus **`backdrop-filter: blur(10px)
  saturate(150%)` on `.modal` itself** (not the backdrop element).
- **Entrance (Bootstrap compiled):** `.modal.fade .modal-dialog { transition: transform
  .3s ease-out; transform: translate(0, -50px) }`; `.modal.show .modal-dialog
  { transform: none }`; container fade: `.modal.fade { opacity/transition via .fade }`
  (`.fade { transition: opacity .15s linear }`). Under
  `prefers-reduced-motion: reduce`: `transition: none`. → Radix animation must be:
  fade in .15s linear + dialog translateY(-50px→0) .3s ease-out.
- Header: `justify-content-between`, title `h2.modal-title.fs-5` with 58×58 brand SVG;
  close `button.btn.btn-prime.rounded-pill.btn-close-modal` — **`border-radius: 500rem;
  height: 2.8rem; width: 2.8rem`** with `fa-xmark-large`.
- Footer: `justify-content: center`; `.btn-close-modal` width **100%**, ≥576px **180px**.
- Body content pattern per project: intro row (`col-24 col-lg-12 col-xl-10` circular
  image `img-fluid shadow-lg border border-light rounded-circle` + `col-24 col-lg-12
  col-xl-14` "Project Brief:"), "Contributions:"/"Technology:" h4 + `.badge-work` spans
  (icon `text-second` + label), then repeated media rows: `h5` heading +
  `hr.solid-center`, desktop img `col-24 col-lg-18` with `fa-desktop fa-2x` marker,
  mobile img `col-24 col-lg-6` with `fa-mobile fa-2x`, images `img-fluid shadow-lg`.

## SectionHeader / Resume / Education

- Shared header pattern: `p.display-4 > i.fa-light.<icon>` + `h3.display-4.fw-bold.mt-n4`
  + hr row `col-24 col-xl-16 col-xxl-14 py-5 > hr.solid-center`.
- Resume: section `bg-third-light bg-gradient` (`#afc8ae` + gradient), top waves
  (wave-one `#f1d988`, others `rgba(third[-dark], .12)`); text color shade($third,68%);
  `.pro-wrap` has **no CSS** (wrapper only); lists `ul.fa-ul > li.mb-3` with
  `span.fa-li > i.fa-angle-right`, two `col-md-12` columns; pull-quote block:
  `hr.solid-center.w-25.mx-auto` + `h2.py-3` + hr again.
- Education: section `bg-fourth-dark bg-gradient text-white`; hrs use `.light`;
  header text `text-fourth-light`; cards `div.card.h-100.rounded-5.shadow-lg`
  (radius 2rem) in `row.row-cols-1.row-cols-md-2.row-cols-lg-3.row-cols-xl-4.g-4.
  text-center`, `card-body.text-fourth-dark`, `card-footer.bg-transparent.border-0`,
  `stretched-link`, icons `fa-2x mt-3`; CTA `btn.btn-lg.btn-fourth-light.rounded-pill.
  shadow-lg`.

## Third-party IDs (verbatim, do not alter)

- TypeKit kit: `zps8jqb` · Font Awesome Pro kit: `644e13edf7` · GTM: `GTM-PC65Z8`.
