"use client";

import { chapters, ui } from "@/lib/copy";
import { palette } from "@/lib/palette";

type Props = {
  onClose: () => void;
};

export default function LetterMode({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 h-[100dvh] overflow-y-auto overscroll-contain"
      style={{
        background: `linear-gradient(180deg, ${palette.indigoDeep} 0%, ${palette.mauve} 100%)`,
        color: palette.silver,
      }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={ui.letterModeTitle}
    >
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[42ch] flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+3rem)] pt-[calc(env(safe-area-inset-top)+2.5rem)]">
        <button
          type="button"
          onClick={onClose}
          className="font-ui mb-10 self-start opacity-55 transition-opacity hover:opacity-80"
          style={{ color: palette.gold, fontSize: "10px" }}
        >
          {ui.letterModeReturn}
        </button>

        <div className="flex flex-col gap-16">
          {chapters.map((ch, index) => (
            <section key={index} className="flex flex-col items-center text-center">
                  {ch.englishOnly ? (
                <>
                  {ch.title && (
                    <p
                      className="font-serif mb-4"
                      style={{
                        fontSize: "clamp(1.4rem, 5vw, 2rem)",
                        color: palette.gold,
                        lineHeight: 1.3,
                      }}
                    >
                      {ch.title}
                    </p>
                  )}
                  {ch.tagline && (
                    <p
                      className="font-ui mb-4"
                      style={{
                        fontSize: "10px",
                        opacity: 0.7,
                        maxWidth: "36ch",
                        lineHeight: 1.7,
                      }}
                    >
                      {ch.tagline}
                    </p>
                  )}
                </>
              ) : (
                ch.urdu.map((line, i) => (
                  <p
                    key={i}
                    dir="rtl"
                    lang="ur"
                    className="font-urdu urdu-body mb-3"
                    style={{ color: palette.silver }}
                  >
                    {line}
                  </p>
                ))
              )}
              <p className="font-serif english-lead" style={{ opacity: 0.9 }}>
                {ch.english}
              </p>
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="font-ui mt-16 self-center opacity-45 transition-opacity hover:opacity-70"
          style={{ color: palette.gold, fontSize: "10px" }}
        >
          {ui.letterModeReturn}
        </button>
      </div>
    </div>
  );
}
