"use client";

import { motion, useReducedMotion } from "framer-motion";
import { chapters } from "@/lib/copy";
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
  const isDawn = chapter === 5;
  const isPlain = chapter === 1;
  const isOpening = chapter === 0;
  const isBirthday = chapter === 5;
  const bodyColor = isDawn ? palette.ink : palette.silver;
  const urduSolid = isDawn ? palette.ink : palette.gold;

  const halo = isDawn
    ? "radial-gradient(ellipse at center, rgba(243,233,225,0.55) 0%, transparent 70%)"
    : "radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, transparent 70%)";

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
          const isDisplay =
            (isBirthday && index === 0) || (isOpening && index === 0);
          const useGoldText =
            (isOpening && index === 0) || (isBirthday && index === 0);

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
