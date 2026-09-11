# Independent release acceptance — September 11, 2026

**BLOCKED.** Six replacement schematics lose content at enlarged text sizes
(ACC-B01), and the fixed motion status obscures headings/navigation (ACC-B02).
Concrete returns are saved in Sol's checkpoints B and A respectively. Actual
hidden-tab behavior and browser UI zoom remain unverified. The final nine-suite
matrix passes, but its assertions do not detect these confirmed visual defects.

Final application candidate: `fcfe2722c9a62e823772a61f89815f528db76071`.
Branch: `codex/website-art-layout-20260910`; worktree: `6fa6`.
Acceptance owner: Codex task `01a09280-f1db-75c2-80b0-2498735ce234`.
Jacob selected GPT-6 Astra / medium; local task metadata verifies that selection,
and the current tool catalog exposes it. No model switch or local inference ran.
Fresh remote main: `e6b3672f88e5847d84a854f45ae3d29ca8269952`.
The final documentation checkpoint does not change the tested application.

This report covers the complete unpublished update, including A/B and the original
Stage 5/6 requests. It does not reopen completed design stages. Source review
covered the main-to-candidate diff, route/data/component/CSS changes and publication
boundaries. The deployment workflow remains Node 20 + SiteGround FTP, with
`dangerous-clean-slate: false`; no publication was performed.

## Findings and scope of acceptance

| ID | Disposition | Concrete finding / next action |
|---|---|---|
| ACC-B01 | RELEASE BLOCKER; returned to Sol checkpoint B | At 320px/root text 200%, the new platform hub is 264px wide inside a 212px frame; flow steps extend below fixed 280px frames. All six supporting schematics have clipped/overlapping labels or steps. Replace fixed-size composition with an appropriate small-container/large-text layout, preserving B47 facts and relationships. |
| ACC-B02 | RELEASE BLOCKER; returned to Sol checkpoint A | Fixed motion status overlaps enlarged sticky headings at 438/439/768/1100px and the Full Stack heading slightly at 1440px. Standalone header navigation and filter context are also affected. Reserve actual control dimensions across routes and label states; see the 90-case sweep and screenshots. |
| ACC-V01 | Required coverage incomplete | Headed and headless Chromium tab activation attempts never produced `document.hidden=true` or a native visibility event. Synthetic visibility tests pass but do not establish actual hidden-tab suspension/resumption. Obtain an observed native transition before acceptance. |
| ACC-V02 | Required coverage incomplete | Root-font enlargement, computed pixel-font doubling, viewport resize and text spacing were exercised. Actual browser UI 200% zoom was not operated. Do not equate CSS enlargement with browser zoom. |
| ACC-V03 | Browser/device limitation | Chrome and Edge were tested; Firefox is installed but supported Computer Use ended because browser URL policy enforcement was unavailable. WebKit runtime and physical devices were unavailable. No Firefox/WebKit/iOS/physical-device pass; native scrollbars, sticky positioning, touch and motion in those environments remain release risks. |
| ACC-V04 | Release-time CI check | Local Node 22.11.0 differs from CI Node 20. Existing Node 20 was not found in inspected runtime locations. Verify the actual Node 20 CI build before deployment acceptance; do not change dependencies to hide this mismatch. |
| ACC-L01 | Baseline tooling failure retained | Exact whole-repository ESLint fails in generated/archived files and next-env.d.ts. Authored-source ESLint passes. No rules were removed or weakened. |

Acceptance fixed the defect class across relevant surfaces: long hero/navigation
and modal labels wrap; modal grid tracks shrink; close targets stay 44px; narrow
icon grids stack; legacy diagram labels wrap; Full Stack captions wrap; enlarged
section/index headings, stats and action labels stay within their containers.
The normal 1191px hero remains one line. Active Full Stack/Resume navigation uses
dark ink. Icon-card badges use existing body ink after a 4.36:1 rendered sample.
No copy, alt text, B edit, claim, source diagram or external resume master changed.

## Request matrix

