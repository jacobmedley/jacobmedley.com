# Stage 1 checkpoint: baseline and design decisions

September 9, 2026. Owner: Jacob; implementer: Codex task 01a084cd.
Stage 1 only. No production UI changes. Jacob selected B with the amendment below. No Stage 2 started.

## Review and decision state

Open [the comparison board](reviews/stage1-20260909/index.html), or use the local
review at `http://localhost:8091/`. Desktop and Narrow layout controls compare
all three using identical WebMD content. The individual [A](reviews/stage1-20260909/a.html),
[B](reviews/stage1-20260909/b.html) and [C](reviews/stage1-20260909/c.html)
specimens also respond to actual viewport width. Review files are under docs,
outside app, public and out; they are not production routes or export inputs.

| Option | Finished direction | Tradeoff |
|---|---|---|
| A | Split art and glass: bounded health field, adjoining quiet copy panel | Clearest division; least visible field behind the text |
| B | Continuous glass band: shared blue field, inset frosted reading panel | Most continuous color; extra inset makes the narrow card taller |
| C | Layered schematic: three offset planes behind the fixed logo | Strongest depth cue; more geometry to tune in the motion stage |

Screenshot pixel sizes are recorded in the [manifest](reviews/stage1-20260909/screenshot-manifest.json); B narrow was captured at 360px, A/C at 375px. The separate layout checks cover actual 320/375/768/1440 viewports.

Screenshots: [A desktop](reviews/stage1-20260909/a-desktop.jpg) / [A narrow](reviews/stage1-20260909/a-narrow.jpg), [B desktop](reviews/stage1-20260909/b-desktop.jpg) / [B narrow](reviews/stage1-20260909/b-narrow.jpg), [C desktop](reviews/stage1-20260909/c-desktop.jpg) / [C narrow](reviews/stage1-20260909/c-narrow.jpg).

Jacob selected **B with the amendment below**. B41 copy approval remains pending.
The specifications below are Stage 1 design decisions for later implementation,
not claims of deployed behavior or acceptance of the new motion implementation. Stage 4 uses
his selected B family and the amendment below. Stage 2 must not silently treat the B41 drafts as approved.

## Jacob’s selection amendment, September 9, 2026

Source: Jacob’s direct reply choosing Option B and specifying gradient, full-card
motion, C schematic layers and global arrow hover behavior. Direction event:
`20260909T162902Z-36446af3f6824f658c7dbe4a93386fe6`.

The [selected B review](reviews/stage1-20260909/selected-b.html) demonstrates two
adjacent cards using the registered WebMD and DentalPlans drafts. Earlier A/B/C
specimens and screenshots remain the original comparison, not the updated B.

- Keep B’s continuous card and inset glass content. Alternate gradient angle and
  hue slightly by stable card identity/order. Never reverse light/dark polarity:
  the darker end stays behind the copy, including below the art on narrow cards.
  Do not change color when hovering or randomly when rendering/filtering.
- Combine B’s field with C’s three schematic planes. Decorative layers belong to
  one full-card backing, extending under the glass, rather than being clipped to
  the logo/art column. Preserve factual diagrams and source logos.
- Idle motion must be slow and clearly perceptible in exposed art, with subtle
  motion visible through glass. Prototype starting values: 10–14s alternating
  plane/drift timelines, 24–32px total travel, at most 3deg total idle rotation.
  Use staggered phases; no flashing, flicker, opacity pulse or abrupt loop reset.
- Dynamic rollover scales the internal field to 1.065, rotates it 1.5deg and opens
  the planes by 14–18px over 550ms, settling over 650ms on exit. Idle and hover
  transforms use nested elements, so pointer exit does not restart the loop.
  The 140px anchor, copy, glass panel and targets remain fixed. Keyboard focus
  has the same response; touch does not require a preparatory tap.
- Glass remains white at alpha .85 minimum. This selected specimen uses 16px
  blur with saturation 110%, superseding the earlier 24px specimen blur for this
  family so underlying motion remains visible. Opaque fallback remains #f7f9fa.
  Later production acceptance must measure actual contrast over all moving phases.
