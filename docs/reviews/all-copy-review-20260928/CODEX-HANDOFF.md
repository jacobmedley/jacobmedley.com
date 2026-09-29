# Codex handoff: whole-site copy implementation

**Editorial review:** complete. **Implementation:** pending. **Deployment:** not authorized.

Repository: `jacobmedley/jacobmedley.com`

Handoff branch: `codex/all-copy-review-20260928`

Reviewed application base: `3973411562db116044a337de7586b236ea306260`

## The request

Jacob authorized a complete copy review, not a WebMD-only pass. He approved the WebMD three-chapter structure and decided to remove tools inventories from individual case studies. The portfolio should position him as a product and design leader and coach, without falsifying his historical hands-on work.

Implement the whole reviewed package. Do not start another global rewrite or ask Jacob to reapprove decisions already made. This is authorization to implement on an isolated development branch, not authorization to merge or deploy.

## Read the complete packet first

All three copy files are in `docs/reviews/all-copy-review-20260928/` on this branch:

- `01-site-and-projects.md`: leadership direction, homepage, online experience, all five featured stories, and all nine supporting project stories.
- `02-reading-pages.md`: collection introduction and all six existing reading pages, including role, scope, collaboration, proof, summaries, and complete prose.
- `03-source-and-interface.md`: all fourteen source narratives, shared UI text, image-description corrections, design-reference wording, and writing-governance clarification.

Read all three before editing. Instructions and evidence-placement notes are not public copy. Do not render them as paragraphs. A section with only an evidence-placement note retains its asset without inventing explanatory prose.

The repository packet is the implementation authority for this revision. A downloadable companion includes structured JSON and validation records. It is not required to access the repository packet. If a companion ever differs, use the registered repository wording and report the discrepancy rather than combining drafts.

## Preflight and coordination

Read `docs/STATUS.md`, `AGENTS.md`, `docs/working-agreement.md`, and `docs/genesis-exchange.md`. Read the current copy register and all three writing-governance files. Jacob's latest direct direction governs where it supersedes an older general rule.

Use an isolated worktree. Check the existing branch, commit, dirty state, and `.tree-lock`; do not remove another session's lock or overwrite uncommitted work. Fetch current remote state, compare it with the reviewed base, and reconcile later changes before application. Preserve unrelated work. A structural conflict stops the overlapping write; an individual content mismatch is logged and skipped while independent work continues.

Read the local Genesis Exchange entry point, current direction, rules, website workstream, and unresolved relevant inbox records as required by `docs/genesis-exchange.md`. Record the change and eventual checkpoint through the supplied append-only helper. Do not edit coordinator-owned shared records.

The reviewing session had connected GitHub access but no access to Jacob's Windows checkout, its lock, or `X:\Genesis Exchange`. It did not refresh or notify that coordination system. The GitHub handoff does not prove that Codex or another agent has read it.

## Register before implementation

The observed register ends at B79. B80 through B87 in the packet are proposed continuation IDs:

| Group | Scope |
| --- | --- |
| B80 | Leadership direction and individual-study tools |
| B81 | Homepage, leadership, online experience, metadata |
| B82 | All five featured case studies |
| B83 | All nine supporting project stories |
| B84 | Reading-page collection and six full narratives |
| B85 | Fourteen source narratives; no additional routes |
| B86 | Shared UI, descriptions, and design-reference copy |
| B87 | Writing-governance clarification |

Freshly check for collisions. Register the complete replacement copy and scope in `docs/copy-register.md` before changing rendered text. If those IDs are occupied, allocate the next available IDs and keep a mapping in the completion record. Do not overwrite a later entry. Preserve B79's factual and privacy rulings. Mark an edit APPLIED only after checking its implementation, not merely because its prose has been written.

## Implementation map

Read exact current files and use actual source anchors. The packet intentionally does not supply brittle line numbers or guessed FIND strings.

