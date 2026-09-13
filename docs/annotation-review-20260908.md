# September 8 annotation review

Recorded September 9 UTC / September 8 Eastern, 2026. Jacob's latest instruction
is documentation and planning only, followed by a new chat for each stage.
All 18 requests below are **PLANNED**, not implemented or accepted. The screenshots
identify targets; their 1100px viewport is context, not a new global breakpoint.

The [stage plan](website-refinement-plan-20260908.md) owns future execution.
[STATUS](STATUS.md) owns current Git, preview and release state. The
[dashboard report](case-study-dashboard-acceptance.md) records the local work
completed before this change in direction. It does not certify these new requests.

## Request register

| ID | Requested result | Source review and implementation boundary | Stage |
|---|---|---|---|
| 1 | Full Stack introduction bottom margin 16px to 48px | `components/sections/FullStackSection.tsx`, its lead `p.display-1`. Add a scoped class and spacing rule in `app/globals.css`; avoid changing every `.display-1`. Account for the following grid's responsive top margin so the effective gap is intentional. | 2 |
| 2 | All cards animate at idle on desktop and mobile; faster, restrained motion; smooth fast-start/slow-end desktop rollover | Shared `.thinking-*` rules in `app/globals.css` currently provide hover/focus on desktop and continuous idle only for touch. Photo cards have a separate image-hover rule. Define one motion contract for photo, icon, featured, outcome and study cards, with media-specific amplitudes. Text, badges and hit areas stay stable. | 1, 3 |
| 3 | Call Center circles become a denser connected network | `FullStackSection.tsx` geometry and `.call-center-ux` rules. Render actual connections whose endpoints follow nodes, not unrelated moving lines. Preserve the headset's ownership by this item. | 3 |
| 4 | Personalization gets dense radial lines, slow rotation and hover warp flight | `FullStackSection.tsx` and `.marketing-auto`. Twelve lines exist. Separate rotating field, outward streaks and center anchor transforms so idle and interaction do not fight. No flashing or full-card/text movement. | 3 |
| 5 | Viva thumbnail shows only the couple, without baked-in text | `lib/data/projects.ts` selects `/images/work/viva-modal/hero-1.png`; the screenshot contains text inside the image. Locate and visually verify the original couple asset; hiding HTML text will not fix it. Keep the real card caption and badges. | 1, 4 |
| 6 | Design Leadership bullet becomes the section's main paragraph | `components/sections/ResumeSection.tsx`: move the exact B37 body beneath the existing Design Leadership heading, before the columns; remove the duplicate bullet and redundant label. B40 records placement, not a rewrite. | 2 |
| 7 | AI Product Design first in left column | Reorder `leadershipLeft` in `ResumeSection.tsx`; use its current canonical wording, including the corrected assistant scope. | 2 |
| 8 | Business Outcomes first in right column | Reorder `leadershipRight`; preserve the measured-year qualification and existing source-backed figures. B40 does not authorize rewriting this claim. | 2 |
| 9 | Sticky, centered section headers, icon inline left, frosted white background, smooth repositioning | `components/ui/SectionHeader.tsx`, its section owners and `app/globals.css`. It currently emits separate header/rule rows. Education nests it in a short wrapper that cannot contain section-long sticky travel. Scope is major section headers, with standalone hierarchy defined in Stage 1; do not blanket-style every h3. | 1, 5 |
| 10 | Three horizontal featured-card design options; WebMD logo in center circle, abstract thin health imagery, shared motion | `components/ui/WorkCard.tsx`, `components/sections/CaseStudiesSection.tsx`, WebMD record in `lib/data/projects.ts`. Develop three reviewable options in Stage 1, obtain Jacob's choice, then implement the selected family for all five featured rows. The health field is decorative, not a new medical/results diagram. | 1, 4 |
| 11 | DentalPlans tooth anchor with layered platform schematic that opens in depth on rollover | Same shared WorkCard and DentalPlans record. Retain a sharp, fixed focal anchor; separate schematic planes using perspective, restrained translation and depth blur. Existing factual study diagrams remain untouched. | 1, 4 |
| 12 | Main featured-study summaries have approximately equal length | Five `display: 'feature'` records in `lib/data/projects.ts`, not detailed stories or canonical standalone JSON. Current lengths range from 21 to 58 words; B41 requires source-backed drafts before edits. | 1, 2 |
| 13 | BumblebeeMD bee anchor and fractal honeycomb field | WorkCard and BumblebeeMD record. The screenshot disambiguates the repeated image selector: this request belongs to BumblebeeMD. Inspect supplied BMD vectors; use a bounded nested hex pattern rather than expensive unbounded fractal generation. | 1, 4 |
| 14 | Fix lower-corner image exposure around frosted caption panels globally | `.thinking-thumb`, `.thinking-panel`, shared photo/featured frames and standalone equivalents. Screenshot shows the symptom; radius, inset, padding and compositing need browser diagnosis before claiming the cause. One outer clipping contour must survive scale, focus and touch. | 2, 6 |
| 15 | Readable eyebrows and AA contrast on both surfaces | `.thinking-eyebrow` is .64rem, `.cs-eyebrow` 11px and `.cs-outcome-type` 9px in current sources. Include stat notes, badges and captions in the audit. Use WCAG 2.2 AA and rendered/composited backgrounds, with a separate readability target. No compliance claim from font size alone. | 1, 2, 6 |
| 16 | Standalone cards share main-site idle and rollover behavior | `components/case-studies/StudyIconArt.tsx`, `OutcomeDashboard.tsx`, `StudyCollection.tsx`, `app/case-studies/dashboard.css`. Reuse Stage 3's contract, including focus, touch, pause and reduced motion. | 3, 6 |
| 17 | An icon belongs to one case study or category permanently | Create one identity registry before further icon choices. Main workshop/lightbulb and standalone practice/lightbulb currently represent different items; likewise Call Center/journey headset and Personalization/navigation target. Resolve owners explicitly; don't silently equate similar stories. | 1, 3, 4, 6 |
| 18 | Stronger frosted-glass filter bar | `.cs-filter-bar` in `app/case-studies/dashboard.css`, owned by `StudyCollection.tsx`. It already sticks at top and filters both collections. Tune translucency, backdrop blur, border and fallback while preserving legibility over scrolling content. | 2, 5, 6 |

