"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";

type BadgeVariant = "default" | "primary" | "success" | "warning";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[--bg-elevated] text-[--text-secondary] border-[--border-default]",
  primary: "bg-[rgba(59,130,246,0.15)] text-[--accent-glow] border-[rgba(59,130,246,0.3)]",
  success: "bg-[rgba(34,197,94,0.15)] text-[--accent-success] border-[rgba(34,197,94,0.3)]",
  warning: "bg-[rgba(245,158,11,0.15)] text-[--accent-cta] border-[rgba(245,158,11,0.3)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", icon, children, className = "" }, ref) => {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          inline-flex items-center gap-1.5
          font-medium rounded-full border
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = "Badge";
