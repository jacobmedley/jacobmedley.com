# Copy Register

**Status:** B0 through B87 and B93–B95. B80–B87 published October 8, 2026; B93–B94 published October 8, 2026 in fa2c5f1 (B94 corrects B93 footer wording). B95 APPLIED LOCALLY, not deployed. Earlier edits APPLIED unless marked otherwise. B88–B92 are reserved for the separate private portfolio.
B60 and B64 are implemented in the local full-site integration, not published.
B64 promotes the selected B61/B62/B63 wording from lab to production source and
supersedes B57's dedicated-page deferral. Historical scope notes below remain
part of the record; the latest applicable entry governs.
B58 preserves the long-form leadership source; B59 removed its former placement;
B60 approves the compressed wording for the unified Resume card.
B56 records the full local copy pass; B57 limits this release to the main site.
B39 is applied only in the locally committed dashboard. B40 is superseded by B45,
B41 by B44, and B42 by B46.
The September 8 annotation plan is historical; later applied edits govern the site.
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

## Surface alignment

Four surfaces carry the same claims. A correction that lands on one and not
the register will drift.

| Surface | Owner | Status |
|---|---|---|
| Site | this repo, main | PR #8 merged at e6b3672 on September 8, 2026; deploy workflow succeeded; live cache not independently verified. B39 remains local. See STATUS.md. |
| Word master | resume workstream | v1r6 pending |
| Designed PDF | resume workstream | rebuild after v1r6 |
| LinkedIn | Jacob, manual | UNMANAGED, not in register |

Current-employer operating figures and their source workbook are private and are
not carried in this public register. See private reconciliation REC-0064 and
REC-0065. Do not recover them from repository history for public copy.

Title standard: "Product Design" is constant. Seniority varies by target.
Website brand title: "Product & Design Leader," per Jacob, September 6, 2026.
This website instruction supersedes the earlier public-site title; external resume masters remain under their own workstream.

Assistant wording: one internally built assistant, two deployments. Never
"two assistants."

LINKEDIN IS OUT OF ALIGNMENT. Known violations as of this entry: a colleague
named and quoted in a pre-2011 entry, and an internal codename on the One
Park entry. Both banned without exception. Empty About section. Health-E and
Mutual of America entries have no descriptions. Three older entries carry
pre-audit copy with banned verbs. Six title strings diverge from Section A.
No figures appear anywhere on the profile.

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

**PUBLICATION HOLD.** Detailed current-employer role dates, team structure,
staffing, budgets, function-growth details, and operating metrics are private.
They are intentionally omitted from this public register.

Private provenance: REC-0064 and REC-0065.

The public site now omits the detailed current-employer entry until a
public-safe version is explicitly approved. Do not reconstruct the removed details
from repository history.

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

**Core framework scope, REC-0076:** Jacob and a part-time offshore engineer built
and maintained the core ecommerce framework and its enhancements. Jacob owned the
roadmap and vision and did hands-on design and development. Other designers launched
the individual branded properties. The internal engineering team built the
microservices and APIs the framework connected to. Keep the focused core-framework
build distinct from the full delivery ecosystem.

## One Park Financial

**Director of UX/UI & Product Design**, 2021 to 2022
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

**CONCURRENCY NOTE.** A current-employer metric correction, the future-tense
fix, the data-reporting rounding rule, the assistant wording standard, and the
`EducationSection.tsx` degree-level fix were all found already applied in the
working tree but uncommitted, meaning a parallel session edited the same
tree. Two separate parallel edits were found mid-task: the first set
(current-employer copy, future tense, rounding rule, wording standard) was
already in place when this task began; the second (`EducationSection.tsx`) appeared
between one read of the tree and the next within this same session. Correct
work, no conflict, but uncommitted edits are invisible to every other session
and to the live site, and a second edit landing between two reads inside one
session is the strongest evidence yet for the .tree-lock rule in
`working-agreement.md` Section 2.

## LinkedIn scope

**LINKEDIN SCOPE, RESOLVED.** Entries before 2015 are out of scope and stay as
written. Nobody evaluates a 2008 role on prose quality. Do not re-flag them.

**HYDRA IS A PERMITTED PROPER NOUN.** Hydra was the official name of the design
system, not an internal codename, so the codename ban in jacob-style.md does
not apply. A named design system is an artifact and an insider noun, which
the style file explicitly protects. It stays on LinkedIn, the site, and in
case studies.

Both were flagged as violations and both flags were wrong. Recorded so a
sweep does not rediscover them.

**WORD MASTER DIVERGES BY DESIGN.** The DOCX is single-column with no
leadership bullets. The site and designed PDF carry seven. All Word-version
content lives in the employment entries. Structural difference, not drift.

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

A named colleague reference was removed from project copy and replaced with
function-level attribution. The colleague's identity is private and has been
removed from this public audit trail.

Private provenance: REC-0069.

## B2. Health-E paragraph one [APPLIED], commit c917fe8; later reconciled

Current-employer operating copy from this historical edit has been removed from
the public register. The implementation history remains valid, but the underlying
private wording, figures, and business context are not reproduced here.

Private provenance: REC-0064.

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

> The company owned the custom platform.

## B5. One Park Financial employment entry [SUPERSEDED BY B78]
**File:** `components/sections/ResumeSection.tsx`

An earlier normalization removed `of` after `Director`. Jacob later ruled the
canonical title is `Director of UX/UI & Product Design`. See B78.

## B6. BumblebeeMD employment removal [APPLIED], commit c917fe8, verified no-op
**File:** `components/sections/ResumeSection.tsx`

Searched for any BumblebeeMD reference, employment or otherwise: zero matches.
Nothing to remove. BumblebeeMD never appeared in this file, so there was
nothing that could have been miscategorized as employment. Marked applied
because the check ran and the file is confirmed clean, not because an edit
was made.

## B7. Year-only date formatting [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

Former-employer entries use year-only dates. Current-employer date detail is
private and is intentionally omitted from this public register.

Private provenance: REC-0064.

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

The sweep found real colleague references in project history. Those references
were removed from public project copy and credit was moved to functions rather
than named individuals. The colleague identities and verbatim pre-edit lines have
also been removed from this public audit trail.

Historical/literary figures and fictional research personas are unaffected.

Private provenance: REC-0069.

## B14. Dangling subject in the B4 sentence [APPLIED], commit f2f0995
**File:** `components/sections/ResumeSection.tsx`

The sentence B4 added had no explicit subject, so it read as though the
revenue figures in the preceding sentence were what got built and owned.
Register wording error, not an implementation error.

**FIND:**

> Built and owned outright, with no licensed platform beneath it.

**REPLACE WITH:**

> The company owned the custom platform.

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

The detailed current-employer figures, source-workbook references, population
breakdowns, and measurement caveats formerly recorded here are private. They have
been removed from the public register rather than preserved as an audit trail.

Private provenance: REC-0064 and REC-0065.

## B18. Health-E team composition [APPLIED]

Current-employer team structure, staffing counts, contractor mix, and related
historical corrections are private and are intentionally omitted from this
public register.

Private provenance: REC-0064 and REC-0065.

## B19. Health-E department split [APPLIED]

Current-employer function-growth and staffing details from this historical edit
are private and are intentionally omitted from this public register.

Private provenance: REC-0064.

## B20. Health-E tooling governance [APPLIED]

Current-employer tooling-governance, budget, seat, and headcount-planning details
from this historical edit are private and are intentionally omitted from this
public register.

Private provenance: REC-0064.

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

Public-safe copy retained from this edit:

> Design leadership inside the marketing organization, reporting to the SVP.
>
> Built the case for a unified pattern library and design system, then shipped it. Product, marketing, and engineering had been describing the same components three different ways. Delivery time halved, with work that had taken two sprints landing in one.
>
> The system was complete enough that the product ran for about a year afterward with no design resource, on one engineer and one product manager.
>
> Owned design process and set the usability testing practice. Worked with PPC, SEO, and affiliate channels on conversion rate strategy across acquisition funnels.

Private staffing and business-condition context formerly preserved beside this
entry has been removed from the public register.

Private provenance: REC-0067.

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
2. **Accessibility** — A retired claim was removed from production copy and from
   this public audit trail. Accessibility and WCAG remain valid competencies.
   Private provenance: REC-0066.
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

## B30. Mentorship and team development [RESOLVED BY B60; NOT IMPLEMENTED]
**Surface:** B58 preserves the long-form source. B60 carries the approved four-bullet
version for the unified Resume card. The published page remains unchanged.

Jacob supplied his coaching practice and approved the edited passage on September
19 UTC. This resolves the main-site source gap. A specific mentee's later outcome
remains an optional addition for a longer story, not a fact claimed by this copy.
Original gap assessment retained below as history:

The old "Inclusive Design Culture" bullet, cut under B28, claimed mentoring. Nothing
else in the register, the site resume, or `docs/case-studies-sanitized.md` describes
how Jacob develops people — hiring decisions, growth conversations, review or
feedback practice, career development. This is half of what a design director does
and it is absent from every surface. Flagged as missing evidence in the resume review
as well. **This is the largest content gap in the document.** Needs source material
from Jacob before anything can be written. Do not invent specifics to fill it.

## B31. Health-E measurement correction [SUPERSEDED, see B34]

The private current-employer figures, roster interpretation, leave context, and
source-data details previously preserved in this superseded entry have been
removed from the public register.

Private provenance: REC-0064 and REC-0065.

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

## B34. Health-E measurement reconciliation [APPLIED]

The final current-employer measurement reconciliation is maintained privately.
This public register no longer carries the figures, roster rows, colleague names,
leave information, contractor/employee splits, workbook identifiers, or unresolved
duplicate-row analysis.

Private provenance: REC-0064, REC-0065, and REC-0061.

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

## B37. Design Leadership bullet replaced; Design Practice bullet never existed [APPLIED]
**File:** `components/sections/ResumeSection.tsx`

**Design Practice bullet: not found, match count 0.** A prompt asked to
remove a leadership bullet titled "Design Practice" (design reviews, rules of
engagement, routing outcomes to owners). No such bullet exists in this file
or in this register's history. It was never added, so the set was already
seven bullets before this edit. Nothing removed, nothing to reconcile.

