"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";

type Props = {
  active: boolean;
};

/**
 * Screen 3 — weight / remorse atmosphere.
 * Descending ash, mauve pressure bands, silver breath — distinct from QuietNight.
 */
export default function WeightNight({ active }: Props) {
  const reduced = useReducedMotion();

  const ash = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: 3 + ((i * 17) % 94),
        size: 1.5 + (i % 4) * 0.8,
        delay: (i * 0.55) % 9,
        dur: 9 + (i % 6) * 1.6,
        drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 5) * 3),
      })),
    [],
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.5 : 1.3 }}
      style={{ visibility: active ? "visible" : "hidden" }}
    >
      <div className={`wn-haze wn-haze-a ${reduced ? "" : "wn-haze-drift-a"}`} />
      <div className={`wn-haze wn-haze-b ${reduced ? "" : "wn-haze-drift-b"}`} />
      <div className={`wn-haze wn-haze-c ${reduced ? "" : "wn-haze-pulse"}`} />

      <div className={`wn-bands ${reduced ? "" : "wn-bands-drift"}`} />
      <div className={`wn-weight ${reduced ? "" : "wn-weight-breathe"}`} />
      <div className={`wn-ring ${reduced ? "" : "wn-ring-pulse"}`} />

      {!reduced &&
        ash.map((p) => (
          <span
            key={p.id}
            className="wn-ash"
            style={
              {
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                ["--a-delay" as string]: `${p.delay}s`,
                ["--a-dur" as string]: `${p.dur}s`,
                ["--a-drift" as string]: `${p.drift}px`,
              } as CSSProperties
            }
          />
        ))}

      <div className="wn-edge" />
    </motion.div>
  );
}
