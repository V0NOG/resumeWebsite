# Resume Website — Design Spec

**Date:** 2026-04-23  
**Owner:** Connor Drainas  
**Status:** Approved

---

## Goal

Build a personal portfolio/resume website that presents Connor Drainas as a hireable mid-level full-stack or cloud engineer, targeting European companies, with a secondary signal toward cybersecurity. The site must be polished enough to work as a job application attachment and memorable enough that a recruiter keeps the tab open.

**Relocation context:** Connor is a dual Greek–Australian citizen relocating to Europe in September 2026. Greek citizenship gives full EU right to work. This must be prominently visible.

---

## Design Direction

Merged from two reference sites:
- **pierrelouis.webflow.io** — bento-box dashboard layout, dark dot-grid background, floating card panels, interactive feel
- **chiaraluzzana.com** — massive editorial serif display typography, stroke/outline text mixed with filled text, minimal nav, dramatic typographic hero

**Result:** A dark dot-grid background with a full-viewport editorial typography hero, followed by a bento-grid dashboard of floating card panels containing all portfolio content.

---

## Visual Style

| Element | Value |
|---------|-------|
| Background | `#0a0a0f` with radial-gradient dot grid (`#1a1a2e` dots, 28px spacing) |
| Card background | `rgba(255,255,255,0.03)` with `rgba(255,255,255,0.06)` border |
| Card hover | Border lifts to `rgba(255,255,255,0.12)` |
| Accent blue | `#3b82f6` |
| Accent purple | `#8b5cf6` |
| Accent green | `#22c55e` (availability pulse dot) |
| Accent amber | `#f59e0b` (security tags) |
| Display font | Playfair Display (serif, weights 400/700/900) |
| Body font | Inter (sans-serif, weights 300/400/500/600) |
| Hero text treatment | Outline/stroke text mixed with solid white — `FULL-STACK` (stroke), `ENGINEER` (filled white), `+ CLOUD` (blue stroke) |

---

## Architecture

- **Framework:** Next.js 14 (App Router, static export → `output: 'export'`)
- **Styling:** Tailwind CSS + CSS custom properties for dot grid and gradient effects
- **Fonts:** Google Fonts via `next/font/google` (Playfair Display + Inter)
- **Deployment:** Vercel (free tier, auto-deploy from GitHub)
- **Domain:** `connor.drainas.com` — user to confirm before launch
- **Contact form:** Formspree (no backend required, free tier)
- **Resume download:** PDF in `/public/resume.pdf`
- **No database, no auth, no server-side logic** — fully static

---

## Layout

### Navigation (fixed, full-width)
- Left: Monogram `C·D` in Playfair Display
- Center: 4 uppercase small-caps links — Skills · Work · Projects · Contact
- Right: Pill CTA — `Hire Me` (white border, fills white on hover → text black)
- Behavior: transparent at top of page; adds `backdrop-blur` + subtle bottom border on scroll

### Hero (full viewport height)
- Eyebrow line: `—— Available · Dual EU Citizen · Relocating Europe Sept 2026` (10px, tracked, muted)
- Display type (Playfair Display, ~9vw, 900 weight, line-height 0.95):
  - Line 1: `FULL-STACK` — stroke/outline only (`-webkit-text-stroke: 1.5px rgba(255,255,255,0.3)`)
  - Line 2: `ENGINEER` — solid white
  - Line 3: `+ CLOUD` — blue stroke (`-webkit-text-stroke: 1.5px #3b82f6`)
- Below type: left-border tagline block + two CTAs (`View Projects` filled white, `↓ Download CV` text-only)

### Bento Grid (below hero, 12-column CSS grid, 80px row units, 12px gap)

| Card | Columns | Rows | Content |
|------|---------|------|---------|
| About | 5 | 4 | Bio + EU availability + green pulse dot |
| Skills | 4 | 4 | 8 skill tags in 2-col grid + security tags |
| Years stat | 3 | 4 | `6+` in Playfair Display 52px + "years in production" |
| Featured project (Trading Bot) | 7 | 3 | Large card, blue accent border, full description |
| OCI Furniture | 5 | 3 | Client site card, Live tag, link |
| Cura Commercial | 5 | 3 | Client site card, Live tag, link |
| MagiReads | 4 | 2 | Project card |
| OSINT Toolkit | 4 | 2 | Project card, amber security tag |
| Homelab Dashboard | 4 | 2 | Project card |
| Contact bar | 12 | 2 | Full-width: headline + EU note + Get in Touch + Download CV |

---

## Content Notes

- **EU right to work**: State "Greek–Australian dual citizen · Full EU right to work" explicitly in contact bar and hero eyebrow
- **University**: Say "completing" not "completed" — currently final semester
- **No reference contact details** on the public site — references available on request only
- **claw-code project omitted** from portfolio
- **GitHub links in projects.ts** should point to specific repo URLs, not just profile (user to update before launch)

---

## Phase 2 (Out of Scope for v1)

- Sound design: ambient audio on load, subtle UI click/hover sounds (like pierrelouis.webflow.io)
- Cursor custom effects
- Page transition animations (GSAP or Framer Motion)
- Dark/light mode toggle
- Blog section

---

## Before Launch — User Actions Required

- [ ] Replace `public/resume.pdf` with actual PDF
- [ ] Sign up at formspree.io and replace `YOUR_FORMSPREE_ID` in Contact component
- [ ] Add LinkedIn URL
- [ ] Confirm domain (`connor.drainas.com` vs dedicated)
- [ ] Update GitHub links in `src/data/projects.ts` to specific repo URLs

---

## Success Criteria

- Loads in under 2 seconds (static, Vercel CDN)
- Mobile responsive (bento grid collapses to single column)
- EU availability visible within 3 seconds of landing
- All 6 projects displayed with working links
- Contact form submits successfully
