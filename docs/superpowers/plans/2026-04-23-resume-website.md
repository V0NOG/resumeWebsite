# Resume Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page bento-grid portfolio site for Connor Drainas with editorial serif hero typography, deployed to Vercel.

**Architecture:** Next.js 14 App Router with static export. Hero section uses full-viewport editorial display type (Playfair Display, stroke/outline mixed with filled). Content below is a CSS 12-column bento grid of floating card panels. All data (projects, experience, skills) lives in typed `src/data/` files — components are dumb, data is easy to update. No backend; contact form via Formspree.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Playfair Display + Inter (Google Fonts via next/font), Formspree

---

## Task 1: Project Scaffold

**Files:**
- Create: full Next.js project via `create-next-app`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/connor/Documents/resumeWebsite
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
```

Accept all defaults when prompted.

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — default Next.js page should appear. Stop with Ctrl+C.

- [ ] **Step 3: Replace next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: Replace tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0a0a0f",
        card: "rgba(255,255,255,0.03)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Replace globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --blue: #3b82f6;
  --purple: #8b5cf6;
  --green: #22c55e;
  --amber: #f59e0b;
}

html { scroll-behavior: smooth; }

body {
  background-color: #0a0a0f;
  /* Dot grid — Pierre-Louis style */
  background-image: radial-gradient(circle, #1a1a2e 1px, transparent 1px);
  background-size: 28px 28px;
  color: #f0f0f0;
}

/* Editorial stroke text — Chiara Luzzana style */
.text-stroke {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.25);
}

.text-stroke-blue {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--blue);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(90deg, var(--blue), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Bento card base */
.bento-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: border-color 0.2s ease;
}

.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

/* Availability pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.pulse { animation: pulse 2s ease-in-out infinite; }
```

- [ ] **Step 6: Replace layout.tsx**

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Replace page.tsx with skeleton**

```typescript
export default function Home() {
  return (
    <main className="min-h-screen">
      <p className="text-white p-8">Building...</p>
    </main>
  );
}
```

- [ ] **Step 8: Verify build works**

```bash
npm run build
```

Expected: build succeeds, `out/` directory created with no TypeScript errors.

- [ ] **Step 9: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js with Tailwind, dot-grid globals, Playfair + Inter fonts"
```

---

## Task 2: Data Files

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/skills.ts`

- [ ] **Step 1: Create src/data/skills.ts**

```typescript
export type SkillTag = { label: string; color: string; bg: string; border: string };
export type SkillCategory = { id: string; heading: string; tags: SkillTag[] };

const blue: Omit<SkillTag, "label"> = {
  color: "text-blue-400",
  bg: "bg-blue-500/10",
  border: "border-blue-500/20",
};
const amber: Omit<SkillTag, "label"> = {
  color: "text-amber-400",
  bg: "bg-amber-500/10",
  border: "border-amber-500/20",
};

export const coreSkills: SkillTag[] = [
  { label: "React", ...blue },
  { label: "TypeScript", ...blue },
  { label: "Node.js", ...blue },
  { label: "MongoDB", ...blue },
  { label: "Docker", ...blue },
  { label: "AWS", ...blue },
  { label: "Python", ...blue },
  { label: "Bash", ...blue },
];

export const securitySkills: SkillTag[] = [
  { label: "Pentesting", ...amber },
  { label: "OSINT", ...amber },
  { label: "Secure Auth", ...amber },
];
```

- [ ] **Step 2: Create src/data/experience.ts**