PASS below means the scoped rendered/source checks recorded here passed. It is
not a release-ready or full-WCAG claim; ACC-B01/B02 and ACC-V01–04 apply to the aggregate.
Evidence keys: AN annotation; DA dashboard; CA featured cards; MO motion/network;
RE refinement; SU surfaces; HO housekeeping; ST sticky; IM imagery; EX supplemental
reflow/focus/direct routes; CO rendered contrast; SO preserved-source comparison.
Exact commands and evidence locations follow the matrix.

| Namespaced ID | Latest applicable disposition | Evidence |
|---|---|---|
| ORIG-01 | PASS: Full Stack lead bottom margin 48px | AN, source |
| ORIG-02 | PASS scoped idle/hover/focus/touch motion; native visibility unverified | MO, RE, CO; ACC-V01 |
| ORIG-03 | PASS: attached Call Center network | MO, RE |
| ORIG-04 | PASS: Personalization rays/rotation and current motion contract | MO, RE |
| ORIG-05 | PASS: clean Viva couple crop | CA, SO |
| ORIG-06 | SUPERSEDED by applied B45 resume introduction | HO, source |
| ORIG-07 | PASS: AI Product Design first left | HO, SO |
| ORIG-08 | PASS: Business Outcomes first right; qualifications preserved | HO, SO |
| ORIG-09 | BLOCKED: normal sticky behavior passes; enlarged status overlaps titles | ST, EX; ACC-B02 |
| ORIG-10 | Completed options/choice preserved; current alternating cards pass | CA, SU |
| ORIG-11 | PASS: DentalPlans anchor, depth and connected system art | CA, RE |
| ORIG-12 | PASS: applied B44 summaries; canonical detail claims preserved | AN, SO, copy register |
| ORIG-13 | PASS: supplied bee/hexes, current 24-hex field | CA, RE, SO |
| ORIG-14 | PASS: rounded clipping and fractional seams | SU, HO |
| ORIG-15 | Sampled contrast PASS; obscured text remains BLOCKED | CO, HO, RE; ACC-B02 |
| ORIG-16 | PASS scoped standalone shared motion | DA, RE; ACC-V01 |
| ORIG-17 | PASS: identity registry and loaded thin glyphs | DA, CA, SO |
| ORIG-18 | PARTIAL: filter behavior passes; fixed status obscures context | DA, ST; ACC-B02 |
| ART-01 | PASS: crossed rays become radial on hover/focus | RE |
| ART-02 | PASS: projected outlined network with attached packets | MO, RE |
| ART-03 | PASS: A/B depth arrangement and motion | RE |
| ART-04 | SUPERSEDED color OPF treatment by CARD-14; original retained | SO, CA |
| ART-05 | PASS: light fields/circles, with later CARD-08 enlargement | CA, RE |
| ART-06 | PASS: green DentalPlans field; later 12-node/20-edge treatment | RE |
| ART-07 | PASS: WebMD mark and expanding health rings | CA, RE |
| ART-08 | SUPERSEDED 78%/30px glass by exact CARD-11 40%/3px | CA, RE |
| ART-09 | PASS: Hydra burgundy identity/current component field | CA, RE |
| ART-10 | SUPERSEDED nine hexes by CARD-13 twenty-four | RE |
| ART-11 | SUPERSEDED mouse blink by CARD-05 maze | RE |
| ART-12 | SUPERSEDED Figma mosaic by alternating content-sized rows | CA |
| CARD-01 | PASS: enlarged Full Stack circles retain idle float | RE |
| CARD-02 | PASS: rays drift at rest and rotate on interaction | RE |
| CARD-03 | PASS: nodes drift with edges and packets attached | MO, RE |
| CARD-04 | PASS: workshop rings continue expanding/depth motion | RE |
| CARD-05 | PASS: 18-path maze, no mouse blink | RE |
| CARD-06 | PASS: A/B triangles continue after depth entry | RE |
| CARD-07 | PASS: all nine Full Stack clipping contours | SU |
| CARD-08 | PASS: featured circle and mark enlarge together | CA, RE |
| CARD-09 | PASS: Hydra components/tokens, no new factual claim | CA, SO |
| CARD-10 | PASS: content-sized horizontal cards, centered artwork | CA |
| CARD-11 | PASS: exactly 40% white and 3px blur | CA, RE |
| CARD-12 | PASS: 12 DP nodes, 20 connections, attached packets | RE |
| CARD-13 | PASS: 24 hexes and rollover field | RE |
| CARD-14 | PASS: original white OPF silhouette, dark CSS treatment | SO, CA |
| CARD-15 | PASS: fractional wave joins | SU |
| CARD-16 | PASS: internal 819/820 boundary | CA, EX |
| CARD-17 | PASS: 16 falling/swaying source-derived leaves | RE, SO |
| CARD-18 | PASS: full-card activation, one focus stop, translating arrows | SU, CA, EX |
| HOUSE-01 | PASS: B45 resume, hierarchy and column balance | HO, SO |
| HOUSE-02 | PASS: shared modal media, rules, buttons and corners | HO, IM, EX |
| HOUSE-03 | PASS: larger dark badges; corrected icon-card contrast | HO, CO |
| HOUSE-04 | PASS: card-based featured heroes and shared controls | HO, EX |
| HOUSE-05 | BLOCKED: replacement inventory/facts pass, enlarged schematics clip | IM, SO; ACC-B01 |
| MODAL-CONTINUOUS | PASS: one continuous artwork field behind hero/header/track | HO, EX |
| MODAL-FULLBLEED | PASS: five conditional full-bleed heroes; remaining nine shared reading surfaces | HO, EX |
| STAGE-05 | BLOCKED: final suite passes but overlay collision remains | ST, EX; ACC-B02 |
| STAGE-06 | BLOCKED: aggregate acceptance has lost content and required coverage gaps | All; ACC-B01/B02, ACC-V01–04 |

