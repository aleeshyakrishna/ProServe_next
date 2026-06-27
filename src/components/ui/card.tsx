import * as React from "react";
import { cn } from "@/lib/utils";

// ------ Card Root -------------------------------------------

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, adds a hover lift effect with shadow.
   */
  hover?: boolean;
  /**
   * When true, removes default padding.
   */
  noPadding?: boolean;
}

function Card({ className, hover, noPadding, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-[var(--surface-card)] border-[var(--border-subtle)]",
        "shadow-sm",
        !noPadding && "p-6",
        hover && [
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:shadow-lg hover:-translate-y-0.5",
          "cursor-pointer",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ------ Card Header -----------------------------------------

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 pb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ------ Card Title ------------------------------------------

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function CardTitle({ className, as: Tag = "h3", children, ...props }: CardTitleProps) {
  return (
    <Tag
      className={cn(
        "text-base font-semibold leading-tight tracking-tight text-[var(--text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ------ Card Description ------------------------------------

function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-[var(--text-tertiary)] leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ------ Card Content ----------------------------------------

function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// ------ Card Footer -----------------------------------------

function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center pt-4 mt-4 border-t border-[var(--border-subtle)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ------ Exports ---------------------------------------------

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
