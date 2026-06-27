import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ------ Variants -------------------------------------------

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 whitespace-nowrap",
    "text-xs font-semibold tracking-wide leading-none",
    "rounded-full border",
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-subtle)]",
        primary: "bg-navy-900 text-white border-navy-900",
        secondary: "bg-navy-100 text-navy-800 border-navy-200",
        success: "bg-success-50 text-success-500 border-success-100",
        warning: "bg-warning-50 text-warning-500 border-warning-100",
        error: "bg-error-50 text-error-500 border-error-100",
        info: "bg-info-50 text-info-500 border-info-100",
        accent: "bg-gold-100 text-gold-700 border-gold-200",
        emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
        outline: "bg-transparent text-[var(--text-secondary)] border-[var(--border-default)]",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ------ Props -----------------------------------------------

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  dot?: boolean;
}

// ------ Component -------------------------------------------

function Badge({
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "success" && "bg-success-500",
            variant === "warning" && "bg-warning-500",
            variant === "error" && "bg-error-500",
            variant === "info" && "bg-info-500",
            (!variant || variant === "default") && "bg-[var(--text-tertiary)]",
            variant === "primary" && "bg-white",
            variant === "emerald" && "bg-emerald-500",
          )}
        />
      )}
      {leftIcon}
      {children}
      {rightIcon}
    </span>
  );
}

export { Badge, badgeVariants };
