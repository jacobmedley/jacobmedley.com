# Verification: B102 annotation pass

## Result

All 27 annotations and the later spacing/navigation corrections are implemented
locally. The title is now **How not to design an AI assistant**. The hero supplies
the early-2023 setup, and the card supplies the short cautionary hook. The prior
account of enabling streaming after a technical lift is unchanged.

## Checks actually run

- TypeScript: `npx tsc --noEmit` passed after the data and component changes.
- Production: `npm run build` passed compilation, lint, types and 14-page static
  generation/export. Existing asset checks verified 288 images and 104 production
  references. No test suite was added for the copy and layout changes.
- `git diff --check` passed. Only expected implementation, content, audit and
  evidence paths changed.
- All 15 modal stories checked at 1351px: exactly one introduction per modal,
  nonempty role, equal narrative/rail heights, and zero horizontal overflow.
- All 15 checked again at 390px: single-column introductions, role rail below the
  narrative, and zero horizontal overflow.
- AI, One Park and DentalPlans checked at 820px and 320px: zero horizontal
  overflow, stacked introductions and single-column peer cards where applicable.
- AI at the supplied 2183px context: role rail stretched to the narrative height;
  labels rendered at weight 600 with zero bottom margin. The User requirements
  gap measured 16px. Accuracy had 6px above and below; Compliance and Speed had
  6px below.
- Featured summaries measured two or three lines at 1351px. Collection summaries
  measured two or three lines with computed `-webkit-line-clamp: 3`.
- Navigation hero boundary: hero bottom and nav top both 536px at 1351px. After
  scrolling, nav top and modal scroll-root top both 116px. All five links focused
  their headings and left them visible below the bar.
- Active icon and rule used the same darker color, with transparent link
  backgrounds. Pointer hover reached `scaleY(1.8)` on the 3px underline, with an
  180ms transition. Reduced motion set transition duration to zero.
- Reading disclosure is the last story element. Enter and header click toggle
  it; native details state and focus were checked. Fourteen article links remain;
  the chevron is hidden. Under reduced motion, opening settled with full opacity.
- Workspace entry hides the story navigation and hero. Back restores the story,
  sticky navigation and focus on the entry button.
- The finance note is below the metric/value panel, with the year, attribution,
  revenue-growth denominator and per-property launch-time unit retained. The
  former opening paragraph is absent.
- The standalone AI page has the updated title, separate hero setup, one role
  introduction, all 14 article links, and no horizontal overflow at desktop.
- Fresh review-tab browser error logs were empty. Temporary viewport and
  reduced-motion overrides were reset; the extra review tab was closed.
- After the build, the restored development preview and standalone AI page both
  returned HTTP 200. Final screenshots were captured from that restored preview.

## UX report

[Static One Park review](../../../.ux/audits/usability-20261010-193000.html)
contains the four original image assets and four findings. Markdown and index
validation passed using the installed Python 3.10 / PyYAML 6.0.3 runtime.
Offline HTML rendering passed, with embedded evidence and no missing-image
placeholders. Audit and renderer footprint checks passed in their bounded phases.

The images support visible changes in wording, hierarchy, comparison and actions.
They do not prove conversion lift or improved task performance. The diagram's
reading order and the location of terms outside the shown crop remain unverified.
No historical website interactions or assistive-technology tests were performed.

## Preview, publication and rollback

- Preview: http://localhost:3000/#work, Next.js PID 28552, managed session 26816,
  running from C:/dev/jacobmedley.com. No 8090 preview was started.
- Branch: codex/ai-study-main-20261008. Local checkpoint only; no push, merge or
  deployment. The final commit is recorded in Git and the external update event.
- Rollback: e667e8044d51100d751ce8a4feaae8449b9fd48c.
- Copy: B102 applied; no skipped annotations.
- Genesis Exchange is retired/read-only. Unique change/update handoff events are
  kept at C:/dev/_handoffs/annotation-polish-20261010/. No coordinator delivery or
  receipt is claimed.

## Screenshots

- [Hero and navigation](ai-hero-navigation.png)
- [Introduction and spacing](ai-intro-desktop.png)
- [Desktop discovery row](ai-discovery-desktop.png)
- [Tablet discovery](ai-discovery-820.png)
- [Narrow phone discovery](ai-discovery-320.png)
- [One Park research cards](one-park-research-desktop.png)
- [One Park process comparison](one-park-process-desktop.png)
- [Reading disclosure](reading-disclosure.png)

Structured measurements: desktop-introductions.json, phone-introductions.json,
responsive-checks.json. Pattern decisions: [implementation.md](implementation.md).

## Files changed

- .ux/audits/assets/usability-one-park-home-initial.png
- .ux/audits/assets/usability-one-park-home-revised.png
- .ux/audits/assets/usability-one-park-process-initial.png
- .ux/audits/assets/usability-one-park-process-revised.png
- .ux/audits/index.html
- .ux/audits/index.md
- .ux/audits/usability-20261010-193000.html
- .ux/audits/usability-20261010-193000.md
- app/case-studies/case-studies.css
- app/case-studies/how-not-to-launch-an-ai-powered-product/page.tsx
- app/design-system/catalog.ts
- app/visual-system.css
- components/case-studies/AIStudyContent.module.css
- components/case-studies/AIStudyContent.tsx
- components/ui/CaseStudyModal.tsx
- components/ui/QuietPrism.module.css
- components/ui/StudyIntro.module.css
- components/ui/StudyIntro.tsx
- docs/ai-chat-study.json
- docs/copy-register.md
- docs/reviews/annotation-polish-20261010/ai-discovery-320.png
- docs/reviews/annotation-polish-20261010/ai-discovery-820.png
- docs/reviews/annotation-polish-20261010/ai-discovery-desktop.png
- docs/reviews/annotation-polish-20261010/ai-hero-navigation.png
- docs/reviews/annotation-polish-20261010/ai-intro-desktop.png
- docs/reviews/annotation-polish-20261010/desktop-introductions.json
- docs/reviews/annotation-polish-20261010/implementation.md
- docs/reviews/annotation-polish-20261010/one-park-process-desktop.png
- docs/reviews/annotation-polish-20261010/one-park-research-desktop.png
- docs/reviews/annotation-polish-20261010/phone-introductions.json
- docs/reviews/annotation-polish-20261010/reading-disclosure.png
- docs/reviews/annotation-polish-20261010/responsive-checks.json
- docs/reviews/annotation-polish-20261010/verification.md
- docs/STATUS.md
- lib/data/projects.ts

