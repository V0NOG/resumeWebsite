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
