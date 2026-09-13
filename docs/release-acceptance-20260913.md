# Independent final acceptance, September 13, 2026

## ACC-B03 resolution addendum

ACC-B03 was resolved locally in application commit
`5c4efc9958d4baf6d9a619cf4c838fcc76d37872`. The clean Windows Node 20
artifact now contains a self-contained 288-file `out/images` tree, byte-matched
to tracked `images/`, and all 104 `/images` references emitted by the production
application resolve with exact path casing. See
`docs/acc-b03-resolution-20260913.md` and
`docs/reviews/acc-b03-resolution-20260913.json` for the bounded rerun.

This addendum closes only ACC-B03. Ubuntu GitHub Actions did not run because the
authorized work excluded a push, and this machine has neither Docker nor an
installed WSL distribution. ACC-V01 native visibility and ACC-V02 native browser
zoom coverage remain unavailable, along with the other limitations below. No PR,
merge, deployment, or overall publication approval is implied.

**BLOCKED. Do not package, push, merge or deploy this candidate.**

ACC-B03 is a reproduced release-artifact defect: the clean Node 20 export omits
the image tree that the existing local preview supplies through an ignored
junction. ACC-V01/V02 also remain unavailable required coverage, not verified
browser failures. This supersedes the candidate report's readiness suggestion,
without rewriting its historical observations.

## Exact candidate and boundary

- Reviewed/tested repository SHA: `c788fa9dfe1d02f7f69047d0627cac1760ba0f6d`.
- Application SHA: `40377c4746e9262a3524aeef0d05a3ab6f546fb6`; the delta to
  the tested repository SHA contains only STATUS and the candidate report.
- Fresh main, verified with `git ls-remote` at intake and closeout:
  `e6b3672f88e5847d84a854f45ae3d29ca8269952`.
- Branch: `codex/website-visual-system-20260912`, worktree `4b5e`.
- Review boundary was the entire main-to-candidate change set, including the
  previously unpublished dashboard, shared cards/modal surfaces, supporting art,
  Resume/Education and later hero/demo work. Application component, CSS and data
  changes were reviewed against main, not merely against the last hero checkpoint.
  Historical reports and test assets are not relabeled as fresh executions.
- PR URL, PR head SHA and PR base SHA: **none**. `gh pr list --state all --head`
  returned no PR; the remote implementation branch was also absent. Intended
  head/base remain this implementation branch / `main`. No push occurred.
- No source, dependency or workflow changes were made during acceptance.

## Findings and historical dispositions

| ID | Current disposition | Evidence / action |
|---|---|---|
| ACC-B03 | **Confirmed release blocker** | Clean archive of the tested SHA, `npm ci`, then `npm run build` under Node 20.20.2/npm 10.9.9 returns 0 and generates 11 static pages, but `out/images` does not exist. Of 117 unique source asset references, 104 are absent from that export. This inventory includes unused historical media; confirmed rendered members include favicons, the modal identity SVG and WebMD homepage images. Make the production build prepare/export repository-owned images, then assert rendered asset completeness from a clean checkout. |
| ACC-B01 | Resolved for the reported failure and inspected boundaries | At 320px/root text 200%, all five DentalPlans diagrams and Hydra labels fit their containers without internal overflow. The DentalPlans class sweep at 375, 438, 439, 500, 575, 576, 768, 1100 and 1440px found no escaped nodes. Visually inspected the enlarged and 438px hub. Narrow diagrams can become tall and break long words, but the reported content clipping was not reproduced. |
| ACC-B02 | Resolved by the approved presentation change | No motion-control element is rendered; homepage section headings compute to relative positioning. Mobile navigation, modal close/return and index filter access passed. The prior sticky/control overlap mechanism is absent. Dormant sticky CSS/JS remains; this is not acceptance of a future reactivation. |
| ACC-V01 | **Required coverage still unavailable** | Current tab reads `hidden:false`, `visibilityState:visible` both before and after opening a separate tab. This does not exercise native suspension/resumption. Obtain an actual native visibility transition and observe animation/demo clocks; do not replace it with a synthetic event. |
| ACC-V02 | **Required coverage still unavailable** | CSS root-text enlargement was checked. Native browser-chrome 200% zoom was not operated. These are different checks; the historical requirement is not waived. |
| ACC-V03 | Browser/device limitation retained | This review used the in-app Chromium browser. No new Firefox, WebKit, physical mobile or screen-reader run. |
| ACC-V04 | Node version gap partly closed; CI artifact blocker found | A fresh local Node 20 build now passes, in addition to the candidate's reported Node 22.11.0 build. This was Windows, not Ubuntu GitHub Actions. No actual deployment job ran. The Node 20 artifact fails ACC-B03 regardless of successful compilation. |
| ACC-L01 | Baseline tooling limitation retained | Authored-source lint passes freshly. Whole-repository lint was not rerun against generated/archive files; its historical failures are not described as newly fixed. The old source-acceptance script also compares superseded contribution labels and Resume structure, so its blanket equality assertion is stale. Independent preservation checks below replace those specific assertions, not an unrun whole-site gate. |

ACC-B03 is present in the unchanged build setup inherited from main. The preview's
`public/images` is a junction to this checkout's `images/`, excluded by `.gitignore`.
`scripts/setup-dev.mjs` creates it, but only the `dev` command invokes setup.
The SiteGround workflow runs `npm ci` and `npm run build`; neither invokes setup.
The clean checkout reproduces that exact omission. Existing files on SiteGround
may conceal it because clean-slate deletion is disabled; no current live outage is
claimed. A release and its rollback must not depend on an unverified leftover tree.

## Verification actually performed

