export default function AboutCard() {
  return (
    <div
      className="bento-card p-6 flex flex-col"
      style={{ gridColumn: "span 5", gridRow: "span 5" }}
    >
      <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-3">About</p>

      <h2 className="font-display font-bold text-xl text-white leading-snug mb-4">
        Building reliable software,<br />shipping to production.
      </h2>

      <p className="text-neutral-500 text-xs leading-relaxed mb-2">
        Dual Greek–Australian citizen with 6+ years building and shipping full-stack
        applications across finance and custom product environments.
      </p>
      <p className="text-neutral-500 text-xs leading-relaxed mb-2">
        Final semester of a Bachelor of CS (Cybersecurity major) at UoW. Greek citizenship
        gives full EU right to work.
      </p>
      <p className="text-neutral-500 text-xs leading-relaxed">
        Strong interest in AI-assisted development — using agentic workflows, LLM APIs,
        and tools like Claude Code to ship faster and more reliably.
      </p>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-emerald-400 tracking-[1px] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse" aria-hidden="true" />
        Open to work · Remote now
      </div>
    </div>
  );
}
