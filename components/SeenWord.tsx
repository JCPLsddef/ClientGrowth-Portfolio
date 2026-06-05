"use client";

import { motion, useReducedMotion } from "motion/react";

// Copy-as-interaction (juanmora): the word literally resolves from blur into
// focus as it scrolls into view — it *becomes seen*. Static gold under reduced
// motion so the meaning still lands without the effect.
export default function SeenWord({ children }: { children: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="text-gold">{children}</span>;

  return (
    <motion.span
      className="text-gold"
      style={{ display: "inline-block" }}
      initial={{ filter: "blur(12px)", opacity: 0.3 }}
      whileInView={{ filter: "blur(0px)", opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}
