# B31 correction: peak season headcount and per-person output

**Supersedes** the table in B30 and the table in `register-amendments-session-2.md`.
**Source of record:** `2025-JIRA-Assets-Count.xlsx`, tab "Head Count and Hours".

---

## Copy change

**LOCATE:** in the Health-E entry, the sentence stating the per-hour and per-person
figures. It currently ends with the per-person figure at 57%.

**REPLACE WITH:**

> Assets per hour went up about 62% and assets per person about 48%.

Section A of the register must match the site character for character.

---

## Corrected table, canonical

| | Prior peak | Current peak | Change |
|---|---|---|---|
| Contributing people | 18 | 21 | +16.7% |
| Production hours | 680 | 725 | +6.6% |
| Assets | ~1,145 | ~1,974.5 | +72% |
| Assets per hour | derived | derived | +62% |
| Assets per person | derived | derived | +48% |

**Retired, do not reuse:** 20 to 22 people, +10% headcount, +57% per person.

Assets per hour is unaffected by this correction and by the previous one. It has held at
+62% through both. That is what a durable figure looks like.

---

## Method, recorded explicitly

**The unit is contributing humans, not roster rows.**

- **2024:** 20 rows, of which one logged zero hours and one is null for maternity leave.
  18 contributing.
- **2025:** 22 rows, of which one name appears twice. 21 unique people.

**Why the denominator has to exclude those rows.** The 680 hour total already excludes
the zero-hour and null rows. Dividing output produced by 18 people across a headcount of
20 mixes populations, and the resulting ratio describes nobody. Both sides of every
ratio now use the same population.

---

## Provenance of the error, for the record

The 20 to 22 reading came from counting roster rows without screening for zero-hour,
null, and duplicate entries. It was supplied to this workstream as verified, and the 57%
was supplied alongside it rather than derived here. No advisor in this workstream has
had access to the workbook, so neither figure could be checked at the source until the
tab was cited.

**The generalizable failure is a data-reporting one, not a spreadsheet one.** Question 1
in `docs/data-reporting.md` asks what was actually counted. Rows in a table are not the
same as people who did work, and the difference only surfaces when someone opens the
sheet and looks for blanks and repeats. Recommend adding to that file:

> **Row counts are not entity counts.** Before any per-person, per-team, or per-unit
> ratio publishes, confirm the denominator excludes zero-value rows, null rows, and
> duplicate entries. If the numerator's source already excludes them, the denominator
> must too, or the ratio describes a population that does not exist.

---

## Downstream

The DOCX resume has been corrected to 48% and rebuilt.

**One divergence between surfaces needs a decision.** The DOCX reads "output per hour"
and "output per person" where the site reads "assets." I made that change on the note
that "assets" reads as marketing operations vocabulary to a product design hiring
manager, and flagged it at the time. The site copy retains "assets." Both surfaces
should use the same noun. Either the DOCX reverts to "assets," or the site adopts
"output" and Section A changes with it.

---

## Two prior claims that may be affected

The 11-contractors-flat-both-years figure and the 9-to-11 employee split were derived
from the same roster rows now known to contain a zero-hour row, a null row, and a
duplicate. Neither appears in published copy, so nothing is live, but both should be
re-derived against contributing humans before either is used.
