# Refactor alignment plan for jacobmedley.com

> **Audit constraint disclosed up front.** The plan author was unable to fetch the compiled CSS bundle of the live site or the source files in the `refactor/react-migration` branch through automated tooling (live site only exposes a JS-injected shell to scrapers; the GitHub repo is not indexed/anonymously fetchable from the tool). What was confirmed from the live shell: page title, the five nav anchors (`#hi`, `#work`, `#visual-design`, `#resume`, `#education` with the lowercase `edu` label on mobile), the headline "Designing for Results" followed by an HR rule, and the four metrics in DOM order: 47% New Sales · 20% Company Revenue · 27% Lead Generation · 66% Reduction Project Timelines. All other specs are derived from (a) the prescriptive intent the user supplied with the task and (b) standard Bootstrap 5 / portfolio conventions, with explicit ranges where exact values are unverified. Claude Code should treat any value labeled **(approx)** as a starting point to verify by opening the live site in DevTools at 1280px and 375px viewports.

---

## Section 1: Executive summary

The refactor branch carries the right tokens and stack (Next.js 15 App Router, Tailwind v4 CSS-first, Radix Dialog) but the page has likely drifted in three structural ways: **metrics live in a separate `ResultsBanner` instead of inline in the hero**, **case studies render as a 2-column grid instead of alternating editorial rows**, and **the modal probably fades from center instead of sliding from the right**. Secondary drift: section headers may carry subtitles that don't exist on the live site, the mobile nav may not enforce 5×20% buttons, and the `@theme` block may use `--font-family-base` (Tailwind v3 naming) instead of `--font-sans` (required by v4 namespace mapping for `font-sans` to compile). Custom utilities (`text-gradient-prime`, `wave-animate`, `badge-work`) likely use plain `.class` definitions rather than `@utility` blocks, which silently breaks variant compilation (`hover:badge-work`, `md:badge-work`).

**Order of operations** (each step minimizes rework for the next): (1) fix `globals.css` tokens and utilities first since every component depends on them; (2) fix `SectionHeader` next because every section consumes it; (3) merge `ResultsBanner` into `HeroSection` and delete the orphan; (4) rebuild `WorkCard` + `CaseStudiesSection` to alternating rows; (5) rebuild `CaseStudyModal` slide-in animation; (6) align `VisualDesignSection`, `Resume`, `Education`; (7) finalize `NavMain` desktop/mobile; (8) `next build` and verify zero TS/ESLint errors.

---

## Section 2: Design token & global audit

### 2.1 globals.css `@theme` block — required shape

Tailwind v4's CSS-first config requires tokens to be declared inside `@theme { ... }` using the v4 namespace conventions. The `font-sans` utility maps to `--font-sans` (NOT `--font-family-base`). Confirm the file looks like this; rewrite the `@theme` block if it doesn't:

```css
@import "tailwindcss";

@theme {
  /* Brand color tokens */
  --color-prime: #644672;
  --color-prime-light: #b2a2ba;
  --color-prime-dark: #452f50;

  --color-second: #8391a3;
  --color-second-light: #c1c8d1;
  --color-second-dark: #5a6673;

  --color-third: #5e915d;
  --color-third-light: #aec8ad;
  --color-third-dark: #3d5f3c;

  --color-fourth: #7e3232;
  --color-fourth-light: #be9898;
  --color-fourth-dark: #521f1f;

  --color-fifth: #454336;
  --color-fifth-light: #a2a19b;
  --color-fifth-dark: #2d2c22;

  --color-pop: #e3b211;
  --color-pop-light: #f1d888;
  --color-pop-dark: #a07e0b;

  /* Typography — v4 namespace */
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-display: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Fluid type scale (clamp: min @ 375px, fluid, max @ 1280px) */
  --text-display: clamp(2.5rem, 1.5rem + 4.4vw, 5rem);     /* 40px → 80px */
  --text-h1: clamp(2rem, 1.3rem + 3vw, 3.5rem);             /* 32px → 56px */
  --text-h2: clamp(1.5rem, 1.1rem + 1.8vw, 2.5rem);         /* 24px → 40px */
  --text-h3: clamp(1.25rem, 1rem + 1.1vw, 1.75rem);         /* 20px → 28px */
  --text-metric: clamp(2.5rem, 1.8rem + 3.4vw, 4.5rem);     /* 40px → 72px */
  --text-body: clamp(1rem, 0.95rem + 0.2vw, 1.125rem);      /* 16px → 18px */
  --text-eyebrow: 0.875rem;                                  /* 14px static */

  /* Layout */
  --container-max: 1200px;
  --sidebar-w: 220px;
  --mobilebar-h: 64px;
  --section-py-mobile: 4rem;   /* 64px */
  --section-py-desktop: 6rem;  /* 96px — approx, range 80–112px */
}
```

