# Copy Register

**Status:** edits B0 through B36. All APPLIED unless marked otherwise.
Advisors read this before proposing. If a proposal already exists as an
APPLIED edit, report that rather than resending. (B32 was skipped in
numbering during application; it is not missing content. B31 is SUPERSEDED —
see B34 for the correction.)

Single source of truth for every piece of written copy across jacobmedley.com.
Both the portfolio workstream and the resume workstream reconcile against this file.

**Rule: copy is authored here first, then implemented.** If copy exists in a component
or a document but not here, it is unreconciled and may be stale.

Read `docs/jacob-style.md`, `docs/voice-and-tone.md`, and
`docs/data-reporting.md` before editing anything in this file. (`docs/voice-rules.md`
is now a pointer to these three; load all three, not just the pointer.)

---

## Where copy lives

| Surface | Canonical location | Implemented in |
|---|---|---|
| Case study prose, anonymized | `docs/case-studies-sanitized.md` | `lib/data/portfolio-studies.ts` |
| Site resume, employment history | this file, section A | `components/sections/ResumeSection.tsx` |
| PDF and DOCX resume | this file, section A | external deliverable |
| Public case study modals | `lib/data/projects.ts` | same |
| Portfolio shell and UI strings | this file, section C | `components/portfolio/` |

**Employer names are permitted in employment history.** The no-names rule applies to
case study content, not the work history section of a resume.

**Vendor and platform names are permitted in employment history.** Product and
vendor names (e.g. Four Winds Interactive, Adobe Scene7, Aprimo Marketing Studio)
establish period context and serve ATS keyword matching in the work history
section. They remain barred from case study content.

---

# Section A: Employment history

Canonical for both the site resume section and the PDF/DOCX resume. The PDF may
run shorter. It must never contradict this.

## Health-E Commerce

**Director of User and Experience Design**, Feb 2026 to present
**Director of Design**, Feb 2025 to Feb 2026
New York, NY (Remote)

> I joined Health-E Commerce to restructure creative marketing and build an
> experience design practice the company had never had. Four direct reports, a team
> of seven, and seven contractors across creative marketing, design systems, and UX.
> Rather than absorbing more requests, I applied systems thinking and UX research
> methods to find the right problems, then rebuilt intake, process, and creative
> operations around them. Peak season, the highest revenue period of the year, tested
> the operating model. Creative output rose about 72% year over year on a 6.6%
> increase in production hours. Output per hour went up about 62% and output per
> person about 48%. The gain came from rebuilt process and workflow, not proportional
> labor.
>
> Once creative operations held, we split the department. A new creative director
> took the creative team and I took everything else, moving full time to the
> experience design side, a function that had not existed. I defined the practice and
> the role, then hired the first XD designer into it. The function grew from one
> direct report to two full-time designers and a contractor.
>
> Owned the company Figma account including contract renewal, through a large influx
> of product and engineering seats. After the split I kept everything outside the
> creative team, ran a seat and usage audit, and got Figma reclassified as a
> company-wide tool rather than a department one, moving a standing administrative
> load off design. Own the tooling and research budget and propose the headcount the
> function needs.

**Resolved.** Baseline is the prior year's peak season, same period comparison.
Attribution: owned the intake, process, and creative operations redesign that
absorbed the demand.

**Decision: publish, framed as contribution.** The wording is deliberate. "Creative
delivery held through" states what you did. The record peak is context, not a claim
of causation. The earlier proposed phrasing put the company's sales result in the
same clause as your headcount number, which reads as taking credit for revenue you
did not own. This version survives the interview question "so you drove the sales
record?" with a clean answer: no, we made sure creative was never the bottleneck
while it happened.

## Mutual of America Financial Group

**Senior UX Designer**, 2023 to 2025
Boca Raton, FL

> I led research and scoping for an internally built conversational assistant with
> two outputs: a Salesforce-integrated helper for service and account management
> representatives, built with a service designer, and a public assistant on the main
> website. Handling retirement and financial account data meant security, compliance,
> and accuracy governed every decision.
>
> I reviewed emerging research on LLM behavior and conversational patterns and
> partnered with a data scientist on the model and data layer. That research
> identified hallucination risk before it was widely understood. Testing confirmed it:
> asked for an account balance, the system returned a specific figure and supporting
> detail. The only compliant answer was to refer the customer to their account
> manager. I traced the cause to a sample account statement sitting in the training
> documentation.
>
> I defined the interaction requirements. Conduct came first, since the assistant
> stood in for the opening minutes of a service conversation. It had to stay
> courteous, stay useful, and never dead-end a customer. From there: response-time
> feedback built on the standard anchors, streaming responses, explicit system status
> and failure states, escalation into a live service channel or the right department,
> compliance alerting that flagged exposure in what internal users were sending, and
> account and chat history summaries so the assistant and the agent both opened with
> context. I specified ingestion quality as well, since the source corpus arrived as
> mixed PDFs, documents, spreadsheets, presentations, and raster images, and what an
> assistant knows is settled before any interface question.
>
> A subset of the requirements shipped. I secured tracking on the customer-facing
> assistant. The data showed early customer engagement followed by rapid dropoff
> correlated with response speed and friction, and internal adoption that stayed low,
> with representatives citing accuracy and wait.

**Note:** do not characterize leadership decisions, and do not mention the company's
current business condition. State what was recommended, what shipped, and what the
data showed.

**Two changes from the proposed amendment, both deliberate:**

1. Streaming stays in the requirements list, where it belongs as something you
   defined. The proposed line "Streaming was not among them" was cut. Naming one
   specific unshipped item immediately before the failure data is narration by
   juxtaposition, and it rebuilds the grievance framing we removed on purpose. You
   still get full credit for the recommendation. The reader is not told which items
   were dropped, so no finger is pointed.
2. "Early responses came back not only inaccurate but edged toward blaming the person
   asking" was cut. It is vivid, and it is a specific claim about a named financial
   services employer's product behavior. The hallucination finding in paragraph two
   already carries the accuracy problem with a documented root cause. Raise the
   conduct issue verbally if asked.

**ASSISTANT WORDING STANDARD.** One internally built conversational assistant
with two deployments. Never "two assistants," never "two LLM assistants."
Correct: "an internally built conversational assistant with two outputs."
Confirmed by Jacob. Applies to every surface including LinkedIn.

## DentalPlans.com

**Senior Manager of UX & UI Design / Product Manager**, 2015 to 2021
Plantation, FL

**Figures, single measured year:**
- 47% of the company's revenue growth
- 27% of total company lead capture
- 20% of overall company revenue

**Attribution:** owned. Oversaw, designed, and built the ecommerce platform these
figures came from. Team scope: two dotted-line design reports, one peer-level
designer, one direct offshore PHP engineer.

**WORDING STANDARD, enforce everywhere.** The 47% is a share of revenue *growth*. It
is not a lift in sales and not a share of customers. Any phrasing of the form
"increased sales by 47%" is factually wrong and must be removed from every surface.

**Cross-check for interview readiness:** 47% of growth resolves to roughly 19% of
total revenue on a representative growth curve, which corroborates the independently
stated 20%.

**Properties:** five, including BumblebeeMD as a sub-brand. One was later retired.

**Launch cycle:** site launch went from six weeks to two, a 66% reduction. This is the
source of the unattributed 66% figure appearing on the PDFs and the live site. It
belongs in the DentalPlans modal in `projects.ts`.

## One Park Financial

**Director UX/UI & Product Design**, 2021 to 2022
Coconut Grove, FL

## Employment date handling

Year-only formatting across every surface. One Park reads 2021 to 2022. Mutual of
America reads 2023 to 2025. No month-level dates anywhere.

