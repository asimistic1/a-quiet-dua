"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { durations } from "@/lib/motion";
import { skyGradient } from "@/lib/palette";

type Props = {
  chapter: number;
};

type Layer = { id: number; chapter: number };

export default function Background({ chapter }: Props) {
  const reduced = useReducedMotion();
  const [layers, setLayers] = useState<Layer[]>([{ id: 0, chapter }]);
  const [tracked, setTracked] = useState(chapter);
  const isDawn = chapter === 0;
  const isPredawn = chapter === 5;

  if (chapter !== tracked) {
    setTracked(chapter);
    setLayers((prev) => {
      const last = prev[prev.length - 1]!;
      return [...prev.slice(-1), { id: last.id + 1, chapter }];
    });
  }

  useEffect(() => {
    if (layers.length <= 1) return;
    const ms = (reduced ? durations.reduced : durations.background) * 1000 + 80;
    const t = window.setTimeout(() => {
      setLayers((prev) => prev.slice(-1));
    }, ms);
    return () => window.clearTimeout(t);
  }, [layers, reduced]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden contain-strict"
      aria-hidden
    >
      <AnimatePresence initial={false}>
        {layers.map((layer, index) => {
          const isTop = index === layers.length - 1;
          return (
            <motion.div
              key={layer.id}
              className="absolute inset-0"
              style={{
                backgroundImage: skyGradient(layer.chapter),
                backgroundColor: layer.chapter === 0 ? "#4A90C8" : "#070D1A",
              }}
              initial={{ opacity: isTop && layers.length > 1 ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduced ? durations.reduced : durations.background,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Soft light veils — CSS gradients only, transform/opacity animated */}
      <div
        className={`sky-veil ${
          reduced
            ? ""
            : chapter === 1 || chapter === 2
              ? "sky-veil-fast"
              : "sky-veil-drift"
        }`}
        data-chapter={chapter}
      />

      {isPredawn && (
        <div
          className={`horizon-glow ${reduced ? "" : "horizon-breathe"}`}
        />
      )}

      {isDawn && (
        <>
          <div className="uw-watercolor absolute inset-0 opacity-80" />
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          background: isDawn
            ? "radial-gradient(75% 55% at 50% 100%, rgba(10,40,90,0.2) 0%, transparent 55%)"
              : chapter === 1
              ? "radial-gradient(85% 75% at 50% 42%, transparent 42%, rgba(0,0,0,0.22) 100%)"
              : chapter === 2
                ? "radial-gradient(85% 75% at 50% 45%, transparent 40%, rgba(0,0,0,0.4) 100%)"
              : "radial-gradient(80% 70% at 50% 50%, transparent 38%, rgba(0,0,0,0.42) 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
}
