"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type SoundCtx = {
  muted: boolean;
  toggle: () => void;
  playTick: () => void;
  playWhoosh: () => void;
};

const SoundContext = createContext<SoundCtx>({
  muted: true,
  toggle: () => {},
  playTick: () => {},
  playWhoosh: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(true);
  const acRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (localStorage.getItem("sound-enabled") === "true") setMuted(false);
  }, []);

  const getAC = useCallback(() => {
    if (!acRef.current) acRef.current = new AudioContext();
    return acRef.current;
  }, []);

  const playTick = useCallback(() => {
    if (muted) return;
    const ac = getAC();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.frequency.value = 900;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.06, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.07);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.07);
  }, [muted, getAC]);

  const playWhoosh = useCallback(() => {
    if (muted) return;
    const ac = getAC();
    const bufferSize = Math.floor(ac.sampleRate * 0.35);
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source = ac.createBufferSource();
    source.buffer = buffer;

    const filter = ac.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, ac.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.35);
    filter.Q.value = 0.4;

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.05, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    source.start();
  }, [muted, getAC]);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("sound-enabled", String(next));
      return !next;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ muted, toggle, playTick, playWhoosh }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