**Practical note, not an objection.** Year-only dating is a standard convention and
states nothing untrue. Employment verification services frequently return month-level
dates, so a background check at offer stage may surface what the resume does not.
Have the verbal answer ready. Do not put the cause in writing.

## BumblebeeMD

**RESOLVED. Not an employer. Not a venture. Do not list it in employment history.**

BumblebeeMD was a sub-brand of DentalPlans, and one of the five properties built on
the platform described in Section A. It launched on that framework and was later
retired.

**Consequences, apply everywhere:**
- Remove any employment entry for BumblebeeMD from `ResumeSection.tsx` and any PDF
  or DOCX variant. It was never an employer.
- In `lib/data/projects.ts`, the BumblebeeMD entry must be presented as a
  DentalPlans platform property, not as standalone work. Its launch and retirement
  both belong in that framing.
- The retirement is an asset, not an omission. A property that could be wound down
  as cheaply as it was stood up is direct evidence of the platform economics. It is
  now stated in the case study.

## Bluegreen Vacations

**Senior Digital Designer**, 2011 to 2015
Boca Raton, FL

> I evaluated the digital signage platforms and designed the integration that
> connected them. Four Winds Interactive for signage and kiosks, Adobe Scene7 for
> dynamic media, Aprimo Marketing Studio for campaign operations, with WordPress
> in the middle as the authoring surface. Learning how each system expected to be
> fed, then designing a path through all four, was most of the work.
>
> The wider effort built a 360 degree view of the customer across email, landing
> pages, and account management, driven by personas rather than by channel.
> Campaigns had to cover 48 resorts across four seasons and several personas at
> once, so variant content came out of a central asset library and a shared data
> layer instead of being rebuilt per property. I owned UX and UI and worked with a
> PHP engineer, a data engineer, an outside consultant, and marketing managers.
> The integration had to stay usable for a wide range of content creators and
> designers, not only for the people who built it.

**Resolved.** See B16. No figures exist for this role and none may be added. The
48 resorts, four seasons, and multiple personas are structural facts about the
scope of the integration, not performance metrics, and must not be read or
rephrased as one.

## Education

**EDUCATION.** Lives in `components/sections/EducationSection.tsx`, not
`ResumeSection.tsx`. Now reads "Associate of Science, Digital Media. Full Sail
University, Winter Park, FL, 2002." Previously "Degree in Digital Design" with
no level and no year, which a resume screen flags. Jacob confirmed the full
credential publishes; no suppression. UX degrees did not exist at the
associate level in 2002, so Digital Media was the correct available path.

## Concurrency

**CONCURRENCY NOTE.** The 72% rounding fix, the future-tense fix, the
data-reporting rounding rule, the assistant wording standard, and the
`EducationSection.tsx` degree-level fix were all found already applied in the
working tree but uncommitted, meaning a parallel session edited the same
tree. Two separate parallel edits were found mid-task: the first set
(Health-E figures, future tense, rounding rule, wording standard) was already
in place when this task began; the second (`EducationSection.tsx`) appeared
between one read of the tree and the next within this same session. Correct
work, no conflict, but uncommitted edits are invisible to every other session
and to the live site, and a second edit landing between two reads inside one
session is the strongest evidence yet for the .tree-lock rule in
`working-agreement.md` Section 2.

---

# Section B: Implementable edits

Every edit has a stable ID. Implementation prompts reference the ID and never
restate the copy. If a prompt contains replacement text that is not in this
section, the prompt is wrong, not this file.

**Status values:** APPLIED, PENDING, or BLOCKED.
**On a FIND mismatch:** skip, log the ID and the actual match count, continue.
Never guess a replacement anchor.

---

## B0. Em dash removals [APPLIED], commit 68c7ef9

| File | Was | Now |
|---|---|---|
| ResumeSection.tsx | `on record — the company's` | `on record, the company's` |
| ResumeSection.tsx | `Surge seasons` | `peak seasons` |
| projects.ts:362 | `Business Results — DentalPlans.com` | `Business Results: DentalPlans.com` |
| projects.ts:762 | `UX/UI Fragmentation — Button` | `UX/UI Fragmentation: Button` |
| projects.ts:777 | `UX/UI Fragmentation — Error and Input Treatments (1 of 2)` | `UX/UI Fragmentation: Error and Input Treatments (1 of 2)` |
| projects.ts:786 | `UX/UI Fragmentation — Error and Input Treatments (2 of 2)` | `UX/UI Fragmentation: Error and Input Treatments (2 of 2)` |
| projects.ts:898 | `engaged with — and which` | `engaged with, and which` |
| projects.ts:1305 | `Example UX Roadmap — obfuscated` | `Example UX Roadmap: obfuscated` |
| projects.ts:1583 | `root canals — the highest-volume` | `root canals, the highest-volume` |
| projects.ts:1587 | `root canals — the highest-volume` | `root canals, the highest-volume` |

## B1. Named credit removal [APPLIED], commit 68c7ef9

`projects.ts`, the J.R. Hernandez anchor. Link and name removed. Now reads:

> Testing ran as a standing partnership with product marketing. They owned hypothesis and traffic, I owned the variant and the read.

---

## B2. Health-E paragraph one [APPLIED], commit c917fe8; figures corrected by B17

**File:** `components/sections/ResumeSection.tsx`

**FIND:** the entire sentence beginning `The first year closed with roughly a 70% increase in output`. B0 already altered nearby text, so build the anchor from current file state.

**REPLACE WITH (original, 2026-07):**

> The systems and process work was put to the test during peak season, the highest revenue period of the year. Demand rose about 70% year over year. We met it with about a 7% increase in contractor headcount, and creative delivery held through the strongest peak in the company&apos;s history.

**Superseded.** Both figures in the original REPLACE WITH text above were wrong against the source analysis: the 70% was delivered creative output (assets produced), not demand, and the "7%" was actually 6.6% and measured production hours, not contractor headcount. (The headcount change figure cited here at the time, "16.7% (18 to 21)," was briefly flagged as wrong by B31 — B31 was itself wrong; see B34, which reverts to the original 16.7%, 18 to 21.) See B17 for the full correction, source figures, and caveats, and B34 for the final headcount and assets-per-person figures. The text now standing in the file is:

> Peak season, the highest revenue period of the year, tested the operating model. Creative output rose about 70% year over year on a 6.6% increase in production hours. Output per hour went up about 62% and output per person about 48%. The gain came from rebuilt process and workflow, not proportional labor.

**Note:** the record peak is context, not a causation claim. See Section A for why the wording is deliberate. **Resolved, 2026-08-22:** verified Section A (lines ~49-51) carries the corrected figures — "Creative output rose about 70% year over year on a 6.6% increase in production hours" — matching the site resume. The open flag was stale; B17's correction did reach Section A.

## B3. Mutual of America paragraph three [APPLIED], commit c917fe8
**File:** `components/sections/ResumeSection.tsx`

**FIND:** paragraph three of the Mutual of America entry, in full.

**REPLACE WITH:** the two paragraphs in Section A under "Mutual of America Financial Group", beginning `I defined the interaction requirements.` Copy verbatim, strip blockquote markers, preserve JSX structure and className attributes, escape apostrophes as `&apos;`.

**Implementation note:** `ResumeSection.tsx` stores these as plain JS string
literals rendered via `{p}`, not JSX text nodes, so `&apos;` was translated to
the file's existing typographic-apostrophe convention (`’`) rather than
inserted literally. The two paragraphs contained no apostrophes, so this
didn't end up mattering here, but it applies to any future edit in this file
that carries the `&apos;` instruction.

## B4. DentalPlans employment entry [APPLIED], commit c917fe8; sentence corrected by B14, commit f2f0995
**File:** `components/sections/ResumeSection.tsx`

Title, dates, and location match Section A exactly:

