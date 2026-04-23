"use client";

import { useState } from "react";

const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

export default function ContactBar() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id="contact"
      className="bento-card p-6"
      style={{ gridColumn: "span 12", gridRow: "span 2" }}
    >
      {!open ? (
        <div className="flex items-center justify-between h-full">
          <div>
            <p className="font-display font-bold text-white text-xl mb-1">
              Open to EU opportunities
            </p>
            <p className="text-neutral-600 text-xs">
              Greek–Australian dual citizen · Full EU right to work · Relocating September 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:connor@drainas.com"
              className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              connor@drainas.com
            </a>
            <a
              href="https://github.com/V0NOG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN_SLUG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-wide uppercase text-neutral-500 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              LinkedIn
            </a>
            <button
              onClick={() => setOpen(true)}
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
              onClick={() => setOpen(false)}
              className="text-neutral-600 hover:text-white text-sm transition-colors"
              aria-label="Close contact form"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-3">
            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 col-span-1"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 col-span-1"
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="text-[11px] font-semibold tracking-[1px] uppercase bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 col-span-1"
            >
              {status === "idle" && "Send"}
              {status === "sending" && "Sending…"}
              {status === "sent" && "Sent ✓"}
              {status === "error" && "Error — retry"}
            </button>
            <textarea
              name="message"
              required
              rows={2}
              placeholder="Message"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 col-span-3 resize-none"
            />
          </form>
        </div>
      )}
    </div>
  );
}
