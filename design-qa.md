# Design QA: Quiet Prism design-system reference

## Source visual truth

The source is the rendered JacobMedley.com baseline at
`4c2e482c3a706090773e88dd59e8f01595fe7632`, specifically the existing homepage,
dedicated case-study pages, and modal patterns implemented by `globals.css`,
`visual-system.css`, `site-integration.css`, `QuietPrism.module.css`, and the
case-study styles. This task names and documents those patterns. It does not
introduce a separate visual direction.

There is no separate source bitmap to stretch or normalize: the baseline source
is the live component set being cataloged. The in-app browser reported CSS
viewports of 1800 x 1250 for desktop, 820 x 1180 for tablet, and 390 x 843 for
phone. Captured PNG dimensions are 2226 x 12091, 1001 x 12381, and 464 x 17075
pixels respectively. Visual comparison used like-for-like rendered regions at
each CSS viewport rather than treating the full-page capture pixels as CSS size.

## Implementation evidence

- `docs/reviews/quiet-prism-design-system-desktop.png`
- `docs/reviews/quiet-prism-design-system-tablet.png`
- `docs/reviews/quiet-prism-design-system-phone.png`
- Route: `/design-system/`
- State: default, pinned hover, focus, active, reduced-motion preview, native
  Role Ledger open/closed, and emulated operating-system reduced motion

## Findings

No actionable P0, P1, or P2 mismatch remains.

- The reference uses the existing Quiet Prism palette, fields, layered waves,
  glass, inset edges, badges, arrows, cards, and reading surfaces.
- Eight card families and six modal-relevant patterns have distinctive citation
  names and direct component or selector mappings.
- Hover, focus, active, responsive, paused/offscreen, forced-color, and reduced-
  motion contracts are documented. Disabled is marked undefined because no
  production Quiet Prism disabled selector or token exists.
- Desktop, tablet, and phone captures have zero page-level horizontal overflow.
  At phone width, every visible link and button measures at least 44 CSS pixels
  in both dimensions where the control is bounded.
- The state switcher updates `aria-pressed`; Role Ledger opens and reports its
  expanded state; keyboard focus has a visible 3px tone-aware outline.
- Operating-system reduced motion resolves the route to zero computed animated
  elements. Browser warnings and errors are zero.
- The route is excluded from indexing and is not linked from production
  navigation. Existing homepage and modal behavior remain unchanged.

## Comparison history

The first phone acceptance pass found that standalone Corner Current specimens
were outside the production `data-atmosphere` wrapper and continued to animate
under reduced motion. It also found three documentation controls below the
44-pixel target size. The route-level reduced-motion rule now removes all
decorative animation and transition, and the back link, close specimen, and
footer link now expose 44-pixel targets. The final browser pass reports zero
animated elements under reduced motion and zero undersized visible controls.

## Residual test limits

Physical touch, Safari, Firefox, screen-reader speech, and native browser zoom at
200 percent were not tested. Font Awesome depends on its external kit; layout
reserves icon space when the kit is unavailable.

final result: passed
