import * as React from "react";
import { cn } from "@/lib/utils";

// ------ AuthHeader Component ---------------------------------

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function AuthHeader({ title, subtitle, className }: AuthHeaderProps) {
  return (
    <div className={cn("space-y-2 mb-6 text-center sm:text-left", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
        {title}
      </h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed text-balance">
        {subtitle}
      </p>
    </div>
  );
}