## Icon ownership findings

Current homepage entity glyphs are vial (Experimentation), headset (Call Center),
bullseye-arrow (Personalization), lightbulb (Workshops, overridden in the component),
mouse-field (Roadmap) and masks-theater (Personas). The Workshops data record still
contains screen-users; the future registry must remove this competing assignment.

Standalone assignments are layer-group (platform), lightbulb (practice), headset
(journey), bullseye-arrow (navigation), swatchbook (tokens), and file-check (decision).
The three cross-entity collisions above require deliberate replacement. A study's
outcome, collection card and detail may repeat its own assigned icon. Category
identities receive separate reserved icons if displayed. Shared actions such as
Read arrows and close controls remain universal affordances. Patterns, palettes and
geometry can be shared; an entity glyph cannot be lent to a different entity.

Stage 1 must inventory all rendered entity icons, including overrides, hero stats,
section headings and modal content. Record owner, canonical identity, approved glyph
or logo, occurrences, and actual thin-kit availability. Keep the existing homepage
owner when resolving a collision unless Jacob chooses otherwise. Reserve the tooth
for DentalPlans and the supplied bee for BumblebeeMD; WebMD uses its actual logo.

## Copy review

Deterministic whitespace word counts of current featured summaries:

| Item | Words |
|---|---:|
| WebMD | 27 |
| DentalPlans | 58 |
| BumblebeeMD | 23 |
| Hydra | 27 |
| One Park Financial | 21 |

Start B41 drafts around 25–35 words, as a design target rather than a rigid rule.
Shorten DentalPlans without losing Jacob's role or the shared-platform mechanism;
do not pad the others with claims to make counts equal. Hydra's current summary
contains `championed` and `streamlined`; reconcile it against the style rules while
drafting. Review comparable rendered lengths at each breakpoint, not just counts.
Do not truncate prose with line clamps or ellipses to manufacture parity.

## New asset inventory

These files were inspected at the original checkout paths below. They are **not
present in the assigned worktree** and were not copied or edited in this planning
pass. Stage 4 imports only the selected, verified assets while preserving originals.

| Source under `C:\dev\jacobmedley.com\public\assets\references\` | Bytes | SVG viewBox | SHA-256 |
|---|---:|---|---|
| `webmd\webmd_logo_white.svg` | 3828 | `0 0 110 25.53` | `410BB5F75210086DD9D57CB93825D4AA73BEE32AFD2467397FFEEE6614485D12` |
| `bmd\SVG\bmd-mark.svg` | 3428 | `0 0 120 110.64` | `78B4ABCEEB38F49141F50EEFBAEC275ECFC0B57248992917611C04B560980424` |
| `bmd\SVG\bmd-icon2.svg` | 2583 | `0 0 77 88.41` | `5CDCA0AA75656770F2AA3408925082F223FFF84B74BD30A91B7FE803EA62B050` |
| `bmd\SVG\bmd-hex3.svg` | 796 | `0 0 120 110.64` | `14C9AF0CB49BB200BC6238951C1B134F0D905453BF5C5F30D83C9BF08402E41D` |

The WebMD asset is white; design an adequately dark center backing and preserve its
wide aspect ratio inside the circular anchor. Do not redraw or thin the logo paths.
BMD assets use black/white fills. Text inspection found no external href/src
references; this is an inventory, not visual approval or a full SVG security audit.

Viva candidates exist in `public/images/work/viva-modal/` (including hero-1,
hero-2 and vs-1 through vs-3), plus other campaign images. Their filenames do not
prove a clean couple photograph exists. Inspect them visually in Stage 1. If no
faithful clean source is found, document the missing asset before any destructive
crop or invented replacement; preserve the current thumbnail until resolved.

## Boundaries carried forward

The four career metrics and their framing, canonical study JSON, source references,
diagrams and complete stories stay protected. The standalone route remains directly
addressable and separated from the homepage without authentication. Main PR #8 has
already merged; this plan does not reopen or merge it. Future implementation needs
its own reviewed branch/PR after reconciling the merged baseline.
