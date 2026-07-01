"use client";

import * as React from "react";
import { Sidebar } from "@/features/provider-dashboard/components/Sidebar";
import { TopBar } from "@/features/provider-dashboard/components/TopBar";
import { useDashboardStore } from "@/features/provider-dashboard/store/useDashboardStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useProviderDataStore } from "@/features/provider-dashboard/store/useProviderDataStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ------ Layout Wrapper Component -------------------------------------------

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isSidebarCollapsed } = useDashboardStore();
  const { user, fetchCurrentUser, isLoading, error } = useAuthStore();
  const { fetchData } = useProviderDataStore();

  React.useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  React.useEffect(() => {
    if (user?.id) {
      fetchData(user.id);
    }
  }, [user, fetchData]);

  // Handle unauthenticated state or fetch failures
  React.useEffect(() => {
    if (!isLoading && (error || (!user && !isLoading))) {
      router.push("/login");
    }
  }, [user, isLoading, error, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          {/* Animated custom ring loading */}
          <div className="h-10 w-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-xs text-[var(--text-tertiary)] font-medium animate-pulse">
            Loading secure session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 text-[var(--text-primary)]">
      {/* Navigation Panels */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        <TopBar />
        
        {/* Child Pages Content Canvas */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