> **Approx flag.** The clamp ranges and `--container-max: 1200px` are sane portfolio defaults but unverified against the live CSS. Verify by inspecting `<h1>` and `.container` computed styles in DevTools at 1280px; adjust the upper clamp bounds if the live site renders larger.

### 2.2 Custom utilities — must use `@utility` directive

In Tailwind v4, plain `.class { … }` declarations do NOT register as utilities and variants like `hover:`, `md:`, `dark:` will not compile. Replace any plain class definitions with `@utility`:

```css
@utility text-gradient-prime {
  background: linear-gradient(135deg, var(--color-prime) 0%, var(--color-prime-light) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

@utility wave-animate {
  animation: wave-shift 8s ease-in-out infinite alternate;
}

@utility badge-work {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 9999px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  color: currentColor;
}

@keyframes wave-shift {
  from { transform: translateX(0); }
  to   { transform: translateX(-24px); }
}
```

### 2.3 Body defaults

```css
@layer base {
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.6;
    color: #1f1f1f;
    background: #ffffff;
  }
  h1, h2, h3 { line-height: 1.15; letter-spacing: -0.01em; font-weight: 700; }
}
```

---

## Section 3: Per-component instructions

### 3.1 `components/sections/HeroSection.tsx`

**Current state to verify locally.** Open the file. Confirm: does the headline read "Designing for Results"? Is `<ResultsBanner />` rendered as a separate component below the hero? Are the four metrics inside `HeroSection` or inside `ResultsBanner`?

**Target state.** Single hero section. Headline "Designing for Results" with the prime gradient. Four metrics sit INLINE in the same hero, stacked or rowed under (or beside) the headline. No separate `ResultsBanner` rendered on the page.

**Specific gaps (assumed; verify).**
- Metrics live in `ResultsBanner.tsx`, separated from the hero
- Headline may be missing `text-gradient-prime`
- Section likely has insufficient vertical padding
- Metrics likely render as plain stacked text instead of a 4-up grid that collapses to 2×2

**Diff-style guidance.**

