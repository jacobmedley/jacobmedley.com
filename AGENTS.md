# Agent Protocol

**Every agent working in this repository reads this file before doing anything else.**

It applies to all tools and all sessions: Claude Code, Codex, ChatGPT, a local model,
a human running commands by hand. Tool-specific notes live in `CLAUDE.md`. Repository
mechanics live in `docs/working-agreement.md`. Exchange mechanics live in
`docs/genesis-exchange.md`. This file is the protocol those three hang off, and none of
them override it.

---

## 1. Two authorities

Neither authority is a copy of the other. Each is the last word inside its own scope.

| Authority | Last word on | Location |
|---|---|---|
| This Git repository | Website source, implementation records, copy rulings, verification evidence, commit history | the repo you are in |
| Project Genesis Exchange | Genesis direction, ownership, cross-workstream decisions, priorities, handoffs | `X:\Genesis Exchange` |

**Resolving the two.** A question about what the site says or how it was built is
answered by the repo. A question about what to work on, who owns it, or what Jacob
decided is answered by the Exchange. If the repo and the Exchange disagree inside the
Exchange's scope, the Exchange wins and the repo record is stale. Record the
discrepancy; do not quietly pick a side.

The Exchange is not optional context. An agent that has not read it is working from
whatever it was told in a prompt, which is exactly the failure this project keeps
paying for.

---

## 2. Order of operations

Read in this order, work, then write in this order. The first read and the last write
are fixed points.

**Opening**

1. Read `docs/STATUS.md`. First, always. It is volatile state and tells you what
   version everything is on.
2. Read `docs/working-agreement.md` and this file.
3. Read the Exchange at intake, per `docs/genesis-exchange.md`. Capture the fingerprint.
4. Check `.tree-lock`. If it names another session, stop and report the holder.
5. Claim `.tree-lock` before your first write.

**Closing**

6. Verify what you changed, with observable evidence.
7. Write the Exchange inbox `update` event: final commit SHA, changed files,
   verification, deployment state, rollback reference, coordinator action required.
8. Update `docs/STATUS.md`. Last, always.
9. Release `.tree-lock` and report per section 7 below.

Steps 1 and 8 are the ones that get skipped, and skipping them is what strands rulings
in a transcript nobody re-reads.

---

## 3. The tree lock

Only one session holds the working tree at a time. The claim is a file so it survives
session boundaries.

Check before any write:

```powershell
if (Test-Path .tree-lock) { Get-Content .tree-lock }   # Windows
```
```bash
[ -f .tree-lock ] && cat .tree-lock                    # macOS, Linux, containers
```

Claim it:

```powershell
"$env:COMPUTERNAME | $(Get-Date -Format o) | <session label>" | Set-Content .tree-lock
```
```bash
printf '%s | %s | %s\n' "$(hostname)" "$(date -Is)" "<session label>" > .tree-lock
```

Release it when finished. `.tree-lock` is gitignored and never committed.

If the lock names another session, report the holder and refuse to write. Do not remove
another session's lock without Jacob saying so. For genuine parallel work, take a
worktree instead of sharing the tree.

Full rationale in `docs/working-agreement.md` section 2.

---

## 4. Preserve unrelated work and ownership

You own what you were asked to change. Nothing else.

- Do not touch files outside the declared scope of your task. A file appearing in the
  diff that you did not intend is a structural violation: stop, report, change nothing.
- Do not revert, reformat, tidy, or "fix" another session's work in passing. Unrelated
  work in the tree belongs to whoever put it there.
- Do not resolve someone else's open item because you noticed it. Record it and leave it.
- Uncommitted changes you did not make are somebody's work in progress. Preserve them.
- Never push, merge, deploy, or delete unless the current task asks for it in words.
  Merging to `main` deploys to a live site with no dry run and is always an explicit
  decision, never a step inside a larger task.

Review your complete diff before committing. Every file in it should be one you can
name a reason for.

---

## 5. The Exchange, in brief

The full procedure is `docs/genesis-exchange.md`. The parts no agent may get wrong:

**Re-read the Exchange at five points.** Task intake. Before any change that depends on
a Genesis decision. Before acceptance. Before handoff. Before publishing. Direction
changes between the start of a task and the end of it, and a stale read is how work
gets done against a decision that was already reversed.

**Two event types, both append-only, both unique.**

| Event | Records |
|---|---|
| `change` | Jacob's changed direction, one event per change |
| `update` | Checkpoints, final commits, verification, deployment state, rollback references |

Write each event once. A repeated event is noise the coordinator has to reconcile by
hand.

**Two things you may not do.** Never rewrite the whole Exchange from a website worktree.
Only the designated Genesis coordinator reconciles inbox records into `CURRENT.md`,
shared workstream cards, decisions, and evidence. From here you append inbox events and
nothing else.

**If the Exchange is unreachable,** say so plainly, name the last fingerprint you
actually saw, report your context as stale, and hand off the exact records that still
need writing. Never report the Exchange as updated when it was not. A missed record is
recoverable. A false one corrupts the shared authority for everybody.

---

## 6. Verify before claiming

Any statement about the codebase arrives with a file read attached, or it is labelled a
guess. This binds every agent regardless of role or confidence.

A defect is evidence of a class of defect. When you find one, sweep the class before
fixing the instance, then fix everything the sweep found and report the count, including
when it comes back empty.

---

## 7. Handoff report

Every session ends by reporting, separately and without merging them:

- Worktree path and state, and whether the lock is held or released
- Branch and commit hash
- Exchange fingerprint at last read, and whether the Exchange was reachable
- Files changed
- Checks run, with observable evidence rather than confidence
- Coordinator action required, if any
- Anything unresolved, unverified, or blocked

State what was requested, what passed, what failed, what was improved beyond the
request, and what remains unverified. Keep those five apart.
