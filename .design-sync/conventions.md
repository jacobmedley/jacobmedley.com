## Medley Design System — conventions

Tokens-only system: no components ship in this bundle. Build screens with
plain HTML/CSS/Tailwind utility classes using the vocabulary below — every
name here is real and verified against the compiled stylesheet.

### Color families

Six brand color families, each with a base + `-light` + `-dark` step:
`prime`, `second`, `third`, `fourth`, `fifth`, `pop`. Use them as standard
Tailwind utilities:

| Family | Base hex | Use as |
|---|---|---|
| `prime` | `#644672` | `bg-prime`, `text-prime`, `border-prime` (+ `-light`/`-dark`) |
| `second` | `#8391a3` | `bg-second`, `text-second`, `border-second` (+ `-light`/`-dark`) |
| `third` | `#5e915d` | `bg-third`, `text-third`, `border-third` (+ `-light`/`-dark`) |
| `fourth` | `#7e3232` | `bg-fourth`, `text-fourth`, `border-fourth` (+ `-light`/`-dark`) |
| `fifth` | `#454336` | `bg-fifth`, `text-fifth`, `border-fifth` (+ `-light`/`-dark`) |
| `pop` | `#e3b211` | `bg-pop`, `text-pop`, `border-pop` (+ `-light`/`-dark`) — the accent color, use sparingly |

`-light` and `-dark` are pre-mixed steps (not opacity), e.g. `bg-third-light`
for a soft section background, `text-third-dark` for higher-contrast text on
light. Plain black/white are `--color-black`/`--color-white`.

### Type

Two font stacks, both exposed as Tailwind utilities — `font-heading` for all
headings, `font-sans` for body copy:

- `--font-heading: urw-form, sans-serif;`
- `--font-sans: urw-form, "Manrope", sans-serif;`

`urw-form` is a licensed Adobe Fonts family loaded at runtime by the real
site (`<link href="https://use.typekit.net/zps8jqb.css">`) — it is **not**
shipped in this bundle and won't render here; expect the fallback. Manrope
**is** shipped (`fonts/`, weights 400/700, Latin subset) as a faithful
stand-in, so `font-sans` text still renders in a real, on-brand-adjacent
typeface rather than a bare system sans. Only two weights exist:
`font-weight-normal` (400) and `font-weight-bold` (700) — don't reach for
300/500/600/800.

### Shadows

Two shadow tokens, used via Tailwind's arbitrary-value syntax (they are not
part of Tailwind's default shadow scale):

- `shadow-[var(--shadow-bs)]` — small/default elevation (cards, buttons)
- `shadow-[var(--shadow-bs-lg)]` — larger elevation (modals, hero panels, raised cards)

### Where the truth lives

Read `styles.css` (imports `_ds_bundle.css`, the full compiled stylesheet) for
the authoritative token list — every `--color-*`, `--font-*`, `--shadow-*`,
`--breakpoint-*` custom property is defined there under `@layer theme`. This
file is the compiled output of the real site's Tailwind v4 build, not a
hand-summary, so it's exhaustive: use it to confirm a name before using it.

### Example

```html
<section class="bg-third-light">
  <h2 class="font-heading text-fifth-dark">Section heading</h2>
  <p class="font-sans">Body copy in the site's actual type stack.</p>
  <div class="bg-white shadow-[var(--shadow-bs-lg)] rounded-lg p-6">
    <span class="text-pop font-sans font-bold">Accent callout</span>
  </div>
</section>
```
