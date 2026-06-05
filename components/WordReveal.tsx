"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type WordRevealProps = {
  text: string;
  className?: string;
  /** Delay before the per-word stagger begins. */
  delay?: number;
  /** Words rendered in gold (compared with punctuation stripped). */
  highlight?: string[];
};

const container: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Headline reveal: each word rises out of a clipped line (Unseen / juanmora
// kinetic type). Renders plain, static text under reduced motion.
export default function WordReveal({
  text,
  className = "",
  delay = 0,
  highlight = [],
}: WordRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      style={{ display: "inline" }}
    >
      {words.map((w, i) => {
        const isGold = highlight.includes(w.replace(/[.,!?;:]/g, ""));
        return (
          <Fragment key={`${w}-${i}`}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                paddingBottom: "0.12em",
              }}
            >
              <motion.span
                variants={word}
                style={{ display: "inline-block" }}
                className={isGold ? "text-gold" : undefined}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </motion.span>
  );
}
