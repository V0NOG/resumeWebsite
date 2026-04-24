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
