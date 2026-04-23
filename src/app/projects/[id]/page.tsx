import { projects } from "@/data/projects";
import Nav from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return {
    title: project
      ? `${project.name} — Connor Drainas`
      : "Project — Connor Drainas",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <main className="min-h-screen">
      <Nav />
      <article className="max-w-4xl mx-auto px-8 pt-32 pb-24">

        <Link
          href="/#projects"
          className="text-[10px] tracking-[2px] uppercase text-neutral-600 hover:text-white transition-colors mb-12 block"
        >
          ← Back to projects
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className={`text-[9px] tracking-[1px] uppercase font-semibold px-2 py-0.5 rounded ${tag.color} ${tag.bg}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <h1
          className="font-display font-black text-white leading-tight mb-4"
          style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          {project.name}
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-2xl">
          {project.description}
        </p>

        {project.image && (
          <div className="bento-card overflow-hidden mb-10 aspect-video relative">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="border-l border-white/5 pl-6 mb-10">
          <p className="text-neutral-500 text-base leading-relaxed">{project.detail}</p>
        </div>

        {project.outcomes.length > 0 && (
          <div className="mb-10">
            <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-4">
              Key Points
            </p>
            <ul className="space-y-3">
              {project.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-500 text-sm">
                  <span className="text-blue-400 mt-0.5 shrink-0" aria-hidden="true">—</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.tech.length > 0 && (
          <div className="mb-10">
            <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-3 py-1 rounded-full border border-white/10 text-neutral-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 pt-6 border-t border-white/5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold tracking-[1.5px] uppercase px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
            >
              Visit Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[1.5px] uppercase text-neutral-500 hover:text-white transition-colors"
            >
              View on GitHub →
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