- Hero: `components/ui/KineticHeroIdentity.tsx`.
- Homepage introductions: `components/sections/CaseStudiesSection.tsx` and `components/sections/FullStackSection.tsx`.
- Leadership, mentorship, expertise, and employment paragraphs: `components/sections/ResumeSection.tsx`.
- Featured and supporting modal data: `lib/data/projects.ts`.
- Shared modal renderer and stale comment: `components/ui/CaseStudyModal.tsx`.
- Shared featured-card footer: `components/ui/WorkCard.tsx`.
- Reading prose: `docs/case-study-site-copy.json`; it is imported directly by `lib/data/case-studies.ts`.
- Reading-page labels and navigation: `app/case-studies/[slug]/page.tsx`.
- Reading index metadata and shell: `app/case-studies/page.tsx` and the existing `components/case-studies/` consumers.
- Explanatory diagram text: `components/case-studies/StudyVisual.tsx`.
- Demonstration copy: `components/ui/CallCenterDemo.tsx`.
- Site metadata: `app/layout.tsx`.
- Source narratives: `docs/case-studies-sanitized.md`.
- Design-reference descriptions: `app/design-system/DesignSystemExplorer.tsx` and `app/design-system/catalog.ts`.
- Governance: the current writing files and copy register. Write `docs/STATUS.md` last.

The known homepage project IDs are `webmd`, `dentalplans`, `bumblebeemd`, `hydra`, `opfred`, `split-test`, `call-center-ux`, `marketing-auto`, `workshops`, `roadmap`, `personas`, `reveal`, `viva`, and `wrong`.

The supporting card titles are currently authored in `FullStackSection.tsx`, not just the project-data title. Keep those surfaces consistent. Unspecified stable IDs, brand titles, tags, artwork, links, and source metadata remain unchanged unless the packet explicitly updates their displayed prose.

### WebMD structure

Keep its approved card, theme, and two-line artwork identity. Add The Strategy near the top, following the opener, with the Intent, Relevance, and Commerce information cards. Use the existing informational-card visual language, not fabricated metrics.

The current content model supports heading, text, and styled-list blocks, and the renderer has an information-card grid. Reuse those verified facilities rather than inventing enum values or claiming an unsupported prop already exists. Preserve contributions and their accessible semantics.

Group all seven existing desktop/mobile image pairs exactly as approved:

1. Recognize Intent: homepage and entry to search.
2. Support the Decision: plan results, comparison, plan details, and dentist search.
3. Move to Action: dentist details and cart/checkout.

The closing timeline distinguishes the focused site build from subsequent campaign work. Do not create a WebMD reading-page route; this review develops its existing main-site modal.

### Tools removal

The reviewed `CaseStudyModal.tsx` already renders contributions without technologies. Do not report that as a new visible change performed by this implementation. Remove the remaining per-project technologies arrays, adjust the Project type and active consumers as needed, and verify no individual-study tools inventory returns on another surface.

Do not delete the separate site-resume tools list, credential titles, historical employment mechanisms, architecture labels, archives, or technical documentation merely because a term names a tool. Remove obsolete renderer helpers only after checking their remaining uses.

### Reading-page integrity

Retain the existing six slugs and their order:

`one-platform-five-properties`, `building-a-design-function`, `one-customer-journey`, `navigation-beyond-opinion`, `tokens-before-pages`, `a-checkout-decision-with-receipts`.

Keep section IDs `problem`, `approach`, `solution`, and `results`, while using each story's new navigation labels in both desktop and mobile navigation. Keep three at-a-glance records and three proof records per story. Do not force equal paragraph counts.

Platform proof-index order remains:

0. `6 → 2` / `weeks to launch a property`
1. `5` / `properties on one platform`
2. `47%` / `of company revenue growth in one measured year`

The career summary and outcome dashboard dereference those indexes. The launch visualization parses `6 → 2`, so preserve that string, including its spaces. Other outcomes continue to reference the intended proof and at-a-glance records. Keep their qualitative-outcome label. Do not substitute numerical-looking proof for qualitative results.

Keep reconstruction disclaimers on explanatory visuals. Existing categories, themes, visual IDs, route order, and related-story behavior remain unchanged. Update active `source` references where B85 renames a source heading; retain provenance and historical reconciliation references.

### Protected facts and boundaries

Preserve WebMD's focused two-week site design/build and subsequent two-week campaign period. Preserve the reported day-one revenue without inventing an amount or ROI.

