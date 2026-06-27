"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// ------ Props -----------------------------------------------

interface RatingProps {
  /**
   * The current rating value (0–5).
   */
  value: number;
  /**
   * Max rating (default 5).
   */
  max?: number;
  /**
   * When true, allows the user to click to set a rating.
   */
  interactive?: boolean;
  /**
   * Called when the user selects a new rating.
   */
  onChange?: (value: number) => void;
  /**
   * Size variant.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optionally show the numeric value.
   */
  showValue?: boolean;
  /**
   * Optionally show the review count.
   */
  reviewCount?: number;
  className?: string;
}

// ------ Component -------------------------------------------

function Rating({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const starSizes: Record<NonNullable<RatingProps["size"]>, number> = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  const starSize = starSizes[size];
  const display = hovered ?? value;

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role={interactive ? "radiogroup" : undefined}
      aria-label={`Rating: ${value} out of ${max}`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const position = i + 1;
          const isFilled = display >= position;
          const isPartial = !isFilled && display > i && display < position;

          return (
            <button
              key={i}
              type="button"
              role={interactive ? "radio" : undefined}
              aria-checked={interactive ? value === position : undefined}
              aria-label={interactive ? `Rate ${position} out of ${max}` : undefined}
              tabIndex={interactive ? 0 : -1}
              onClick={interactive && onChange ? () => onChange(position) : undefined}
              onMouseEnter={interactive ? () => setHovered(position) : undefined}
              onMouseLeave={interactive ? () => setHovered(null) : undefined}
              className={cn(
                "relative transition-transform duration-100",
                interactive && "cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-sm"
              )}
            >
              {isPartial ? (
                <PartialStar size={starSize} fill={display - i} />
              ) : (
                <Star
                  size={starSize}
                  aria-hidden="true"
                  className={cn(
                    "transition-colors duration-100",
                    isFilled ? "fill-gold-500 stroke-gold-500" : "fill-transparent stroke-[var(--border-strong)]"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span
          className={cn(
            "font-semibold text-[var(--text-primary)] tabular-nums",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base",
          )}
        >
          {value.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span
          className={cn(
            "text-[var(--text-tertiary)]",
            size === "sm" && "text-xs",
            size === "md" && "text-xs",
            size === "lg" && "text-sm",
          )}
        >
          ({reviewCount.toLocaleString("en-AE")})
        </span>
      )}
    </div>
  );
}

// ------ Partial Star (for fractional ratings) ---------------

function PartialStar({ size, fill }: { size: number; fill: number }) {
  const id = React.useId();
  const percentage = `${fill * 100}%`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset={percentage} stopColor="hsl(44 72% 54%)" />
          <stop offset={percentage} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={`url(#${id})`}
        stroke="hsl(44 72% 54%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Rating };
