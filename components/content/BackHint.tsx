"use client";

import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ui } from "@/lib/copy";
import { palette } from "@/lib/palette";

type Props = {
  visible: boolean;
  isDawn: boolean;
  onBack: () => void;
};

export default function BackHint({ visible, isDawn, onBack }: Props) {
  if (!visible) return null;

  return (
    <motion.button
      type="button"
      aria-label={ui.back}
      onClick={(e) => {
        e.stopPropagation();
        onBack();
      }}
      className="absolute top-[max(1.25rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-20 flex h-10 w-10 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.22 }}
      transition={{ duration: 0.6 }}
      style={{ color: isDawn ? palette.ink : palette.silver }}
    >
      <ChevronLeft size={22} strokeWidth={1.25} />
    </motion.button>
  );
}
