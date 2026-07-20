"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";
import { palette } from "@/lib/palette";

type Props = {
  chapter: number;
};

type Orb = {
  className: string;
  style: CSSProperties;
};

/**
 * Soft light orbs via large radial gradients — no CSS filter:blur.
 * Soft edges come from transparent gradient stops (GPU-cheap).
 * Hard cap: 3 orbs.
 */
export default function AuroraMesh({ chapter }: Props) {
  const reduced = useReducedMotion();
  const isDawn = chapter === 5;
  const isPlain = chapter === 1;

  const orbs = useMemo<Orb[]>(() => {
    if (isDawn) {
      return [
        {
          className: "aurora-orb aurora-a",
          style: {
            width: "70vmax",
            height: "70vmax",
            left: "50%",
            top: "-18%",
            marginLeft: "-35vmax",
            background: `radial-gradient(circle, ${palette.sunBloom} 0%, rgba(255,230,184,0.35) 28%, transparent 68%)`,
            opacity: 0.55,
          },
        },
        {
          className: "aurora-orb aurora-b",
          style: {
            width: "55vmax",
            height: "55vmax",
            left: "-12%",
            bottom: "-10%",
            background: `radial-gradient(circle, ${palette.roseMist} 0%, rgba(242,214,201,0.4) 30%, transparent 70%)`,
            opacity: 0.4,
          },
        },
        {
          className: "aurora-orb aurora-c",
          style: {
            width: "48vmax",
            height: "48vmax",
            right: "-14%",
            top: "35%",
            background: `radial-gradient(circle, ${palette.gold} 0%, rgba(230,194,128,0.28) 32%, transparent 70%)`,
            opacity: 0.32,
          },
        },
      ];
    }

    return [
      {
        className: "aurora-orb aurora-a",
        style: {
          width: "65vmax",
          height: "65vmax",
          left: "-16%",
          top: "-12%",
          background: `radial-gradient(circle, ${palette.emerald} 0%, rgba(14,59,51,0.45) 35%, transparent 70%)`,
          opacity: 0.5,
        },
      },
      {
        className: "aurora-orb aurora-b",
        style: {
          width: "58vmax",
          height: "58vmax",
          right: "-18%",
          top: "18%",
          background: `radial-gradient(circle, #1a2a55 0%, rgba(16,27,51,0.5) 35%, transparent 70%)`,
          opacity: 0.42,
        },
      },
      {
        className: "aurora-orb aurora-c",
        style: {
          width: "42vmax",
          height: "42vmax",
          left: "28%",
          bottom: "-16%",
          background: `radial-gradient(circle, ${palette.gold} 0%, rgba(230,194,128,0.22) 30%, transparent 68%)`,
          opacity: 0.28,
        },
      },
    ];
  }, [isDawn]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden contain-paint"
      aria-hidden
      animate={{ opacity: isPlain ? 0.35 : 1 }}
      transition={{ duration: reduced ? 0.5 : 1.6 }}
    >
      {orbs.map((orb, i) => (
        <div
          key={`${isDawn ? "d" : "n"}-${i}`}
          className={reduced ? "aurora-orb" : orb.className}
          style={orb.style}
        />
      ))}
    </motion.div>
  );
}
