"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import AuroraMesh from "@/components/atmosphere/AuroraMesh";
import Background from "@/components/atmosphere/Background";
import Crescent from "@/components/atmosphere/Crescent";
import DustMotes from "@/components/atmosphere/DustMotes";
import EkgPulse from "@/components/atmosphere/EkgPulse";
import GoldenThread from "@/components/atmosphere/GoldenThread";
import Grain from "@/components/atmosphere/Grain";
import Mandala from "@/components/atmosphere/Mandala";
import OrnamentFrame from "@/components/atmosphere/OrnamentFrame";
import QuietNight from "@/components/atmosphere/QuietNight";
import ShootingStar from "@/components/atmosphere/ShootingStar";
import Stars from "@/components/atmosphere/Stars";
import UnderwaterWorld from "@/components/atmosphere/UnderwaterWorld";
import AudioToggle from "@/components/content/AudioToggle";
import BackHint from "@/components/content/BackHint";
import Chapter from "@/components/content/Chapter";
import LetterMode from "@/components/content/LetterMode";
import ProgressDots from "@/components/content/ProgressDots";
import TapPrompt from "@/components/content/TapPrompt";
import { CHAPTER, chapters, TOTAL_CHAPTERS, ui } from "@/lib/copy";

export default function Experience() {
  const [chapter, setChapter] = useState(0);
  const [letterMode, setLetterMode] = useState(false);
  const isBirthday = chapter === CHAPTER.birthday;
  const isQuiet = chapter === CHAPTER.opening;
  const isLast = chapter === CHAPTER.promise;
  const isLight = isBirthday;
  const showAmbientMandala =
    chapter === CHAPTER.opening ||
    chapter === CHAPTER.years ||
    chapter === CHAPTER.promise;

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
      <div className="pointer-events-none absolute inset-0 z-0">
        <Background chapter={chapter} />
        <UnderwaterWorld active={isBirthday} />
        <QuietNight active={isQuiet} />
        <AuroraMesh chapter={chapter} />
        <div
          className="absolute inset-0 transition-opacity duration-[1600ms]"
          style={{ opacity: showAmbientMandala ? 1 : 0 }}
        >
          <Mandala
            mode="ambient"
            drawIn={false}
            opacity={isQuiet ? 0.14 : undefined}
            stroke={isQuiet ? "#E6C280" : undefined}
            spinDuration={isQuiet ? 120 : undefined}
            size={isQuiet ? "150vmin" : undefined}
          />
        </div>
        <Stars chapter={chapter} />
        <ShootingStar chapter={chapter} />
        <Crescent chapter={chapter} />
        <OrnamentFrame chapter={chapter} />
        <GoldenThread chapter={chapter} />
        <DustMotes chapter={chapter} />
        <EkgPulse chapter={chapter} />
        <Grain />
      </div>

      <AudioToggle isDawn={isLight} />
      <BackHint
        visible={chapter > 0 && !letterMode}
        isDawn={isLight}
        onBack={back}
      />

      <div className="relative z-10 flex h-[100dvh] flex-col">
        <div className="min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <Chapter key={chapter} chapter={chapter} />
          </AnimatePresence>
        </div>

        <div className="relative z-20 flex flex-col items-center gap-5 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-2">
          <ProgressDots chapter={chapter} isDawn={isLight} />
          <TapPrompt
            key={chapter}
            visible={!isLast}
            isDawn={false}
            ocean={isBirthday}
            label={chapters[chapter]?.micro ?? ui.tapPrompt}
            onContinue={advance}
          />
        </div>
      </div>

      {isBirthday && !letterMode && (
        <button
          type="button"
          className="letter-chip"
          aria-label={ui.letterModeOpen}
          onClick={(e) => {
            e.stopPropagation();
            setLetterMode(true);
          }}
        >
          read as letter
        </button>
      )}

      {letterMode && <LetterMode onClose={() => setLetterMode(false)} />}
    </main>
  );
}
