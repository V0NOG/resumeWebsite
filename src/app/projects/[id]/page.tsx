import { projects } from "@/data/projects";
import Nav from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";

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
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) notFound();

  const project = projects[idx];
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <main className="min-h-screen">
      <Nav />
      <article className="max-w-4xl mx-auto px-8 pt-32 pb-24">

        {/* Top navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/#projects"
            className="text-[10px] tracking-[2px] uppercase text-neutral-500 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>
          <div className="flex items-center gap-6">
            {prev && (
              <Link
                href={`/projects/${prev.id}`}
                className="text-[10px] tracking-[2px] uppercase text-neutral-600 hover:text-white transition-colors"
              >
                <span aria-hidden="true">←</span> {prev.name}
              </Link>
            )}
            {next && (
              <Link
                href={`/projects/${next.id}`}
                className="text-[10px] tracking-[2px] uppercase text-neutral-600 hover:text-white transition-colors"
              >
                {next.name} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>

        <ScrollReveal delay={0}>
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
        </ScrollReveal>

        {project.image && (
          <ScrollReveal delay={100} className="mb-10">
            <div className="bento-card overflow-hidden aspect-video relative">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={150}>
          <div className="border-l border-white/5 pl-6 mb-10">
            <p className="text-neutral-400 text-base leading-relaxed">{project.detail}</p>
          </div>
        </ScrollReveal>

        {project.outcomes.length > 0 && (
          <ScrollReveal delay={200} className="mb-10">
            <h2 className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-4">
              Key Points
            </h2>
            <ul className="space-y-3">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-neutral-400 text-sm">
                  <span className="text-blue-400 mt-0.5 shrink-0" aria-hidden="true">—</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        )}

        {project.tech.length > 0 && (
          <ScrollReveal delay={250} className="mb-10">
            <h2 className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-3">
              Tech Stack
            </h2>
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
          </ScrollReveal>
        )}

        <ScrollReveal delay={300}>
          <div className="flex items-center gap-6 pt-6 border-t border-white/5 mb-16">
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
                className="text-[11px] tracking-[1.5px] uppercase text-neutral-400 hover:text-white transition-colors"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </ScrollReveal>

        {/* Bottom prev/next navigation */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              className="group bento-card p-5 flex flex-col gap-1 hover:border-white/15 transition-colors"
            >
              <span className="text-[9px] tracking-[2px] uppercase text-neutral-600 group-hover:text-neutral-400 transition-colors">
                <span aria-hidden="true">←</span> Previous
              </span>
              <span className="text-white text-sm font-medium">{prev.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.id}`}
              className="group bento-card p-5 flex flex-col gap-1 items-end text-right hover:border-white/15 transition-colors"
            >
              <span className="text-[9px] tracking-[2px] uppercase text-neutral-600 group-hover:text-neutral-400 transition-colors">
                Next <span aria-hidden="true">→</span>
              </span>
              <span className="text-white text-sm font-medium">{next.name}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

      </article>
    </main>
  );
}
