export default function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
      {/* Mobile: single-column stack */}
      <div className="flex flex-col gap-3 md:hidden">
        {children}
      </div>
      {/* Desktop: 12-column bento grid */}
      <div
        className="hidden md:grid gap-3"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "80px" }}
      >
        {children}
      </div>
    </section>
  );
}
