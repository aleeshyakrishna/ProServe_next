import * as React from "react";
import { cn } from "@/lib/utils";

// ------ Textarea Component ----------------------------------

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isLoading?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      errorText,
      isLoading,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id ?? React.useId();
    const helperTextId = helperText ? `${textareaId}-helper` : undefined;
    const errorTextId = errorText ? `${textareaId}-error` : undefined;
    const hasError = Boolean(errorText);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-sm font-medium text-[var(--text-primary)] leading-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            disabled={disabled || isLoading}
            aria-describedby={cn(helperTextId, errorTextId)}
            aria-invalid={hasError}
            className={cn(
              "w-full rounded-lg border bg-[var(--surface-card)]",
              "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)]",
              "p-3.5 leading-relaxed resize-y",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
              // Default state
              "border-[var(--border-default)]",
              "focus-visible:border-navy-700 focus-visible:ring-navy-700/20",
              // Error state
              hasError && "border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/20",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-tertiary)]"
            )}
            {...props}
          />
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

Textarea.displayName = "Textarea";

export { Textarea };
