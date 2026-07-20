"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { starOpacity } from "@/lib/palette";

type Props = {
  chapter: number;
};

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  glint: boolean;
};

export default function Stars({ chapter }: Props) {
  const reduced = useReducedMotion();

  const stars = useMemo<Star[]>(() => {
    const seeded = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    const sizes = [0.8, 1.1, 1.5] as const;

    return Array.from({ length: 60 }, (_, i) => {
      const tier = i % 3;
      const size = sizes[tier]!;
      return {
        id: i,
        x: seeded(i + 1) * 100,
        y: seeded(i + 41) * 92,
        size,
        duration: 3 + seeded(i + 77) * 3,
        delay: seeded(i + 113) * 4,
        glint: tier === 2,
      };
    });
  }, []);

  const opacity = starOpacity[Math.min(chapter, starOpacity.length - 1)] ?? 0;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      animate={{ opacity }}
      transition={{ duration: reduced ? 0.5 : 2.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: star.glint
              ? "0 0 4px rgba(255,255,255,0.55), 0 0 1px 3px rgba(255,255,255,0.08)"
              : undefined,
          }}
          animate={reduced ? { opacity: 0.25 } : { opacity: [0.15, 0.9, 0.15] }}
          transition={
            reduced
              ? { duration: 0.5 }
              : {
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </motion.div>
  );
}
