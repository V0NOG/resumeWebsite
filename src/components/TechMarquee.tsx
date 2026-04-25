const items = [
  "React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL",
  "MongoDB", "Docker", "AWS", "GraphQL", "Linux", "Bash", "Git",
  "FastAPI", "WebSockets", "Prompt Engineering", "Agentic Workflows",
];

function MarqueeTrack() {
  const repeated = [...items, ...items];
  return (
    <div className="flex gap-10 shrink-0 animate-marquee">
      {repeated.map((item, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-[10px] tracking-[2px] uppercase text-neutral-600">{item}</span>
          <span className="text-neutral-800" aria-hidden="true">·</span>
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-6 mb-6 border-y border-white/5" aria-hidden="true">
      <div className="flex gap-10">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{ background: "linear-gradient(to right, var(--canvas), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{ background: "linear-gradient(to left, var(--canvas), transparent)" }} />
    </div>
  );
}
