# Main-site copy release, September 19, 2026

## Scope and assessment

Jacob requested cleanup, merge, and push of the main site, with dedicated case
studies deferred. The main-site copy is ready to publish. B57 scopes B56's prior
local pass to the homepage, existing modals, experience, education, and metadata.
The 141-row September 17 manifest is historical evidence of the full local pass,
not a statement that all its dedicated-page changes ship here.

Baseline and rollback: `e2995d7fb703d4641562df1903b70adb3dfca3fc`.
Release branch: `codex/main-site-wrapup-20260919`.
Isolated worktree: `X:\website-release-20260919`.
Original dirty checkout and September 17 copy worktree are preserved.

Dedicated-page source, source images, dependencies, lockfile, and workflows are
unchanged from baseline. Homepage navigation and hero lead to in-page sections;
all 14 work examples remain accessible in homepage modals. Direct dedicated URLs
remain available, but are intentionally not promoted from the homepage.

## Journey review

1. **Introduction to selected work: healthy.** The hero states the work and its
   value; “Explore selected work” names the destination. The role animation now
   continues without replaying its introduction. Desktop and mobile screenshots
   show readable copy and controls; reduced-motion braces have proper spacing.
2. **Work examples: healthy for this release.** All 14 modal triggers open content
   and close successfully at 375px without horizontal overflow. Finance shares
   are distinguished from growth rates, the call-center example is explicitly
   illustrative without discount percentages, and variant alt text no longer
   calls an example a winner. The roadmap's longer structure opens on demand.
3. **Experience: healthy, with one content follow-up.** Copy distinguishes
   research leadership, delivery, and business attribution. Tools are described
   as historical usage. B30 remains open: add one specific, source-backed example
   of coaching or developing someone, including the action and resulting change.
   Existing hiring/practice-building copy is not a substitute for that story.
4. **Education and contact: healthy.** Credentials are distinct from membership,
   mobile cards remain legible, and the email link has the correct mailto target.

Screenshots were saved and visually inspected in this task's local artifact
folder: `02-candidate-hero.png`, `03-selected-work.png`, `04-work-modal.png`,
`05-experience-mobile.png`, `06-education-mobile.png`, `07-hero-mobile.png`.
The accompanying local `main-site-review.md` displays the evidence.

## Verification performed

- Windows Node 24.19.0 production export passed; 11 generated pages, eight public
  routes, 288 source-matched exported images, and 104 active image references.
- TypeScript, authored-source ESLint, and `git diff --check` passed.
- Online npm audit returned zero vulnerabilities. No dependency changes.
- All six homepage hash links resolve to elements; zero dedicated-study links.
- All 14 modals opened with nonempty content and zero horizontal overflow at
  375px; all closed. Keyboard entry/Escape and explicit DentalPlans focus return
  were checked. Immediate focus sampling on four other cards was inconclusive;
  this is not a claim of exhaustive focus-return coverage.
- Reduced motion at 320, 375, 768, and 1440px: zero horizontal overflow, static
  hero, zero hero animations.
- Natural hero observation for 40.5 seconds crossed the former 39-second stop:
  shared time wrapped from 35145ms to 10194ms, stayed running, and closing-copy
  opacity remained 1. Product, UX, Systems, IxD, and Human appeared in the sample.
- Final rebuilt page reloaded; Busy/Closed demo controls show the approved
  illustrative wording; roadmap disclosure expands to its complete structure.
- React skill review checked the changed TSX for effect cleanup, semantic
  controls, stable keys, and unnecessary state. No unrelated refactor.

The product-design audit skill kept this review tied to the visible visitor
journey and inspected screenshots. This is scoped acceptance, not full WCAG
conformance. Screen readers, other engines, native 200% zoom, and hidden-tab
behavior were not newly retested; prior release evidence remains historical.
The first install used system Node 22.11 and emitted an engine warning; final
build/checks used bundled Node 24.19. Ubuntu Node 20 CI remains the merge gate.

## Remaining copy decisions

- **Meaningful main-site follow-up:** Jacob's coaching/development example (B30).
- **Optional:** confirm which historically listed tools are current before
  presenting them as current proficiency. Existing historical wording is valid.
- **Deferred:** dedicated case-study copy, entry links, additional outcome/source
  evidence and outstanding proposals from the audit. No new facts inferred.

## Publication and coordination

Local acceptance complete; PR CI, merge, deployment, and live checks pending at
this checkpoint. FTP clean-slate remains false. Post-deploy checks must include
normal cache headers, homepage copy and interaction, all eight site routes, and
the protected legacy pages `/musings/` and
`/interaction-design-concepts/response-times/`.

Preview: port 8090, owned PID 9212, serving this worktree's `out/`.
Lock is held by this session until release closeout.
Selected model/effort verified as GPT-6 Astra/high; no mismatch. Deterministic
checks used; no local inference, paid fallback, resets, or additional spending.
Exact cloud-token/cost telemetry is unavailable; no measured savings claimed.
Genesis fingerprint at 02:15:46 UTC:
`622a6bc86727d627758974244fcc979582a4f8ddc6d93a063907ce2c2b05b092`.
Its pending historical notes were reconciled with Jacob's latest direction;
shared cards remain coordinator-owned. Local records do not prove peer adoption.
