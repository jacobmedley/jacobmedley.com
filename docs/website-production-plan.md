# JacobMedley.com: brand alignment and results dashboard

## Current approval and implementation status

Approved by Jacob on September 6, 2026. This repository copy is the website workstream's owning plan. The proposal language below is preserved as historical context and does not mean approval is still pending.

- Recovery checkpoint: `b8aac95d`, tagged `checkpoint/portfolio-before-brand-wave-20260906`.
- Wave 1 implementation and responsive acceptance are complete; see `docs/wave-1-browser-acceptance.md`.
- Wave 2 is complete and visually checked at 375 and 1440px; see `docs/wave-2-visual-checkpoint.md`.
- Wave 3 taxonomy alignment is complete; see `docs/wave-3-taxonomy-checkpoint.md`.
- Wave 4's sourced outcomes dashboard is complete; see `docs/wave-4-outcomes-checkpoint.md`.
- Final local acceptance is complete; see `docs/final-brand-wave-acceptance.md`.
- Publication and remote push: not authorized.
- Claims and resume terminology: use only current repository sources and located resume masters. Missing sources remain blockers, never invitations to infer.

## Historical proposal text (preserved)
Proposal for approval, September 6, 2026. Website source is unchanged. The separately requested model-selection preference has been recorded; runtime checks are documented in [the availability audit](../audits/2026-09-06-restart-check.md).

## Direction

Reimagine the case-study index as a portfolio dashboard: a compact introduction, a top row/grid of sourced outcome cards, discipline filters, six complete story cards, and the existing perspective quote with the main site's rule treatment. Carry over Jacob's plum, sage, gold and slate palette, URW Form/Manrope typography, generous rounded corners, image-led cards and restrained wave accents. Match the main site's character and recurring treatments.

The references contribute card proportions, scan-friendly metrics, full-image artwork and bottom glass information panels. They do not supply portfolio data. Avoid fabricated sparklines, medical-dashboard numbers, animated eyes or AI mascots. A qualitative decision or capability is a valid result; a number is not required on every card.

Proposed page order:

1. Responsive brand lockup and navigation.
2. Brief introduction and outline scroll action.
3. Selected outcomes: one prominent quantified platform result and several clearly labeled qualitative outcomes from other studies. Each links to its supporting story.
4. `6 // Case Studies`, discipline filters, six unified cards.
5. Eyebrow, faded rule, perspective quote, faded rule, statement line.
6. Footer with explicit links back to the main portfolio.

## Resolved conflicts and boundaries

- Comment 17's later `circle-arrow-down` wins over Comment 5's `circle-chevron-down`; use the same thin circle-arrow-down on both hero scroll actions.
- Internal navigation/actions use label then thin arrow-right, with a 10px gap. Remove decorative diagonal arrows. The requested thin arrow-up-right-from-square is reserved for actual external destinations, including case-study links back to the main portfolio per Jacob's instruction. Those links open a new tab with safe rel attributes and an accessible new-tab cue. Browser preferences decide whether that becomes a tab or window.
- All interface icons use the thin family. The custom Jacob brand glyph is an identity asset; preserve it rather than replacing it with a generic thin icon. Verify the existing Font Awesome kit serves every selected thin glyph before acceptance.
- Title Case for eyebrows/categories/tags/badges and sentence case for headlines/quotes/body apply to the case-study surface. Preserve proper nouns and acronyms such as UX and CRO. Do not impose a site-wide casing conversion on the main site.
- Shared branding, icon semantics, CTA layout, section-header proportions and tagging apply to both surfaces. Case-study-specific dot removal, diagram spacing and typography remain scoped to that surface.
- Use 78px for the desktop brand icon. The case-study name scales between 18px and 30px; subtitle scales with the same lockup. Hide both text lines on small screens while retaining the accessible icon link. Determine the collapse point from actual nav fit, testing 320/375/768/1024/1440px; the annotated 1340px viewport is not a breakpoint.
- Major main-site section headings target 3rem / weight 500 on desktop, with a 4rem thin icon above. Apply through SectionHeader, not a blanket h3 or display utility override. Keep smaller responsive sizes and the approved desktop quote size.
- One card has one primary discipline badge and at most one useful secondary badge. Results are evidence, not a mandatory generic second badge.

