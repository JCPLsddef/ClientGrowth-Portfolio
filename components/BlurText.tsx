"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";

type BlurTextProps = {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
};

const clean = (w: string) => w.toLowerCase().replace(/[.,!?;:]/g, "");

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: "0.3em" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BlurText({
  text,
  className = "",
  highlightWords = [],
  highlightClassName = "",
  delay = 0,
}: BlurTextProps) {
  const words = text.split(" ");
  const highlighted = new Set(highlightWords.map(clean));

  // Single trigger on the container staggers the words as children — reliable,
  // unlike a separate in-view observer per word (one could fail to fire).
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            aria-hidden="true"
            className="inline-block"
            variants={wordVariants}
          >
            <span className={highlighted.has(clean(word)) ? highlightClassName : undefined}>
              {word}
            </span>
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  );
}
