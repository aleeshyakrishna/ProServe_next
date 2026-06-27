"use client";

import * as React from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/components/ui/input";
import { PASSWORD_RULES } from "@/validations/auth.schema";

// ------ Types -----------------------------------------------

interface PasswordInputProps extends Omit<InputProps, "type"> {
  showStrengthMeter?: boolean;
  showChecklist?: boolean;
}

interface ValidationRules {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

// ------ Component -------------------------------------------

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, errorText, showStrengthMeter = false, showChecklist = false, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [value, setValue] = React.useState("");

    // Calculate validation states
    const checks: ValidationRules = {
      length: value.length >= PASSWORD_RULES.min,
      uppercase: PASSWORD_RULES.hasUppercase.test(value),
      lowercase: PASSWORD_RULES.hasLowercase.test(value),
      number: PASSWORD_RULES.hasNumber.test(value),
      special: PASSWORD_RULES.hasSpecial.test(value),
    };

    // Calculate score (0 to 5)
    const score = Object.values(checks).filter(Boolean).length;

    // Handle change to update internal score and forward event
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const toggleVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="space-y-2 w-full">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          errorText={errorText}
          onChange={handleTextChange}
          className={cn("pr-10", className)}
          rightIcon={
            <button
              type="button"
              onClick={toggleVisibility}
              tabIndex={0}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          {...props}
        />

        {/* 1. Live Strength Meter */}
        {showStrengthMeter && value.length > 0 && (
          <div className="space-y-1.5 px-0.5 animate-fade-in" aria-live="polite">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              <span>Password Strength:</span>
              <span className={cn(
                score <= 2 && "text-error-500",
                (score === 3 || score === 4) && "text-warning-500",
                score === 5 && "text-success-500"
              )}>
                {score <= 2 && "Weak"}
                {(score === 3 || score === 4) && "Medium"}
                {score === 5 && "Strong"}
              </span>
            </div>
            {/* Strength Bar */}
            <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300 rounded-full",
                  score <= 2 && "bg-error-500",
                  (score === 3 || score === 4) && "bg-warning-500",
                  score === 5 && "bg-success-500"
                )}
                style={{ width: `${(score / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* 2. Interactive Checklist Panel */}
        {showChecklist && value.length > 0 && (
          <div className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-2 animate-fade-in">
            <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest leading-none">
              Requirements
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5" role="list">
              <ChecklistItem met={checks.length} label={`At least ${PASSWORD_RULES.min} chars`} />
              <ChecklistItem met={checks.uppercase} label="Uppercase letter" />
              <ChecklistItem met={checks.lowercase} label="Lowercase letter" />
              <ChecklistItem met={checks.number} label="One number" />
              <ChecklistItem met={checks.special} label="Special character" className="col-span-2" />
            </ul>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

// ------ Checklist Item Helper --------------------------------

function ChecklistItem({ met, label, className }: { met: boolean; label: string; className?: string }) {
  return (
    <li
      className={cn(
        "flex items-center gap-1.5 text-xs transition-colors duration-150",
        met ? "text-success-500 font-medium" : "text-neutral-400 dark:text-neutral-500",
        className
      )}
    >
      <span className="shrink-0" aria-hidden="true">
        {met ? (
          <Check size={12} className="stroke-[3]" />
        ) : (
          <X size={12} className="stroke-[3]" />
        )}
      </span>
      <span>{label}</span>
    </li>
  );
}
