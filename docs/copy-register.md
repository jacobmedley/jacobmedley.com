# Copy Register

Single source of truth for every piece of written copy across jacobmedley.com.
Both the portfolio workstream and the resume workstream reconcile against this file.

**Rule: copy is authored here first, then implemented.** If copy exists in a component
or a document but not here, it is unreconciled and may be stale.

Read `docs/voice-rules.md` before editing anything in this file.

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

---

# Section A: Employment history

Canonical for both the site resume section and the PDF/DOCX resume. The PDF may
run shorter. It must never contradict this.

## Health-E Commerce

**Director of User and Experience Design**, Feb 2026 to present
**Director of Design**, Feb 2025 to Feb 2026
New York, NY (Remote)

> I joined Health-E Commerce to restructure creative marketing and build an
> experience design practice the company had never had. Rather than absorbing more
> requests, I applied systems thinking and UX research methods to identify the right
> problems to solve, rebuilding intake, process, and creative operations around them.
> The systems and process work was put to the test during peak season, the highest
> revenue period of the year. Demand rose about 70% year over year. We met it with
> about a 7% increase in contractor headcount, and creative delivery held through the
> strongest peak in the company's history.
>
> With creative operations stable, we split the department and I moved full time to
> building the experience design side of the business, a function that had not
> previously existed. I defined the practice and hired the company's first dedicated
> XD/UX designer.

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

**Sr. UX Designer**, 2023 to 2025
Boca Raton, FL

> I led research and scoping for an internally built conversational assistant with
> two outputs: a Salesforce-integrated helper for customer service and account
> management, and a customer-facing assistant on the public site. Handling retirement
> and financial account data meant security, compliance, and accuracy governed every
> decision.
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

## DentalPlans.com

**Sr. Manager of UX & UI Design / Product Manager**, 2015 to 2021
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

## B2. Health-E paragraph one [APPLIED], commit c917fe8
**File:** `components/sections/ResumeSection.tsx`

**FIND:** the entire sentence beginning `The first year closed with roughly a 70% increase in output`. B0 already altered nearby text, so build the anchor from current file state.

**REPLACE WITH:**

> The systems and process work was put to the test during peak season, the highest revenue period of the year. Demand rose about 70% year over year. We met it with about a 7% increase in contractor headcount, and creative delivery held through the strongest peak in the company&apos;s history.

**Note:** the record peak is context, not a causation claim. See Section A for why the wording is deliberate.

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
