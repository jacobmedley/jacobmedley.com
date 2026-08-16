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
> The first year closed with roughly a 70% increase in output against a temporary
> 6.7% rise in contractor headcount, and one of the smoothest peak seasons on record.
>
> With creative operations stable, we split the department and I moved full time to
> building the experience design side of the business, a function that had not
> previously existed. I defined the practice and hired the company's first dedicated
> XD/UX designer.

**Open items:**
- The 70% and 6.7% figures need a baseline period and an attribution basis before
  they go on a PDF a recruiter will question.
- "Surge" replaced with "peak". Internal vocabulary means nothing to an outside reader.

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
> I defined the interaction requirements, including response-time feedback thresholds,
> streaming responses, explicit system status and failure states, compliance alerting
> for internal users, and account and chat history summaries so both the assistant and
> the human agent opened with context. I secured tracking on the customer-facing
> assistant. The data showed early customer engagement followed by rapid dropoff
> correlated with response speed and friction, and internal adoption that stayed low.

**Note:** do not characterize leadership decisions, and do not mention the company's
current business condition. State what was recommended, what shipped, and what the
data showed.

## DentalPlans.com

**Open items, blocking:**
- The 47% sales / 20% revenue figures need: baseline period, attribution basis
  (owned outright, design lead, or team result), and measurement timeframe.
- Employment dates need confirming.

## One Park Financial / Bluegreen Vacations / BumblebeeMD

**Open items:**
- The 2022-2023 interval: gap, overlap, or mid-employer title change.
- BumblebeeMD: launch and shutdown both need stating.

---

# Section B: Live copy corrections

Errors currently published. Each is a verbatim find/replace.

| File | Line | Current | Corrected |
|---|---|---|---|
| ResumeSection.tsx | 70 | `on record — the company's` | `on record, the company's` |
| ResumeSection.tsx | ~70 | `Surge seasons` | `peak seasons` |
| projects.ts | 362 | `Business Results — DentalPlans.com` | `Business Results: DentalPlans.com` |
| projects.ts | 762 | `UX/UI Fragmentation — Button` | `UX/UI Fragmentation: Button` |
| projects.ts | 777 | `UX/UI Fragmentation — Error and Input Treatments (1 of 2)` | `UX/UI Fragmentation: Error and Input Treatments (1 of 2)` |
| projects.ts | 786 | `UX/UI Fragmentation — Error and Input Treatments (2 of 2)` | `UX/UI Fragmentation: Error and Input Treatments (2 of 2)` |
| projects.ts | 898 | `engaged with — and which` | `engaged with, and which` |
| projects.ts | 1305 | `Example UX Roadmap — obfuscated` | `Example UX Roadmap: obfuscated` |
| projects.ts | 1583 | `root canals — the highest-volume` | `root canals, the highest-volume` |
| projects.ts | 1587 | `root canals — the highest-volume` | `root canals, the highest-volume` |

Also on `main`: remove the J.R. Hernandez anchor at `projects.ts:1005`. Keep the
sentence, drop the link and the name.

Replacement sentence:
> Testing ran as a standing partnership with product marketing. They owned hypothesis
> and traffic, I owned the variant and the read.

---

# Section C: Portfolio UI strings

On `feat/recruiter-portfolio`. Fix before that branch merges or the em dashes return.

| File | Line | Current | Corrected |
|---|---|---|---|
| PortfolioShell.tsx | 25 | `Jacob Medley — Portfolio` | `Jacob Medley: Portfolio` |
| PortfolioShell.tsx | 39 | `Private portfolio — not indexed, not for distribution.` | `Private portfolio. Not indexed, not for distribution.` |

---

# Section D: Pending case studies

**Conversational assistant, Mutual of America.** Not yet written into
`docs/case-studies-sanitized.md`. Source material is section A above. Needs
anonymizing: no employer, no product, no colleague. Thesis line, verbatim:

> No matter how valuable something is, if it is not usable, it is not used.

Unresolved: the response-time thresholds were stated as both 0.1/1/8 and
0.1/1/5/8. Pick one and hold it everywhere. Nielsen's canonical set is 0.1/1/10,
so any deviation should be deliberate and stated as such. A live demo exists at
`/interaction-design-concepts/response-times/` and is worth linking.

**DentalPlans A/B testing work.** The portfolio taxonomy reserves an `A/B Testing`
tag with nothing assigned to it. Decision made to include legacy work in the gated
section. Needs a scrub pass before it can be used.

---

# Reconciliation protocol

1. Copy is authored or amended **here** before it is implemented anywhere.
2. Either chat may propose a change. It lands in this file first.
3. Implementation references the section, so the two never drift.
4. Open items stay listed until answered. Do not invent numbers to close a gap.
5. `docs/` must live on `main` so both branches can read it.
