# September 11 morning housekeeping report

The website resume and shared modal design are updated locally. All 14 modals
were checked. The five featured studies now carry their card artwork into the
modal, and the remaining studies share the same reading surface, image treatment,
controls and icon styling. Larger illustration changes remain listed below.

## Completed

| Latest comment | Result |
|---|---|
| Resume layout and hierarchy | Removed Design Leadership. Added **Twenty years. One belief.**, the existing slogan, 18px body with 1.7 line height, a divider, and aligned bullet rows. The grid becomes one column below 900px. |
| Round images and align modal content | Shared rounded shell, lightly tinted reading surface, translucent header/footer, consistent rules, softer media shadows, rounded screenshot corners and a framed intro. Brief images are no longer forced into circles, preserving flow diagrams and roadmap evidence. Explicit circular supporting figures remain circular. |
| Bigger, darker icons | All 50 contribution and 45 technology badges share 20px dark-purple icons and a slightly stronger stroke. Restored 13 missing technology glyph slots and the DP CMS diagram icon using available thin icons; technology labels are unchanged. |
| Match modal hero to card | WebMD, DentalPlans, BumblebeeMD, Hydra and One Park Financial reuse the approved card fields and anchors. Hydra SVG pattern IDs are unique when a card and modal coexist. |
| Replace cartoon imagery | The DentalPlans opening cartoon is replaced by its platform artwork. The larger supporting-illustration replacement is deferred for the next design review; inventory below. No new raster imagery was generated. |

The modal now has a motion control inside its focus trap. It stays synchronized
with the page control and preserves a user pause across openings. Reduced motion
shows the noninteractive status **Motion off: reduced motion**. The original
Personalization GIF is preserved, but displays a captured, nonblank frame while
paused or reduced motion is active. Its animation resumes correctly. Hydra's
animated diagram participates in pause/reduced motion. Closed modal roots are
unobserved instead of accumulating in the page's motion observer.

Copy edits **B45 and B46** were registered before implementation. B40 and B42 are
now explicitly superseded. Employment history, bullet wording, project data,
measurements, source links, real product screenshots and canonical diagrams are
unchanged. External PDF/DOCX resume masters remain separately owned.

## Verification actually run

- Production build and static export: all 11 pages passed.
- Non-incremental TypeScript, targeted ESLint over the six changed TSX components,
  and `git diff --check`: passed.
- New housekeeping suite: **70 modal/viewport combinations** at 320, 375, 768,
  1100 and 1440px; resume additionally checked at 899 and 900px. Zero horizontal
  overflow, broken images or missing badge glyphs. Dialog naming, minimum 44px
  close control, focus containment, footer close and focus return passed.
- Normal-motion checks: synchronized controls, paused featured artwork, a stable
  nonblank GIF frame, resume and live reduced-preference changes passed.
- Development build: **28 modal/viewport combinations**, all 14 studies at 375
  and 1440px, plus the same normal-motion checks, passed on `localhost:3012`.
- All six existing suites passed against the final export: annotation, dashboard,
  Stage 4 responsive layout, motion/network, refinement and surfaces. These cover
  homepage and standalone routes, filters, source details, keyboard/touch emulation,
  card interactions, motion, glyph hydration, seams and previous regression bounds.
- Independent Astra/medium source review passed after fixing removed-root cleanup.
  It verified unchanged bullet/employment data and exact shared-art extraction
  apart from the unique SVG IDs. App-browser inspection confirmed the resume and
  shared modal appearance; saved desktop/phone images support the full inventory.

Sampled foreground/background contrast on the rendered export:

| Surface | Ratio |
|---|---:|
| Resume body | 8.57:1 |
| Modal body | 13.64:1 |
| Close button | 7.89:1 |

The sampler removes text while preserving the rendered background and samples
interior pixels. A first button measurement included its color transition;
disabling that transition during sampling resolved the measurement error.
These are bounded samples, not exhaustive WCAG conformance evidence.

Evidence is gitignored under `scripts/parity/shots/housekeeping/` and
`scripts/parity/shots/housekeeping-dev/`: result JSON, desktop/phone screenshots
and six regression logs. The reproducible harness is
`scripts/parity/housekeeping-acceptance.mjs`.

The first development run used `127.0.0.1`, where the Font Awesome kit returned
HTTP 403. A controlled comparison verified HTTP 200 and loaded glyphs on
`localhost`; acceptance passed there. Use the named localhost preview URL.

## Next design review

1. **Supporting illustrations:** replace the five remaining DentalPlans cartoons
   (`dpprod-modal/rocket.png`, `mvp-one.png` through `mvp-four.png`) with restrained
   illustrations tied to each section. The approved card's connected platform
   artwork establishes the visual direction. Preserve the typed framework and
   factual business-result labels.
2. **Other decorative assets:** review Hydra's `hydra/why.jpg`, A/B Testing's
   `split01-modal/thumb.png`, and the Personas theater-mask lead
   `kitchen-sink/persona-one.webp`. The existing `Persona-Cards.png` and A/B
   control/winner screenshots are stronger evidence candidates. Correct the
   Personas lead's misleading example-card alt when replacing it. Keep originals.
