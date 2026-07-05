# Modal Content Audit

Read-only comparison of `lib/data/projects.ts` against the legacy modal source
(`components/modal-*.html`, one file per project) for all 14 projects. No
block types were added and no project data was changed for this pass — this
is the input to a future schema/authoring pass, not the pass itself.

Severity scale: **1** = faithful port, no meaningful loss · **3** = a
distinct visual component's structure/styling is lost, content survives as
plain text · **5** = a whole content section (usually a diagram) is missing
or the structure is flattened badly enough to misrepresent the original.

## Findings by project

| project | legacy structures present | current blocks used | lossy? | severity |
|---|---|---|---|---|
| `webmd` | Circular brief photo + intro; 8 contribution badges + 6 tech badges; 7× (heading + desktop/mobile image pair with desktop/mobile icon labels) | `heading`, `image-pair` ×7, populated `contributions`/`technologies` | No | 1 |
| `dentalplans` | Circular brief photo + intro; badges; **4-metric grid + "Value Created" icon list** ("Business Results"); **3-tier nested `.progress`/`.progress-bar` hierarchy diagram** ("Individual Product Sites" → 5 brand boxes each with a nested "Brand Theme" sub-bar; "Core Framework" → 5 items; "Microservices" → 5 items); circular photos + 2-col text for 4 "Iteration" narrative rows | `metric-grid` (faithful), `heading`/`text` stubs for "The System Framework" (Cigna/Aetna/WebMD/LMDB/Documentation reduced to plain text lines, no diagram), `image` ×4 for iterations | **Yes — the entire progress-bar hierarchy diagram is missing**, replaced by flat heading/text stubs | **5** |
| `bumblebeemd` | Badges; per-section image blocks where the desktop column stacks *two* images (e.g. `home-dt.png` + `gran-ma-w.png`) above a single mobile image | `heading`, `image` (first desktop image), `image-pair` (second desktop image reused as the "desktop" side, paired with the mobile image) | Minor — visually close, but the pairing re-associates an image that wasn't originally part of a desktop/mobile pair | 2 |
| `hydra` | Badges; two `<figure>` blocks with `<figcaption>` captions; **"Nomenclature" 6-item icon-card grid** (`.card` with FA icon + label: Elements/Controls/Components/Modules/Templates/Pages); **multi-tier `.progress`/`.progress-bar` brand-hierarchy diagram** (Consistent UX/UI → App One/Two/Main/Sub Website → Main/Sub Brand → Design System → C#/PHP) | `heading`/`text`/`image` — figure captions dropped, Nomenclature flattened to plain `text` items (no card/icon), **entire brand-hierarchy diagram missing** | **Yes — same class of loss as dentalplans**: a full diagram section is gone; icon-card grid loses its shape | **5** |
| `opfred` | Badges; 5× before/after image pairs (plain 2-col, no icons) + 1 icon-labeled desktop/mobile pair | `text` ("Before:"/"After:") + `image` for the before/afters, `image-pair` for the full homepage | No | 1 |
| `split-test` | No contribution/technology badges in legacy (confirmed — this modal has none). Trophy icon + up/down arrow icons decorate win/loss headings; external link (`<a href="linkedin.com/in/iamjr/">J.R. Hernandez</a>`) in intro text | `heading`/`text`/`image`; `contributions`/`technologies` correctly empty (matches legacy) | Minor — trophy/arrow icons dropped (plain text headings instead), and the hyperlink is flattened to plain text, losing a real outbound link | 2 |
| `call-center-ux` | Badges (legacy markup is itself broken here — a missing `<span>` leaves "UX/UI Design" as an unclosed/malformed second badge); 3× labeled image-row pairs at a 15/9 column split | Populated `contributions` (1 badge — "Project Lead"; the broken second legacy badge isn't recovered, which is defensible), `image-row` ×3 with `cols:[15,9]` (exact match) | No (legacy's own markup bug, not a regression) | 1 |
| `marketing-auto` | Badges; circular brief gif; Before/After images shown **side-by-side** in a 2-col row (`col-xl-8` each) | Populated `contributions`/`technologies`; `heading` + `image` for Before and After **stacked full-width** instead of side-by-side | Minor — layout only, no content lost | 2 |
| `workshops` | Badges (Facilitator; Whiteboard/Dry Erase Markers/Post-it Notes/Brains); **3-column circular icon-card gallery** (image + h5 caption below, in a `row-cols` grid: Creative Brainstorming / UX/UI Strategy / CRO Testing Strategy) | `contributions`/`technologies` **empty**, badges demoted to plain `text` lines in `media`; gallery flattened to a vertical stack of `heading`+`image` pairs (no grid, no circular crop) | Yes — badges lose icon/pill styling; 3-up gallery loses its grid layout and circular image treatment | 3 |
| `roadmap` | Badges (Roadmap Planning; Lucidchart); **colored numbered `list-group`** (`<ol class="list-group list-group-numbered">`, 5 items, alternating `bg-*-light` per item, bold title + description, with one item containing a **nested `<ul>` sub-list** of 5 items); a Bootstrap **`.card`** ("Project Card:" example with card-header + card-body) | `contributions`/`technologies` **empty**, badges demoted to plain `text`; numbered/colored list-group flattened to a single plain `list` — **and the nested sub-list items are flattened as siblings**, losing the "Specific Projects or Initiatives" parent/child relationship; `.card` flattened to plain heading/text lines | Yes — three distinct legacy components (list-group, nested list, card) are all lost, plus the badge demotion | **5** |
| `personas` | Badges (Co-Project Lead, Visual Design; Adobe Suite); circular brief photo; single "Example Persona" image | `contributions`/`technologies` **empty**, badges demoted to plain `text`; otherwise a faithful, simple port | Yes — badges only | 2 |
| `reveal` | Badges (Creative Concepting, Collaboration, Visual Design); **two `<ul>` bullet lists** ("Conceptual and Visual Contributions" and "Visual Contributions", each with a bold lead-in label) living *inside* the two-column intro brief; 2× image-row pairs | `contributions`/`technologies` **empty**, badges demoted to plain `text` in `media`; the "Conceptual and Visual Contributions:" label ends up in `brief.paragraphs` (rendered in the left intro column) while its matching list moved to the main `media` body — **label and list are now visually separated** | Yes — badges, plus a label/list association broken across the intro/body boundary | 3 |
| `viva` | Badges (Creative Concepting, Collaboration, Visual Design — populated correctly, not demoted); logo pair, color study, style/tone images, hero concepts, UI component images | Populated `contributions`; `image-row` for the logo pair, `image` for the rest | No | 1 |
| `wrong` | Badges (Creative Lead, Collaboration, Visual Design); a `<ul>` list ("Visual Approach"/"Inclusivity"/"Execution", bold lead-ins) inside the two-column intro brief | `contributions`/`technologies` **empty**, badges demoted to plain `text`; the bulleted list is relocated out of `brief.paragraphs` into the main `media` list, breaking the original intro-column association (same pattern as `reveal`) | Yes — badges, plus the same list relocation issue as `reveal` | 3 |

## Cross-cutting findings

**Badge demotion (5 projects: `workshops`, `roadmap`, `personas`, `reveal`, `wrong`).**
All five have real `contributions`/`technologies` badges in their legacy
HTML (FA icon + `badge-work` pill), but `projects.ts` gives them empty
`contributions: []` / `technologies: []` arrays and instead pushes the same
labels into `media` as plain `heading`/`text` blocks. They render with no
icon and no pill styling. This is the single highest-value fix in the audit
— it's mechanical (move the label strings into the existing `contributions`/
`technologies` arrays, which the modal already renders correctly for the
other 9 projects) and touches nothing structural.