```typescript
export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    id: "freelance-2024",
    title: "Freelance Software Engineer",
    company: "Self-Employed",
    location: "Sydney",
    period: "2024 – Present",
    bullets: [
      "Built custom SaaS tools, websites and automations using React, Node.js and MongoDB",
      "Managed AWS infrastructure (Lightsail, Route53), security hardening and Docker deployments",
      "Troubleshot production issues across APIs, networking and databases",
    ],
  },
  {
    id: "cloudcase-2022",
    title: "Software Engineer",
    company: "CloudCase",
    location: "Sydney",
    period: "2022 – 2023",
    bullets: [
      "Configured and supported a banking SaaS platform for enterprise financial clients",
      "Implemented capital adequacy ratios and regulatory reporting features",
      "Acted as technical escalation point; mentored two engineers",
    ],
  },
  {
    id: "self-2020",
    title: "Software & Systems Engineer",
    company: "Self-Employed",
    location: "Sydney",
    period: "2020",
    bullets: [
      "Delivered custom software systems and web platforms end-to-end",
      "Full ownership of architecture, development, deployment and client support",
    ],
  },
  {
    id: "speedy-2019",
    title: "Systems Engineer & IT Support",
    company: "Speedy Gantry Hire",
    location: "Ingleburn",
    period: "2019 – 2020",
    bullets: [
      "Built a custom internal quotation portal used daily by staff",
      "Managed servers, networking and full-stack IT support",
    ],
  },
  {
    id: "cloudcase-2017",
    title: "System Configuration Engineer",
    company: "CloudCase",
    location: "Sydney",
    period: "2017 – 2018",
    bullets: [
      "Configured front-end and back-end systems for high-profile financial clients",
      "Performed systems analysis and platform customisation",
    ],
  },
  {
    id: "axion-2015",
    title: "Junior Systems Engineer",
    company: "Axion Consulting",
    location: "Sydney",
    period: "2015 – 2017",
    bullets: [
      "Front-end configuration and template development",
      "Early client-facing technical work",
    ],
  },
];
```

- [ ] **Step 3: Create src/data/projects.ts**

```typescript
export type ProjectTag = { label: string; color: string; bg: string };
export type Project = {
  id: string;
  name: string;
  tags: ProjectTag[];
  description: string;
  detail: string;
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
    githubUrl: "https://github.com/V0NOG",
    featured: true,
  },
  {
    id: "oci-furniture",
    name: "OCI International Furniture",
    tags: [{ label: "React", ...blue }, { label: "Node.js", ...green }, { label: "Live", ...green }],
    description: "Production client website for an international furniture importer. Deployed on AWS.",
    detail: "Designed and delivered a full production website. Handles product catalogue, company information, and contact flows. Deployed on AWS Lightsail with DNS management via Route53.",
    liveUrl: "https://www.ocinternationalfurniture.com",
  },
  {
    id: "cura-commercial",
    name: "Cura Commercial",
    tags: [{ label: "React", ...blue }, { label: "Node.js", ...green }, { label: "Live", ...green }],
    description: "Production commercial services website. End-to-end delivery including hosting, DNS and support.",
    detail: "Built and deployed a professional website for a commercial services business. Full ownership from design brief to production deployment.",
    liveUrl: "https://curacommercial.com.au",
  },
  {
    id: "magireads",
    name: "MagiReads",
    tags: [{ label: "Next.js", ...blue }, { label: "Docker", ...green }, { label: "Scraping", ...purple }],
    description: "Manga reading platform with custom scraper API backend and full web UI.",
    detail: "Full-stack manga app with Next.js frontend and a custom scraper API. Containerised with Docker Compose. Includes authentication and user reading state.",
    githubUrl: "https://github.com/V0NOG",
  },
  {
    id: "osint",
    name: "OSINT Toolkit",
    tags: [{ label: "Python", ...blue }, { label: "Security", ...amber }],
    description: "Open-source intelligence tools for security research. Built alongside cybersecurity coursework.",
    detail: "Collection of OSINT tooling for information gathering and reconnaissance. Developed alongside CS cybersecurity major at UoW and extended with personal pentesting research.",
    githubUrl: "https://github.com/V0NOG",
  },
  {
    id: "homelab",
    name: "Homelab Dashboard",
    tags: [{ label: "Next.js", ...blue }, { label: "Prisma", ...purple }, { label: "Docker", ...green }],
    description: "Personal homelab management dashboard. Next.js App Router, Prisma ORM, Dockerised.",
    detail: "Internal dashboard for managing homelab services. Next.js App Router, Prisma for data persistence, Tailwind CSS, Docker Compose. Includes authentication and multiple service integrations.",
    githubUrl: "https://github.com/V0NOG",
  },
];
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data files for skills, experience and projects"
```

---

## Task 3: Nav Component

