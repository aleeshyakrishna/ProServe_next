import * as React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";

// ------ Auth Group Layout ------------------------------------

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
