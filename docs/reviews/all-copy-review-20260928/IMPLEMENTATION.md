# Reviewed copy implementation — September 29, 2026

**Complete locally. Not pushed, merged, or deployed.** B80–B87 are APPLIED in the
copy register. The four original review documents remain unchanged as the record
of the approved package.

## Authority and checkpoint

- Owner: Jacob's website workstream; implementation session `codex-reviewed-copy-20260929`.
- Worktree: `C:\Users\jacob\.codex\worktrees\reviewed-copy\jacobmedley.com`.
- Branch: `codex/reviewed-copy-implementation-20260929`.
- Review packet: `49d92c0ce18bf2b79ba8e16713e6cd5d40bf04a4`.
- Reviewed application base and rollback point: `3973411562db116044a337de7586b236ea306260`.
- Both remote references were fetched at intake and again before acceptance.
  `origin/main` still matched the reviewed base; there were no later application
  changes to reconcile.
- This record, the acceptance evidence, and STATUS are committed together. The
  checkpoint is the commit containing this record on the branch above; use
  `git log -1 --format=fuller` in this worktree for its exact ID. The final chat
  handoff also records that ID, avoiding a self-referential commit hash here.
- The original checkout and other worktrees were preserved. The implementation
  lock is released at closeout. The worktree remains available for review.

The user confirmed GPT-6 Astra / high. That confirmation was sufficient under the
hard model check; independent model/effort and token telemetry were unavailable.
The intake cloud-token estimate was 20k–40k, not a measured balance or savings
claim. No local inference, paid API route, or added spending was used. Exact
copy transformations and assertions used deterministic tools.

## Applied package

All three accompanying copy files were read before implementation. The complete
replacement copy was first registered under the unoccupied B80–B87 IDs, then
applied to the site. No edits were skipped and no new global rewrite was performed.

| Group | Applied scope |
| --- | --- |
| B80 | Leadership direction; removed all 14 remaining per-project technology inventories and the obsolete type field; retained the separate resume tools list. The modal renderer already omitted inventories. |
| B81 | Visible hero role, hero and section introductions, four leadership tiles, expertise and all four published employment narratives; metadata description. |
| B82 | All five featured narratives, contributions, evidence placement, WebMD strategy and three chapters, DentalPlans context and credits, Hydra scope and result. |
| B83 | All nine supporting narratives and reviewed card titles, including removal of the duplicate Reveal introduction and redundant Wrong list. |
| B84 | Collection introduction and all six complete reading pages, role/scope/collaboration, summaries, proof labels, section labels and prose. |
| B85 | All 14 source narratives, with an explicit statement that editorial replacement does not grant publication permission. |
| B86 | Card footer, reading labels/navigation, two diagram captions, demo copy, visually confirmed image descriptions, parser comment, and current design-reference wording. |
| B87 | Dated clarifications appended to all three writing-governance files. Historical decisions remain intact. |

### Preserved decisions and facts

- B79 is unchanged, including the current-employer publication hold and existing
  anonymity. Six reading routes remain six; eight additional source stories were
  not exposed as new routes. The unrelated unpublished decision-system proposal
  was not brought into this worktree.
- All five approved featured headlines, paragraphs, themes and project identities
  are unchanged. The canonical full slogan remains on the hero and reading footer;
  its redundant appearance in the later homepage leadership section was removed.
- WebMD retains seven desktop/mobile image pairs in the reviewed grouping and
  separates the two-week site build from the following campaign/launch work.
- DentalPlans retains the measured-year framing, 47%/27%/20% figures, six-to-two
  launch timing, finance attribution, and separate framework/property/API credits.
  No derived percentages, ROI, invented test winners, or new outcome claims were added.
- Formal employment titles, year-only dates, education, contact details, the
  resume tools list, proof indexes, explanatory diagrams, and original campaign
  pixels were retained. Every original project image reference is still present.

### Findings resolved during implementation

1. Visual identity review found two further BumblebeeMD assets described as
   homepages. B86 records the additional descriptions **before application**:
   image treatments and plan-selection boxes. The class sweep found no remaining
   `BumblebeeMD Homepage Desktop` descriptions. No image was edited.
