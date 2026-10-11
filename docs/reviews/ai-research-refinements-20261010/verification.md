# Research-card refinements: B105

## Scope and authority

Jacob's latest eleven October 10, 2026 browser comments authorize these local
changes. Quiet Prism Adherence and Human-Centered Web Design informed the work.
The source baseline and rollback is `cfe20a50146f274af3667d480053cf1b5512c926`
on `codex/ai-study-main-20261008`. No push, merge or deployment is authorized.

## Comment acceptance

| Comment | Result |
| --- | --- |
| 1 | Customer entry button uses `align-self: center`. At 1714px its center matches the adjacent copy exactly. |
| 2 | Service entry shares the same rule and also has zero center difference. |
| 3 | Response requirements heading uses `fa-user-check`. |
| 4 | The requested quote-left replacement is superseded by the later removal of every pull quote and its icon in comments 7–9. No quote icon remains in these cards. |
| 5 | All three source icons occupy the upper-right corner of the header, with the same top coordinate as the date. Each date/title/icon group is one accessible source link. |
| 6 | The coding experiment is replaced by Source quality and editable answers, combining Luke Wroblewski's PDF exploration and NN/g's accordion-editing findings. Both sources are linked. It is labeled Design reading. |
| 7–9 | All three pull quotes and their citation locations are removed from the displayed cards and canonical JSON. Research-card blockquote count is zero. |
| 10 | Each design implication has a top-aligned Thin paintbrush-pencil icon to its left. |
| 11 | Each finding has a top-aligned Thin lightbulb icon to its left. |

## Sources and interpretation

- [Luke Wroblewski, Ask LukeW: Integrated PDF Experiences, July 27, 2023](https://www.lukew.com/ff/2029/ask-lukew-integrated-pdf-experiences): large PDF extracts can crowd out other sources; extraction quality and source filtering affect retrieval. Sources sit beside the response and open a focused document experience.
- [Sarah Gibbons, Tarun Mugunthan, and Jakob Nielsen, Accordion Editing and Apple Picking, September 24, 2023](https://www.nngroup.com/articles/accordion-editing-apple-picking/): an eight-person usability study observed repeated expansion/shortening and reuse of earlier generated passages, supporting direct editing and easier access to previous output.

The design implication is an editorial synthesis. NN/g's accordion editing names
an observed prompting behavior, not a collapsible control. Luke's separate May
2023 conversational-interface article discusses collapsing earlier exchanges.
The card does not claim measured results for Jacob's project. The first two
research findings, implications, limitations and official titles are unchanged.
The reading list now contains 15 articles, including the new NN/g source.

## Layout decisions

The research grid retains its existing 48rem content-width breakpoint. Its desktop
subgrid now aligns four natural content rows: header, finding, implication and
footer. Card heights are equal without a fixed height (523.09375px at 1714px;
568.078125px at 1351px). Cards stack and grow naturally at narrow widths.

The entry buttons center within their desktop row; side icons remain at the top
of the copy. Existing entry transitions at 48rem and 30rem are retained. No
viewport-specific patch or temporary annotation attribute was added. Global
research conventions apply to this shared research-card renderer in both the
modal and standalone study, rather than changing unrelated external links.

## Verification actually run

- Production build, lint, type validation and 14-page static export passed.
- Export verification passed: 288 images and 104 active references.
- Standalone TypeScript and scoped ESLint passed after the optional sources-array
  check was corrected to a truthiness guard.
- AI presentation guard passed for 10 files; all three existing guard tests passed.
- Design-system validation passed: 59 patterns, 196 examples, 36 tokens.
- Quiet Prism scanner comparison of the changed stylesheet: 8 candidates before,
  8 after, no new signatures. Existing generic card selectors, control overrides
  and historical surface literals are unchanged. No allowlist was altered.
- Browser measurements at 1714/1351/820/390/320 CSS px: equal desktop card heights,
  natural stacked heights, and no horizontal overflow in the research group,
  entries or modal study content.
- 320px with 1.5 line height, 2em paragraph gaps, .12em letter spacing and .16em
  word spacing: no horizontal overflow in research cards or either entry.
  Temporary override was removed.
- Actual rendered fonts for user-check, lightbulb and paintbrush-pencil are
  `FontAwesome7Pro-Thin`, one glyph each. The Font Awesome CLI is unavailable;
  no installation or icon package change was needed.
- At 1714px all source icons have the same top coordinate as the date and zero
  gap to the metadata row's right edge. Both button/copy center differences are 0.
- Keyboard navigation reaches the first research source link with a visible
  3px focus outline. Customer entry tabs to the service entry normally.
- A fresh preview after the production build has no browser console errors.
- `git diff --check` passed.

Evidence: `research-desktop-1714.png`, `research-mobile-320.png`, both entry
screenshots, `responsive-measurements.json`, `icon-fonts.json`, and
`quiet-prism-comparison.json` in this directory. The old research-card presentation
is preserved in the B103/B104 evidence and baseline commit.

This is a bounded check of the changed presentation. Screen readers, actual 400%
browser zoom and other browser engines were not tested in this pass. No requested
implementation remains unresolved.

## Files and closeout

- `components/case-studies/AIStudyContent.tsx`
- `components/case-studies/AIStudyContent.module.css`
- `docs/ai-chat-study.json`
- `app/design-system/catalog.ts`
- `docs/copy-register.md`
- This evidence directory and `docs/STATUS.md` (written last).

Local preview: `http://localhost:3000/#work`, managed session 28355, verified Next.js
PID 52136 from this checkout. The updated research view is left open; temporary
viewport and CSS overrides are cleared. No static preview was started. Nothing
was published. Final commit and lock release are recorded in the closeout.

Genesis STATE was freshly checked at intake, dependent work and acceptance. The
old Exchange remains retired/read-only. Unique change/update records are kept at
`C:/dev/_handoffs/ai-research-refinements-20261010/` for a connected coordinator;
coordinator receipt and shared-state updates are unverified.