- Global arrow hover rule for both surfaces: translate arrow glyphs 6px from left
  to right over 350ms on their owning interactive target’s hover/focus, then return
  on exit. Preserve each arrow’s direction and label. Use the same simple nudge for
  navigation/Read/CTA arrows, without moving the control, looping, bouncing or
  rotating. Exclude factual diagram arrows, which remain part of protected content.
  Paused/reduced-motion states keep arrows and all decorative layers static.

Verification: [selected B checks](reviews/stage1-20260909/selected-b-checks.json),
[desktop capture](reviews/stage1-20260909/selected-b-desktop.jpg) and
[narrow capture](reviews/stage1-20260909/selected-b-narrow.jpg). Actual 1440/375/320
layouts fit without horizontal overflow, full-card scene extents cover both columns,
and anchors remain 140px. Both summaries exactly match B41. Script syntax and
unique IDs pass. Reduced-motion hover leaves arrows and the field static. Normal
motion remains authored but not visually accepted because this browser has reduced
motion active. Production source has zero diff from b95c330.

This amendment supersedes conflicting initial field extents, amplitude/blur values
and choice-pending statements. Shared pause persistence, reduced motion, offscreen
and hidden-tab rules still apply. The prototype preference is review-only and does
not edit OS settings or the production site. Global production arrow implementation
belongs to Stage 3; the selected card family belongs to Stage 4. B41 approval is
separate; this choice authorizes no factual/copy rewrite or Stage 2 work.

## Reviewed recovery and merged-main reconciliation

Intake matched STATUS: branch `codex/case-study-dashboard-refinement`, HEAD
`a5fa6206ce00a54fd13a0550f8b3552cd42f5dec`, seven modified and eight untracked
files. The assigned worktree had no lock. This task claimed it before writes.
The original checkout and its ownership marker were untouched.

The 15 reviewed files were committed without modifying their content:
`8ee13104b9412ff9c35ce9af1c1ea3abc1c1e9c2`, also named
`checkpoint/dashboard-before-stage1-20260909`. This preserves the dashboard,
acceptance harness and planning documentation, including the historical STATUS.
The original dashboard branch remains at that recovery commit.

GitHub read-only checks independently confirmed main at
`e6b3672f88e5847d84a854f45ae3d29ca8269952`, PR #8 MERGED at
`2026-09-08T23:28:27Z`, and no PR for the dashboard branch. Fetch refreshed
origin/main. `git diff a5fa620 origin/main` was empty: the merge adds ancestry,
not a different source tree.

Only after recovery, created `codex/website-refinement-stage1-20260909` and
rebased the one preserved checkpoint onto origin/main. The replayed commit is
`69a6b220a4c8333d8a9c8a7f20a3c917af0bfd7d`. Full-tree comparison against
8ee1310 returned zero diff. No merge, reset, clean, force push or unrelated
worktree operation occurred. This branch is the reconciled basis for later stages.
The final Stage 1 documentation commit is the commit containing this checkpoint;
STATUS and the unique Genesis update identify the closeout state.

Preserved file set:

- app/case-studies/page.tsx and dashboard.css
- components/case-studies/CareerStats.tsx, StudyIconArt.tsx,
  OutcomeDashboard.tsx and StudyCollection.tsx
- scripts/parity/dashboard-acceptance.mjs
- docs/STATUS.md, copy-register.md, browser-annotation-checkpoint.md,
  website-production-plan.md, case-study-dashboard-acceptance.md,
  annotation-review-20260908.md, website-refinement-plan-20260908.md and
  stage-prompts-20260908.md

The intake 39-source byte fingerprint was
`8BB2352270C82E0FE6C54F172E4B4431BB566DA28FD76DF3D4A1F0056A4F2CEF`.
The closeout byte fingerprint is `3CF659D17ACA0DA2FC98A4E646E8D87DCAF472E94491D6D3506E9E591630488A`. Git source content is unchanged; checkout newline normalization can change raw bytes.
Method: sorted rg paths under app/components/lib/scripts, excluding parity shots;
newline-joined relative-path:uppercase-SHA256, UTF-8, then uppercase SHA256.
Source tree equality after rebase was checked separately, so newline normalization
does not conceal a semantic change. Canonical JSON, study mappings, diagrams,
detail routes, homepage separation and authentication behavior remain intact.

## Icon ownership registry

