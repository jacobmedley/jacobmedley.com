# jacobmedley.com

Personal site and portfolio. Next.js, statically exported, deployed to SiteGround by
FTP on every push to `main`.

The repo is public and `main` deploys to the live site immediately, with no dry run and
no staging.

## For agents

**Read `AGENTS.md` first.** It is the handoff protocol every session follows, whatever
the tool. In short: read `docs/STATUS.md` first, check `.tree-lock` before writing,
stay inside your task's scope, and update `docs/STATUS.md` last.

This repository is the authority for website source and detailed implementation
records. Project Genesis direction, ownership, decisions, and handoffs live in the
shared Exchange at `X:\Genesis Exchange`, and `docs/genesis-exchange.md` covers how the
two fit together.

## Documentation

| File | Covers |
|---|---|
| `AGENTS.md` | the handoff protocol, for every agent and every tool |
| `CLAUDE.md` | Claude Code specifics, on top of `AGENTS.md` |
| `docs/STATUS.md` | volatile state: versions, owners, what is open |
| `docs/genesis-exchange.md` | Project Genesis coordination and the Exchange |
| `docs/working-agreement.md` | repo mechanics: roles, lock, ports, processes, private data, deploy |
| `docs/copy-register.md` | every piece of written copy, as numbered B edits with a status |
| `docs/jacob-style.md` | mechanics, prohibitions, anti-AI patterns |
| `docs/voice-and-tone.md` | register, personality, reusable lines |
| `docs/data-reporting.md` | how every figure is framed and checked |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm run lint
```

Port assignments and the static preview procedure are in `docs/working-agreement.md`
section 6. Deploy and post-deploy cache verification are in section 10.