> Sr. Manager of UX & UI Design / Product Manager, 2015 to 2021, Plantation, FL

Closing sentence added to the DentalPlans paragraph. Original wording shipped
here had a dangling subject (see B14); the corrected sentence that now stands
in the file is:

> The platform was built and owned outright, with nothing licensed beneath it.

## B5. One Park Financial employment entry [APPLIED], commit c917fe8
**File:** `components/sections/ResumeSection.tsx`

Entry existed with an extra "of" (`Director of UX/UI & Product Design`).
Corrected to match Section A exactly:

> Director UX/UI & Product Design, 2021 to 2022, Coconut Grove, FL

## B6. BumblebeeMD employment removal [APPLIED], commit c917fe8, verified no-op
**File:** `components/sections/ResumeSection.tsx`

Searched for any BumblebeeMD reference, employment or otherwise: zero matches.
Nothing to remove. BumblebeeMD never appeared in this file, so there was
nothing that could have been miscategorized as employment. Marked applied
because the check ran and the file is confirmed clean, not because an edit
was made.

## B7. Year-only date formatting [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

**Exception: Health-E Commerce keeps month-level dates.** Its two roles sit
inside one employer within the same year (`Feb 2025 to Feb 2026`, `Feb 2026 to
present`); collapsing both to `2025 to Present` makes the promotion read as a
typo. The year-only rule exists for the boundary between employers, e.g. One
Park ending and Mutual of America beginning. Health-E's two roles are nowhere
near that boundary, so the exception does not weaken the rule.

Every other employer stays year-only: One Park reads `2021 to 2022`, Mutual of
America reads `2023 to 2025`, DentalPlans reads `2015 to 2021`, Bluegreen
reads `2011 to 2015`. Verified against `ResumeSection.tsx` current state; no
changes needed there. No month-level dates anywhere outside Health-E.

## B8. The 47% error [APPLIED — superseded by B11 and B12], commit c917fe8
**Files:** `components/sections/ResumeSection.tsx` and `lib/data/projects.ts`

Report every occurrence of `47` with full surrounding text before editing.

Any phrasing of the form "increased sales by 47%" is factually wrong. The 47% is a share of the company's revenue GROWTH. It is not a sales lift and not a share of customers.

**REPLACE WITH:**

> Delivered 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue in a single measured year.

If the surrounding sentence structure makes that replacement awkward, SKIP and report the exact text rather than forcing it.

**Resolution:** two occurrences found. The DentalPlans paragraph occurrence
took this exact replacement (commit c917fe8). The `leadershipRight` bullet
occurrence and the `projects.ts` metric-card label occurrence were both
skipped as awkward fits for a full-sentence replacement; both were later
fixed by dedicated edits with their own wording — see B11 (bullet, commit
55299e3) and B12 (label, commit 55299e3). Marked applied because the
underlying factual error no longer exists anywhere; the literal B8 REPLACE
text above only ended up shipping in one of the three spots it touched.

## B9. The 66% attribution [APPLIED], commit 09ffe0d
**File:** `lib/data/projects.ts`

Report every occurrence of `66` with surrounding text. The figure must never appear unattributed. Anchor it to its source by working this into whatever sentence carries it:

> six weeks to two per property

**Resolution:** the `metric-grid` label at `projects.ts:367` was rewritten
from `Reduced Project Timelines` to `Launch Cycle: Six Weeks to Two, per
Property`, working the anchor phrase directly into the label since no full
sentence carried the figure at that anchor.

## B10. BumblebeeMD reframing [APPLIED], commit 09ffe0d
**File:** `lib/data/projects.ts`

Report the current entry in full first. It must read as one of five properties on the DentalPlans platform, and must state both its launch and its retirement.

Permitted factual claims, and no others: it was a DentalPlans sub-brand, it launched on the shared platform, it was later retired. If the correction needs anything beyond these, SKIP and report.

**Resolution:** `summary` and `brief.paragraphs[0]` were rewritten using only
the three permitted facts, dropping the named-colleague narrative that had
been there (see B13 for the related name sweep this surfaced).

## B11. Leadership bullet, two factual errors [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

The 47% is a share of revenue growth, not a sales lift. The 66% is a launch
cycle reduction, not a project timeline reduction.

**FIND:**

> Created user-centered solutions that achieved business goals, such as increasing sales by 47% and reducing project timelines by 66%.

**REPLACE WITH:**

> Built systems that delivered measurable business outcomes, including 47% of company revenue growth in a single measured year and a 66% reduction in launch time per property.

## B12. Metric card label, projects.ts:364 [APPLIED]
**File:** `lib/data/projects.ts`

The `47%` metric card label overstated the figure as new revenue rather than
a share of revenue growth, in the same way the leadership bullet did.

**FIND:**

> label: 'New Revenue'

**REPLACE WITH:**

> label: 'Share of Revenue Growth'

Confirmed the FIND matched exactly once, on the object carrying `value: '47%'`.

## B13. Colleague name sweep [APPLIED], commit f2f0995
**Files:** `lib/data/projects.ts`, `components/sections/ResumeSection.tsx`

Originally a discovery pass with no edits applied; resolution added and
applied in a follow-up run (see below). B10 surfaced a named colleague
(Tiffany Tibbets, in the pre-edit BumblebeeMD summary) that had been
published without being caught by the anonymization rule. Full sweep of both
files for any personal name that is not Jacob Medley, read for context rather
than by regex alone.

**Findings, three distinct names, four occurrences:**

| File | Line | Surrounding text | Read |
|---|---|---|---|
| `lib/data/projects.ts` | 529 | `Our SVP of Marketing, Bill Chase, asked, "You know WordPress, right? How fast can you stand up a website?"` | Real named colleague, quoted directly. Same category as the J.R. Hernandez removal in B1 and the Tiffany Tibbets removal in B10. |
| `lib/data/projects.ts` | 1298 | `I am a strong planner and lean hard into planning the work and working the plan. To quote Robert Burns - "The best-laid schemes of mice and men often go awry," so be ready to pivot.` | Historical/literary figure (poet), quoted for a proverb. Not a colleague or employer detail. Flagged for completeness since it matches the name pattern, not because it raises the same anonymization concern. |
| `lib/data/projects.ts` | 1380, 1382, 1385 | `alt: 'Example persona card for Frugal Francine'` (1380); `One standout example was "Frugal Francine," a persona representing cost-conscious consumers who seek maximum value for their money.` (1382); `briefHeading: 'What Frugal Francine Taught Us'` (1385) | Fictional UX research persona, not a real person. Flagged for completeness, same reasoning as Robert Burns. |

`components/sections/ResumeSection.tsx`: zero matches. No personal name besides
Jacob Medley appears anywhere in that file.

**Resolution:**

- **Bill Chase (`projects.ts:529`):** name removed, quote kept. Credit moved
  to the function, not the person.

  **FIND:**

  > Our SVP of Marketing, Bill Chase, asked, "You know WordPress, right? How fast can you stand up a website?"

  **REPLACE WITH:**

  > Our SVP of Marketing asked, "You know WordPress, right? How fast can you stand up a website?"

- **Robert Burns (`projects.ts:1298`):** reviewed and cleared. Historical
  figure, quoted for a proverb, not a colleague or employer detail. No edit
  made. **Future sweeps should not re-flag this line.**
- **Frugal Francine (`projects.ts:1380, 1382, 1385`):** reviewed and cleared.
  Fictional UX research persona, not a real person. No edit made. **Future
  sweeps should not re-flag these lines.**

## B14. Dangling subject in the B4 sentence [APPLIED], commit f2f0995
**File:** `components/sections/ResumeSection.tsx`

The sentence B4 added had no explicit subject, so it read as though the
revenue figures in the preceding sentence were what got built and owned.
Register wording error, not an implementation error.

