"use client";

import * as React from "react";
import { Sidebar } from "@/features/provider-dashboard/components/Sidebar";
import { TopBar } from "@/features/provider-dashboard/components/TopBar";
import { useDashboardStore } from "@/features/provider-dashboard/store/useDashboardStore";
import { cn } from "@/lib/utils";

// ------ Layout Wrapper Component -------------------------------------------

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarCollapsed } = useDashboardStore();

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
