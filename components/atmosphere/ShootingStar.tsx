"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { palette } from "@/lib/palette";

type Props = {
  chapter: number;
};

export default function ShootingStar({ chapter }: Props) {
  const reduced = useReducedMotion();
  const enabled = (chapter === 1 || chapter === 3) && !reduced;
  const [shot, setShot] = useState<{
    id: number;
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let waitTimer = 0;
    let clearTimer = 0;

    const schedule = () => {
      const wait = 22000 + Math.random() * 8000;
      waitTimer = window.setTimeout(() => {
        if (cancelled) return;
        setShot({
          id: Date.now(),
          top: 8 + Math.random() * 22,
          left: 10 + Math.random() * 55,
        });
        clearTimer = window.setTimeout(() => {
          if (cancelled) return;
          setShot(null);
          schedule();
        }, 800);
      }, wait);
    };

    schedule();

    return () => {
      cancelled = true;
      window.clearTimeout(waitTimer);
      window.clearTimeout(clearTimer);
    };
  }, [enabled]);

  if (!enabled || !shot) return null;

  return (
    <div
      key={shot.id}
      className="shooting-star pointer-events-none absolute h-px origin-left"
      aria-hidden
      style={{
        top: `${shot.top}%`,
        left: `${shot.left}%`,
        width: 72,
        background: `linear-gradient(90deg, ${palette.gold}, transparent)`,
        boxShadow: `0 0 6px ${palette.gold}55`,
        transform: "rotate(28deg)",
      }}
    />
  );
}
