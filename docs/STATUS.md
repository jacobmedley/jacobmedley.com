# Status

Volatile state. Read this first, write it last.
Durable rulings, wording standards, and figures live in copy-register.md.
If a fact would still be true in three months, it belongs there, not here.

The protocol around this file is `AGENTS.md`. Read that too, at the same time.
Project Genesis coordination is `docs/genesis-exchange.md`.

## Surfaces

| Surface | Current | Owner |
|---|---|---|
| Site | main, see git log | site chat |
| Word master | v1r8 | resume workstream |
| Designed PDF | v2r3 | resume workstream |
| LinkedIn | unmanaged, out of scope | Jacob |

## Open

Nothing blocking on the site side.

Exchange records owed, coordinator action required:
  - The handoff protocol work on `claude/genesis-handoff-protocol-5hzaqj` was done
    from a Linux container with no `X:` mount. `X:\Genesis Exchange` was unreachable
    and `sync-project-genesis\tools\exchange.py` was not present, so no fingerprint
    was read and NO inbox event was written. Exchange context for that session was
    stale throughout.
  - One `update` event still needs writing from a host with `X:` mounted, carrying
    the commit SHA, changed files, and checks run. Content is in the session handoff.
  - Nothing in this repo can confirm the protocol text matches
    `01-rules\COORDINATION.md` or `01-rules\MODEL-ROUTING.md`. It was written from
    the task brief and existing repo docs only. It needs a read against those rules
    before it is treated as reconciled.

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
