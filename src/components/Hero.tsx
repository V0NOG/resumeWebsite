export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-8 md:px-16 max-w-7xl mx-auto">

      {/* Eyebrow */}
      <p className="flex items-center gap-4 mb-8 text-neutral-400 text-[10px] tracking-[3px] uppercase">
        <span className="w-8 h-px bg-neutral-700 block" />
        Available · Dual EU Citizen · Relocating Europe August 2026
      </p>

      {/* Editorial display type — Chiara Luzzana style */}
      <h1 className="font-display font-black leading-[0.95] tracking-[-2px] mb-10"
           style={{ fontSize: "clamp(48px, 7.5vw, 110px)" }}>
        <span className="text-stroke block">FULL STACK</span>
        <span className="text-white block">SOFTWARE ENGINEER</span>
        <span className="text-stroke-blue block">+ CLOUD</span>
      </h1>

      {/* Sub-row */}
      <div className="flex flex-col md:flex-row gap-8 md:items-center">
        <p className="text-neutral-300 text-sm leading-relaxed border-l border-neutral-800 pl-5 max-w-xs">
          Connor Drainas — 6+ years shipping production SaaS across finance and custom
          product environments. React, Node.js, AWS, Docker.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#projects"
            className="text-[11px] font-semibold tracking-[1.5px] uppercase px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download="Connor_Drainas_Resume.pdf"
            className="text-[11px] tracking-[1.5px] uppercase text-neutral-400 hover:text-white transition-colors"
          >
            <span aria-hidden="true">↓ </span>Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