3. **Personalization:** consider a new canonical workflow diagram in the site's
   visual style. The original animation and before/after evidence remain intact.
4. **Stage 5:** major sticky headers, Education's containing wrapper and the
   standalone filter/header stack remain a separate design/behavior change.
5. **Stage 6/7:** full accessibility acceptance and release remain open. This pass
   did not test physical devices, Safari/Firefox, native hidden-tab transitions,
   exhaustive focus paths, 200% text resize, text-spacing overrides or every
   contrast/state combination. No full WCAG claim and no Stage 7 publication.

The shared renderer inventory covers 113 work-image references, 109 unique files,
53 direct image blocks, nine desktop/mobile pairs, nine image rows, 25 split rows,
two progress diagrams, two icon grids, one metric grid and one structured card.
Actual screenshots and source diagrams should stay distinct from decorative art.

## Models and coordination

Recommendation was Astra/high for coordination; no unsupported controller switch
was claimed. Actual delegated tasks used **Sol/medium** for the modal inventory,
**Luna/medium** for the Genesis route audit and **Astra/medium** for independent
source acceptance, including bounded rechecks. Root remained the only writer.

Desktop Qwen3.5 9B was installed and reachable with no loaded model. The approved
website runner profile points to `C:/dev/jacobmedley.com`, rather than this owning
worktree; live lane ownership could not be certified. No job was submitted, no
lock removed and no profile changed. The unresolved laptop inference hold was
honored. Local inference jobs/tokens: **0 / 0**. The 35–70k cloud-token forecast
was an estimate including retries/review, not measured usage or demonstrated
savings. No paid fallback, model download, reset, new dependency or extra spending.

Fresh Exchange intake and acceptance reads were completed. The existing malformed
Stage 3 provenance record still blocks `exchange.py status`; it was preserved.
Manual matching fingerprint at 2026-09-11T05:35:06.257087+00:00:
`5766a449c6852c9d2c58b7e662cd648be6ee03424de395a039694da86e7993c9`.
Direction event: `20260911T050808Z-d9af3670ffc34ff6bf7078f84544f9c6`.
The final append-only update records the actual checkpoint commit and preview.
No remote synchronization or other-agent acknowledgement is asserted.

## Local handoff

Owning worktree: `C:/Users/jacob/.codex/worktrees/6fa6/jacobmedley.com`.
Branch: `codex/website-art-layout-20260910`. Base and rollback:
`30b58ce64f899466edb5d2298045bdb79ffce3a7`. The checkpoint containing this report is
identified by the final handoff and Genesis update; restore only after checking
ownership, preferably with an isolated checkout or reviewed revert.

Eleven changed files: `app/globals.css`; `components/sections/ResumeSection.tsx`;
`components/ui/CaseStudyModal.tsx`, `MotionControls.tsx`, `WorkCard.tsx`,
`FeaturedArtwork.tsx` (new), `AnimatedStudyImage.tsx` (new);
`scripts/parity/housekeeping-acceptance.mjs` (new); `docs/copy-register.md`;
this report; and `docs/STATUS.md` (written last).

Final production-export preview: `http://localhost:3011/#resume`, PID **58204**,
serving this worktree's `out/`. Temporary development preview PID **4056**, port
3012, is stopped after acceptance. Other previews/worktrees are preserved.
Clean committed tree and owned-lock release are verified at final handoff.
**No push, PR, merge or deployment.**

## Follow-up: continuous modal heroes

Jacob's subsequent BumblebeeMD annotation supersedes the separate artwork tile
from `308993598e5e496a6e2d21fffeecad62ba316e84`. The five featured brand modals
(WebMD, DentalPlans, BumblebeeMD, Hydra and One Park Financial) now carry their
card's branded field and motion across the entire intro. The logo sits on the
left and the original brief, contributions and technologies sit in a right-side
glass panel. Below the 900px modal-container breakpoint, both stack over the same
field. The panel uses 40% white and 3px backdrop blur. Copy and evidence remain
unchanged; the other nine modal intros retain their existing layouts.

The production check caught the CSS optimizer dropping the standard blur
declaration when it preceded its WebKit version. Corrected declaration order
restores computed `blur(3px)` in the hero and shared modal header/footer.

Verification: production build/export (11 pages), TypeScript, targeted ESLint and
diff checks passed. The extended housekeeping harness passed 42 modal/viewport
combinations at 375, 1100 and 1440px, plus three resume widths. It checks the field
covering the hero, right-side/stacked placement, actual glass/blur styles, images,
glyphs, overflow, keyboard close/focus return and synchronized motion controls.
Pause/resume, a stable nonblank frozen GIF and live reduced-motion preference
changes passed. No page errors or recorded failures. Desktop in-app and saved
phone screenshots were visually reviewed. Evidence:
`scripts/parity/shots/modal-hero/` (gitignored).

