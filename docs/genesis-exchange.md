# Genesis Exchange protocol

`X:\Genesis Exchange` is the cross-agent coordination source for Project Genesis. This repository remains the authority for website code, detailed plans, tests, and Git history.

## Required fresh read

For every substantial website task, read these directly in order:

1. `X:\Genesis Exchange\START-HERE.md`
2. `X:\Genesis Exchange\JACOB-NOW.md`
3. `X:\Genesis Exchange\CURRENT.md`
4. `X:\Genesis Exchange\01-rules\COORDINATION.md`
5. `X:\Genesis Exchange\01-rules\MODEL-ROUTING.md`
6. `X:\Genesis Exchange\20-workstreams\website.md`
7. Every unresolved or newer relevant note in `X:\Genesis Exchange\10-inbox`

Run the deterministic status helper after reading:

```powershell
py -3.11 "X:\sync-project-genesis\tools\exchange.py" status
```

Record the observed UTC time and fingerprint in the task's working notes. A fingerprint describes the local Exchange replica only; it does not prove another machine or idle agent has read it.

## Checkpoints

Re-read or run `status` again:

- when Jacob changes direction;
- before a dependent implementation wave;
- before accepting generated or delegated work;
- before final acceptance, handoff, merge, or publication;
- after a sync conflict or any unexpected Exchange change.

Before a high-impact shared action, compare the previously observed fingerprint:

```powershell
py -3.11 "X:\sync-project-genesis\tools\exchange.py" check --expect <FINGERPRINT>
```

Exit code 2 means the context must be reread and reconciled. Exit code 0 is not publication permission and does not prove remote synchronization.

## Writing updates correctly

Website agents do not rewrite the entire Exchange. Create a new collision-resistant inbox record with the supplied helper; do not edit another worker's event or append to a shared log.

Use `change` when recording Jacob's new direction:

```powershell
py -3.11 "X:\sync-project-genesis\tools\exchange.py" record --kind change --actor <SESSION-ID> --scope website --source "Jacob, <conversation and UTC time>" --note "<request, affected scope, and work made stale>" --expect <FINGERPRINT>
```

Use `update` after a checkpoint or handoff:

```powershell
py -3.11 "X:\sync-project-genesis\tools\exchange.py" record --kind update --actor <SESSION-ID> --scope website --source "<repository path, branch, and task>" --note "<final commit, changed paths, verification, deployment state, rollback point, and coordinator action>" --expect <FINGERPRINT>
```

Only the designated Genesis coordinator reconciles inbox events into `CURRENT.md`, shared workstream cards, decisions, and evidence. A website update should tell the coordinator exactly which shared pointers are stale, without duplicating repository documentation.

If the Exchange cannot be written, preserve the same fields in the final handoff and say explicitly that Genesis has not yet been updated.

## Repository closeout order

1. Verify the implementation.
2. Update `docs/STATUS.md` last.
3. Commit the repository checkpoint.
4. Recheck Exchange freshness.
5. Write the unique Exchange update using the final commit ID.
6. If publishing, verify the live site and write a second update if the deployment result changes the recorded state.

