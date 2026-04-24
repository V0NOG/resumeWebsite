"use client";

import { useSound } from "@/context/SoundContext";

export default function SoundToggle() {
  const { muted, toggle } = useSound();

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Enable sound effects" : "Disable sound effects"}
      title={muted ? "Enable sound" : "Disable sound"}
      className="text-[18px] text-neutral-600 hover:text-neutral-300 transition-colors leading-none"
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
