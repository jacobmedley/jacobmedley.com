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

### Naming rule, RESOLVED

Former employers may be named when the reference is positive. Internal
detail, colleague names, and business condition stay barred regardless of
employer or era. Employment history always names employers. Case studies
name them only when the reference is positive and nothing barred rides
along.

Confirmed by Jacob, Aug 22. Recorded in copy-register as B17. Not open.

Note: `docs/case-studies-sanitized.md` currently anonymizes every study.
Under this rule some could name their employer. Available, not required. No
change scheduled.

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

SiteGround runs an edge cache in front of the site. A cache-bypassed fetch or a
Playwright load reads origin, so both can confirm a deploy that visitors are not
yet seeing. Verification that only checks origin is incomplete.

After any deploy, check the cache state:

```
curl -sI https://jacobmedley.com/ | grep -i "x-proxy-cache\|last-modified"
```

X-Proxy-Cache: HIT with a Last-Modified older than the deploy means visitors are
on stale content. Purge via Site Tools, Speed, Caching, Dynamic Cache, then
re-verify and confirm MISS with a matching Last-Modified.

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

### Read first, write last

Every session opens by reading docs/STATUS.md and closes by updating it. A
session that starts with current state does not ask what version anything is
on. One that ends by writing state does not leave rulings stranded in a
transcript.

Handoffs are file writes to a known path, not prose pasted between chats.
A handoff says what changed, what is open, and who owns it. Reasoning goes
in the register, once.

Every re-raised decision in this project was made in conversation and
written nowhere, or written somewhere nobody re-read.

---

## 12. Advisors author prose. They do not author implementation.

Every factual error that reached a live page in this project came from an
advisor asserting something about repository state it could not read.

The record, one session:

- Proposed tag values absent from the type union. Twice.
- Claimed a file "already references dental procedures." It contained zero.
- Ran an adjective audit that missed a collision. Three times.
- Re-sent amendments already applied and marked APPLIED.
- Produced two derived figures from a headcount that was wrong.
- Reported a live production bug inferred from a framework pattern, never read
  the lines. The code was correct.
- Counted a type declaration as a data entry and reported the wrong item count.
- Built FIND anchors from the register instead of the file. Twice.

None were caught by care. Every one was caught by someone opening a file.

### What an advisor produces

Prose. Arguments. Structure. Voice corrections. Reasoning about what should be
said and why.

### What an advisor never produces

FIND strings or replacement anchors. Line numbers. File paths. Tag values,
weights, or any other enum. Status flags. Commit hashes. Counts of anything in
a file.

Any claim about what a file currently contains. If an advisor needs to
reference existing copy, it quotes what it was handed and says where the quote
came from.

### Deliverable format for advisors

Advisors do not supply FIND anchors. They supply:

  LOCATE: a prose description of the text to change, e.g. "the sentence in the
          DentalPlans entry beginning 'I pioneered a design system'"
  REPLACE WITH: the new text, verbatim

Whoever holds file access builds the anchor by reading the file. Register text
goes stale as earlier edits move it, so an anchor authored from the register is
authored against a file that may no longer exist in that form.

This supersedes any earlier instruction asking an advisor for exact FIND
strings. That instruction was the error, and it produced at least one anchor
mismatch.

### Cheap status check

`docs/copy-register.md` carries a status header. An advisor reads it before
proposing anything. If a proposal already exists as a numbered edit marked
APPLIED, the advisor reports that instead of resending.

### A figure needs a source and a method

A figure applies when it arrives with a source and a method. A figure with
neither is a claim, not data, and does not publish.

---

## 13. If there is smoke there is fire

A defect is evidence of a class of defect. It is almost never the only
instance.

The record, same session. Each left-hand item was reported as a single problem:

| Found | The class actually held |
|---|---|
| One named colleague in published copy | Two more |
| One repeated word in a bullet set | Two more |
| One em dash | Eleven across two files |
| One wrong figure in a bullet | The same figure wrong in a metric label |
| One wrong number in the register | A second number derived from it |

Five for five. Not once was an instance isolated.

### The rule

When a defect is found, the next action is a sweep of its class. Not a fix of
the instance. The fix comes after the sweep and covers everything it found.

### Sweeping properly

Scope the sweep to the defect type, not the wording that surfaced it. A rule
against repeated adjectives fails on repeated nouns and participles, so the
sweep checks every content word.

Report every instance at once. Serial reporting costs a round trip each and
makes the total invisible.

Search the whole class of file, not the file where it was noticed.

State the sweep result explicitly, including when it comes back empty.
"Checked the class, found only this one" is a finding. Silence is not.

---

## 14. Model routing

Match effort to blast radius. Most work is Sonnet Medium.

| Model | Use for |
|---|---|
| Qwen, local | sweeps, greps, inventories. Mechanical, verifiable by inspection, no judgment. |
| Code Sonnet Medium | single-file LOCATE and REPLACE, verification runs, commits. The default. |
| Code Sonnet High | multi-file edits, rebases, anything with conflict risk |
| Code Opus High | merges to main, deploys, and any prompt that could ship a factual error to a live page |
| Chat Sonnet | status checks, routine advisory where nothing is contested |
| Opus | anchor construction against files it can read, factual claims, defect-class judgment |

Recalibrated against real work: the Health-E figure corrections should have
been Opus High, since they shipped a wrong number live. The portfolio rebase
should have been Sonnet High. Doc cleanup and register housekeeping were
correctly Sonnet Medium.

Also: .tree-lock in Section 2 has never been used. Two parallel sessions
edited this tree mid-task on Aug 29 and it happened to be harmless. Claim
the lock before writing.
