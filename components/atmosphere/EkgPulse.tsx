"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { palette } from "@/lib/palette";

type Props = {
  chapter: number;
};

/** Soft gold pulse once when the EKG glow-dot travels (chapter 4 / index 3). */
export default function EkgPulse({ chapter }: Props) {
  const reduced = useReducedMotion();
  const [pulseId, setPulseId] = useState<number | null>(null);

  useEffect(() => {
    if (chapter !== 4 || reduced) return;

    const start = window.setTimeout(() => setPulseId(Date.now()), 2200);
    const end = window.setTimeout(() => setPulseId(null), 4600);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [chapter, reduced]);

  if (chapter !== 4 || reduced || pulseId === null) return null;

  return (
    <motion.div
      key={pulseId}
      className="pointer-events-none absolute inset-0"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.1, 0] }}
      transition={{ duration: 2.4, ease: "easeInOut" }}
      style={{
        background: `radial-gradient(50% 40% at 50% 48%, ${palette.gold} 0%, transparent 70%)`,
      }}
    />
  );
}
