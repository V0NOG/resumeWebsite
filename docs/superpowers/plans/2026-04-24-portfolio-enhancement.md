# Portfolio Enhancement — Experience Timeline, Project Pages & Proof Points

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a work experience timeline, individual project detail pages, and outcome/proof-point content to make the portfolio compelling to EU hiring managers.

**Architecture:** Three additions to the existing Next.js 16 + Tailwind CSS v4 static site: (1) an ExperienceCard bento component using existing `experience.ts` data; (2) dynamic project pages at `/projects/[id]/` using `generateStaticParams()` for static export compatibility; (3) enriched project data with `tech[]` and `outcomes[]` fields that power both detail pages and enhanced bento cards. All data lives in `src/data/projects.ts` — components are dumb.

**Tech Stack:** Next.js 16 App Router (params are Promises — all page/metadata functions must be async), TypeScript, Tailwind CSS v4

**File map:**
- Modify: `src/data/projects.ts` — add `tech`, `outcomes`, `image?` to Project type + populate
- Create: `src/components/cards/ExperienceCard.tsx` — full-width work history card
- Modify: `src/app/page.tsx` — add ExperienceCard to BentoGrid
- Modify: `src/components/Nav.tsx` — update Work link to `#work`
- Create: `src/app/projects/[id]/page.tsx` — static project detail pages
- Modify: `src/components/cards/FeaturedProjectCard.tsx` — add outcomes + case study link
- Modify: `src/components/cards/ProjectCard.tsx` — add Details link

---

## Task 1: Enrich Project Data

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Update the Project type**

In `src/data/projects.ts`, replace the existing `Project` type with:

```typescript
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
```

- [ ] **Step 2: Replace the projects array with enriched data**

Replace the entire `projects` array:

```typescript
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
    githubUrl: "https://github.com/V0NOG",
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
    githubUrl: "https://github.com/V0NOG",
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

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/connor/Documents/resumeWebsite && npx tsc --noEmit
```

Expected: no errors. TypeScript will catch any component that uses the old Project shape (missing `tech` or `outcomes`).

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: enrich project data with tech stacks and outcome proof points"
```

---

## Task 2: Experience Timeline Card

**Files:**
- Create: `src/components/cards/ExperienceCard.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Create src/components/cards/ExperienceCard.tsx**

```typescript
import { experience } from "@/data/experience";

export default function ExperienceCard() {
  return (
    <div
      id="work"
      className="bento-card p-6"
      style={{ gridColumn: "span 12", gridRow: "span 5" }}
    >
      <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-6">Work History</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experience.map((role, i) => (
          <div key={role.id} className="border-l border-white/5 pl-4">
            <div
              className={`w-1.5 h-1.5 rounded-full mb-3 ${
                i === 0 ? "bg-blue-400" : "bg-neutral-700"
              }`}
            />
            <p className="text-white text-sm font-medium leading-tight">{role.title}</p>
            <p className="text-neutral-500 text-xs mt-0.5 mb-2">
              {role.company} · {role.location}
            </p>
            <p className="text-[10px] text-neutral-600 tracking-wide mb-3">{role.period}</p>
            <p className="text-neutral-600 text-xs leading-relaxed">{role.bullets[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update src/app/page.tsx to include ExperienceCard**

Replace the file with:

```typescript
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";
import SkillsCard from "@/components/cards/SkillsCard";
import YearsCard from "@/components/cards/YearsCard";
import ExperienceCard from "@/components/cards/ExperienceCard";
import FeaturedProjectCard from "@/components/cards/FeaturedProjectCard";
import ProjectCard from "@/components/cards/ProjectCard";
import ContactBar from "@/components/cards/ContactBar";
import { projects } from "@/data/projects";

