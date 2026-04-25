"use client";

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useSound } from "@/context/SoundContext";

export default function ContactBar() {
  const [open, setOpen] = useState(false);
  const [state, handleSubmit] = useForm("xaqavkwp");
  const { playClick, playSuccess } = useSound();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact", handler);
    return () => window.removeEventListener("open-contact", handler);
  }, []);

  // Play success sound when Formspree confirms submission
  useEffect(() => {
    if (state.succeeded) playSuccess();
  }, [state.succeeded, playSuccess]);

  return (
    <div
      id="contact"
      className="bento-card p-6"
      style={{ gridColumn: "span 12", gridRow: open ? "span 3" : "span 2" }}
    >
      {!open ? (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-full">
          <div>
            <p className="font-display font-bold text-white text-xl mb-1">
              Open to EU opportunities
            </p>
            <p className="text-neutral-400 text-xs">
              Greek–Australian dual citizen · Full EU right to work · Relocating August 2026
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="mailto:connor@drainas.com"
              onClick={playClick}
              className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-3 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              Email
            </a>
            <a
              href="https://github.com/V0NOG"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-3 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/connor-drainas-a3a306173/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-3 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              LinkedIn
            </a>
            <button
              onClick={() => { playClick(); setOpen(true); }}
              className="text-[10px] font-semibold tracking-[1.5px] uppercase px-5 py-2.5 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-display font-bold text-white text-lg">Send a message</p>
            <button
              onClick={() => { playClick(); setOpen(false); }}
              className="text-neutral-600 hover:text-white text-sm transition-colors"
              aria-label="Close contact form"
            >
              ✕
            </button>
          </div>

          {state.succeeded ? (
            <div className="bento-card p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse shrink-0" aria-hidden="true" />
                <p className="text-emerald-400 text-sm font-medium">Message received — thank you!</p>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed pl-4">
                I personally read every message and will get back to you within 24 hours.
                In the meantime, feel free to connect on{" "}
                <a href="https://www.linkedin.com/in/connor-drainas-a3a306173/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">LinkedIn</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-500/50"
                />
                <ValidationError field="name" errors={state.errors} className="text-red-400 text-[10px] px-1" />
              </div>

              <div className="flex flex-col gap-1">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-500/50"
                />
                <ValidationError field="email" errors={state.errors} className="text-red-400 text-[10px] px-1" />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <textarea
                  name="message"
                  required
                  rows={2}
                  placeholder="Message"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-500/50 resize-none"
                />
                <ValidationError field="message" errors={state.errors} className="text-red-400 text-[10px] px-1" />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={state.submitting}
                  onClick={playClick}
                  className="text-[11px] font-semibold tracking-[1px] uppercase bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 py-2.5 px-8"
                >
                  {state.submitting ? "Sending…" : "Send"}
                </button>
              </div>

              <ValidationError errors={state.errors} className="text-red-400 text-[10px] sm:col-span-2" />
            </form>
          )}
        </div>
      )}
    </div>
  );
}
