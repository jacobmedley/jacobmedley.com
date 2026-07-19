# Hero/Results Parity Restoration — Report

**Repo:** jacobmedley.com · **Branch:** `refactor/react-migration` · **Commit:** `4ac7bdd`
**Date:** 2026-07-11

## Problem

An earlier pass at porting the homepage hero from the legacy static site into React had merged a separate results/metrics banner directly into the hero component (`HeroSection.tsx`), changing the headline from "Hello, I'm Jacob Medley." to "Designing for Results" and cramming a 4-metric grid into the hero's fixed-height (90vh/100vh) container. The live legacy site keeps these as two distinct sections.

## Root-cause finding

While diagnosing, I found the task's assumed source file (`components/section-results.html`) is **not referenced anywhere in the legacy homepage** (`_archive/index.html`) — it's an orphaned partial containing unrelated DentalPlans case-study content ("The Numbers" / "show-me-the-money", different metric values, a testimonial paragraph). It's dead code, not the real results banner.

The actual homepage banner that had been merged into the hero is an **inline, un-id'd** `<section class="bg-prime-light">` block at `_archive/index.html:116-170` — heading "Designing for Results", 4 metrics (47%/20%/27%/66%: New Sales, Company Revenue, Lead Generation, Reduction Project Timelines). This matches exactly what had been duplicated into the hero's metrics array, confirming it as the true source.

I flagged this discrepancy and confirmed with the user before proceeding: port the real inline banner (not `section-results.html`), and give the new component's wrapper `id="results"` (legacy had no id/anchor for it at all — nav's "results" class actually points to `#visual-design`).

## Changes made

1. **`components/sections/HeroSection.tsx`** — reverted to a 1:1 port of legacy `components/section-hi.html`: h1 restored to "Hello, I'm Jacob Medley.", spacing reverted (`py-4`→`py-3`, `mt-6`/`mb-6`→`mt-4`/`mb-4`), entire metrics column deleted.
2. **`components/sections/ResultsSection.tsx`** (new) — ports the real inline banner from `_archive/index.html:116-170`, using the established Bootstrap→Tailwind rename conventions already in the codebase (`justify-content-center`→`justify-center`, `align-self-center`→`self-center`, `w-50`→`w-1/2`).
3. **`app/page.tsx`** — inserted `<div id="results"><ResultsSection /></div>` between the `#hi` hero section and `#work`.

## Verification

- `npx tsc --noEmit` — passed clean, no type errors.
- `npm run dev` (Turbopack) — restarted cleanly, homepage returns HTTP 200. Confirmed via raw HTML fetch: `<h1>` reads "Hello, I'm Jacob Medley.", `<h2>` reads "UX/UI Designer & Digital Strategist", results section renders with `id="results"` and heading "Designing for Results".
- `npm run build` (production/static export via webpack) — **could not be verified.** It hangs indefinitely right after the Next.js CLI banner, before compilation starts (idle threads, zero CPU movement — a genuine deadlock). I isolated this as a **pre-existing environment issue, unrelated to these code changes**: confirmed by stashing the edits and re-running the build against unmodified code, which hung identically. Ruled out as causes: a zombie build process holding a lock, stale `.next/cache`, Next telemetry, and the command sandbox. Root cause still unknown — worth checking the `@next/swc-*` native binary or AV real-time-scan locking next.

## Side finding

While debugging the build hang, the already-running dev server started returning HTTP 500 for the homepage — caused by `.next` state getting corrupted from running a production build and the dev server concurrently against the same output directory. A clean dev-server restart fixed it. Noted for next time: don't run `next build` while `next dev` is live against the same `.next` folder.

## Status

Committed by the user directly (`4ac7bdd`, not by me — I held off pending their confirmation since the build-verification gate couldn't be fully satisfied). The `next build` hang remains open and should be investigated separately before the next production/Vercel deploy.
