"use client";

import { forwardRef } from "react";
import { Container } from "@/components/ui";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "default" | "alt" | "gradient";
  containerSize?: "default" | "narrow" | "wide";
  noPadding?: boolean;
}

const variantStyles = {
  default: "bg-[var(--bg-primary)]",
  alt: "bg-[var(--bg-secondary)]",
  gradient: "bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]",
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
          ${noPadding ? "" : "py-[var(--section-padding)]"}
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