Browser checks used the existing production export at `http://localhost:3013/`.
The isolated Node 20 artifact was inspected separately; it was not substituted
under the parent's preview and was not represented as the browser-tested export.
Machine-readable observations are in `reviews/release-acceptance-20260913.json`.

- All eight public routes returned HTTP 200. All six standalone stories were
  loaded at 375 and 1440px: one H1, zero horizontal page overflow, four valid
  section anchors, correct back and next-story targets. An actual results-anchor
  click and next-story client navigation passed.
- All 14 homepage project modals opened at 375px with no body overflow or broken
  already-loaded images; Escape returned focus to each exact trigger. Lazy images
  outside the viewport were not falsely counted as failed downloads. Independent
  source-asset requests returned HTTP 200 for all 117 referenced assets locally.
- All six index filters returned matching story tags. The mobile index anchor
  exposed its filter controls; no fixed motion overlay was present.
- Call-center Ready/Busy/Closed header, banner, hero and offers matched the
  registered state table. Highlight, menu, plan destination and return worked.
- Resume disclosure opened and closed by keyboard. A 25-Tab modal focus sweep
  stayed inside the dialog. Reduced motion produced a static hero, zero hero
  animations and visible Product. Browser warning/error log was empty.
- Representative screenshots were inspected for desktop hero/index, mobile
  Resume/Education and normal/enlarged schematic content. This is representative
  visual coverage, not an exhaustive screenshot assertion of every animation frame.
- The export HTML scan found no missing local references, duplicate IDs or image
  elements lacking an alt attribute. Page descriptions and standalone canonical
  URLs were checked. The homepage's lack of canonical/social metadata is baseline,
  not a newly introduced regression. External certificate destinations were
  inventoried but not authenticated or exhaustively visited.
- All 288 original `images/` files matched main (line-ending normalization for
  textual formats). Canonical case-study JSON, case-study data/StudyVisual,
  package/lockfile, Next config and SiteGround workflow matched main. Imported
  SVGs had no script/foreignObject/onload/remote-href flags in the scoped scan.
- Fresh commands passed: `node node_modules/typescript/bin/tsc --noEmit
  --incremental false`; `node node_modules/eslint/bin/eslint.js app components
  hooks lib scripts --no-cache`; `git diff --check e6b3672..HEAD`.
- Clean archive build commands: `npm.cmd exec --yes --package=node@20
  --package=npm@10 -- npm ci`, then the same launcher with `npm run build`.
  Node 20.20.2 and npm 10.9.9 were verified. Compilation, type/lint checks and
  static generation/export passed. Ten HTML files are produced for the build's
  reported 11 generated pages, including the duplicate 404 representations.
- Installation/audit reported seven dependency findings (six high, one critical)
  on the unchanged dependency graph. No automatic fix ran. Exploitability was
  not validated; a static FTP export does not itself deploy a Next server.
  Keep dependency triage explicit rather than claiming a clean security audit.

One exploratory modal sweep initially missed the exit animation and timed out;
waiting for dialog detachment corrected the harness, and the full sweep passed.
The first image inventory used the untracked public junction and then a quoted
non-ASCII Git path; the corrected NUL-delimited blob inventory compared all 288
files. Neither exploratory tooling error is counted as a site failure.

## Publication handoff

1. Fix ACC-B03 in the owning implementation session: prepare/copy the repository
   image tree as part of the production build and add a meaningful clean-export
   asset assertion. Preserve SiteGround FTP, its target directory and
   `dangerous-clean-slate: false`. Do not run a deployment to test asset preparation.
2. Rebuild clean under Node 20, verify all rendered asset references in that
   artifact, then review the rebuilt site. Record the exact new application SHA.
3. Obtain the missing native visibility and browser-zoom evidence. Keep
   Firefox/WebKit/device and dependency-audit limitations explicit. Re-run scoped
   acceptance affected by the fix and reconcile against fresh main.
4. Only after acceptance passes, push the reviewed implementation branch and
   create/update its PR against main. No merge or deployment is authorized here.
5. A later explicit publication task must record the PR head/base and rollback,
   inspect the Node 20 job, verify live routes/assets and SiteGround cache state,
   and preserve/check `/musings/` and the known deep response-time URL under
   `/interaction-design-concepts/`.

Deferred work remains broader copy/BumblebeeMD expansion, Reveal source-image
replacement and dormant-style cleanup. No B edit was applied or skipped here.
Production rollback: `e6b3672f88e5847d84a854f45ae3d29ca8269952`; pre-acceptance
local checkpoint: `c788fa9dfe1d02f7f69047d0627cac1760ba0f6d`.

The existing port 3013 preview was left running. No new server remains. The
isolated archive/build is retained at
`C:/Users/jacob/AppData/Local/Temp/jacobmedley-acceptance-c788fa9-20260913/source`
for reproduction, and Node/npm packages were cached locally without changing the
repository dependency graph. Temporary browser tabs were closed and viewport
override reset. STATUS is written last; the documentation-only local checkpoint
and append-only Genesis update follow. The acceptance lock is released at closeout.

Genesis intake fingerprint was
`7f9ee9a2f6d6ad9a026f6897fc5520db45f3be1349487fe19e86dfc21ec84135`.
Direction event: `20260913T070948Z-7f0164cb280b44d3b42f6d522c15a5b9`.
Fresh acceptance read at 2026-09-13T07:20:37Z returned
`b2385fc52f965ca1bf6f73e4436f84fe00ff2f29d16e66736b6ffc5dd54636ea`, no conflicts.
The shared website card remains coordinator-owned and stale; writing an inbox
record does not prove remote synchronization or that another agent read it.