**FIND:**

> Built and owned outright, with no licensed platform beneath it.

**REPLACE WITH:**

> The platform was built and owned outright, with nothing licensed beneath it.

B4 above has been amended to carry this corrected sentence rather than the
broken one.

## B15. Relocate dead legacy HTML out of components/ [APPLIED], commit f2f0995
**Files:** every `*.html` file directly under `components/`

These are pre-React-migration static reference files. Nothing in the live
app imports them, but every content sweep across `components/` was hitting
them and needing a manual exclusion (see B13, V2/V4 in the prior two runs).
They have reference value, so moved rather than deleted.

Moved to `_archive/legacy-components/`, verified beforehand that no active
`.ts`/`.tsx` file under `app/`, `components/`, `lib/`, or `scripts/` imports
any of them (comments mentioning them, e.g. `ResumeSection.tsx:61`, were left
as-is and still resolve correctly since the referenced path is a comment, not
an import).

**Files moved (20):** 14 `modal-*.html` files —
`modal-bee.html`, `modal-call-center-ux.html`, `modal-hydra.html`,
`modal-marketing-auto.html`, `modal-opfred.html`, `modal-personas.html`,
`modal-product.html`, `modal-reveal.html`, `modal-roadmap.html`,
`modal-split-test.html`, `modal-viva.html`, `modal-webmd.html`,
`modal-workshops.html`, `modal-wrong.html` — plus 6 `section-*.html` files:
`section-education.html`, `section-hi.html`, `section-quote.html`,
`section-resume.html`, `section-visual-design.html`, `section-work-v2.html`.

**Going forward:** content sweeps across `components/` and `lib/` should
scope to `.ts` and `.tsx` files only. The legacy HTML under
`_archive/legacy-components/` is out of scope for copy sweeps; it is a
reference archive, not live content.

## B16. Bluegreen Vacations paragraphs [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

Replaced both paragraphs of the Bluegreen Vacations entry with the canonical
version now in Section A. See that section for the full text and the resolved
note on figures.

Vendor names are load-bearing and must be spelled exactly: Four Winds
Interactive, Adobe Scene7 (one word), Aprimo Marketing Studio. See the new rule
under "Where copy lives" for why they're permitted here despite the no-names
rule that governs case study content.

## B17. Health-E figures corrected, measurement caveat recorded [APPLIED]

**File:** `components/sections/ResumeSection.tsx`, amending B2.

Two claims in the live B2 text were checked against a source analysis held
outside the repo (`C:\dev\_private\jacobmedley-source-data\assets-counts` —
not read for this edit beyond the figures already extracted; it holds
unscrubbed data including personal names). Both were wrong:

- The "70%" was delivered creative output (assets produced), not demand.
- The "about a 7% increase in contractor headcount" was actually a 6.6%
  increase in total production hours, not contractor headcount.

**MEASUREMENT CAVEAT — original figures confirmed correct, 2026-08-23 (see
B34).** B31 (2026-08-23, same day) briefly recorded these as wrong and
replaced them with figures derived from raw roster-row counts. That was the
error — see B34. The figures originally recorded here stand:

- Assets: ~1,145 prior peak to ~1,974.5 current, about 72%
- Creative headcount: 18 to 21 contributing people, about 16.7%
- Production hours: 680 to 725, about 6.6%
- Assets per hour: about 62%, derived
- Assets per person: about 48%, derived

Some monthly counts were EXTRAPOLATED, not directly counted. These are
directional year-over-year comparisons, not audited metrics. Never harden
them into precision they do not have.

Assets per hour is the strongest figure. It is a pure productivity ratio,
independent of headcount. If only one number survives a future compression,
keep that one.

Source file holds personal names. None may appear in any deliverable.

**RESOLVED, 2026-08-23 (see B34).** Previously PENDING CONFIRMATION: the
register elsewhere describes the Health-E team as seven FTE plus seven
contractors, fourteen people, which did not, on its face, reconcile with the
"18 to 21" creative headcount figure then recorded here. Resolution: 18 to 21
is correct and is not a different population from the wider figure — it is
the wider figure. (B31 briefly restated this as 20/22 and as a population
mismatch; both claims in B31 were wrong — see B34.) The separate "seven FTE
plus seven contractors" figure describes Jacob's direct reporting line, which
is a subset of the 18-to-21 contributing-people figure for the whole creative
org during peak season. Different scopes, not contradictory. Neither number
contradicts the other and both may stand, though they should not appear in
the same sentence.

**New rule, previously unwritten, answered:** former employers may be named
when the reference is positive. Internal detail, colleague names, and
business condition stay barred regardless of employer or era. Confirmed by
Jacob.

## B18. Health-E team composition [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

**FIND** (match count 1): the two sentences beginning `I joined Health-E
Commerce` through `...creative operations around them.`

**REPLACE WITH:**

> I joined Health-E Commerce to restructure creative marketing and build an experience design practice the company had never had. Four direct reports, a team of seven, and seven contractors across creative marketing, design systems, and UX. Rather than absorbing more requests, I applied systems thinking and UX research methods to find the right problems, then rebuilt intake, process, and creative operations around them.

**Register note, amended 2026-08-23, corrected same day, then re-verified
same day (see B34).** Seven contractors on Jacob's direct team: five creative
marketing, one design systems, one UX. This is a subset of the wider
creative-org contractor count during peak season. The wider-population figure
went through two states in one day: B31's "eleven contractors, flat both
years" was wrong (row-count error); this was briefly marked unverified; B34
has since re-derived it against contributing humans: **11 contractors in
2024, 10 in 2025** (down one), with employees up four to compensate for the
larger headcount increase. See B34 for the full breakdown. This wider figure
is not published anywhere on the site. Jacob's current team contractor count
is separately unknown and must not be stated either.

## B19. Health-E department split [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

**Reported before editing, current second paragraph:**

> With creative operations stable, we split the department and I moved full time to building the experience design side of the business, a function that had not previously existed. I defined the practice and hired the company's first dedicated XD/UX designer.

**FIND** match count 1. **REPLACE WITH:**

> Once creative operations held, we split the department. A new creative director took the creative team and I took everything else, moving full time to the experience design side, a function that had not existed. I defined the practice and the role, then hired the first XD designer into it. Started the year with one direct report and will finish it with three.

## B20. Health-E Figma governance, new paragraph [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

Appended as a new third paragraph to the Health-E entry, same JSX pattern as
the others:

> Owned the company Figma account including contract renewal, through a large influx of product and engineering seats. After the split I kept everything outside the creative team, ran a seat and usage audit, and got Figma reclassified as a company-wide tool rather than a department one, moving a standing administrative load off design. Own the tooling and research budget and propose the headcount the function needs.

**Register note:** budget scope is UserTesting, design tooling, and team
education. "Propose the headcount the function needs" is deliberate. Do not
later substitute "own headcount planning." That would be an overclaim.

## B21. Mutual of America, service designer credit [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

**Reported before editing, current scoping sentence:**

> I led research and scoping for an internally built conversational assistant with two outputs: a Salesforce-integrated helper for customer service and account management, and a customer-facing assistant on the public site.

**FIND** match count 1. **REPLACE WITH:**

> I led research and scoping for an internally built conversational assistant with two outputs: a Salesforce-integrated helper for service and account management representatives, built with a service designer, and a public assistant on the main website.

Credit by function only. No name.

## B22. "training corpus" becomes "training warehouse" [SKIPPED — content mismatch, 0 occurrences]
**Files checked:** `components/sections/ResumeSection.tsx`,
`docs/copy-register.md`, `lib/data/projects.ts`,
`docs/case-studies-sanitized.md`

