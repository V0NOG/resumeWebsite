# Animations, Polish & New Projects — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add kinetic animations, Lenis smooth scroll, subtle UI sounds, improved text contrast, LinkedIn/GitHub link fixes, and 3 new projects to the portfolio site.

**Architecture:** Pure CSS keyframes + CSS nth-child stagger for card cascade; Lenis client component for smooth scroll; Web Audio API via React context for sounds; all animation classes in globals.css. Zero new deps except `lenis`.

**Tech Stack:** Next.js 16 (static export), Tailwind v4 (CSS-first, `@theme {}`), Lenis v1, Web Audio API

**Important codebase facts:**
- Tailwind v4: config is in `src/app/globals.css` via `@theme {}` — NO `tailwind.config.ts`
- `"use client"` required for any component using hooks or browser APIs
- Static export: `output: "export"` in `next.config.ts` — no server-side APIs
- Build: `npm run build` — no test suite, verify by running dev server `npm run dev`
- Fonts: `--font-display` (Playfair Display) and `--font-sans` (Inter) set in globals.css `@theme {}`
- Body background: `#0a0a0f` with dot-grid overlay

---

### Task 1: Content Fixes & New Projects

**Files:**
- Modify: `src/components/cards/ContactBar.tsx` (line 60)
- Modify: `src/data/projects.ts` (githubUrl fields + 3 new projects)
- Modify: `src/app/page.tsx` (projectLayouts — add 3 slots for new projects)

**Context:** LinkedIn URL is a placeholder, trading-bot and osint GitHub links point to the profile root, and there are 3 new public repos to showcase. `page.tsx` has a `projectLayouts` array with 5 entries — adding 3 projects requires 3 more layout entries.

- [ ] **Step 1: Fix LinkedIn URL in ContactBar.tsx**

In `src/components/cards/ContactBar.tsx` line 60, replace:
```tsx
href="https://linkedin.com/in/YOUR_LINKEDIN_SLUG"
```
With:
```tsx
href="https://www.linkedin.com/in/connor-drainas-a3a306173/"
```

- [ ] **Step 2: Update GitHub URLs and add 3 new projects in projects.ts**

Replace the entire `src/data/projects.ts` with:

