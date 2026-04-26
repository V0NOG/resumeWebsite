"use client";

import { useEffect, useState } from "react";
import SoundToggle from "@/components/SoundToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useSound } from "@/context/SoundContext";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { playTick, playClick } = useSound();
  const { theme } = useTheme();

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
        scrolled || mobileOpen
          ? theme === "light"
            ? "bg-white/95 backdrop-blur-md border-b border-black/5"
            : "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
        {/* Monogram — always goes home */}
        <a
          href="/"
          aria-label="Home"
          onClick={playTick}
          className="font-display font-bold text-lg text-white tracking-tight"
        >
          <span className="hidden md:inline tracking-[2px] text-sm">CONNOR DRAINAS</span>
          <span className="md:hidden">C·D</span>
        </a>

        {/* Desktop links */}
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SoundToggle />
          <button
            onClick={() => {
              playClick();
              window.dispatchEvent(new CustomEvent("open-contact"));
            }}
            className="hidden md:block text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-2.5 rounded-full border border-white/15 text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            Hire Me
          </button>

          {/* Hamburger */}
          <button
            onClick={() => { playTick(); setMobileOpen(!mobileOpen); }}
            className="md:hidden flex flex-col justify-center gap-[5px] p-1 w-8 h-8"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { playTick(); setMobileOpen(false); }}
              className="text-[11px] font-medium tracking-[2px] uppercase text-neutral-400 hover:text-white transition-colors w-fit"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              playClick();
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent("open-contact"));
            }}
            className="mt-1 text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-3 rounded-full border border-white/15 text-white hover:bg-white hover:text-black transition-all w-fit"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}