This registry is the design authority for Stage 3/4. Runtime maps are not edited.
Use stable entity IDs in a shared registry later; do not retain a component
override or use a generic fallback for an unknown study. An unknown ID should
produce no identity glyph and a development diagnostic, not another entity's icon.

| Canonical identity / owner | Reserved glyph or source | Current occurrences / required action |
|---|---|---|
| WebMD project | supplied white WebMD logo | WorkCard currently uses screenshot; replace art in Stage 4 |
| DentalPlans project | fa-tooth | Reserve for featured anchor; no borrowed health tooth in WebMD field |
| BumblebeeMD project | bmd-icon2.svg | Bee-only vector in circular anchor; preserve original colors |
| Hydra project | fa-cubes | Unique featured identity; do not reuse standalone token swatchbook |
| One Park Financial project | fa-building-columns | Unique featured identity; abstract website field, no invented business outcome |
| split-test / Experimentation | fa-vial | Preserve homepage owner in projects and FullStack rendering |
| call-center-ux / Call Center | fa-headset | Preserve homepage owner; remove from standalone journey identity |
| marketing-auto / Personalization | fa-bullseye-arrow | Preserve homepage owner; remove from standalone navigation identity |
| workshops / Facilitation | fa-lightbulb | Preserve rendered override as canonical; retire stale screen-users data assignment |
| roadmap / Planning | fa-mouse-field | Preserve homepage and its own Roadmap Planning contribution |
| personas / Research Synthesis | fa-masks-theater | Preserve homepage identity |
| one-platform-five-properties | fa-layer-group | StudyIconArt platform, career Shared Foundation; same sourced platform may repeat |
| building-a-design-function (visual: practice) | fa-seedling | Replace standalone lightbulb collision |
| one-customer-journey (visual: journey) | fa-route | Replace standalone headset collision; story is not automatically Call Center UX |
| navigation-beyond-opinion (visual: navigation) | fa-compass | Replace standalone bullseye-arrow collision; do not equate with Personalization |
| tokens-before-pages | fa-swatchbook | Preserve standalone tokens; Hydra remains distinct |
| a-checkout-decision-with-receipts (visual: decision) | fa-file-check | Preserve standalone decision |
| Career experience / resume destination | fa-id-card | Replace compass-drafting, which aliases the modal Adobe Suite drafting-compass |
| Finance-attributed growth metric | fa-chart-line | Career metric; reserve to this metric meaning, not an unrelated study |
| Launch-cycle metric | fa-stopwatch | Career metric; source remains platform proof[0] |
| Case Studies section | fa-briefcase | Heading and navigation use the same section identity |
| Full Stack Designer section | fa-toolbox | Heading and navigation use the same section identity |
| Resume section | fa-list-timeline | Heading and navigation use the same section identity |
| Education section | fa-brain-circuit | Heading and navigation use the same section identity |
| Jacob Medley brand | custom jm-icon-full / jm-icon-cropped | Intentional two source variants of one personal mark |
| Wrong, Reveal, Viva | existing photographs/artwork | No new identity glyph; do not borrow another project's glyph |
| Discipline badges / filters | text only | All Work, Product, Systems, UX Research, Leadership, Visual, Brand, Conversion Optimization keep text; no competing category glyph introduced |

The exact six canonical slugs and source relationships are recorded in
[identity-registry.json](reviews/stage1-20260909/identity-registry.json); the visual-kind labels above disambiguate source maps.

**Scope distinction:** identity marks identify a card, project, metric or section.
The modal's labeled contribution/tool icons, device icons and explanatory diagram
symbols have semantic meanings of their own. Repetition of the same Read arrow,
device symbol or named capability does not reassign a study identity. This is an
explicit Stage 1 interpretation, not an assertion that all similarly themed stories
are the same story. Preserve all factual diagrams in this stage and later stages.

The deterministic [source occurrence inventory](reviews/stage1-20260909/icon-occurrences.json)
includes 202 source lines, including comments/modifiers and map literals; this is
not a count of rendered icons. It covers app, components, lib and hooks, including
modal content and navigation. Review findings requiring care in Stage 3:

- fa-compass-drafting and fa-drafting-compass resolve to the same U+F568 glyph.
  Changing only the class alias would not resolve the career/Adobe collision.
