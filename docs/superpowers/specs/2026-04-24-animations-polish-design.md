# Animations, Polish & New Projects — Design Spec

**Goal:** Add kinetic animations, smooth scroll, subtle UI sounds, improved text contrast, LinkedIn/GitHub link fixes, and three new projects to the portfolio site.

**Architecture:** Pure CSS keyframes + Intersection Observer for animations (zero new deps except Lenis for smooth scroll). Web Audio API for sounds (no audio files). All animation state managed with CSS classes toggled by a single shared observer hook.

**Tech Stack:** Next.js 16, Tailwind v4, Lenis (smooth scroll), Web Audio API, CSS keyframes, Intersection Observer API

---

## Scope

### 1. Content Fixes
- LinkedIn URL → `https://www.linkedin.com/in/connor-drainas-a3a306173/`
- trading-bot GitHub → `https://github.com/V0NOG/trading-bot-v2`
- osint GitHub → `https://github.com/V0NOG/osint`

### 2. Text Contrast (Accessibility)
- `text-neutral-600` → `text-neutral-400` on all body/description text site-wide
- `text-neutral-500` → `text-neutral-300` on secondary labels
- Ensures WCAG AA contrast on the dark background

### 3. Three New Projects
- **Jarvis** — Personal AI assistant, Python. Tags: Python, AI/ML. `https://github.com/V0NOG/jarvis`
- **Secure Chat v2** — E2E encrypted chat app. Tags: Security, Full Stack. `https://github.com/V0NOG/secure-chat-v2`
- **SaaS Quotation Tool** — TypeScript SaaS product. Tags: TypeScript, SaaS. `https://github.com/V0NOG/saasQuotation`

### 4. Kinetic Animations

**Hero (on page load):**
- Each word in the hero h1 is wrapped in a `<span>` and slides up + fades in, staggered by 80ms per word
- Sub-headline and CTA buttons fade in after the h1 completes

**Bento cards (on page load):**
- Cards cascade in from `translateX(-20px) opacity(0)` to natural position
- Staggered by 60ms per card index via CSS `animation-delay`
- Spring-like easing: `cubic-bezier(0.16, 1, 0.3, 1)`

**Card hover:**
- `transform: scale(1.025) translateY(-4px)`
- Blue border glow: `box-shadow: 0 0 0 1px rgba(59,130,246,0.3), 0 20px 40px rgba(0,0,0,0.4)`
- Transition: `0.2s cubic-bezier(0.34, 1.56, 0.64, 1)` (slight spring overshoot)

**Project detail page scroll reveals:**
- Sections (tags, h1, description, outcomes, tech stack) fade up as they enter viewport
- Intersection Observer triggers `animate-in` class, CSS handles the transition

### 5. Smooth Scroll (Lenis)
- Install `lenis` package
- Wrap in a client component `src/components/SmoothScroll.tsx` that initialises Lenis on mount
- Add to root layout — gives buttery inertia scroll feel site-wide
- Lenis integrates with native anchor links (#projects, #work, etc.)

### 6. Navbar Scroll Behaviour
- On scroll > 20px: backdrop blur increases, border appears (already partially done — refine)
- Nav links get a sliding underline on hover (CSS `::after` pseudo-element, width 0→100%)

### 7. Subtle UI Sounds
- `src/hooks/useSound.ts` — Web Audio API hook, generates tones programmatically
  - `playTick()`: 800Hz sine, 80ms decay — for nav link clicks
  - `playWhoosh()`: filtered noise 200→50Hz sweep, 300ms — for card cascade on load
- `src/components/SoundToggle.tsx` — speaker icon button in Nav
  - Default: **muted**
  - State in `localStorage` key `sound-enabled`
  - `aria-label="Toggle sound effects"`
- Sound context via React context so any component can call `playTick()`

---

## Files to Create
- `src/components/SmoothScroll.tsx`
- `src/components/SoundToggle.tsx`
- `src/hooks/useSound.ts`
- `src/context/SoundContext.tsx`

## Files to Modify
- `src/app/globals.css` — add animation keyframes and utility classes
- `src/app/layout.tsx` — add SmoothScroll and SoundContext provider
- `src/components/Hero.tsx` — word-split animation
- `src/components/Nav.tsx` — nav hover underlines, SoundToggle, sound on click
- `src/components/BentoGrid.tsx` — stagger animation on cards
- `src/components/cards/*.tsx` — hover scale/glow, contrast fixes
- `src/app/projects/[id]/page.tsx` — scroll reveal on sections
- `src/data/projects.ts` — LinkedIn fix, GitHub URL updates, 3 new projects
- `src/components/cards/ContactBar.tsx` — LinkedIn URL fix