`split-test` was checked against this same pattern and is *not* affected —
its legacy modal genuinely has no badge section, so its empty arrays are
correct.

**Diagram loss (2 projects: `dentalplans`, `hydra`).** Both lose an entire
nested `.progress`/`.progress-bar` hierarchy diagram — the single most
visually distinctive legacy component on the site (used nowhere else) —
down to a handful of plain headings/text. These are the two highest-severity
findings and the most work to recover, since no current `ProjectMedia`
block type represents a hierarchy/tree diagram.

**List-group and card loss (`roadmap`).** In addition to the badge
demotion, `roadmap` separately loses a colored numbered list-group (with a
nested sub-list inside one item) and a `.card` component, both flattened to
plain text/list — the most structurally lossy single project after the two
diagram cases.

**Intro-column list separation (`reveal`, `wrong`).** Both have a bulleted
list that lives inside the two-column intro "brief" in legacy, next to its
bold lead-in label. The current port keeps the label in `brief.paragraphs`
(left column) but moves the list into the main `media` body (below,
full-width), separating a label from the list it introduces.

## Metric-grid reuse

**No other modal can reuse the existing `metric-grid` block as-is.**
`dentalplans` is the only legacy modal with a metrics-style pattern (the
"Business Results" 4-metric grid + "Value Created" list), and it's already
using `metric-grid` faithfully. None of the other 13 modals have a
comparable metric/stat pattern in their legacy HTML — they're qualitative
case studies without KPI call-outs.
