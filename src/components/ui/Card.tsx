"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cardHover, fadeInUp, viewportOnce } from "@/lib/animations";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "elevated" | "glow";
  hoverEffect?: boolean;
  animateOnScroll?: boolean;
}

const variantStyles = {
  default: "bg-[--bg-card] border border-[--border-default]",
  elevated: "bg-[--bg-elevated] border border-[--border-default] shadow-lg",
  glow: "bg-[--bg-card] border border-[--border-default] glow-card",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      hoverEffect = true,
      animateOnScroll = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      rounded-xl p-6
      transition-all duration-300 ease-out
      ${variantStyles[variant]}
      ${hoverEffect ? "hover:border-[--border-hover] hover:shadow-[--glow-card-hover]" : ""}
      ${className}
    `;

    if (animateOnScroll) {
      return (
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={baseStyles}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    if (hoverEffect) {
      return (
        <motion.div
          ref={ref}
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          className={baseStyles}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.div ref={ref} className={baseStyles} {...props}>
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