- Modal Creative Lead, Creative Concepting and Facilitator currently share
  lightbulb-on; reserve the lightbulb family for Facilitation and make other
  contribution badges text-only when applying identity cleanup. Keep labels.
- WebMD's A/B Testing contribution uses vial as a capability label, not its
  project identity. It can remain a text-only badge to avoid ambiguity.
- DentalPlans' existing factual diagram uses layer-group for Pattern Library and
  headset for Call Center Status. These are labeled explanatory symbols in a
  protected diagram; they are not new entity assignments. Do not change the diagram
  to enforce a card-icon rule. No factual equivalence between studies is inferred.
- Modal solar-system represents both System Design and Integration Strategy;
  drafting-compass represents several Adobe tools, and brackets-curly covers
  CSS and JS. These legacy tool/category ambiguities are inventoried, not silently
  accepted as unique project identities. Use text-only labels if later scope includes
  their cleanup; preserve historical vendor wording until separately authorized.
- Graduation-cap represents the degree, file-certificate the certificate category.
  Repeating a category on multiple credential cards is intentional category identity.

### Actual kit coverage

The existing hosted kit is `644e13edf7`, from app/layout.tsx, loaded after
hydration. No package, paid plan, icon set or font download was added by this task.
The review sheet rendered 91 literal/candidate glyph names: 85 thin glyphs resolve
to Font Awesome 6 Pro at weight 100, two custom Jacob marks at weight 400, and four
brand glyphs are unresolved. Computed glyph strings and font families are saved in
[kit-coverage.json](reviews/stage1-20260909/kit-coverage.json).

All proposed entity replacements and heart-pulse/stethoscope/capsules/dna health
decorations have defined thin glyphs and were visually checked on the sheet.
The unresolved brands are bootstrap, git-alt, laravel and wordpress-simple.
They are modal technology labels, not proposed card identities. Do not claim
complete brand-kit coverage or add a paid fallback. Keep readable labels if a
glyph is unavailable. The font-family/weight and visible rendering were checked;
this is not a complete font-file cmap audit. Refresh kit checks before Stage 3.

## Asset decisions and provenance

All four original SVG hashes match the preceding annotation inventory, recorded in
[source-assets.json](reviews/stage1-20260909/source-assets.json). Direct raster
inspection confirmed the white WebMD wordmark, the full black/white hex bee badge,
the isolated bee and the empty hex outline. ViewBoxes and paths are unchanged.
No external href/src, script, event handler or foreignObject was found by the
bounded static scan. This is source review, not a universal SVG security claim.

- WebMD: webmd_logo_white.svg, viewBox 110 by 25.53. Render at width 110px,
  natural height about 25.53px, inside a 140px dark blue circular anchor. No
  stretching, recoloring or faux-thin paths. The brand field is decorative health
  imagery, not a clinical illustration or result.
- BumblebeeMD: bmd-icon2.svg, viewBox 77 by 88.41. Target height 82px, natural
  width about 71.4px, in a pale circular anchor. Keep white wing fills. bmd-mark.svg
  remains the full hex badge alternative; bmd-hex3.svg is the reference silhouette
  for bounded hex geometry. Neither alternative is needed in the circle's logo plane.
- DentalPlans: thin tooth anchor; three schematic planes, no relabeling of existing
  factual diagrams. The tooth stays sharp while rear planes separate in depth.
- Viva: inspected hero-1, hero-2 and vs-1/2/3. hero-1 contains overlaid headline,
  phone, form and logo. hero-2 is a different surfer. vs-1 is a different family;
  vs-2 a different couple. vs-3 contains the same blanket couple with no text in
  the left 924 by 768 pixels of its 1420 by 768 canvas. The right panel contains
  logo/copy and is excluded. This is a verified clean **region**, not a found raw
  full-color original. Retain the teal treatment; no generative reconstruction.
  Stage 4 may derive a crop from that rectangle, leaving the source unchanged,
  or use a clipped wrapper constrained to it. The review sheet demonstrates this
  region without editing the image. Source dimensions, hashes and region coordinates are in
  [viva-sources.json](reviews/stage1-20260909/viva-sources.json). A raw untoned full photograph remains unavailable in the
  inspected candidates; it is not necessary for the demonstrated same-couple crop.

Production asset import remains Stage 4. Review HTML embeds source images locally;
it does not add them to public or expose the original checkout through a server.