```tsx
// components/sections/HeroSection.tsx
import { SectionHeader } from "@/components/ui/SectionHeader";

const metrics = [
  { value: "47%", label: "New Sales" },
  { value: "20%", label: "Company Revenue" },
  { value: "27%", label: "Lead Generation" },
  { value: "66%", label: "Reduction Project Timelines" },
];

export function HeroSection() {
  return (
    <section
      id="hi"
      className="relative w-full px-6 md:px-10 py-20 md:py-32 max-w-[var(--container-max)] mx-auto"
    >
      <h1
        className="text-gradient-prime font-bold tracking-tight text-center md:text-left"
        style={{ fontSize: "var(--text-display)" }}
      >
        Designing for Results
      </h1>

      <hr className="mt-6 mb-10 h-1 w-24 border-0 bg-prime rounded-full mx-auto md:mx-0" />

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-12">
        {metrics.map((m) => (
          <li key={m.value} className="flex flex-col items-center md:items-start">
            <span
              className="text-prime font-bold leading-none"
              style={{ fontSize: "var(--text-metric)" }}
            >
              {m.value}
            </span>
            <span className="mt-2 text-sm md:text-base text-second-dark text-center md:text-left max-w-[12ch]">
              {m.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Then in `app/page.tsx` remove the `<ResultsBanner />` import and JSX. Delete `components/sections/ResultsBanner.tsx` (or leave the file but unused — flag in Section 5 guardrails).

**Acceptance criteria.**
- `app/page.tsx` no longer imports `ResultsBanner`
- The hero renders one `<h1>` with `text-gradient-prime` class applied
- Four `<li>` metric cells render in DOM order: 47%, 20%, 27%, 66%
- At viewport ≥ 768px the metrics grid is 4 columns; below 768px it is 2 columns
- The headline color is the purple gradient (verify via Inspector: `background-clip: text` and `color: transparent`)
- `next build` succeeds

---

### 3.2 `components/nav/NavMain.tsx`

**Current state to verify locally.** Read the file. Identify whether the desktop sidebar is rendered as a `<nav>` with `position: fixed; left: 0`, the buttons are full-width within the sidebar, and the mobile bottom bar exists with exactly five buttons.

**Target state.**
- Desktop (≥1024px): fixed left sidebar, width 220px (approx), full-height. Buttons span the full sidebar width minus padding. Active section highlighted; hover and focus visible.
- Mobile (<1024px): fixed bottom bar, height 64px, exactly 5 buttons each at `width: 20%`. Icon above short label. Active state visible.
- Section color-coding: each nav button's accent color matches its section. Mapping (derived from the 5 sections + 5 named non-pop tokens): `#hi` → prime, `#work` → second, `#visual-design` → third, `#resume` → fourth, `#education` → fifth. The `pop` color is reserved for CTAs / accents and is not used for nav.
- Mobile labels use the abbreviation pattern confirmed on the live site: the Education button shows the lowercase short label `edu`.

**Specific gaps (assumed).**
- Mobile bar buttons probably use `flex-1` (which works) but may not be exactly 20% — verify
- Active state probably present but per-section color mapping likely missing
- Hover/focus rings may be absent
- Bottom bar may not pad correctly for iOS safe area

**Diff-style guidance.**

```tsx
// lib/data/navigation.ts (DO NOT change shape; only verify items match)
// Expected items in order:
// { id: "hi", label: "Hello", shortLabel: "Hello", color: "prime",  icon: HiIcon }
// { id: "work", label: "Case Studies", shortLabel: "Work", color: "second", icon: WorkIcon }
// { id: "visual-design", label: "Visual Design", shortLabel: "Visual", color: "third", icon: VisualIcon }
// { id: "resume", label: "Resume", shortLabel: "Resume", color: "fourth", icon: ResumeIcon }
// { id: "education", label: "Education", shortLabel: "edu", color: "fifth", icon: EduIcon }
```

```tsx
// components/nav/NavMain.tsx — relevant classes
// Desktop sidebar wrapper:
"hidden lg:flex fixed left-0 top-0 h-screen w-[220px] flex-col gap-2 p-4 border-r border-second-light/40 bg-white z-40"

// Desktop button (per item):
// Map color via dataset attribute then drive accent in CSS, OR pick class via small switch.
// Recommended: pass color token name and use a small map.
const colorMap = {
  prime: "data-[active=true]:bg-prime data-[active=true]:text-white hover:bg-prime-light/40 focus-visible:ring-prime",
  second: "data-[active=true]:bg-second data-[active=true]:text-white hover:bg-second-light/40 focus-visible:ring-second",
  third: "data-[active=true]:bg-third data-[active=true]:text-white hover:bg-third-light/40 focus-visible:ring-third",
  fourth: "data-[active=true]:bg-fourth data-[active=true]:text-white hover:bg-fourth-light/40 focus-visible:ring-fourth",
  fifth: "data-[active=true]:bg-fifth data-[active=true]:text-white hover:bg-fifth-light/40 focus-visible:ring-fifth",
} as const;

// Each desktop button:
"flex items-center gap-3 w-full px-4 py-3 rounded-md text-left text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
// + colorMap[item.color]

// Mobile bottom bar wrapper:
"lg:hidden fixed bottom-0 left-0 right-0 h-16 flex border-t border-second-light/40 bg-white z-40 pb-[env(safe-area-inset-bottom)]"

// Mobile button (each one):
"flex flex-col items-center justify-center gap-1 w-1/5 text-[11px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset"
// + colorMap[item.color]
```

