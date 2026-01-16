"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { staggerContainer, staggerContainerFast, staggerContainerSlow, staggerItem } from "@/lib/animations";

type StaggerSpeed = "fast" | "normal" | "slow";

interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  speed?: StaggerSpeed;
  once?: boolean;
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "ref">;

const speedVariants = {
  fast: staggerContainerFast,
  normal: staggerContainer,
  slow: staggerContainerSlow,
};

export function StaggerContainer({
  speed = "normal",
  once = true,
  children,
  className = "",
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={speedVariants[speed]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  ...props
}: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem} className={className} {...props}>
      {children}
    </motion.div>
  );
}
