# Jacob Style

Mechanics, grammar, and anti-AI patterns. This file governs **what is allowed**.

Its companion, `voice-and-tone.md`, governs **what it sounds like**. Style is the
constraint set. Voice is the personality inside it. Following every rule here produces
clean text that could still have been written by anyone, so both files apply to every
draft.

---

## Scope, and the exception that keeps getting lost

These rules apply to all written output: case studies, portfolio copy, site content,
resume, cover letters, LinkedIn.

**One category is carved out and it must not be collapsed back in.**

| Content type | Employer names | Vendor and platform names | Dates |
|---|---|---|---|
| Case studies, portfolio copy, sanitized file | Never | Never | Never |
| Employment history (site resume, DOCX, PDF, LinkedIn) | Required | Encouraged | Required |

Employment history without employer names does not parse and does not get read.
Employment history without dates fails every applicant tracking system. The anonymization
rule exists to protect internal detail, not to hide where someone worked.

**Colleague names are banned everywhere, without exception.** Credit the function and
name the split. "Testing ran as a standing partnership with product marketing. They owned
hypothesis and traffic, I owned the variant and the read."

---

## Hard rules

**No em dashes. Ever.** Period, comma, or colon.

**No repeated adjective inside a single piece.** If a word has done its job once, find
another.

**No PII, no internal codenames, no ticket IDs** in any content type.

**Spelling of proper nouns is load-bearing.** Getting a vendor or company name wrong in
a document about that industry costs more than omitting it. Verify before publishing.
Recurring risks: Four Winds Interactive, Adobe Scene7 (one word, Adobe's styling),
Aprimo, Henry Schein, Internet Brands.

---

## Banned constructions

The AI fingerprints.

- *X is not Y. It is Z.* (the antithesis flip)
- *X rather than Y* used as a rhetorical flip rather than a plain comparison
- Opening on the denial of something the reader wants to be true: *You do not move
  faster.* Some readers stop at the denial and never reach the correction.
- *not theoretical* / *not just X, but Y*
- *the part that matters* / *the real problem* / *the real defect*
- *the quiet win* / *the bigger win*
- *wearing a costume* / *masquerading as*
- *where X goes to die*
- *treat the symptom vs. the root cause*
- Triple-parallel maxims: *fund it, defend it, repeat it*
- Tricolon plus gerund tail: *giving A, B, and C one vocabulary and shortening cycles*
- Perfectly balanced opposites of any kind
- Miniature motivational speeches at the end of sections
- *Real X, real Y*
- *resulting in* as a metric connector
- Uniform section headers repeated across every piece

---

## Banned verbs

The statistically respectable set. AI defaults here.

enable, drive, ensure, establish, leverage, surface, optimize, align, transform,
facilitate, empower, unlock, elevate, streamline

## Weak ownership verbs

Not banned outright, but each one reads as attendance rather than authorship. A hiring
manager treats them as the seam to pull on.

contributed to, involved, played a key role in, was pivotal in, partnered with, helped,
supported, was part of a team that

Replace with what actually happened: owned, built, wrote, decided, evaluated, hired,
traced, secured.

## Preferred verbs

Slightly strange, still exact. An unexpected verb reveals a mind making a choice.

acquire, evacuate, graduate, wander, absorb, dislodge, contaminate, inherit, manufacture,
smuggle, invent, dissolve, collide, orbit, calcify, outlive, object, refuse, complain

---

## Structure rules

**Vary the shape.** Some pieces get three headers, some get one, some get none. Uniform
structure is the strongest AI tell, stronger than any single word.

**Check the neighbors, not only the piece.** A study can be well varied internally and
still be the third in a row with six bold subheads. Compare against what sits beside it
in the file.

**Not every section needs a closing line.** Giving all of them one rebuilds the template
problem in a different costume.

**Skim first.** Lead each case study with a one-line specifics summary so a scanning
reader gets the numbers without reading prose.

**Uneven rhythm.** Short declaratives that land. Then a longer one. Then short again.

**Bullet length should vary.** A document where every bullet runs 25 to 40 words reads
as generated. Real ones have a six-word line next to a forty-word one.

---

## The specificity rule

**Absence of insider detail is the strongest signal that a machine wrote something.**

Generated text is smooth and generic. Written text is lumpy and specific. Nobody
inventing a career writes SessionCam, Aprimo, Bootstrap, or a part-time offshore
engineer. Tool names, dated technologies, team compositions, org quirks, and exact
figures are all evidence of a person with a memory.

Never strip a concrete detail because it looks dated or minor. Period-accurate tooling
dates the work correctly, which is a feature.

---

## Jacob's word beats the conventional term

When a domain word gets edited toward the standard one, the standard one is usually both
less precise and less distinctive.

Worked example: an undifferentiated document store feeding a language model is a
**warehouse**, which is what Jacob called it. It was edited to **corpus**, which is the
conventional term, and which wrongly implies a curated training set. The edit was less
accurate and sounded like everyone else.

Jacob's vocabulary survives by default. If a word looks unusual, check whether it is
wrong before assuming it is.

---

## Self-check before shipping any draft

1. Any em dashes? Remove.
2. Any adjective used twice? Replace one.
3. Any banned construction? Rewrite at a different angle.
4. Any banned verb? Swap for a stranger, more exact one.
5. Any weak ownership verb? Say what actually happened.
6. Do all sections have the same shape? Break one or two. Then check the neighboring
   pieces.
7. Does a section end with a slogan? Cut it or make it specific.
8. Right content type for the naming rules? Case study scrubs. Employment history names.
9. Colleague names anywhere? Scrub, in both directions.
10. Any concrete detail removed for looking dated? Put it back.
11. Any number in the draft? Run `data-reporting.md`.
