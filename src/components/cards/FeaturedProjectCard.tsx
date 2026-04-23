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

      <h3 className="font-display font-bold text-white text-2xl mb-3 leading-tight">
        {project.name}
      </h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-2">{project.description}</p>
      <p className="text-neutral-600 text-xs leading-relaxed">{project.detail}</p>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[1px] uppercase text-blue-400 hover:text-blue-300 transition-colors"
          >
            View on GitHub →
          </a>
        )}
        <p className="text-[9px] text-neutral-700 tracking-wide">
          Risk mgmt · Anti-overfitting · Pure Python
        </p>
      </div>
    </div>
  );
}