2. The retained Hydra mark exceeded its small container by 54px at a 320px
   viewport with 200% root font size. A constrained grid track and maximum mark
   width corrected that local layout problem.
3. Actual text-only enlargement exposed reading-page long-word and proof-column
   overflow. Scoped CSS now permits wrapping, constrains grid/flex children, and
   lets navigation links wrap without splitting their words. Increased anchor
   clearance keeps the section heading below the enlarged sticky navigation.

## Verification actually performed

| Check | Result |
| --- | --- |
| `npx tsc --noEmit --incremental false` | Passed. |
| ESLint on every changed authored TS/TSX file | Passed, invoked with separate file arguments. |
| `npm run build` | Passed on the final source: Next 15.5.25, 13 generated pages, static export. |
| Export asset verification in the build | 288 exported images match tracked originals; 104 active production references verified. |
| `node scripts/verify-reviewed-copy.mjs` | Nine focused groups pass: all 14 projects, six routes, 14 source narratives, protected cards/facts, full image retention, inventories, chapter order, credits, slogan and publication boundaries. |
| `node scripts/verify-design-system.mjs` | 50 patterns, 166 examples, 36 tokens; no errors. |
| `git diff --check` | Passed. |
| React source review | Changed TSX reviewed with the React best-practices skill; no new effects, data fetching, or render-state machinery introduced by the copy application. |

The source assertions compare with the reconciled application base, not an older
copy freeze. Historical release scripts that intentionally pin earlier wording
were not disabled or edited. The dedicated new acceptance script covers this
revision's intended replacements.

### Browser matrix

Used the in-app Chromium browser against the **production export** at
`http://localhost:8090/`. Measured CSS widths rather than assuming viewport
settings equaled layout width.

- All **14 dialogs** at 1440px, 390px, and 320px with 200% root font size:
  42 completed combinations. Checked overflow, visible text clipping, image
  decode, heading/content sequence, retained diagrams, initial focus, Escape
  dismissal, and focus return. Final Hydra rerun replaces its initial failure.
- All **six reading pages** at 1440px, 390px, and 320px with 200% root font size:
  18 combinations. Checked one H1, four valid section anchors, full authored
  labels, next-story links, overflow, paragraph layout, and result placement.
- An additional pass doubled **actual computed text sizes** on all six reading
  pages at 390px, including their px-based fonts. Body prose measured 32px. All
  six have zero horizontal overflow, no detected text clipping, and clear anchor
  targets. Final mobile navigation was rechecked after its fitting adjustment.
- Reviewed screenshots of every dialog and reading page on desktop and mobile,
  including section positions and final content. Reread the complete rendered
  dialog/reading text and expanded employment copy. No duplicate introductions
  or obsolete narrative paragraphs remained.
- Homepage at 1440px, 390px, and 320px/200% root text: no horizontal overflow or
  detected clipped copy. All four employment disclosures opened, and the changed
  leadership/experience sections were inspected on desktop and mobile.
- The demo's Ready, Busy and Closed states, new Busy heading, Highlight switch,
  mobile menu and plan-preview destination all worked. The observed automatic
  cycle was **5,008ms**, distinct from the stated historical five-minute feed.
  Reduced motion held Ready for more than 18 seconds and displayed manual-state
  guidance. The reduced-motion hero was static, with no running animations and
  readable role/closing copy.
- Keyboard Enter opened WebMD; Tab remained inside; clicking Close returned focus
  to its trigger. Both close paths were exercised in addition to the dialog matrix.
- Collection filters returned 6/3/3/2/3/1 stories for All Work/Product/Systems/
  UX Research/Leadership/Brand, without overflow. The design-reference iframe
  located the live hero and showed the new role and current explanatory wording.

### Evidence and execution notes