Sampled featured-hero body contrast: WebMD **8.56:1**, DentalPlans **8.03:1**,
BumblebeeMD **11.52:1**, Hydra **8.68:1**, One Park Financial **9.72:1**.
These are rendered samples, not every animation frame or a full accessibility
claim. The earlier six regression suites were not repeated for this scoped
follow-up; browser/device limitations and larger review items above remain open.

Five changed files: `components/ui/CaseStudyModal.tsx`, `app/globals.css`,
`scripts/parity/housekeeping-acceptance.mjs`, this report and `docs/STATUS.md`
(written last). Same branch/worktree; rollback is `3089935`. The follow-up commit
is identified in the final handoff and unique Genesis update. No delegation or
local inference was needed for this change.

Fresh Exchange records were read. The historical malformed Stage 3 event still
prevents the status helper from completing; it was preserved. Manual matching
fingerprint at 2026-09-11T06:32:30.519591+00:00:
`359fc0f29335557414041c1de5ef309b04f57619e7c9a9d04a20b2309e6d5c43`.
Direction event: `20260911T062329Z-a4c804eaf91e4fceacf5bbe92db3d936`.

Current production-export preview supersedes the PID above: **36592**, serving
this worktree's `out/` at `http://localhost:3011/#work`. The updated BumblebeeMD
modal is left open in the review tab. Previous owned preview processes were
stopped after exact command/path verification. No push, PR, merge or deployment.

## Follow-up: true full bleed through the native scrollbar

Jacob authorized this only if the right edge could remain continuous. It can:
the five featured modal backgrounds now paint across the shell behind the native
scroll viewport and translucent header/footer. A transparent native scrollbar
track reveals that same field. The artwork is not duplicated or cropped at the
gutter, and the scrollbar is not hidden or replaced with a custom control.

The field follows the intro's scroll position; a ResizeObserver measures its
height from the header and hero, including font/reflow changes. The callback ref
cleans up its observer and scroll listener. The legacy container inset is removed
for these modals; study content retains its reading padding. The original copy,
images, other nine modal layouts, pause control and reduced motion are preserved.
Bee hover scaling/rotation still applies across the full field.

Production build/export (11 pages), TypeScript, targeted ESLint and diff checks
passed. Development completed 42 modal/viewport combinations. Production completed
70 layout combinations at 320, 375, 768, 1100 and 1440px, covering all fourteen
modals. All 25 featured combinations had full-width header/body geometry, a real
10px native gutter, correct glass styles, aligned field/hero bottoms and 100%
coverage of sampled right-edge pixels in the diagnostic solid-field probe.
Images, glyphs, overflow, close controls and focus return checks passed.

The first drag check exposed Playwright's default scrollbar-hiding flag. The
harness now disables it. A subsequent timing failure came from grabbing the thumb
before the native compositor painted its reset position; awaiting the aligned
field and a screenshot fixed the test. The scoped rerun passed wheel scrolling,
native thumb dragging, field alignment, synchronized pause/resume, stable nonblank
GIF freezing and live reduced-motion changes. The application build did not change
between the layout run and this rerun. Aggregate checks validated both records;
the earlier incomplete run remains available rather than being relabeled.

Evidence (gitignored): `scripts/parity/shots/full-bleed/acceptance.json`, its source
`results.json` and screenshots; `scripts/parity/shots/full-bleed-motion/results.json`;
and `scripts/parity/shots/full-bleed-dev/`. Desktop in-app and phone/scrolled
screenshots were visually reviewed. Featured body contrast samples: WebMD 8.56:1,
DentalPlans 7.87:1, BumblebeeMD 11.52:1, Hydra 8.79:1, OPF 8.44:1. This is Windows
Chromium acceptance, not every browser, physical device, animation frame or a full
WCAG claim. Firefox/WebKit runtimes were absent; none were downloaded.

Five changed files: `app/globals.css`, `components/ui/CaseStudyModal.tsx`,
`scripts/parity/housekeeping-acceptance.mjs`, this report and `docs/STATUS.md`
(written last). No B edits or copy changes. Same branch/worktree; rollback:
`c971e738b38fce8e3c0d8a84e55dccdd9886df30`. Local commit is identified in the final
handoff and Genesis event. Sol/medium was recommended; no controller switch,
delegation, local inference or extra spending occurred.

Fresh Exchange intake and checkpoint reads completed; latest direction event:
`20260911T114858Z-a81decaec5b74bfbba93efdd1b47bf03`. The historical malformed Stage 3
event still blocks the helper. Manual fingerprint at
2026-09-11T12:01:12.032454+00:00:
`c40fc90a966a8cbbe6468fac59459107ee6d172e5d5bd42065b7d0c0f06c87f8`.
The unique final update carries the checkpoint; no shared coordinator files changed.

Current export preview: `http://localhost:3011/#work`, PID **56584**, serving this
worktree's `out/`. This supersedes the prior preview PID. The temporary development
preview on 3012 is stopped. The full-bleed BumblebeeMD modal is open for review.
No push, PR, merge or deployment. Earlier larger design/release work remains open.
