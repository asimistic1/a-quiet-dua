"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { palette } from "@/lib/palette";

type Props = {
  active: boolean;
};

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
  alphaDir: number;
  color: string;
};

type Sparkle = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
};

export default function DawnParticles({ active }: Props) {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const sparkleRef = useRef<Sparkle | null>(null);
  const sparkleTimerRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    if (!active || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#E6C280", "#F0D9AC", "#FFE6B8", "#F2D6C9"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 480 ? 28 : 48;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.0,
        speed: 10 + Math.random() * 12,
        sway: 8 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.15 + Math.random() * 0.45,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        color: colors[Math.floor(Math.random() * colors.length)]!,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    let last = performance.now();
    sparkleTimerRef.current = 0;

    const drawGlint = (x: number, y: number, alpha: number) => {
      const arm = 5;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = palette.brightGold;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - arm, y);
      ctx.lineTo(x + arm, y);
      ctx.moveTo(x, y - arm);
      ctx.lineTo(x, y + arm);
      ctx.stroke();
      ctx.restore();
    };

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (!visibleRef.current) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.y += p.speed * dt;
        p.phase += dt * 0.9;
        p.alpha += p.alphaDir * dt * 0.2;
        if (p.alpha >= 0.6) {
          p.alpha = 0.6;
          p.alphaDir = -1;
        } else if (p.alpha <= 0.15) {
          p.alpha = 0.15;
          p.alphaDir = 1;
        }
        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        const x = p.x + Math.sin(p.phase) * p.sway;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      sparkleTimerRef.current += dt;
      if (!sparkleRef.current && sparkleTimerRef.current > 4) {
        sparkleTimerRef.current = 0;
        sparkleRef.current = {
          x: w * (0.2 + Math.random() * 0.6),
          y: h * (0.15 + Math.random() * 0.5),
          life: 0,
          maxLife: 0.9,
        };
      }

      if (sparkleRef.current) {
        const s = sparkleRef.current;
        s.life += dt;
        const t = s.life / s.maxLife;
        const alpha = t < 0.5 ? t * 2 * 0.7 : (1 - t) * 2 * 0.7;
        drawGlint(s.x, s.y, Math.max(0, alpha));
        if (s.life >= s.maxLife) sparkleRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active, reduced]);

  if (!active) return null;

  if (reduced) {
    return (
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(55% 45% at 50% 30%, ${palette.gold}33 0%, transparent 70%)`,
        }}
      />
    );
  }

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
    />
  );
}