**Design Leadership bullet: replaced, match count 1.** The prior body ("Built
an experience design function where none existed and hired into it. Set a
review model that ends in decisions instead of opinions.") is replaced with:

> Twenty years of one belief: there is always a better way, together we will find it. Put the human at the center and the missing piece shows itself. Sometimes it is the customer facing a gap nobody owned. Sometimes it is the person serving that customer, working around a tool that was never built. I design the process, system, or function that removes it. A platform that scaled five businesses without scaling the people behind them. A design practice where engineers and marketers had been making the interface calls. Scale comes from making the work smaller, not from adding to it.

Deliberately the longest bullet in the set. This also closes both B33 flags:
the bullet no longer opens with "Built" (resolving the opener collision with
Design Systems) and no longer uses "experience" as a modifier (resolving the
collision with AI Product Design).

**Four content-word collisions surfaced, left as-is by Jacob's direction:**
`built` (Design Systems / Design Leadership), `customer`/`customers` (AI
Product Design / Design Leadership), `one` (Design Systems / Design
Leadership), `five` (Design Systems / Design Leadership). See
`jacob-style.md`'s repetition-rule scope note for why: subject-matter nouns
the section cannot avoid, the same fact recurring as the same fact, and
single common words spaced apart enough that no reader hears an echo are all
outside the rule's target.

## B38. Main portfolio section heading restored [APPLIED]

**File:** `components/sections/FullStackSection.tsx`

Jacob restored the visible section heading to `Full Stack Designer` on September 7,
2026. The navigation label remains `Selected Work`, and the stable `#full-stack`
anchor remains unchanged. This direct instruction supersedes the heading portion of
the earlier Wave 3 rename; it does not change the site hero title standard in B35.

## B39. Career dashboard framing [APPLIED]

**Publication state:** applied and locally verified on
`codex/case-study-dashboard-refinement`, preserved in `8ee1310` before base
operations and replayed as `69a6b22` on merged main for Stage 1. Not published.
See [Stage 1 checkpoint](stage1-checkpoint-20260909.md) for the current branch. See
`case-study-dashboard-acceptance.md` for the prior local checks and `STATUS.md`
for the current handoff. APPLIED here does not mean deployed.

Jacob requested four large-number cards in the standalone case-study hero on
September 8. Reuse documented figures, not inferred lifetime totals:

- `20` / `Years in design`, from B37's twenty-year career description. Source link:
  the main site's Resume section, opening separately as an outbound site link.
- `5` / `properties on one platform`, canonical platform story proof[1].
- `47%` / `of company revenue growth in one measured year`, canonical platform
  proof[2]. Attribution reads `Finance Attributed`. The visible clarification reads
  `Share of that year's growth increment.` This is not a revenue or sales lift.
  The source story retains mechanism.
- `6 → 2` / `weeks to launch a property`, canonical platform proof[0]. Split into
  `Before` and `After` in the featured timing comparison. Six equal week marks before,
  two after; no newly derived percentage. The hero uses the original value verbatim.

Dashboard labels `Career at a Glance`, `Experience`, `Shared Foundation`, and
`Launch Cycle` describe these same sources. Supporting qualitative outcomes stay
qualitative. All source-story prose, disciplines and titles remain unchanged.

## B40. Design Leadership introduction and column order [SUPERSEDED BY B45]

Source: Jacob's September 8 browser comments 6–8. Owning implementation file:
`components/sections/ResumeSection.tsx`. Stage 2 of the September 8 refinement plan.

- Move the exact B37 body from the Design Leadership bullet to the main paragraph
  immediately beneath the existing Design Leadership heading and before both
  bullet columns. Remove that bullet and its redundant label; do not duplicate it.
- Put the existing AI Product Design item first in `leadershipLeft` and Business
  Outcomes first in `leadershipRight`. Preserve the current canonical bodies and
  the relative order of the remaining items. On mobile, retain left-column then
  right-column DOM reading order after the introduction.
- This changes placement only. B37's wording, the assistant scope corrections,
  measured-year qualification and business figures remain canonical. Historical
  B28/B37 references to the old bullet layout are an audit trail.

Stage 1 verified the current B37 body matches the existing Design Leadership bullet exactly. Left order after placement: AI Product Design, Design Systems, Research and Measurement. Right order: Business Outcomes, Conversion and Experimentation. One introduction precedes both columns. No site edit for B40 has been made. The layout request is authorized for its future
stage; it does not need a fresh copy rewrite or renewed permission for placement.

## B41. Comparable main featured-study summaries [SUPERSEDED BY B44]

Source: Jacob's September 8 browser comment 12. Scope: the five featured `summary`
fields in `lib/data/projects.ts`, used by the homepage WorkCard: WebMD, DentalPlans,
BumblebeeMD, Hydra and One Park Financial. Their current whitespace word counts
are respectively 27, 58, 23, 27 and 21.

Stage 1 authors the exact proposed replacements here before any implementation;
Stage 2 applies the approved drafts. Start around 25–35 words and compare rendered
lengths. This is an approximate visual target, not permission to invent outcomes,
pad short stories or erase a needed mechanism. Preserve Jacob's actual role,
platform scope and BumblebeeMD's retired status. Review Hydra's `championed` and
`streamlined` against the style authority. Do not change detailed project content,
standalone canonical JSON, source attribution or diagrams to achieve equal length.

**Stage 1 source-reviewed drafts, September 9, 2026. Not applied; Jacob’s copy approval remains pending.**

### WebMD

> I led UX/UI design and front-end development for an ecommerce website combining WebMD’s brand with DentalPlans’ products. The work covered plan search, comparison, cart and checkout.

### DentalPlans

> I led design and front-end development for a shared ecommerce platform. Brand configuration, reusable components and common product data supported five properties, with launch time per property falling from six weeks to two.

### BumblebeeMD

> BumblebeeMD launched as a DentalPlans sub-brand on the shared product platform. It was one of five properties built on that framework and was later retired.

### Hydra

> I built Hydra to give products a shared design vocabulary across brands and technology stacks. The system joined reusable interface patterns with front-end components while leaving the underlying functional code intact.

### One Park Financial

> I redesigned One Park Financial’s corporate website and lead flow as part of the Hydra implementation. Visitor behavior, device performance, heat maps and scroll maps informed the interface decisions.

Source review: WebMD contribution badges and plan/cart/checkout media; DentalPlans B27 and platform source JSON; BumblebeeMD B10 and current summary; Hydra The Rise of Hydra prose; One Park Financial current brief. No performance figure was added. DentalPlans preserves the per-property launch unit and shared-platform mechanism. BumblebeeMD remains a retired platform property, not an employer or independent venture. WebMD’s six-week first launch is intentionally absent to avoid confusing it with the later platform launch cycle. Hydra removes the banned verbs without adding a delivery claim. All five drafts were authored here before the review artifacts. Existing production summaries remain unchanged.

Counts use whitespace-delimited words: WebMD 26, DentalPlans 33, BumblebeeMD 25, Hydra 31, One Park Financial 29. Counts are a guide; the review board shows all five at the same desktop/narrow copy widths without clamping.

## B42. Motion-control labels [SUPERSEDED BY B46]

Proposed interface strings for the shared pause/resume control in Stage 3:

- While decorative animations are running: `Pause animations`.
- While paused: `Resume animations`.

Stage 1 accepts these action labels for the specification. Use a normal button whose label changes with the available action; do not pair changing labels with aria-pressed. With OS reduced motion, show noninteractive status `Animations off: reduced motion` and offer no override. On a user pause, freeze decorative motion and cancel interaction zoom; preserve the preference across both site surfaces. These describe an action rather than a marketing claim. Define accessible state and
reduced-motion behavior in Stage 1's motion specification; do not present a control
as running when reduced motion has made it static. This is proposed supporting copy
for the requested cross-site motion/accessibility work, not an applied UI change.

---

## Implementation hazard

B0 already edited `ResumeSection.tsx`. Any FIND anchor for that file must be
built by reading the current file, not from the pre-fix text quoted anywhere in
this register.

# Section C: Portfolio UI strings

## September 8, 2026 main-site annotations

Jacob's direct instruction: the navigation link for `#full-stack` reads `Full Stack`.
The section heading remains `Full Stack Designer`. The hero slogan reads
`I believe there's always a better way, together we will find it.` The rest of the
introductory paragraph is unchanged. These supersede the earlier navigation label
and the extra conjunction in the hero slogan.

## Public case study pages, refined edition

Canonical implementation copy for `/case-studies/` is authored in
`docs/case-study-site-copy.json`, imported directly by the new pages so prose
is not duplicated in components. This edition selects six cleared studies
from `docs/case-studies-sanitized.md`; every entry records its source.

Index headline: "The thinking behind the work."
Introduction: "I design products, build systems, and make room for teams to do
better work. These are the problems I took on, the decisions I made, and what
changed."

Homepage entry: "The thinking behind the work"; "Problems, decisions, and
results across product design, systems, and leadership."; "Explore the case
studies". Index section title: "Different problems. Deliberate decisions."
Footer uses the complete signature line from voice-and-tone.md.

The problem / journey / solution / results structure follows Jacob's
explicit request for this edition. Platform figures follow Section A, B26,
and B27: six to two weeks per property; five properties; finance-attributed
47% of company revenue growth, 27% of total lead capture, and 20% of overall
revenue in one measured year. No derived percentage is added. Other studies
describe documented capability, findings, and decisions without inventing
business lift. Team scope is historical to each study, not current headcount.

Diagrams are explanatory reconstructions of the cleared narratives, labeled
as such on detail pages. They are not original project artifacts. No private
boards or screenshots from unrelated work are presented as evidence.

The retired accessibility and reviews studies are excluded. Accessibility
in the token study is a competency applied to tokens, not an auditing pipeline.
Existing modal copy and the unmerged recruiter portfolio remain separate.

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

**REVIEWS THAT END IN DECISIONS, REMOVED.** The practice was Jacob's. He set
rules of engagement, required critique to arrive with a proposed solution,
and routed outcomes to owners. It worked, then eroded once he stopped
enforcing it against pushback. Removed by choice rather than for accuracy.
Not a fabrication and not a compression failure. Do not restore it without
asking.

Removed from `docs/case-studies-sanitized.md`, Part Two: Core Craft (was
between "Tokens Before Surface Area" and "Estimates That Excluded the
Work"). Sanitized study count: 16 before removal (7 Part One, 9 Part Two),
15 after (7 Part One, 8 Part Two) — this file's own header ("Fifteen case
studies... eight on core craft") was already stated as if the removal had
happened; it now matches the actual count for the first time.

**Count superseded 2026-09-05:** the accessibility study removal (below) took
Part One from 7 to 6, so the current sanitized count is **14 (6 Part One, 8
Part Two)** and the header now reads "Fourteen case studies. Six where AI
carries the work, eight on core craft." The 15/16 figures above are the state
as of the reviews removal, kept as audit trail.

Also exists on `feat/recruiter-portfolio`, `lib/data/portfolio-studies.ts`,
slug `reviews-that-end-in-decisions` (confirmed via `git show`, branch not
checked out). **That branch needs the same removal** — not done here, since
this task's scope was `main` only.

No reference to it in `lib/data/projects.ts`. One other sanitized study
references the underlying practice without naming this study: "Building the
Function That Was Not There" (the closing study, Part Two) lists "A review
operating model with rules and routing" among what got built. Left as-is —
reporting only, not in scope to edit here.

**B28's sourcing note: not found.** This task asked to mark superseded a
note in B28 citing this study as the source for the review-model claim in
the old Design Leadership bullet. No such citation exists — B28 (below) and
B33 both introduce the "review model that ends in decisions instead of
opinions" phrasing directly in their own bullet text, without citing
`case-studies-sanitized.md` or this study by name anywhere. Reporting the
mismatch rather than fabricating a citation to supersede. What IS accurate:
the claim itself is superseded, twice over — B33 already replaced it once,
and this session's Design Leadership rewrite (B37) replaced it again, so no
live copy anywhere still carries the "review model" phrasing this study
would have sourced.

**ACCESSIBILITY CLAIM, RETIRED 2026-09-05.**

The retired claim, its implementation details, its recalled outcome language, and
the removed case-study audit trail are private and are intentionally not reproduced
in this public register.

Publicly allowed: accessibility and WCAG as competencies. The retired case study
must not be restored.

Private provenance: REC-0066.

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

**FINAL, confirmed by Jacob.** REC-0059 settles the specification at
0.1–0.4 / 3 / 7 / 10. No additional confirmation gate remains.

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

**Updated 2026-09-05:** the accessibility case study was removed, so the line now
appears in exactly one study, DentalPlans. It may appear in a second. It must not
appear in a third.

---


## B77. Public-register privacy scrub [APPLIED]

Private reconciliation identified material that had been removed from live copy
but was still exposed by this public audit file. This pass removes the sensitive
details themselves while preserving neutral provenance.

Removed from this public register:
- current-employer role/date and operating detail covered by REC-0064/0065;
- real colleague identities covered by REC-0069;
- retired accessibility implementation/outcome detail covered by REC-0066;
- private One Park staffing/business-condition context covered by REC-0067;
- private DentalPlans internal-cost and business-condition detail covered by REC-0068.

The private `jacobmedley/knowledge` reconcile ledgers remain the authoritative
history. Do not reconstruct removed details from public git history for new copy.

---

## B78. One Park title ruling [APPLIED]

Source: Jacob ruling, REC-0073.

Canonical title for One Park Financial:

> Director of UX/UI & Product Design

This supersedes B5 and any current-surface variant that omits `of` after
`Director`.

---

## B79. Reconciliation corrections [APPLIED]

Source: REC-0059, REC-0071, REC-0075, and REC-0076.

- Response timing is final at 0.1–0.4 / 3 / 7 / 10; the old confirmation gate is removed.
- The site slogan uses `There is always a better way, together we will find it.`
- WebMD's focused two-week site build is distinct from the full launch; do not call
  the whole launch a two-person effort.
- DentalPlans' core ecommerce framework was built and maintained by Jacob and a
  part-time engineer. Other designers launched branded properties, and internal
  engineering supplied the microservices and APIs.
- Ownership language stays bounded to a proprietary/company-owned custom platform.
  Do not claim that nothing beneath it was licensed.

---

# Section F: Cuts from the delivered DentalPlans draft

Three items were removed before publishing. Each is recoverable if you disagree.

1. **Private internal-cost detail.** Removed before publication and removed from
   this public audit trail. Private provenance: REC-0068.

2. **Private ownership/business-condition detail.** Removed before publication and
   removed from this public audit trail. Private provenance: REC-0068.

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


## B43. Shared motion control labels [APPLIED]

**Files:** `components/ui/MotionControls.tsx`, `app/layout.tsx`

The shared control uses the registered labels **Pause motion** and **Resume motion**.
It is available on both the homepage and standalone case-study surface, with the
current state exposed through `aria-pressed`.

## B73. Remove the shared motion control [APPLIED]

Source: Jacob's September 23, 2026 direct request.

The visible **Pause motion** / **Resume motion** control is removed from the site.
Automatic offscreen, hidden-document, and operating-system reduced-motion behavior
remains. This supersedes B43 for the current interface.

## B44. Comparable homepage featured-study excerpts [APPLIED]

Source: Jacob's September 9 browser comment 4. Scope: the five homepage featured
`summary` fields in `lib/data/projects.ts`: WebMD, DentalPlans, BumblebeeMD, Hydra
and One Park Financial. This supersedes B41. The detailed modal paragraphs and
standalone case-study copy remain outside this edit.

Jacob directed that the BumblebeeMD excerpt remove the retirement sentence and
that all five excerpts use approximately the same character count. No new figures
or outcomes are introduced.

### WebMD, 182 characters

> I led UX/UI design and front-end development for an ecommerce website combining WebMD's brand with DentalPlans' products. The work covered plan search, comparison, cart and checkout.

### DentalPlans, 203 characters

> I led design and front-end development for a shared ecommerce platform. Brand configuration, reusable components and common product data carried five properties and cut each launch from six weeks to two.

### BumblebeeMD, 179 characters

> BumblebeeMD launched as a DentalPlans.com sub-brand on the shared product platform. It was one of five properties using the same design, product data and ecommerce infrastructure.

### Hydra, 201 characters

> I built Hydra as a shared design vocabulary across brands and technology stacks. Reusable interface patterns and front-end components kept products consistent while their functional code stayed intact.

### One Park Financial, 189 characters

> I redesigned One Park Financial's corporate website and lead flow through the Hydra system. Visitor behavior, device performance, heat maps and scroll maps informed each interface decision.

## Website brand cleanup, September 6, 2026

Source: Jacob's 21 browser annotations and subsequent instruction to begin the
staged site work with a recovery checkpoint. This section governs the current
website branch; employment titles, claims and external resume masters are unchanged.

- Public brand title and metadata: Product & Design Leader.
- Case-study eyebrows, category/filter labels, diagram labels and badges use
  Title Case; headlines, quotations and prose use sentence case. Preserve acronyms.
- Label separator: //, including Jacob Medley // Selected Work and the dynamic
  collection count, 6 // Case Studies (1 // Case Study for a single result).
- Action labels: Read the story, View, Read case study, Explore the case studies.
  The arrow follows the label; an external destination uses the external-link icon.
- Case-study navigation: Case Studies; About & experience; More about Jacob.
- Existing case-study-copy JSON remains the canonical story source; these casing
  edits do not change its metrics, narrative, scope or provenance.

## B45. Resume belief headline and balanced introduction [APPLIED]

Source: Jacob's September 11 overnight housekeeping request and resume annotation.
This supersedes B40's retained Design Leadership heading and B37's opening sentence
placement on the website. External resume documents remain separately owned.

- Remove the visible Design Leadership heading.
- Headline: `Twenty years. One belief.`
- Subheadline, matching the existing registered hero slogan:
  `I believe there's always a better way, together we will find it.`
- Body, unchanged after the former opening sentence:

> Put the human at the center and the missing piece shows itself. Sometimes it is the customer facing a gap nobody owned. Sometimes it is the person serving that customer, working around a tool that was never built. I design the process, system, or function that removes it. A platform that scaled five businesses without scaling the people behind them. A design practice where engineers and marketers had been making the interface calls. Scale comes from making the work smaller, not from adding to it.

Use a larger body, an explicit horizontal rule before the five existing bullets,
and balanced rows: AI Product Design / Business Outcomes; Design Systems /
Conversion and Experimentation; Research and Measurement across the final row.
All bullet wording, employment history, measurements and source links are retained.

## B46. Consistent motion controls inside and outside modals [APPLIED]

Source: Jacob's September 11 request to review all buttons and the full experience.
Retain the existing action labels `Pause motion` and `Resume motion`, and reuse
them for the synchronized modal control. These action buttons change their label
and do not also expose toggle-button `aria-pressed` semantics. With an OS reduced
motion preference, show the noninteractive status `Motion off: reduced motion`.
The preference cannot be overridden here. This supersedes B42's proposed labels
while implementing its action/state and reduced-motion distinction.

## B47. Source-backed supporting imagery [APPLIED]

Source: the September 11 release plan and its requirement to replace unresolved
supporting cartoons with restrained, source-backed visual explanations. Scope is
limited to the DentalPlans, Hydra, A/B testing, Personas and Personalization modal
imagery named in `docs/release-plan-20260911.md`. This entry authorizes supporting
diagram labels and accurate alternative text; it does not change project claims,
measurements, titles, summaries or narrative prose.

- DentalPlans platform diagram labels: `Shared Platform`, `Product Data`,
  `Search & API`, `Promotions`, and `Deployment`. Alt text: `Shared ecommerce
  platform connecting product data, search and APIs, promotions, and deployment.`
- DentalPlans iteration one labels: `MVP 01`, `WordPress`, `Bootstrap`,
  `Product`, and `Cart`. Alt text: `First MVP joining a WordPress storefront,
  Bootstrap interface, product details, and cart.`
- DentalPlans iteration two labels: `MVP 02`, `Two Brands`, `Shared Product
  Data`, and `Shared Cart`. Alt text: `Second MVP connecting two branded
  storefronts to shared product data and cart.`
- DentalPlans iteration three labels: `MVP 03`, `Patterns`, `Components`,
  `Microservices`, and `Properties`. Alt text: `Third MVP carrying shared
  patterns and components through microservices to multiple properties.`
- DentalPlans iteration four labels: `MVP 04`, `ZIP`, `Results`, and `Dentist
  Profile`. Alt text: `Fourth MVP flow from ZIP search to results and a dentist
  profile.`
- Hydra supporting diagram labels: `Shared Vocabulary`, `Patterns`,
  `Components`, `Brands`, and `Technology Stacks`. Alt text: `Hydra connecting
  shared interface patterns and components across brands and technology stacks.`
- The A/B testing lead uses the existing control and winning WebMD homepage
  screenshots. Alt text: `WebMD homepage control` and `WebMD homepage, winning
  variant V1`.
- The Personas lead uses the existing source persona artifact. Alt text:
  `Frugal Francine persona card with demographics, motivations, preferences,
  channels, and reasons to buy.` The later duplicate presentation of that artifact
  may be removed; its surrounding case-study narrative stays unchanged.
- Retain the Personalization automation GIF and its existing static frame. The
  registered alt remains `Animated walkthrough of the marketing automation
  workflow`; the static frame remains decorative because it is the paused rendering
  of the same content.

The diagram labels above are explanatory interface copy derived only from the
adjacent registered project narrative. They are not presented as original project
artifacts or as new evidence. The five replaced DentalPlans cartoon files and the
Hydra fantasy illustration remain in the repository as preserved originals but are
removed from rendered project data.

## B48. September 11 aesthetic copy refinements [APPLIED]

Source: Jacob's September 11 browser comments 2–4, 8, 33 and 34. This entry
supersedes B45 only where the exact Resume headline, slogan and visible leadership
set differ. It does not change employment history, project claims, measurements,
source evidence or external resume masters.

- Resume belief headline: `One belief...`
- Resume belief slogan: `There is always a better way, together we will find it.`
- Remove the visible `Research and Measurement` leadership item. Retain the four
  remaining items in this order and two-column pairing: AI Product Design / Design
  Systems in the first column; Business Outcomes / Conversion and Experimentation
  in the second column. Their wording is unchanged and explicitly flagged for a
  later Jacob copy review.
- In the Hydra study, remove the redundant standalone `The Problem` heading. In
  the following narrative column, use `The Problem` as the H3 and `Severe UI
  Fragmentation` as the H4 before the existing prose.

The revised slogan is Jacob's direct surface-specific wording for this Resume
section. It intentionally differs from the earlier reusable slogan recorded in
B45 and `docs/voice-and-tone.md`; do not propagate it to other surfaces without a
new direct instruction.

## B49. September 12 visual-system and kinetic-hero labels [APPROVED]

Source: Jacob's September 12 browser comments 1, 4, 5, 6, 8, 14 and 15. This
entry authorizes the short interface labels needed for the approved card,
schematic and kinetic-type treatments. It does not revise case-study narrative,
employment history, measurements or source evidence.

- Homepage semantic H1: `Jacob Medley`.
- Kinetic identity sequence: `Product`, `UX`, `Systems`, `Service`, `Motion`,
  `Interaction`, `Human`. The visible construction is `{ Product } + Design`
  with the role word changing in that order. `Interaction` corrects the typo in
  the browser annotation without changing its meaning.
- Kinetic closing line: `Let's Design and Build Something Great Together!`
- A/B Testing contributions: `Strategy`, `Analysis`, `UX`, `Planning`,
  `Implementation`.
- A/B Testing technologies: `Adobe Target`, `WordPress`. Adobe's current product
  documentation confirms the name remains Adobe Target as of September 12, 2026.
- Call-center schematic labels: `Site`, `Status Check · 5 min`, `Call Center API`,
  `State Response`, `Open`, `Busy`, `Closed`, `Message + Offer`. These labels
  compress the existing registered narrative: the API checks availability every
  five minutes, returns a state, and changes site messaging and the offer.
- Reveal concept-card heading: `Concepts`.

The source crop for `reveal-clear-01.jpg` remains unchanged and is recorded as a
required source-image replacement in the September 12 handoff document.

## B50. September 12 Resume timeline disclosure [APPROVED]

Source: Jacob's direct September 12 continuation request. This entry authorizes
the `Read more` interface label for the expandable work-history timeline. It does
not revise employment history, job titles, dates, locations, metrics, narrative
sentences, leadership copy or external resume masters.

- Work-history disclosure label: `Read more`.
- All timeline entries are closed by default. One entry may receive visual
  emphasis without adding a factual label or changing its text.

## B51. No all-caps display treatment [APPROVED]

Source: Jacob's September 12 call-center browser comment. Ordinary headings,
eyebrows, badges and labels use title or sentence case across the site. Standard
acronyms and proper names retain their registered spelling. This is a typographic
rule and does not authorize rewriting narrative copy.

The call-center example uses the recommended contextual section treatment: a
restrained Font Awesome icon, a title-case heading and the established faded rule.
It is the first reviewed example, not authorization for a blind modal-wide sweep.

## B52. September 12 modal presentation follow-up [APPROVED]

Source: Jacob's later September 12 browser comments. Remove visible motion-pause
controls everywhere. Remove the rendered Data-Driven Personalization brief GIF and
Team Workshops brief image from their post-hero slots while preserving their source
files and registered narrative. Move Reveal's three existing concept cards below
the hero without changing their labels or bodies. These are presentation changes;
no employment fact, project sentence, metric, title or source asset is revised.

## B53. September 12 mechanical visual-system continuation [APPLIED]

Source: Jacob's nineteen-item continuation request in task 01a0978b, followed
by approval of its continuation branch and explicit selection of Roadmap for
the standalone follow-up image removal. Supersedes B49/B50 only as listed here.

- Visible hero name: `Jacob Medley`, without decorative slashes.
- Mechanical role sequence: `Product`, `UX`, `Systems`, `IdX`, `Human`, paired
  with `+ Design`. Preserve `IdX` exactly as Jacob supplied it.
- Keep the registered closing line: `Let's Design and Build Something Great Together!`
- First Reveal concept section: `The thinking behind the idea`, brain icon.
- Later Reveal image section: `Visual expression of the concept`, visual-design icon.
- Resume disclosures: `More` when closed, `Less` when open. Accessible contextual
  naming may append the unchanged employer string after either label.
- Remove visible `Contributions:` and `Technologies:` headings globally; retain
  semantic group names, the faded contribution divider and all category/badge text.
- Remove the rendered Roadmap standalone post-hero image. Preserve its source.

No employment title, period, location, metric, paragraph, leadership sentence,
project narrative or other source asset changes are authorized by this entry.

## B54. Browser refinement contribution labels [APPLIED]

Source: Jacob's September 12 comments 3 and 16 authorize a maximum of four
modern product/UX contribution labels per project and removal of rendered
technology badges. These labels summarize existing contributions, not new work.
Underlying technologies remain historical data. Broader copy rewriting is
deferred until all visual refinements are complete (comment 17).

| Project | Contribution labels in display order |
|---|---|
| webmd | Product Design; Design Leadership; Prototyping; Usability Testing |
| dentalplans | Product Ownership; Design Systems; UX & UI Design; Front-end Development |
| bumblebeemd | Product Design; Design Leadership; Prototyping; Usability Testing |
| hydra | Design Systems; Design Leadership; Systems Analysis; UI Engineering |
| opfred | Product Design; User Research; Prototyping; Design Leadership |
| split-test | Experimentation; UX Strategy; Data Analysis; Implementation |
| call-center-ux | Project Leadership |
| marketing-auto | UX & UI Design; Responsive Design; Design Leadership; Integration Strategy |
| workshops | Workshop Facilitation |
| roadmap | UX Roadmapping |
| personas | Project Collaboration; Visual Design |
| reveal | Concept Development; Collaboration; Visual Design |
| viva | Concept Development; Collaboration; Visual Design |
| wrong | Design Leadership; Collaboration; Visual Design |

Hero name, role spellings and closing line remain as registered in B53. Resume
facts, dates, company names, narrative, leadership and education text are unchanged.

## B55. Hero spelling and interactive call-center demo [APPLIED]

Source: Jacob's next eight browser comments, September 12, task 01a0978b.
Supersedes B53's `IdX` spelling with `IxD`. The five-role order and closing
line remain unchanged. Braces stay around the role; the closing line only fades.

Replace the three static site states with a labeled interactive demo. Interface
labels: `Responsive site states`, `Interactive demo`, `Call center`, `Auto`,
`Ready`, `Busy`, `Closed`, `Highlight`, `Header`, `Sitewide banner`, `Hero`.
Phone brand: `DentalPlans.com`; header actions: `Call now`, `Shop online`.
State messaging and offers, directly specified by Jacob for this demonstration:

| State | Header / banner | Hero | Action |
|---|---|---|---|
| Ready | Ready to help / Our team is ready. Call for help choosing a plan. | Find your dental savings plan. / Talk to our team or explore plans online. | View plans |
| Busy | High call volume / Skip the wait. Save 15% online only. | Keep smiling. Skip the wait. / Our team is busy. Buy online and save 15%. | Save 15% online |
| Closed | Call center closed / We are closed. Save 10% when you buy online. | Your next step is online. / Explore dental savings plans and save 10% online. | Save 10% online |

Control descriptions: `Watch the site respond to call-center availability.`,
`No offer. Phone support is available.`, `15% off online only.`,
`10% off online.`, `Emphasize the areas that change.`,
`Auto cycles every 5 seconds. Choose a state to stop.`,
`Reduced motion: choose a state to preview it.` Phone supporting labels:
`Explore plans`, `Compare plans`, `Find a dentist`, `Choose a plan`,
`Browse dental savings plans online.` Demonstration navigation opens a small
menu containing `Explore plans`, `Find a dentist`, and `Close menu`; plan
actions show `Plan comparison preview` and `Back to home`; call action shows
`Phone support is available.` and `Back to home`. Accessible names may describe
the controls and simulated preview. These figures are demo offer values,
not a new historical result or measurement claim. No external transaction.

Future copy note, comment 7: expand the BumblebeeMD brief in the later copy
pass. Jacob finds the current one-of-five-properties summary too thin. No
replacement or additional claim is approved in this pass.

## B56. September 17 copy implementation and continuing hero [APPLIED LOCALLY]

Source: Jacob's direct request to start copy work, address the stopping animation,
move forward on missed items, and update the linked Site Content Audit spreadsheet.
The September 17 audit approvals and Jacob Notes are source material for this work.
The working implementation text is registered in `docs/copy-pass-20260917.json`,
keyed to the workbook IDs. This manifest is part of this register entry; its ledger
records direct implementations and shared-copy consolidations. The workbook keeps
draft status separate from Jacob's original decisions and unresolved questions.
Original spreadsheet approval decisions and Jacob Notes must be preserved.

Revise the hero and the BumblebeeMD, Hydra, lead-flow, personalization, and design
practice passages using Jacob's notes. Use research leadership language for the
navigation study. Keep role rotation and the opening mechanism. Supersede B53's
old closing sentence and finite endpoint with the registered hero copy and a
continuing role cycle; reduced motion remains static. Do not claim unsupported
revenue causation, research execution, current tool usage, or measurement details.
H-043 omits the proposed 'before launch' timing because the source does not establish it.
Demo offers are illustrative; remove percentages according to the approved audit.
All 141 action rows are addressed locally (131 direct, 10 shared-copy consolidations).
Build and scoped browser verification passed; see `docs/copy-pass-20260917.md`.
New copy is local pending publication, not live. This entry supersedes B55's
illustrative discount percentages as directed by the current audit.

## B57. Main-site release scope and entry controls [APPLIED]

Source: Jacob's September 18 request to clean up, merge, and push the main site,
while leaving dedicated case studies for later; confirmed September 19 UTC.

Carry B56's homepage, existing work-modal, experience, education, demo, and
metadata copy from checkpoint `d8d7380`. The original manifest remains a record
of that complete local pass, not a claim that every row ships in this release.
Dedicated `app/case-studies/`, `components/case-studies/`,
`docs/case-study-site-copy.json`, and `lib/data/case-studies.ts` retain the
published baseline. Their later copy remains on `codex/copy-animation-20260917`.

The homepage hero action reads **Explore selected work**, with the same
accessible name, and points to `#work`. Main navigation remains in-page:
**Hello**, **Case studies**, **How I work**, **Experience**, **Education**.
The work cards open the existing homepage modals. No homepage link to the
dedicated case-study index is introduced. Direct URLs remain available as before.

The continuing hero cycle and reduced-motion spacing fix ship with this copy.
The A/B examples use neutral alt text matching their visible variant labels:
`WebMD homepage, variant V1` (both references) and
`Savings calculator landing page, variant V1`. The earlier local pass removed
the visible winner claims; alt text must not reintroduce them. Keep source image
filenames unchanged. Correct the historical technology label to `Adobe Scene7`,
the spelling already required by `jacob-style.md` and employment history.
No new results, current-tool proficiency, unidentified partner name, or proposed
restoration is inferred. Tool names are explicitly historical to the listed roles.
The full local-pass report is historical evidence; this release's verification
and remaining copy decisions belong in `main-site-wrapup-20260919.md`.

Published September 19 UTC through PR #10, deployment commit `7bcb9e0`, v12.155.
B56's dedicated-page work remains local and deferred. Main-site B30 remains open.

## B58. Developing people [DRAFT PRESERVED; PLACEMENT REMOVED BY B59]

Source: Jacob's first-person account of servant leadership, coaching junior staff,
autonomy, risk, and accountability in task 01a0b75f, followed by explicit approval
of the edited draft: "That sounds great. aproved." September 19, 2026 UTC.
This resolves B30 for main-site copy. Preserve the approved wording verbatim.
Place in About and experience, alongside the experience timeline, between
Expertise and Apps & Tools. No employer, colleague, metric, or mentee outcome is
added. The longer anecdote remains optional. Approval of this passage is recorded
separately from publication; this checkpoint does not authorize another deploy.

### Developing people

I walk beside junior staff as they learn to exercise their own judgment. That can mean working through a conflict or sitting together with a design exercise. When someone gets stuck, I start with questions: How would you solve this? What are you depending on? What part can you move forward now?

I make their authority explicit. They can assess the risk and make decisions without bringing every next step back for permission. My responsibility is to stay available, work through obstacles beyond their control, and hold others accountable for commitments the team depends on.

People need time to suck at something new. I encourage my reports to stretch beyond what they already know, with room to make mistakes and talk openly about them.

Ownership continues after the decision. We review the outcome together and follow through on what we learn. That includes changing the conditions behind a mistake and understanding good results well enough to repeat them.

## B59. September 19 browser annotations 1–8 [APPLIED LOCALLY]

Source: Jacob's eight comments on the local resume and education preview.
Remove Developing people from the page while Jacob rethinks the leadership
content and its placement. Preserve B58 verbatim as a draft; do not rewrite it.
Show Apps & Tools and all three existing grouped tool lists without a disclosure.
Keep the existing qualification, `Tools used across these roles`, as visible copy.
No proficiency claim, credential wording, external URL, or experience fact changes.

Shared experience disclosures: a rule above More/Less, an adjacent directional
chevron, and a top-right plus that spins to an X as the content opens. Apply to
all five experience cards, retain native summary semantics and reduced motion.
Improve spacing before the experience columns and readability of grouped lists.
Education uses tighter card padding, source directly beneath the title when the
card allows, and stacked content on narrow cards. Correct the heading's dark
color on the dark education background, including after scrolling past the top.
This remains a local preview pass; no merge, push, or deploy is requested here.

## B60. Main-site editorial consolidation [APPROVED; NOT IMPLEMENTED]

Source: the September 19 main-site editorial workstream in task
`01a0ba6e-f542-77a3-b0f5-c8172fbdf40a`, using the approved B58 practice,
Jacob's September 19 experience-program brief, and the published v12.160 source.
This is one approved pass. It does not revise homepage study summaries,
employment facts, metrics, education names, dedicated case-study prose, or the
historical scope of the tools list.

**Approval:** Jacob approved `B60 - Unified Resume Card` in visual-system task
`01a0ba6e-ce13-7701-a6a9-206e048245ea` on September 19, 2026. The same direction
selected Quiet Prism, Title Case eyebrows, faded-end rules, tighter eyebrow/title
spacing, and top alignment for the right-side content icon. Those presentation
decisions belong to the visual-system workstream. This entry owns the exact wording
and the `How I lead the work` label. Approval does not authorize publication.

### Team Building and Mentorship

- I walk beside junior staff, asking questions until they can name the next step,
  dependency, or piece they can move now.
- I make authority explicit. People can assess the risk and decide without
  bringing every next step back for permission.
- I stay available and remove blockers beyond their control.
- We review outcomes together. We change the conditions behind mistakes and
  understand good results well enough to repeat them.

These four bullets compress B58 without adding an employer, colleague, metric,
mentee result, permission claim, or management promise. The third bullet is
deliberately short. The set belongs above Expertise in the proposed unified side
card; visual placement remains owned by the visual-system workstream.

### One label correction

In About and experience, change the local heading `How I approach the work` to
`How I lead the work`. The current page already uses `How I work` for the prior
section. The new label removes that near-duplicate and more accurately introduces
the leadership belief, leadership examples, and mentorship material that follow.
The slogan and body beneath it stay unchanged.

### Preserve the rest

Keep the hero, navigation, five homepage study summaries, How I work introduction
and teasers, four leadership examples, all employment entries, Expertise wording,
the visible `Tools used across these roles` qualifier, tool names, education labels,
More/Less controls, external-link context, modal Close labels, demo labels, email,
and footer copy as published in v12.160. Current tool proficiency remains unknown;
the historical qualifier is why the existing list is safe. A stronger current-use
claim needs fresh confirmation from Jacob.


## B61. Quiet Prism visual-lab card language [APPLIED LOCALLY]

Source: Jacob's selected Quiet Prism direction and September 19 visual-reference
correction. This supplements the separately approved B60 unified Resume card and
governs the isolated, unlinked visual-system lab only; it does not revise
production case-study copy.

The featured WebMD specimen uses the text action `View case study` and the
distinct closing slogan `People · Process · Better outcomes`. Informational-card
actions are `Read my approach`, `See how I work`, `Explore experience`, and
`View education`. The approved card descriptions are the reference wording
shown in the selected Quiet Prism source. The WebMD heading and summary remain
registered production wording until the dedicated case-study copy is approved.
The specimen label is `Informational Cards`, with the heading
`Clear paths into the work`. The motion note explains that a soft light field
moves through the waves and freezes for reduced motion.


## B62. Quiet Prism final refinement headline and eyebrow [APPLIED LOCALLY]

Source: Jacob's September 19, 2026 focused refinement brief and two references.
Scope: isolated visual-system lab only. The glass-panel headline is
`A clearer path to care`; the left journey description remains
`From plan search to checkout`. The supporting narrative is unchanged.

The current register, lab handoff and all-branch Git history were searched for
the preferred headline. No documented factual/editorial rejection was found.
B61 retained the production heading pending copy approval; this direct request
supersedes that deferral for this lab headline only. It adds no measured outcome.

The left `Case Study` eyebrow is displayed uppercase and tracked, as explicitly
requested. This is a scoped exception to the prior Title Case guideline; other
eyebrows retain their existing treatment. The large leadership panel stays as-is;
its vertical composition is not approved as a canonical production replacement.


## B63. Quiet Prism family review and label formatting [APPLIED LOCALLY]

Source: Jacob's September 20 annotations and three motion notes, continued in
task 01a0bf66. Lab only. Supersedes B62's leadership-layout freeze and removes the
entire Application Identity Preview rail and its explanatory footer. Existing
mentorship, expertise and tools wording is preserved. The six existing category
labels in Expertise and Apps & Tools are bold through the colon, with the
remainder normal. No arbitrary colon-containing prose is restyled.

The five family selector labels reuse the project titles in lib/data/projects.ts.
Additional family specimens reuse their existing subtitle, summary and disciplines
verbatim, with the same View case study action and People / Process / Better
outcomes footer already registered in B61. WebMD retains B62's lab-only heading.
The selector's accessible label is Featured case study family. This adds review
coverage, without changing production narratives or claiming new outcomes.


## B64. Full-site Quiet Prism and connected case-study experience [APPLIED LOCALLY]

Source: Jacob's September 20 instruction in task 01a0bf66, turn
01a0bfb7-e5d4-7122-8950-67022ed30378, delegated to coordinator 01a0bf67:
update the full site, including brand/marketing copy and the dedicated case-study
site; refine globally from this point. This supersedes B57's dedicated-page and
entry-link deferral, and the lab-only implementation hold. Publication remains a
separate decision. It does not authorize new metrics or external resume edits.

### Existing authority carried forward

Apply B60's four mentorship bullets and How I lead the work exactly. Adopt the
selected B61/B62/B63 card treatments and their registered interface wording on
the main site after the final primitive handoff. Keep CASE STUDY as the explicitly
requested, scoped eyebrow exception. Promote WebMD's A clearer path to care
heading and the card footer People · Process · Better outcomes. Preserve all five
project summaries, employment facts, dates, education names and the visible
historical tools qualifier. The four informational cards use the B61 source copy
with meaningful main-site destinations, without lab explanatory text.

Reopen the six dedicated-page source deltas from d8d7380 under B56's canonical
copy-pass manifest: index, CareerStats, OutcomeDashboard, StudyCollection,
StudyVisual and case-study-site-copy.json. No whole-branch replay. Preserve the
research-leadership distinction, source-qualified financial figures, qualitative
outcomes and the original six story URLs. Correct any replacement-character
encoding damage without changing meaning. Introductory role/scope/working-
together fragments receive sentence-case capitalization only.

### Connected browsing copy and destinations

- Main selected-work section introduction: Five projects across product, brand,
  and design systems. Open a project for the work, or read the longer stories
  behind the decisions.
- Main selected-work section secondary action: Explore the full case studies.
  Destination: /case-studies/ in the same tab.
- Secondary action after the project list: More stories behind the work.
  Destination: /case-studies/ in the same tab.
- Dedicated-site home link: Jacob Medley, home. Same-tab navigation; remove the
  obsolete opens-in-a-new-tab hints and external icons only on internal links.
- Dedicated-site experience link: About & experience. Destination: /#resume.
- Dedicated-site footer action: More about Jacob. Destination: /#resume.
- Homepage skip link: Skip to content.
- Motion preference: Pause motion / Resume motion. A compact, consistently placed
  control implements the requested accessible motion behavior across both areas;
  it supersedes B52's removed-control presentation only to provide a user pause.

The main hero and marketing proposition retain the current B56 copy and Jacob's
complete signature line. Brand review favors concrete first-person decisions over
new superlatives. Unsupported current tool proficiency, the unnamed fifth property,
new outcomes, and proposed restorations remain unclaimed. Exact final copy and
source parity are verified before marking this entry applied locally.

Local acceptance: six-story JSON matches d8d7380 plus introductory capitalization;
B60 bullets match exactly; project data and education records are preserved.
See docs/full-site-integration-20260920.md for implementation, verification and
remaining browser/assistive-technology limits. No publication has occurred.


## B65. Browser-directed homepage refinements [APPLIED LOCALLY]

Source: Jacob's eleven browser comments in task
`01a0bf67-f456-7e32-b581-a233af6149fe` on September 20, 2026. This direct
instruction supersedes B64 only for the named homepage elements. Publication is
not authorized.

Remove the four informational pathway cards from the production hero. Preserve
the hero's existing name, role sequence, build paragraph, better-way sentence,
and selected-work action; make the better-way sentence bold and change only
their layout, timing, and presentation. Remove the visible word `View` and the
divider from every education card while preserving each credential title,
institution, destination, new-tab behavior, and accessible link context.

Add a lock icon to `More stories behind the work` as a visual signal for the
planned protected destination. Password enforcement, credentials, and routing
are not specified in this pass and remain unimplemented. No employment,
leadership, expertise, tool, education, project, or outcome wording changes.


## B66. Selected-work correction [APPLIED LOCALLY]

Source: Jacob's September 20 browser correction in task
`01a0bf67-f456-7e32-b581-a233af6149fe`. Publication is not authorized.

Remove the introductory `Explore the full case studies` action from the selected-
work section. The later `More stories behind the work` action remains. Render the
repeated work-card eyebrow as `Case Study` in Title Case. This supersedes B62 and
B64 only where they allowed the ordinary words `CASE STUDY` as an all-caps
typographic exception; Jacob's style guide forbids that treatment.

Restore the reversed wave at the selected-work section boundary. The hero shows
one half of the wave and the top of selected work shows its flipped counterpart,
with no blank band between them. This changes presentation only.

## B67. Wave and card visual refinement [APPLIED LOCALLY]

Source: Jacob's seven follow-up browser comments and reference images on
September 20, task `01a0bf67-f456-7e32-b581-a233af6149fe`.
Remove the duplicate visible `Experience` heading above employment history while
retaining its accessible list label. Hide `More stories behind the work` until
the case studies are complete and the site is password protected. This does not
authorize publication or add password enforcement. All credential, employment,
project, and outcome copy stays unchanged. References guide visual treatment only.
The broad crossing translucent wave treatment supersedes the cropped halves in
B66. Refine the halo, education masonry, and shared card surfaces and borders.

## B68. Short work-card actions [APPLIED LOCALLY]

Shorten card-level case-study actions to `View` when the control opens an
in-page case-study dialog and `Read` when it navigates to a dedicated reading
page. Retain the existing graphic right arrow and the card's specific accessible
name. This does not rename navigation, filters, disclosure controls, or other
functional actions.

## B69. Naked-card annotation labels [APPLIED LOCALLY]

Source: Jacob's 24 browser annotations in task
`01a0c13f-81b2-7662-907b-eb7667b3abc9`, September 20, 2026.
Publication is not authorized. This entry changes only the named interface and
journey labels; project facts, metrics and narrative stay unchanged.

Remove the visible `Explore selected work` label from the hero while retaining
that accessible name on the arrow link. Rename the call-center demo's `Highlight`
switch label to `Sections`; remove its visible binary `0` and `1` without changing
the switch state or help text.

The first DentalPlans journey stage is `MVP: Initial Launch and Learnings` and its
diagram eyebrow is `MVP`. The remaining diagram eyebrows are `Iteration 2`,
`Iteration 3`, and `Iteration 4`. Their accessible descriptions call them
iterations, not second, third, or fourth MVPs. Existing stage prose continues to
describe what each release added. No new architecture, causal claim, outcome, or
technology is introduced.

## B70. Platform-diagram and Hydra follow-up labels [APPLIED LOCALLY]

Source: Jacob's 13 browser annotations in task
`01a0c13f-81b2-7662-907b-eb7667b3abc9`, September 21, 2026.
Publication is not authorized. This entry changes only the annotated diagram and
section labels; metrics and outcome claims remain unchanged.

Remove the duplicate `Shared Platform` and `Shared Vocabulary` labels above their
diagrams. Add `A Shared Language` as the subtitle beside Hydra's Nomenclature
visual. In the platform diagram, use `Plan Data` instead of `Product Data`, add
`Dentist Data`, and retain Search & API, Promotions, and Deployment.

The MVP diagram removes the standalone `Product` tile. Its WordPress tile carries
the note `Manually added plans`. Iteration two uses `Shared Plan Data`; the later
iteration diagrams show the platform already accumulated and the capabilities
added in that release. This presentation change does not add a technology or
claim that the narrative does not already support.

## B71. DentalPlans editorial framework labels [APPLIED LOCALLY]

Source: Jacob's sixteen browser annotations and scoped DentalPlans framework
redesign request, September 21, 2026, task
`01a0c13f-81b2-7662-907b-eb7667b3abc9`. Publication is not authorized.

Remove the diagram eyebrows MVP, Iteration 2, Iteration 3, and Iteration 4;
the adjacent narrative titles identify these stages. Rename the second-stage
capability Two Brands to `Multi-Brand`. The later accumulated platform summaries
use `Five Brands`, directly correcting the stage count per Jacob's annotation 6.
This describes the number of brands at those stages, not a new performance metric.

The Shared Platform overview uses six capabilities: `Plan Data`, `Dentist Data`,
`Search & API`, `Microservices`, `Promotions`, and `Deployment`. Microservices is
the additional block requested in annotation 9 and is already documented in the
framework. The sketch's star symbols are icon placeholders; keep the site's
existing thin icons. Retain Promotions instead of repeating Plan Data from the
sketch. Preserve all narrative and metric copy. Accessible diagram descriptions
must reflect these label and stage changes.
## B72. Quiet Prism design-system reference [APPLIED LOCALLY]

Source: Jacob's September 20 design-system documentation request, task
`01a0c13f-81c9-7182-8332-4c96e75923e5`. The unlinked local reference route is
named `Quiet Prism`. Its introduction reads: `A field guide to the surfaces,
edges, cards, actions and motion already in use across JacobMedley.com.` The
reference may use short specimen labels and neutral explanatory copy, but it
does not revise homepage, case-study, employment, credential, or modal copy.

Canonical citation names are: Prism Field, Crossing Tide, Corner Current,
Frost Pane, Inset Light Edge, Tint Edge, Ribbon Rule, Quiet Label, Discipline
Pebble, Context Medallion, Trail Arrow, Focus Halo, Spotlight Split, Signal
Tile, Process Tile, Role Ledger, Practice Stack, Credential Shard, Outcome
Tile, Story Slate, Reading Sheet, Section Plaque, Evidence Cluster, Metric Lens,
Value Sheet, and Data Bay. The route marks disabled treatment as undefined
because the current Quiet Prism source contains no disabled primitive.

### B72a. Source-matched catalog correction [APPLIED LOCALLY]

Source: Jacob's September 20 rejection of the first reference and request for
Astra review and refinement. Supersedes B72's approximate specimens and its
acceptance claim. Production copy remains untouched.

Reference heading: `Quiet Prism`. Descriptor: `The source, in context.`
Introduction: `Browse the actual components, artwork and states used on the site.`
Version note: `Baseline 4c2e482. Local reference. Separate modal and focus refinements
are not included.` Controls: `Find a pattern`, `Live example`, `Fit`, `Tablet`,
`Phone`, `Reset example`, `Locate again`, `Open source page`, `Source & anatomy`,
`Behavior`, `Responsive`, `Computed styles`, `Tokens`, `Nothing matches this search.`

Retain B72's names where the source supports them. Signal Tile refers to the
retained BannerCard only and is explicitly marked `Retained, not on the homepage`.
Additional catalog labels: Brand Palette, Type Scale, Project Artwork, Image Tile,
Career Snapshot, Outcome Feature, Story Cover, Decision Note, Proof Grid,
Page Navigation, Filter Rail, Motion Control, Image Frame, Animated Image,
Supporting Diagram, System Diagram, Icon Grid, Split Narrative, Reference Fold,
Numbered List, Content Card, Availability Demo, Hero Identity, and Story Navigation.

Catalog explanations may describe inspected source behavior and responsive rules.
Examples reuse existing public source copy and assets verbatim. No fabricated
metrics, fake controls, simulated state styling, or new marketing copy. Preview
controls belong to the reference interface, not to Quiet Prism's production API.
The retained component uses descriptive documentation labels for its four tones;
these are demonstration props, not restored pathway copy or current homepage use.

The locator review also classifies Animated Image as retained: the only GIF in
project brief data does not reach AnimatedStudyImage's active render branch.
Its retained specimen reuses that existing marketing-automation GIF and alt text.
Leadership Principles names the four registered About-section reading tiles.

## B74. Viva thumbnail discipline [APPLIED LOCALLY]

Source: Jacob's September 23, 2026 browser annotation. Publication is not
authorized.

The Viva thumbnail disciplines are `Brand` and `Visual`. This replaces
`UX Research` on that thumbnail; the project narrative and contribution badges
remain unchanged.

## B75. WebMD and DentalPlans case-study copy [APPLIED; SCOPE CORRECTED BY B79]

Source: Jacob's approved copy and scope guardrails, September 23, 2026.
Publication is not authorized. Apply the wording exactly, without polishing or
reinterpretation.

### Canonical themes

- WebMD: `Speed to Market`
- DentalPlans: `Building for Scale`
- BumblebeeMD: `Reuse by Design`
- Hydra: `A Shared Language`
- One Park Financial: `Behavior Into Decisions`

These five themes are the current canonical set. This entry does not revise the
BumblebeeMD, Hydra, or One Park Financial narrative.

### WebMD

Main card headline: `Trust Meets Commerce`

Main card paragraph:

> WebMD had the audience and brand equity. DentalPlans had the plans and ecommerce infrastructure. I designed and built the experience that brought them together, from finding a plan through checkout.

Modal opening heading: `From Campaign to Commerce`

Modal opening copy:

> WebMD brought the audience and brand equity. DentalPlans brought the product and ecommerce engine. I wireframed and designed the site in a focused two-week build while the Director of Online Marketing was away. It was complete and live when the director returned. The following two weeks were campaign wrap-up and launch work with the Director of Online Marketing and SVP of Marketing. The site generated revenue from day one.

REC-0075 separates the focused site build from the full launch. Do not describe
the entire WebMD launch as a two-person effort.

### DentalPlans

Main card headline: `From Storefront to Platform`

Main card paragraph:

> What began as one boot-strapped ecommerce site became a proprietary platform the company owned outright. Shared product data, reusable components, promotions, and deployment supported five branded properties and cut launch time from six weeks to two. The value stayed with us. We were building the asset, not renting the code.

Modal opening heading: `How Fast Can You Stand Up a Website?`

Modal opening copy:

> It started with a simple question: “You know WordPress, right? How fast can you stand up a website?”
>
> DentalPlans.com wanted dedicated storefronts for product partners. The first site was deliberately lean. It tested whether customers would buy through a focused brand experience.
>
> They did. The next problem was scale.
>
> I owned the roadmap, product design, and front-end development for the core ecommerce framework that followed. A part-time engineer and I built and maintained that framework and its enhancements.
>
> Other designers launched the individual branded properties. The internal engineering team built the microservices and APIs the framework connected to.

REC-0076 distinguishes the focused core-framework build from the full delivery
ecosystem. Preserve the five-property and six-weeks-to-two facts, metrics, imagery,
diagrams, contribution labels, navigation, and layout.

### Shared title treatment

Every featured case-study title treatment contains only `Case Study` and the case
study name. The former third title line does not render. Card headlines remain in
the separate frosted copy panel.

## B76. BumblebeeMD, Hydra, and One Park Financial case-study copy [APPLIED LOCALLY]

Source: Jacob's approved case-study copy session, September 24, 2026.
Scope: the main card headline and paragraph, and the modal opening heading and
paragraphs, for BumblebeeMD, Hydra, and One Park Financial. This entry supersedes
earlier wording only where these exact surfaces differ. It does not change the
canonical themes in B75, the two-line case-study title treatment, dedicated
case-study narratives outside these openings, or WebMD and DentalPlans copy.
Implementation status: applied locally; publication is not authorized by this
copy request.

### BumblebeeMD

Theme: `Reuse by Design`

Main card headline: `More Room for the Brand`

Main card paragraph:

> The shared platform gave us something valuable: less time rebuilding commerce and more time shaping the brand, refining the interface, and improving the experience. BumblebeeMD used that foundation to create a distinct digital health experience without starting over.

Modal opening heading: `The Platform Got Out of the Way`

Modal opening copy:

> BumblebeeMD was a digital health brand built on an ecommerce foundation we already owned. Product data, commerce, and core patterns were already in place, so the work could move closer to the customer.
>
> We focused on the brand, refined the UI, and shaped an experience that felt specific to BumblebeeMD while still inheriting the machinery underneath it.

### Hydra

Theme: `A Shared Language`

Main card headline: `Failure to Communicate`

Main card paragraph:

> Product, marketing, and engineering were describing the same interface in different ways. I built Hydra to give them one vocabulary, pairing reusable patterns with front-end components across brands and technology stacks.

Modal opening heading: `Three Teams. One Vocabulary.`

Modal opening copy:

> The fragmentation was bigger than inconsistent UI. Product, marketing, and engineering had different names and patterns for the same things. I built the case for a shared system, secured executive backing, and shipped Hydra. Work that had taken two sprints could land in one.

### One Park Financial

Theme: `Behavior Into Decisions`

Main card headline: `Read the Signals`

Main card paragraph:

> I redesigned One Park Financial's corporate website and lead flow using Hydra as the foundation. Visitor behavior, device performance, heat maps, and scroll maps gave each interface decision something concrete to answer.

Modal opening heading: `The Funnel Was Talking`

Modal opening copy:

> The redesign started with evidence. Visitor behavior, device performance, heat maps, and scroll maps showed how people were moving through the experience. I used those signals to shape the site and lead flow, then worked across PPC, SEO, and affiliate channels on conversion strategy.

---

# September 29, 2026: reviewed whole-site copy implementation

Source: Jacob's direct implementation request and the complete repository review packet
at `49d92c0ce18bf2b79ba8e16713e6cd5d40bf04a4`, reviewed against
`3973411562db116044a337de7586b236ea306260`. B80 through B87 were unoccupied.
The full replacement copy and scope are registered below before application.
These entries supersede older prose only on the stated website surfaces. B79
factual rulings, privacy holds, and separately owned external records remain in force.
Implementation: APPLIED locally after source, build, and rendered acceptance on September 29, 2026. See `docs/reviews/all-copy-review-20260928/IMPLEMENTATION.md` for evidence and limits.
Instructions and evidence-placement notes are not public copy. No publication is authorized.

## B80. Leadership direction and individual-study tools [APPLIED]

Position Jacob as a product and design leader and coach. Describe actual judgment, ownership, delegation, and systems. Do not manufacture management responsibility for historical hands-on work.

Remove Tools and Technologies inventories from every individual case study. The current modal renderer already omits them; clean up the remaining active data and other consumers. Do not add replacement tool badges. Keep historically material implementation detail where it explains a decision. This is not a ban on architecture labels, course titles, or employment-history references.

Keep the separate resume tools list unchanged. The explicit removal decision applies to individual case studies, not credentials or external resume workstreams.

Keep the five approved card headlines, themes, and paragraphs below verbatim. Their following narratives are revised under the whole-copy-review authorization. Case-study artwork titles retain two lines: Case Study and the project name.

Keep the focused WebMD build separate from broader campaign work. Keep the DentalPlans core framework separate from branded-site delivery and internal engineering services. Do not invent uplift, revenue, test winners, accessibility compliance, or completion claims.

The six anonymous reading pages remain anonymous. Eight other source narratives remain unrendered. A gated or sanitized label is not proof of access control or permission to publish private details. No merge to main or publication is authorized by this handoff.

## B81. Homepage, leadership, and online experience [APPLIED]

### Hero

**Visible role:** Product & Design Leader

I lead product and design teams. I make the work smaller and give people the authority to move it forward.

There is always a better way, together we will find it.

Implementation: make the already approved role visible near the hero copy. Preserve the animated identity and reduced-motion behavior. Avoid duplicate screen-reader announcements.

### Case studies introduction

Selected work across products, brands, and design systems. Open a project to see the decisions and the work they produced.

### How I work

Sometimes the next step belongs to a customer. Sometimes a team needs to decide what to build. These examples show how I approach the work, including the visual ideas that grew out of it.

### How I lead the work

A customer experience is capped by what the people delivering it can actually do. I follow the problem back through the decisions and dependencies behind it. I set direction and ownership, then work on the conditions the team needs to deliver.

Remove the repeated slogan here. Do not substitute another slogan.

**Product judgment**

I led experience research for a conversational assistant. Accuracy, uncertainty, and the route to human support were product decisions, with consequences for the person asking the question.

**Shared systems**

I look for work the next project would otherwise repeat. Brand settings, common patterns, and reusable product data give teams a foundation they can use again.

**Evidence for decisions**

I use research and experimentation to examine a decision. Business results belong beside that work, with enough context to explain what changed and what was actually measured.

**People with authority**

I make ownership explicit. People should know which decisions they can make and where they need another owner. I stay available without becoming the approval path for every next step.

### Team building and mentorship

- I walk beside junior staff, asking questions until they can name the next step, dependency, or piece they can move now.
- I make authority explicit. People can assess the risk and decide without bringing every next step back for permission.
- I stay available and remove blockers beyond their control.
- We review outcomes together. We change the conditions behind mistakes and understand good results well enough to repeat them.

### Expertise

- Leadership: design practice, coaching, hiring, research operations, UX roadmapping, and executive facilitation.
- Product: customer research, interaction design, information architecture, usability testing, conversion testing, and accessibility.
- Systems: design systems, shared commerce platforms, brand architecture, and delivery practices.

Retain the separately scoped resume tools list and its historical context.

### Mutual of America Financial Group, Boca Raton, FL

Retain **Senior UX Designer**, **2023 to 2025**.

I led experience research and scoping for one internally built conversational assistant with two deployments. One served internal representatives through Salesforce, with a service designer on that work. The other lived on the public website. Retirement and financial account information made accuracy, security, and escalation central to the design.

I raised hallucination risk during scoping and tested it with a data scientist. Asked for an account balance, the assistant returned a specific figure. The required response was a referral to an account manager. I traced the answer to a sample account statement in the source documentation.

I wrote requirements for response feedback, system status, failures, human escalation, compliance alerts, and account and conversation summaries. I also specified how mixed source documents should be prepared before ingestion. The assistant was taking the opening minutes of a service conversation.

I secured analytics on the public assistant. After release, the record showed early engagement followed by dropoff. Internal representatives cited accuracy and waiting as barriers to use. A subset of the interaction requirements had shipped.

### One Park Financial, Coconut Grove, FL

Retain **Director of UX/UI & Product Design**, **2021 to 2022**.

I led design within marketing, reporting to the SVP.

I built the case for a shared pattern library and design system, secured backing, and shipped it. Product, marketing, and engineering had been describing the same components in different ways. Work that had taken two sprints could land in one.

The product later ran for about a year without a dedicated design resource.

I owned the design process and set the usability-testing practice. I worked across paid search, organic search, and affiliate channels on conversion strategy for the acquisition funnels.

### DentalPlans.com, Plantation, FL

Retain **Senior Manager of UX & UI Design / Product Manager**, **2015 to 2021**.

The first storefront had sale pricing typed in by hand, one product at a time. It sold, and the company wanted more properties. I brought a roadmap for shared brand settings, scheduled promotions, product and provider data, and deployment. A fully branded property went from six weeks to launch to two.

I owned the core ecommerce framework and built and maintained it with a part-time engineer. Other designers launched the branded properties. Internal engineering built the microservices and APIs the framework connected to.

I led UX, UI, and front-end work across the commerce funnel. Source attribution meant the page said what the ad promised: promotion, copy, and messaging changed by traffic source, down to individual affiliate IDs.

Five properties ran on the platform. In one measured year, finance credited them with 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue. The company owned the custom platform.

### Bluegreen Vacations, Boca Raton, FL

Retain **Senior Digital Designer**, **2011 to 2015**.

I evaluated the digital signage platforms and designed how the systems would connect. Four Winds Interactive handled signage and kiosks, Adobe Scene7 supplied dynamic media, and Aprimo Marketing Studio handled campaign operations. WordPress was the authoring surface.

Campaign content had to cover 48 resorts, four seasons, and several personas. I owned UX and UI for an approach using a central asset library and shared data, so content variants could be reused across properties.

The work involved a PHP engineer, a data engineer, an outside consultant, and the marketing managers who would use it. The publishing path had to make sense to people who had not built the integration.

### Education and metadata

Retain all nine credential names, issuers, links, degree details, and the contact address. These are factual records, not a tool-fluency section. Do not rewrite course titles to make them sound more senior.

**Page title:** Jacob Medley, Product & Design Leader

**Description:** Jacob Medley leads product and design teams. Explore decisions in commerce, design systems, research, and AI product experiences.

## B82. Five featured case studies [APPLIED]

### WebMD

**Theme:** Speed to Market

**Card headline:** Trust Meets Commerce

WebMD had the audience and brand equity. DentalPlans had the plans and ecommerce infrastructure. I designed and built the experience that brought them together, from finding a plan through checkout.

Retain that card verbatim. Replace the opener and body with the following.

#### From Campaign to Commerce

When WebMD and DentalPlans.com became part of Internet Brands, we had a new route to customers. People were already visiting WebMD to understand a health or dental concern. We could connect a relevant dental need with a way to act on it.

This strategy put a dental savings experience in that path. People could move from researching care to comparing plans, finding a dentist, and purchasing.

**Contributions:** Product Design · UX Strategy · Prototyping · Front-end / Implementation

#### The Strategy

The entry point mattered. A person researching a dental need had a different question from someone already choosing a plan. I shaped the journey around the decision they were ready to make.

**Intent**

Start with people already researching a relevant dental need.

**Relevance**

Introduce DentalPlans as a solution when it matched what the customer was trying to accomplish.

**Commerce**

Create a clear path from learning to comparing plans, finding a dentist, and purchasing.

Placement: immediately after the opener, using the existing informational-card treatment. These are conceptual cards, not a metric grid. Keep all seven original desktop/mobile pairs.

#### Recognize Intent

The homepage introduced dental savings and gave visitors a way to start looking. It needed to answer a basic question before asking for a purchase: is this relevant to the care I need?

Evidence: homepage desktop and mobile pair. Search entry belongs here; search results belong in the next chapter.

#### Support the Decision

Choosing a plan meant answering more than a pricing question. Customers also needed to know which dentists participated.

Plan search, comparison, and detail pages let people examine their options. Dentist search kept the provider question inside the same journey.

Evidence: Plan Search Results, Plan Compare, Plan Details, and Dentist Search Results pairs.

#### Move to Action

The dentist profile gave people a specific provider to review. Cart and checkout then took the selected plan through purchase.

Evidence: Dentist Details and Cart / checkout pairs.

#### From design to revenue

I wireframed and designed the site in two weeks. It was complete and live when the Director of Online Marketing returned.

The following two weeks covered campaign wrap-up and launch work with the Director of Online Marketing and SVP of Marketing. The site generated revenue from day one.

This completes the approved request to add substance to the main-site WebMD story. Do not create another WebMD route in this pass. Preserve the difference between the live site and the subsequent campaign work.

### DentalPlans.com

**Theme:** Building for Scale

**Card headline:** From Storefront to Platform

What began as one boot-strapped ecommerce site became a proprietary platform the company owned outright. Shared product data, reusable components, promotions, and deployment supported five branded properties and cut launch time from six weeks to two. The value stayed with us. We were building the asset, not renting the code.

Retain that card verbatim. Replace the opener and narrative with the following.

#### How Fast Can You Stand Up a Website?

It started with a small request: “You know WordPress, right? How fast can you stand up a website?”

The first storefront tested whether customers would buy through a focused brand experience. They did. More sites were now on the table, along with every manual update the first one needed.

I owned the roadmap for the shared commerce framework that followed. Each release removed a piece of repeated work and left a capability the next property could use.

**Contributions:** Product Ownership · Design Systems · UX & UI Design · Front-end Development

#### What the properties produced

In one measured year, finance credited the properties with the revenue and lead-capture shares below. Launch time is measured per property.

- 47% of company revenue growth
- 20% of overall company revenue
- 27% of total company lead capture
- 6 to 2 weeks to launch a property

The growth figure is a share of the company’s revenue-growth increment in that year.

#### What changed

- Five branded properties shared the framework.
- Each brand kept its own identity.
- Product information and promotions could be reused.
- The company owned the custom platform.

#### Work the next site could reuse

- Shared interface patterns and components
- Brand identity kept separate from the application
- Product information, dentist search, and cart services
- Scheduled offers and expiry
- Source attribution across acquisition channels
- Documentation for designers and developers
- Deployment for one property or all of them

**Diagram heading:** How the platform fit together

#### Start with one storefront

We began with a single-product flow. Engineering built the service that passed the product into the existing cart. I designed the storefront with room for other products and brands.

The first site sold, and leadership asked for a second. That gave the next release a reason to exist.

Evidence: existing initial-MVP illustration.

#### Carry the brand through checkout

The second site needed its identity to continue into the cart. We added a cart that could take each brand’s treatment and services for shared product information.

Common components could be used in landing pages and purchase flows. Testing a variant no longer meant rebuilding every part of it.

Evidence: existing iteration-two illustration.

#### Let every property inherit the update

Product information moved into shared services. When engineering added or changed data, every property could use it. The interfaces used common patterns to present it.

Acquisition work continued alongside the platform: landing pages, content for organic search, and tests across the purchase flow.

Evidence: existing iteration-three illustration.

#### Add dentist search without starting over

I designed and built the dentist-search interface from the existing patterns and components. The platform could take another customer task without needing another set of interface conventions.

Evidence: existing iteration-four illustration.

#### Who built what

A part-time engineer and I built and maintained the core framework and its enhancements. Other designers launched the branded properties. Internal engineering built the microservices and APIs the framework connected to.

Keep the metrics, original platform diagrams, and four release illustrations. The results context stays adjacent to the numbers. Keep the credit paragraph visible; do not replace it with the value statements.

### BumblebeeMD

**Theme:** Reuse by Design

**Card headline:** More Room for the Brand

The shared platform gave us something valuable: less time rebuilding commerce and more time shaping the brand, refining the interface, and improving the experience. BumblebeeMD used that foundation to create a distinct digital health experience without starting over.

Retain that card verbatim. Replace the opener and narrative with the following.

#### The Platform Got Out of the Way

BumblebeeMD needed to feel like its own digital health brand. Reusing the platform did not settle the visual decisions.

We worked through the homepage, content pages, and the smaller interface details, including buttons, inputs, and icons. Shared commerce patterns gave that work a foundation.

**Contributions:** Product Design · Design Leadership · Prototyping

#### The first impression

The homepage brought the brand into the customer’s first view of the product. Layout, imagery, and the interface treatment needed to work together on desktop and mobile.

Evidence: existing homepage and lifestyle imagery. Preserve the original desktop/mobile association.

#### A brand beyond the homepage

Content pages needed the same attention. The brand had to remain recognizable as people moved further into the experience.

Evidence: existing content-page and family imagery.

#### The details people use

Buttons, inputs, and icons carried the visual language into the working interface. These were the parts people would meet repeatedly.

Evidence: existing buttons, inputs, and both icon sheets.

Remove the unsupported Usability Testing badge. This does not assert that no testing occurred. It avoids using an unsubstantiated badge as case-specific evidence. Do not present BumblebeeMD as an employer or independent venture. Do not restore the superseded retirement-led opening.

### Hydra

**Theme:** A Shared Language

**Card headline:** Failure to Communicate

Product, marketing, and engineering were describing the same interface in different ways. I built Hydra to give them one vocabulary, pairing reusable patterns with front-end components across brands and technology stacks.

Retain that card verbatim. Replace the opener and narrative with the following.

#### Three Teams. One Vocabulary.

The adoption constraint mattered. A shared interface could not depend on replacing the applications underneath it.

I secured executive backing for Hydra and kept the changes in the front end. Product, marketing, and engineering could work from the same patterns across brands and back-end codebases.

**Contributions:** Design Systems · Design Leadership · Systems Analysis · UI Engineering

#### Eight ways to draw a button

There were eight button treatments across the product. Error messages had their own variations in copy and presentation. The same action could look different from one part of the experience to the next.

Every variant became another thing to design, build, and maintain.

Evidence: existing button-fragmentation image and both error/input images.

#### Give the components names people can share

I defined the interface patterns and a vocabulary designers and engineers could both use. Elements, controls, components, modules, templates, and pages described how the system fit together.

Evidence: existing nomenclature grid.

#### Keep the applications, share the interface

The changes stayed in the front-end markup. Applications could adopt the interface without replacing their functional back-end code.

Variables controlled color, type, and treatment for each brand. Core patterns stayed shared, and applications could take design-system updates independently.

Evidence: existing system diagram and both UI-element sheets.

#### What the system left behind

Work that had taken two sprints could land in one. The product later ran for about a year without a dedicated design resource.

#### Why Hydra?

Hydra had many heads and one body. The shared patterns served several products and brands.

Evidence: existing Hydra supporting illustration.

The two-sprints-to-one and about-one-year statements describe the design system and product continuity. Do not attach them to the corporate-site redesign or invent a universal delivery-speed improvement.

### One Park Financial

**Theme:** Behavior Into Decisions

**Card headline:** Read the Signals

I redesigned One Park Financial's corporate website and lead flow using Hydra as the foundation. Visitor behavior, device performance, heat maps, and scroll maps gave each interface decision something concrete to answer.

Retain that card verbatim. Replace the opener and narrative with the following.

#### The Funnel Was Talking

The work extended beyond the corporate website. I owned the design process and usability-testing practice, and worked across paid search, organic search, and affiliate channels on conversion strategy.

The redesign brought that work into the website and lead flow. Hydra supplied the interface patterns.

**Contributions:** Product Design · User Research · Prototyping · Design Leadership

#### Examine the entry point

I used visitor behavior and device performance to decide where to look, then heat maps and scroll maps to examine the page. The homepage comparison shows the interface before and after that work.

Evidence: existing homepage before/after pair.

#### Explain the service

The How It Works and About Us pages were part of the same experience. I reviewed them alongside the homepage and lead flow.

Evidence: existing How It Works and About Us before/after pairs.

#### Carry the experience into the next step

The process module and responsive homepage show how the design was applied across the website. The shared system behind those interfaces is covered in the Hydra case study.

Evidence: existing Our Process module before/after pair and full-homepage desktop/mobile pair.

No conversion-lift figure is available in the cleared site record. The prose describes the research, scope, and redesign without inventing one.

## B83. Nine supporting project stories [APPLIED]

### split-test | Testing the experience

#### What we tested, and why

Product marketing owned the hypotheses and traffic. I designed and built the variants, then interpreted the results.

The examples here show the questions we tested and the designs we put in front of customers.

**Contributions:** Experimentation · UX Strategy · Data Analysis · Implementation

#### WebMD imagery

The hypothesis was that imagery featuring younger adults might fit the WebMD audience better than the imagery used on the core DentalPlans site.

Evidence: existing control and variants 1, 2, and 3.

#### Savings calculator

This test examined whether additional product information and a recognizable spokesperson might change customer response.

Evidence: existing control and variant 1.

Keep neutral Control and Variant labels. A source filename containing winner is not evidence of a measured winner. Do not introduce a lift, significance claim, or isolated causal explanation.

### call-center-ux | When nobody can take the call

**Summary:** I connected the website’s call invitation to call-center availability, working with the service leader, engineering, and business intelligence on the status feed.

#### A phone number is a promise

Customers were being asked to call when nobody could answer. I raised the gap with the call-center leader and researched the platform’s API.

I worked with engineering and business intelligence on a status feed. The website could then change its message and offer when phone support was unavailable.

**Contributions:** Project Leadership

#### Make the message match availability

The feed checked call-center status every five minutes. The website changed its messaging and visual indicators, and we logged status changes and calls.

A promotional code appeared only when the call center was unavailable.

Evidence: existing status-flow illustration and illustrative interaction demo.

### marketing-auto | One campaign, several audiences

**Summary:** I led the design and development of a campaign whose content and incentives changed by audience and campaign stage.

#### Content that followed the customer

A campaign spanning several brands needed different content for different audiences and stages. I led its design and development across the touchpoints.

The work connected marketing, business analysis, and data teams around shared data and reusable content.

**Contributions:** UX & UI Design · Responsive Design · Design Leadership · Integration Strategy

#### Give campaign managers control

Content and incentives changed by audience and by where the customer was in the campaign. Campaign managers could manage those variants through the system.

Evidence: existing before/after campaign email images.

### workshops | Getting teams to a shared decision

#### Design the decision before the session

I start with the decision the group needs to make. Then I design the session around the people who can make it.

The work has included customer journeys, product direction, and conversion-testing plans. I prepare the activities and materials so the group leaves with something the team can use afterward.

**Contributions:** Workshop Facilitation

#### Workshops in practice

Keep the existing three workshop images and use these corresponding labels: Creative brainstorming; UX/UI strategy; Conversion-testing strategy.

### roadmap | Choosing what comes next

#### Are we there yet?

I use a roadmap to make the next decision visible: who needs the work, what problem it solves, and what has to happen before it can start.

The example shows the structure I used for a UX roadmap at One Park Financial. Project details are obscured.

The plan has to survive new information. Visible dependencies make it possible to change the sequence when the scope changes.

**Contributions:** UX Roadmapping

#### What the roadmap needs to say

**Title**

Name the work and its purpose.

**Owner**

Identify who maintains the roadmap and answers questions about it.

**Goal**

State the business or customer outcome the work is intended to change.

**Sequence**

Use Now, Next, and Later to show priority. These are not delivery dates.

**Initiatives**

- Project name
- Who needs the work
- The need
- Business objective
- Dependencies

#### A project on the roadmap

**Who needs it**

Name the people who will use or benefit from the work.

**Need**

State the problem the project must solve.

**Business objective**

Describe the intended outcome and how the team will judge it.

**Owners and dependencies**

Name who is responsible and whose work must happen first.

#### Roadmap example

Project details are obscured.

Retain the reference-panel layout, project-card example, and roadmap image. Remove the unnecessary year and vendor-led heading from the case narrative; keep employment dates unchanged.

### personas | Understanding the people buying the product

#### A cost-conscious customer persona

I worked with business intelligence and product marketing on persona materials for the DentalPlans audience. Frugal Francine represented customers weighing dental-plan choices around cost and value.

The card brought demographics, motivations, preferences, channels, and reasons to buy into one reference for the team.

**Contributions:** Persona Collaboration · Visual Design

Frugal Francine is the existing fictional persona, not a colleague. Do not claim a new study, validated segmentation, or predictive accuracy.

### reveal | The Choice Is Clear

**Summary:** I developed copy and visual concepts for Reveal Clear Aligners around the idea of clarity.

#### Clarity as a creative idea

For Reveal Clear Aligners, I developed copy and visual concepts around clarity. Each execution needed to make sense on its own while belonging to the same campaign.

**Contributions:** Concept Development · Collaboration · Visual Design

#### Three expressions of clarity

**Yup, It's That Clear:**

State the idea with plain confidence.

**So Clear, Like It's Not Even There:**

Play with how little the aligner is meant to be noticed.

**OMG, Your Aligner Is Showing:**

Use visibility as the provocation.

#### The concept in the work

Keep all existing Reveal campaign images. Remove the additional hero paragraph that explains the same clarity theme a second time. Keep inline contributions and original campaign wording within the artwork.

### viva | Viva Medicare

**Summary:** I developed the Viva Medicare brand through research and cross-functional branding exercises. These examples show my visual explorations.

#### A brand taking shape

I developed a brand for Medicare and Medicare Supplement plans, working from product and customer research. Executive leadership and a cross-functional team took part in the branding exercises.

The marks, palettes, and interface treatments shown here are my work. They document the directions explored for the brand.

**Contributions:** Concept Development · Collaboration · Visual Design

#### The mark

Keep existing stacked and inline logo lockups.

#### Color and visual direction

Keep the existing color study and visual-style options.

#### The brand in the interface

Keep existing homepage hero concepts, buttons, inputs, and navigation images.

### wrong | The Wrong Campaign

**Summary:** A campaign concept for people researching dental care and worrying about cost.

#### Challenge the assumption, keep the person

The campaign addressed people researching crowns, fillings, and root canals who were concerned about cost. Its job was to introduce dental savings plans as another option.

“Wrong” was the creative device. The design question was whether a blunt challenge could earn attention without making the person feel blamed.

**Contributions:** Design Leadership · Collaboration · Visual Design

#### The idea in the work

Headlines carried the challenge. The visual variants included different ages and family situations. The landing page and hero versions were prepared for conversion testing.

Keep all existing hero variants and the full landing page. Remove the redundant Campaign Concept label and the three short explanatory cards that repeat the prose. Retain the artwork as historical creative work. Do not claim a measured conversion improvement.

## B84. Reading-page collection and six complete narratives [APPLIED]

Read the adjacent CODEX-HANDOFF before applying. Preserve existing slugs, categories, tags, visual themes, proof indexes, and section IDs. This document supplies replacement prose, not new routes. The introductory paragraph after each card title is its `summary`.

**Eyebrow:** Jacob Medley // Selected work

**Title:** The thinking behind the work.

**Description:** These stories follow the decisions behind the work: what I took ownership of, who I worked with, and what changed. Some led to a product. Others changed how the team could work.

**Closing:** There is always a better way, together we will find it.

## One platform. Five properties.

**Existing route:** `/case-studies/one-platform-five-properties/`

**Card title:** One platform. Five properties.

I owned the roadmap for a shared commerce platform. Launching a branded property went from six weeks to two.

**My role:** Product and design lead

**Scope:** Platform roadmap, brand experience, and the commerce funnel

**Collaboration:** A part-time engineer and I built and maintained the core framework. Other designers launched the properties; internal engineering supplied the microservices and APIs.

**Discipline:** Platform strategy · Design systems · Delivery

### At a glance

- Each new storefront would inherit the first site’s manual work.
- I phased a shared platform around the capabilities later properties could reuse.
- A branded property went from six weeks to launch to two. Five properties used the platform.

### Proof, in existing index order

- **6 → 2:** weeks to launch a property
- **5:** properties on one platform
- **47%:** of company revenue growth in one measured year

### The first site sold. Its manual work would multiply.

Navigation label: **The first site**. Keep section ID `problem`.

The first storefront had sale pricing and strikethrough values typed in by hand, product by product, every time a promotion changed.

It answered the question it was built for: would customers buy through a focused brand experience? They did. Leadership wanted more properties, and copying the site would carry those updates into every new one.

### I brought a roadmap for the work we could stop doing.

Navigation label: **The roadmap**. Keep section ID `approach`.

I argued for a platform and phased the work. Each release replaced a manual task with something the next property could reuse.

Brand settings moved into the content management layer. Shared product and provider data meant engineering could add information once and every property could use it. Scheduled promotions replaced hand-edited offers.

I owned the roadmap, experience, and front-end work for the core framework. A part-time engineer and I built and maintained it. Other designers launched the branded properties. The internal engineering team built the microservices and APIs we connected to.

**Decision:** Build the shared capability before repeating the task on another property.

### Each brand kept its identity.

Navigation label: **The platform**. Keep section ID `solution`.

Theme tokens separated brand choices from the application. A property could change its visual identity without becoming another copy of the code to maintain.

Source attribution connected acquisition to the storefront. Promotion, copy, and messaging changed with the visitor’s source, down to individual affiliate identifiers. The page said what the ad promised.

Deployment could target one property or all of them. The same framework covered marketing pages through cart and checkout.

- Brand identity as configuration
- Shared product and provider data
- Scheduled offers across the commerce flow
- Deployment for one property or all of them

### The next launch had a starting point.

Navigation label: **What changed**. Keep section ID `results`.

Launching a fully branded property fell from six weeks to two. Five properties ran on the platform.

In one measured year, finance credited the properties with 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue. The growth figure is a share of the company’s revenue-growth increment in that year.

The company owned the custom platform. Its designers could spend more time on the parts that made each brand distinct, while the framework handled work the properties had in common.

> You create velocity by making the work smaller.

## Building an experience design practice

**Existing route:** `/case-studies/building-a-design-function/`

**Card title:** Building an experience design practice

I built a design practice alongside a product integration, leaving research, systems, and measurement the team could use again.

**My role:** Experience design practice lead

**Scope:** Design foundations, research, measurement, and executive facilitation

**Collaboration:** Work across product, engineering, marketing, and leadership.

**Discipline:** Practice building · Governance · Research

### At a glance

- The integration started before the design practice existed.
- I built reusable foundations inside the delivery work.
- The team gained documented tokens, a research format, an experience scorecard, and workshop materials.

### Proof, in existing index order

- **Systems:** a token foundation with governance
- **Research:** a repeatable testing practice
- **Measurement:** an experience scorecard

### Delivery could not wait for the practice.

Navigation label: **The starting point**. Keep section ID `problem`.

There was no existing design system, research practice, or experience-measurement framework. The function had to take shape while a product integration moved forward.

Spending all our attention on the immediate screens would leave the next project with the same missing foundations.

### Where work repeated, I left something the team could use.

Navigation label: **Building alongside delivery**. Keep section ID `approach`.

I built the token foundation before the page count grew. Usability testing came with a report format for later studies. Executive workshops had a board system, moderator guide, and scenario matrix.

Measurement needed its own structure. I paired experience measures with business outcomes and drew on real user monitoring, moderated testing, and survey data. Each source answered a different question.

**Decision:** Treat the foundations as part of delivering the product.

### Give the next person a starting point.

Navigation label: **The working practice**. Keep section ID `solution`.

The team had documented tokens, a research-report format, an experience scorecard, and materials for executive workshops.

The customer feedback program had a vendor recommendation and was ready for instrumentation.

- Documented design decisions
- Research the next study could build on
- Experience measures tied to business questions
- Workshop materials available after the meeting

### The work outlived the first project.

Navigation label: **What remained**. Keep section ID `results`.

Subsequent work could use the foundations already written down. The team did not have to begin with an empty research report or invent another workshop format.

The artifact was stability. Portfolio photography remains challenging.

## Four executives, four different customer journeys.

**Existing route:** `/case-studies/one-customer-journey/`

**Card title:** A shared customer journey

I designed and ran a working session that put the owners of the customer journey in the same room to examine its handoffs.

**My role:** Workshop designer and facilitator

**Scope:** Customer scenarios, the end-to-end journey, and cross-functional handoffs

**Collaboration:** Executive participants across marketing, digital health, engineering, and commerce.

**Discipline:** Executive facilitation · Journey mapping

### At a glance

- Each department held only part of the journey.
- The working session followed concrete customer situations across departments.
- The group documented the end-to-end journey and examined the gaps with their owners present.

### Proof, in existing index order

- **Shared view:** a documented end-to-end journey
- **Handoffs:** examined with both owners present
- **Reusable:** boards, guide, and scenario matrix

### Customers had declined to organize themselves into departments.

Navigation label: **The handoffs**. Keep section ID `problem`.

The integration crossed marketing, digital health, engineering, and commerce. Each leader held a different part of the journey. No shared view covered first awareness through subscription and refill.

Where those views stopped, the customer changed hands. That was where we needed the conversation.

### I designed the conversation before the session.

Navigation label: **The preparation**. Keep section ID `approach`.

I built a board system for the integration and wrote a moderator guide. The session needed enough structure to work without depending on my improvisation.

A scenario matrix kept the group on concrete customer situations. We could follow a person through the experience and examine what happened at each handoff.

**Decision:** Put the owners of both sides of a handoff in the same conversation.

### Follow the customer, then examine the gap.

Navigation label: **In the room**. Keep section ID `solution`.

I used the scenarios to walk the group through the journey. When a handoff failed, the people responsible for both sides were present to discuss it.

The moderator guide kept the discussion on the customer situation and the work between departments.

- A board system for the integration
- Concrete customer scenarios
- Both sides of the handoff present

### A journey the group could return to.

Navigation label: **The record**. Keep section ID `results`.

The session produced a documented end-to-end journey and a record of the gaps discussed. The boards, guide, and scenario matrix remained available for later sessions.

## How customers look for products

**Existing route:** `/case-studies/navigation-beyond-opinion/`

**Card title:** How customers look for products

I led customer research into navigation and used the findings to guide category structure and shop-by paths.

**My role:** Research direction and synthesis

**Scope:** Navigation, category structure, and shop-by paths

**Collaboration:** Research findings prepared for the team making navigation and information-architecture decisions.

**Discipline:** Usability research · Information architecture

### At a glance

- Navigation decisions depended on internal preference.
- Moderated testing examined how people entered the catalog and used the menu.
- The findings informed the redesign and left a repeatable research-report format.

### Proof, in existing index order

- **Customer needs:** an entry point into the catalog
- **Findability:** mega menu problems documented
- **Evidence:** research feeding the redesign

### We knew the catalog. Our customers did not.

Navigation label: **The question**. Keep section ID `problem`.

Category structure, mega menu choices, and shop-by paths were being debated internally. They had not been tested against people using the navigation.

Knowing where a product lives changes how easy it looks to find. We needed to see the experience without that advantage.

### Watch where people try to enter.

Navigation label: **The study**. Keep section ID `approach`.

I led moderated usability research into the navigation and information architecture. The study examined entry paths and whether people could discover and use the mega menu.

**Decision:** Use observed behavior to guide the catalog’s entry points.

### The customer’s need was a useful starting point.

Navigation label: **The findings**. Keep section ID `solution`.

Testing supported Shop by Condition as an entry point. It also exposed discoverability problems in the mega menu.

I brought those findings into the redesign and organized the report around the decisions the team needed to make.

- Shop by Condition as an entry point
- Menu-discovery problems documented
- Findings attached to design decisions

### Preference lost its monopoly.

Navigation label: **What changed**. Keep section ID `results`.

The team had observed customer behavior to work from. It also had a research-report format for the next study.

## A shared foundation for a second brand

**Existing route:** `/case-studies/tokens-before-pages/`

**Card title:** A shared foundation for a second brand

I defined the brand rules and documented the shared design foundation before the page count grew.

**My role:** Design-system foundation and governance

**Scope:** Theme tokens, brand treatment, button variants, and component evaluation

**Collaboration:** A documented foundation for the next designer and the shared commerce build.

**Discipline:** Design tokens · Brand architecture · Governance

### At a glance

- A second brand needed a home on a platform without a design system.
- I defined theme tokens and the rules for using them before more pages were built.
- The brand launched on shared infrastructure with a documented foundation for later design work.

### Proof, in existing index order

- **Shared base:** color, typography, and spacing
- **Brand layer:** a theme on existing infrastructure
- **Governance:** decisions documented before the build

### Every page could become another place to fix the brand.

Navigation label: **Before the pages**. Keep section ID `problem`.

A second brand needed to live inside an existing commerce platform. There was no design system.

If each page carried its own styles, every brand adjustment would require another search through pages and files.

### Decide what the pages should inherit.

Navigation label: **The shared decisions**. Keep section ID `approach`.

I defined color, typography, and spacing tokens, then layered the brand over that base. Button variants had documented accessibility constraints.

I evaluated a component foundation and recorded the recommendation and reasoning. The next designer needed more than a set of unexplained values.

**Decision:** Document the shared decisions before they spread across the interface.

### Give the brand a place to change.

Navigation label: **The foundation**. Keep section ID `solution`.

The theme separated brand choices from the underlying platform. Tokens and button variants had a documented foundation that another designer could use.

Accessibility constraints were recorded with those decisions. They did not replace testing the finished experience.

- Base tokens for shared choices
- A brand theme over the base
- Accessibility constraints with button variants
- A component recommendation with its reasoning

### The next designer inherited the reasoning.

Navigation label: **The handoff**. Keep section ID `results`.

The brand launched on the shared infrastructure. Brand adjustments could happen at the token layer, and the next designer had the decisions and their reasoning documented.

## Four documents, one checkout, zero agreement.

**Existing route:** `/case-studies/a-checkout-decision-with-receipts/`

**Card title:** A checkout decision with receipts

I resolved conflicting checkout requirements and recorded the decision engineering should build. AI compared the sources; I owned the call.

**My role:** Experience decision owner

**Scope:** Checkout price presentation and requirements reconciliation

**Collaboration:** Engineering and product stakeholders working from conflicting written requirements.

**Discipline:** Experience strategy · AI-assisted analysis · Decision ownership

### At a glance

- Written requirements disagreed on how to present the consult fee.
- I compared the sources with AI, chose the experience, and recorded what the decision replaced.
- Engineering built against the decision without another meeting cycle. Refund messaging remained an open dependency.

### Proof, in existing index order

- **One price:** a combined checkout presentation
- **Traceable:** superseded requirements documented
- **Implementation:** engineering built from the recorded decision

### Both versions were written down. Both looked current.

Navigation label: **The conflict**. Keep section ID `problem`.

Requirements called for an itemized consult fee. The latest meeting directive and the design called for one combined price. Engineering could build either and point to a written source.

The disagreement would change what a customer saw beside the Buy button. It needed an owner and a decision.

### Read the sources together, then make the call.

Navigation label: **The decision**. Keep section ID `approach`.

I used AI to compare the requirements, meeting transcripts, and ticket history. Reading the records together exposed the contradictions.

I chose a combined price, matching a checkout pattern already converting with customers. AI identified the contradictions; the experience decision was mine.

**Decision:** Use a combined price and identify the requirements it supersedes.

### Give engineering something it can build against.

Navigation label: **The record**. Keep section ID `solution`.

I documented the combined-price direction and linked the superseded requirements to their sources. The record explained what changed and why.

Refund messaging remained a dependency. It needed to match the price model so the next part of the experience did not contradict the checkout.

- Combined-price direction recorded
- Superseded requirements linked to sources
- Refund messaging left as an explicit dependency

### The record held the answer.

Navigation label: **After the decision**. Keep section ID `results`.

Engineering built against the recorded direction without another meeting cycle. Refund messaging remained open.

## B85. Source narratives [APPLIED]

These replace prose in `docs/case-studies-sanitized.md`. They are source-file revisions, not additional routes. The eight stories not currently rendered remain unrendered. Remove the old blanket cleared claim from the file header. Publication clearance is governed per surface by the current register and privacy rulings. Do not print a directory of private details removed.

Use this source-file header:

> # Case studies: editorial source
>
> Editorially reviewed. Existing publication boundaries remain in force. This file is not blanket permission to publish a study.

Where a heading changes, update active provenance references without rewriting historical decision records.

### Four Documents, One Checkout, Zero Agreement

Original heading unchanged.

**Skim:** Conflicting checkout requirements resolved with a documented decision and a traceable superseded record.

The checkout requirements disagreed at the point where a customer would see the price. Some called for an itemized consult fee. The latest meeting directive and the design called for one combined price.

Engineering could build either and point to a written source. The conflict needed an experience owner.

I used AI to compare the requirements, meeting transcripts, and ticket history. It identified contradictions across the records. I chose the combined price, matching a checkout pattern already converting with customers.

I documented the direction and linked the requirements it replaced to their sources. Refund messaging remained an explicit dependency. It needed to agree with the combined-price model.

Engineering built against the record without another meeting cycle. The refund dependency stayed open.

### Reporting Without Another Status Meeting

Locate original heading: Reporting Should Not Cost a Headcount.

**Skim:** Operational reporting built from work records, with a repeatable route to leadership visibility.

Status reporting was competing with delivery. The information existed across work systems, but somebody still had to collect it, reconcile it, and turn it into an update.

I built a reporting process around those records. Rollups, goal tracking, and priority scans could start from current work instead of somebody’s recollection of the week.

The process pulled together ticket activity, messages, and calendar context. It also made incoming work easier to notice when another team added it without a separate conversation.

Leadership had a repeatable view of the work. Reporting no longer needed to be reconstructed from memory for each update.

### A Licensing Question for Design

Locate original heading: Finance-Grade Answers From a Design Team.

**Skim:** A software-seat review that connected account records to the people and teams using them.

Marketing leadership wanted to understand design software spend. The questions concerned seat ownership, department allocation, and accounts that needed review.

A license export described access. An employee index described the organization. I joined them so the questions could be answered against the same record.

I organized the findings into a leadership deck, with the conclusions first and the method available behind them. The review identified external accounts and a basis for license cleanup.

Leadership had a record to use in seat-allocation and renewal discussions.

### A Retrospective Built on Evidence, Not Memory

Original heading unchanged.

**Skim:** A source-linked launch review that found categories of work missing from the estimate.

Post-launch memory is a poor database with excellent confidence. A process review was coming, and people had different recollections of the timeline.

I used AI to assemble a timeline from tickets, documentation, messages, and screenshots. Each entry stayed attached to a source. Contradictions were recorded alongside the evidence that exposed them.

I turned that record into visual review panels. The conversation could stay on the process and the work, with a shared record in front of everyone.

The estimate had excluded wireframing. Reusable component design and content-template work were also missing from the timeline.

Whole categories of work had never entered the estimate. The remedy became rather boring. Estimate them next time.

### Measuring the Thing That Measures Everything

Original heading unchanged.

**Skim:** A repeatable way to examine where AI was useful, what it cost, and where it created risk.

“It feels faster” is a poor unit of measure. I wanted to know where AI was earning its electricity.

I built a usage tracker that recorded the task, time saved, frequency, quality, effort, and a specific risk note. The note forced each use case to name what could go wrong.

I also brought team survey responses into a review of how people were using AI. The work considered adoption alongside quality and risk, instead of treating more usage as the result.

The record gave us something to inspect and discuss. AI-assisted deliverables still went through review before reaching leadership.

### Catching Conflicts Before Anyone Writes Code

Original heading unchanged.

**Skim:** The source-comparison method moved earlier, into the gap between the brief, wireframe, and component library.

A landing-page redesign had a creative brief, wireframe specifications, and a component library. Each document described part of the work, but they did not agree on every decision.

We had three sources of truth, which is an ambitious number of truths for one landing page.

I used the source-comparison method from the checkout review before the build started. AI compared the artifacts and produced a record of contradictions for resolution.

The conflicts could be discussed while they were still changes to a document. Resolve the argument while it still has a Delete key.

### Four Executives, Four Different Customer Journeys

Original heading unchanged.

**Skim:** A working session that followed the customer across departments and examined the handoffs with their owners present.

The integration crossed marketing, digital health, engineering, and commerce. Each leader held a different part of the customer journey. No shared view covered first awareness through subscription and refill.

I built a board system for the session, wrote a moderator guide, and prepared a scenario matrix. Concrete customer situations gave the group something to follow across departmental boundaries.

I led the walk-through. When a handoff failed, the people responsible for both sides were present to examine it.

The group produced an end-to-end journey and a record of the gaps. The boards, guide, and scenarios remained available for future sessions.

### Navigation Decisions Were Being Made on Taste

Original heading unchanged.

**Skim:** Moderated research used to guide the catalog’s entry points and document menu-discovery problems.

Navigation choices were being discussed internally without testing them against people using the site. Knowing the catalog made the structure look more obvious than it was.

I led moderated usability research into the navigation and information architecture. The study examined entry paths and how people discovered and used the mega menu.

Testing supported Shop by Condition as an entry point and documented discoverability problems in the menu. I brought those findings into the redesign.

The team gained evidence for the decision and a report format for its next study. Preference lost its monopoly.

### A Scope Decision With a Staffing Gate

Locate original heading: Reframing a Scope Fight as a Staffing Question.

**Skim:** Phasing options made the relationship between launch scope and staffing explicit.

Leadership was debating whether to launch the full scope or phase the work. The conversation had developed a stable orbit.

I set out the phasing paths on one page, with their staffing implications attached. The recommendation made the next phase conditional on the required hire.

That changed what the group needed to decide. Scope and staffing could be considered together, with an explicit gate instead of an assumed capacity.

The recommended path was adopted with the hire tied to the next phase.

### Tokens Before Surface Area

Original heading unchanged.

**Skim:** A documented design foundation for a second brand, built before its page count grew.

A second brand needed to live inside an existing commerce platform. Without a shared foundation, every page would carry another set of styling decisions.

I defined color, typography, and spacing tokens, then layered the brand over that base. I documented button variants and their accessibility constraints.

I evaluated a component foundation and recorded the recommendation and reasoning. The next designer had a place to start and a record of why the choices had been made.

The brand launched on shared infrastructure. Brand adjustments could happen in the token layer. Testing the finished experience remained necessary; the tokens did not settle every accessibility question.

### Estimates That Excluded the Work

Original heading unchanged.

**Skim:** A prioritization workshop made missing work visible and produced an agreed approach for the next round.

Landing-page work was being discussed in terms of which pages, what order, and what timeline. The estimates did not include every category of work the team needed to do.

I ran a prioritization session with cross-functional leadership, then turned the output into summaries and a process record.

The discussion confirmed that the creative estimate excluded wireframing. Component design and content-template work were missing from the timeline too.

The marketing executive proposed the template structure that became the agreed approach. That authorship mattered: the process had an executive co-owner.

The record gave future estimates a list of work they needed to include.

### Making UX Visible in the Numbers

Original heading unchanged.

**Skim:** An experience scorecard and customer-feedback plan that connected research questions to business outcomes.

Experience quality needed a standing way to be measured. Joint conversion results answered some questions, but they did not provide a complete view of the customer experience.

I built a framework that paired experience measures with business outcomes. The scorecard drew on real user monitoring, moderated testing, and survey data. I used each source for the questions it could answer.

I also evaluated a customer-feedback approach focused on satisfaction and effort at particular interactions. That included a vendor recommendation.

The scorecard was repeatable. The feedback program was ready for instrumentation, which remained a next step.

### One Platform, Five Properties

Locate original heading: The Alternative to Five Sites Was Five Teams.

**Skim:** A shared commerce framework that cut a branded-property launch from six weeks to two.

The first storefront had sale pricing typed in by hand, one product at a time. It sold, and leadership wanted more properties. Repeating the site would also repeat the maintenance.

I brought a roadmap for a shared platform. Each release replaced a manual task with a capability the next property could use.

Brand settings and theme tokens separated identity from the application. Shared product and provider data let every property use information from the same services. Scheduled promotions replaced hand-edited offers.

Source attribution connected the storefront to acquisition. Promotion, copy, and messaging changed by traffic source, down to affiliate identifiers. The page said what the ad promised.

The framework covered marketing pages through cart and checkout. Deployment could target one property or all of them.

I owned the roadmap, experience, and front-end work for the core framework. A part-time engineer and I built and maintained it. Other designers launched the branded properties. Internal engineering built the microservices and APIs we connected to.

A fully branded property went from six weeks to launch to two. Five properties ran on the platform.

In one measured year, finance credited the properties with 47% of company revenue growth, 27% of total lead capture, and 20% of overall revenue. The growth figure is a share of the company’s revenue-growth increment in that year.

The company owned the custom platform. Shared capabilities absorbed work that would otherwise recur across the properties. You create velocity by making the work smaller.

### Building the Function That Was Not There

Original heading unchanged.

**Skim:** A design practice built alongside delivery, with foundations the next project could use.

A product integration was moving forward before a design practice existed. There was no design system, research practice, or experience-measurement framework to inherit.

I made the foundations part of the delivery work. The token layer had governance. Research came with a repeatable report format. Executive workshops had prepared boards, a moderator guide, and scenarios.

I also built an experience scorecard and prepared a customer-feedback program with a vendor recommendation. Instrumentation remained a next step.

Subsequent work could use those materials. The team had documented decisions and working formats to begin from.

The artifact was stability. Portfolio photography remains challenging.

## B86. Shared interface copy and descriptions [APPLIED]

### Featured card footer

In `components/ui/WorkCard.tsx`, remove the repeated `People · Process · Better outcomes` footer text. Keep `View`, the arrow, and the accessible case-study trigger. The removed text adds no case-specific information and implies an outcome even on studies without a measured result.

### Reading-page labels

In `app/case-studies/[slug]/page.tsx`:

- Replace `The scope` with `Scope`.
- Replace `Working together` with `Collaboration`.
- Replace `In This Story` with `In this story`.
- Replace `Next Case Study` with `Next case study`.
- Use the authored section labels in desktop and mobile navigation. Preserve existing section IDs and anchors. Remove the hardcoded mobile Problem/Journey/Solution/Results override where it would contradict those labels.

Retain `All case studies`, `My role`, `The Decision`, and `View all case studies`. Retain the caption `Explanatory reconstruction of the approach, based on the project narrative.`

The at-a-glance Problem/Solution/Result labels are navigational summaries, not instructions to use an identical prose structure.

### Study illustrations

In `components/case-studies/StudyVisual.tsx`:

- Locate the platform line below `One commerce platform`. Replace with: `Shared capabilities across the properties.`
- Locate the navigation illustration caption. Replace with: `Researching the catalog entry points`.

Retain the other explanatory labels, anonymous context, and reconstruction disclaimer. Do not redraw diagrams or manufacture original project artifacts.

### Call-center demonstration

In `components/ui/CallCenterDemo.tsx`:

- Section heading: `When availability changes`
- Busy-state example hero title: `Explore plans while we’re busy.`
- Switch label: `Highlight changing sections`
- Introductory explanation beside the state controls: `This demonstration shows how the site responds to call-center availability. The original status feed checked every five minutes; this preview cycles every five seconds.`

Retain `Illustrative interaction demo`, `Ready`, `Busy`, `Closed`, `Auto`, `Reduced motion: choose a state to preview it.`, and `Auto cycles every 5 seconds. Choose a state to stop.`

Do not present these example messages as verbatim historical campaign copy or as a connection to a live call center. The source status-feed interval and demo interval describe different things.

### Image descriptions

In `lib/data/projects.ts`, use source context to locate these existing images. Confirm their identities visually during implementation before applying the descriptions. This editorial pass did not inspect their pixels.

- BumblebeeMD mobile content page: `BumblebeeMD content page, mobile`
- First BumblebeeMD icon sheet: `BumblebeeMD icon designs, first sheet`
- Second BumblebeeMD icon sheet: `BumblebeeMD icon designs, second sheet`
- First Hydra UI-elements sheet: `Hydra interface elements, first sheet`
- Second Hydra UI-elements sheet: `Hydra interface elements, second sheet`
- Three workshop images currently repeating Content Strategy: corresponding labels `Creative brainstorming`, `UX/UI strategy`, `Conversion-testing strategy`.
- Obscured roadmap: `UX roadmap example with project details obscured`

Keep other accurate descriptions. Do not infer study findings from an asset filename.

### Inline-link parser comment

In `components/ui/CaseStudyModal.tsx`, locate the explanatory comment above the inline-link parser that uses a colleague as an example. Replace only the comment with:

> Project prose can contain Markdown-style links. Expand them into anchors while leaving other text unchanged.

Do not alter the parser or repeat the colleague’s identity in a commit message.

### Design reference

In `app/design-system/DesignSystemExplorer.tsx`, replace the hardcoded historic baseline/date with:

**Header:** Live site reference

**Detail:** Examples load the current site routes.

Replace the explanation below the frame with:

> This frame loads a site route and scrolls to the selected element. Layout, artwork, copy, and interactions come from that page. Scroll inside the frame to see the surrounding content.

Remove the claim that later modal and focus refinements are excluded from a historic baseline. Do not invent a current commit label.

In `app/design-system/catalog.ts`, replace the relevant descriptions:

**Focus Halo description:** Keyboard focus treatments from the source page. Inspect the selected example in its page context.

**Corner Current behavior:** The source controls the decorative layers. Operating-system reduced-motion preferences are respected.

**Animated Image behavior:** The retained image example uses the source’s motion handling. Request reduced motion to inspect its still treatment.

**Hero Identity behavior:** The visual role sequence is decorative. The source provides a readable role and a reduced-motion fallback.

Remove other catalog wording that instructs visitors to use a visible Pause motion control that the source no longer renders. Retain technical pattern names, selectors, and source references. Do not describe these editorial changes as browser-tested behavior.

### Retained interface copy

Retain clear functional labels, filter names, result counts, loading/error/retry/close copy, career-experience labels, contact details, and the full slogan in the reading-page footer. Keep the qualitative-outcome label. Do not rewrite metadata as marketing promises.

The reviewed sources include `lib/data/navigation.ts`, `components/nav/NavMain.tsx`, `components/case-studies/StudyShell.tsx`, `StudyCollection.tsx`, `OutcomeDashboard.tsx`, `CareerStats.tsx`, and `components/ui/CaseStudyModal.tsx`.

### B86 implementation finding — 2026-09-29 [APPLIED]

The required visual identity check found two further BumblebeeMD assets carrying
the same inaccurate `BumblebeeMD Homepage Desktop` description. The defect-class
sweep found these two remaining instances. Their pixels show image treatments and
plan-selection boxes, respectively. Register these source-context corrections
before applying them; preserve the original images and embedded campaign text:

- `/images/work/bmd-modal/images.png`: `BumblebeeMD image treatments`
- `/images/work/bmd-modal/buy-box.png`: `BumblebeeMD plan-selection boxes`

## B87. Writing-governance clarification [APPLIED]

Append a dated clarification to the writing governance. Do not erase historical decisions.

The current site positions Jacob as a product and design leader and coach. Describe the actual decisions, ownership, and team responsibilities. Retain historical hands-on work when material to the story. Do not relabel it as delegation or management.

Individual case studies no longer carry Tools or Technologies inventories. This overrides older instructions to retain an inventory merely as evidence of period context. Material implementation mechanisms, formal course names, employment records, and diagram labels remain eligible when accurate.

Positive former-employer names and the official Hydra name remain permitted under the existing resolved naming rules. The anonymous reading pages remain anonymous. No new publication permission is created by this review.

Do not claim that edited writing will pass an AI detector. No detector service was used and no text was sent to an outside detector.


## B93. October 8 main-site browser refinements [PUBLISHED; FOOTER CORRECTED BY B94]

Jacob's direct browser annotations supersede the earlier homepage placements.
Remove the hero paragraph beginning "I lead product and design teams." Restore
"People · Process · Better outcomes" in each featured-card footer, to the left
of View. This is existing approved wording from the prior card; no new claim.
Keep "There is always a better way, together we will find it." verbatim, use
a lighter weight, and fade it in slowly after the opening word sequence.
Navigation active labels/icons are white against contrast-checked backgrounds.
The plus turns clockwise when the word aperture contracts and counterclockwise
when it expands. B88-B92 remain reserved for the separate private portfolio.


## B94. Featured theme correction and slogan line break [PUBLISHED]

Jacob's October 8 browser review corrects B93's mistaken restoration of the
shared footer. Use the existing B75 canonical themes from project.caseStudyTheme:
WebMD: Speed to Market; DentalPlans: Building for Scale; BumblebeeMD: Reuse by
Design; Hydra: A Shared Language; One Park Financial: Behavior Into Decisions.
Render each theme to the left of View. No new copy is authored.

Keep the slogan wording, weight and fade unchanged; insert a mandatory line break
after “way,” so “together we will find it.” starts on the next line at every width.
This supersedes B93 only for the footer text and slogan line layout.


## B95. AI chat study on the main site [APPLIED LOCALLY]

Jacob requested moving the reviewed P03 AI chat case study to the main site on
October 8. This supersedes the private-only placement for this study alone.
Canonical selected copy: docs/ai-chat-study.json, copied verbatim from P03 in the
reviewed final handoff. It contains the title, summary, role, collaboration,
outcome, all 28 narrative/asset blocks and five reconstruction captions/alt texts.
Retain the existing identity “AI product design” and theme “Usability before launch”.
The main feature opens the shared modal and links to a standalone reading page.
Customer, timing and representative demos retain their reviewed illustrative
content, human-review behavior and reconstruction labels. No other private study,
related-study record, source packet or original account material is included.
No new factual claims, metrics or shipped-feature claims. No deployment this pass.

## B96. AI study reading and mobile-demo revision [APPLIED LOCALLY]

Jacob's October 8 annotations authorize a new visual treatment and shorter reading
flow. Preserve the B95 title, identity, theme, role, collaboration and evidence limits.
CSS capitalizes shared card identities and themes; summaries hide at the existing
single-column breakpoint. The revised opening and section copy is registered here
before implementation:

- Opening: “The assistant launched. Customers tried it. Continued use was harder to earn.”
- Context: “I led experience research and scoping for one assistant in two places: the public site and the console used by service and account-management representatives.”
- Account finding: “In testing, the assistant returned a specific account balance. It should have referred the question to an account manager.” / “I traced the answer to a sample statement in the source warehouse. The source material contained the very answer the assistant was meant to avoid.”
- Waiting: “I specified what the assistant should do while people waited, and how it should help when it could not answer.” / “Acknowledge within 0.1 to 0.4 seconds. Give a holding message at three seconds, then thanks and an apology at seven. At ten seconds, or immediately after a stall or critical error, offer a route to help.” / “These are project requirements, not measured production response times or a universal limit on patience.”
- Scope note: “Streaming, follow-up questions and escalation paths were recommendations. The record does not establish which individual features shipped.”
- Representative: “Representatives needed the conversation history, a summary of what had been tried, references and language alerts beside the draft. They retained responsibility for the reply.”
- Tracking: “I secured tracking on the customer-facing assistant before launch. A subset of the requirements shipped.” / “Customer engagement fell after early interest, alongside response-speed and interaction-friction concerns. Internal adoption stayed low; representatives cited accuracy and waiting.” / “The record does not isolate each feature’s effect or support a numerical uplift claim.”
- Closing: “Service behavior belongs in the launch criteria, including the route to help when the assistant cannot answer. Tracking must distinguish a first visit from continued use.”

Section headings retained: An answer it should never have given; Ten seconds needed
a plan; The representative had a different job; What the tracking said.
Navigation labels: The finding; Waiting and failure; Human review; What shipped.
Demo labels: Try the response states; Reconstruction; Scenario; Replay 10 seconds;
Stop replay; Critical error; Reset; 0.2 s / Received; 3 s / Holding; 7 s / Waiting;
10 s / Get help; Conversation context; Review the reply; Apply suggested referral;
Add reply to sample; Added to sample; View reference; Reset example.
All sample messages, source finding, human review gate and reconstruction captions
remain from B95. Short instruction: “Choose a state to see the response, or replay
the wait.” No live AI or actual messages. Remove the repeated timing link/figure
and redundant closing Outcome section; retain evidence once where it belongs.
The outcome caption retains its causal limit once, followed by: “No numerical
uplift is established.” Demo figure headings follow the reading-page hierarchy.