**Files:**
- Create: `src/components/Nav.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/Nav.tsx**

```typescript
"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
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
              className="text-[10px] font-medium tracking-[2px] uppercase text-neutral-500 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-2.5 rounded-full border border-white/15 text-white hover:bg-white hover:text-black transition-all duration-200"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Nav to page.tsx**

```typescript
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <div className="h-screen flex items-center justify-center text-white/20 text-sm">
        Building…
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000. Nav shows `C·D` left, links center, `Hire Me` pill right. Scroll — nav gains blur + border. Stop with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.tsx src/app/page.tsx
git commit -m "feat: add minimal nav with scroll-triggered blur"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/Hero.tsx**

```typescript
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-8 md:px-16 max-w-7xl mx-auto">

      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-8 text-neutral-600 text-[10px] tracking-[3px] uppercase">
        <span className="w-8 h-px bg-neutral-700 block" />
        Available · Dual EU Citizen · Relocating Europe Sept 2026
      </div>

      {/* Editorial display type — Chiara Luzzana style */}
      <div className="font-display font-black leading-[0.9] tracking-[-3px] mb-10"
           style={{ fontSize: "clamp(64px, 10vw, 130px)" }}>
        <div className="text-stroke block">FULL-STACK</div>
        <div className="text-white block">ENGINEER</div>
        <div className="text-stroke-blue block">+ CLOUD</div>
      </div>

      {/* Sub-row */}
      <div className="flex flex-col md:flex-row gap-8 md:items-center">
        <p className="text-neutral-500 text-sm leading-relaxed border-l border-neutral-800 pl-5 max-w-xs">
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
            download
            className="text-[11px] tracking-[1.5px] uppercase text-neutral-500 hover:text-white transition-colors"
          >
            ↓ Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add placeholder resume PDF**

```bash
touch /Users/connor/Documents/resumeWebsite/public/resume.pdf
```

Replace with real PDF before launch.

- [ ] **Step 3: Update page.tsx**

```typescript
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000. You should see: muted eyebrow text, then three lines of massive display type — first line outline-stroke, second line solid white, third line blue stroke. Two CTAs below. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx public/resume.pdf src/app/page.tsx
git commit -m "feat: add editorial hero with stroke/filled display typography"
```

---

## Task 5: Bento Grid Shell + About Card

**Files:**
- Create: `src/components/BentoGrid.tsx`
- Create: `src/components/cards/AboutCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/BentoGrid.tsx**

This is the grid wrapper that all cards live inside.

```typescript
export default function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-24">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "80px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create src/components/cards/AboutCard.tsx**

```typescript
export default function AboutCard() {
  return (
    <div
      className="bento-card p-6 flex flex-col"
      style={{ gridColumn: "span 5", gridRow: "span 4" }}
    >
      <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-3">About</p>

      <h2 className="font-display font-bold text-xl text-white leading-snug mb-4">
        Building reliable software,<br />shipping to production.
      </h2>

      <p className="text-neutral-500 text-xs leading-relaxed mb-2">
        Dual Greek–Australian citizen with 6+ years building and shipping full-stack
        applications across finance and custom product environments.
      </p>
      <p className="text-neutral-500 text-xs leading-relaxed">
        Final semester of a Bachelor of CS (Cybersecurity major) at UoW. Greek citizenship
        gives full EU right to work.
      </p>

      {/* Availability */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-emerald-400 tracking-[1px] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse" />
        Open to work · Remote now · On-site Sept 2026
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update page.tsx**

```typescript
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <BentoGrid>
        <AboutCard />
      </BentoGrid>
    </main>
  );
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Scroll past hero — About card should appear in the top-left of the grid with bio text and green pulse dot. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/components/BentoGrid.tsx src/components/cards/AboutCard.tsx src/app/page.tsx
git commit -m "feat: add bento grid shell and about card"
```

---

## Task 6: Skills Card + Years Stat Card

**Files:**
- Create: `src/components/cards/SkillsCard.tsx`
- Create: `src/components/cards/YearsCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/cards/SkillsCard.tsx**