## All annotation items accounted for

| ID | Reconciled action | Wave / source owner |
|---|---|---|
| 1 | Correct custom logo rendering and weight; desktop 78px; Product & Design Leader on both public surfaces including relevant metadata; fluid 18–30px case-study name, proportional subtitle, icon-only small header | 1: StudyShell, case-studies.css, main brand components and metadata |
| 2 | Remove decorative status dots; use Thing // Another Thing; Title Case labels and sentence case narrative on case studies | 1: page, StudyVisual, canonical copy JSON, scoped CSS |
| 3 | Keep quote desktop size; eyebrow / rule / quote / rule / statement | 2: case-study perspective, reuse main solid-center rule treatment |
| 4 | Case-study-to-main and external links open a new tab with thin external-link icon; label behavior accessibly | 1: StudyShell and all applicable anchors |
| 5 | Outline hero CTA and thin down-circle; reconcile icon with later #17 | 1: case-study index and main hero |
| 6 | Set case-study eyebrow bottom spacing to 4px; reconcile stronger existing margins | 1: shared scoped eyebrow token and owning selectors |
| 7 | Remove misleading decorative diagonal arrows from diagrams and card corners; meaningful external icon remains | 1: Arrow, StudyVisual, StudyCollection |
| 8 | Read action's visible thin arrow follows label with 10px gap | 1: shared CTA component/style; verify glyph loading |
| 9 | Replace colored hero dashes with centered faded rule | 2: hero signature and main rule style |
| 10 | Dynamic `6 // Case Studies`; retain correct singular and filtered counts | 1: StudyCollection |
| 11 | Diagram title margins 0 above/below, proportionally tighten related lockups | 1: scoped diagram record/heading selectors, not every strong element |
| 12 | Art and story information form one complete themed card | 2: StudyCollection, StudyVisual and card CSS |
| 13 | Replace Apps & Tools with grouped, resume-supported Tools & Platforms | 3: ResumeSection; verify current resume masters |
| 14 | Replace long generic Expertise list with clear, resume-supported capabilities | 3: ResumeSection and copy register |
| 15 | Shared IA and tag vocabulary with primary + optional secondary only; align main work and stories | 3: projects data, case-study data/copy, filters and badges |
| 16 | Consistent View / Read / meaningful action verb followed by thin arrow | 1: WorkCard, thinking cards, story links and buttons |
| 17 | Thin circle-arrow-down for main hero; apply to both hero actions for consistency | 1: hero component, case-study page |
| 18 | Remove decorative eye images throughout actions, preserve content imagery | 1: WorkCard and related CTA renderers |
| 19 | Replace case-study button eye with arrow after the label | 1: shared action renderer |
| 20 | Major section title 3rem/500, icon 4rem/thin above, proportionate responsive spacing | 2: SectionHeader and scoped styles |
| 21 | Full-image visual-work cards with bottom frosted panel, visible information and action | 2: thinking/visual cards; contrast and non-blur fallback |
| Overall | Results dashboard, main-site character, coherent treatments, all thin semantic icons | 4 after foundation, cards and content model |

## Proposed information architecture and content mapping

Keep existing URLs, detail-page anchors and functioning homepage modals. Proposed navigation language: Case Studies, Selected Work, Experience. Rename Full-Stack Designer to Selected Work in the visible section/navigation if approved; it describes the collection more clearly and avoids suggesting a full-stack engineering role. Preserve the old #full-stack anchor so existing links keep working.

Initial controlled discipline vocabulary: Product Design, Design Systems, UX Research, Design Leadership, Visual Design, Brand Design, Conversion Optimization. Display the optional shorthand CRO with an accessible expanded meaning. Filter only by tags actually represented in the collection; no empty categories. Primary badge describes the central contribution; optional secondary adds a distinct, evidenced discipline. Outcomes appear in result cards, not as an indiscriminate Business Results tag.

| Current story | Proposed primary | Optional secondary to verify |
|---|---|---|
| One platform. Five properties. | Design Systems | Product Design |
| A design practice built to last. | Design Leadership | Design Systems |
| One customer. A shared journey. | UX Research | Design Leadership |
| Let the customer find the way. | UX Research | Product Design |
| Build the foundation before the pages. | Design Systems | Brand Design |
| A checkout decision with receipts. | Product Design | Design Leadership |

