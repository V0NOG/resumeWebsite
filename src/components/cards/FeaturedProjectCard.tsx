"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { useSound } from "@/context/SoundContext";

export default function FeaturedProjectCard() {
  const project = projects.find((p) => p.featured);
  const { playTick, playClick } = useSound();
  if (!project) return null;

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

      <h3 className="font-display font-bold text-white text-2xl mb-2 leading-tight">
        {project.name}
      </h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-3">{project.description}</p>

      <ul className="space-y-1.5 mb-3">
        {project.outcomes.slice(0, 2).map((outcome) => (
          <li key={outcome} className="flex items-start gap-2 text-neutral-600 text-xs">
            <span className="text-blue-400 shrink-0" aria-hidden="true">—</span>
            {outcome}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            onClick={playTick}
            className="text-[10px] tracking-[1px] uppercase text-blue-400 hover:text-blue-300 transition-colors"
          >
            GitHub <span aria-hidden="true">→</span>
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          aria-label={`Full case study — ${project.name}`}
          onClick={playClick}
          className="text-[10px] tracking-[1px] uppercase text-neutral-500 hover:text-white transition-colors"
        >
          Full case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