```typescript
import { coreSkills, securitySkills } from "@/data/skills";

export default function SkillsCard() {
  return (
    <div
      id="skills"
      className="bento-card p-6"
      style={{ gridColumn: "span 4", gridRow: "span 4" }}
    >
      <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-4">Core Skills</p>

      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {coreSkills.map((skill) => (
          <span
            key={skill.label}
            className={`text-[10px] px-2 py-1 rounded ${skill.color} ${skill.bg} border ${skill.border}`}
          >
            {skill.label}
          </span>
        ))}
      </div>

      <div className="border-t border-white/5 pt-3">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-700 mb-2">Security</p>
        <div className="flex flex-wrap gap-1.5">
          {securitySkills.map((skill) => (
            <span
              key={skill.label}
              className={`text-[10px] px-2 py-1 rounded ${skill.color} ${skill.bg} border ${skill.border}`}
            >
              {skill.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create src/components/cards/YearsCard.tsx**

```typescript
export default function YearsCard() {
  return (
    <div
      className="bento-card p-6 flex flex-col justify-between"
      style={{ gridColumn: "span 3", gridRow: "span 4" }}
    >
      <div>
        <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-3">Experience</p>
        <p className="font-display font-black text-white leading-none" style={{ fontSize: "52px" }}>
          6+
        </p>
        <p className="text-neutral-600 text-xs mt-1">years in production</p>
      </div>
      <p className="text-[10px] tracking-[1px] uppercase text-neutral-700">2015 → Present</p>
    </div>
  );
}
```

- [ ] **Step 3: Update page.tsx**

```typescript
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";
import SkillsCard from "@/components/cards/SkillsCard";
import YearsCard from "@/components/cards/YearsCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <BentoGrid>
        <AboutCard />
        <SkillsCard />
        <YearsCard />
      </BentoGrid>
    </main>
  );
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Scroll to grid — 3 cards side by side: About (5 cols), Skills (4 cols), Years stat (3 cols). Skills shows 8 blue tags + 3 amber security tags. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/components/cards/SkillsCard.tsx src/components/cards/YearsCard.tsx src/app/page.tsx
git commit -m "feat: add skills and years stat bento cards"
```

---

## Task 7: Featured Project Card

**Files:**
- Create: `src/components/cards/FeaturedProjectCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/cards/FeaturedProjectCard.tsx**

```typescript
import { projects } from "@/data/projects";

export default function FeaturedProjectCard() {
  const project = projects.find((p) => p.featured)!;

  return (
    <div
      id="projects"
      className="bento-card p-6 flex flex-col"
      style={{
        gridColumn: "span 7",
        gridRow: "span 3",
        borderColor: "rgba(59,130,246,0.2)",
      }}
    >
      {/* Tags */}
      <div className="flex gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag.label} className={`text-[9px] tracking-[1px] uppercase font-semibold px-2 py-0.5 rounded ${tag.color} ${tag.bg}`}>
            {tag.label}
          </span>
        ))}
      </div>

      <h3 className="font-display font-bold text-white text-2xl mb-3 leading-tight">
        {project.name}
      </h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-2">{project.description}</p>
      <p className="text-neutral-600 text-xs leading-relaxed">{project.detail}</p>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[1px] uppercase text-blue-400 hover:text-blue-300 transition-colors"
          >
            View on GitHub →
          </a>
        )}
        <p className="text-[9px] text-neutral-700 tracking-wide">Risk mgmt · Anti-overfitting · Pure Python</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```typescript
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";
import SkillsCard from "@/components/cards/SkillsCard";
import YearsCard from "@/components/cards/YearsCard";
import FeaturedProjectCard from "@/components/cards/FeaturedProjectCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <BentoGrid>
        <AboutCard />
        <SkillsCard />
        <YearsCard />
        <FeaturedProjectCard />
      </BentoGrid>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Scroll to grid row 2 — the Trading Bot card (7 cols wide) should appear with blue accent border, full description and GitHub link. Stop with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/components/cards/FeaturedProjectCard.tsx src/app/page.tsx
git commit -m "feat: add featured project bento card (Trading Bot)"
```

---

## Task 8: Project Grid Cards

**Files:**
- Create: `src/components/cards/ProjectCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/cards/ProjectCard.tsx**

