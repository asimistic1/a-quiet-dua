"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useTransition } from "react";
import { sendQuietMessage } from "@/app/actions";
import { ui } from "@/lib/copy";
import { chapterBlock, chapterContainer } from "@/lib/motion";

type Props = {
  message: string;
  onBeginAgain: () => void;
};

type Status = "idle" | "sending" | "sent" | "error";

export default function OpenDoorChapter({ message, onBeginAgain }: Props) {
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [pending, startTransition] = useTransition();

  const sent = status === "sent";
  const busy = pending || status === "sending";

  const onSend = () => {
    if (busy || sent || !text.trim()) return;
    setStatus("sending");
    startTransition(async () => {
      const result = await sendQuietMessage(text);
      if (result.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    });
  };

  const label =
    status === "sent"
      ? ui.sent
      : busy
        ? ui.sending
        : status === "error"
          ? "[ Could not send — try again ]"
          : ui.sendQuietly;

  return (
    <motion.article
      className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-28 pt-12"
      variants={chapterContainer(reduced)}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="promise-panel relative flex w-full max-w-[36ch] flex-col items-center text-center">
        <motion.p variants={chapterBlock(reduced)} className="open-door-body mb-8">
          {message}
        </motion.p>

        <motion.div
          variants={chapterBlock(reduced)}
          className="flex w-full flex-col items-center gap-5"
          animate={{ opacity: sent ? 0.45 : 1 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <textarea
            value={text}
            onChange={(e) => {
              if (sent) return;
              setText(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={sent || busy}
            rows={4}
            maxLength={2000}
            placeholder={ui.writePlaceholder}
            aria-label="A quiet thought"
            className="quiet-textarea w-full resize-none"
            onKeyDown={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="quiet-send font-ui"
            disabled={busy || sent || !text.trim()}
            onClick={onSend}
            aria-live="polite"
          >
            {label}
          </button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        variants={chapterBlock(reduced)}
        className="quiet-begin-again font-ui absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-1/2 -translate-x-1/2"
        onClick={(e) => {
          e.stopPropagation();
          onBeginAgain();
        }}
        aria-label="Return to the first page"
      >
        {ui.beginAgain}
      </motion.button>
    </motion.article>
  );
}
