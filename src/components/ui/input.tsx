import * as React from "react";
import { cn } from "@/lib/utils";

// ------ Input Component -------------------------------------

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      isLoading,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorTextId = errorText ? `${inputId}-error` : undefined;
    const hasError = Boolean(errorText);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-[var(--text-primary)] leading-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[var(--text-tertiary)]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled || isLoading}
            aria-describedby={cn(helperTextId, errorTextId)}
            aria-invalid={hasError}
            className={cn(
              "w-full h-10 rounded-lg border bg-[var(--surface-card)]",
              "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)]",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
              // Default state
              "border-[var(--border-default)]",
              "focus-visible:border-navy-700 focus-visible:ring-navy-700/20",
              // Error state
              hasError && "border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/20",
              // Icon padding
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon || isLoading ? "pr-10" : "pr-3.5",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-tertiary)]",
              className
            )}
            {...props}
          />

          {(rightIcon || isLoading) && (
            <div className="absolute right-3 flex items-center pointer-events-none text-[var(--text-tertiary)]">
              {isLoading ? (
                <svg
                  className="animate-spin h-4 w-4"
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
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>

        {(helperText || errorText) && (
          <p
            id={errorText ? errorTextId : helperTextId}
            className={cn(
              "text-xs leading-relaxed",
              hasError ? "text-error-500" : "text-[var(--text-tertiary)]"
            )}
            role={hasError ? "alert" : undefined}
          >
            {errorText ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