```ts
export type ProjectTag = { label: string; color: string; bg: string };
export type Project = {
  id: string;
  name: string;
  tags: ProjectTag[];
  description: string;
  detail: string;
  tech: string[];
  outcomes: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

const blue: Omit<ProjectTag, "label"> = { color: "text-blue-400", bg: "bg-blue-500/10" };
const purple: Omit<ProjectTag, "label"> = { color: "text-purple-400", bg: "bg-purple-500/10" };
const green: Omit<ProjectTag, "label"> = { color: "text-emerald-400", bg: "bg-emerald-500/10" };
const amber: Omit<ProjectTag, "label"> = { color: "text-amber-400", bg: "bg-amber-500/10" };

export const projects: Project[] = [
  {
    id: "trading-bot",
    name: "Crypto Trading Bot v2",
    tags: [{ label: "Python", ...blue }, { label: "Quantitative", ...purple }],
    description: "Professional-grade backtesting framework for intraday crypto strategies. Zero external dependencies, anti-overfitting design.",
    detail: "Built a full backtesting engine from scratch in Python with RSI + Bollinger Band mean reversion strategy. Implements walk-forward validation, fixed-fractional risk sizing (1% per trade), daily loss limits, and realistic fee/slippage modelling. Train/val/test split is strictly time-ordered to prevent data snooping.",
    tech: ["Python", "NumPy", "Pandas", "RSI / Bollinger Bands", "Walk-forward validation", "Risk management"],
    outcomes: [
      "Zero external dependencies — fully self-contained Python implementation",
      "Anti-overfitting: strict train/val/test temporal split prevents data snooping",
      "1% fixed-fractional risk per trade with daily loss limits and fee/slippage modelling",
      "Walk-forward validation reproduces live trading conditions during backtesting",
    ],
    githubUrl: "https://github.com/V0NOG/trading-bot-v2",
    featured: true,
  },
  {
    id: "oci-furniture",
    name: "OCI International Furniture",
    tags: [{ label: "React", ...blue }, { label: "Node.js", ...green }, { label: "Live", ...green }],
    description: "Production client website for an international furniture importer. Deployed on AWS.",
    detail: "Designed and delivered a full production website. Handles product catalogue, company information, and contact flows. Deployed on AWS Lightsail with DNS management via Route53.",
    tech: ["React", "Node.js", "MongoDB", "AWS Lightsail", "Route53", "Docker"],
    outcomes: [
      "Live production site serving real client traffic",
      "Full delivery: design through to deployment and ongoing support",
      "AWS Lightsail hosting with Route53 DNS management",
    ],
    liveUrl: "https://www.ocinternationalfurniture.com",
  },
  {
    id: "cura-commercial",
    name: "Cura Commercial",
    tags: [{ label: "React", ...blue }, { label: "Node.js", ...green }, { label: "Live", ...green }],
    description: "Production commercial services website. End-to-end delivery including hosting, DNS and support.",
    detail: "Built and deployed a professional website for a commercial services business. Full ownership from design brief to production deployment.",
    tech: ["React", "Node.js", "AWS", "Docker"],
    outcomes: [
      "Live commercial services website serving Australian B2B clients",
      "End-to-end ownership from client brief to live deployment",
      "Ongoing support and maintenance post-launch",
    ],
    liveUrl: "https://curacommercial.com.au",
  },
  {
    id: "jarvis",
    name: "Jarvis — AI Home Assistant",
    tags: [{ label: "Python", ...blue }, { label: "AI", ...purple }, { label: "Hardware", ...amber }],
    description: "Voice-activated personal AI assistant built to run on Raspberry Pi 5. Full-stack with Python backend, web frontend, and home automation integrations.",
    detail: "Built a full-stack AI assistant from the ground up, designed to run on a Raspberry Pi 5. Python backend handles voice recognition, intent parsing, and integration with home services. A lightweight web frontend provides a dashboard and settings UI. Supports custom commands, timers, smart device control, and extensible plugins.",
    tech: ["Python", "FastAPI", "WebSockets", "Voice recognition", "Raspberry Pi 5", "React"],
    outcomes: [
      "Runs on-device on Raspberry Pi 5 — no cloud dependency for core functions",
      "Full-stack: Python API backend + React web frontend dashboard",
      "Extensible plugin system for adding new home automation integrations",
      "Voice + web interface for dual control surface",
    ],
    githubUrl: "https://github.com/V0NOG/jarvis",
  },
  {
    id: "secure-chat",
    name: "Secure Chat v2",
    tags: [{ label: "Security", ...amber }, { label: "Full Stack", ...blue }],
    description: "End-to-end encrypted messaging application. Server has zero knowledge of message content.",
    detail: "Built a secure real-time chat application with end-to-end encryption. Messages are encrypted on the client before transmission — the server stores only ciphertext and has no access to plaintext content. Implements secure key exchange and real-time delivery.",
    tech: ["Encryption", "WebSockets", "Real-time messaging", "Key exchange"],
    outcomes: [
      "Server-side zero-knowledge: only ciphertext stored and transmitted",
      "End-to-end encryption with client-side key management",
      "Real-time message delivery via WebSockets",
    ],
    githubUrl: "https://github.com/V0NOG/secure-chat-v2",
  },
  {
    id: "saas-quotation",
    name: "SaaS Quotation Tool",
    tags: [{ label: "TypeScript", ...blue }, { label: "SaaS", ...purple }, { label: "React", ...green }],
    description: "Full-stack SaaS quotation tool. Generate, manage and send professional quotes. React + TypeScript frontend with API backend.",
    detail: "Built a full-stack SaaS product for service businesses to create and manage professional quotes. React + TypeScript frontend with Vite, backed by a REST API. Features include quote builder, line-item management, PDF export, and client management.",
    tech: ["React", "TypeScript", "Vite", "Node.js", "REST API"],
    outcomes: [
      "Complete quote lifecycle: create, edit, send, and track client quotes",
      "Fully typed TypeScript codebase front-to-back",
      "PDF export for client-ready quote delivery",
    ],
    githubUrl: "https://github.com/V0NOG/saasQuotation",
  },
  {
    id: "magireads",
    name: "MagiReads",
    tags: [{ label: "Next.js", ...blue }, { label: "Docker", ...green }, { label: "Scraping", ...purple }],
    description: "Manga reading platform with custom scraper API backend and full web UI.",
    detail: "Full-stack manga app with Next.js frontend and a custom scraper API. Containerised with Docker Compose. Includes authentication and user reading state.",
    tech: ["Next.js", "Node.js", "Custom scraper API", "Docker Compose", "MongoDB", "JWT auth"],
    outcomes: [
      "Custom scraper API serving content without relying on third-party services",
      "Full authentication system with per-user reading state",
      "Docker Compose deployment for consistent local and production environments",
    ],
    githubUrl: "https://github.com/V0NOG",
  },
  {
    id: "osint",
    name: "OSINT Toolkit",
    tags: [{ label: "Python", ...blue }, { label: "Security", ...amber }],
    description: "Open-source intelligence tools for security research. Built alongside cybersecurity coursework.",
    detail: "Collection of OSINT tooling for information gathering and reconnaissance. Developed alongside CS cybersecurity major at UoW and extended with personal pentesting research.",
    tech: ["Python", "OSINT frameworks", "Reconnaissance", "Data aggregation"],
    outcomes: [
      "Developed alongside UoW Bachelor of CS (Cybersecurity major) coursework",
      "Tools for passive reconnaissance and open-source information gathering",
      "Extended with personal pentesting research beyond academic requirements",
    ],
    githubUrl: "https://github.com/V0NOG/osint",
  },
  {
    id: "homelab",
    name: "Homelab Dashboard",
    tags: [{ label: "Next.js", ...blue }, { label: "Prisma", ...purple }, { label: "Docker", ...green }],
    description: "Personal homelab management dashboard. Next.js App Router, Prisma ORM, Dockerised.",
    detail: "Internal dashboard for managing homelab services. Next.js App Router, Prisma for data persistence, Tailwind CSS, Docker Compose. Includes authentication and multiple service integrations.",
    tech: ["Next.js App Router", "Prisma ORM", "PostgreSQL", "Docker Compose", "Tailwind CSS"],
    outcomes: [
      "Managing multiple Docker services from a single dashboard",
      "Prisma ORM with full type-safe data persistence layer",
      "Production-like setup mirroring enterprise infrastructure patterns",
    ],
    githubUrl: "https://github.com/V0NOG",
  },
];
```

