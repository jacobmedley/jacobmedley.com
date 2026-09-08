# Browser annotation checkpoint

Status: implemented and verified locally on 2026-09-07. No deployment or push performed.

## Applied globally

- Restored the home hero brand icon's original placement-specific responsive scale; section-heading icon sizing remains independent.
- Kept the desktop hero greeting to one line and reduced its weight from 700 to 600.
- Replaced the hero case-study text button with a circular down-arrow control and a reduced-motion-safe bob animation.
- Increased the space between shared section-header icons and titles.
- Removed half-width rules from inside case-study records and placed full-width rules between records.
- Replaced the `Summary:` label position with each case study's existing discipline badges.
- Reduced every card-style read action to `Read` with the thin right arrow, including the standalone case-study collection.
- Set the main case-study `Read` control to `10px 26px` padding at every breakpoint, preserving the existing shared button shape and type treatment.
- Removed the main-site link into the standalone case-study route; the case-study area remains a walled, directly addressable experience.
- Reduced the hero case-study control to the 48px circular arrow glyph itself, eliminating the duplicate outer circle.

## Approved selected-work card system

Jacob selected the image-led Type-led frame and the icon-led Facilitator orbit. The two treatments now share one card layout across Selected Work: badges at the top right, a centered fading rule, a bottom-aligned eyebrow/title row, and a right-aligned arrow.

- Photo cards use full-color project imagery, dark translucent Title Case badges, a translucent gradient caption panel, and a slow media-only hover scale with a quick animated return.
- Icon cards use centered project icons, project-specific geometric fields, outlined Title Case badges, and the warm gradient treatment.
- The Reveal card uses the approved `The Choice Is Clear` title.
- `/design-variants/` is now a noindex review page containing only the approved photo and icon pair.
- Discipline badges and case-study filters omit the redundant word `Design`: Product, Systems, UX Research, Leadership, Visual, Brand, and Conversion Optimization.

The subsequent refinements clip all card children to the shared 32px radius; set `The Choice Is Clear` and every card eyebrow in Title Case; use the same translucent gradient, blur, and media-only hover motion for both card types; and standardize every main and case-study badge label at `.68rem`, weight 300, line-height 1, `.02em` tracking, 25px minimum height, and `4px 9px` padding without changing colors.

All six icon cards now share a circular icon anchor centered above the caption. Their geometry is project-specific: A/B Testing uses a 140px translucent blurred anchor over rotating, expanding, fading fractal triangles; the remaining cards use mixed availability dots, converging personalization lines, seven progressively wider and fainter facilitation rings, intersecting roadmap paths, and a central persona system with satellite circles. Team Workshops uses the hosted kit's thin classic lightbulb. The photo-card labels now read `The Choice Is Clear`, `Viva Medicare`, and `Modular Experience for Growth`.

The 140px translucent, blurred anchor is now the global icon-card rule. On fine-pointer desktop devices, hover and keyboard focus produce a faster internal dolly zoom while the geometry layers move at different depths and blur levels; touch devices run the same focal effect as a slower continuous loop. Reduced-motion preferences disable these animations. Data-Driven Personalization now uses all twelve geometry slots as converging warp-speed action lines, and Personas repeats six additional progressively wider and fainter circles to fill the visual field.

The Font Awesome kit now loads after React becomes interactive. This prevents the kit from rewriting icon accessibility attributes before hydration and eliminates the development hydration mismatch without changing the icon set.

## Responsive collection layout and motion controls

- The main section heading is restored to `Full Stack Designer`; its stable `#full-stack` anchor is unchanged.
- Icon cards use one column below 576px, two columns from 576px through 1199px, and three columns from 1200px upward.
- The photo-card group is ordered Wrong, Reveal, Viva. Below 576px all three stack. From 576px through 1199px Wrong spans the full row and Reveal/Viva share the next row. From 1200px upward all three share one row.
- The case-study index action retains its label and now uses a thin down chevron.
- Shared icon-card animation controls are collected in the `.thinking-thumb-icon` custom-property block in `app/globals.css`. Anchor and icon size, transition timing, desktop hover scale/opacity, and mobile loop scale/durations can be adjusted there without editing the individual card geometry.

## Verification

- Production build generated 12 static pages, including the approved-pair review route.
- TypeScript, targeted lint, and whitespace checks pass.
- Existing full browser acceptance remains green at 320, 375, 576, 768, and 1440px, including all detail routes and modal keyboard behavior.
- Focused checks pass at 375, 1191, and 1440px on the home page and at 375 and 1191px on the review page, including the one-photo/one-icon structure, unified Title Case badge metrics, `Read` actions, six icon anchors, twelve geometry slots per icon card, title labels, and zero main-site links to `/case-studies/`.
- A final narrow-viewport visual inspection confirms the A/B card's triangle field, blurred 140px anchor, badge placement, and caption remain legible and intentionally aligned.
- The refreshed production build passes, and live browser verification confirms the prior Font Awesome hydration error is absent on a fresh page load.
- Responsive acceptance confirms `10px 26px` read-action padding, six `140x140` anchors, twelve Personalization lines, twelve visible Personas geometry layers, and the intended slow anchor/field animations under a coarse touch pointer.
- Focused responsive acceptance passes at 375, 768, 974, 1191, 1200, and 1440px. It verifies the icon-card column changes, the Wrong/Reveal/Viva order and span behavior, the restored section heading, and the case-study down chevron.
- No checked viewport has horizontal overflow, framework overlays, console errors, or page errors.