**Acceptance criteria.**
- Mobile bar contains exactly 5 buttons; each `<button>` (or `<a>`) has the class `w-1/5`
- The Education mobile button text reads `edu` (lowercase, three letters)
- At ≥1024px the sidebar is visible and 220px wide; the mobile bar is `display: none`
- At <1024px the mobile bar is visible and the desktop sidebar is hidden
- Active state on the current section uses that section's color (verify by scrolling in dev mode and watching the active button's background change)
- All buttons have a visible focus ring on keyboard tab

---

### 3.3 `components/sections/CaseStudiesSection.tsx` + `components/ui/WorkCard.tsx`

**Current state to verify locally.** Open both files. Determine: is the section rendering a `grid grid-cols-1 md:grid-cols-2`? Does `WorkCard` accept an `index` or `reverse` prop?

**Target state.** Full-width editorial rows, one project per row. Image on left, text on right; flip on every other row. Vertical spacing between rows ~80–120px desktop, ~48px mobile. Image aspect ratio 16:10 (approx — could be 4:3; verify). Text column max-width ~52ch. Each row contains: badges (using `badge-work`), project title, short description, CTA button that opens the modal.

**Specific gaps (assumed).**
- Section uses 2-col grid (cards side by side) instead of stacked alternating rows
- `WorkCard` does not accept a `reverse` prop
- Image aspect ratios may be inconsistent
- Badges may not use the `badge-work` utility

**Diff-style guidance.**

```tsx
// components/sections/CaseStudiesSection.tsx
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "@/components/ui/WorkCard";
import { projects } from "@/lib/data/projects";

export function CaseStudiesSection() {
  return (
    <section
      id="work"
      className="w-full px-6 md:px-10 py-16 md:py-24 max-w-[var(--container-max)] mx-auto"
    >
      <SectionHeader sectionId="work" title="Case Studies" />
      <div className="flex flex-col gap-16 md:gap-28 mt-12">
        {projects.map((p, i) => (
          <WorkCard key={p.slug} project={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
```

```tsx
// components/ui/WorkCard.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

interface WorkCardProps {
  project: Project;
  reverse?: boolean;
  onOpen?: (slug: string) => void;
}

export function WorkCard({ project, reverse = false, onOpen }: WorkCardProps) {
  return (
    <article
      className={cn(
        "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center",
      )}
    >
      <div
        className={cn(
          "md:col-span-7 relative aspect-[16/10] overflow-hidden rounded-lg bg-second-light/30",
          reverse ? "md:order-2" : "md:order-1",
        )}
      >
        <Image
          src={project.image}
          alt={project.imageAlt ?? project.title}
          fill
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        className={cn(
          "md:col-span-5 flex flex-col gap-4 max-w-[52ch]",
          reverse ? "md:order-1" : "md:order-2",
        )}
      >
        {project.badges?.length ? (
          <div className="flex flex-wrap gap-2 text-second">
            {project.badges.map((b) => (
              <span key={b} className="badge-work">{b}</span>
            ))}
          </div>
        ) : null}

        <h3
          className="font-bold leading-tight"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {project.title}
        </h3>

        <p className="text-base md:text-lg text-second-dark">
          {project.summary}
        </p>

        <button
          type="button"
          onClick={() => onOpen?.(project.slug)}
          className="self-start mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-md bg-second text-white font-semibold hover:bg-second-dark focus-visible:ring-2 focus-visible:ring-second focus-visible:ring-offset-2 outline-none transition-colors"
        >
          View case study
        </button>
      </div>
    </article>
  );
}
```