- [ ] **Step 3: Add layout slots for new projects in page.tsx**

In `src/app/page.tsx`, replace the `projectLayouts` array:
```tsx
const projectLayouts: { colSpan: number; rowSpan: number }[] = [
  { colSpan: 5, rowSpan: 3 },
  { colSpan: 5, rowSpan: 3 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
];
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: clean build, 9 project routes listed under `/projects/[id]`.

- [ ] **Step 5: Commit**

```bash
git add src/components/cards/ContactBar.tsx src/data/projects.ts src/app/page.tsx
git commit -m "feat: fix LinkedIn/GitHub links and add jarvis, secure-chat, saas-quotation projects"
```

---

### Task 2: Text Contrast Improvements

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/cards/ContactBar.tsx`
- Modify: `src/components/cards/ProjectCard.tsx`
- Modify: `src/components/cards/ExperienceCard.tsx`
- Modify: `src/app/projects/[id]/page.tsx`

**Context:** Description text currently uses `text-neutral-600` (`#525252`) which is insufficient contrast on `#0a0a0f` background for older readers. Raising to `text-neutral-400` (`#a3a3a3`) achieves ~8:1 contrast ratio. Secondary labels use `text-neutral-500` — raise those to `text-neutral-400` too. Do NOT change tag colors, link colors, or intentionally muted decorative elements.

- [ ] **Step 1: Fix Hero.tsx**

In `src/components/Hero.tsx`, make these changes:

