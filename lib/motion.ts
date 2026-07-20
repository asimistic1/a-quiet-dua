export const easeOut = [0.4, 0, 0.2, 1] as const;

export const durations = {
  chapterExit: 1.4,
  chapterEnter: 1.3,
  background: 2.4,
  threadCrossfade: 1.4,
  tapPromptDelay: 2.2,
  tapPromptPulse: 2.8,
  reduced: 0.5,
  dawnFade: 2.5,
  threadDissolve: 2,
  closingDotDelay: 1.5,
} as const;

export const chapterContainer = (reduced: boolean) => ({
  hidden: {},
  visible: {
    transition: reduced
      ? { staggerChildren: 0, delayChildren: 0 }
      : { staggerChildren: 0.45, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    y: reduced ? 0 : -12,
    filter: reduced ? "blur(0px)" : "blur(6px)",
    transition: {
      duration: reduced ? durations.reduced : durations.chapterExit,
      ease: easeOut,
    },
  },
});

export const chapterBlock = (reduced: boolean) => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : 16,
    filter: reduced ? "blur(0px)" : "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reduced ? durations.reduced : durations.chapterEnter,
      ease: easeOut,
    },
  },
});

export const fadeOnly = (reduced: boolean, duration = durations.background) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: reduced ? durations.reduced : duration,
    ease: easeOut,
  },
});
