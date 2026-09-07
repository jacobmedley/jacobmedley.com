# Browser annotation checkpoint

Status: implemented and verified locally on 2026-09-07. No deployment or push performed.

## Applied globally

- Restored the home hero brand icon's original placement-specific responsive scale; section-heading icon sizing remains independent.
- Kept the desktop hero greeting to one line and reduced its weight from 700 to 600.
- Replaced the hero case-study text button with a circular down-arrow control and a reduced-motion-safe bob animation.
- Increased the space between shared section-header icons and titles.
- Removed half-width rules from inside case-study records and placed full-width rules between records.
- Replaced the `Summary:` label position with each case study's existing discipline badges.
- Set all `Read Case Study` button labels to Title Case, weight 300, with the thin right arrow.
- Removed the main-site link into the standalone case-study route; the case-study area remains a walled, directly addressable experience.
- Reduced the hero case-study control to the 48px circular arrow glyph itself, eliminating the duplicate outer circle.

## Approved selected-work card system

Jacob selected the image-led Type-led frame and the icon-led Facilitator orbit. The two treatments now share one card layout across Selected Work: badges at the top right, a centered fading rule, a bottom-aligned eyebrow/title row, and a right-aligned arrow.

- Photo cards use full-color project imagery, dark translucent lowercase badges, a translucent gradient caption panel, and a slow media-only hover scale with a quick animated return.
- Icon cards use centered project icons, project-specific geometric fields, outlined lowercase badges, and the warm gradient treatment.
- The Reveal card uses the approved `The Choice Is Clear` title.
- `/design-variants/` is now a noindex review page containing only the approved photo and icon pair.
- Discipline badges and case-study filters omit the redundant word `Design`: Product, Systems, UX Research, Leadership, Visual, Brand, and Conversion Optimization.

The subsequent refinements clip all card children to the shared 32px radius; set `The Choice Is Clear` and every card eyebrow in Title Case; use the same translucent gradient, blur, and media-only hover motion for both card types; and standardize every main and case-study badge label at `.68rem`, weight 300, line-height 1, `.02em` tracking, 25px minimum height, and `4px 9px` padding without changing colors.

All six icon cards now share an opaque circular icon anchor centered above the caption. Their geometry is project-specific: nested square/triangle testing layers, mixed availability dots, converging personalization lines, seven progressively wider and fainter facilitation rings, intersecting roadmap paths, and a central persona system with satellite circles. Team Workshops uses the hosted kit's thin classic lightbulb. The photo-card labels now read `The Choice Is Clear`, `Viva Medicare`, and `Modular Experience for Growth`.

## Verification

- Production build generated 12 static pages, including the approved-pair review route.
- TypeScript, targeted lint, and whitespace checks pass.
- Existing full browser acceptance remains green at 320, 375, 576, 768, and 1440px, including all detail routes and modal keyboard behavior.
- Focused checks pass at 375, 1191, and 1440px on the home page and at 375 and 1191px on the review page, including the one-photo/one-icon structure, unified badge metrics, six icon anchors, twelve geometry slots per icon card, title labels, and zero main-site links to `/case-studies/`.
- No checked viewport has horizontal overflow, framework overlays, console errors, or page errors.