## Commands and evidence

All commands run from the stated worktree with installed dependencies. Final
export suites use both `ACCEPTANCE_BASE_URL=http://localhost:3011` and
`PREVIEW_URL=http://localhost:3011`. No browser downloads occurred.

```powershell
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/eslint/bin/eslint.js . --no-cache
node node_modules/eslint/bin/eslint.js app components hooks lib scripts --no-cache
node node_modules/next/dist/bin/next build
git diff --check
node scripts/parity/annotation-acceptance.mjs
node scripts/parity/dashboard-acceptance.mjs
node scripts/parity/stage4-acceptance.mjs
node scripts/parity/stage4-motion-network-acceptance.mjs
node scripts/parity/stage4-refinement-acceptance.mjs
node scripts/parity/stage4-surface-acceptance.mjs
node scripts/parity/housekeeping-acceptance.mjs
node scripts/parity/stage5-sticky-acceptance.mjs
node scripts/parity/imagery-consistency-acceptance.mjs
node scripts/parity/release-source-acceptance.mjs
node scripts/parity/release-extra-acceptance.mjs
node scripts/parity/release-visual-acceptance.mjs
```

Evidence root: `scripts/parity/shots/acceptance-20260911/`. The committed companion
`release-acceptance-20260911.json` binds final source hashes, exact tested SHA,
command outcomes and selected evidence hashes. Screenshots and large JSON outputs
remain local/ignored. Missing local evidence is not replaceable with an old pass.

Development checks used verified localhost:3012: 28-modal targeted housekeeping,
initial/fixed reflow, all-modal resizing/focus, sticky boundary diagnosis and affected
wrapping checks. Initial sticky timeouts passed focused reruns, but recurred on later candidates. The
unmodified complete sticky suite was then repeated against integrated exports.

Failed-first-run records remain: initial overflow, the 101b83f 1191px title regression,
the a2b25c5 4.36:1 badge sample, and probe corrections (CRLF/source-path/max-buffer,
cross-realm assertions, screenshot coordinates, text-transition sampling and focus
return settling). Invalid probe output is not counted as a product pass. Earlier
exports have separate evidence and do not accept the final SHA.

## Measurements, environments and recovery

