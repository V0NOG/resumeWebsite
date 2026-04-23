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