These are editorial proposals, not new claims. Main portfolio items receive the same mapping from their actual content. Do not label commercial artwork CRO without experimentation evidence.

Proposed Expertise groups: Product Strategy & Design; Design Systems & Governance; Research & Measurement; Conversion & Experimentation; Design Leadership & Operations; AI Product Design; Accessibility & Inclusive Design. Preserve engineering collaboration and front-end literacy where supported. Tools & Platforms groups: Design & Prototyping, Research & Analytics, Experimentation, Delivery & Collaboration, AI-Assisted Work. Existing names can be regrouped; new products or proficiency claims require resume evidence. Adobe Creative Cloud is proposed current terminology, subject to confirming the source description.

The repository identifies Word master v1r9, Principal IC v1r1, Design Systems v1r1 and designed PDF v2r3 in docs/STATUS.md. Their authoritative current files have not been located in this checkout. Do not assume its older PDF files are current. Compare the actual masters during Wave 3; unresolved tools remain a short factual-review item for Jacob. Consult docs/jacob-style.md, voice-and-tone.md, data-reporting.md and current copy-register rulings first. Register approved wording at the canonical source before updating rendered copy.

## Results and factual integrity

The platform story already supports 6 -> 2 weeks to launch a property, five properties, and 47% of company revenue growth in one measured year. Retain those exact denominators and time contexts. The other five current stories mostly support qualitative outcomes, such as a documented shared journey, research informing navigation, governance, and one recorded checkout decision.

Dashboard result records should reference a study slug, approved value, plain-language label, context/time window and provenance. Derive their display from canonical content, not hardcoded duplicate claims. Do not sum or average outcomes from different projects. Do not turn 47% of revenue growth into 47% revenue growth. Do not import the resume's +72% creative output result into a particular case study unless that story's provenance supports it. Never revive the retired accessibility automation claim.

## Production line and review gates

1. **Intake and evidence, completed in part:** reconcile comments, inspect source owners and dirty tree, check services and run one bounded review plus types/lint. Preserve existing uncommitted changes and claude-code-1 ownership marker. Establish the website editing handoff/checkpoint at implementation start; do not discard the marker or reset the tree.
2. **Wave 1, low risk:** semantic icons, branding, casing and local spacing. Scripts inventory exact occurrences; cloud implementation makes the scoped changes. Verify missing glyphs, external-link behavior, responsive header and counts.
3. **Wave 2, moderate risk:** one unified case card, one visual glass card, shared section heading and quote/rule treatment. Inspect representative cards at desktop/mobile before applying the approved pattern to all relevant cards. Keep existing modal/link behavior and focus visibility.
4. **Wave 3, content risk:** approve vocabulary and source-backed resume alignment, map every item, introduce at most two badges, update shared data and filter behavior. Local models can draft maps; Astra makes final editorial/claim decisions.
5. **Wave 4, highest design risk:** build the results-led index from canonical evidence. Assemble outcomes, filters and complete cards using patterns proven in Waves 1–3. Avoid another competing visual system. Review overall visual direction before polishing every detail page.
6. **Acceptance:** type check, targeted lint and production export; check main page, all six story routes, filters, modal actions, keyboard operation, narrow widths, zoom and image/blur fallbacks. Use browser checks for visual behavior; do not infer layout correctness from type checking. Assess contrast against the applicable WCAG criteria. Stage a reviewable diff; publication is outside this plan.

Each wave yields a small diff, acceptance evidence, usage update and next-wave recommendation. Stop expanding scope when a wave exceeds its forecast; finish making the current result reviewable and reforecast before proceeding. Low-risk corrections should not wait for an unrelated resume document.

## Model assignments and capability limits

Recommended planning model: GPT-6 Astra / high. Implementation: GPT-5.6 Sol / medium; precisely specified mechanical edits can use GPT-5.6 Luna / medium. Astra / medium handles scoped final review and high handles unresolved IA/claims/design decisions. These are recommendations; no current chat model was changed.

