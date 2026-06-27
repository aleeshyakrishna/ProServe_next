import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ------ Props -----------------------------------------------

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

// ------ Component -------------------------------------------

function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = "md",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        size === "sm" && "gap-3 py-8 px-4",
        size === "md" && "gap-4 py-16 px-6",
        size === "lg" && "gap-6 py-24 px-8",
        className
      )}
      role="status"
      aria-label={title}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-2xl",
            "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]",
            size === "sm" && "h-12 w-12",
            size === "md" && "h-16 w-16",
            size === "lg" && "h-20 w-20",
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <div className="max-w-sm space-y-2">
        <h3
          className={cn(
            "font-semibold text-[var(--text-primary)] text-balance",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg",
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              "text-[var(--text-tertiary)] leading-relaxed text-balance",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
            )}
          >
            {description}
          </p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {action && (
            <Button
              variant="primary"
              size={size === "lg" ? "lg" : "md"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              size={size === "lg" ? "lg" : "md"}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ------ Error State variant ----------------------------------

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      }
      title={title}
      description={description}
      action={onRetry ? { label: "Try again", onClick: onRetry } : undefined}
      className={cn("text-error-500", className)}
      size="md"
    />
  );
}

export { EmptyState, ErrorState };
