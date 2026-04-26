"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import { experience } from "@/data/experience";
import { coreSkills, securitySkills, aiSkills } from "@/data/skills";
import { useSound } from "@/context/SoundContext";

export default function ResumePage() {
  const { playClick } = useSound();

  return (
    <main className="min-h-screen">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-16 md:pb-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 pb-10 border-b border-white/5">
          <div>
            <h1 className="font-display font-black text-white leading-tight mb-3" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Connor Drainas
            </h1>
            <p className="text-neutral-400 text-sm mb-4">
              Full Stack Engineer · Cloud Infrastructure · Cybersecurity
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] tracking-wide text-neutral-500">
              <a href="mailto:connor@drainas.com" className="hover:text-white transition-colors">
                connor@drainas.com
              </a>
              <a href="https://github.com/V0NOG" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                github.com/V0NOG
              </a>
              <a href="https://www.linkedin.com/in/connor-drainas-a3a306173/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <span>Sydney, Australia</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:items-end shrink-0">
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 tracking-[1px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse" aria-hidden="true" />
              Open to EU roles
            </div>
            <span className="text-[9px] text-neutral-600 tracking-wide">
              Greek EU Citizen &amp; Australian Citizen · Full EU right to work
            </span>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-12">
          <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-4">Summary</p>
          <p className="text-neutral-300 text-sm leading-relaxed border-l-2 border-blue-500/30 pl-5 max-w-2xl">
            6+ years delivering production-grade full-stack applications across finance and
            custom product environments. Final semester of a Bachelor of Computer Science
            (Cybersecurity major) at the University of Wollongong. Experienced across the full
            delivery lifecycle — architecture, development, AWS deployment, and ongoing support.
            Practitioner of AI-assisted development: agentic workflows, LLM APIs, and tools
            like Claude Code to accelerate delivery without sacrificing quality.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-8">Experience</p>
          <div className="space-y-10">
            {experience.map((role, i) => {
              const colors = ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#a78bfa", "#737373"];
              const accent = colors[i] ?? "#60a5fa";
              return (
                <div key={role.id} className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-2 md:gap-6 border-l-2 pl-5" style={{ borderColor: accent + "40" }}>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-0.5">{role.title}</h3>
                    <p className="text-neutral-500 text-xs mb-3">{role.company} · {role.location}</p>
                    <ul className="space-y-1.5">
                      {role.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-neutral-400 text-xs leading-relaxed">
                          <span className="shrink-0 mt-0.5" style={{ color: accent }} aria-hidden="true">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {role.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded border border-white/5 text-neutral-600">{t}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-600 text-[10px] tracking-wide md:text-right md:pt-0.5">{role.period}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-4">Technical Skills</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {coreSkills.map((s) => (
              <span key={s.label} className={`text-[10px] px-2 py-0.5 rounded border ${s.color} ${s.bg} ${s.border}`}>
                {s.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {securitySkills.map((s) => (
              <span key={s.label} className={`text-[10px] px-2 py-0.5 rounded border ${s.color} ${s.bg} ${s.border}`}>
                {s.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {aiSkills.map((s) => (
              <span key={s.label} className={`text-[10px] px-2 py-0.5 rounded border ${s.color} ${s.bg} ${s.border}`}>
                {s.label}
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-500 mb-6">Education</p>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-l-2 border-purple-500/30 pl-5">
              <div>
                <h3 className="text-white text-sm font-semibold mb-0.5">
                  Bachelor of Computer Science — Cybersecurity Major
                </h3>
                <p className="text-neutral-500 text-xs">University of Wollongong</p>
              </div>
              <p className="text-neutral-600 text-[10px] tracking-wide shrink-0">2021 – Present</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-l-2 border-purple-500/20 pl-5">
              <div>
                <h3 className="text-white text-sm font-semibold mb-0.5">
                  Diploma of Information Technology
                </h3>
                <p className="text-neutral-500 text-xs">University of Wollongong</p>
              </div>
              <p className="text-neutral-600 text-[10px] tracking-wide shrink-0">2019 – 2021</p>
            </div>
          </div>
        </section>

        {/* Footer actions */}
        <div className="print-hide flex flex-wrap items-center gap-6 pt-8 border-t border-white/5">
          <Link
            href="/"
            onClick={playClick}
            className="text-[10px] tracking-[2px] uppercase text-neutral-500 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span> Back to portfolio
          </Link>
          <button
            onClick={() => { playClick(); window.print(); }}
            className="text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-2.5 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            Print / Save PDF
          </button>
          <a
            href="mailto:connor@drainas.com"
            onClick={playClick}
            className="text-[10px] tracking-[1.5px] uppercase text-neutral-400 hover:text-white transition-colors"
          >
            Get in Touch →
          </a>
        </div>

      </div>
    </main>
  );
}
