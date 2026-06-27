import * as React from "react";
import { cn } from "@/lib/utils";

// ------ Single Skeleton -------------------------------------

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true renders as a circle (for avatars).
   */
  rounded?: boolean;
}

function Skeleton({ className, rounded, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton",
        rounded ? "rounded-full" : "rounded-lg",
        className
      )}
      {...props}
    />
  );
}

// ------ Text Lines Skeleton ---------------------------------

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = "60%",
}: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={i === lines - 1 ? { width: lastLineWidth } : { width: "100%" }}
        />
      ))}
    </div>
  );
}

// ------ Card Skeleton ----------------------------------------

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-2xl border border-[var(--border-subtle)] p-6 space-y-4",
        className
      )}
    >
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton rounded className="h-9 w-9" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </div>
  );
}

// ------ Provider Card Skeleton ------------------------------

function SkeletonProviderCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-2xl border border-[var(--border-subtle)] p-6 space-y-5",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Skeleton rounded className="h-14 w-14 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>
      <SkeletonText lines={2} lastLineWidth="70%" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonProviderCard };
