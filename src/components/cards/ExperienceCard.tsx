"use client";

import Link from "next/link";
import { experience } from "@/data/experience";
import { useSound } from "@/context/SoundContext";

const accents = [
  { dot: "bg-blue-400", topColor: "rgba(59,130,246,0.5)", bgGradient: "rgba(59,130,246,0.05)", glowBg: "rgba(59,130,246,0.08)", textColor: "#60a5fa" },
  { dot: "bg-purple-400", topColor: "rgba(139,92,246,0.5)", bgGradient: "rgba(139,92,246,0.05)", glowBg: "rgba(139,92,246,0.08)", textColor: "#a78bfa" },
  { dot: "bg-emerald-400", topColor: "rgba(34,197,94,0.5)", bgGradient: "rgba(34,197,94,0.05)", glowBg: "rgba(34,197,94,0.06)", textColor: "#34d399" },
  { dot: "bg-amber-400", topColor: "rgba(245,158,11,0.5)", bgGradient: "rgba(245,158,11,0.05)", glowBg: "rgba(245,158,11,0.06)", textColor: "#fbbf24" },
  { dot: "bg-purple-400", topColor: "rgba(139,92,246,0.5)", bgGradient: "rgba(139,92,246,0.05)", glowBg: "rgba(139,92,246,0.08)", textColor: "#a78bfa" },
  { dot: "bg-neutral-500", topColor: "rgba(115,115,115,0.4)", bgGradient: "rgba(115,115,115,0.03)", glowBg: "rgba(115,115,115,0.05)", textColor: "#737373" },
];

export default function ExperienceCard() {
  const { playClick } = useSound();

  return (
    <div
      id="work"
      role="region"
      aria-labelledby="work-history-heading"
      className="bento-card p-6"
      style={{ gridColumn: "span 12", gridRow: "span 4" }}
    >
      <h2 id="work-history-heading" className="text-[9px] tracking-[2.5px] uppercase text-neutral-400 mb-6">
        Work History
      </h2>

      <div className="relative">
        <div
          className="hidden sm:block absolute left-0 right-0 h-px"
          style={{
            top: "10px",
            background: "linear-gradient(to right, rgba(59,130,246,0.3), rgba(139,92,246,0.2), rgba(34,197,94,0.1), transparent)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-stretch">
          {experience.map((role, i) => {
            const accent = accents[i] ?? accents[accents.length - 1];
            return (
              <div
                key={role.id}
                className="relative flex flex-col"
                style={{
                  animation: "cascadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Timeline dot */}
                <div
                  className="w-5 h-5 rounded-full mb-3 flex items-center justify-center relative z-10 shrink-0"
                  style={{ background: accent.glowBg }}
                >
                  <div className={`w-2 h-2 rounded-full ${accent.dot} ${i === 0 ? "pulse" : ""}`} />
                </div>

                {/* Role card — navigates to detail page */}
                <Link
                  href={`/experience/${role.id}`}
                  onClick={playClick}
                  className="block rounded-xl p-3 border border-white/5 hover:border-white/15 transition-colors group flex-1"
                  style={{
                    borderTopColor: accent.topColor,
                    borderTopWidth: "2px",
                    background: `linear-gradient(160deg, ${accent.bgGradient} 0%, transparent 60%)`,
                  }}
                >
                  <p className="text-[9px] tracking-[1.5px] uppercase font-semibold mb-1" style={{ color: accent.textColor }}>
                    {role.period}
                  </p>
                  <h3 className="text-white text-[11px] font-semibold leading-tight mb-1">{role.title}</h3>
                  <p className="text-neutral-600 text-[10px] mb-2">{role.company} · {role.location}</p>
                  <p className="text-neutral-400 text-[10px] leading-relaxed">{role.bullets[0]}</p>
                  <p
                    className="text-[8px] tracking-[1px] uppercase mt-2 opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ color: accent.textColor }}
                  >
                    details →
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
