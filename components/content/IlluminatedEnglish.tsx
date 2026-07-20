"use client";

import { motion, type Variants } from "framer-motion";
import { palette } from "@/lib/palette";

type Props = {
  text: string;
  color: string;
  className?: string;
  variants?: Variants;
};

export default function IlluminatedEnglish({
  text,
  color,
  className = "",
  variants,
}: Props) {
  const first = text.charAt(0);
  const rest = text.slice(1);

  return (
    <motion.p
      variants={variants}
      className={`font-serif english-lead text-center ${className}`}
      style={{ color }}
    >
      <span
        className="float-left mr-2 mt-1 font-medium leading-none"
        style={{
          color: palette.deepGold,
          fontSize: "2.75em",
          lineHeight: 0.85,
        }}
      >
        {first}
        <span
          className="mt-1 block h-px w-[0.85em]"
          style={{ background: palette.deepGold, opacity: 0.55 }}
          aria-hidden
        />
      </span>
      {rest}
    </motion.p>
  );
}
