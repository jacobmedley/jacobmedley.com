# JacobMedley.com agent instructions

These instructions apply to every AI agent working in any checkout or worktree of this repository.

## Start and finish

1. Read `docs/STATUS.md` first and write it last.
2. Read `docs/working-agreement.md` before inspecting, editing, building, or publishing the site.
3. Follow `docs/genesis-exchange.md` for every substantial task, changed direction, checkpoint, handoff, merge, or publication.
4. Read the relevant content authorities before changing copy: `docs/copy-register.md`, `docs/jacob-style.md`, `docs/voice-and-tone.md`, and `docs/data-reporting.md`.
5. End with the worktree state, branch and commit, files changed, verification actually run, running previews, deployment state, rollback point, and unresolved work.

## Authority and ownership

- Jacob's latest applicable direct instruction governs the work he is directing.
- This Git repository owns website source, implementation history, tests, and detailed acceptance evidence.
- `X:\Genesis Exchange` owns shared Project Genesis direction, workstream ownership, decisions, and cross-agent handoffs. Do not duplicate the full website plan there.
- Agent role follows the task's authorization and available tools, not the product name. A read-only/advisory task does not authorize writes. A requested implementation or deployment may be performed by a capable agent after it checks the lock and repository state.
- Preserve unrelated work, other worktrees, existing ownership markers, and external workstream boundaries.

## Safe implementation

- Check `.tree-lock` before any write. If another session owns it, stop overlapping writes and report the holder. Never remove another session's lock without Jacob's explicit direction.
- Treat a dirty tree, unexpected branch/commit, overlapping writer, or out-of-scope path as a structural stop.
- Use a separate Git worktree for genuine concurrent implementation.
- Never kill a process by port alone. Confirm its PID, full command line, and repository path first.
- Do not read or copy private source data into this public repository.
- Pushes to `main` deploy immediately. Merging or pushing to `main` must be explicitly requested and requires the pre-publish and post-deploy checks in `docs/working-agreement.md`.

## Genesis Exchange requirement

- At substantial task intake, and again before dependent changes, acceptance, handoff, merge, or publication, freshly read the Exchange entry point and relevant current records. Do not rely on a previous conversation or an old fingerprint.
- Record Jacob's changed direction as a unique `change` inbox event. Record completed checkpoints, final commit IDs, verification, deployment state, and rollback references as a unique `update` inbox event.
- Website workers write append-only inbox records. Only the designated Genesis coordinator edits `CURRENT.md`, `01-rules`, shared `20-workstreams` cards, or `30-decisions`.
- If the Exchange is unavailable or read-only, state the stale-context limitation and provide a complete handoff for a connected coordinator. Never claim that other agents were updated merely because a repository file changed.

