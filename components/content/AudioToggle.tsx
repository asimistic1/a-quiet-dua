"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ui } from "@/lib/copy";
import { palette } from "@/lib/palette";

type Props = {
  isDawn: boolean;
};

export default function AudioToggle({ isDawn }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const rampRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    const onReady = () => setAvailable(true);
    const onError = () => setAvailable(false);

    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("error", onError);
    audioRef.current = audio;

    // Probe availability without playing
    audio.load();

    return () => {
      if (rampRef.current) cancelAnimationFrame(rampRef.current);
      audio.pause();
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  const rampVolume = useCallback((from: number, to: number, thenPause = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (rampRef.current) cancelAnimationFrame(rampRef.current);

    const start = performance.now();
    const duration = 2000;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      audio.volume = from + (to - from) * t;
      if (t < 1) {
        rampRef.current = requestAnimationFrame(step);
      } else if (thenPause) {
        audio.pause();
      }
    };

    rampRef.current = requestAnimationFrame(step);
  }, []);

  const toggle = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !available) return;

    try {
      if (playing) {
        setPlaying(false);
        rampVolume(audio.volume, 0, true);
      } else {
        audio.volume = 0;
        await audio.play();
        setPlaying(true);
        rampVolume(0, 0.3);
      }
    } catch {
      setAvailable(false);
      setPlaying(false);
    }
  };

  if (!available) return null;

  const Icon = playing ? Volume2 : VolumeX;
  const color = isDawn ? palette.ink : palette.silver;

  return (
    <button
      type="button"
      aria-label={playing ? ui.audioMute : ui.audioPlay}
      aria-pressed={playing}
      onClick={toggle}
      className="absolute top-[max(1.25rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-20 flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-90"
      style={{ color, opacity: 0.5 }}
    >
      <Icon size={18} strokeWidth={1.4} />
    </button>
  );
}
