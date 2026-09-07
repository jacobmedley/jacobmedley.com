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

## Review-only variants

`/design-variants/` contains three image-led Visual Design directions for Reveal and three illustrative icon directions for Team Workshops. The route is marked `noindex`; none of the six options has been applied to Selected Work.

## Verification

- Production build generated 12 static pages, including the review-only route.
- TypeScript, targeted lint, and whitespace checks pass.
- Existing full browser acceptance remains green at 320, 375, 576, 768, and 1440px, including all detail routes and modal keyboard behavior.
- Focused checks pass at 375, 1191, and 1440px on the home page and at 375 and 1191px on the variants page.
- No checked viewport has horizontal overflow, framework overlays, console errors, or page errors.

