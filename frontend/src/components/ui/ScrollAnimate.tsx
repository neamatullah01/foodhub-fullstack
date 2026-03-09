"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimateProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  className?: string;
}

export function ScrollAnimate({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollAnimateProps) {
  // Define where the animation starts based on the direction
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      variants={direction === "none" ? undefined : variants}
      initial="hidden"
      // whileInView triggers when the element enters the screen
      whileInView="visible"
      // viewport={{ once: true }} ensures it only animates once per refresh
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
