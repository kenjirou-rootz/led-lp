"use client";

import { forwardRef } from "react";
import { Container } from "@/components/ui";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "default" | "alt" | "gradient" | "spotlight" | "grid";
  containerSize?: "default" | "narrow" | "wide";
  noPadding?: boolean;
}

const variantStyles = {
  default: "bg-[var(--bg-primary)]",
  alt: "bg-[var(--bg-secondary)]",
  gradient: "bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]",
  spotlight: "bg-[var(--bg-primary)] bg-spotlight",
  grid: "bg-[var(--bg-secondary)] bg-pixel-grid",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      variant = "default",
      containerSize = "default",
      noPadding = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`
          relative
          ${noPadding ? "" : "py-[var(--section-padding-y)]"}
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = "Section";