See the final measurements below.

Source preservation independently compares all 14 projects' protected claims,
288 original image-directory files, four imported SVGs, six protected canonical
files and employment/skills data. Text comparisons normalize Git CRLF/LF; binary
assets compare bytes. No external private source data was read.

External Word/designed-PDF resume masters remain owned by the resume workstream.
The site provides an in-page resume and existing links; no PDF/DOCX download was
added or independently regenerated. Existing external-master handoff status is
not a claim that this acceptance rebuilt those files.

Recovery: preserve the initial checkpoint
`25c748bb93bf6b224c7f249a0b1ae9481c14d6c8`. Use reviewed reverts or an isolated
checkout, preserving later work; do not reset shared history. The final report and
STATUS are saved locally, then one unique Genesis update records the final commit.
Shared Genesis CURRENT/workstream pointers remain coordinator-owned and stale;
the historical malformed provenance event is preserved. Local inference workload
was zero. Estimates are forecasts, not measured cloud savings or allowance balances.
No push, PR, merge, deployment, browser/model download, paid fallback or reset.

### Final measured results

All nine prescribed suites returned exit 0 on `fcfe2722c9a62e823772a61f89815f528db76071`.
The build produced 11 static pages/two route groups. TypeScript and authored-source
ESLint returned 0. Exact whole-repository ESLint returned 1: 328 errors and 8,927
warnings, including 219 errors in `.next`, 12 in `out`, 96 in `_archive` and one in
generated `next-env.d.ts`. `git diff --check` passed. No lint rule was removed.

| Check | Measurement and evidence |
|---|---|
| Featured/card boundaries | 16 viewport widths from 320 through 2560; exact 819/820 internal boundary. `fcfe272/stage4/results.json`. |
| Standalone dashboard | 11 widths including 699/700 and 1099/1100; filtering, live result announcements, keyboard/touch, client navigation, loaded fonts/glyphs and six direct stories. `fcfe272/dashboard/results.json`. |
| Shared modals/resume | 70 modal/viewport cases, seven resume widths, all 14 close targets 44×44px, no broken images or body overflow. Native wheel and thumb drag passed. `fcfe272/housekeeping/results.json`. |
| Continuous/full-bleed field | Five featured heroes preserve both edges, header/footer glass and transparent native track; sampled edge coverage 1.0. This is a sample result, not every-pixel certification. Same housekeeping JSON and native-scrollbar screenshot. |
| Fractional seams | Maximum sampled channel delta 0 at DPR 1, 1.25 and 1.5; 1887×1272/1.25 and 1440×901/1.5 included. `fcfe272/surfaces/results.json`. |
| Normal sticky behavior | All four sections at 320/375/768/1100/1440, forward/backward, anchors, modal stacking/focus return, reduced transitions and standalone assembly passed. Final gate does not check enlarged motion-status intersections. `fcfe272/stage5-sticky/results.json`. |
| Header/control collision | 36 enlarged boundary cases; helper switches at 384/385px actual container width. Confirmed overlap at 438/439/768/1100 and Full Stack at 1440. `fcfe272-boundaries.json`, `fcfe272-header-overlap-768.png`. |
| Defect-class sweep | 90 page/viewport/status cases across all eight public routes, normal and root-200% text. 83 geometric flags; representative homepage/index screenshots confirm hidden text/navigation. `fcfe272-motion-overlap-sweep.json` and index overlap PNGs. ACC-B02 remains blocked. |
| Modal container checks | Exact 447/448/449px content widths verify the 28rem icon-grid switch without overflow (`fcfe272-icon-grid-boundary.json`). Natural widths jump across 900px; isolated component widths 899/900/901 change one column to two with zero overflow (`fcfe272-intro-container-boundary.json`). |
| Supplemental reflow | On `57422f8`: 240 home/index/modal mode-width cases, 182 open-modal resizes, 90 direct-story cases, 14 focus traps/returns and 14 first taps; no page/body overflow in the declared cases. `57422f8-extra/results.json`. |
| Enlarged pixel text | On `57422f8`: 32 homepage/index/modal cases at 320/1440, doubling computed pixel fonts; no measured page/body overflow or listed text clipping. The corrected probe reloads before each modal to avoid doubling the background twice. It does not detect the absolutely positioned schematic loss or fixed-overlay collision. `57422f8-pixeltext.json`. |
| Text contrast | 131 supplemental samples on `57422f8`, including idle/hover/focus. Minimum 4.64:1: Viva eyebrow RGB(66,73,82) over sampled RGB(157,192,188). Featured subtitle minimum 5.74:1, Read label 5.84:1. Navigation samples 4.96–9.22:1. `57422f8-visual/results.json` and `57422f8-contrast-plus/results.json`. |
| Modal text contrast | Final ratios 7.87–11.52:1 across five hero themes; close text 7.89:1; resume body 8.57:1. Housekeeping JSON. |
| Native thumb contrast | Final 15 theme/scroll-position samples: minimum 3.613:1, RGB(48,44,56) against Hydra RGB(161,122,121). Earlier translucent thumb measured 1.942:1. Anti-aliased edge pixels excluded by matching the thumb's solid core. `fcfe272-scrollbar-contrast.json`. |
| Motion | Shared pause sync, stable nonblank GIF freeze, resume, live reduced-preference changes, offscreen suspension and attached edges/packets pass. A 13-observation/5.5-second network trace covers more than two idle cycles for its representative motion. It is not an exhaustive two-cycle recording of every independent effect. Native visibility remained unobserved. |
| Source preservation | Final source check passed: 14 projects, 288 original image-directory files, four imported SVGs, six canonical protected files, employment and skills. `source.json`, exact head `fcfe2722c9a62e823772a61f89815f528db76071`. |

