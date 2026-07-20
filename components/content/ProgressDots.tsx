"use client";

import { ui, TOTAL_CHAPTERS } from "@/lib/copy";
import { palette } from "@/lib/palette";

type Props = {
  chapter: number;
  isDawn: boolean;
};

export default function ProgressDots({ chapter, isDawn }: Props) {
  return (
    <div
      className="pointer-events-none flex items-center justify-center gap-2.5"
      role="img"
      aria-label={`${ui.progress}: ${chapter + 1} of ${TOTAL_CHAPTERS}`}
    >
      {Array.from({ length: TOTAL_CHAPTERS }, (_, i) => {
        const active = i === chapter;
        return (
          <span
            key={i}
            className="block h-1 w-1 rounded-full"
            style={{
              background: active ? palette.gold : palette.silver,
              opacity: active ? (isDawn ? 0.55 : 0.6) : isDawn ? 0.25 : 0.2,
            }}
          />
        );
      })}
    </div>
  );
}