```tsx
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-8 md:px-16 max-w-7xl mx-auto">

      {/* Eyebrow */}
      <p className="flex items-center gap-4 mb-8 text-neutral-400 text-[10px] tracking-[3px] uppercase">
        <span className="w-8 h-px bg-neutral-700 block" />
        Available · Dual EU Citizen · Relocating Europe August 2026
      </p>

      {/* Editorial display type */}
      <h1 className="font-display font-black leading-[0.95] tracking-[-2px] mb-10"
           style={{ fontSize: "clamp(48px, 7.5vw, 110px)" }}>
        <span className="text-stroke block">FULL STACK</span>
        <span className="text-white block">SOFTWARE ENGINEER</span>
        <span className="text-stroke-blue block">+ CLOUD</span>
      </h1>

      {/* Sub-row */}
      <div className="flex flex-col md:flex-row gap-8 md:items-center">
        <p className="text-neutral-300 text-sm leading-relaxed border-l border-neutral-800 pl-5 max-w-xs">
          Connor Drainas — 6+ years shipping production SaaS across finance and custom
          product environments. React, Node.js, AWS, Docker.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#projects"
            className="text-[11px] font-semibold tracking-[1.5px] uppercase px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download="Connor_Drainas_Resume.pdf"
            className="text-[11px] tracking-[1.5px] uppercase text-neutral-400 hover:text-white transition-colors"
          >
            <span aria-hidden="true">↓ </span>Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Fix ContactBar.tsx subtitle and placeholders**

In `src/components/cards/ContactBar.tsx`:
- Line 40: `text-neutral-600` → `text-neutral-400`
- All `placeholder-neutral-600` → `placeholder-neutral-500`

Result at line 40:
```tsx
<p className="text-neutral-400 text-xs">
  Greek–Australian dual citizen · Full EU right to work · Relocating September 2026
</p>
```

And inputs:
```tsx
className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-500/50 col-span-1"
```

- [ ] **Step 3: Fix ProjectCard.tsx description**

In `src/components/cards/ProjectCard.tsx` line 35, change:
```tsx
<p className="text-neutral-400 text-xs leading-relaxed mb-3">{project.description}</p>
```
(was `text-neutral-600`)

- [ ] **Step 4: Fix ExperienceCard.tsx bullet text**

In `src/components/cards/ExperienceCard.tsx`, find the role bullet `<p>` element and change `text-neutral-600` → `text-neutral-400`.

- [ ] **Step 5: Fix project detail page**

In `src/app/projects/[id]/page.tsx`:
- Line 80: `text-neutral-500` → `text-neutral-400` on the detail paragraph
- Line 90: `text-neutral-500` → `text-neutral-400` on outcome list items

- [ ] **Step 6: Build and verify**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/components/Hero.tsx src/components/cards/ContactBar.tsx src/components/cards/ProjectCard.tsx src/components/cards/ExperienceCard.tsx 'src/app/projects/[id]/page.tsx'
git commit -m "fix: improve text contrast site-wide for accessibility"
```

---

### Task 3: Animation CSS Foundation

**Files:**
- Modify: `src/app/globals.css`

**Context:** Add all animation keyframes and utility classes to globals.css. Tailwind v4 uses CSS-first config — all custom CSS lives here. The `.bento-card` class already exists in globals.css — enhance its hover and add cascade animation. No JavaScript needed for these effects.

- [ ] **Step 1: Add keyframes and animation classes to globals.css**

Append to the end of `src/app/globals.css`:

```css
/* ── Hero entrance animation ── */
@keyframes heroWordIn {
  from { opacity: 0; transform: translateY(48px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-line {
  display: block;
  animation: heroWordIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* ── Bento card cascade ── */
@keyframes cascadeIn {
  from { opacity: 0; transform: translateX(-24px) scale(0.97); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}

/* Apply to every direct child of the grid */
.bento-grid > * {
  animation: cascadeIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.bento-grid > *:nth-child(1)  { animation-delay: 50ms; }
.bento-grid > *:nth-child(2)  { animation-delay: 120ms; }
.bento-grid > *:nth-child(3)  { animation-delay: 190ms; }
.bento-grid > *:nth-child(4)  { animation-delay: 260ms; }
.bento-grid > *:nth-child(5)  { animation-delay: 330ms; }
.bento-grid > *:nth-child(6)  { animation-delay: 400ms; }
.bento-grid > *:nth-child(7)  { animation-delay: 470ms; }
.bento-grid > *:nth-child(8)  { animation-delay: 540ms; }
.bento-grid > *:nth-child(9)  { animation-delay: 610ms; }
.bento-grid > *:nth-child(10) { animation-delay: 680ms; }
.bento-grid > *:nth-child(11) { animation-delay: 750ms; }
.bento-grid > *:nth-child(12) { animation-delay: 820ms; }

/* ── Bento card hover — scale lift + blue glow ── */
.bento-card {
  transition:
    transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.bento-card:hover {
  transform: scale(1.025) translateY(-4px);
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.25),
    0 24px 48px rgba(0, 0, 0, 0.45);
  border-color: rgba(59, 130, 246, 0.3);
}

/* ── Scroll reveal (used on project detail page) ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Nav link underline animation ── */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: white;
  transition: width 0.25s ease;
}

.nav-link:hover::after {
  width: 100%;
}
```

