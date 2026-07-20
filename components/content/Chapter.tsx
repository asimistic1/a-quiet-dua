"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CHAPTER, chapters } from "@/lib/copy";
import { chapterBlock, chapterContainer } from "@/lib/motion";
import { palette } from "@/lib/palette";
import IlluminatedEnglish from "@/components/content/IlluminatedEnglish";
import OpenDoorChapter from "@/components/content/OpenDoorChapter";
import OrnamentDivider from "@/components/content/OrnamentDivider";

type Props = {
  chapter: number;
};

export default function Chapter({ chapter }: Props) {
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;
  const copy = chapters[chapter]!;
  const isBirthday = chapter === CHAPTER.birthday;
  const isQuiet = chapter === CHAPTER.opening;
  const isWeight = chapter === CHAPTER.apology;
  const isPromise = chapter === CHAPTER.promise;
  const isOpenDoor = chapter === CHAPTER.openDoor;
  const bodyColor = palette.silver;

  if (isOpenDoor && copy.isFeedback) {
    return <OpenDoorChapter message={copy.english} />;
  }

  if (isBirthday && copy.englishOnly) {
    return (
      <motion.article
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-28 pt-16"
        variants={chapterContainer(reduced)}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="birthday-panel relative flex w-full max-w-[40ch] flex-col items-center text-center">
          <motion.h1 variants={chapterBlock(reduced)} className="birthday-title mb-5">
            {copy.title}
          </motion.h1>
          {copy.tagline && (
            <motion.p variants={chapterBlock(reduced)} className="birthday-tagline mb-7">
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

  if (isQuiet && copy.englishOnly) {
    return (
      <motion.article
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-28 pt-12"
        variants={chapterContainer(reduced)}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="quiet-panel relative flex w-full max-w-[40ch] flex-col items-center text-center">
          <motion.h1 variants={chapterBlock(reduced)} className="quiet-title mb-7">
            {copy.title}
          </motion.h1>
          <motion.p variants={chapterBlock(reduced)} className="quiet-body">
            {copy.english}
          </motion.p>
        </div>
      </motion.article>
    );
  }

  if (isWeight && copy.englishOnly) {
    return (
      <motion.article
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-28 pt-12"
        variants={chapterContainer(reduced)}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="weight-panel relative flex w-full max-w-[40ch] flex-col items-center text-center">
          <motion.h1 variants={chapterBlock(reduced)} className="weight-title mb-5">
            {copy.title}
          </motion.h1>
          {copy.urduTagline && (
            <motion.p
              variants={chapterBlock(reduced)}
              className="weight-urdu mb-7"
              dir="rtl"
              lang="ur"
            >
              {copy.urduTagline}
            </motion.p>
          )}
          <motion.p variants={chapterBlock(reduced)} className="weight-body">
            {copy.english}
          </motion.p>
        </div>
      </motion.article>
    );
  }

  if (isPromise && copy.englishOnly) {
    return (
      <motion.article
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-24 pt-12"
        variants={chapterContainer(reduced)}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="promise-panel relative flex w-full max-w-[40ch] flex-col items-center text-center">
          {copy.urduTagline && (
            <motion.p
              variants={chapterBlock(reduced)}
              className="promise-urdu mb-8"
              dir="rtl"
              lang="ur"
            >
              {copy.urduTagline}
            </motion.p>
          )}
          <motion.p variants={chapterBlock(reduced)} className="promise-body">
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
          style={{ background: halo, filter: "blur(18px)" }}
          aria-hidden
        />

        {copy.urdu.map((line, index) => (
          <motion.div
            key={`${chapter}-ur-${index}`}
            variants={chapterBlock(reduced)}
            className={index === 0 ? "mb-1" : "mb-1 mt-2"}
          >
            <p
              dir="rtl"
              lang="ur"
              className="font-urdu urdu-body"
              style={{ color: palette.gold }}
            >
              {line}
            </p>
          </motion.div>
        ))}

        <OrnamentDivider variants={chapterBlock(reduced)} />

        <IlluminatedEnglish
          text={copy.english}
          color={bodyColor}
          variants={chapterBlock(reduced)}
          className="opacity-92"
        />
      </div>
    </motion.article>
  );
}
