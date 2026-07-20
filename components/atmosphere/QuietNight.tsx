"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";

type Props = {
  active: boolean;
};

/**
 * Screen-2 exclusive atmosphere: luminous night with gold shafts,
 * nebula ribbons, and rising embers — CSS-only, GPU-composited.
 */
export default function QuietNight({ active }: Props) {
  const reduced = useReducedMotion();

  const embers = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: 4 + ((i * 19) % 92),
        size: 2 + (i % 4),
        delay: (i * 0.45) % 7,
        dur: 7 + (i % 5) * 1.4,
        hue: i % 3 === 0 ? "gold" : i % 3 === 1 ? "emerald" : "silver",
      })),
    [],
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.5 : 1.2 }}
      style={{ visibility: active ? "visible" : "hidden" }}
    >
      {/* Nebula plates */}
      <div className="qn-nebula qn-nebula-a" />
      <div className="qn-nebula qn-nebula-b" />
      <div className={`qn-nebula qn-nebula-c ${reduced ? "" : "qn-nebula-pulse"}`} />

      {/* Gold light shafts from upper sky */}
      <div className={`qn-shafts ${reduced ? "" : "qn-shafts-drift"}`} />

      {/* Soft aurora ribbon across mid-sky */}
      <div className={`qn-ribbon ${reduced ? "" : "qn-ribbon-drift"}`} />

      {/* Breathing gold corona behind text zone */}
      <div className={`qn-corona ${reduced ? "" : "qn-corona-breathe"}`} />

      {/* Rising ember sparks */}
      {!reduced &&
        embers.map((e) => (
          <span
            key={e.id}
            className={`qn-ember qn-ember-${e.hue}`}
            style={
              {
                left: `${e.left}%`,
                width: e.size,
                height: e.size,
                ["--e-delay" as string]: `${e.delay}s`,
                ["--e-dur" as string]: `${e.dur}s`,
              } as CSSProperties
            }
          />
        ))}

      {/* Corner vignette bloom — keeps edges deep, center lit */}
      <div className="qn-edge" />
    </motion.div>
  );
}
