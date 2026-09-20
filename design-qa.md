# Design QA: card-edge and action refinement

**Source visual truth paths**

- `C:\Users\jacob\AppData\Local\Temp\codex-clipboard-60636f9a-7837-4db4-89dd-a68b44e255e1.png`
- `C:\Users\jacob\AppData\Local\Temp\codex-clipboard-afbf9c59-3fbb-4125-8cc1-cee2722b9378.png`
- `C:\Users\jacob\AppData\Local\Temp\codex-clipboard-faf11192-6af5-4b2c-9d71-c8d2b87c3550.png`
- `C:\Users\jacob\AppData\Local\Temp\codex-clipboard-1ce61cfa-ab57-4dce-b27d-1e7ec6c0b700.png`

**Implementation evidence**

- `C:\Users\jacob\AppData\Local\Temp\jm-refined-featured-viewport.png`
- `C:\Users\jacob\AppData\Local\Temp\jm-refined-how-desktop.png`
- `C:\Users\jacob\AppData\Local\Temp\jm-refined-how-mobile.png`
- `C:\Users\jacob\AppData\Local\Temp\jm-refined-enlarged-text.png`
- Combined source/implementation review: `C:\Users\jacob\AppData\Local\Temp\jm-featured-comparison.png`

Viewport/state: homepage at 1484 × 1272, 820 × 1180, and 390 × 844 CSS pixels,
device scale factor 1, reduced-motion preference active. Source images are
900 × 516, 563 × 474, 94 × 123, and 99 × 121 pixel focused crops rather than
full matching viewports. The comparison therefore normalizes by matching the
same card regions and interaction state, not by stretching the source crops.

## Findings

No actionable P0, P1, or P2 mismatch remains in the requested surfaces.

- Fonts and typography: existing Manrope/URW treatment, weights, wrapping, and
  hierarchy are preserved. Long How I work titles wrap without clipping.
- Spacing and layout rhythm: all nine How I work panels measure 136px at the
  standard desktop and mobile states and share row/card bottoms. In the
  enlarged-text check, the longest panel grows to 142.3px while the 360px card
  remains unclipped and bottom aligned.
- Colors and visual tokens: Quiet Prism theme gradients, broad translucent waves,
  per-project inks, and glass opacity remain unchanged. Only border compositing
  changed from masked overlay edges to single inset raster edges.
- Image quality and asset fidelity: supplied project imagery, crop positions,
  animated artwork, and wave art are unchanged. Focused comparison confirms the
  exposed and doubled lower-corner artifacts are gone.
- Copy and content: B68 limits card actions to `View` or `Read` plus the existing
  arrow. Specific accessible card names remain intact.
- Icons: the featured case-study marker now shares the badges' header row and
  uses the existing Font Awesome kit. The kit was unavailable in the offline
  static browser session, as were the page's other Font Awesome icons; layout and
  semantic behavior were still verified.

## Comparison history

Initial evidence showed independently antialiased outer clipping, a rounded
glass-panel corner, and masked one-pixel borders meeting at the same pixels. It
also showed unequal lower-panel heights and a long featured-card action.

Fixes applied: removed masked border compositing, made the outer card the sole
rounded clip, removed the inner panel's duplicate bottom radius, used one inset
edge, set a shared panel minimum, replaced the dependency-sensitive How I work
arrow with the existing SVG arrow, shortened B68 actions, and moved the new
case-study icon into the badge row.

Post-fix browser evidence shows smooth single edges, zero horizontal overflow,
all nine card bottoms aligned, visible 24px arrows at desktop/mobile/enlarged
states, and preserved responsive wrapping. The WebMD modal opened, closed, and
returned focus to `Open WebMD case study`. Browser console warnings/errors: zero.

## Implementation checklist

- [x] Single-edge card compositing
- [x] View/Read actions and accessible context
- [x] Case-study icon aligned with discipline badges
- [x] Equal lower panels with responsive, unclipped wrapping
- [x] Desktop, tablet, mobile, enlarged-text, interaction, reduced-motion, and console checks

## Follow-up polish

No P3 visual follow-up is required for this scope. A connected Font Awesome kit
session may be used to visually confirm the exact book glyph, but its reserved
space, alignment, and source class are present.

final result: passed
