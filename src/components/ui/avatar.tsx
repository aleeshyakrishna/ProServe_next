import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getInitials } from "@/lib/utils";

// ------ Variants -------------------------------------------

const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0",
    "rounded-full overflow-hidden",
    "font-semibold text-white uppercase",
    "select-none",
  ],
  {
    variants: {
      size: {
        xs:  "h-6 w-6 text-[10px]",
        sm:  "h-8 w-8 text-xs",
        md:  "h-10 w-10 text-sm",
        lg:  "h-12 w-12 text-base",
        xl:  "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      colorScheme: {
        navy:    "bg-navy-800",
        emerald: "bg-emerald-600",
        gold:    "bg-gold-600",
        slate:   "bg-neutral-700",
      },
    },
    defaultVariants: {
      size: "md",
      colorScheme: "navy",
    },
  }
);

// ------ Status Dot ------------------------------------------

const statusVariants = cva(
  "absolute bottom-0 right-0 rounded-full border-2 border-[var(--surface-card)]",
  {
    variants: {
      status: {
        online:  "bg-success-500",
        offline: "bg-neutral-400",
        busy:    "bg-warning-500",
      },
      avatarSize: {
        xs:  "h-1.5 w-1.5",
        sm:  "h-2 w-2",
        md:  "h-2.5 w-2.5",
        lg:  "h-3 w-3",
        xl:  "h-3.5 w-3.5",
        "2xl": "h-4 w-4",
      },
    },
    defaultVariants: {
      status: "online",
      avatarSize: "md",
    },
  }
);

// ------ Props -----------------------------------------------

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt: string;
  name?: string;
  status?: "online" | "offline" | "busy";
  className?: string;
}

// ------ Component -------------------------------------------

function Avatar({ src, alt, name, size, colorScheme, status, className }: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ size, colorScheme }), className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={getSizes(size)}
        />
      ) : (
        <span aria-label={alt}>
          {name ? getInitials(name) : "?"}
        </span>
      )}

      {status && (
        <span
          aria-label={`Status: ${status}`}
          className={statusVariants({ status, avatarSize: size ?? "md" })}
        />
      )}
    </div>
  );
}

// ------ Helpers ---------------------------------------------

function getSizes(size: AvatarProps["size"]): string {
  const map: Record<NonNullable<AvatarProps["size"]>, string> = {
    xs: "24px",
    sm: "32px",
    md: "40px",
    lg: "48px",
    xl: "64px",
    "2xl": "80px",
  };
  return map[size ?? "md"];
}

// ------ Avatar Group ----------------------------------------

interface AvatarGroupProps {
  avatars: Array<Pick<AvatarProps, "src" | "alt" | "name">>;
  max?: number;
  size?: AvatarProps["size"];
  className?: string;
}

function AvatarGroup({ avatars, max = 4, size = "sm", className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div
      className={cn("flex items-center -space-x-2", className)}
      aria-label={`${avatars.length} users`}
    >
      {visible.map((avatar, i) => (
        <div
          key={i}
          className="ring-2 ring-[var(--surface-card)] rounded-full"
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            avatarVariants({ size, colorScheme: "slate" }),
            "ring-2 ring-[var(--surface-card)]"
          )}
          aria-label={`${overflow} more users`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup, avatarVariants };
