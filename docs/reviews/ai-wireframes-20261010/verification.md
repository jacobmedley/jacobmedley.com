# Eleven-comment implementation and verification

## Scope and authority

Jacob's October 10, 2026 comments authorize B104 and the shared presentation changes.
Human-Centered Web Design and Quiet Prism Adherence informed implementation. Source
baseline and rollback: `f884b43bf201c1d38c97dd10180e8fb2ccf69272` on
`codex/ai-study-main-20261008`. No push, merge or deployment is authorized.

## Comment acceptance

| Comment | Implementation and evidence |
| --- | --- |
| 1 | Both demo entries use `AIDemoEntry` and `PrismStudySurface`. Icon, copy and action share a desktop row. Below a 48rem content width, the button follows the text; below 30rem, all three stack and the icon stays visible. `entry-desktop.png`, responsive measurements. |
| 2 | Shared `--heading-copy-gap: .5rem` gives headings before paragraphs/lists 8px. Delivered computes to 8px. The global zero-margin reset was replaced in its source owner. |
| 3 | Each discovery eyebrow/title is one group with a .2rem internal gap. This removes the excessive flex gap without a negative margin that could overlap enlarged text. |
| 4 | Font Awesome arrows are centered vertically and horizontally in the desktop gaps. In stacked discovery nodes, each arrow is centered in the 32px gap and rotates down. Mobile measured centers: 433.03125px and 586.34375px, exactly midway between adjacent nodes. |
| 5 | Study cards override the shared heading-copy token to .625rem. The requested Knowledge was scattered heading computes to 10px at every tested width. |
| 6 | Timing cards, shared modal metrics, career statistics and dedicated study result lists put the label before the value in the source. The replay selector follows the same order. Qualitative outcome story titles and chart axes retain their roles. |
| 7 | Timing, metric, study-card, quote and wireframe side icons align at the top of adjacent content. Shared information-card, section-heading and practice-heading owners were updated. Navigation and button icons retain control alignment. |
| 8 | Customer response states now open in a separate view within the existing case-study modal, using the same entry/back mechanism as the service workspace. The narrative remains in the study. |
| 9 | Service layout is a wide conversation column with context and documents alongside it, with shared spacing, surface and control styles. Narrow layouts show one selected panel. Text has natural height. |
| 10 | The checkbox is 20px wide, and the label gets a flexible text column. At 320px the label is 210px wide and wraps to two normal lines. Before the fix, the checkbox took 454px and left only 10px for the label, which became 508px tall. |
| 11 | Both reconstructions use `AIWireframe.module.css`, existing tone tokens, Thin icons, shared Prism surfaces and fading rules. Earlier sent replies and PDF preview expand on demand. Sample content, proposed status, measured timings and the review-before-send gate are preserved. |

## Layout references and decisions

[Luke Wroblewski's conversational UI exploration](https://www.lukew.com/ff/2018/expanding-conversational-user-interfaces)
groups question/answer exchanges and gives the current exchange priority. It also
places actions with the content they operate on. This informed the wide conversation
column, nearby review controls, and collapsible earlier sample replies.

[His PDF exploration](https://www.lukew.com/ff/2029/ask-lukew-integrated-pdf-experiences)
keeps sources beside the answer and opens a focused document experience. This informed
the adjacent document cards and on-demand preview. These are layout references for
this reconstruction, not additional claims about what the original project shipped.

The two-column wireframes change at 48rem of available content, not a particular
device width. The customer controls stack after the conversation. Service navigation
selects Conversation, Account or Documents. The desktop grid does not stretch the
supporting panels to the height of the conversation.

## Root cause of the checkbox defect

Browser matched-style inspection found the generated `:-webkit-any(input, textarea,
select)` full-width rule winning over the narrower checkbox selector. The shared
field selector now explicitly excludes checkboxes. A two-column review-label grid
reserves 1.25rem for the checkbox and the remaining width for text. No label content
or review requirement was removed. A related generated-selector specificity issue
made the card margin compute to 8px; the card-specific token now resolves to 10px
through both selector forms.

## Verification actually run

- Production build, lint, types and 14-page static export passed. Export asset check:
  288 images and 104 active references.
- Standalone TypeScript and scoped ESLint passed.
- AI presentation guard passed for 10 files; all three regression tests passed.
- Design-system manifest passed: 59 patterns, 196 examples, 36 tokens.
- Quiet Prism scanner fixture tests passed. Candidate comparison is stored alongside
  this report; remaining findings are inherited CSS/control candidates, reviewed
  against rendered source. The scanner count fell from 39 to 10, with no new signatures. No scanner allowlist or plugin baseline was changed.
- 1351, 820, 390 and 320 CSS px: no horizontal overflow in either demo or the story.
  The checkbox remains 20px at every width. Labels wrap to ordinary lines.
- 320px text-spacing override (1.5 leading, 2em paragraph gap, .12em letter spacing,
  .16em word spacing): neither demo overflows horizontally.
- Shared modal inventory: all 15 opened with matching scroll/client widths at
  1351px. No zero bottom gap was found on the 26 headings directly before body
  paragraphs/lists. This is a bounded layout check, not a full audit of every modal.
- DentalPlans shared metric labels precede values; side icons and text have equal
  top coordinates. Career and dedicated result labels precede values at 320px.
- Service: send disabled before review; editing resets review; preview opens;
  attaching a document, reviewing and sending creates a local sample reply with its
  attachment; earlier replies expand; empty search recovers via Clear search.
  Mobile Attach returns focus to Conversation.
- Customer: replay reaches the ten-second failure exit; account-balance scenario
  gives the referral; help dialog opens/closes. Back and Escape restore entry focus.
  Standalone customer drill-down also returns focus. Keyboard scroll restoration
  was exact (4241px before/after). An earlier pointer-tool check included a 14px
  locator scroll adjustment before activation; it is retained in the raw evidence.
- A fresh post-build service preview has no console errors.
- Reduced motion stops the acknowledgement dots. Forced-colors selection has a
  2px system Highlight outline.

Evidence: `browser-checks.json`, `quiet-prism-comparison.json`, and the before/after
PNG files in this directory. Actual 400% browser zoom, screen-reader output, and
other browser engines were not tested; 320px reflow is not a claim of those checks.

## Changed source owners

- `components/case-studies/AIStudyContent.tsx` and `.module.css`
- `components/case-studies/AIDemoEntry.tsx`
- `components/case-studies/AIWireframe.module.css`
- `components/case-studies/AIExperience.tsx` and `.module.css`
- `components/case-studies/AIServiceWorkspace.tsx` and `.module.css`
- `components/case-studies/CareerStats.tsx`
- `components/ui/CaseStudyModal.tsx`
- `app/visual-system.css`, `app/site-integration.css`
- `app/case-studies/dashboard.css`, `app/case-studies/case-studies.css`
- `app/case-studies/[slug]/page.tsx`
- `app/design-system/catalog.ts`
- `docs/copy-register.md`, this evidence directory, and `docs/STATUS.md` (written last)

## Coordination and closeout

The fresh Genesis STATE read still declares the old Exchange retired and read-only.
Unique change/update records are staged under
`C:/dev/_handoffs/ai-wireframes-20261010/`. Coordinator receipt is unverified.
No shared Genesis state was edited. The local checkpoint hash, final preview PID,
lock release and clean-tree result are recorded in the external update and final
response. Preview: `http://localhost:3000/#work`. Deployment unchanged. No requested
implementation work remains; verification limitations are listed above.