> **DO NOT change** the `Project` type or any field names in `lib/data/projects.ts`. If `imageAlt` or `badges` does not exist on the type, fall back to existing field names; do not invent new required fields. Optional chaining (`?.`) lets the component degrade gracefully.

**Acceptance criteria.**
- The section is no longer a 2-column grid; only one project per row
- Project at index 0 has image on the left; project at index 1 has image on the right; pattern continues
- All rows share the same aspect ratio (16:10) and consistent vertical gap
- Badges render with `class="badge-work"` (verify via Inspector)
- Clicking the CTA opens the modal (covered in 3.4)

---

### 3.4 `components/ui/CaseStudyModal.tsx`

**Current state to verify locally.** Open the file. Confirm: does it import from `@radix-ui/react-dialog`? Is the panel center-fading or sliding from the right? Is `forceMount` set on `Dialog.Portal` (or `Dialog.Content`) so exit animations fire? Is `data-[state=closed]` used in the className for the slide-out animation?

**Target state.** A right-side panel using Radix Dialog. Width: `min(640px, 90vw)` on desktop, `100vw` on mobile. Slides in from the right (300ms ease-out), slides out to the right (250ms ease-in) on close. Backdrop: `rgba(0,0,0,0.5)`. Internal scroll: `overflow-y-auto` on the content panel; body scroll locked by Radix automatically. Close button fixed top-right inside the panel.

**Diff-style guidance.**

