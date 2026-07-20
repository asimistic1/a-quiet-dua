"use client";

import { motion, useReducedMotion } from "framer-motion";
import { frameOpacity, palette } from "@/lib/palette";

type Props = {
  chapter: number;
};

const CORNER =
  "M2,44 C2,20 20,2 44,2 M8,38 C8,22 22,8 38,8 M2,44 C10,44 15,39 15,30 M44,2 C44,10 39,15 30,15";

function CornerFlourish({
  reduced,
  className,
  transform,
}: {
  reduced: boolean;
  className: string;
  transform: string;
}) {
  return (
    <svg
      className={`absolute h-11 w-11 overflow-visible ${className}`}
      viewBox="0 0 48 48"
    >
      <g transform={transform}>
        <motion.path
          d={CORNER}
          fill="none"
          stroke={palette.gold}
          strokeWidth={0.9}
          strokeLinecap="round"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduced ? 0.5 : 2.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </g>
    </svg>
  );
}

export default function OrnamentFrame({ chapter }: Props) {
  const reduced = useReducedMotion();
  const opacity = frameOpacity[Math.min(chapter, frameOpacity.length - 1)] ?? 0.3;

  return (
    <motion.div
      className="pointer-events-none absolute inset-[10px] md:inset-[14px]"
      aria-hidden
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: reduced ? 0.5 : 2.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0 border-[0.9px]"
        style={{ borderColor: palette.gold }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.5 : 2.2 }}
      />
      <div
        className="absolute inset-[5px] border-[0.6px]"
        style={{ borderColor: palette.gold, opacity: 0.85 }}
      />

      <CornerFlourish reduced={!!reduced} className="left-0 top-0" transform="" />
      <CornerFlourish
        reduced={!!reduced}
        className="right-0 top-0"
        transform="translate(48,0) scale(-1,1)"
      />
      <CornerFlourish
        reduced={!!reduced}
        className="bottom-0 left-0"
        transform="translate(0,48) scale(1,-1)"
      />
      <CornerFlourish
        reduced={!!reduced}
        className="bottom-0 right-0"
        transform="translate(48,48) scale(-1,-1)"
      />
    </motion.div>
  );
}
