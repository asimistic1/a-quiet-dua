"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import AuroraMesh from "@/components/atmosphere/AuroraMesh";
import Background from "@/components/atmosphere/Background";
import Crescent from "@/components/atmosphere/Crescent";
import DawnParticles from "@/components/atmosphere/DawnParticles";
import DustMotes from "@/components/atmosphere/DustMotes";
import EkgPulse from "@/components/atmosphere/EkgPulse";
import GoldenThread from "@/components/atmosphere/GoldenThread";
import Grain from "@/components/atmosphere/Grain";
import Mandala from "@/components/atmosphere/Mandala";
import OrnamentFrame from "@/components/atmosphere/OrnamentFrame";
import ShootingStar from "@/components/atmosphere/ShootingStar";
import Stars from "@/components/atmosphere/Stars";
import AudioToggle from "@/components/content/AudioToggle";
import BackHint from "@/components/content/BackHint";
import Chapter from "@/components/content/Chapter";
import LetterMode from "@/components/content/LetterMode";
import ProgressDots from "@/components/content/ProgressDots";
import TapPrompt from "@/components/content/TapPrompt";
import { chapters, TOTAL_CHAPTERS, ui } from "@/lib/copy";

export default function Experience() {
  const [chapter, setChapter] = useState(0);
  const [letterMode, setLetterMode] = useState(false);
  const isDawn = chapter === TOTAL_CHAPTERS - 1;
  const isLast = isDawn;
  const showAmbientMandala = chapter === 0 || chapter === 2 || chapter === 4;

  const advance = useCallback(() => {
    if (letterMode || isLast) return;
    setChapter((c) => Math.min(c + 1, TOTAL_CHAPTERS - 1));
  }, [isLast, letterMode]);

  const back = useCallback(() => {
    if (letterMode) return;
    setChapter((c) => Math.max(c - 1, 0));
  }, [letterMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (letterMode) {
        if (e.key === "Escape") setLetterMode(false);
        return;
      }

      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back, letterMode]);

  return (
    <main
      className="relative h-[100dvh] w-full touch-manipulation overflow-hidden outline-none"
      tabIndex={0}
      role="presentation"
      onClick={advance}
      aria-label="A quiet letter"
    >
      {/* Persistent atmosphere — never unmounts */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Background chapter={chapter} />
        <AuroraMesh chapter={chapter} />
        <div
          className="absolute inset-0 transition-opacity duration-[1600ms]"
          style={{ opacity: showAmbientMandala ? 1 : 0 }}
        >
          <Mandala mode="ambient" drawIn={false} />
        </div>
        {isDawn && <Mandala mode="bloom" drawIn />}
        <Stars chapter={chapter} />
        <ShootingStar chapter={chapter} />
        <Crescent chapter={chapter} />
        <OrnamentFrame chapter={chapter} />
        <GoldenThread chapter={chapter} />
        <DustMotes chapter={chapter} />
        <EkgPulse chapter={chapter} />
        <DawnParticles active={isDawn} />
        <Grain />
      </div>

      <AudioToggle isDawn={isDawn} />
      <BackHint
        visible={chapter > 0 && !letterMode}
        isDawn={isDawn}
        onBack={back}
      />

      {/* Content layer */}
      <div className="relative z-10 flex h-[100dvh] flex-col">
        <div className="min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <Chapter key={chapter} chapter={chapter} />
          </AnimatePresence>
        </div>

        <div className="relative z-20 flex flex-col items-center gap-5 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-2">
          <ProgressDots chapter={chapter} isDawn={isDawn} />
          <TapPrompt
            key={chapter}
            visible={!isLast}
            isDawn={isDawn}
            label={chapters[chapter]?.micro ?? ui.tapPrompt}
            onContinue={advance}
          />
        </div>
      </div>

      {chapter === 0 && !letterMode && (
        <button
          type="button"
          className="font-ui absolute bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] left-[max(1rem,env(safe-area-inset-left))] z-30 max-w-[42vw] text-left opacity-40 transition-opacity hover:opacity-70"
          style={{ color: "var(--silver)", fontSize: "10px" }}
          onClick={(e) => {
            e.stopPropagation();
            setLetterMode(true);
          }}
        >
          {ui.letterModeOpen}
        </button>
      )}

      {letterMode && <LetterMode onClose={() => setLetterMode(false)} />}
    </main>
  );
}
