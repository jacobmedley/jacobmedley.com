# Browser annotation checkpoint

Status: implemented and verified locally on 2026-09-07. No deployment or push performed.

## Applied globally

- Restored the home hero brand icon's original placement-specific responsive scale; section-heading icon sizing remains independent.
- Kept the desktop hero greeting to one line and reduced its weight from 700 to 600.
- Replaced the hero case-study text button with a circular down-arrow control and a reduced-motion-safe bob animation.
- Increased the space between shared section-header icons and titles.
- Removed half-width rules from inside case-study records and placed full-width rules between records.
- Replaced the `Summary:` label position with each case study's existing discipline badges.
- Set all `Read case study` button labels to weight 300.

## Approved selected-work card system

Jacob selected the image-led Type-led frame and the icon-led Facilitator orbit. The two treatments now share one card layout across Selected Work: badges at the top right, a centered fading rule, a bottom-aligned eyebrow/title row, and a right-aligned arrow.

- Photo cards use full-color project imagery, dark translucent lowercase badges, a translucent gradient caption panel, and a slow image-only hover scale with a quick animated return.
- Icon cards use centered project icons, project-specific geometric fields, outlined lowercase badges, and the warm gradient treatment.
- The Reveal card uses the approved `The choice is clear` title.
- `/design-variants/` is now a noindex review page containing only the approved photo and icon pair.
- Discipline badges and case-study filters omit the redundant word `Design`: Product, Systems, UX Research, Leadership, Visual, Brand, and Conversion Optimization.

## Verification

- Production build generated 12 static pages, including the approved-pair review route.
- TypeScript, targeted lint, and whitespace checks pass.
- Existing full browser acceptance remains green at 320, 375, 576, 768, and 1440px, including all detail routes and modal keyboard behavior.
- Focused checks pass at 375, 1191, and 1440px on the home page and at 375 and 1191px on the review page, including the one-photo/one-icon structure and lowercase badges.
- No checked viewport has horizontal overflow, framework overlays, console errors, or page errors.
