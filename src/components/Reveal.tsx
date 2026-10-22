"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (for above-the-fold content). */
  immediate?: boolean;
};

/** Fades and slides its children up the first time they enter the viewport. */
export default function Reveal({ children, className, delay = 0, immediate = false }: RevealProps) {
  const transition = { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const };
  return immediate ? (
    <m.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
      {children}
    </m.div>
  ) : (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