- [ ] **Step 2: Build to verify CSS is valid**

```bash
npm run build
```
Expected: clean build with no CSS errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add kinetic animation keyframes and hover effects to globals.css"
```

---

### Task 4: Hero Entrance Animation

**Files:**
- Modify: `src/components/Hero.tsx`

**Context:** The hero h1 has three `<span>` elements (one per line). Add the `hero-line` CSS class to each, with inline `animationDelay` increasing by 100ms per line. The eyebrow and sub-row also fade in after the h1. Hero.tsx is a server component — CSS classes and inline styles are sufficient, no "use client" needed.

- [ ] **Step 1: Update Hero.tsx with staggered line animations**

Replace the full content of `src/components/Hero.tsx`:

```tsx
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-8 md:px-16 max-w-7xl mx-auto">

      {/* Eyebrow */}
      <p
        className="flex items-center gap-4 mb-8 text-neutral-400 text-[10px] tracking-[3px] uppercase hero-line"
        style={{ animationDelay: "0ms" }}
      >
        <span className="w-8 h-px bg-neutral-700 block" />
        Available · Dual EU Citizen · Relocating Europe August 2026
      </p>

      {/* Editorial display type — Chiara Luzzana style */}
      <h1 className="font-display font-black leading-[0.95] tracking-[-2px] mb-10"
           style={{ fontSize: "clamp(48px, 7.5vw, 110px)" }}>
        <span className="text-stroke hero-line" style={{ animationDelay: "80ms" }}>FULL STACK</span>
        <span className="text-white hero-line" style={{ animationDelay: "200ms" }}>SOFTWARE ENGINEER</span>
        <span className="text-stroke-blue hero-line" style={{ animationDelay: "320ms" }}>+ CLOUD</span>
      </h1>

      {/* Sub-row */}
      <div
        className="flex flex-col md:flex-row gap-8 md:items-center hero-line"
        style={{ animationDelay: "480ms" }}
      >
        <p className="text-neutral-300 text-sm leading-relaxed border-l border-neutral-800 pl-5 max-w-xs">
          Connor Drainas — 6+ years shipping production SaaS across finance and custom
          product environments. React, Node.js, AWS, Docker.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#projects"
            className="text-[11px] font-semibold tracking-[1.5px] uppercase px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download="Connor_Drainas_Resume.pdf"
            className="text-[11px] tracking-[1.5px] uppercase text-neutral-400 hover:text-white transition-colors"
          >
            <span aria-hidden="true">↓ </span>Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build and check dev server**

```bash
npm run build && npm run dev
```
Open `http://localhost:3000`. Refresh — you should see the hero lines slide up staggered (eyebrow → FULL STACK → SOFTWARE ENGINEER → + CLOUD → sub-row).

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add kinetic staggered entrance animation to hero text"
```

---

### Task 5: Smooth Scroll with Lenis

**Files:**
- Create: `src/components/SmoothScroll.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Nav.tsx` (add `nav-link` class to links)

**Context:** Lenis provides buttery inertia scroll. It must run in a "use client" component. The component renders nothing — it's a pure side-effect component. The root layout is a server component but can import client components. Nav links get the `nav-link` class from Task 3's CSS for the underline hover effect.

- [ ] **Step 1: Install Lenis**

```bash
npm install lenis
```

- [ ] **Step 2: Create SmoothScroll.tsx**

Create `src/components/SmoothScroll.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
```

- [ ] **Step 3: Add SmoothScroll to layout.tsx**

In `src/app/layout.tsx`, import and add SmoothScroll:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Connor Drainas — Full-Stack Engineer",
  description:
    "Full-stack software engineer with 6+ years of production experience. React, Node.js, AWS, Docker. Dual EU citizen relocating to Europe September 2026.",
  keywords: ["software engineer", "full-stack", "React", "Node.js", "AWS", "EU", "Europe", "cloud"],
  openGraph: {
    title: "Connor Drainas — Full-Stack Engineer",
    description: "6+ years shipping production SaaS. Relocating EU Sept 2026.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Add nav-link class to Nav.tsx links**

In `src/components/Nav.tsx`, update the nav links to include `nav-link`:

```tsx
{links.map((link) => (
  <a
    key={link.href}
    href={link.href}
    className="nav-link py-1 text-[10px] font-medium tracking-[2px] uppercase text-neutral-400 hover:text-white transition-colors duration-200"
  >
    {link.label}
  </a>
))}
```

(Also changed `text-neutral-500` → `text-neutral-400` for contrast.)

- [ ] **Step 5: Build and verify smooth scroll**

```bash
npm run build
```

Start dev server and verify scroll is smooth/buttery and nav link underlines appear on hover.

- [ ] **Step 6: Commit**

```bash
git add src/components/SmoothScroll.tsx src/app/layout.tsx src/components/Nav.tsx
git commit -m "feat: add Lenis smooth scroll and nav link underline animation"
```

---

### Task 6: Sound System

**Files:**
- Create: `src/context/SoundContext.tsx`
- Create: `src/components/SoundToggle.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Nav.tsx`

**Context:** Sounds are generated with Web Audio API (no audio files). AudioContext must be created lazily after user interaction (browser policy blocks AudioContext before first gesture). Default: **muted** — user must opt in. Preference stored in `localStorage`. The SoundToggle lives in the Nav. Nav links play a soft tick when clicked.

- [ ] **Step 1: Create SoundContext.tsx**

Create `src/context/SoundContext.tsx`:

```tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type SoundCtx = {
  muted: boolean;
  toggle: () => void;
  playTick: () => void;
  playWhoosh: () => void;
};

