"use client";

import { useEffect, useRef } from "react";

export default function BentoGrid({ children }: { children: React.ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.children) as HTMLElement[];

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition =
        "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay ?? 0);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card, i) => {
      card.dataset.revealDelay = String(Math.min(i * 55, 400));
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      aria-label="Portfolio sections"
      className="max-w-7xl mx-auto px-4 md:px-8 pb-24"
    >
      <div
        ref={gridRef}
        className="bento-grid grid gap-4"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "80px" }}
      >
        {children}
      </div>
    </section>
  );
}
