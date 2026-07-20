"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo, useId, useMemo, type CSSProperties } from "react";
import { palette } from "@/lib/palette";

export type MandalaRing = {
  count: number;
  radius: number;
  scale: number;
};

type Props = {
  mode: "ambient" | "bloom" | "hidden";
  petalPath?: string;
  rings?: MandalaRing[];
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  spinDuration?: number;
  size?: string;
  drawIn?: boolean;
};

const DEFAULT_PETAL =
  "M0,0 C 14,-26 14,-64 0,-96 C -14,-64 -14,-26 0,0 M0,-96 C 7,-112 -7,-112 0,-126 M0,-52 C 10,-58 10,-72 0,-78";

const AMBIENT_RINGS: MandalaRing[] = [
  { count: 8, radius: 0, scale: 1 },
  { count: 16, radius: 90, scale: 0.8 },
  { count: 24, radius: 170, scale: 0.62 },
];

const BLOOM_RINGS: MandalaRing[] = [
  { count: 8, radius: 0, scale: 1 },
  { count: 12, radius: 72, scale: 0.86 },
  { count: 18, radius: 140, scale: 0.7 },
  { count: 24, radius: 200, scale: 0.55 },
];

function MandalaInner({
  mode,
  petalPath = DEFAULT_PETAL,
  rings,
  stroke,
  strokeWidth = 0.7,
  opacity,
  spinDuration,
  size,
  drawIn,
}: Props) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const resolvedRings = rings ?? (mode === "bloom" ? BLOOM_RINGS : AMBIENT_RINGS);
  const resolvedStroke =
    stroke ?? (mode === "bloom" ? palette.deepGold : palette.gold);
  const resolvedOpacity =
    opacity ?? (mode === "bloom" ? 0.17 : 0.075);
  const resolvedSpin = spinDuration ?? (mode === "bloom" ? 180 : 240);
  const resolvedSize = size ?? (mode === "bloom" ? "68vmin" : "140vmin");
  const shouldDraw = drawIn ?? mode === "bloom";

  const petals = useMemo(() => {
    return resolvedRings.flatMap((ring, ringIndex) =>
      Array.from({ length: ring.count }, (_, i) => ({
        key: `${ringIndex}-${i}`,
        ringIndex,
        transform: `rotate(${(360 / ring.count) * i}) translate(0, ${-ring.radius}) scale(${ring.scale})`,
        delay: ringIndex * 0.85 + i * 0.012,
      })),
    );
  }, [resolvedRings]);

  const circles = useMemo(() => {
    return resolvedRings
      .slice(0, -1)
      .map((ring, i) => {
        const next = resolvedRings[i + 1];
        if (!next) return null;
        const r = (ring.radius + next.radius) / 2;
        return { key: `c-${i}`, r, delay: (i + 1) * 0.7 };
      })
      .filter(Boolean) as { key: string; r: number; delay: number }[];
  }, [resolvedRings]);

  if (mode === "hidden") return null;

  const drawDuration = reduced ? 0.5 : 4;
  const ease = [0.4, 0, 0.2, 1] as const;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.5 : 1.6 }}
    >
      <div
        className={reduced ? undefined : "mandala-spin"}
        style={
          {
            width: resolvedSize,
            height: resolvedSize,
            ["--spin-duration" as string]: `${resolvedSpin}s`,
          } as CSSProperties
        }
      >
        <svg viewBox="-260 -260 520 520" className="h-full w-full" overflow="visible">
          {circles.map((c) => (
            <motion.circle
              key={c.key}
              cx={0}
              cy={0}
              r={c.r}
              fill="none"
              stroke={resolvedStroke}
              strokeWidth={0.45}
              opacity={resolvedOpacity * 0.7}
              initial={
                shouldDraw && !reduced
                  ? { pathLength: 0, opacity: 0 }
                  : { pathLength: 1, opacity: resolvedOpacity * 0.7 }
              }
              animate={{ pathLength: 1, opacity: resolvedOpacity * 0.7 }}
              transition={{
                duration: drawDuration * 0.6,
                delay: reduced ? 0 : c.delay,
                ease,
              }}
            />
          ))}
          {petals.map((p) => (
            <g key={`${uid}-${p.key}`} transform={p.transform}>
              <motion.path
                d={petalPath}
                fill="none"
                stroke={resolvedStroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={resolvedOpacity}
                initial={
                  shouldDraw && !reduced
                    ? { pathLength: 0, opacity: 0 }
                    : { pathLength: 1, opacity: resolvedOpacity }
                }
                animate={{ pathLength: 1, opacity: resolvedOpacity }}
                transition={{
                  duration: drawDuration * 0.55,
                  delay: reduced || !shouldDraw ? 0 : p.delay,
                  ease,
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

const Mandala = memo(MandalaInner);
export default Mandala;
