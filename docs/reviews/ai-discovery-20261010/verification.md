# AI discovery revision: verification

Date: October 10, 2026. Edit B101. Local implementation only.
Branch: `codex/ai-study-main-20261008`.
Rollback: `88404af1b61e8db93ca36f38f45f5fb0cb6fbf77`.
Final checkpoint hash is recorded in the external update event and Git history.

## Requested and implemented

- Early-2023 discovery story with XD/UX shaping requirements. Accuracy, compliance and speed precede the technical discussion.
- Three colored icon cards for user requirements; three stacked discovery cards; full-width horizontal finding chain with the sample 150,000 and required referral.
- Measured usability/QA timing (about 15 seconds average, up to 60, then about 8–10 after backend work) separated from the feedback-state replay. Streaming explicitly enabled after a technical lift.
- Three research-paper quotes, design implications and limitations; 14 dated NN/g and Luke Wroblewski articles from 2023–2024. Two supplied 2025 articles excluded. Sources and provenance: `sources.md`.
- Feedback prose left, stacked icon cards right. Representative context and MoSCoW cards. Launch gaps and adoption discussion appear only in the conclusion, without blame.
- Five icon-and-label study links based on mobile site navigation. Workspace drill-down with Back, contextual navigation, retained outer Close, reading position/focus restoration, and retained disclosures and customer replay state.
- Service workspace: three sample scenarios, editable draft, suggested wording, follow-up insertion, review invalidation after changes, sample send/history, local review flag, reset, account context, document search/empty recovery, preview, attachment/removal and PDF links. Native HTML drag-and-drop handler plus the equivalent Attach button.
- Two sample PDFs and exact rendered PNG previews. No original internal document or real account data.

## Design references

| Element | Reference or reason |
| --- | --- |
| Narrative cards and findings | Existing Product Framework modal and shared `PrismStudySurface`, including shared four-tone colors, borders, radii and spacing |
| Section heading | Shared `PrismStudyHeading` |
| Study navigation | Main site's mobile icon-over-label pattern, tone accents and active bottom border; numbers removed |
| Service controls | A new dense, flat workspace pattern: conversation remains beside context and documents when space permits, one selected panel on phones |
| Catalog | Updated Study Navigation and registered Service Workspace with its entry point, behavior and responsive description |

## Checks actually run

- `npx tsc --noEmit`: passed.
- Scoped ESLint on all four changed TSX components: passed.
- Final `npm run build`: passed compile, lint, types and 14 static pages; asset preparation passed, verifying 288 existing images and 104 active references.
- Four sample files: SHA-256 parity between public source and static export; all four returned HTTP 200 on the development server.
- PDFs reopened with pypdf, one page each; rendered with Poppler and visually inspected, including after the sentence-case correction. No clipping or missing text. Poppler emitted generic missing Symbol/ArialUnicode font notices; the generated pages use Helvetica and rendered correctly.
- JSON parity against registered B101 blocks; all 14 article dates fall in 2023–2024; three direct quotes each under 25 words; em-dash sweep passed for new narrative, sample content and components.
- `git diff --check`: passed after removing a trailing blank line. The staged check exposed Git treating the small PDFs as text; added an asset-scoped binary attribute and verified staged PDF bytes match the source, preventing line-ending conversion on checkout.

## Browser acceptance

Performed with the Codex browser controls against localhost:3000.

- Desktop 1351×888, tablet 820×1024, phones 390×844 and 320×740. Main page and modal had no horizontal overflow at the tested widths. At 320, page width and scroll width both 320; modal client/scroll width both 308. At 820, page width and scroll width both 820; modal client/scroll width both 708.
- Discovery cards, horizontal finding chain, paper quotes, dated reading disclosure, response measures, feedback columns, priority cards and conclusion inspected in DOM; discovery and workspace layouts also visually inspected.
- Study navigation moves to the heading and updates its active marker. No numbers. Phone navigation presents one workspace panel at a time.
- Apply suggested wording enables review; checking review enables Send. Adding a follow-up or removing an attachment disables Send until review is repeated.
- Search with no match shows recovery; Clear search restores documents. Preview switches to the form. Attach adds it to the draft; Send produces a sample reply with its PDF link and clears composer/review state.
- Suspicious-request scenario shows contextual review guidance; Mark for review adds a local note. Reset clears sent messages and the flag while retaining the selected scenario.
- Back restores the entry button's focus and reading location. Escape from the workspace returns to the case study and keeps its modal open. The outer Close closes the case study. Expanded references remain open after a workspace visit.
- Customer replay completed its ten-second sequence and ended with the help route. Account referral scenario and nested contact dialog opened and closed correctly.
- Reduced-motion emulation returned animation `none` for the workspace. Emulation cleared afterward. Temporary viewport overrides reset.
- Standalone reading page opens the same workspace, hides the hero (computed `display: none`, zero height), and restores it and entry focus on Back. Its fresh browser error log was empty.
- Reopened the existing Product Framework modal after closing AI; its own dialog rendered. No AI workspace state leaked into it.

## Failures corrected and limits

- The initial production build rejected a global-only selector in a CSS module. Moved the modal footer/padding state into its owning component. Subsequent final-source build passed.
- Preserved the story DOM on drill-down after identifying that unmounting would lose expanded references and invalidate saved scroll positions.
- Style sweep removed all-caps treatment from the new workspace eyebrow and sample PDF labels.
- Earlier hot-reload log messages came from replacing the JSON shape and creating the new imported component during implementation. Final reload and fresh standalone checks had no new application errors.
- Native drag gestures were not verified: the browser provider does not support drag interception or drag dispatch through its CDP interface. The drag handler is implemented; the keyboard/touch Attach path was exercised through sample send. No claim of a native gesture pass.
- This is a frontend reconstruction with fixed sample conversations. It does not connect to Salesforce, an AI service, or real customer communications. Automated pattern guidance is illustrative, not a compliance or fraud-detection engine.
- No live publication, cross-browser sweep, assistive-technology session or production response-time measurement was performed.

## Evidence and handoff

Screenshots: `discovery-desktop.png`, `workspace-desktop.png`, `workspace-phone.png`, `annotation-preview.png`.

Development server left running at http://localhost:3000/#work, PID 10920, managed session 34400. The exact command points to this checkout's Next.js start-server.js. The case study is open for annotation. No static preview on 8090 was started.

Genesis Exchange is retired/read-only. Fresh active Genesis STATE was read before implementation and closeout; it does not grant ownership of another repository. Two unique change events and the final update are stored in `C:/dev/_handoffs/ai-discovery-20261010/` for a connected coordinator. No coordinator delivery is claimed. No push, merge, deployment, model inference, paid fallback or reset redemption.