## Copy and placement decisions

B40: verified current ResumeSection arrays. Move the exact B37 body beneath
Design Leadership, then left: AI Product Design, Design Systems, Research and
Measurement; right: Business Outcomes, Conversion and Experimentation. Preserve
the assistant's one-build/two-deployment wording and measured-year qualifications.
Phones read introduction, left column, right column. One copy of B37, no redundant
bullet heading. This placement is already authorized; no new copy rewrite.

B41: exact drafts live in the register, authored before the artifacts. WebMD role
comes from contribution badges and the plan-search/comparison/cart/checkout media.
DentalPlans retains design/front-end ownership, five properties and the per-property
six-to-two launch cycle from B27. BumblebeeMD remains a retired sub-brand, not an
employer or independent venture. Hydra's components and untouched functional code
come from its own source prose. One Park's behavior/heat/scroll evidence comes from
its brief. No new performance number, employer business condition or colleague name.
The summary board compares natural wrapping; no line clamps, ellipses or padding
claims. Detailed prose and standalone canonical JSON stay unchanged.

B42: running action `Pause animations`; user-paused action `Resume animations`.
Use a normal action button with changing text, not changing text plus aria-pressed.
With OS reduced motion, use noninteractive `Animations off: reduced motion` status;
do not offer an override. These strings are recorded in B42 before implementation.

## Shared type, spacing and glass specification

| Token / scope | Stage 1 specification |
|---|---|
| Typeface | Existing urw-form; Manrope then sans-serif fallback. Preserve existing hosted fonts |
| Eyebrow / outcome type / career note | 14px, 400, line-height 1.4–1.5, tracking .03em (at most .06em), Title Case labels; do not title-case prose |
| Badge / filter text | 14px, 400, line-height 1.3; preserve category colors subject to contrast |
| Reading copy | 17px / 1.6 desktop, 16px / 1.6 narrow; 45–60ch target maximum |
| Card heading | 36px desktop, 30px narrow, weight 400, line-height 1.1 |
| Read control | Existing 18px text, 8px 26px padding; minimum 44px hit height |
| Outer contour | One 32px clipping boundary around all media and glass; isolated stacking context |
| Caption glass | White alpha at least .85 over variable artwork; 24px blur, saturate 110%; opaque #f7f9fa fallback |
| Filter/header glass | White alpha .90, blur 24px, saturate 115%; visible bottom border; opaque #faf9f7 fallback |
| Text / secondary ink | #302c38 / #594c62 on shared pale glass; WebMD #18394d / #394d5d |
| Focus | 3px solid #644672 with 3–4px offset; visible outside stable hit areas, never clipped |
| Full Stack paragraph gap | Scoped paragraph margin-bottom 48px at all sizes; retain grid mt-0 below 576 and mt-4 from 576, yielding 48px/64px intentional combined gap |

The option specimens use the same layout basis: 40/60 art/copy at a card-container
width of at least 680px, stacking below 680px. This is a content breakpoint, not
the annotation's 1100px viewport. At 768px viewport the available board card is
681px and fits both panels; at 375/320 it stacks. Stage 4 must retest all five
titles and copies at 679/680 card widths in the real grid before adopting it.
At zoom/text-spacing changes allow natural height and wrapping; no fixed text height.

The glass alpha floor protects reading while the decorative field moves. Stage 2
must measure actual composited worst-case contrast, including focus/selected states,
against the plan's 4.5:1 ordinary text and applicable 3:1 large text/UI targets.
The [deterministic token calculation](reviews/stage1-20260909/contrast-tokens.json) is supporting evidence, not production contrast
acceptance or a WCAG conformance claim. Photos with light copy need a separately
verified dark scrim. Never depend on blur alone for contrast.

## Motion specification for Stage 3

One shared motion contract covers featured, Full Stack, career, outcome and study
cards on both surfaces. Text, badges, panels, controls and hit areas stay still.
Do not animate the factual StudyVisual diagrams; animate a separate decorative
backing if their containing featured card needs idle motion.

