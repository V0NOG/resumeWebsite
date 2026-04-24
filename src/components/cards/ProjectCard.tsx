"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  colSpan: number;
  rowSpan: number;
};

export default function ProjectCard({ project, colSpan, rowSpan }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bento-card p-5 flex flex-col overflow-hidden"
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

      {expanded && (
        <p className="text-neutral-500 text-xs leading-relaxed mb-3 border-t border-white/5 pt-3">
          {project.detail}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 flex-wrap">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.name}`}
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
            className="text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors tracking-wide"
          >
            GitHub <span aria-hidden="true">→</span>
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          aria-label={`Details — ${project.name}`}
          className="text-[10px] text-neutral-500 hover:text-white transition-colors tracking-wide"
        >
          Details <span aria-hidden="true">→</span>
        </Link>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto text-[9px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wide"
          aria-expanded={expanded}
        >
          {expanded ? "▲ Less" : "▼ More"}
        </button>
      </div>
    </div>
  );
}