Use scripts for source inventory, counts, casing scans, icon occurrence maps and tests. Qwen3.5 4B can summarize small source packets when the laptop is reachable. Qwen3.5 9B can draft bounded reviews and tag candidates. Both require validation. The existing website harness is read-only, so do not forecast autonomous local TSX implementation. New trusted workflow profiles for inventory/tagging need small, reviewed source scopes within the existing harness; include that setup in the forecast.

No RAG database is needed for this six-story update. Exact source selection and a canonical copy register already fit the task. General code-writing workers, new model qualification and infrastructure expansion have separate scope and budget.

## Forecast — future implementation only

Planning estimates, not a token meter or guarantee. `k` means 1,000 tokens. Estimates below cover bounded fresh context packets, implementation, review and normal correction passes after approval. They exclude this large historical conversation and this planning/test turn. Repeated conversation context, cached-input accounting and hidden reasoning can materially change provider totals. Continuing all work inside the long infrastructure chat cannot be promised to fit these ranges; use the saved brief in a focused website task when beginning implementation.

| Wave | Cloud-assisted tokens | Local prompt + output tokens | Main route |
|---|---:|---:|---|
| 1: identity, actions, typography cleanup | 6–9k | 2–4k | Scripts + Luna medium, Astra spot review |
| 2: cards and shared treatments | 8–12k | 3–5k | Sol medium; Astra visual acceptance |
| 3: IA, badges and resume alignment | 7–11k | 5–9k | Qwen drafts; Astra high editorial review |
| 4: results dashboard | 12–20k | 5–8k | Sol medium; Astra high direction |
| Final integration and acceptance | 5–8k | 3–5k | Scripts/browser + Astra medium |
| Total | **38–60k** | **18–31k** | Hybrid approach |

Use **60k as the planning target and 75k as the proposed review ceiling**, with a 15k correction reserve. These are estimated checkpoints; this app does not expose a reliable per-task token meter or a hard enforcement mechanism for that ceiling. Report that limitation rather than presenting an estimate as an exact cap. Check account allowance after each wave.

For the same scope and compact-context discipline, an all-cloud workflow is estimated at 60–90k. Paired lean scenarios (60k -> 38k) imply 22k avoided cloud tokens, about 37%; paired heavier scenarios (90k -> 60k) imply 30k, about 33%. This is **projected 33–37% reduction**, not measured savings. Local tokens are not one-for-one replacements; review, failures and orchestration consume cloud tokens. With local nodes unavailable, drop the savings claim and reforecast against the all-cloud range; do not silently spend the difference.

Choices:

- Foundation only, Wave 1: 6–9k cloud tokens; useful cleanup, incomplete redesign.
- **Recommended: full hybrid sequence, 38–60k cloud + 15k reserve.**
- All-cloud fallback: 60–90k forecast before contingency; no model-offset claim.

This turn's measured runner work used 1,226 local tokens and zero runner cloud calls. It did not make the supervising Codex conversation free, and no equivalent cloud run was performed to measure savings.

## Account allowance and spending

At inspection: Plus, 54% of the five-hour Codex window remaining, resetting September 6 at 3:01pm Eastern; 71% weekly remaining, resetting September 12 at 6:42pm Eastern. Additional spendable credits showed zero. Two usage-reset credits were available and were not consumed. These are account-wide snapshots and can change in other tasks.

**Will this exceed the current allowance? Unknown.** The account tool gives percentages, not a remaining token allocation or a conversion by model/effort. A numerical spending cap was not supplied. Plan on the existing subscription with zero additional spend; pause for the normal reset if the account limit is reached. Never redeem a reset or purchase credits by implication. The 75k estimate is not a dollar charge or proof that the remaining allowance covers the project.

## Approval requested

Approve the full hybrid sequence and the conflict resolutions above, with the 60k planning target / 75k estimated review ceiling and zero extra spending. Approval authorizes staged local website implementation and verification; it does not authorize publication. Resolve the laptop SSH problem before counting on laptop capacity; the desktop route and source checks are working now.

References: [routing policy and portable chat prompt](../model-routing-policy.md), [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model), [requested thin circle-arrow-down](https://fontawesome.com/icons/classic/thin/circle-arrow-down). The external-link and chevron reference pages did not return readable content during this check; verify glyph availability through the installed kit during implementation.