```typescript
"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  colSpan: number;
  rowSpan: number;
};

export default function ProjectCard({ project, colSpan, rowSpan }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bento-card p-5 flex flex-col overflow-hidden"
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {project.tags.map((tag) => (
          <span key={tag.label} className={`text-[9px] tracking-[1px] uppercase font-semibold px-1.5 py-0.5 rounded ${tag.color} ${tag.bg}`}>
            {tag.label}
          </span>
        ))}
      </div>

      <h3 className="font-display font-bold text-white text-base leading-tight mb-1">
        {project.name}
      </h3>
      <p className="text-neutral-600 text-xs leading-relaxed mb-3">{project.description}</p>

      {/* Accordion */}
      {expanded && (
        <p className="text-neutral-500 text-xs leading-relaxed mb-3 border-t border-white/5 pt-3">
          {project.detail}
        </p>
      )}

      {/* Links */}
      <div className="mt-auto flex items-center gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
             className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors tracking-wide">
            Visit →
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
             className="text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors tracking-wide">
            GitHub →
          </a>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto text-[9px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wide"
        >
          {expanded ? "▲ Less" : "▼ More"}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update page.tsx (final assembly)**

```typescript
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";
import SkillsCard from "@/components/cards/SkillsCard";
import YearsCard from "@/components/cards/YearsCard";
import FeaturedProjectCard from "@/components/cards/FeaturedProjectCard";
import ProjectCard from "@/components/cards/ProjectCard";
import ContactBar from "@/components/cards/ContactBar";
import { projects } from "@/data/projects";

const nonFeatured = projects.filter((p) => !p.featured);

// Grid layout: OCI + Cura each span 5×3, then MagiReads/OSINT/Homelab span 4×2
const projectLayouts: { colSpan: number; rowSpan: number }[] = [
  { colSpan: 5, rowSpan: 3 },
  { colSpan: 5, rowSpan: 3 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <BentoGrid>
        {/* Row 1: About + Skills + Years */}
        <AboutCard />
        <SkillsCard />
        <YearsCard />
        {/* Row 2: Featured project */}
        <FeaturedProjectCard />
        {/* Rows 3–4: remaining projects */}
        {nonFeatured.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            colSpan={projectLayouts[i]?.colSpan ?? 4}
            rowSpan={projectLayouts[i]?.rowSpan ?? 2}
          />
        ))}
        {/* Contact bar */}
        <ContactBar />
      </BentoGrid>
    </main>
  );
}
```

- [ ] **Step 3: Commit placeholder (ContactBar doesn't exist yet — will be created in Task 9)**

Skip commit until ContactBar is done.

---

## Task 9: Contact Bar

**Files:**
- Create: `src/components/cards/ContactBar.tsx`

- [ ] **Step 1: Create src/components/cards/ContactBar.tsx**

Replace `YOUR_FORMSPREE_ID` and `YOUR_LINKEDIN_SLUG` before launch.

```typescript
"use client";

import { useState } from "react";

const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

