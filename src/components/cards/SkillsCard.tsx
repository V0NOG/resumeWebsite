import { coreSkills, securitySkills, aiSkills } from "@/data/skills";

export default function SkillsCard() {
  return (
    <div
      id="skills"
      className="bento-card p-4"
      style={{ gridColumn: "span 4", gridRow: "span 5" }}
    >
      <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-400 mb-1.5">Core Skills</p>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
        {[
          { label: "Core Dev", dot: "bg-blue-400" },
          { label: "Infra", dot: "bg-emerald-400" },
          { label: "Security", dot: "bg-amber-400" },
          { label: "AI", dot: "bg-sky-400" },
        ].map(({ label, dot }) => (
          <span key={label} className="flex items-center gap-1 text-[8px] tracking-[1.5px] uppercase text-neutral-600">
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1 mb-2">
        {coreSkills.map((skill) => (
          <span
            key={skill.label}
            className={`text-[10px] px-2 py-0.5 rounded ${skill.color} ${skill.bg} border ${skill.border}`}
          >
            {skill.label}
          </span>
        ))}
      </div>

      <div className="border-t border-white/5 pt-2 mb-2">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-700 mb-1.5">Security</p>
        <div className="flex flex-wrap gap-1">
          {securitySkills.map((skill) => (
            <span
              key={skill.label}
              className={`text-[10px] px-2 py-0.5 rounded ${skill.color} ${skill.bg} border ${skill.border}`}
            >
              {skill.label}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-2">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-700 mb-1.5">AI & Agentic</p>
        <div className="flex flex-wrap gap-1">
          {aiSkills.map((skill) => (
            <span
              key={skill.label}
              className={`text-[10px] px-2 py-0.5 rounded ${skill.color} ${skill.bg} border ${skill.border}`}
            >
              {skill.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
