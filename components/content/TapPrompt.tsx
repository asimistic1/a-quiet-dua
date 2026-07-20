"use client";

import { motion, useReducedMotion } from "framer-motion";
import { durations } from "@/lib/motion";
import { ui } from "@/lib/copy";

type Props = {
  visible: boolean;
  isDawn: boolean;
  label: string;
  onContinue: () => void;
};

/**
 * Glassy liquid continue control — single backdrop-filter surface (cheap at button size).
 * Reduced motion: static glass, no liquid shimmer.
 */
export default function TapPrompt({
  visible,
  isDawn,
  label,
  onContinue,
}: Props) {
  const reduced = useReducedMotion();

  if (!visible || isDawn) return null;

  return (
    <motion.div
      className="pointer-events-auto flex flex-col items-center"
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduced ? 0 : durations.tapPromptDelay,
        duration: reduced ? durations.reduced : 0.9,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <button
        type="button"
        className={`liquid-glass ${reduced ? "" : "liquid-glass-alive"}`}
        aria-label={ui.continue}
        onClick={(e) => {
          e.stopPropagation();
          onContinue();
        }}
      >
        <span className="liquid-glass-shine" aria-hidden />
        <span className="liquid-glass-label font-ui">{ui.continue}</span>
        {label ? (
          <span className="liquid-glass-hint font-ui">
            {label.replace(/^\[\s*|\s*\]$/g, "")}
          </span>
        ) : null}
      </button>
    </motion.div>
  );
}