const nonFeatured = projects.filter((p) => !p.featured);

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
        <AboutCard />
        <SkillsCard />
        <YearsCard />
        <ExperienceCard />
        <FeaturedProjectCard />
        {nonFeatured.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            colSpan={projectLayouts[i]?.colSpan ?? 4}
            rowSpan={projectLayouts[i]?.rowSpan ?? 2}
          />
        ))}
        <ContactBar />
      </BentoGrid>
    </main>
  );
}
```

- [ ] **Step 3: Update Nav "Work" link to #work**

In `src/components/Nav.tsx`, change the links array:

```typescript
const links = [
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
```

- [ ] **Step 4: Verify build**

```bash
cd /Users/connor/Documents/resumeWebsite && npm run build 2>&1 | tail -8
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/cards/ExperienceCard.tsx src/app/page.tsx src/components/Nav.tsx
git commit -m "feat: add full-width experience timeline card with 6 roles"
```

---

## Task 3: Project Detail Pages

**Files:**
- Create: `src/app/projects/[id]/page.tsx`

**Important:** This project uses Next.js 16 where `params` in page components is a `Promise`. Both the page function and `generateMetadata` must be `async` and `await params`.

- [ ] **Step 1: Create src/app/projects/[id]/page.tsx**

```typescript
import { projects } from "@/data/projects";
import Nav from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
          className="text-[10px] tracking-[2px] uppercase text-neutral-600 hover:text-white transition-colors mb-12 block"
        >
          ← Back to projects
        </Link>

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

        {project.image && (
          <div className="bento-card overflow-hidden mb-10 aspect-video relative">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="border-l border-white/5 pl-6 mb-10">
          <p className="text-neutral-500 text-base leading-relaxed">{project.detail}</p>
        </div>

        {project.outcomes.length > 0 && (
          <div className="mb-10">
            <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-4">
              Key Points
            </p>
            <ul className="space-y-3">
              {project.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-500 text-sm">
                  <span className="text-blue-400 mt-0.5 shrink-0">—</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.tech.length > 0 && (
          <div className="mb-10">
            <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-3">
              Tech Stack
            </p>
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
          </div>
        )}

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
              className="text-[11px] tracking-[1.5px] uppercase text-neutral-500 hover:text-white transition-colors"
            >
              View on GitHub →
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Verify build includes all 6 project routes**

```bash
cd /Users/connor/Documents/resumeWebsite && npm run build 2>&1 | grep -E "projects|Error"
```

Expected output includes:
```
├ ○ /projects/trading-bot
├ ○ /projects/oci-furniture
├ ○ /projects/cura-commercial
├ ○ /projects/magireads
├ ○ /projects/osint
└ ○ /projects/homelab
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000/projects/trading-bot — should show the dark-themed detail page with Nav, title, description, tech stack pills, and key points list. Click "← Back to projects" — returns to homepage at `#projects`. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/
git commit -m "feat: add static project detail pages with tech stack and outcomes"
```

---

## Task 4: Wire Bento Cards to Project Pages

**Files:**
- Modify: `src/components/cards/FeaturedProjectCard.tsx`
- Modify: `src/components/cards/ProjectCard.tsx`

- [ ] **Step 1: Replace src/components/cards/FeaturedProjectCard.tsx**

```typescript
import Link from "next/link";
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
      <div className="flex gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            className={`text-[9px] tracking-[1px] uppercase font-semibold px-2 py-0.5 rounded ${tag.color} ${tag.bg}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <h3 className="font-display font-bold text-white text-2xl mb-2 leading-tight">
        {project.name}
      </h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-3">{project.description}</p>

      <ul className="space-y-1.5 mb-3">
        {project.outcomes.slice(0, 2).map((outcome, i) => (
          <li key={i} className="flex items-start gap-2 text-neutral-600 text-xs">
            <span className="text-blue-400 shrink-0">—</span>
            {outcome}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[1px] uppercase text-blue-400 hover:text-blue-300 transition-colors"
          >
            GitHub →
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          className="text-[10px] tracking-[1px] uppercase text-neutral-500 hover:text-white transition-colors"
        >
          Full case study →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace src/components/cards/ProjectCard.tsx**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
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
      <div className="flex flex-wrap gap-1.5 mb-2">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            className={`text-[9px] tracking-[1px] uppercase font-semibold px-1.5 py-0.5 rounded ${tag.color} ${tag.bg}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <h3 className="font-display font-bold text-white text-base leading-tight mb-1">
        {project.name}
      </h3>
      <p className="text-neutral-600 text-xs leading-relaxed mb-3">{project.description}</p>

      {expanded && (
        <p className="text-neutral-500 text-xs leading-relaxed mb-3 border-t border-white/5 pt-3">
          {project.detail}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 flex-wrap">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors tracking-wide"
          >
            Visit →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors tracking-wide"
          >
            GitHub →
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          className="text-[10px] text-neutral-500 hover:text-white transition-colors tracking-wide"
        >
          Details →
        </Link>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto text-[9px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wide"
          aria-expanded={expanded}
        >
          {expanded ? "▲ Less" : "▼ More"}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/connor/Documents/resumeWebsite && npm run build 2>&1 | tail -15
```

Expected: build succeeds, all 6 project routes present, no TypeScript errors.

- [ ] **Step 4: Verify links in browser**

```bash
npm run dev
```

Open http://localhost:3000:
- Scroll to featured card — should show 2 outcome bullets and "Full case study →" link
- Click "Full case study →" — should navigate to `/projects/trading-bot`
- Scroll to project cards — each should have a "Details →" link
- Click "Details →" on OCI card — should navigate to `/projects/oci-furniture`
- On any project page, click "← Back to projects" — returns to homepage

Stop server.

- [ ] **Step 5: Commit**

```bash
git add src/components/cards/FeaturedProjectCard.tsx src/components/cards/ProjectCard.tsx
git commit -m "feat: wire bento cards to project detail pages with outcome previews"
```
