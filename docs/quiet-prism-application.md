# Applying Quiet Prism

Use this contract for new case-study content and changes to existing modals.
The primary rendered reference is **Product Framework and Design System**
(`dentalplans`), with Hydra as a second example of the same modal family.
The source and rendered examples are authoritative; a mood description is not a
substitute for either. The live catalog is `/design-system/`.

## Start with the reader's task

Name what a reader should understand and what they can do. Inventory every element:
shell, hero, section heading, prose, evidence, caption, navigation, action, state,
input, feedback and closing. Give each element a reference pattern or explain why
it needs an extension. Record this mapping before styling.

## Reuse, then extend

| Need | Existing source contract | Application rule |
|---|---|---|
| Modal shell | `CaseStudyModal.tsx`, `.modal-full-bleed` | Keep the common header, close controls, scroll owner and mobile sheet. |
| Branded hero | `FeaturedArtwork`, `.modal-featured-hero`, `.modal-intro-copy` | Project art may differ. Medallion, frosted copy pane and contribution badges keep their roles. |
| Reading/evidence surface | `.modal-prism-surface`, `PrismStudySurface` | Use the shared radius, border, gradient and padding. Do not repaint an entire group around peer surfaces. |
| Tone | `data-prism-tone`, `--card-ink/tint/line` | Plum for the study, gold for a finding that requires care, slate for review, sage for observed use. Color supports labels; it never replaces them. |
| Section heading | `.modal-section-heading`, `PrismStudyHeading` | Thin icon, ordinary-weight heading, then `solid-center` fading rule. |
| Prose and visual | `SplitRow` / AI responsive split | Pair short explanations with their evidence. Stack in reading order when the container cannot hold both. |
| Control | Existing outline action convention | Pill for an action, underline/segment for a state choice, plain text for a passive label. Provide hover, focus, pressed and disabled states. |
| Conversation | AI conversation extension | Asymmetric message shape, readable text, role context and adjacent feedback; never style a message as an action. |
| Evidence caption | Figure and figcaption | Keep provenance and limits beside the evidence. Do not invent numbers to fill a metric card. |

Shared foundations live in `app/site-integration.css` and `app/visual-system.css`.
Local modules own layout and domain-specific geometry. They must not redefine a
new surface palette, radius or heading system because the subject is AI.

## AI presentation guard

Jacob's October 10 follow-up requires Font Awesome arrow icons and fading
decorative rules. Reuse `components/case-studies/Arrow.tsx` and the shared
`solid-center` / `--surface-rule` treatment. Do not insert arrow characters in
JSX, JSON copy or CSS generated content. Horizontal borders belong to the
explicitly checked control indicators; enclosed surfaces retain their borders.

`npm run verify:ai-presentation` checks AI-prefixed TSX/CSS in
`components/case-studies` and the two AI JSON sources. `npm run build` runs it
first, so the existing verification and deployment workflows inherit the gate.
Its regression fixtures run with `node --test scripts/verify-ai-presentation.test.mjs`.
This is bounded enforcement of these recurring source defects, not a whole-site
visual or accessibility guarantee. New shared/global rules still require review
in the browser. See the B103 evidence and the three study catalog entries.

## Review gates

1. Read current STATUS, lock, branch, content authorities and this contract.
2. Capture the chosen reference and current target at the same width. Map every
   element; record intentional differences, including new interactions.
3. Reuse a component or its actual CSS contract. New patterns get a live catalog
   entry showing real content, source paths, behavior and responsive expectations.
4. Compare after implementation at desktop, 820px, 390px and 320px. Inspect text
   wrapping, surfaces, icons, rules, line length and spacing, not only overflow.
5. Exercise every changed action and its feedback. Check keyboard focus, Escape,
   selected state, reset, disabled state, hover contrast and reduced motion. For
   sticky navigation, check both manual scroll and jump destinations.
6. Record exact build, source and browser evidence. A source check cannot prove
   visual fit. A screenshot cannot prove interaction behavior. An audit report
   does not establish full accessibility conformance.
7. Keep publication separate from local acceptance. Update STATUS last.

## Pilot and follow-up

The AI study is the first explicit element-mapping pilot. See
[the comparison](quiet-prism-ai-comparison.md) and [Feeral UX roadmap](roadmap.md).
Future checks should flag new raw surface values and missing catalog examples,
then require review rather than silently rewriting unique artwork.
