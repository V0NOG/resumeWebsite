"use client";

import { useEffect, useState } from "react";
import SoundToggle from "@/components/SoundToggle";
import { useSound } from "@/context/SoundContext";

const links = [
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { playTick, playClick } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Site navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Monogram */}
        <a
          href="#"
          aria-label="Home"
          onClick={playTick}
          className="font-display font-bold text-lg text-white tracking-tight"
        >
          C·D
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={playTick}
              className="nav-link py-1 text-[10px] font-medium tracking-[2px] uppercase text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: sound toggle + CTA */}
        <div className="flex items-center gap-4">
          <SoundToggle />
          <button
            onClick={() => {
              playClick();
              window.dispatchEvent(new CustomEvent("open-contact"));
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-2.5 rounded-full border border-white/15 text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}
