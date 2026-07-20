"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { palette } from "@/lib/palette";

type Props = {
  chapter: number;
};

export default function Crescent({ chapter }: Props) {
  const reduced = useReducedMotion();
  const maskId = useId().replace(/:/g, "");
  const visible = chapter === 1 || chapter === 2;
  const opacity = chapter === 1 ? 0.32 : chapter === 2 ? 0.14 : 0;

  return (
    <motion.div
      className="pointer-events-none absolute right-[12%] top-[11%] z-[2]"
      aria-hidden
      animate={{ opacity: visible ? opacity : 0 }}
      transition={{ duration: reduced ? 0.5 : 2, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg width="42" height="42" viewBox="0 0 42 42">
        <defs>
          <mask id={maskId}>
            <rect width="42" height="42" fill="white" />
            <circle cx="27" cy="18" r="13" fill="black" />
          </mask>
        </defs>
        <circle
          cx="20"
          cy="21"
          r="13"
          fill={palette.gold}
          mask={`url(#${maskId})`}
          opacity={0.9}
        />
      </svg>
    </motion.div>
  );
}
