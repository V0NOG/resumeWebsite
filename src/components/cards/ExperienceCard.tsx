import { experience } from "@/data/experience";

export default function ExperienceCard() {
  return (
    <div
      id="work"
      role="region"
      aria-labelledby="work-history-heading"
      className="bento-card p-6"
      style={{ gridColumn: "span 12", gridRow: "span 5" }}
    >
      <h2 id="work-history-heading" className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-6">
        Work History
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experience.map((role, i) => (
          <div key={role.id} className="border-l border-white/5 pl-4">
            <div
              className={`w-1.5 h-1.5 rounded-full mb-3 ${
                i === 0 ? "bg-blue-400" : "bg-neutral-700"
              }`}
              aria-hidden="true"
            />
            {i === 0 && <span className="sr-only">Current role</span>}
            <h3 className="text-white text-sm font-medium leading-tight">{role.title}</h3>
            <p
              className="text-neutral-500 text-xs mt-0.5 mb-2"
              aria-label={`${role.company}, ${role.location}`}
            >
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
