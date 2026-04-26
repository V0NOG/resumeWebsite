"use client";

import { useSound } from "@/context/SoundContext";

export default function Hero() {
  const { playClick, playTick } = useSound();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">

      {/* Eyebrow */}
      <p
        className="hero-line flex items-center gap-4 mb-8 text-neutral-400 text-[10px] tracking-[3px] uppercase"
        style={{ animationDelay: "0ms" }}
      >
        <span className="w-8 h-px bg-neutral-700 block" />
        Available · Greek EU Citizen · Australian Citizen
      </p>

      {/* Headline */}
      <h1
        className="font-display font-black leading-[0.95] tracking-[-2px] mb-14"
        style={{ fontSize: "clamp(48px, 7.5vw, 110px)" }}
      >
        <span className="text-stroke hero-line" style={{ animationDelay: "80ms" }}>FULL STACK</span>
        <span className="text-white hero-line" style={{ animationDelay: "200ms" }}>SOFTWARE ENGINEER</span>
        <span className="text-stroke-blue hero-line" style={{ animationDelay: "320ms" }}>+ CLOUD</span>
      </h1>

      {/* Bio */}
      <p
        className="hero-line text-neutral-300 text-sm leading-relaxed border-l border-neutral-800 pl-5 max-w-xs mb-14"
        style={{ animationDelay: "420ms" }}
      >
        Connor Drainas — 6+ years shipping production SaaS across finance and custom
        product environments. React, Node.js, AWS, Docker. Experienced building
        agentic systems and LLM-powered workflows — shipping faster with Claude Code
        and modern AI tooling.
      </p>

      {/* CTA buttons — no hero-line class (that sets display:block, breaking flex) */}
      <div
        className="flex items-center gap-4"
        style={{ animation: "heroWordIn 0.8s cubic-bezier(0.16,1,0.3,1) 560ms both" }}
      >
        <a
          href="/#projects"
          onClick={playClick}
          className="text-[11px] font-semibold tracking-[1.5px] uppercase px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
        >
          View Projects
        </a>
        <a
          href="/resume.pdf"
          download="Connor_Drainas_Resume.pdf"
          onClick={playTick}
          className="text-[11px] tracking-[1.5px] uppercase text-neutral-400 hover:text-white transition-colors"
        >
          <span aria-hidden="true">↓ </span>Download CV
        </a>
      </div>
    </section>
  );
}