`grep -c "training corpus"` returned **0** in all four files. Per the FAILURE
POLICY (content mismatch: log the edit ID and actual count, skip, continue),
no edit was made anywhere. The nearest existing phrases are "training
documentation" (`ResumeSection.tsx`, Mutual of America paragraph two) and
"source corpus" (paragraph three) — neither is a literal match for "training
corpus," so neither was touched.

## B23. One Park Financial, full entry [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

**Reported before editing, current entry in full:**

> At One Park Financial, I oversaw and developed all design processes and workflows, establishing best practices for UX and UI design and usability testing. I collaborated with teams across marketing, product, and engineering, conducting workshops to drive problem-solving and innovation. Partnering with Channel Managers specializing in PPC, SEO, and Affiliate marketing, I helped establish their conversion rate optimization strategies to maximize user engagement and conversion rates.
>
> I evangelized the need for a design system, partnering with the SVP of Marketing to secure executive buy-in for the project. This led to the creation of the Hydra Design System, a unified pattern and component library. This empowered the company to design and engineer rapidly and "fail fast," improving business goals and user experience.

**REPLACE WITH (four paragraphs, replacing the prior two):**

> Design leadership inside the marketing organization, reporting to the SVP. Three contract reports covering engineering, visual design, and graphic design, with two full-time roles approved and in recruiting.
>
> Built the case for a unified pattern library and design system, then shipped it. Product, marketing, and engineering had been describing the same components three different ways. Delivery time halved, with work that had taken two sprints landing in one.
>
> The system was complete enough that the product ran for about a year afterward with no design resource, on one engineer and one product manager.
>
> Owned design process and set the usability testing practice. Worked with PPC, SEO, and affiliate channels on conversion rate strategy across acquisition funnels.

**REGISTER NOTE, recorded verbatim:** the durability sentence in paragraph
three must not be edited toward the fuller story. The underlying situation
involves a company-wide contraction, which the register's own rule bars from
published copy. The sentence states what the artifact did and nothing about
anyone's decisions. The fuller account is verbal interview material only.

**Note:** Section A never carried prose for this entry (only title, dates,
and location) — this predates B23 and is not a regression from it. Not
backfilled here since it wasn't asked for; flagging so it isn't mistaken for
an oversight.

## B24. Sr. becomes Senior [APPLIED]
**Files:** `components/sections/ResumeSection.tsx`,
`docs/copy-register.md` Section A

**Reported before editing, every occurrence:**

| File | Line | Context |
|---|---|---|
| `ResumeSection.tsx` | 76 | `roles: [{ title: 'Sr. UX Designer', ...` |
| `ResumeSection.tsx` | 94 | `roles: [{ title: 'Sr. Manager of UX & UI Design / Product Manager', ...` |
| `ResumeSection.tsx` | 102 | `roles: [{ title: 'Sr. Digital Designer', ...` |
| `copy-register.md` Section A | 72 | `**Sr. UX Designer**, 2023 to 2025` |
| `copy-register.md` Section A | 125 | `**Sr. Manager of UX & UI Design / Product Manager**, 2015 to 2021` |
| `copy-register.md` Section A | 186 | `**Sr. Digital Designer**, 2011 to 2015` |
| `copy-register.md` Section B (B4) | 281 | `> Sr. Manager of UX & UI Design / Product Manager, 2015 to 2021, Plantation, FL` |

All seven are job titles, not proper nouns — nothing skipped on those
grounds. Applied to the six in `ResumeSection.tsx` and Section A as
instructed. The seventh, inside B4's historical quote in Section B, was left
as `Sr.` — the instruction scoped this edit to "Section A," and B4 is a
dated record of what a past commit actually shipped, not current canonical
copy.

## B25. Weak ownership verbs and banned constructions [APPLIED — partial]
**File:** `components/sections/ResumeSection.tsx`

**Searched, reported in full:**

- `contributed to`, `involved in`, `played a key role`, `was pivotal`,
  `helped`, `supported`, `was part of a team`, `Won executive backing` — **0
  occurrences each.**
- `Partnered with` (exact case) — 1 occurrence: `body: 'Partnered with
  marketing, engineering, and product teams to deliver cohesive brand and
  product experiences across all touchpoints.'` (leadershipRight bullet).
  **Confirmed replacement applied** → `Worked with marketing, engineering,
  and product teams...`
- `partnered with` (lowercase, mid-sentence) — 1 occurrence, Mutual of
  America paragraph two: `...conversational patterns and partnered with a
  data scientist on the model and data layer.` Not a match for the confirmed
  "Partnered with" → "Worked with" rule as given (different literal string).
  **Reported, not edited.**
- `rather than` — 3 occurrences: Health-E paragraph one (`Rather than
  absorbing more requests...`), Health-E paragraph three / B20's new text
  (`...reclassified as a company-wide tool rather than a department
  one...`), Bluegreen paragraph two (`...driven by personas rather than by
  channel.`). No confirmed replacement given for this phrase. **Reported,
  not edited.**

Only the two confirmed replacements were applied. Everything else above is
reported for a future edit with its own wording.

## B26. The 47% mechanism [APPLIED — partial]
**File:** `components/sections/ResumeSection.tsx`

**Reported, both occurrences:**

1. `leadershipRight` bullet: `Built systems that delivered measurable
   business outcomes, including 47% of company revenue growth in a single
   measured year and a 66% reduction in launch time per property.` Bundles
   47% and 66% together in a one-line bullet card body. The mechanism
   replacement is three full sentences and never mentions 66% — inserting it
   here would be awkward and would drop the 66% figure entirely. **SKIPPED**,
   per the instruction's own awkwardness clause.
2. DentalPlans paragraph two: `Delivered 47% of company revenue growth, 27%
   of total lead capture, and 20% of overall revenue in a single measured
   year.` A bare claim sitting inside a full paragraph with room before and
   after it. **REPLACE WITH:**

   > Source attribution meant the page said what the ad promised. Promotion, copy, and messaging changed based on where the visitor came from, down to individual affiliate IDs. In one measured year finance credited the properties with 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue.

   **Applied.**

## B27. DentalPlans paragraph one [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

Pre-audit copy. Two long sentences, no concrete noun, no figure. Banned verbs and
constructions present: `fostering`, `significantly boosted`, `aligning with product
design excellence and business growth`.

**FIND** (match count 1):

> I pioneered a design system and code componentization at the company, fostering rapid development and refinement of product features and marketing strategies, crucial for our omnichannel eCommerce platforms. This approach, coupled with DevOps practices and product design for microservices, significantly boosted our testing and iteration capabilities, aligning with product design excellence and business growth.

**REPLACE WITH:**

> The first property was a WordPress theme with sale pricing typed in by hand, one product at a time. It sold, and the company wanted four more. Cloning it was the obvious path, so I brought a roadmap instead: token-based theming, scheduled multi-phase promotions, one source of truth for products and providers, and one-button deploys per environment. Launch time for a fully branded property fell from six weeks to two. Five properties ran on it. Two people built and maintained the platform, and four experience designers covered every property on it.

WordPress is named deliberately, per the register's rule that vendor and platform
names are permitted in employment history. The six-weeks-to-two figure is stated as a
plain before-and-after rather than as a percentage, since the percentage (66%) already
lives in the Business Outcomes bullet under B28 — repeating it here would be a third
appearance of one figure on one page. **Applied.**

## B28. Design Leadership bullets, ten reduced to seven [APPLIED]
**File:** `components/sections/ResumeSection.tsx`, `leadershipLeft` and
`leadershipRight` arrays.

Corrects the amendment's assumed field name: the bullets are stored as `title`/`body`
pairs, not `label`/`body`. Ten bullets shared one construction — label, colon,
participial phrase, gerund tail — reduced to seven with varied construction.

