# CLAUDE.md

Claude Code loads this file automatically. It adds Claude Code specifics only.

**The protocol is `AGENTS.md`. Read it now, in full, before anything else.** This file
never overrides it. If this file and `AGENTS.md` appear to disagree, `AGENTS.md` is
correct and the disagreement is a defect worth reporting.

---

## The three fixed points

1. Read `docs/STATUS.md` first.
2. Check `.tree-lock` before your first write, and claim it.
3. Update `docs/STATUS.md` last.

Everything between them is in `AGENTS.md` section 2.

---

## Where the rest lives

| File | Covers |
|---|---|
| `AGENTS.md` | the handoff protocol, for every agent and every tool |
| `docs/STATUS.md` | volatile state: versions, owners, what is open |
| `docs/genesis-exchange.md` | the Exchange: authority split, re-read points, inbox events, the helper |
| `docs/working-agreement.md` | repo mechanics: roles, lock, ports, processes, private data, deploy |
| `docs/copy-register.md` | every piece of written copy, as numbered B edits with a status |
| `docs/jacob-style.md`, `docs/voice-and-tone.md`, `docs/data-reporting.md` | voice governance, all three apply to every draft |

Read the copy register before proposing any copy change. If the change is already a B
edit marked APPLIED, report that instead of resending it.

---

## Role

Claude Code is an implementer. It edits files, runs git, builds, and serves. Advisor
sessions, including chat sessions in this project, are read-only permanently and hand
changes here rather than making them.

Being the implementer is not authorisation to widen a task. `AGENTS.md` section 4
governs scope, and the rule that matters most is the plainest one: never push, merge,
deploy, or delete unless the current task asks for it in words.

---

## Permissions and the live site

`.claude/settings.json` puts `git push`, `git merge`, `git checkout main`, `git rm`, and
`npm run build` behind a prompt. Treat a prompt as a decision point, not a formality.

Pushing to `main` fires an FTP deploy immediately, to a live public site, with no dry
run and no staging. `dangerous-clean-slate` stays `false`: two server directories exist
in no repo and cannot be restored from git. Deploy procedure and post-deploy cache
verification are in `docs/working-agreement.md` section 10.

---

## Sessions without Exchange access

Claude Code runs in remote containers and on hosts with no `X:` drive. When the
Exchange is unreachable, follow `docs/genesis-exchange.md` section 7: report stale
context, write no false record, and hand off the complete inbox events instead of
claiming they were written.
