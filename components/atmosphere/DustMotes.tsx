"use client";

import { useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";
import { palette } from "@/lib/palette";

type Props = {
  chapter: number;
};

type Mote = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
};

export default function DustMotes({ chapter }: Props) {
  const reduced = useReducedMotion();
  const isPlain = chapter === 2;
  const isYears = chapter === 3;

  const motes = useMemo<Mote[]>(() => {
    const seeded = (n: number) => {
      const x = Math.sin(n * 19.123) * 43758.5453;
      return x - Math.floor(x);
    };

    const count = isYears ? 14 : 16;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: seeded(i + 1) * 100,
      size: 1 + seeded(i + 20) * 1.2,
      duration: 22 + seeded(i + 40) * 18,
      delay: seeded(i + 60) * 20,
      opacity: isYears ? 0.08 : 0.1 + seeded(i + 80) * 0.15,
      color: isYears ? palette.silver : palette.gold,
    }));
  }, [isYears]);

  if (isPlain || reduced || chapter === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((mote) => (
        <span
          key={mote.id}
          className="mote-drift absolute bottom-0 rounded-full"
          style={
            {
              left: `${mote.left}%`,
              width: mote.size,
              height: mote.size,
              background: mote.color,
              opacity: mote.opacity,
              filter: "blur(1px)",
              ["--mote-duration" as string]: `${mote.duration}s`,
              ["--mote-delay" as string]: `${mote.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
