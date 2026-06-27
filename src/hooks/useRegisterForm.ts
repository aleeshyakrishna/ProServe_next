"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/validations/auth.schema";
import type { RegisterFormData, AuthState } from "@/types/auth";

export function useRegisterForm() {
  const router = useRouter();
  const [authState, setAuthState] = React.useState<AuthState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      acceptTerms: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setAuthState({ isLoading: true, isSuccess: false, error: null });

    // Simulate database network latency (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation criteria for email duplicates
    if (data.email === "duplicate@proserve.ae") {
      setAuthState({
        isLoading: false,
        isSuccess: false,
        error: "This email address is already registered. Please sign in instead.",
      });
      return;
    }

    setAuthState({ isLoading: false, isSuccess: true, error: null });

    // Redirect based on selected user role
    if (data.role === "provider") {
      router.push("/provider/dashboard");
    } else {
      router.push("/customer/dashboard");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: authState.isLoading,
    isSuccess: authState.isSuccess,
    submitError: authState.error,
  };
}
