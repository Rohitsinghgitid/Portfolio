"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const container: Variants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const wordAnimation: Variants = {
  end: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 },
  },
  start: {
    opacity: 0,
    y: 30,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 },
  },
};

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function AnimatedHeading({ children, className = "", as = "h2" }: AnimatedHeadingProps) {
  const Component = motion[as as keyof typeof motion] as React.ElementType;

  return (
    <Component
      className={className}
      variants={container}
      initial="start"
      whileInView="end"
      viewport={{ once: true, margin: "-10%" }}
    >
      {React.Children.map(children, (childNode, i) => {
        if (typeof childNode === "string") {
          return childNode.split(" ").map((word, index) => {
            if (word === "") return null;
            return (
              <motion.span key={`word-${i}-${index}`} variants={wordAnimation} className="inline-block mr-[0.25em]">
                {word}
              </motion.span>
            );
          });
        }
        if (React.isValidElement(childNode)) {
          return (
            <motion.span key={`element-${i}`} variants={wordAnimation} className="inline-block mr-[0.25em]">
              {childNode}
            </motion.span>
          );
        }
        return childNode;
      })}
    </Component>
  );
}
