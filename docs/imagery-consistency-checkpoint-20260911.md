# Imagery and consistency checkpoint

September 11, 2026. Checkpoint B completes the remaining supporting-imagery and
bounded modal consistency work in `docs/release-plan-20260911.md` on
`codex/website-art-layout-20260910`, following checkpoint A commit `5d312dc`.
This is a local implementation checkpoint. Independent acceptance, push, PR,
merge and deployment remain separate.

## Dispositions and provenance

All visible diagram labels and alternative text were registered in B47 before
implementation. No new result, metric, role, factual claim or public route was
introduced.

- DentalPlans: the five presentation references to `rocket.png` and
  `mvp-one.png` through `mvp-four.png` are replaced by typed, responsive
  schematics. Their labels come only from the adjacent Key Features and Iteration
  One–Four narrative: the shared platform, product data/search/promotions/deploy,
  WordPress/Bootstrap/product/cart, two-brand shared data/cart, shared
  patterns/components/microservices/properties, and ZIP/results/profile flow.
  The original files remain untouched under `public/images/work/dpprod-modal/`.
- Hydra: `hydra/why.jpg` is no longer rendered. A shared-vocabulary hub connects
  patterns and components to brands and technology stacks, directly visualizing
  the adjacent “one body / many systems and brands” explanation. The original
  fantasy illustration remains untouched.
- A/B Testing: the generic `split01-modal/thumb.png` lead is replaced by the
  existing WebMD control and winning-V1 homepage screenshots. Those same source
  files already support the detailed experiment evidence later in the modal; the
  lead now previews real evidence instead of a decorative illustration.
- Personas: the generic `kitchen-sink/persona-one.webp` lead is replaced by the
  existing `Persona-Cards.png` source artifact with B47's accurate Frugal Francine
  alt. The later duplicate heading/image block was removed, leaving one copy of
  the artifact and retaining the complete narrative and contribution data.
- Personalization: `ma-modal/automation.gif` and its generated static pause frame
  are explicitly retained. The image is the existing documented cross-channel
  workflow, not an unrelated decorative cartoon, and its animated/static pair is
  the content exercised by the shared pause and reduced-motion behavior. The
  supporting `ma-36.png` and `ma-3b.png` source screenshots remain unchanged.

The new supporting-art primitive uses the existing modal reading palette, grid,
rules, 1.5rem corners and shadow language. Hub diagrams remain spatial; flow
diagrams switch from horizontal to vertical from their own measured container,
including the 1100px split-column edge. Accessible names describe the relationship;
duplicated visual labels are hidden from the accessibility tree.

## Shared consistency sweep

The existing modal component continues to own image rows/pairs, animated media,
badges, rules, buttons, arrows and corner treatment. Every rendered modal image
loads, maintains the shared rounded treatment, and fits its native scroll surface.
Header and footer controls remain at least 44px, keyboard focus stays trapped and
returns to the invoking card, the transparent native scrollbar/full-bleed field
remains aligned, and shared pause/reduced-motion behavior remains synchronized.
Historic cartoons inside genuine client screenshots were not repainted.

The site exposes the authored in-page Resume section and the standalone surface
links only to `/#resume`; there is no public PDF/DOCX download link or resume file
under `public/` to validate or change. The durable status table continues to assign
Word master v1r9, Principal IC v1r1, Design Systems v1r1 and designed PDF v2r3 to
the resume workstream. This checkpoint does not claim those external masters were
rebuilt or published.

The Education footer contact button now wraps within its container at 200% text.
It has no internal overflow and remains inside the viewport at every focused test
width. At 320px, the focused result file still records four pixels of whole-page
scroll width from pre-existing transformed wave SVG geometry; the button is not
the owner. This checkpoint does not redesign or clip the completed wave system.

## Verification

Final production `next build` compiled, type-checked, generated 11 static pages and
exported two route groups. The final export on `http://localhost:3011` passed:

- annotation acceptance at six homepage and four standalone widths, with no
  overflow or browser errors;
- dashboard acceptance at 11 widths, both filtered collections, keyboard/touch,
  thin icons, motion preferences and all six direct stories;
- Stage 4 card acceptance, motion/network acceptance, refinement acceptance and
  surface acceptance;
- housekeeping acceptance: 70 modal/viewport combinations across all 14 modals,
  plus seven resume widths, image/glyph loading, overflow, controls, focus,
  contrast, motion and native-scrollbar behavior;
- Stage 5 sticky acceptance at 320, 375, 768, 1100 and 1440px; and
- the new imagery consistency suite across the same five widths, covering exact
  source/alt dispositions, six schematics, A/B comparison, one persona artifact,
  retained Personalization animation, image loading, modal fit and the 200% contact
  boundary.

An initial regression invocation used `127.0.0.1`, which the external Font Awesome
kit rejected for this local origin; no product assertion was accepted from that
run. All reported final suites use the established `localhost:3011` origin. The
Stage 4 refinement probe was updated to hide checkpoint A's sticky wrapper while
sampling the underlying card glass; sticky layering remains separately covered by
Stage 5 acceptance. The focused imagery suite first exposed the 26px MVP 03
container edge at 1100px; the container-query fix was rebuilt and both imagery and
all-modal housekeeping passed afterward.

Final deterministic commands also include TypeScript with incremental output
disabled, targeted ESLint and `git diff --check`. Windows Chromium and Node 22.11.0
were used locally. Firefox, WebKit, physical-device and full-WCAG coverage are not
claimed; CI Node 20 remains a release-time check.

## Coordination and recovery

GPT-5.6 Sol / medium was Jacob's selected route and is exposed by the host. Genesis
review remained ineligible because the current profile root did not match this
worktree, persistent lane ownership was uncertified, and the laptop inference hold
remained active. Local Genesis workload was zero; no paid-provider fallback,
download, reset, extra spend or runner repair occurred. Image generation was not
needed because the source narrative and existing artifacts supported deterministic
implementation.

Rollback for checkpoint B is checkpoint A commit `5d312dc`; use a reviewed revert
instead of resetting shared history. External resume masters, standalone-dashboard
publication links and shared Genesis coordinator files were not edited.
