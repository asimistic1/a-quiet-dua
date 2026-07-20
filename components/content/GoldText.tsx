"use client";

import { useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GoldText({ children, className = "" }: Props) {
  const reduced = useReducedMotion();

  return (
    <span className={`gold-text-glow inline-block ${className}`}>
      <span className={`gold-text ${reduced ? "" : "gold-text-sheen"}`}>
        {children}
      </span>
    </span>
  );
}