Preserve DentalPlans' core framework, branded-property launches, and internal engineering as distinct responsibilities. Preserve the finance-attributed shares and single measured-year context. Do not turn 47% of revenue growth into a sales lift. Keep the six-to-two launch endpoints without adding a derived percentage.

Keep Hydra's two-sprints-to-one and about-one-year statements attached to the system/product context, not One Park's website conversion. Keep BumblebeeMD a DentalPlans property, not an employer or separate venture. Keep one internally built conversational assistant with two deployments in the employment story. Requirements are not all shipped capabilities, and observations are not causal proof.

Keep current-employer publication holds and existing anonymity. Do not inspect private source directories, recover scrubbed material from history, or print removed internal details into public reports. Editing source prose does not clear eight additional stories for publication.

Retain the five approved featured card paragraphs and headlines verbatim. Retain the full slogan where used, remove the duplicate in the later homepage leadership section, and keep artwork identities to two lines. Preserve formal role titles, year-only dates, credentials, contact details, and historical campaign artwork.

## Acceptance work to perform

Run the repository's current checks after reading its scripts. At minimum: TypeScript, focused authored-source lint, production build/static export, and `git diff --check`. Do not assume an old green build validates this revision.

Add or update focused source assertions for all 14 project objects, six reading routes, five unchanged featured cards, tool-inventory removal, WebMD chapter order, complete image retention, corrected credits, canonical slogan, stable proof indexes, and publication-boundary exclusions. Update obsolete text expectations deliberately; do not disable a suite merely because intended copy changed.

Review the running result on desktop and mobile. Inspect all 14 dialogs and all six reading pages, not WebMD alone. Check heading order, clipped text, paragraph spacing, card heights, horizontal overflow, readable navigation labels, image loading, focus/close/return behavior, and the new top strategy block. Check reduced motion and enlarged text around changed copy; this is scoped regression testing, not a claim of a full accessibility certification.

Confirm image identities visually before applying source-context alt-text corrections. Do not rewrite text embedded in historical artwork. Check the call-center demo's five-second preview remains clearly distinct from the original five-minute status feed. Read the rendered copy as a complete set once more to catch duplicated introductions or leftover obsolete paragraphs.

Use existing correct services where possible. Identify a process by PID, full command line, and repository path before changing it. Do not kill a process by port alone.

## Review already completed, and limits

The editorial pass read the current homepage sources, 14 project entries, six reading-page narratives and consumers, all 14 sanitized source narratives, relevant governance, and shared interface/design-reference text through GitHub. It reviewed narrative progression, repetition, voice, attribution, numeric framing, and the new leadership direction.

Local artifact validation passed JSON parsing; project/story counts; unchanged five approved card paragraphs; stable slugs, section IDs, and proof indexes; three summaries/proof records per reading story; WebMD order and contributions; full slogan; and scans for em dashes, stale launch language, invented percentage variants, and restricted identifiers in proposed prose. Lexical flags were reviewed: remaining matches were role nouns, subject-matter terms, or protected proper names, not replacement filler verbs. These checks validate the authored package, not the application.

No website TypeScript, lint, build, browser, image-pixel review, live-site check, or access-gate verification ran in the reviewing environment. No original financial workbook was reaudited. External resume masters, LinkedIn, WordPress articles, archived pages, the separately hosted interaction-design examples, and embedded artwork text were not rewritten. No AI-detector service was used; no detector outcome is promised.

## Completion and deployment boundary

After implementing and verifying, update the copy-register statuses and write `docs/STATUS.md` last. Commit the implementation checkpoint on the development branch. Pushes require the applicable authorization; do not merge or push to main. Main deploys immediately.

Recheck Genesis freshness and record the final checkpoint, commit, changed paths, checks, running previews, rollback reference, and unresolved items through its append-only helper. If unavailable, explicitly report that coordination remains unupdated.

Give Jacob a short completion message: done, not done, and one next action. Put detailed acceptance evidence in the repository. He should not have to reconstruct a status from a long transcript.

The reviewing session changed only this handoff directory on the separate branch. It did not touch an application file, hold or release the Windows tree lock, operate a preview service, dispatch Codex, or deploy. Application rollback reference remains the reviewed base commit. The canonical copy register and STATUS still need the connected implementer's updates.