const SoundContext = createContext<SoundCtx>({
  muted: true,
  toggle: () => {},
  playTick: () => {},
  playWhoosh: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(true);
  const acRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (localStorage.getItem("sound-enabled") === "true") setMuted(false);
  }, []);

  const getAC = useCallback(() => {
    if (!acRef.current) acRef.current = new AudioContext();
    return acRef.current;
  }, []);

  const playTick = useCallback(() => {
    if (muted) return;
    const ac = getAC();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.frequency.value = 900;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.06, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.07);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.07);
  }, [muted, getAC]);

  const playWhoosh = useCallback(() => {
    if (muted) return;
    const ac = getAC();
    const bufferSize = Math.floor(ac.sampleRate * 0.35);
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source = ac.createBufferSource();
    source.buffer = buffer;

    const filter = ac.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, ac.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.35);
    filter.Q.value = 0.4;

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.05, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    source.start();
  }, [muted, getAC]);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("sound-enabled", String(next));
      return !next;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ muted, toggle, playTick, playWhoosh }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
```

- [ ] **Step 2: Create SoundToggle.tsx**

Create `src/components/SoundToggle.tsx`:

```tsx
"use client";

import { useSound } from "@/context/SoundContext";

export default function SoundToggle() {
  const { muted, toggle } = useSound();

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Enable sound effects" : "Disable sound effects"}
      title={muted ? "Enable sound" : "Disable sound"}
      className="text-[18px] text-neutral-600 hover:text-neutral-300 transition-colors leading-none"
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
```

- [ ] **Step 3: Wrap layout with SoundProvider**

In `src/app/layout.tsx`, import `SoundProvider` and wrap the body children:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SoundProvider } from "@/context/SoundContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Connor Drainas — Full-Stack Engineer",
  description:
    "Full-stack software engineer with 6+ years of production experience. React, Node.js, AWS, Docker. Dual EU citizen relocating to Europe September 2026.",
  keywords: ["software engineer", "full-stack", "React", "Node.js", "AWS", "EU", "Europe", "cloud"],
  openGraph: {
    title: "Connor Drainas — Full-Stack Engineer",
    description: "6+ years shipping production SaaS. Relocating EU Sept 2026.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SoundProvider>
          <SmoothScroll />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Add SoundToggle and tick sounds to Nav.tsx**

Replace the full content of `src/components/Nav.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import SoundToggle from "@/components/SoundToggle";
import { useSound } from "@/context/SoundContext";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { playTick } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Site navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Monogram */}
        <a
          href="#"
          aria-label="Home"
          onClick={playTick}
          className="font-display font-bold text-lg text-white tracking-tight"
        >
          C·D
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={playTick}
              className="nav-link py-1 text-[10px] font-medium tracking-[2px] uppercase text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: sound toggle + CTA */}
        <div className="flex items-center gap-4">
          <SoundToggle />
          <a
            href="#contact"
            onClick={playTick}
            className="text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-2.5 rounded-full border border-white/15 text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Start dev: `npm run dev`. Open the site. Click the 🔇 icon — it should switch to 🔊. Click a nav link — you should hear a soft tick. Refresh shows muted state restored from localStorage.

