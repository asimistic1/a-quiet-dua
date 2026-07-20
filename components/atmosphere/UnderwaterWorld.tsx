"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";

type Props = {
  active: boolean;
};

function Shark({ reduced }: { reduced: boolean }) {
  return (
    <motion.g
      className={reduced ? undefined : "uw-float-slow"}
      style={{ transformOrigin: "110px 520px" }}
    >
      {/* Overalls body back */}
      <ellipse cx="118" cy="545" rx="52" ry="48" fill="#5BA3D4" />
      {/* Soft belly */}
      <ellipse cx="118" cy="548" rx="40" ry="38" fill="#A8D4F0" />
      {/* Face / head */}
      <ellipse cx="118" cy="500" rx="46" ry="42" fill="#7EC0E8" />
      <ellipse cx="118" cy="508" rx="34" ry="28" fill="#C5E4F7" opacity="0.85" />
      {/* Snout */}
      <ellipse cx="118" cy="518" rx="22" ry="14" fill="#B5DCF2" />
      {/* Eyes */}
      <ellipse cx="102" cy="498" rx="7" ry="8" fill="#1A3A5C" />
      <ellipse cx="134" cy="498" rx="7" ry="8" fill="#1A3A5C" />
      <circle cx="104" cy="496" r="2.2" fill="white" />
      <circle cx="136" cy="496" r="2.2" fill="white" />
      {/* Blush */}
      <ellipse cx="90" cy="512" rx="8" ry="5" fill="#F0A8B8" opacity="0.45" />
      <ellipse cx="146" cy="512" rx="8" ry="5" fill="#F0A8B8" opacity="0.45" />
      {/* Smile */}
      <path
        d="M104,520 Q118,530 132,520"
        fill="none"
        stroke="#1A3A5C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Fins */}
      <path d="M70,530 Q48,545 62,565 Q78,548 78,535 Z" fill="#5BA3D4" />
      <path d="M166,530 Q188,545 174,565 Q158,548 158,535 Z" fill="#5BA3D4" />
      {/* Tail */}
      <path d="M118,590 Q118,620 95,640 Q118,628 141,640 Q118,620 118,590 Z" fill="#5BA3D4" />
      {/* Overalls */}
      <path
        d="M88,538 Q118,548 148,538 L152,575 Q118,592 84,575 Z"
        fill="#3D7AAB"
        opacity="0.92"
      />
      <path d="M98,538 L92,500" stroke="#3D7AAB" strokeWidth="5" strokeLinecap="round" />
      <path d="M138,538 L144,500" stroke="#3D7AAB" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="542" r="3.5" fill="#E8F4FC" />
      <circle cx="136" cy="542" r="3.5" fill="#E8F4FC" />
      {/* Crown */}
      <path
        d="M95,470 L102,448 L110,462 L118,442 L126,462 L134,448 L141,470 Z"
        fill="#E8C86A"
        stroke="#C4A04A"
        strokeWidth="1"
      />
      <circle cx="102" cy="452" r="2.5" fill="#F5E6A8" />
      <circle cx="118" cy="446" r="2.5" fill="#F5E6A8" />
      <circle cx="134" cy="452" r="2.5" fill="#F5E6A8" />
      {/* Balloon string */}
      <path
        d="M155,500 Q175,460 188,400"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Red balloon */}
      <motion.g
        className={reduced ? undefined : "uw-balloon"}
        style={{ transformOrigin: "190px 370px" }}
      >
        <ellipse cx="190" cy="368" rx="22" ry="26" fill="#E24B4B" />
        <ellipse cx="182" cy="358" rx="6" ry="8" fill="#F08080" opacity="0.55" />
        <path d="M190,394 L186,402 L194,402 Z" fill="#C43A3A" />
      </motion.g>
    </motion.g>
  );
}

