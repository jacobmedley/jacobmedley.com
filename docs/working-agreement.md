# Working Agreement

Governs every AI session touching `C:\dev\jacobmedley.com`.

Multiple sessions run against this repo at once: this chat, a resume chat, a design
system chat, ChatGPT, and one or more Claude Code terminals. The repo is PUBLIC and
`main` deploys to a live site on push, with no dry run.

Read this before doing anything.

---

## 1. Two roles

**ADVISOR.** Read-only, permanently. No unlock exists.

Advisors read files, propose changes, write prompts, and verify reports. They never
edit, never run git write operations, never build, never start or stop a service.

This chat is an advisor. So is the resume chat, the design system chat, and ChatGPT.

**IMPLEMENTER.** Write access, one session at a time.

Claude Code is the implementer. It edits files, runs git, builds, and serves.

An advisor that finds itself about to write a file has misread its role. Stop and
hand the change to the implementer instead.

---

## 2. The tree lock

Only one implementer session may hold the working tree. The claim is a file, not a
conversation, so it survives session boundaries and is visible at a glance.

**Claim before any write:**
```powershell
"$env:COMPUTERNAME | $(Get-Date -Format o) | <session label>" | Set-Content .tree-lock
```

**Check before any write:**
```powershell
if (Test-Path .tree-lock) { Get-Content .tree-lock }
```

If the lock exists and names another session, report the holder and refuse to write.
Do not remove another session's lock without Jacob saying so.

**Release when finished:**
```powershell
Remove-Item .tree-lock
```

`.tree-lock` is gitignored.

**For genuine concurrent work, use a worktree rather than sharing one:**
```
git worktree add ../jacobmedley-b -b feat/whatever main
```
Separate directory, separate `.next`, shared history, no collision.

---

## 3. Verify before claiming

Any statement about the codebase gets a file read attached to it, or it is stated
plainly as a guess.

This binds advisors and implementers equally.

Real examples from one session:
- An advisor reported 16 studies in a data file after counting a type declaration as
  an entry.
- An advisor reported a live production bug inferred from a general Bootstrap
  pattern. Reading the actual lines showed the code was correct.
- An implementer reported using a tool it had not used, in a report that was
  otherwise accurate.

All three dissolved on a file read. None would have been caught by confidence.

---

## 4. Failure policy, split by kind

**Structural violation: HARD STOP.**
Wrong branch, unexpected commit hash, dirty tree, scope breach, a file outside the
declared set appearing in the diff. Stop, report, change nothing.

**Content mismatch: log and continue.**
A FIND anchor matching zero or two-plus times. Log the edit ID and the actual count,
skip it, move to the next, and report every skip at the end.

Uniform hard-stop wastes unattended runs on one bad anchor. Uniform continue lets
wrong edits through. The split matters.

**Never guess at a replacement anchor.** A skipped edit is recoverable. A wrong edit
applied confidently is not.

---

## 5. Copy has one source of truth

`docs/copy-register.md` holds every piece of written copy, as numbered B edits with
a status.

Copy is authored there first, then implemented. Prompts reference an edit by ID and
carry no replacement text of their own. **If a prompt contains copy that is not in
the register, the prompt is wrong, not the register.**

Before proposing any copy change, read the register. If the proposal already exists
as a B edit marked APPLIED, do not resend it. Report that it is already done.

Voice governance lives in three files, all of which apply to every draft:
- `docs/jacob-style.md`: mechanics, prohibitions, anti-AI patterns
- `docs/voice-and-tone.md`: register, personality, the moves, reusable lines
- `docs/data-reporting.md`: how every figure is framed and checked

---

## 6. Ports

| Port | Owner |
|---|---|
| 3000 | jacobmedley.com, Next dev |
| 5173 | thescaleoffreedom.com, Vite |
| 8080 | OpenWebUI |
| 8090 | jacobmedley.com, static preview |
| 11434 | Ollama |

Serve the static preview from **inside** `out/` on **8090**. Not 8080; OpenWebUI
owns it. Serving from outside `out/` makes every image 404.

---

## 7. Processes

**Never kill a process by port alone.** Identify the PID, the full command line, and
the repository path first.

```powershell
Get-CimInstance Win32_Process -Filter "Name='node.exe' OR Name='python.exe'" |
  Select-Object ProcessId, @{n='Cmd';e={$_.CommandLine}} | Format-List
```

Bash `ps` does not see these on Windows. `Get-Process` alone shows the executable
path, not the working directory, so a dev server for a different repo looks identical
to one for this repo.

A Vite server on 5173 belongs to a different project. It is not yours to stop.

Reuse a correct running server rather than starting a duplicate.

**On EBUSY:** confirm no build or preview process owns the directory, then close any
Explorer window pointed into it. Deleting `.next` or `out` is a later remedy, not the
first one. CI builds fresh on every push, so a local export lock never blocks
production.

---

## 8. Local models

Call `ollama_running_models` or `ollama ps` before any local model work. Ollama
serializes model loads, so starting a query while OpenWebUI holds a model causes a
swap and a stall.

Do not stop OpenWebUI or Ollama without Jacob's approval.

Local models draft. An advisor reviews. The implementer runs. Never let a local model
touch copy, factual claims, or anything shipping to the live site.

---

## 9. Private data

`C:\dev\_private\jacobmedley-source-data\` holds unscrubbed business data including
personal names. It is outside the repo deliberately.

Never open, read, print, or copy anything from it into this repo, a prompt, or a
report. File names and sizes only, and only when asked.

The repo is public. Once something reaches git history, deleting it later does not
remove it.

---

## 10. Deploy

Push to `main` fires an FTP deploy immediately. No dry run, no staging.

`dangerous-clean-slate` must remain `false`. Two directories on the server exist in
no repo and cannot be restored from git: `musings/`, a live WordPress install whose
database is captured only by a SiteGround snapshot, and
`interaction-design-concepts/`.

Verify both return a live response after any deploy. `musings/` should return 200.
`interaction-design-concepts/` returns 403 at its root, which is correct: the folder
exists with no index file and directory listing is off. Check a known deep URL
instead.

Merging to `main` is always an explicit decision, never a step inside a larger task.

---

## 11. Handoff report

Every session ends by reporting:

- Working tree state, and whether the lock is held or released
- Current branch and commit hash
- Running services, with ports
- Files changed
- B edit numbers applied or skipped
- Verification actually performed, with observable evidence rather than confidence
- Blockers and anything left unverified

State what was requested, what passed, what failed, what was improved beyond the
request, and what remains unverified. Keep those separate.
