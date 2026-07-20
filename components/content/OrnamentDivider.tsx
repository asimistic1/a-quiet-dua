"use client";

import { motion, type Variants } from "framer-motion";
import { palette } from "@/lib/palette";

type Props = {
  variants?: Variants;
};

export default function OrnamentDivider({ variants }: Props) {
  return (
    <motion.div
      variants={variants}
      className="my-7 flex items-center justify-center"
      aria-hidden
      style={{ opacity: 0.35 }}
    >
      <svg width="90" height="12" viewBox="0 0 90 12" fill="none">
        <path
          d="M4 6 H38"
          stroke={palette.gold}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <path d="M45 2.5 L48 6 L45 9.5 L42 6 Z" fill={palette.gold} />
        <path
          d="M52 6 H86"
          stroke={palette.gold}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
