"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useId, useState } from "react";
import { ui } from "@/lib/copy";
import { durations } from "@/lib/motion";
import { palette } from "@/lib/palette";

type Props = {
  chapter: number;
};

const STROKE = 1.5;
const GLOW = "drop-shadow(0 0 8px rgba(230,194,128,0.4))";
const EKG = "M60,400 H150 L165,400 L176,368 L190,436 L202,400 H340";
const tickYs = [230, 310, 400, 490, 570];

function ThreadState({
  chapter,
  reduced,
}: {
  chapter: number;
  reduced: boolean;
}) {
  const drawDur = reduced ? durations.reduced : undefined;

  if (chapter === 0) {
    return (
      <motion.circle
        cx={200}
        cy={400}
        r={2.5}
        fill={palette.gold}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          reduced
            ? { opacity: 0.85, scale: 1 }
            : { opacity: [0.55, 0.95, 0.55], scale: [1, 1.18, 1] }
        }
        transition={
          reduced
            ? { duration: durations.reduced }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: "200px 400px" }}
      />
    );
  }

  if (chapter === 1) {
    return (
      <motion.path
        d="M140,400 H260"
        fill="none"
        stroke={palette.gold}
        strokeWidth={STROKE}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{
          pathLength: { duration: drawDur ?? 1.8, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: reduced ? 0.5 : 0.6 },
        }}
      />
    );
  }

  if (chapter === 2) {
    return (
      <g>
        <motion.path
          d="M186,190 V610"
          fill="none"
          stroke={palette.gold}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{
            pathLength: { duration: drawDur ?? 2.6, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: reduced ? 0.5 : 0.5 },
          }}
        />
        <motion.path
          d="M214,190 V610"
          fill="none"
          stroke={palette.gold}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{
            pathLength: {
              duration: drawDur ?? 2.6,
              ease: [0.4, 0, 0.2, 1],
              delay: reduced ? 0 : 0.12,
            },
            opacity: { duration: reduced ? 0.5 : 0.5 },
          }}
        />
        {tickYs.map((y, i) => (
          <g key={ui.milestones[i]}>
            <motion.path
              d={`M200,${y - 3.5} L203.5,${y} L200,${y + 3.5} L196.5,${y} Z`}
              fill={palette.gold}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{
                delay: reduced ? 0 : 1.4 + i * 0.18,
                duration: reduced ? 0.5 : 0.6,
              }}
            />
            <motion.text
              x={230}
              y={y + 3}
              fill={palette.silver}
              fillOpacity={0.35}
              fontSize={10}
              style={{
                fontFamily: "var(--font-ui)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: reduced ? 0 : 1.5 + i * 0.18,
                duration: reduced ? 0.5 : 0.6,
              }}
            >
              {ui.milestones[i]}
            </motion.text>
          </g>
        ))}
      </g>
    );
  }

  if (chapter === 3) {
    return <EkgState reduced={reduced} />;
  }

  if (chapter === 4) {
    return (
      <g>
        <motion.path
          d="M60,470 H340"
          fill="none"
          stroke={palette.gold}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{
            pathLength: { duration: drawDur ?? 1.6, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: reduced ? 0.5 : 0.8 },
          }}
        />
        {/* Rising sun sliver beneath horizon */}
        <motion.path
          d="M120,470 A80,36 0 0 1 280,470"
          fill="none"
          stroke={palette.gold}
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduced
              ? { pathLength: 1, opacity: 0.2 }
              : { pathLength: 1, opacity: [0.14, 0.22, 0.14] }
          }
          transition={
            reduced
              ? { duration: 0.5 }
              : {
                  pathLength: { duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.4 },
                  opacity: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                }
          }
        />
      </g>
    );
  }

  return null;
}

function EkgState({ reduced }: { reduced: boolean }) {
  const [dot, setDot] = useState({
    x: reduced ? 340 : 60,
    y: 400,
    visible: reduced,
  });
  const pathId = useId().replace(/:/g, "");

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let travelStop: (() => void) | undefined;

    const startTravel = () => {
      const pathEl = document.getElementById(pathId) as SVGPathElement | null;
      if (cancelled || !pathEl) return;
      const length = pathEl.getTotalLength();
      setDot({ x: 60, y: 400, visible: true });
      const travel = animate(0, 1, {
        duration: 2.4,
        ease: "easeInOut",
        onUpdate: (v) => {
          const pt = pathEl.getPointAtLength(v * length);
          setDot({ x: pt.x, y: pt.y, visible: true });
        },
      });
      travelStop = () => travel.stop();
    };

    const drawTimer = window.setTimeout(startTravel, 2200);

    return () => {
      cancelled = true;
      window.clearTimeout(drawTimer);
      travelStop?.();
    };
  }, [pathId, reduced]);

  return (
    <g>
      <motion.path
        id={pathId}
        d={EKG}
        fill="none"
        stroke={palette.gold}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{
          pathLength: { duration: reduced ? 0.5 : 2.2, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: reduced ? 0.5 : 0.5 },
        }}
      />
      {dot.visible && (
        <motion.circle
          cx={dot.x}
          cy={dot.y}
          r={3}
          fill={palette.gold}
          initial={{ opacity: 0 }}
          animate={{ opacity: reduced ? 0.7 : [0.4, 0.95, 0.55] }}
          transition={{ duration: reduced ? 0.5 : 1.8 }}
          style={{ filter: GLOW }}
        />
      )}
    </g>
  );
}

export default function GoldenThread({ chapter }: Props) {
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;
  const isDawn = chapter === 5;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <motion.div
        className="flex h-full w-[min(78vw,420px)] items-center justify-center"
        animate={{ opacity: isDawn ? 0 : 1 }}
        transition={{
          duration: reduced ? durations.reduced : durations.threadDissolve,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <svg
          viewBox="0 0 400 800"
          className="h-full w-full"
          style={{ filter: GLOW }}
        >
          <AnimatePresence mode="sync">
            {!isDawn && (
              <motion.g
                key={chapter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: reduced
                      ? durations.reduced
                      : durations.threadCrossfade,
                  },
                }}
              >
                <ThreadState chapter={chapter} reduced={reduced} />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>

      {isDawn && (
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-[22%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduced ? 0 : durations.closingDotDelay,
            duration: reduced ? durations.reduced : 1.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <span className="relative flex h-[5px] w-[5px] items-center justify-center">
            <span
              className={`absolute block h-7 w-7 rounded-full ${reduced ? "" : "halo-breathe"}`}
              style={{
                border: `1px solid ${palette.gold}`,
                opacity: reduced ? 0.18 : undefined,
              }}
            />
            <span
              className="relative block h-[5px] w-[5px] rounded-full"
              style={{
                background: palette.gold,
                boxShadow: "0 0 8px rgba(230,194,128,0.5)",
              }}
            />
          </span>
        </motion.div>
      )}
    </div>
  );
}