- [Source assertions](implementation-evidence/source-results.json)
- [Browser measurements and observations](implementation-evidence/browser-results.json)
- [Desktop WebMD](implementation-evidence/webmd-final-desktop.png)
- [Mobile WebMD strategy](implementation-evidence/webmd-final-mobile.png)
- [Reduced-motion homepage](implementation-evidence/home-desktop-reduced.png)
- [Reading page with actual enlarged text](implementation-evidence/actual-enlarged-building-a-design-function.png)

The reusable browser adapter is `scripts/parity/reviewed-copy-acceptance.mjs`.
It accepts the existing browser handles and never launches a separate browser.
Full local screenshots/contact sheets and rendered-text records remain in the
ignored `scripts/parity/shots/reviewed-copy-20260929/` directory.

One **MutationObserver TypeError** appeared during the long-lived browser session
around design-reference navigation. A fresh tab covering the design reference,
WebMD open/close and a reading page produced no console warnings/errors. The
cause is unconfirmed; no related functional failure was observed. The original
error remains in the evidence rather than being reported as a clean console run.

An intermediate export encountered Windows EBUSY because this session's Python
preview held `out/` as its working directory. Its PID and full worktree command
were verified before stopping it; the rebuild passed, and the preview was
restarted. No unrelated process was stopped. Numeric-loopback preview testing
was moved to `localhost` so the licensed icon kit could load on its permitted
development hostname. An early lint shell-argument mistake and browser timing
timeouts were corrected; they were not application failures.

The first managed worktree creation hit Windows filename limits. Repository-local
`core.longpaths=true` allowed the managed worktree to be created successfully.
Node v22.11.0 produced an install-time eslint-visitor-keys engine warning; authored
lint, TypeScript and the production build nevertheless completed successfully.

## Preview, limitations and next action

- Running preview: Python PID **64316**, port **8090**, bound to 127.0.0.1,
  serving this worktree's `out/`. Use **http://localhost:8090/** for correct icons.
- Exact command: `C:\Users\jacob\AppData\Local\Programs\Python\Python311\python.exe -m http.server 8090 --bind 127.0.0.1 --directory C:\Users\jacob\.codex\worktrees\reviewed-copy\jacobmedley.com\out`.
- No push, PR, main merge, deployment, live-site verification or access-gate audit
  occurred. The original financial workbook was not reaudited. External resume
  masters, LinkedIn, articles, archives, separately hosted examples, historical
  artwork text and private source directories were not changed.
- These are scoped local regression checks, not a full accessibility certification
  or cross-browser/device audit. No AI-detector service was used.
- No reviewed-package implementation remains outstanding. The transient console
  observation above is the only unconfirmed technical observation from acceptance.
- **Next action:** Jacob reviews the local preview and this checkpoint. Publishing
  requires a separate explicit request and the repository's publication checks.

## Coordination handoff — archive remains unupdated

Unique local change event: `website-copy-change-20260929-7d870a86`.
Unique local completion event: `website-copy-update-20260929-1b64739c`.
Actor: `codex-reviewed-copy-20260929`; scope: website.
Source: Jacob's request in this chat to implement the complete reviewed package
in isolation, register first, preserve settled facts, verify, and not merge/deploy.

Fresh reads included the current Genesis STATE, model-routing policy, retired
Exchange entry point/rules/direction/website records, and relevant historical
inbox records. At acceptance, STATE still explicitly marked Genesis Exchange
retired and read-only. The final pre-closeout local archive observation was
2026-09-29T05:02:08Z; fingerprint
`62994af71a182a648eaa7bf10b1da07e5402947ea3e9e23ad9ad21036fb0f7f4`, conflicts `[]`.

Jacob's current instruction forbids writing the retired archive. Therefore its
append-only record helper was **not** used to write either event. Shared
coordination remains unupdated; this repository record does not notify another
agent or prove another machine has read it. The archive cannot establish current
cross-project direction. The owning website branch and this report are the
implementation authority for the completed checkpoint.

A connected coordinator may record the local checkpoint under the current
Genesis process using the branch/commit containing this record, changed paths
from `git show --stat`, B80–B87 applied status, checks and limits above, preview
PID/command, no-deployment state and rollback base. Do not revive the retired
Exchange or edit coordinator-owned records merely to acknowledge this work.