export default function ContactBar() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id="contact"
      className="bento-card p-6"
      style={{ gridColumn: "span 12", gridRow: "span 2" }}
    >
      {!open ? (
        /* Collapsed contact bar */
        <div className="flex items-center justify-between h-full">
          <div>
            <p className="font-display font-bold text-white text-xl mb-1">
              Open to EU opportunities
            </p>
            <p className="text-neutral-600 text-xs">
              Greek–Australian dual citizen · Full EU right to work · Relocating September 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:connor@drainas.com"
               className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all">
              connor@drainas.com
            </a>
            <a href="https://github.com/V0NOG" target="_blank" rel="noopener noreferrer"
               className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all">
              GitHub
            </a>
            <a href="https://linkedin.com/in/YOUR_LINKEDIN_SLUG" target="_blank" rel="noopener noreferrer"
               className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all">
              LinkedIn
            </a>
            <button
              onClick={() => setOpen(true)}
              className="text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-2.5 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      ) : (
        /* Expanded contact form */
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-display font-bold text-white text-lg">Send a message</p>
            <button onClick={() => setOpen(false)} className="text-neutral-600 hover:text-white text-sm">✕</button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-3">
            <input name="name" type="text" required placeholder="Name"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 col-span-1" />
            <input name="email" type="email" required placeholder="Email"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 col-span-1" />
            <button type="submit" disabled={status === "sending" || status === "sent"}
              className="text-[11px] font-semibold tracking-[1px] uppercase bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 col-span-1">
              {status === "idle" && "Send"}
              {status === "sending" && "Sending…"}
              {status === "sent" && "Sent ✓"}
              {status === "error" && "Error — retry"}
            </button>
            <textarea name="message" required rows={2} placeholder="Message"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 col-span-3 resize-none" />
          </form>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify full page in browser**

```bash
npm run dev
```

Scroll through the complete page:
- Hero: 3-line editorial display type ✓
- Bento row 1: About + Skills + Years ✓
- Bento row 2: Trading Bot featured card (7 cols) + gap ✓
- Bento rows 3–4: OCI, Cura (5 col each), MagiReads, OSINT, Homelab (4 col each) ✓
- Contact bar: collapsed state shows headline + links + "Get in Touch" button ✓
- Click "Get in Touch": form expands inline ✓

Stop with Ctrl+C.

- [ ] **Step 4: Commit everything**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: complete bento grid with all cards, projects and contact bar"
```

---

## Task 10: Mobile Responsiveness

**Files:**
- Modify: `src/components/BentoGrid.tsx`
- Modify: all card files (col/row spans)

The bento grid uses fixed `gridColumn: "span N"` inline styles which don't respond to breakpoints. This task makes the grid collapse to a single column on mobile.

- [ ] **Step 1: Update BentoGrid.tsx to use responsive grid**

```typescript
export default function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
      {/* 
        Mobile: single column stack
        Desktop (md+): 12-column bento grid
      */}
      <div className="flex flex-col gap-3 md:hidden">
        {children}
      </div>
      <div
        className="hidden md:grid gap-3"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "80px" }}
      >
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify mobile in browser**

```bash
npm run dev
```

Open DevTools → toggle device toolbar → set to iPhone 14 (390px). All cards should stack vertically in a clean single-column layout. Scroll through every section. Fix any overflow issues. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/components/BentoGrid.tsx
git commit -m "feat: mobile-responsive bento grid (single column below md)"
```

---

## Task 11: Pre-Launch Checklist + Build Verification

- [ ] **Step 1: Full production build**

```bash
npm run build
```

Expected: build succeeds, `out/` directory populated. Fix any TypeScript errors.

- [ ] **Step 2: Replace placeholder resume PDF**

Copy the actual PDF resume into `public/resume.pdf`. Verify the "Download CV" button downloads it.

- [ ] **Step 3: Add Formspree ID**

Sign up at https://formspree.io → create a form → copy the ID. Replace `YOUR_FORMSPREE_ID` in `src/components/cards/ContactBar.tsx`. Test the form — submit it and verify email arrives.

- [ ] **Step 4: Add LinkedIn URL**

Replace `YOUR_LINKEDIN_SLUG` in `ContactBar.tsx` with your actual LinkedIn profile slug.

- [ ] **Step 5: Update GitHub links in projects.ts**

In `src/data/projects.ts`, replace `https://github.com/V0NOG` in each project's `githubUrl` with the specific repo URL for that project (e.g., `https://github.com/V0NOG/trading-bot-v2`).

- [ ] **Step 6: Verify all external links**

Open the site, click every "Visit →", "GitHub →", email, LinkedIn link. Confirm they open the correct pages.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: production-ready — real PDF, Formspree wired, all links verified"
```

---

## Task 12: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

Create a new repo at https://github.com/new named `resume-website`.

```bash
git remote add origin https://github.com/V0NOG/resume-website.git
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to https://vercel.com → sign in with GitHub
2. "Add New Project" → import `resume-website`
3. Framework: **Next.js** (auto-detected)
4. Output directory: `out`
5. Click Deploy

Wait ~60 seconds for the initial build.

- [ ] **Step 3: Configure domain**

In Vercel → project → Settings → Domains → add `connor.drainas.com`. Add the CNAME record shown by Vercel to your DNS provider (wherever `drainas.com` is registered). Wait for DNS propagation (5–30 min).

- [ ] **Step 4: Verify live site**

Open `https://connor.drainas.com`. Verify: HTTPS loads, all sections render, download works, contact form submits.

- [ ] **Step 5: Done — share the URL in applications.**
