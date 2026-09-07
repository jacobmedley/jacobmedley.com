# Status

## Portfolio brand wave complete locally, September 6, 2026

The approved four-wave implementation and final browser acceptance are complete on
`codex/portfolio-brand-wave-continuation-20260906` in the assigned Codex worktree.
The continuation commits are `02468cb`, `8a94356`, `53dcbb9`, `e58dd20`, and
`ebb025c`, built on the approved Wave 1 commit `3868955`. Pre-change recovery remains
available at `checkpoint/portfolio-before-brand-wave-20260906` (`b8aac95d`).

Follow-up browser annotations are implemented at `d6e8c55`; see
[the annotation checkpoint](browser-annotation-checkpoint.md). Global refinements are
applied, while `/design-variants/` remains a noindex comparison page awaiting Jacob's
choice among three Visual Design and three icon-design directions.

See [the owning production plan](website-production-plan.md),
[final acceptance](final-brand-wave-acceptance.md), and the individual
[Wave 1](wave-1-browser-acceptance.md), [Wave 2](wave-2-visual-checkpoint.md),
[Wave 3](wave-3-taxonomy-checkpoint.md), and [Wave 4](wave-4-outcomes-checkpoint.md)
checkpoints. No publication, deployment, merge, or remote push was performed.
The original checkout and its existing ownership marker were preserved.

Volatile state. Read this first, write it last.
Durable rulings, wording standards, and figures live in copy-register.md.
If a fact would still be true in three months, it belongs there, not here.

## Surfaces

| Surface | Current | Owner |
|---|---|---|
| Site | main, see git log | site chat |
| Word master | v1r9 | resume workstream |
| Principal IC master | v1r1 | resume workstream |
| Design systems master | v1r1 | resume workstream |
| Designed PDF | v2r3 | resume workstream |
| LinkedIn | unmanaged, out of scope | Jacob |

## Open

Nothing blocking on the site side.

**For the Coordinator, Aug 31. The accessibility claim is dropped, not corrected. The repo
still carries it.**

The masters said "Built an automated accessibility auditing pipeline ... runs on a schedule
against production." Jacob corrected the facts, then dropped the whole claim: he devised a
process letting a non-technical person run a script against an unpublished page, automation
still in progress, and his read is that it is weak beside the rest of the record.

Retired, never reuse: "Built an automated accessibility auditing pipeline," "runs on a
schedule against production," "a two-person function can now flag critical issues before
launch."

Still allowed: accessibility and WCAG as a competency. No pipeline, no automation, no
schedule.

  - docs/case-studies-sanitized.md carries the retired wording. Remove it.
  - docs/copy-register.md should record the retirement so it cannot come back.
  - Full history is in The-Hunt/rules/canonical-figures.md.

The resume workstream cleared its own masters and unsent files. It does not write the repo,
so both items above are the Coordinator's.

Job search state lives in The-Hunt/pipeline.md, not here.

Carried on feat/recruiter-portfolio, unmerged:
  - remove the reviews-that-end-in-decisions study from portfolio-studies.ts
  - fix "Two assistants came out of the same build" per the assistant
    wording standard
  - thumbnails, layout issues
  - Note: docs/case-studies-sanitized.md on feat/ai-assistant-case-study still
    reads "Two assistants came out of the same build." Both resume surfaces are
    already fixed. That branch is the last place it survives.

Carried on feat/ai-assistant-case-study, unmerged:
  - Jacob's wireframes, notes, and spec-versus-shipped content

## Closed, do not re-raise

Anonymization standard, Hydra as a proper noun, pre-2015 LinkedIn scope,
the making-the-work-smaller cap, assistant wording, title standard,
peak-season figures. All recorded in copy-register.md.