- [ ] **Step 6: Commit**

```bash
git add src/context/SoundContext.tsx src/components/SoundToggle.tsx src/app/layout.tsx src/components/Nav.tsx
git commit -m "feat: add Web Audio UI sounds with mute toggle in nav"
```

---

### Task 7: Project Detail Page Scroll Reveals

**Files:**
- Create: `src/components/ScrollReveal.tsx`
- Modify: `src/app/projects/[id]/page.tsx`

**Context:** On the project detail page, wrap sections in a client component that adds the `visible` class (from `globals.css .reveal`) when the element enters the viewport via Intersection Observer. The page itself is a server component — the reveal wrapper is a small client component.

- [ ] **Step 1: Create ScrollReveal.tsx**

Create `src/components/ScrollReveal.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Wrap project detail page sections with ScrollReveal**

Replace the full content of `src/app/projects/[id]/page.tsx`:

```tsx
import { projects } from "@/data/projects";
import Nav from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return {
    title: project
      ? `${project.name} — Connor Drainas`
      : "Project — Connor Drainas",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <main className="min-h-screen">
      <Nav />
      <article className="max-w-4xl mx-auto px-8 pt-32 pb-24">

        <Link
          href="/#projects"
          className="text-[10px] tracking-[2px] uppercase text-neutral-500 hover:text-white transition-colors mb-12 block"
        >
          <span aria-hidden="true">←</span> Back to projects
        </Link>

        <ScrollReveal delay={0}>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                className={`text-[9px] tracking-[1px] uppercase font-semibold px-2 py-0.5 rounded ${tag.color} ${tag.bg}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <h1
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            {project.name}
          </h1>

          <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-2xl">
            {project.description}
          </p>
        </ScrollReveal>

        {project.image && (
          <ScrollReveal delay={100} className="mb-10">
            <div className="bento-card overflow-hidden aspect-video relative">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={150}>
          <div className="border-l border-white/5 pl-6 mb-10">
            <p className="text-neutral-400 text-base leading-relaxed">{project.detail}</p>
          </div>
        </ScrollReveal>

        {project.outcomes.length > 0 && (
          <ScrollReveal delay={200} className="mb-10">
            <h2 className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-4">
              Key Points
            </h2>
            <ul className="space-y-3">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-neutral-400 text-sm">
                  <span className="text-blue-400 mt-0.5 shrink-0" aria-hidden="true">—</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        )}

        {project.tech.length > 0 && (
          <ScrollReveal delay={250} className="mb-10">
            <h2 className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-3 py-1 rounded-full border border-white/10 text-neutral-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={300}>
          <div className="flex items-center gap-6 pt-6 border-t border-white/5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold tracking-[1.5px] uppercase px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
              >
                Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[1.5px] uppercase text-neutral-400 hover:text-white transition-colors"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </ScrollReveal>

      </article>
    </main>
  );
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Start dev server, navigate to `/projects/trading-bot` and scroll — sections should fade up as they enter the viewport.

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollReveal.tsx 'src/app/projects/[id]/page.tsx'
git commit -m "feat: add scroll reveal animations to project detail pages"
```

---

## Self-Review

**Spec coverage check:**
- ✅ LinkedIn URL fix — Task 1 Step 1
- ✅ GitHub URL fixes (trading-bot, osint) — Task 1 Step 2
- ✅ 3 new projects (jarvis, secure-chat, saas-quotation) — Task 1 Step 2
- ✅ Text contrast site-wide — Task 2
- ✅ Animation CSS keyframes + hover — Task 3
- ✅ Hero kinetic entrance animation — Task 4
- ✅ Lenis smooth scroll — Task 5
- ✅ Nav underline hover — Task 5 Step 4
- ✅ Sound system with mute toggle — Task 6
- ✅ Project detail scroll reveals — Task 7
- ✅ Bento card cascade — Task 3 (nth-child stagger in globals.css)

**Placeholder scan:** No TBDs, TODOs, or vague steps. All code is complete.

**Type consistency:** `useSound()` exported from `SoundContext.tsx` and imported consistently in `Nav.tsx` and `SoundToggle.tsx`. `ScrollReveal` props match usage in `page.tsx`. `Project` type unchanged — new projects conform to existing shape.
