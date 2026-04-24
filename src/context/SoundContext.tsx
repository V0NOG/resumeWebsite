"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type SoundCtx = {
  muted: boolean;
  toggle: () => void;
  playTick: () => void;
  playWhoosh: () => void;
  playClick: () => void;
  playSuccess: () => void;
};

const SoundContext = createContext<SoundCtx>({
  muted: false,
  toggle: () => {},
  playTick: () => {},
  playWhoosh: () => {},
  playClick: () => {},
  playSuccess: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const acRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (localStorage.getItem("sound-enabled") === "false") setMuted(true);
  }, []);

  const getAC = useCallback(() => {
    if (!acRef.current) {
      try {
        acRef.current = new AudioContext();
      } catch {
        return null;
      }
    }
    return acRef.current;
  }, []);

  // Safari requires resume() to be called synchronously within the gesture —
  // using .then() breaks out of the gesture scope and blocks audio.
  const withAC = useCallback(
    (fn: (ac: AudioContext) => void) => {
      if (muted) return;
      const ac = getAC();
      if (!ac) return;
      if (ac.state === "suspended") {
        ac.resume(); // fire synchronously — do NOT await
      }
      fn(ac); // schedule audio immediately in the same call stack
    },
    [muted, getAC]
  );

  const playTick = useCallback(() => {
    withAC((ac) => {
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
    });
  }, [withAC]);

  const playClick = useCallback(() => {
    withAC((ac) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.frequency.value = 600;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.08, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.12);
    });
  }, [withAC]);

  const playWhoosh = useCallback(() => {
    withAC((ac) => {
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
    });
  }, [withAC]);

  const playSuccess = useCallback(() => {
    withAC((ac) => {
      [523, 659, 784].forEach((freq, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        const t = ac.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    });
  }, [withAC]);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("sound-enabled", String(!next));
      return next;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ muted, toggle, playTick, playWhoosh, playClick, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
