export default function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-24">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "80px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