| Layer | Idle | Hover / focus |
|---|---|---|
| Photos | 10s alternate scale 1–1.025, maximum 3px translation | Scale at most 1.05 |
| Geometric field | 8s alternate scale 1–1.035, rotation at most 2deg | Internal scale 1.07–1.10, no whole-card transform |
| Focal icon/logo | 140px anchor fixed; logo remains sharp | Logo scale at most 1.025; anchor position stays fixed |
| Perspective planes | Three finite planes, gentle drift at 8–10s | At most 14px lateral / 24px depth separation, rear blur 1–2px; focal plane unblurred |
| Call Center nodes | 12 nodes, 16 explicit edges, 8s phase; each line endpoint shares its node coordinates | Maximum 6px node displacement; no disconnected line animation |
| Personalization fan | 24 evenly distributed rays; 30s full rotation | Outward streak travel 16–28px at 6–8s cycle, opacity floor .15; never flash |
| Bumblebee honeycomb | Three nested levels, at most 42 hex cells | Bounded depth/opacity motion; no recursive generation at runtime |

Interaction easing: cubic-bezier(.16,1,.3,1), 550ms entering, 650ms leaving.
Compose idle, interaction and pattern transforms on separate nested layers.
Do not reset idle timelines on pointer leave. Keyboard focus gives the same art
response; touch needs no first tap and must never delay navigation or scrolling.

Pause applies to every decorative CSS/JS loop and interaction transform on both
surfaces, including hero-arrow and brand drift. Freeze current loop phase; remove
zoom/parallax while paused. Persist a user pause across same-origin navigation in
one shared preference. OS reduced motion wins and starts static; late preference
changes stop animation immediately. Storage failure falls back to in-memory state,
not broken navigation. Hide the pause action when OS policy has made everything
static and expose the B42 status instead. No misleading Resume that does nothing.

Use intersection visibility and document visibility to stop offscreen/hidden-tab
work. Resume at the prior phase; avoid mass animation restarts on filter changes.
Stage 3 acceptance must observe two complete normal-motion cycles, desktop/touch,
focus, enter/leave, pause persistence, reduced motion and client navigation.
This browser session has OS reduced motion; normal-motion acceptance is not claimed.

## Sticky-header specification for Stage 5

Homepage: major owners are #work Case Studies, #full-stack Full Stack Designer,
#resume Resume and #education Education. Hero is separate. Design Leadership,
Experience and Expertise subheads do not become extra bars. Preserve each real
heading/anchor and its expanded stacked icon/title on entry. As the section reaches
the top, use one centered compact presentation: icon inline left, 12px gap, frosted
white backing. Target minimum height 64px desktop / 56px narrow; wrap rather than
truncate, then measure actual height. Transition icon/title transforms over 350ms
with the shared easing, without changing section flow height.

Contain each sticky header through its owning content, yielding at the next section.
Move Education's header out of its current header-only row/column into a section-long
sticky containing block. Do not add overflow to an ancestor that disables sticking.
Keep only one accessible real heading; any compact visual clone is aria-hidden and
contains no focusable control. Reserve the expanded block's space to prevent jumps.

Standalone index: one .cs-browse sticky assembly, top 0, contains the active
outcomes/stories context row followed by the existing discipline filter row. The
normal StudyShell masthead scrolls away. Context starts with Selected Outcomes,
changes at the stories section boundary to its existing heading text, and yields
when .cs-browse ends before the through-line section. Keep semantic source headings
in their sections; context clone is aria-hidden. No second independently sticky
section-heading bar. No extra public navigation or homepage link.

Target context min-height 48px, filter row min-height 64px including padding and
44px targets. The actual assembly height, not 112px hardcoding, sets scroll-margin
and scroll-padding for anchors and focused results. At narrow widths let the context
wrap and keep the filter row horizontally scrollable. Preserve filter selection,
aria-pressed, aria-controls for both regions and the existing polite result count.
Filtering recalculates boundaries; it must not jump the reader back to the hero.

Shared stacking: content 0, sticky assembly 30, existing navigation 40 or its
measured existing higher level, modal backdrop/dialog retain 1050/1055. The skip
link and focused content remain visible. Account for safe-area insets and the
homepage's bottom mobile navigation. Do not introduce a top offset for that bottom
bar. Verify 200% zoom, focus above/below boundaries, forward/backward scroll,
anchors, filter changes and modal focus return. Reduced motion changes state
without animated relocation. Detail-page subsection/sidebar stickiness stays out
of scope and unchanged.