function Jellyfish({
  cx,
  cy,
  scale = 1,
  delay = 0,
  reduced,
}: {
  cx: number;
  cy: number;
  scale?: number;
  delay?: number;
  reduced: boolean;
}) {
  return (
    <g
      className={reduced ? undefined : "uw-jelly"}
      style={
        {
          transformOrigin: `${cx}px ${cy}px`,
          ["--jelly-delay" as string]: `${delay}s`,
        } as CSSProperties
      }
      transform={`translate(${cx}, ${cy}) scale(${scale}) translate(${-cx}, ${-cy})`}
    >
      <ellipse cx={cx} cy={cy} rx="18" ry="14" fill="rgba(255,255,255,0.55)" />
      <ellipse cx={cx} cy={cy + 2} rx="14" ry="10" fill="rgba(200,230,255,0.65)" />
      <ellipse cx={cx} cy={cy - 2} rx="8" ry="5" fill="rgba(255,255,255,0.7)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${cx - 10 + i * 5},${cy + 12} Q${cx - 8 + i * 5},${cy + 32} ${cx - 10 + i * 5},${cy + 48}`}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

function Seaweed({ reduced }: { reduced: boolean }) {
  return (
    <g className={reduced ? undefined : "uw-seaweed"} style={{ transformOrigin: "340px 620px" }}>
      <path
        d="M300,640 Q290,560 310,500 Q330,440 315,380"
        fill="none"
        stroke="#9B86C4"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M330,640 Q345,555 325,490 Q305,430 335,360"
        fill="none"
        stroke="#B8A4D4"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M360,640 Q375,570 355,510 Q340,450 370,400"
        fill="none"
        stroke="#8A74B8"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M385,640 Q400,580 390,520 Q380,470 405,430"
        fill="none"
        stroke="#C4B4E0"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.65"
      />
    </g>
  );
}

function Bunting() {
  return (
    <g opacity="0.92">
      <path
        d="M40,48 Q200,78 360,42"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
      {/* Scallop shell */}
      <g transform="translate(70,42)">
        <path
          d="M0,18 Q-16,0 -8,-12 Q0,-4 8,-12 Q16,0 0,18 Z"
          fill="#C9B8E0"
        />
        <path d="M0,18 L0,-4" stroke="#A890C8" strokeWidth="1" />
      </g>
      {/* Star */}
      <path
        d="M130,58 L134,68 L145,68 L136,75 L139,86 L130,79 L121,86 L124,75 L115,68 L126,68 Z"
        fill="#B8A4D4"
      />
      {/* Spiral shell */}
      <g transform="translate(200,55)">
        <ellipse cx="0" cy="0" rx="18" ry="14" fill="#A890C8" />
        <path
          d="M-6,2 Q0,-8 8,0 Q4,8 -4,4 Q0,-2 4,2"
          fill="none"
          stroke="#E8DCF5"
          strokeWidth="2"
        />
      </g>
      {/* Star */}
      <path
        d="M270,48 L273,56 L282,56 L275,61 L278,70 L270,65 L262,70 L265,61 L258,56 L267,56 Z"
        fill="#C9B8E0"
      />
      {/* Conch */}
      <g transform="translate(320,50)">
        <path
          d="M-10,8 Q-14,-6 0,-12 Q14,-6 8,10 Q0,16 -10,8 Z"
          fill="#D4C4E8"
        />
        <path d="M-2,-4 Q4,0 2,8" fill="none" stroke="#9B86C4" strokeWidth="1.5" />
      </g>
    </g>
  );
}

function Motifs() {
  const items = useMemo(
    () => [
      { x: 50, y: 160, type: "star" as const, o: 0.18 },
      { x: 340, y: 180, type: "shell" as const, o: 0.16 },
      { x: 80, y: 280, type: "shell" as const, o: 0.12 },
      { x: 300, y: 300, type: "star" as const, o: 0.14 },
      { x: 200, y: 140, type: "star" as const, o: 0.1 },
      { x: 360, y: 400, type: "shell" as const, o: 0.12 },
    ],
    [],
  );

  return (
    <g>
      {items.map((item, i) =>
        item.type === "star" ? (
          <path
            key={i}
            d={`M${item.x},${item.y - 8} L${item.x + 3},${item.y} L${item.x + 10},${item.y} L${item.x + 4},${item.y + 5} L${item.x + 6},${item.y + 12} L${item.x},${item.y + 7} L${item.x - 6},${item.y + 12} L${item.x - 4},${item.y + 5} L${item.x - 10},${item.y} L${item.x - 3},${item.y} Z`}
            fill="white"
            opacity={item.o}
          />
        ) : (
          <ellipse
            key={i}
            cx={item.x}
            cy={item.y}
            rx="12"
            ry="9"
            fill="white"
            opacity={item.o}
          />
        ),
      )}
    </g>
  );
}

function Bubbles({ reduced }: { reduced: boolean }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 8 + ((i * 17) % 84),
        size: 4 + (i % 5) * 2,
        delay: (i * 0.7) % 8,
        dur: 10 + (i % 6) * 2,
      })),
    [],
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="uw-bubble absolute rounded-full"
          style={
            {
              left: `${b.left}%`,
              bottom: "-4%",
              width: b.size,
              height: b.size,
              ["--b-delay" as string]: `${b.delay}s`,
              ["--b-dur" as string]: `${b.dur}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function UnderwaterWorld({ active }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.5 : 1.4 }}
      style={{ visibility: active ? "visible" : "hidden" }}
    >
      {/* Watercolor paper grain bloom */}
      <div className="uw-watercolor absolute inset-0" />
      <div className={`uw-rays absolute inset-0 ${reduced ? "" : "uw-rays-drift"}`} />
      <div className={`uw-caustics absolute inset-0 ${reduced ? "" : "uw-caustics-drift"}`} />

      <Bubbles reduced={!!reduced} />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 720"
        preserveAspectRatio="xMidYMid slice"
      >
        <Bunting />
        <Motifs />
        <Seaweed reduced={!!reduced} />
        <Jellyfish cx={310} cy={480} scale={1} delay={0} reduced={!!reduced} />
        <Jellyfish cx={350} cy={520} scale={0.75} delay={1.2} reduced={!!reduced} />
        <Jellyfish cx={280} cy={540} scale={0.85} delay={0.6} reduced={!!reduced} />
        <Shark reduced={!!reduced} />
      </svg>
    </motion.div>
  );
}
