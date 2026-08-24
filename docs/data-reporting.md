# Data Reporting

Every number gets interrogated before it reaches any surface.

This exists because the largest errors in this body of work have not been voice failures.
They have been framing failures: a number that was true, attached to the wrong noun.
Three occurred in a single session, all in the same shape, and one of them shipped to a
live page.

A misframed number is worse than no number. It survives until someone checks, and the
person who checks concludes the whole document is unreliable.

---

## The six questions

Run all six on every figure. If any answer is unknown, the figure does not publish until
it is known, or it publishes with the unknown stated.

### 1. What is the unit? What was actually counted?

Not the concept. The countable thing.

Assets produced is not demand. Requests received is not demand either. Production hours
are not headcount. Revenue is not sales. Sessions are not users.

*Failure case:* "Demand rose about 70%." What rose 70% was assets delivered. Demand was
never measured. A reader asking "70% more what" got an answer the document could not
give.

### 1a. Is the denominator the same population as the numerator?

Row counts are not entity counts. Before any per-person, per-team, or per-unit ratio
publishes, confirm the denominator excludes zero-value rows, null rows, and duplicate
entries. If the numerator's source already excludes them, the denominator must too, or
the ratio describes a population that does not exist.

*Failure case, twice.* A peak-season table held 20 rows one year and 22 the next. One
row logged zero hours, one was null for maternity leave, and one name appeared twice.
The hours total already excluded the first two. Contributing headcount was 18 and 21,
not 20 and 22, and the per-person figure moved by nine points when that was caught.

The ratio built on hours was unaffected through both corrections, because hours and
output came from the same source and the same people.

### 2. Share or change?

A percentage is one of two completely different claims and they are routinely confused.

- **Share:** this thing was 47% of that thing.
- **Change:** this thing grew by 47%.

They are not interchangeable and the difference is usually a factor of several.

*Failure case:* "increased sales by 47%" versus "47% of company revenue growth." The
first is a growth claim about sales. The second is a share claim about the growth
increment. Only the second is true.

### 3. Share or change of *what*, exactly?

Where the arithmetic actually hides. "New revenue" can mean three things:

- All revenue in the year
- Revenue from customers acquired this year
- The growth increment, this year's revenue minus last year's

*Worked example:* revenue moves from 6 to 10. Growth is 4. The platform produced 47% of
the 4. As a share of the full 10 that is roughly 19%, which independently corroborates
the separately stated 20% of overall revenue. Two figures holding each other up is a
strong position. Getting the denominator wrong collapses both.

### 4. What is the window?

A single measured year, a cumulative lifetime, or a peak. Without a window a reader
assumes cumulative and discounts accordingly.

Attaching the window usually makes the number stronger, not weaker. "47% of revenue
growth in a single year" beats an unbounded 47% every time.

### 5. Who measured it, and how solid is the measurement?

Three grades:

- **Attributed:** a named function measured it. "Finance credited the properties with..."
  Strongest. Moves you from claiming a number to having built the thing that produced it.
- **Directional:** measured, but with extrapolated inputs or definitional soft spots.
  Publishable. The caveat must be recorded even when it is not printed.
- **Recalled:** remembered, never measured. Do not publish as a figure. It can appear as
  a description without a percentage attached.

*Live example:* the peak season asset counts include extrapolated months. The source
analysis says so plainly and asks that results be read as directional year-over-year
comparisons rather than audited metrics. That sentence is a strength when volunteered
and a liability when discovered by someone else.

### 6. What is the mechanism?

A number with no visible cause is the first thing an interviewer attacks. Not because it
is false, but because there is nothing to talk about.

*Failure case:* "the properties carried 47% of company revenue growth." Two people built
a platform and it produced half a company's growth. Both facts true, no line between
them.

*Fixed:* "Source attribution meant the page said what the ad promised. Promotion, copy,
and messaging changed based on where the visitor came from, down to individual affiliate
IDs. In one measured year finance credited the properties with 47% of company revenue
growth."

The mechanism goes first. The number lands as a consequence rather than an assertion.

---

## Choosing which figure to lead with

When several figures describe the same result, they are not equally durable.

**Ratios beat totals.** Assets per hour up 62% is stronger than assets up 70%, because a
ratio is independent of how many people were on the team and needs no claim about demand.

**Attributed beats self-measured.** A number finance calculated survives scrutiny that a
number you calculated does not.

**A figure that cross-checks against another beats a lone figure.** 47% of growth and 20%
of revenue corroborate each other. Either one alone is just a claim.

**If only one figure can survive compression, keep the ratio.**

---

## Comparisons that do not survive

Cut these before someone else does.

**Comparisons to unsourced benchmarks.** "Cheaper than enterprise hosting at the time"
requires period pricing nobody has.

**Claims about other departments' budgets.** "The cheapest investment in the company" is
a claim about numbers you cannot access. Make the same point from inside your own scope.

**Priority claims.** "Before Google did it" is checkable and usually wrong. Claim the
pattern, not the precedence.

**Volume claims without a list.** "Numerous custom integrations" is padding until three
can be named.

**Proximity to outcomes you did not participate in.** Being present during an
acquisition is not contributing to one. State the principle a reader can complete on
their own instead.

---

## Never invent to close a gap

If a bullet needs a number that does not exist, write `[NEED: metric, where to find it]`
and leave it open. An entry that is short because the material is short is not a defect.

Roles with no figures get written as scope and responsibility. That is an honest entry,
and it reads better than an invented one survives.

---

## Where canonical values live

This file holds the rules. `docs/copy-register.md` holds the values. When a figure's
framing changes, the register is the surface that gets amended, and every other surface
follows from it.

Never let a figure exist only in a DOCX or a PDF. It will drift.
