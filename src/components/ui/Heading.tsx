"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { fadeInUp, viewportOnce } from "@/lib/animations";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends Omit<HTMLMotionProps<"h1">, "ref"> {
  as?: HeadingLevel;
  gradient?: boolean;
  glow?: boolean;
  animateOnScroll?: boolean;
}

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-[--text-hero] font-bold leading-[--leading-tight] tracking-[--tracking-tight]",
  h2: "text-[--text-h1] font-bold leading-[--leading-tight] tracking-[--tracking-tight]",
  h3: "text-[--text-h2] font-semibold leading-[--leading-tight]",
  h4: "text-[--text-h3] font-semibold leading-[--leading-normal]",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = "h2",
      gradient = false,
      glow = false,
      animateOnScroll = true,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const MotionComponent = motion.create(Component);

    return (
      <MotionComponent
        ref={ref}
        variants={animateOnScroll ? fadeInUp : undefined}
        initial={animateOnScroll ? "hidden" : undefined}
        whileInView={animateOnScroll ? "visible" : undefined}
        viewport={animateOnScroll ? viewportOnce : undefined}
        className={`
          text-[--text-primary]
          ${levelStyles[Component]}
          ${gradient ? "text-gradient" : ""}
          ${glow ? "text-glow" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

Heading.displayName = "Heading";
