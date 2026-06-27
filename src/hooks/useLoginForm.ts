"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validations/auth.schema";
import type { LoginFormData, AuthState } from "@/types/auth";

export function useLoginForm() {
  const router = useRouter();
  const [authState, setAuthState] = React.useState<AuthState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthState({ isLoading: true, isSuccess: false, error: null });

    // Simulate database network latency (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation criteria for demonstration
    if (data.email === "error@proserve.ae") {
      setAuthState({
        isLoading: false,
        isSuccess: false,
        error: "Invalid email credentials. Please check your entries and try again.",
      });
      return;
    }

    setAuthState({ isLoading: false, isSuccess: true, error: null });
    
    // Redirect to default customer dashboard page
    router.push("/customer/dashboard");
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: authState.isLoading,
    isSuccess: authState.isSuccess,
    submitError: authState.error,
  };
}
