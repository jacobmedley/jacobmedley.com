# Genesis Exchange

How this repository talks to Project Genesis.

`AGENTS.md` states the protocol. This file is the procedure behind its section 5.
Read both. Where this file is silent, `AGENTS.md` governs.

---

## 1. What the Exchange is, and what it is not

**Location:** `X:\Genesis Exchange`

The Exchange is the shared authority for Project Genesis: direction, ownership,
decisions, priorities, and handoffs across every workstream, of which this website is
one. It is not a mirror of this repo and it is not a backup of it.

This repository is the authority for website source and for detailed implementation
records: what the code does, what the copy says, which commit shipped, what was
verified and how.

| Question | Answered by |
|---|---|
| What does the site say, and where is that in the source? | this repo |
| Which commit shipped it, and what verified it? | this repo |
| What are we working on next, and why? | the Exchange |
| Who owns this, and has it been decided? | the Exchange |
| Did Jacob change direction? | the Exchange |

Neither authority overrides the other outside its own scope. Inside the Exchange's
scope the Exchange wins, and a repo record that disagrees with it is stale. Record the
discrepancy in an `update` event rather than choosing a side.

---

## 2. What to read

At intake, read enough to know what the project currently wants:

- `X:\Genesis Exchange\START-HERE.md`
- `X:\Genesis Exchange\JACOB-NOW.md`
- `X:\Genesis Exchange\CURRENT.md`
- `X:\Genesis Exchange\01-rules\COORDINATION.md`
- `X:\Genesis Exchange\01-rules\MODEL-ROUTING.md`
- `X:\Genesis Exchange\20-workstreams\website.md`
- Any unresolved note in `X:\Genesis Exchange\10-inbox` that touches the website

`01-rules\` is shared policy and outranks anything in this repository on Genesis
direction, coordination, and routing. This repo's `docs/working-agreement.md` section
14 carries a website-local model routing table. Where the two differ,
`01-rules\MODEL-ROUTING.md` is authoritative and the local table is the stale copy.

---

## 3. The helper

Exchange status and append-only records go through the prescribed helper. Do not read
or write Exchange state by hand when the helper covers it.

```
py -3.11 "X:\sync-project-genesis\tools\exchange.py" status
py -3.11 "X:\sync-project-genesis\tools\exchange.py" check --expect <FINGERPRINT>
py -3.11 "X:\sync-project-genesis\tools\exchange.py" record ...
```

- `status` reports current Exchange state and gives you the fingerprint. Run it at
  intake and capture the fingerprint in your notes and your handoff report.
- `check --expect <FINGERPRINT>` tells you whether the Exchange has moved since the
  fingerprint you hold. Run it at every re-read point in section 4. A changed
  fingerprint means re-read before you act, not after.
- `record` appends an inbox event. Append-only: it adds, it never replaces.

Take the exact `record` arguments from the helper's own `--help` output at the time you
run it. Do not copy an argument list out of a prompt or a transcript, and do not guess
one. If the arguments you were handed do not match the helper, the prompt is stale, not
the helper.

The helper runs from a Windows host with `X:` mounted. It is not reachable from a Linux
container or a remote session with no access to that drive. See section 7.

---

## 4. Re-read at five points

The Exchange is re-read, and the fingerprint re-checked, at each of these:

1. **Task intake.** Before planning anything.
2. **Before a dependent change.** Any edit that rests on a Genesis decision,
   ownership call, or priority.
3. **Before acceptance.** Before you call your own work done.
4. **Before handoff.** Before you write the closing records and report.
5. **Before publishing.** Before any merge to `main`, deploy, or anything else that
   reaches an audience.

A single read at the start of a long task is not compliance with this. Direction moves
mid-task, and the fingerprint is how you find out.

---

## 5. What this repository records, and how

Two event types. Both append-only. Both written once.

### `change` events

One per change of direction from Jacob. A `change` event captures that the direction
moved and what it moved to. It does not restate history, does not summarise the
project, and does not bundle two decisions into one record.

Write it when you learn the direction changed, not at the end of the task.

### `update` events

Checkpoints, final commits, verification results, deployment state, and rollback
references. The closing `update` for a task carries:

- Final commit SHA
- Files changed
- Verification actually performed, with evidence
- Deployment state, and the rollback reference if anything shipped
- Coordinator action required, if any

### Uniqueness

Every event is unique. Before writing one, confirm the same event is not already in
`10-inbox`. Re-running a task, resuming a session, or retrying after a failed command
are all cases where the same record gets written twice. A duplicate is not harmless:
the coordinator reconciles inbox records by hand, and two copies of one checkpoint read
as two checkpoints.

---

## 6. Boundaries

**Never rewrite the entire Exchange from a website worktree.** This repository is one
workstream. A bulk write from here overwrites the state of workstreams this session
knows nothing about. Append inbox events; that is the whole of the write surface
available from here.

**Only the designated Genesis coordinator reconciles.** Turning inbox records into
`CURRENT.md`, shared workstream cards, decisions, and evidence is the coordinator's
job. Unless you are the designated coordinator for this task, do not edit:

- `CURRENT.md`
- anything in `01-rules\`
- shared workstream cards in `20-workstreams\`
- decision and evidence records

Not editing them is not a lack of initiative. The inbox exists so that agents can
report without racing each other for the same file, and the coordinator exists so that
reconciliation happens once, by someone holding the whole picture.

If you believe a shared record is wrong, say so in an `update` event and flag
coordinator action required. Then leave it alone.

---

## 7. When the Exchange is unreachable

Sessions run from hosts without `X:` mounted, including Linux containers and remote
web sessions. Losing Exchange access is expected, not exceptional. It is handled by
reporting, never by working around it.

When `status` cannot run or `X:\Genesis Exchange` cannot be read:

1. **Say so in the first report you write.** Do not bury it at the end.
2. **Declare the context stale.** Name what you actually read and when. If you read
   nothing, say you read nothing. Direction you were given in a prompt is a prompt, not
   an Exchange read, and gets labelled that way.
3. **Do not claim the Exchange was updated.** No inbox event was written. Say that in
   those words.
4. **Hand off the records that still need writing.** Give the complete content of each
   `change` and `update` event that would have been written, ready for someone with
   access to run through the helper. A handoff is a file write to a known path or a
   report, not an intention.
5. **Name what could not be verified because of it.** Work done against stale direction
   is provisional until someone re-reads the Exchange and confirms it.

Repository work does not stop because the Exchange is unreachable. Only the claim that
the Exchange was consulted or updated stops. A missing record is recoverable by writing
it later. A false record corrupts the shared authority for every workstream, and
nothing in this repo can detect it.
