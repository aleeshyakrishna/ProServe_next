import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";
import { APP_NAME } from "@/constants";

// ------ Page Metadata ----------------------------------------

export const metadata: Metadata = {
  title: `Sign In | ${APP_NAME}`,
  description:
    "Log in to your ProServe account to book verified home services, manage your existing bookings, view earnings, or access your platform wallet.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: `Sign In | ${APP_NAME}`,
    description: "Access your ProServe account and manage bookings in the UAE.",
  },
};

// ------ Page Component --------------------------------------

export default function LoginPage() {
  return <LoginForm />;
}