**Cut, four bullets:** Strategic Vision, End-to-End Design Process, Collaboration &
Alignment, SEO and Content Strategy. Reasons: unfalsifiable, table stakes at director
level, superseded (see below), and lack of concrete material, respectively.

**Merged:** Data-Driven Insights folded into the new Research and Measurement bullet.

**Supersedes B25.** B25 changed the Collaboration & Alignment bullet's "Partnered
with" to "Worked with." B28 cuts that bullet entirely. Intentional, not a regression.

**Final seven**, split 4 (`leadershipLeft`) / 3 (`leadershipRight`) — ten does not
split evenly into seven, so the column break moves; no other layout change:

1. **Design Systems** — Built token foundations so brand identity became
   configuration instead of a build. One system carried five ecommerce properties,
   with one source of truth for products and providers behind all of them.
2. **Accessibility** — An automated auditing pipeline covering structure, landmarks,
   alt text, ARIA, keyboard operability, and rendered contrast. Per-page review
   dropped from days to hours, and it runs on a schedule against production.
3. **Research and Measurement** — Set a usability testing practice at ten
   participants per round and a HEART-based KPI framework, so design decisions
   arrived with evidence attached and outcomes had a number to move.
4. **AI Product Design** — Led experience research and scoping for two LLM
   assistants in a regulated financial environment. Wrote the interaction
   specification: response timing against Nielsen and Doherty anchors, system
   status, failure states, and escalation paths.
5. **Conversion and Experimentation** — Ran conversion work as experiments with
   hypothesis standards and a defined read. Source attribution changed promotion,
   copy, and messaging by traffic source, down to individual affiliate IDs.
6. **Business Outcomes** (renamed from Business-Centric Design) — Systems work with
   numbers attached: 47% of company revenue growth in a single measured year, and a
   66% reduction in launch time per property. B11's figures and framing preserved
   exactly; only the wrapper sentence changed.
7. **Design Leadership** — Two design functions that did not exist before I got
   there. I hired into both, defined the practice, and set a review model that ends
   in decisions instead of opinions. **PENDING CONFIRMATION:** the phrase "Two design
   functions that did not exist before I got there" is applied as written per the
   amendment, but is not yet confirmed by Jacob. Flag before this branch merges.

Banned-verb sweep confirmed clean across all seven: ensuring, delivering, fostered,
spearheaded, enhancing, driving, aligned, blending, promoting. No employer names in
any bullet.

**Word-collision fixes, 2026-08-23.** Two rounds:

1. **"single."** Design Systems as first drafted read "a single source of truth";
   Business Outcomes reads "a single measured year." Despite the original notes
   claiming the collision had been avoided, it had not. Resolution: reworded Design
   Systems only, per Jacob's direction. **FIND:** `with a single source of truth for
   products and providers behind all of them` → **REPLACE:** `with one source of
   truth for products and providers behind all of them`. "single measured year" is
   protected B11 wording and was left exactly as written. "One source of truth"
   already appears in the new B27 DentalPlans paragraph, so this is consistency with
   existing copy, not a new construction.

2. **"attached."** A follow-up scan (adjectives only) found a second collision the
   first pass missed: "evidence attached" (Research and Measurement) and "numbers
   attached" (Business Outcomes). Resolution: reworded Research and Measurement, per
   Jacob's direction; Business Outcomes' "numbers attached" is unchanged. **FIND:**
   `so design decisions arrived with evidence attached and outcomes had a number to
   move` → **REPLACE:** `so design decisions carried evidence and outcomes had a
   number to move`. Jacob specifically rejected "behind" as the replacement verb
   because "behind" already appears in Design Systems ("behind all of them") — that
   would have traded one collision for another.

3. **"carried."** Introduced by fix 2's own replacement text: "One system **carried**
   five ecommerce properties" (Design Systems) and "design decisions **carried**
   evidence" (Research and Measurement). Resolution: reworded Research and
   Measurement again, not Design Systems — Jacob's call, on the grounds that Design
   Systems' use of "carried" is the more concrete of the two (a system carrying five
   live properties) and the replacement text from fix 2 was what introduced the
   collision, so that's the side that changes. **FIND:** `so design decisions carried
   evidence and outcomes had a number to move` → **REPLACE:** `so design decisions
   rested on evidence and outcomes had a number to move`. Confirmed "rested" occurred
   nowhere else across the seven bullets before applying.

**Full content-word audit, 2026-08-23, final pass** (not just adjectives — every
content word appearing twice or more across the seven bullets, articles/prepositions/
conjunctions/copulas excluded; no lead paragraph precedes the bullets, only the
"Design Leadership" `<h3>`, so the scan covers the seven bullets alone). Re-run after
the "carried" fix: **no new collision.** `single`, `attached`, and `carried` are each
now single-occurrence.

**Standing rule, recorded so this isn't re-litigated:** `design`, `research`,
`systems`/`system`, `review`, `practice`, `decisions`, `outcomes`, `set`, `work`,
`source`, `two`, and `defined` each appear twice across the seven bullets. Confirmed
correct as-is, by Jacob. Each is the section's own recurring subject-matter noun
(design, research, systems, review, decisions, outcomes, practice) naming a genuinely
different instance in a different bullet, or the same word in a different part of
speech (`defined`: "a defined read" is adjectival, "defined the practice" is the
verb). **The word-collision rule targets stylistic tics — a light, low-content word
doing decorative filler work twice (`single`, `attached`, `carried`) — not domain
nouns that are the section's actual subject matter and cannot repeat twice without
contorting the copy.** Do not flag this list again without a new instance to weigh
against it. `one` (Design Systems: "One system" / "one source of truth") is a
same-bullet internal repeat, not a cross-bullet collision, and was never in scope.

## B29. Weak phrase in DentalPlans paragraph two [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

Filed separately from B27 so it could be declined without blocking that edit.
`driving remarkable financial growth` used a banned verb and an unfalsifiable
adjective, and repeated "design and development" within one sentence.

**FIND** (match count 1):

> Leading UX/UI design and development, especially for projects involving product partners, I managed design and development for LAMP stack projects, driving remarkable financial growth.

**REPLACE WITH:**

> I led UX, UI, and front-end work across the LAMP stack, including the properties built with product partners.

Nothing else in the paragraph changed. **Applied.**

## B30. Open item: mentorship and team development [OPEN]
**File:** none yet — no surface in the document addresses this.

The old "Inclusive Design Culture" bullet, cut under B28, claimed mentoring. Nothing
else in the register, the site resume, or `docs/case-studies-sanitized.md` describes
how Jacob develops people — hiring decisions, growth conversations, review or
feedback practice, career development. This is half of what a design director does
and it is absent from every surface. Flagged as missing evidence in the resume review
as well. **This is the largest content gap in the document.** Needs source material
from Jacob before anything can be written. Do not invent specifics to fill it.

## B31. Health-E headcount and assets-per-person figures corrected [SUPERSEDED, see B34]
**Files:** `components/sections/ResumeSection.tsx`; `docs/copy-register.md`
Section A; amends B17's MEASUREMENT CAVEAT.

**REVERTED, same day, 2026-08-23. This entire entry was wrong — see B34.**
The source read behind this edit counted raw rows in the workbook's "Head
Count and Hours" tab without checking for zero-hour, NULL, or duplicate
entries: a 2024 row with 0 logged hours, a 2024 NULL row (maternity leave),
and a 2025 duplicate name were each counted as a person. The correct method
counts contributing humans, not roster rows, which gives 18 (prior peak) and
21 (current peak) — restoring B17's original figures exactly. Kept below as a
historical record, not as current guidance. Do not implement anything from
this entry.

B17's headcount figure (18 to 21 people, about 16.7%) and the assets-per-person
figure derived from it (about 48%) were both wrong. Corrected against Jacob's
verified source spreadsheets, authoritative over the prior figures:

```
Prior peak:   20 people, 680 hours, 11 contractors,  9 employees
Current peak: 22 people, 725 hours, 11 contractors, 11 employees