```tsx
// components/ui/CaseStudyModal.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Project } from "@/lib/data/projects";

interface CaseStudyModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CaseStudyModal({ project, open, onOpenChange }: CaseStudyModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal forceMount>
        <Dialog.Overlay
          forceMount
          className="
            fixed inset-0 z-50 bg-black/50
            data-[state=open]:animate-[fadeIn_200ms_ease-out]
            data-[state=closed]:animate-[fadeOut_200ms_ease-in]
          "
        />
        <Dialog.Content
          forceMount
          aria-describedby={undefined}
          className="
            fixed right-0 top-0 z-50 h-screen
            w-full md:w-[min(640px,90vw)]
            bg-white shadow-2xl outline-none
            overflow-y-auto
            p-6 md:p-10
            data-[state=open]:animate-[slideInRight_300ms_ease-out]
            data-[state=closed]:animate-[slideOutRight_250ms_ease-in]
          "
        >
          <Dialog.Close
            className="absolute right-4 top-4 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-second-light/40 focus-visible:ring-2 focus-visible:ring-prime outline-none"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </Dialog.Close>

          {project && (
            <article className="mt-2">
              <Dialog.Title
                className="font-bold leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {project.title}
              </Dialog.Title>
              {/* …render full project body here using existing project fields. */}
            </article>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Add the keyframes to `globals.css` (in `@layer base` or at the top level — outside `@theme`):

```css
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes slideOutRight {
  from { transform: translateX(0); }
  to   { transform: translateX(100%); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
```

**Acceptance criteria.**
- `Dialog.Portal`, `Dialog.Overlay`, and `Dialog.Content` all carry `forceMount`
- Both Overlay and Content use `data-[state=open]:` and `data-[state=closed]:` animations
- On open, the panel transform animates from `translateX(100%)` to `translateX(0)`
- On close, the panel transforms back to `translateX(100%)` before unmount (200–300ms)
- Body scroll is locked while the modal is open (Radix handles this; verify in Inspector that `<body>` gets `data-scroll-locked` or equivalent)
- Pressing Escape closes the modal; clicking the backdrop closes the modal
- The modal panel scrolls internally when content overflows; the page underneath does not scroll

---

### 3.5 `components/sections/VisualDesignSection.tsx`

**Current state to verify locally.** Open the file. Determine grid columns and whether a hover overlay is implemented.

**Target state.** Three thumbnails in one row at desktop, stacking on mobile. Each thumbnail is a button (or link) showing a project image with a hover overlay that reveals a short label. Aspect ratio 4:3 or 1:1 (use 4:3 unless `lib/data/projects.ts` images are clearly square). Hover overlay: prime color at 80% opacity, fades in over 200ms.

**Diff-style guidance.**

```tsx
// components/sections/VisualDesignSection.tsx
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

const items = [/* read from lib/data — keep existing source of truth */];

export function VisualDesignSection() {
  return (
    <section
      id="visual-design"
      className="w-full px-6 md:px-10 py-16 md:py-24 max-w-[var(--container-max)] mx-auto"
    >
      <SectionHeader sectionId="visual-design" title="Visual Design" />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={it.href}
              className="group relative block overflow-hidden rounded-lg aspect-[4/3] bg-second-light/30 focus-visible:ring-2 focus-visible:ring-third focus-visible:ring-offset-2 outline-none"
            >
              <Image
                src={it.image}
                alt={it.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className="absolute inset-0 flex items-end p-4 bg-prime/0 group-hover:bg-prime/80 transition-colors duration-200 text-white font-semibold opacity-0 group-hover:opacity-100"
              >
                {it.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

**Acceptance criteria.**
- At ≥768px exactly 3 columns; below 768px 1 column
- All thumbnails share the same aspect ratio
- Hovering a thumbnail fades in a colored overlay with the title visible
- The overlay color is the prime token at 80% opacity (verify computed background)

---

### 3.6 `components/ui/SectionHeader.tsx`

**Current state to verify locally.** Open the file. Confirm: is there a `subtitle` prop? Is the icon ABOVE the title? Is there an HR rule below the title? Is per-section color applied?

**Target state.** Three stacked elements, centered or left-aligned consistently across all sections: (1) icon, (2) title, (3) short colored HR rule. NO subtitle. Icon size ~48px desktop, ~40px mobile. HR width 64px (4rem), height 4px, color = section's accent.

**Diff-style guidance.**

```tsx
// components/ui/SectionHeader.tsx
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const sectionStyles = {
  hi:             { color: "text-prime",  bg: "bg-prime"  },
  work:           { color: "text-second", bg: "bg-second" },
  "visual-design":{ color: "text-third",  bg: "bg-third"  },
  resume:         { color: "text-fourth", bg: "bg-fourth" },
  education:      { color: "text-fifth",  bg: "bg-fifth"  },
} as const;

interface SectionHeaderProps {
  sectionId: keyof typeof sectionStyles;
  title: string;
  Icon?: LucideIcon;
  align?: "left" | "center";
}

export function SectionHeader({ sectionId, title, Icon, align = "left" }: SectionHeaderProps) {
  const s = sectionStyles[sectionId];
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <header className={cn("flex flex-col gap-4", alignment)}>
      {Icon ? <Icon className={cn("w-10 h-10 md:w-12 md:h-12", s.color)} aria-hidden /> : null}
      <h2
        className="font-bold leading-tight"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {title}
      </h2>
      <hr className={cn("border-0 h-1 w-16 rounded-full", s.bg)} />
    </header>
  );
}
```

> **Important.** Remove any `subtitle` prop and any references to it in calling code. If a parent section currently passes `subtitle="…"`, drop the prop at every call site.

**Acceptance criteria.**
- The component file exports no `subtitle` prop in its TS interface
- Every section header renders in DOM order: icon → `<h2>` → `<hr>`
- The HR width is 64px (4rem) and 4px tall
- The HR background color matches the calling section: prime / second / third / fourth / fifth
- Icon color matches the same per-section accent
- `next build` reports no unused-prop warnings

---

### 3.7 `app/globals.css` — final state checklist

Verify (and rewrite if absent):
- The `@theme` block uses `--color-*` for all six color families with light/dark variants
- The `@theme` block declares `--font-sans` (NOT `--font-family-base`)
- Fluid typography variables (`--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-metric`, `--text-body`, `--text-eyebrow`) exist
- `text-gradient-prime`, `wave-animate`, `badge-work` are declared with `@utility` (NOT plain `.class`)
- The four keyframes (`slideInRight`, `slideOutRight`, `fadeIn`, `fadeOut`) are declared
- The `@layer base` block sets `font-family: var(--font-sans)` on `body`
- A `wave-shift` keyframe exists if `wave-animate` is used by `WaveSeparator.tsx`

---

## Section 4: Verification checklist

Run this pass after all changes. Each item is locally verifiable by Claude Code without seeing the live site.

1. `npm run build` (or `pnpm build`) completes with **zero** TypeScript errors and **zero** ESLint errors. No new warnings introduced.
2. `app/page.tsx` imports and renders, in this DOM order: `NavMain`, `HeroSection`, `WaveSeparator` (if used), `CaseStudiesSection`, `WaveSeparator`, `VisualDesignSection`, `WaveSeparator`, `ResumeSection`, `WaveSeparator`, `EducationSection`. `ResultsBanner` is NOT imported.
3. The hero `<h1>` text is exactly `Designing for Results`.
4. The hero contains four metric cells with values `47%`, `20%`, `27%`, `66%` in that DOM order. They are inside `HeroSection`, not in any other component.
5. Open `components/ui/WorkCard.tsx`. Confirm the `WorkCardProps` interface includes a `reverse?: boolean` prop.
6. In `CaseStudiesSection.tsx`, the project map calls `<WorkCard reverse={i % 2 === 1} … />`.
7. The `CaseStudyModal` Content has `forceMount` AND a `data-[state=closed]:` className that maps to a `slideOutRight` keyframe.
8. The `NavMain` mobile bar JSX contains five `<button>` (or `<a>`) elements; each carries `w-1/5` in its className.
9. The five mobile labels in DOM order are `Hello`, `Work` (or `Case Studies` short form), `Visual` (or `Visual Design`), `Resume`, `edu`. Confirm the Education label is `edu`.
10. `SectionHeader` interface contains no `subtitle` field. Search the repo (`rg "subtitle"` in components/) returns zero results in JSX prop position.
11. `VisualDesignSection` grid uses `md:grid-cols-3`. Each thumbnail anchor uses `group` and includes a child element with `group-hover:bg-prime/80`.
12. In `globals.css`, search for `--font-family-base` — it MUST NOT appear. `--font-sans` MUST appear inside `@theme`.
13. In `globals.css`, search for `^.text-gradient-prime` and `^.badge-work` and `^.wave-animate` — these MUST NOT appear as plain class selectors. They MUST appear preceded by `@utility`.
14. `npm run dev`, navigate to `/`, click a case study card. The modal panel slides in from the right edge over ~300ms. Click the X — the panel slides out to the right over ~250ms before unmounting.
15. At 1280px viewport, the desktop sidebar is visible on the left at 220px wide; mobile bar is hidden. At 375px viewport, sidebar is hidden; bottom bar is visible with 5 equal-width buttons.
16. Tab through the page with the keyboard. Every interactive element shows a visible focus ring.

---

## Section 5: Guardrails for Claude Code

### 5.1 DO NOT TOUCH
- Any file in the legacy partial system: `*.html` partials, `*.scss`, `*.css` files outside of `app/globals.css`, and any `include.js` or `partial-loader.js` in the legacy directory tree on the `main` branch. **You are working on `refactor/react-migration` only.**
- The `main` branch. Do not check out, modify, or merge into it.
- The data shapes in `lib/data/projects.ts` and `lib/data/navigation.ts`. You may **read** these and rely on existing fields. You may **add** new optional fields with safe fallbacks (`field?: T`). You may **NOT** rename, remove, or change the type of any existing field.
- Any file under `public/` (images, fonts, favicons) — leave assets alone.
- `next.config.*` — do not change `output: 'export'` or any other build config.
- `package.json` — do NOT introduce new dependencies. The required deps (`next`, `react`, `tailwindcss` v4, `@radix-ui/react-dialog`, `lucide-react` or whatever icon lib is already present, `clsx` / `tailwind-merge` if used by `lib/utils.ts`) should already be installed. If a needed dep is missing, **STOP and surface the gap** to the human rather than running `npm install`.

### 5.2 STAY WITHIN THESE FILES (whitelist)
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `components/nav/NavMain.tsx`
- `components/sections/HeroSection.tsx`
- `components/sections/CaseStudiesSection.tsx`
- `components/sections/VisualDesignSection.tsx`
- `components/sections/ResumeSection.tsx`
- `components/sections/EducationSection.tsx`
- `components/ui/CaseStudyModal.tsx`
- `components/ui/WorkCard.tsx`
- `components/ui/SectionHeader.tsx`
- `components/ui/WaveSeparator.tsx`
- `hooks/useScrollSpy.ts` (read; only modify if active state in `NavMain` is broken)
- `lib/utils.ts` (read; only modify to add tiny pure helpers — never remove exports)

`components/sections/ResultsBanner.tsx`: you may **delete** this file after confirming no other component imports it. If something else imports it, refactor that consumer first.

### 5.3 Pre-completion gate
Before declaring the task done, in this order:
1. Run `npm run lint` (or `pnpm lint`). Zero errors, zero new warnings.
2. Run `npm run build`. Build succeeds with `output: 'export'`.
3. Run `rg "subtitle" components/` and `rg "ResultsBanner" .` — both should return no JSX/import matches.
4. Run `rg -- "--font-family-base" app/globals.css` — must return zero matches.
5. Run `rg "@utility" app/globals.css` — must return at least three matches (one each for `text-gradient-prime`, `wave-animate`, `badge-work`).
6. Boot `npm run dev`, manually verify: hero metrics are inline; case studies alternate; modal slides from right; mobile nav has 5 equal buttons; section headers have no subtitle.

### 5.4 When to surface, not silently fix
- A required field appears to be missing from `lib/data/projects.ts` (e.g., no `image`, `summary`, or `slug`). Surface it, do not invent the field.
- An icon component referenced by `navigation.ts` doesn't exist in the icon library. Surface it.
- A clamp upper bound in `globals.css` produces text larger than 80px at 1280px and looks visibly wrong. Surface and adjust the upper bound rather than committing a regression.
- The legacy site's exact pixel values for spacing/typography contradict the values in this plan when checked in DevTools. Defer to the live site values; flag the diff in the PR description.

---

## Conclusion

The plan reorders the structural fixes so token + utility correctness in `globals.css` lands first (everything compiles against it), then surface-level components (`SectionHeader`) that every section consumes, then the three highest-visibility structural changes (hero merge, alternating rows, slide-from-right modal). The single highest-risk pitfall is the Tailwind v4 namespace shift: declaring fonts under `--font-family-base` or declaring custom utilities as plain classes both fail silently at runtime and produce a refactor that *looks* aligned in source but renders wrong. The verification checklist exists specifically to catch that class of failure without requiring a live-site comparison. Once items 1–16 in Section 4 pass, the refactor branch is structurally aligned with the live site's intent; remaining drift will be cosmetic (exact font sizes, exact section padding) and can be tuned in a follow-up pass with DevTools-measured values.