## Verification and limitations

[Deterministic results](reviews/stage1-20260909/check-results.json) and
[closeout GitHub baseline](reviews/stage1-20260909/github-baseline.json) accompany
the viewport, kit and screenshot evidence. The standalone /case-studies/ page was
opened directly in the browser at closeout; its content remains accessible without
authentication. The homepage was also opened successfully in this session.

- Reviewed original 15-file diff and all new files; checkpoint committed before base
  operations. Git diff --check passed. Main source tree equality and post-rebase
  equality passed. Production source/hash preservation is the Stage 1 regression check.
- npx tsc --noEmit and npm run lint pass. Next lint emits its existing deprecation
  notice. No dependency update or new test requirement was introduced.
- Browser inspected all A/B/C compositions, actual 1440/768/375/320 layouts and
  375px container-mode variants. No document/copy horizontal overflow; all anchors
  measure 140px. Evidence JSON records actual widths, not merely requested sizes.
- An initial batch of viewport commands returned stale dimensions; those results
  were rejected. Fresh reads after each viewport change produced the retained data.
  Full-page stitching and clipped captures also produced invalid images; only the
  later individually loaded, full-viewport captures are retained as review evidence.
- All three options carry identical complete WebMD copy and correct 110/25.53 logo
  proportions. Thin health glyphs, BMD vectors and Viva crop inspected visually.
- B40/B42 reviewed, B41 source and style reviewed, metric units preserved. All new
  copy is review-only. Earlier dashboard runtime acceptance remains historical;
  Stage 1 does not accept any of the 18 production refinements as implemented.
- No production rebuild needed for docs-only changes; no new production UI code
  was compiled into a release. Full normal-motion, modal, sticky, measured composite
  contrast and cross-browser acceptance belong to their later stages. No Safari,
  Firefox or physical-device claim. Browser review used the in-app Chromium surface.

## Preview, coordination, recovery and remaining work

The old dev server was absent at intake. Verified no listener before restoring
this worktree's Next dev on loopback 3000. The isolated review directory uses
loopback 8091; 8090/export preview is stopped. Process command lines are checked
again at closeout and saved in [preview-processes.json](reviews/stage1-20260909/preview-processes.json). No unrelated service stopped.
The first Exchange record helper stalled under sandbox restrictions; only its
verified task-specific process was stopped and the same authorized event was
recorded successfully through escalation. No inference service was touched.

Intake Exchange fingerprint b95c8d7c, observed 2026-09-09T06:15:27Z. Latest own
direction event: `20260909T061953Z-6157cbd8624a4faca1fa800e3c36a79d`.
Checkpoint status at 2026-09-09T07:57:35Z: fingerprint
`6fef3e064d31c3223c78ca748f5b22fb75efdecbf5274dcaac6713b7633e731f`.
Seven unresolved events include the new Stage 1 direction. Laptop inference hold,
no automatic reset and website ownership remain honored. CURRENT and the website
card are stale coordinator-owned pointers; update only a unique inbox event.
Final freshness and the actual final commit go in that event. Local disk freshness
does not prove remote sync or another agent's acknowledgement.

Astra/high was recommended and is listed in the host's available model metadata.
This task cannot read or switch its actual selection through the app tools. Work
used deterministic tools and this existing cloud session; zero local jobs/tokens,
zero downloads, paid fallback, resets or additional spending. The 35–60k Stage 1
cloud-token range is the original estimate including review overhead, not measured
usage or savings. No account percentage is treated as a token or dollar balance.

No push, PR, merge or deployment. PR #8's earlier successful deployment is historical;
live edge cache was not independently verified here. Rollback for Stage 1 is
69a6b22 on the reconciled baseline, or the preserved original 8ee1310/tag. Recover
into a separate worktree for review, or revert the Stage 1 docs commit after checking
ownership; do not reset another session's work. Whole-site historical recovery
remains b8aac95d and is not the preferred recovery for these docs-only changes.

Remaining: Jacob reviews B41; separately start Stage 2, Stage 3
and later stages. Stage 4 imports the selected sources and chosen family, Stage 5
implements sticky behavior, Stage 6 performs full acceptance, Stage 7 alone may
package a separate PR when explicitly authorized. This task stops at Stage 1.
