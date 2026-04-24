"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { useSound } from "@/context/SoundContext";

type Props = {
  project: Project;
  colSpan: number;
  rowSpan: number;
};

export default function ProjectCard({ project, colSpan, rowSpan }: Props) {
  const { playTick, playClick } = useSound();

  return (
    <div
      className="bento-card p-5 flex flex-col"
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
    >
      <div className="flex flex-wrap gap-1.5 mb-2">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            className={`text-[9px] tracking-[1px] uppercase font-semibold px-1.5 py-0.5 rounded ${tag.color} ${tag.bg}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <h3 className="font-display font-bold text-white text-base leading-tight mb-1">
        {project.name}
      </h3>
      <p className="text-neutral-400 text-xs leading-relaxed mb-3">{project.description}</p>

      <div className="mt-auto flex items-center gap-3 flex-wrap">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.name}`}
            onClick={playTick}
            className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors tracking-wide"
          >
            Visit <span aria-hidden="true">→</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            onClick={playTick}
            className="text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors tracking-wide"
          >
            GitHub <span aria-hidden="true">→</span>
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          aria-label={`Details — ${project.name}`}
          onClick={playClick}
          className="text-[10px] text-neutral-500 hover:text-white transition-colors tracking-wide"
        >
          Details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
