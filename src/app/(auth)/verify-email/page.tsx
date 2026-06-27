import * as React from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";

// ------ Page Metadata ----------------------------------------

export const metadata = {
  title: `Verify Email | ${APP_NAME}`,
  description: "Verify your email address to get started with ProServe.",
};

// ------ Page Component --------------------------------------

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Icon Wrapper */}
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 mb-2">
        <Mail size={32} strokeWidth={1.5} />
      </div>

      {/* Header Copy */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Check Your Inbox
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
          We have sent a verification link to your email address. Please click the link to confirm your account and start booking verified professionals.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full pt-4 space-y-3">
        <Button variant="primary" className="w-full" asChild>
          <Link href="/login" className="w-full flex items-center justify-center gap-2">
            Back to Sign In
            <ArrowRight size={16} />
          </Link>
        </Button>
        
        <p className="text-xs text-[var(--text-tertiary)] pt-2">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
}
