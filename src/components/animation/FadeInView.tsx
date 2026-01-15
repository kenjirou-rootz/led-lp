"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeInUp, fadeIn, fadeInLeft, fadeInRight, viewportOnce } from "@/lib/animations";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInViewProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionVariants = {
  up: fadeInUp,
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  left: fadeInLeft,
  right: fadeInRight,
  none: fadeIn,
};

export function FadeInView({
  direction = "up",
  delay = 0,
  duration,
  once = true,
  children,
  className = "",
  ...props
}: FadeInViewProps) {
  const variants = directionVariants[direction];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3, margin: "-50px" }}
      transition={
        delay || duration
          ? {
              delay,
              duration: duration ?? 0.6,
              ease: [0.16, 1, 0.3, 1],
            }
          : undefined
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
