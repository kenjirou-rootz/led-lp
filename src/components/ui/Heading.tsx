"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { fadeInUp, viewportOnce } from "@/lib/animations";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  as?: HeadingLevel;
  gradient?: boolean;
  glow?: boolean;
  animateOnScroll?: boolean;
  children?: React.ReactNode;
  className?: string;
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
    const baseClassName = `
      text-[--text-primary]
      ${levelStyles[Component]}
      ${gradient ? "text-gradient" : ""}
      ${glow ? "text-glow" : ""}
      ${className}
    `;

    if (!animateOnScroll) {
      return (
        <Component ref={ref} className={baseClassName} {...props}>
          {children}
        </Component>
      );
    }

    // Use motion[tag] syntax for dynamic heading levels
    const MotionH1 = motion.h1;
    const MotionH2 = motion.h2;
    const MotionH3 = motion.h3;
    const MotionH4 = motion.h4;

    const motionProps = {
      ref,
      variants: fadeInUp,
      initial: "hidden",
      whileInView: "visible",
      viewport: viewportOnce,
      className: baseClassName,
      ...props,
    };

    switch (Component) {
      case "h1":
        return <MotionH1 {...motionProps}>{children}</MotionH1>;
      case "h2":
        return <MotionH2 {...motionProps}>{children}</MotionH2>;
      case "h3":
        return <MotionH3 {...motionProps}>{children}</MotionH3>;
      case "h4":
        return <MotionH4 {...motionProps}>{children}</MotionH4>;
      default:
        return <MotionH2 {...motionProps}>{children}</MotionH2>;
    }
  }
);

Heading.displayName = "Heading";
