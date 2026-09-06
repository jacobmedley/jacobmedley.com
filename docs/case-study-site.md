# Refined public case studies

The new entry point is `/case-studies/`, linked from the homepage's Case
Studies section. Six selected stories have dedicated, statically exported
pages. Existing modals continue to work.

## Content and visual approach

- Existing brand colors and URW Form / Manrope font stack, with a scoped
  page layout and responsive CSS. The legacy 24-column grid is unchanged.
- A platform story leads the index. Filters group all six studies by design
  leadership, design systems, and product design.
- Each reading page introduces role, scope, collaborators, and the story at
  a glance, then follows problem, approach, solution, and results.
- The six diagrams are explanatory reconstructions. They are explicitly
  labeled on the reading pages and are not presented as original artifacts.
- The page copy is imported directly from `docs/case-study-site-copy.json`,
  designated in copy-register.md, Section C. Every study records provenance.
- Platform outcomes retain the canonical denominator and measurement window.
  Other studies describe documented capabilities, findings, and decisions.

## Validation

- `npm run build`: passed, including type checking, linting, and static export.
- `npx tsc --noEmit`: passed.
- Targeted ESLint check of the new routes, components, data module, and
  modified homepage section: passed.
- All six exported detail pages contain the four story anchors and canonical
  metadata. The exported homepage contains the new entry link.
- New content checked for retired studies, retired accessibility claims, and
  em dashes: none present.
- Browser checks covered desktop, tablet at 768 CSS pixels, and phones down
  to 320 CSS pixels. Tablet artwork clipping found during review was fixed.
- All filter counts checked (6 total, 3 leadership, 2 systems, 1 product).
- Production-export filter and client navigation checked. Homepage entry,
  section anchors, and narrow-phone rendering across all six routes checked.
- No application errors observed in the inspected browser console.

## Preview and boundaries

Build with `npm run build`; preview the exported directory with
`node node_modules/serve/build/main.js out -l 3000`.

No deployment or push was performed. No deployment settings were changed.
The pre-existing `docs/STATUS.md` edits and `.tree-lock` were not modified.
The unmerged recruiter portfolio and AI assistant branches were not merged.

To add a study, add a sourced entry to the canonical JSON. Static parameters
and the collection derive from that list. The diagram component accepts the
six illustrated story types; add a deliberate visual before adding a new type.
