import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { APP_NAME } from "@/constants";

// ------ Page Metadata ----------------------------------------

export const metadata: Metadata = {
  title: `Create Account | ${APP_NAME}`,
  description:
    "Create your free ProServe account to start booking verified home cleaning, electrical panel inspects, AC servicing, at-home spa packages, and plumbing professionals across the UAE.",
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: `Create Account | ${APP_NAME}`,
    description: "Start booking trusted professionals across the UAE.",
  },
};

// ------ Page Component --------------------------------------

export default function RegisterPage() {
  return <RegisterForm />;
}
