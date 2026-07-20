"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";

type Props = {
  active: boolean;
};

/**
 * Screen 4 — promise / pre-dawn.
 * Same indigo→mauve→gold family, richer light and gentle motion.
 */
export default function PromiseDawn({ active }: Props) {
  const reduced = useReducedMotion();

  const motes = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: 6 + ((i * 19) % 88),
        size: 1.5 + (i % 3),
        delay: (i * 0.6) % 8,
        dur: 11 + (i % 5) * 1.8,
      })),
    [],
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.5 : 1.4 }}
      style={{ visibility: active ? "visible" : "hidden" }}
    >
      <div className={`pd-veil pd-veil-top ${reduced ? "" : "pd-veil-drift-a"}`} />
      <div className={`pd-veil pd-veil-side ${reduced ? "" : "pd-veil-drift-b"}`} />
      <div className={`pd-sun ${reduced ? "" : "pd-sun-breathe"}`} />
      <div className={`pd-horizon ${reduced ? "" : "pd-horizon-breathe"}`} />
      <div className={`pd-ribbon ${reduced ? "" : "pd-ribbon-drift"}`} />

      {!reduced &&
        motes.map((m) => (
          <span
            key={m.id}
            className="pd-mote"
            style={
              {
                left: `${m.left}%`,
                width: m.size,
                height: m.size,
                ["--p-delay" as string]: `${m.delay}s`,
                ["--p-dur" as string]: `${m.dur}s`,
              } as CSSProperties
            }
          />
        ))}

      <div className="pd-edge" />
    </motion.div>
  );
}
