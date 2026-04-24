import { experience } from "@/data/experience";
import Nav from "@/components/Nav";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return experience.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = experience.find((r) => r.id === id);
  return {
    title: role
      ? `${role.title} — Connor Drainas`
      : "Experience — Connor Drainas",
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idx = experience.findIndex((r) => r.id === id);
  if (idx === -1) notFound();

  const role = experience[idx];
  const prev = idx > 0 ? experience[idx - 1] : null;
  const next = idx < experience.length - 1 ? experience[idx + 1] : null;

  const accentColors: Record<string, string> = {
    "freelance-2024": "#60a5fa",
    "cloudcase-2022": "#a78bfa",
    "self-2020": "#34d399",
    "speedy-2019": "#fbbf24",
    "cloudcase-2017": "#a78bfa",
    "axion-2015": "#737373",
  };
  const accent = accentColors[role.id] ?? "#60a5fa";

  return (
    <main className="min-h-screen">
      <Nav />
      <article className="max-w-4xl mx-auto px-8 pt-32 pb-24">

        {/* Top navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/#work"
            className="text-[10px] tracking-[2px] uppercase text-neutral-500 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span> Work History
          </Link>
          <div className="flex items-center gap-6">
            {prev && (
              <Link
                href={`/experience/${prev.id}`}
                className="text-[10px] tracking-[2px] uppercase text-neutral-600 hover:text-white transition-colors"
              >
                <span aria-hidden="true">←</span> {prev.company}
              </Link>
            )}
            {next && (
              <Link
                href={`/experience/${next.id}`}
                className="text-[10px] tracking-[2px] uppercase text-neutral-600 hover:text-white transition-colors"
              >
                {next.company} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>

        <ScrollReveal delay={0}>
          <p
            className="text-[10px] tracking-[2px] uppercase font-semibold mb-3"
            style={{ color: accent }}
          >
            {role.period}
          </p>

          <h1
            className="font-display font-black text-white leading-tight mb-3"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
          >
            {role.title}
          </h1>

          <p className="text-neutral-500 text-base mb-10">
            {role.company} · {role.location}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className="border-l-2 pl-6 mb-10"
            style={{ borderColor: accent + "60" }}
          >
            <p className="text-neutral-400 text-base leading-relaxed">{role.detail}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150} className="mb-10">
          <h2 className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-4">
            Responsibilities
          </h2>
          <ul className="space-y-3">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-neutral-400 text-sm">
                <span className="mt-0.5 shrink-0" style={{ color: accent }} aria-hidden="true">—</span>
                {bullet}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {role.tech.length > 0 && (
          <ScrollReveal delay={200} className="mb-16">
            <h2 className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-3">
              Tech & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {role.tech.map((t) => (
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

        {/* Bottom prev/next */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
          {prev ? (
            <Link
              href={`/experience/${prev.id}`}
              className="group bento-card p-5 flex flex-col gap-1 hover:border-white/15 transition-colors"
            >
              <span className="text-[9px] tracking-[2px] uppercase text-neutral-600 group-hover:text-neutral-400 transition-colors">
                <span aria-hidden="true">←</span> Previous
              </span>
              <span className="text-white text-sm font-medium">{prev.title}</span>
              <span className="text-neutral-600 text-xs">{prev.company}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/experience/${next.id}`}
              className="group bento-card p-5 flex flex-col gap-1 items-end text-right hover:border-white/15 transition-colors"
            >
              <span className="text-[9px] tracking-[2px] uppercase text-neutral-600 group-hover:text-neutral-400 transition-colors">
                Next <span aria-hidden="true">→</span>
              </span>
              <span className="text-white text-sm font-medium">{next.title}</span>
              <span className="text-neutral-600 text-xs">{next.company}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

      </article>
    </main>
  );
}
