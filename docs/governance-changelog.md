# Governance files: what changed and why

**For:** every chat in this project.
**Applies to:** `docs/jacob-style.md`, `docs/voice-and-tone.md`, `docs/data-reporting.md`.

`voice-rules.md` was split into three files. This records what changed since that split,
and why each change happened, so no chat re-litigates a decision that already has a
reason behind it.

**Load all three wherever `voice-rules.md` was loaded before.** Style is the constraint
set. Voice is the personality inside the constraints. Data reporting runs on anything
containing a figure. Following only the style file produces clean text that sounds like
nobody.

---

# 1. `voice-and-tone.md`

## The slogan was recorded wrong and is now corrected

**Was:** "There is always a better way. (correct ending, no second clause)"

**Now:** "There is always a better way, together we can find it. **This is the full
slogan and the second clause is not optional.** An earlier rule recorded the
single-clause form as correct. That was wrong. The comma splice is deliberate and
characteristic."

**Why it matters more than one line of copy.** The rule came over unexamined from the
original `voice-rules.md`. It was applied against Jacob's own redline, which had the
full slogan, and it cut the better half. A rule that says a person's own signature line
is wrong will keep truncating it every time any chat touches copy, and it had already
done so once.

**Sweep required.** If the single-clause form was applied anywhere on the site or in any
other artifact, it is wrong there too. Per the class rule, find every instance and fix
them together rather than the one that surfaced.

**The generalizable lesson.** Rules about a person's own vocabulary need provenance. If
nobody can say where a rule came from or who confirmed it, it is a guess with authority
attached. Two of these have now been caught: this one, and the "corpus" edit that
overwrote Jacob's word "warehouse."

---

# 2. `data-reporting.md`

## New: question 1a, denominator population

Inserted between "What is the unit?" and "Share or change?"

> **Row counts are not entity counts.** Before any per-person, per-team, or per-unit
> ratio publishes, confirm the denominator excludes zero-value rows, null rows, and
> duplicate entries. If the numerator's source already excludes them, the denominator
> must too, or the ratio describes a population that does not exist.

**Why.** The peak-season per-person figure moved twice. A roster table held 20 rows one
year and 22 the next. One row logged zero hours, one was null for maternity leave, and
one name appeared twice. Contributing headcount was 18 and 21. The hours total had
already excluded the first two rows, so dividing that output by a 20-person headcount
mixed populations and produced a ratio describing nobody.

**The part worth internalizing.** Question 1 already asked what was counted, and it was
not enough. The unit was right, "people," and the count was still wrong. A ratio has two
sides and both need the same population.

**A durability signal fell out of it.** Assets per hour held at +62% through both
corrections, because hours and output came from the same source and the same people. Two
headcount readings moved and both per-person figures moved with them. When a figure has
to be cut for space, the one that has survived a correction is the one to keep.

---

# 3. `jacob-style.md`

No changes since the split. Two items from earlier in this workstream are recorded there
already and are worth restating, because both reversed a prior instruction:

**Vendor names in employment history flipped from banned to encouraged.** Absence of
insider nouns is the strongest signal a machine wrote something. Nobody fabricating a
career writes Aprimo or SessionCam. This reverses an instruction sent from the resume
workstream. That call was wrong.

**The naming rule has explicit scope.** Case studies and portfolio copy scrub employer
names, vendor names, and dates. Employment history requires employer names and dates and
is encouraged to carry vendor names. Colleague names are banned everywhere without
exception.

---

# 4. Two workflow rules that are not in any of the three files

Both came out of this workstream and both need a home. Recommend the working agreement
rather than the voice files, since they govern process rather than prose.

## Advisors author prose, not implementation

Never produce FIND strings, line numbers, file paths, tag values, weights, enums, status
flags, commit hashes, or counts of anything in a file. Never assert what a file
currently contains. Quote what was handed over and say so.

**Format:**

```
LOCATE:       prose description of what to find
REPLACE WITH: the new text
```

Whoever holds file access builds the anchor by reading the file.

**Why.** An anchor built from the register rather than from the file caused a real
mismatch on the Health-E sentence, and the implementing agent correctly stopped. The
prose-location format is slightly slower for the implementer. That cost is smaller than
a failed anchor, which stops the work and burns a round trip diagnosing it.

## A figure gets applied when it arrives with a source and a method

A bare instruction to change a number that contradicts a table already in hand does not
get applied. The same instruction carrying a source, a method, and a reconciliation does.

**Why.** Both happened in sequence in this workstream, one turn apart, and the
distinction is the whole reason the second one was trustworthy. "Change 57 to 48"
contradicted verified figures. "The row count included a zero-hour row, a null maternity
row, and a repeated name, so contributing headcount is 18 and 21" is checkable, and it
checked out.

---

# Open, and it should not stay open

**Do former employers get the same anonymization standard as the current one?** This
workstream has assumed yes and applied it consistently across every case study and every
employment entry. It has never been ruled on. It belongs in the register or the working
agreement as a stated rule so no chat has to guess again.
