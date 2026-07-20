"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CHAPTER, chapters } from "@/lib/copy";
import { chapterBlock, chapterContainer } from "@/lib/motion";
import { palette } from "@/lib/palette";
import GoldText from "@/components/content/GoldText";
import IlluminatedEnglish from "@/components/content/IlluminatedEnglish";
import OrnamentDivider from "@/components/content/OrnamentDivider";

type Props = {
  chapter: number;
};

export default function Chapter({ chapter }: Props) {
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;
  const copy = chapters[chapter]!;
  const isBirthday = chapter === CHAPTER.birthday;
  const isPlain = chapter === CHAPTER.apology;
  const isOpening = chapter === CHAPTER.opening;
  const bodyColor = palette.silver;
  const urduSolid = palette.gold;

  if (isBirthday && copy.englishOnly) {
    return (
      <motion.article
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-28 pt-16"
        variants={chapterContainer(reduced)}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative flex w-full max-w-[40ch] flex-col items-center text-center">
          <motion.h1
            variants={chapterBlock(reduced)}
            className="birthday-title mb-6"
          >
            {copy.title}
          </motion.h1>

          {copy.tagline && (
            <motion.p variants={chapterBlock(reduced)} className="birthday-tagline mb-8">
              {copy.tagline}
            </motion.p>
          )}

          <motion.p variants={chapterBlock(reduced)} className="birthday-body">
            {copy.english}
          </motion.p>
        </div>
      </motion.article>
    );
  }

  const halo =
    "radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, transparent 70%)";

  return (
    <motion.article
      className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
      variants={chapterContainer(reduced)}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative flex w-full max-w-[42ch] flex-col items-center text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: halo,
            filter: "blur(18px)",
          }}
          aria-hidden
        />

        {copy.urdu.map((line, index) => {
          const isDisplay = isOpening && index === 0;
          const useGoldText = isOpening && index === 0;

          return (
            <motion.div
              key={`${chapter}-ur-${index}`}
              variants={chapterBlock(reduced)}
              className={index === 0 ? "mb-1" : "mb-1 mt-2"}
            >
              <p
                dir="rtl"
                lang="ur"
                className={`font-urdu ${isDisplay ? "urdu-display" : "urdu-body"}`}
                style={useGoldText ? undefined : { color: urduSolid }}
              >
                {useGoldText ? <GoldText>{line}</GoldText> : line}
              </p>
            </motion.div>
          );
        })}

        {!isPlain && <OrnamentDivider variants={chapterBlock(reduced)} />}

        {isPlain ? (
          <motion.p
            variants={chapterBlock(reduced)}
            className="font-serif english-lead text-center"
            style={{ color: bodyColor, opacity: 0.88 }}
          >
            {copy.english}
          </motion.p>
        ) : (
          <IlluminatedEnglish
            text={copy.english}
            color={bodyColor}
            variants={chapterBlock(reduced)}
            className="opacity-92"
          />
        )}
      </div>
    </motion.article>
  );
}
