import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ------ Variants -------------------------------------------

const buttonVariants = cva(
  // Base styles shared by all variants
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-semibold tracking-tight leading-none",
    "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-navy-900 text-white",
          "hover:bg-navy-800 active:bg-navy-950",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-navy-700",
        ],
        secondary: [
          "bg-emerald-500 text-white",
          "hover:bg-emerald-400 active:bg-emerald-600",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-emerald-400",
        ],
        accent: [
          "bg-gold-500 text-navy-900",
          "hover:bg-gold-400 active:bg-gold-600",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-gold-400",
        ],
        outline: [
          "border border-[var(--border-default)] bg-transparent",
          "text-[var(--text-primary)]",
          "hover:bg-[var(--bg-secondary)] hover:border-[var(--border-strong)]",
          "focus-visible:ring-navy-700",
        ],
        ghost: [
          "bg-transparent text-[var(--text-secondary)]",
          "hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
          "focus-visible:ring-navy-700",
        ],
        destructive: [
          "bg-error-500 text-white",
          "hover:bg-red-600 active:bg-red-700",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-red-400",
        ],
        link: [
          "bg-transparent text-navy-700 underline-offset-4",
          "hover:underline hover:text-navy-900",
          "focus-visible:ring-navy-700",
          "h-auto p-0 shadow-none",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-5 text-sm rounded-lg",
        lg: "h-12 px-7 text-base rounded-xl",
        xl: "h-14 px-8 text-lg rounded-xl",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ------ Props -----------------------------------------------

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Renders a loading spinner and disables the button when true.
   */
  isLoading?: boolean;
  /**
   * Optional left-side icon element.
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional right-side icon element.
   */
  rightIcon?: React.ReactNode;
  /**
   * Renders as a child element (useful for wrapping Next.js Link).
   */
  asChild?: boolean;
}

// ------ Component -------------------------------------------

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

// ------ Loading Spinner -------------------------------------

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ------ Exports ---------------------------------------------

export { Button, buttonVariants };
