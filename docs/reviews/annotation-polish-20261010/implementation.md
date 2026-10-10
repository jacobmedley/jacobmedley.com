# October 10 annotation pass

## Authority and scope

Jacob's comments 1–27 authorize this local implementation. The later typography
reply supersedes the fixed 1.2rem / 1.45rem instructions: tighten headline and
paragraph leading by about 10%. A subsequent screenshot requested space between
User requirements and the cards. B102 contains the copy and pattern mapping.
Baseline: e667e8044d51100d751ce8a4feaae8449b9fd48c on
codex/ai-study-main-20261008. No publication authorized.

## Pattern mapping

| Annotation | Implementation |
|---|---|
| 1 | Existing ExperienceDisclosure at the end of the AI story, with its plus, native details semantics and reduced-motion support. Chevron hidden for this use. |
| 2 | Three peer discovery cards on desktop; stack below the existing 48rem content breakpoint. |
| 3, 9–13, 23 | Shared StudyIntro in all 15 modal stories. Narrative and metadata use a 2:1 grid; role labels are weight 600 with no bottom margin; DentalPlans angle bullets; vertical rule fades and stretches with the taller column. |
| 4–5, follow-up | Ordinary modal paragraph leading 1.5 to 1.35; hero headings 1.2 to 1.08; content headings 1.25 to 1.125; AI large lead 1.4 to 1.26. Font sizes unchanged. Standalone AI paragraph leading 1.65 to 1.485. |
| 6–8 | Need-card headings have 6px below; Accuracy also has 6px above. |
| 14–17 | Explicit AI responsibilities, User First theme, cautionary card title and short hook, separate early-2023 hero setup. |
| 18–21 | Requested One Park, BumblebeeMD and DentalPlans headlines; shorter featured summaries and a three-line display limit on featured and collection cards. |
| 22 | Finance attribution and denominator moved into one note below the metrics and value cards. |
| 24 | Three icon cards explain behavioral evidence, heuristic evaluation and design for skimming. |
| 25–27 | Before/after commentary grounded in four original One Park images and Jacob's account. Homepage actions already existed; the process module gains a CTA. No conversion lift inferred. |
| Spacing screenshot | 1rem below User requirements; stronger selector prevents the shared heading reset from removing the gap. |
| Navigation screenshot | Navigation moves directly under the hero and remains sticky. Active icon and rule darken; no active/hover fill. Hover and keyboard focus grow the 3px rule upward to 5.4px without shifting layout. Reduced motion removes the animation. Need cards retain a 2.5rem gap before Discovery. |

## Responsive decisions

The 48rem and 30rem breakpoints measure available content width, not the annotation
viewport. The intro first becomes a single narrative column with the rail below;
its metadata fields then stack on narrow phones. One Park's three-card rows use
the same 48rem content threshold. Existing featured-card summaries remain hidden
at 820px and below; their three-line limit applies wherever they are displayed.
Collection-card summaries remain visible and are limited to three lines.

The modal hero keeps each project's first brief paragraph. Its remaining brief
paragraphs move to the introduction alongside My role. Reveal has one new bridge
sentence registered in B102. Collaborators appear only where the existing source
identifies them. These labels describe responsibilities, not invented job titles.

## Evidence and limits

The UX plugin's static review covers the original homepage and process-module
pairs. The report identifies three historical issues and one unverified reading-
order question in the revised diagram. It does not establish live behavior,
contrast compliance, conversion outcomes or the location of terms outside a crop.
Report: .ux/audits/usability-20261010-193000.md and its offline HTML companion.

The initial Python environments lacked PyYAML. The existing Python 3.10 runtime
has the required 6.0.3 package; report/index validation and rendering succeeded
there. No dependency installed. Audit and renderer footprint checks passed before
application edits and against a fresh renderer baseline respectively.

Genesis STATE was freshly read at intake and before dependent implementation.
The Exchange remains retired/read-only. Unique change events are retained in
C:/dev/_handoffs/annotation-polish-20261010/. No coordinator receipt is claimed.