headcount          +10%    (earlier 18 to 21 / +16.7% was WRONG)
hours              +6.6%   (correct, unchanged)
assets    ~1,145 to ~1,974.5, +72%
assets per hour    +62%    (correct, unchanged)
assets per person  +57%    (earlier 48% was WRONG, derived from bad headcount)
```

Both rows reconcile exactly to their stated hour totals.

**Contractor count was flat at eleven, both years.** The two added people
between prior and current peak were both employees. No framing may credit
contractor growth for any part of the increase.

**One prior-year row shows NULL hours, maternity leave.** That is why 680 is
the correct prior-peak hour total rather than an understated one — it already
excludes a contributor who was out.

**Assets per hour remains the strongest figure.** A pure productivity ratio,
independent of headcount, unaffected by the headcount correction. If only one
number survives a future compression, keep that one.

**Applied, then reverted same day — see B34.**

## B33. Design Leadership bullet corrected — one function, not two [APPLIED]
**File:** `components/sections/ResumeSection.tsx`, `leadershipRight` array.

B28's Design Leadership bullet ("Two design functions that did not exist before I
got there...") was applied with a pending-confirmation flag. Jacob confirmed only
one design function was built from nothing: at DentalPlans, UX, visual design, and
brand already existed; the design system and ecommerce framework did not. "Two
design functions" overclaimed.

**FIND** (match count 1):

> Two design functions that did not exist before I got there. I hired into both, defined the practice, and set a review model that ends in decisions instead of opinions.

**REPLACE WITH:**

> Built an experience design function where none existed and hired into it. Set a review model that ends in decisions instead of opinions.

**Note:** this was specified in an earlier prompt that did not run — found still on the
old text when checked 2026-08-23, applied then.

**New content-word collisions introduced by this wording, found on re-sweep and not
yet resolved:** `built` now opens both the Design Systems bullet ("Built token
foundations...") and this one ("Built an experience design function..."), two of
seven bullets sharing an opening word. `experience` now appears twice: "Led
**experience** research" (AI Product Design) and "Built an **experience** design
function" (Design Leadership). Both are the same stylistic-tic class as
`single`/`attached`/`carried`, not the exempted domain-noun class. Flagged for a
follow-up edit; not blocking this merge per instruction to proceed.

## B34. B31 reverted — headcount and assets-per-person restored to B17's original figures [APPLIED]
**Files:** `components/sections/ResumeSection.tsx`; `docs/copy-register.md`
Section A; corrects B31; amends B17's MEASUREMENT CAVEAT and RESOLVED note;
amends B18's register note.

B31's correction was itself wrong. Jacob identified the error against the
source workbook (`2025-JIRA-Assets-Count.xlsx`, tab "Head Count and Hours"):
B31 counted raw roster rows. The correct method counts contributing humans:

```
2024: 20 rows — Lee logged 0 hours, Kamila NULL for maternity leave
      = 18 contributing people
2025: 22 rows — "Meghan" appears twice (duplicate entry)
      = 21 unique contributing people
```

**Restored, final figures — these match B17's original numbers exactly:**

```
Prior peak:   18 contributing people, 680 hours
Current peak: 21 contributing people, 725 hours

