export default function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <section id="experience" aria-label="Portfolio sections" className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
      <div
        className="bento-grid grid gap-3"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "80px" }}
      >
        {children}
      </div>
    </section>
  );
}
