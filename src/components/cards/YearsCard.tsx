export default function YearsCard() {
  return (
    <div
      className="bento-card p-6 flex flex-col justify-between"
      style={{ gridColumn: "span 3", gridRow: "span 4" }}
    >
      <div>
        <p className="text-[9px] tracking-[2.5px] uppercase text-neutral-600 mb-3">Experience</p>
        <p className="font-display font-black text-white leading-none" style={{ fontSize: "52px" }}>
          6+
        </p>
        <p className="text-neutral-600 text-xs mt-1">years in production</p>
      </div>
      <p className="text-[10px] tracking-[1px] uppercase text-neutral-700">2015 → Present</p>
    </div>
  );
}