headcount          +16.7%  (18 to 21 — B31's "20 to 22, +10%" was WRONG)
hours              +6.6%   (correct throughout, never changed)
output             ~1,145 to ~1,974.5, +72%
output per hour    +62%    (correct throughout, never changed)
output per person  +48%    (B31's "+57%" was WRONG, derived from bad headcount)
```

**Advisor error, recorded per instruction:** the 20-to-22 reading was an
advisor error — counting workbook rows without checking for zero-hour, NULL,
or duplicate-name entries. Not a data problem; a counting-method problem. The
source data itself was fine.

**Noun corrected, 2026-08-23 (same day, follow-up).** Both the resume sentence
and Section A said "assets per hour" / "assets per person." Corrected to
"output per hour" / "output per person" in both, character-for-character
match verified. This table's row labels above are updated to match; earlier
quotes elsewhere in this register that describe what a past version of the
file said (B2's superseded text, B17's original caveat) keep "assets" where
that's what was actually live at the time — not touched retroactively.

**Contractor/employee split, re-derived against contributing humans (not
published — recorded for reference only):**

```
2024: 18 contributing — 11 contractors, 7 employees
2025: 21 contributing — 10 contractors, 11 employees
```

Contractors went **down** by one; employees went **up** by four. B31's "flat
at eleven both years" claim was wrong, from the same row-count error as the
headcount figure. Neither number is published anywhere on the site. Both are
now correct and available if a future edit needs them — see B18, whose
contractor note previously marked this figure unverified; that note is
updated below to point here rather than restate "unverified."

**Open question — do not resolve by picking one side.** Deduplicating the
repeated 2025 name ("Meghan" appears twice) drops the hours total from 725 to
685 — exactly one 40-hour row. Two readings are both consistent with part of
the workbook and neither is consistent with all of it:

- Two different people are both named Meghan, headcount is genuinely 22, and
  725 hours is correct as summed.
- One "Meghan" row is a duplicate entry (not two people), headcount is 21,
  and the hours total should be 685, not 725.

The workbook as read cannot support both "725 hours" and "21 people" at once
under the contributing-humans method — one of those two numbers is off by
exactly one 40-hour employee. **Published figures are unaffected either way:**
725 hours and +6.6% are what the source states outright (not derived from the
headcount reconciliation), and output-per-hour holds regardless of which
reading is correct. Flagging for Jacob to confirm with the PM who built the
tab, not resolving it here.

**Applied:**

- `ResumeSection.tsx` and Section A of this file (character-for-character
  match): `assets per person about 57%` → `assets per person about 48%`, then
  same-day: `assets per hour` / `assets per person` → `output per hour` /
  `output per person`.
- B31: marked SUPERSEDED, kept as historical record, not deleted.
- B17's MEASUREMENT CAVEAT: restored to original figures, no longer points to
  B31 as a correction.
- B17's RESOLVED note: "20 (prior peak) and 22 (current peak)" corrected to
  18/21; the underlying scope-distinction reasoning (Jacob's direct team vs.
  the wider creative org) still holds and was not itself wrong.
- B18's contractor note: updated to point here for the re-derived, verified
  (but unpublished) contractor/employee split, instead of stating the figure
  is unverified.

Source file holds personal names. None may appear in any deliverable.

## B35. Hero title standard set; "Digital Strategist" retired [APPLIED]
**File:** `components/sections/HeroSection.tsx`

**FIND** (match count 1):

> UX/UI Designer &amp; Digital Strategist

**REPLACE WITH:**

> Product Design Leader

Reason: the hero undersold the page beneath it. The work shown on the site is
product surface, not marketing craft, and "Digital Strategist" pointed at
work the page doesn't demonstrate.

**TITLE STANDARD.** "Product Design" is the constant across every surface.
The seniority word varies by application target. "Digital Strategist" is
retired from all headers; strategy is demonstrated in the bullets, not
claimed in the title.

| Surface | Title |
|---|---|
| Site hero and resume master | Product Design Leader |
| Director postings | Director of Product Design |
| Head of Design postings | Head of Design |
| IC postings | Principal Product Designer |

Site hero previously read "UX/UI Designer & Digital Strategist."

## B36. Page title and meta description brought onto the title standard [APPLIED]
**File:** `app/layout.tsx`

B35 changed the hero. It did not change the page `<title>` or meta
`description`, which live in `app/layout.tsx`, outside `components/` and
`lib/` — so they still read the retired title after B35 shipped. Caught by
live-site verification after B35's deploy, not by B35's own sweep.

**LOCATE:** `app/layout.tsx` line 6, the metadata title.

**Before:** `title: 'Jacob Medley — UX/UI Designer & Digital Strategist',`

**After:** `title: 'Jacob Medley, Product Design Leader',`

The em dash in the old value is gone with this change — comma instead.

**LOCATE:** `app/layout.tsx` line 8, the meta description.

**Before:** `'Portfolio of Jacob Medley, a UX/UI Designer & Digital Strategist driving business results through design systems, platform thinking, and research.',`

**After:** `'Portfolio of Jacob Medley, a Product Design Leader driving business results through design systems, platform thinking, and research.',`

Only the phrase "a UX/UI Designer & Digital Strategist" changed to "a Product
Design Leader." Rest of the sentence untouched.

**Re-swept, properly scoped this time — `app/`, `components/`, `lib/`,
`public/`, `docs/`.** "UX/UI Designer," "Digital Strategist," "Digital
Strategy": zero hits in `app/`, `components/`, `lib/`, `public/` after this
fix. Remaining hits are all in `docs/`:

- `copy-register.md` (this file, B35's own FIND quote, heading, and
  reasoning prose, plus this entry) — audit-trail, naming the retired value
  to record or correct it. Expected, not live copy.
- `docs/ideas.md` — the hero-title-cycle idea (status IDEA, not scheduled,
  no branch) opens with "Current hero subtitle: 'UX/UI Designer & Digital
  Strategist'" and its proposed animation sequence includes "Digital
  Strategist" as one cycled frame. Neither is audit-trail (it's a forward
  proposal, not a record of a past value) nor live copy (nothing is
  implemented). Both are now stale against the current hero and against this
  entry's title standard, which retires "Digital Strategist" from headers
  entirely. Flagged, not edited — the idea needs reconciling with the title
  standard before anyone builds it, whichever hero title is live then.

**Em-dash sweep, `app/`, `components/`, `lib/`, `public/`, excluding code
comments.** Every em dash found in those paths is inside a `//`, `/* */`, or
JSX `{/* */}` comment (`app/globals.css`, `components/nav/NavMain.tsx`,
`components/sections/FullStackSection.tsx`,
`components/sections/HeroSection.tsx`, `components/ui/CaseStudyModal.tsx`,
`lib/data/projects.ts`, plus the one now-removed from `app/layout.tsx`'s
title). **Zero in rendered strings.** The em dash B36 just removed from the
page title is exactly the kind of gap this sweep was checking for — B0's
original em-dash sweep evidently had the same scope gap B35's did.

**Scope note, recorded so it isn't relitigated:** B35's sweep covered
`components/` and `lib/` only, which missed `app/layout.tsx`. Future sweeps
for retired copy or banned constructs cover `app/`, `components/`, `lib/`,
and `public/` at minimum — not just `components/` and `lib/`.

---

## Implementation hazard

B0 already edited `ResumeSection.tsx`. Any FIND anchor for that file must be
built by reading the current file, not from the pre-fix text quoted anywhere in
this register.

# Section C: Portfolio UI strings

On `feat/recruiter-portfolio`. Fix before that branch merges or the em dashes return.

| File | Line | Current | Corrected |
|---|---|---|---|
| PortfolioShell.tsx | 25 | `Jacob Medley — Portfolio` | `Jacob Medley: Portfolio` |
| PortfolioShell.tsx | 39 | `Private portfolio — not indexed, not for distribution.` | `Private portfolio. Not indexed, not for distribution.` |

---

# Section D: Pending case studies

**Conversational assistant.** STILL PENDING. A full anonymized draft titled "Valuable
Was Never the Problem" exists in the resume chat. Paste it over and it goes in. Carries the verbatim thesis, the conduct finding,
the timing spec, the corpus root cause, and the measured outcome. No employer,
product, colleague, or date. Thesis line, verbatim:

> No matter how valuable something is, if it is not usable, it is not used.

**DentalPlans platform.** DONE. Written into `docs/case-studies-sanitized.md` as
"The Alternative to Five Sites Was Five Teams", Part Two. Tag it
`['Design Systems', 'Strategy']`, weight `standard`.

Three details from the delivered draft were cut before publishing, see Section E.

## Response-time specification, canonical

Supersedes every earlier version. Hold this everywhere.

| Stage | Timing | Behavior |
|---|---|---|
| Acknowledgment | 0.1 to 0.4 seconds | Animated dots, thinking state. Covers the tenth-second and one-second bands in one move. |
| Holding | 3 seconds | Message changes. "Good question, I need a moment." |
| Apology | 7 seconds | Thanks the user for waiting, apologizes. |
| Failure exit | 10 seconds, or any stall or critical error | States plainly that it could not answer. Offers related articles or the department to call. |

The deviation from Nielsen is deliberate and should be stated as such. The canonical
0.1/1/10 set describes tolerance thresholds. It does not prescribe messaging. The 3
and 7 second stages carry a user through the window where sessions are lost, using
changes in system language as the only available evidence that progress is happening.
The 0.4 second upper bound is the Doherty Threshold.

**Source correction:** the original specification records this as "0.4 milliseconds."
It is 0.4 seconds. Fix at source. 0.4ms reads as unserious to any engineer.

**Supporting artifact:** a live demo exists at
`/interaction-design-concepts/response-times/`, and a `musings/` post cites Nielsen's
thresholds and links to it. Worth referencing from the case study.

**CONFIRM BEFORE PUBLISHING.** These numbers have now been stated three ways across
this project: 0.1/1/8, then 0.1/1/5/8, now 0.1-0.4/3/7/10. This version is treated as
final. Say so explicitly before it reaches a PDF or a case study.

# Reconciliation protocol

1. Copy is authored or amended **here** before it is implemented anywhere.
2. Either chat may propose a change. It lands in this file first.
3. Implementation references the section, so the two never drift.
4. Open items stay listed until answered. Do not invent numbers to close a gap.
5. `docs/` must live on `main` so both branches can read it.

---

# Section E: Canonical closing line

The line that closed the accessibility case study was:

> You do not move faster. You make the work smaller.

Now reads, everywhere:

> You create velocity by making the work smaller.

Reason: the original opens by denying something the reader wants to be true, which
gives them a reason to stop reading at the period. Appears in exactly two case
studies, accessibility and DentalPlans, which sit in different parts of the document.
It must not appear in a third. Twice is a through-line. Three times is a tic.

---

# Section F: Cuts from the delivered DentalPlans draft

Three items were removed before publishing. Each is recoverable if you disagree.

1. **The infrastructure figure, roughly twenty-seven thousand a year.** A former
   employer's internal cost detail. The surrounding sentence makes the same argument
   without it: budget went to marketing the properties rather than hosting them.

2. **"In a company that changed hands under private equity ownership during those
   years."** Section A's own rule bars characterizing an employer's business
   condition, and this one applies to former employers too. It also narrows
   identification considerably when combined with sector, property count, and era.
   The ownership argument survives intact in the sentence that follows it.

3. **Sector markers.** The handoff justified dental references on the grounds that
   the sanitized file "already reference[s] dental procedures." It does not. The only
   two matches in the entire file are the words "accidentally" and "incidental."
   Every existing study is health commerce at a generic altitude. Introducing dental
   would add a new identifying marker rather than match an existing one. Also changed
   "WordPress theme" to "off-the-shelf theme" and "plans" to "products" for the same
   reason.

**Worth deciding explicitly:** DentalPlans is already named on the public site, in
`projects.ts`, with business-results headings for this era. So the company is not
secret. The anonymization rule protects internal detail, not the employer's identity.
If you want a different standard for former employers than for the current one, say
so and I will apply it consistently rather than case by case.