All paths in that table are relative to the stated evidence root. The final matrix
has per-suite UTC timestamps and exit codes in `fcfe272-suite-exits.json`.
Additional diagnostic commands use the local scripts `fcfe272-scrollbar-contrast.mjs`,
`fcfe272-boundaries.mjs`, `final-grid-boundaries-complete.mjs`,
`final-sticky-trace.mjs` and `motion-overlap-sweep.mjs` in that same directory.
Their recorded data are reviewed findings, not a pass inferred from exit 0.

Supplemental reuse is explicit: after `57422f8`, application changes only darkened
the native scrollbar thumb and increased narrow compact-header top padding. The
final build, all nine prescribed suites, source checks, thumb contrast and header
boundaries were rerun. Unaffected supplemental data keep their original SHA; they
are not relabeled as a new run. Layout reflow does not establish visible content
when positioned children or an overlapping fixed layer escape the measurement.

Comprehensive browser matrix: installed Playwright Chromium 149.0.7827.55. Chrome
153.0.8010.37 and Edge 153.0.4234.32 smoke checks on `57422f8` each covered eight
routes and all 14 modals at 375px, with zero recorded errors/overflow. Their limited
scope is distinct from final Chromium acceptance. Firefox 154 was installed but
Computer Use stopped before navigation because Windows browser URL policy control
was unsupported. No workaround controlled Firefox. WebKit/physical devices were
not available. Real browser UI zoom, actual hidden-tab transitions, exhaustive
animation-frame contrast and full WCAG certification are not claimed. Focus styles,
keyboard paths, hit areas and sampled essential scrollbar contrast were checked;
decorative strokes were not treated as essential UI boundaries.

Final export preview: `http://localhost:3011`, owned serve PID 59756. Development
3012 was stopped after targeted checks. No live SiteGround cache, FTP workflow run
or unmanaged production directory is certified by this unpublished acceptance.

Genesis refreshed at 2026-09-11T23:44:38.241368+00:00, fingerprint
`3ff8d643038ecea64f8443fe44c191ba155e8b4b57504b52d99dac6b48c30e15`.
A double-read inventory matches the intake fingerprint after excluding this task's
own direction record: no external Exchange change was observed. The malformed
historical provenance event still prevents the ordinary helper snapshot; it was
preserved. One unique update is written after the final local checkpoint.
