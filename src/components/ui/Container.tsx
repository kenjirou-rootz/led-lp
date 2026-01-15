import { forwardRef } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
  as?: "div" | "section" | "article" | "main";
}

const sizeStyles = {
  default: "max-w-[var(--container-max)]",
  narrow: "max-w-[var(--content-max)]",
  wide: "max-w-[1440px]",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { size = "default", as: Component = "div", children, className = "", ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={`
          w-full mx-auto
          px-[var(--container-padding)]
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
