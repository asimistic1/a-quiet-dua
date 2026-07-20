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
  const isBirthday = chapter === 0;
  const isQuiet = chapter === 1;
  const isPlain = chapter === 2;

  const orbs = useMemo<Orb[]>(() => {
    if (isBirthday) {
      return [
        {
          className: "aurora-orb aurora-a",
          style: {
            width: "70vmax",
            height: "70vmax",
            left: "50%",
            top: "-20%",
            marginLeft: "-35vmax",
            background: `radial-gradient(circle, ${palette.foam} 0%, rgba(126,184,232,0.4) 30%, transparent 68%)`,
            opacity: 0.45,
          },
        },
        {
          className: "aurora-orb aurora-b",
          style: {
            width: "55vmax",
            height: "55vmax",
            left: "-14%",
            bottom: "-12%",
            background: `radial-gradient(circle, ${palette.oceanMid} 0%, rgba(27,79,138,0.45) 35%, transparent 70%)`,
            opacity: 0.4,
          },
        },
        {
          className: "aurora-orb aurora-c",
          style: {
            width: "48vmax",
            height: "48vmax",
            right: "-12%",
            top: "40%",
            background: `radial-gradient(circle, ${palette.lavenderSea} 0%, rgba(184,164,212,0.3) 35%, transparent 70%)`,
            opacity: 0.28,
          },
        },
      ];
    }

    if (isQuiet) {
      return [
        {
          className: "aurora-orb aurora-fast-a",
          style: {
            width: "78vmax",
            height: "78vmax",
            left: "-18%",
            top: "-18%",
            background: `radial-gradient(circle, #2a9a82 0%, rgba(20,120,95,0.55) 32%, transparent 70%)`,
            opacity: 0.85,
          },
        },
        {
          className: "aurora-orb aurora-fast-b",
          style: {
            width: "70vmax",
            height: "70vmax",
            right: "-20%",
            top: "8%",
            background: `radial-gradient(circle, #4a6ad4 0%, rgba(50,70,160,0.55) 32%, transparent 70%)`,
            opacity: 0.75,
          },
        },
        {
          className: "aurora-orb aurora-fast-c",
          style: {
            width: "58vmax",
            height: "58vmax",
            left: "22%",
            bottom: "-18%",
            background: `radial-gradient(circle, ${palette.brightGold} 0%, rgba(243,223,174,0.45) 28%, transparent 68%)`,
            opacity: 0.65,
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
  }, [isBirthday, isQuiet]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden contain-paint"
      aria-hidden
      animate={{ opacity: isPlain ? 0.35 : 1 }}
      transition={{ duration: reduced ? 0.5 : 1.6 }}
    >
      {orbs.map((orb, i) => (
        <div
          key={`${chapter}-${i}`}
          className={reduced ? "aurora-orb" : orb.className}
          style={orb.style}
        />
      ))}
    </motion.div>
  );
}
