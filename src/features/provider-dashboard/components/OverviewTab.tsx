"use client";

import * as React from "react";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Users,
  Briefcase,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useDashboardStore } from "../store/useDashboardStore";
import { RevenueChart } from "./RevenueChart";
import { BookingsChart } from "./BookingsChart";

// ------ Types & Interfaces -------------------------------------------------

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  glowColor?: "emerald" | "gold" | "navy";
}

// ------ Subcomponents ------------------------------------------------------

function StatCard({
  title,
  value,
  description,
  change,
  changeType = "positive",
  icon: Icon,
  glowColor = "navy",
}: StatCardProps) {
  return (
    <Card hover className={cn("relative overflow-hidden group select-none")}>
      {/* Decorative Glow Ring */}
      <div
        className={cn(
          "absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-10 blur-xl transition-all duration-300 group-hover:scale-125",
          glowColor === "emerald" && "bg-emerald-500",
          glowColor === "gold" && "bg-gold-500",
          glowColor === "navy" && "bg-navy-900"
        )}
      />

      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
            {title}
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {value}
          </h3>
        </div>

        <div
          className={cn(
            "p-2.5 rounded-xl border shrink-0",
            glowColor === "emerald" &&
              "bg-emerald-50/50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400",
            glowColor === "gold" &&
              "bg-gold-50/50 border-gold-100 text-gold-600 dark:bg-gold-950/20 dark:border-gold-900/30 dark:text-gold-400",
            glowColor === "navy" &&
              "bg-navy-50/50 border-navy-100 text-navy-600 dark:bg-navy-950/20 dark:border-navy-900/30 dark:text-navy-400"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-[var(--border-subtle)] text-xs">
        {change && (
          <span
            className={cn(
              "font-semibold flex items-center gap-0.5",
              changeType === "positive" && "text-emerald-500",
              changeType === "negative" && "text-error-500",
              changeType === "neutral" && "text-[var(--text-tertiary)]"
            )}
          >
            {change}
          </span>
        )}
        <span className="text-[var(--text-tertiary)]">{description}</span>
      </div>
    </Card>
  );
}

// Helper utility (used since Layout imports it)
import { cn } from "@/lib/utils";

// ------ Overview Tab Component ----------------------------------------------

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useProviderDataStore } from "../store/useProviderDataStore";

export function OverviewTab() {
  const { setActiveTab } = useDashboardStore();
  const { user, profile } = useAuthStore();
  
  const {
    monthlyRevenue,
    todaysBookingsCount,
    completedJobsCount,
    pendingJobsCount,
    upcomingJobs: dbUpcomingJobs,
    isLoading
  } = useProviderDataStore();

  const providerName = profile?.fullName || user?.name || "Provider Partner";

  const mockStats: StatCardProps[] = [
    {
      title: "Monthly Revenue",
      value: `AED ${monthlyRevenue.toLocaleString()}`,
      description: "vs last month",
      change: "+12.4%",
      changeType: "positive",
      icon: TrendingUp,
      glowColor: "emerald",
    },
    {
      title: "Today's Bookings",
      value: `${todaysBookingsCount} Jobs`,
      description: `${completedJobsCount} completed, ${pendingJobsCount} pending`,
      change: "On Track",
      changeType: "neutral",
      icon: Briefcase,
      glowColor: "navy",
    },
    {
      title: "Avg. Customer Rating",
      value: "4.92 / 5",
      description: "Based on 320 reviews",
      change: "+0.04",
      changeType: "positive",
      icon: Star,
      glowColor: "gold",
    },
    {
      title: "Avg. Response Time",
      value: "14 mins",
      description: "10m faster than average",
      change: "-6 mins",
      changeType: "positive",
      icon: Clock,
      glowColor: "emerald",
    },
  ];

  const upcomingJobs = dbUpcomingJobs.map((b) => ({
    id: b.id,
    customer: b.customerName || "Fatima Al Mansoori",
    service: b.serviceName || "Home Service Appointment",
    location: "Dubai Marina, Dubai, UAE",
    time: new Date(b.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: b.status,
    amount: `AED ${b.price || 150}`,
    priority: b.status === "PENDING" ? "EMERGENCY" : "NORMAL",
  }));

  const recentActivity = [
    {
      id: "act-1",
      title: "New Booking Accepted",
      desc: "Deep Home Cleaning request accepted from Sarah K.",
      time: "10 mins ago",
      type: "booking",
    },
    {
      id: "act-2",
      title: "Payout Disbursed",
      desc: "AED 8,450 successfully deposited to Emirates NBD bank.",
      time: "2 hours ago",
      type: "payment",
    },
    {
      id: "act-3",
      title: "5-Star Review Received",
      desc: "Fatima Al M. rated 'AC Servicing': \"Very professional!\"",
      time: "4 hours ago",
      type: "review",
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* 1. Welcome & Business Health Section */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Welcome message and summary */}
        <div className="flex-1 p-6 lg:p-8 rounded-3xl bg-navy-950 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-gold-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
              <Sparkles size={10} />
              Welcome Back
            </span>
            <h2 className="text-display text-3xl font-bold tracking-tight text-white leading-tight">
              {providerName}
            </h2>
            <p className="text-xs lg:text-sm text-navy-300 leading-relaxed text-balance">
              Your business is performing outstandingly in the Dubai Marina and Jumeirah sectors today. You have **5 upcoming jobs** needing team assignments and **1 pending payout** processing.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => setActiveTab("bookings")}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
            >
              Assign Team Members
            </button>
            <button
              onClick={() => setActiveTab("wallet")}
              className="px-4 py-2 bg-white/10 hover:bg-white/25 text-white border border-white/10 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              View Financials
            </button>
          </div>
        </div>

        {/* Business Health Card */}
        <Card className="w-full lg:w-[350px] shrink-0 overflow-hidden flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)] flex items-center justify-between">
              Business Health
              <CheckCircle size={14} className="text-emerald-500" />
            </CardTitle>
            <CardDescription className="text-xs">UAE Service Standard Audit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visual Health Ring */}
            <div className="flex items-center gap-6">
              <div className="relative h-20 w-20 flex items-center justify-center shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-neutral-100 dark:stroke-neutral-800" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeDasharray="94 100" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-extrabold text-[var(--text-primary)]">94%</span>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[var(--text-primary)]">Excellent Status</h4>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  Compliant with DED and DM municipality safety regulations.
                </p>
              </div>
            </div>

            {/* Health Checklist items */}
            <div className="space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Insurance Compliance</span>
                <span className="font-semibold text-emerald-500">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Trade License Expire</span>
                <span className="font-semibold text-amber-500">Dec 2026</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">SLA Completion Rate</span>
                <span className="font-semibold text-emerald-500">99.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Quick Statistics Grid (Phase 5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* 2.5 Analytics Charts Grid (Phase 6 Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <BookingsChart />
      </div>

      {/* 3. Upcoming Schedule & Activity Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's upcoming jobs list */}
        <Card className="xl:col-span-2 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-[var(--border-subtle)] flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                  Today's Active Schedule
                </CardTitle>
                <CardDescription className="text-xs">Allocations for Saturday, Jun 27</CardDescription>
              </div>
              <button
                onClick={() => setActiveTab("calendar")}
                className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 flex items-center gap-0.5 cursor-pointer"
              >
                Full Calendar
                <ChevronRight size={14} />
              </button>
            </CardHeader>
            <CardContent className="divide-y divide-[var(--border-subtle)]">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="py-4 first:pt-4 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm font-bold text-[var(--text-primary)]">{job.customer}</span>
                      <span className="text-[10px] font-bold text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                        {job.time}
                      </span>
                      {job.priority === "EMERGENCY" && (
                        <span className="text-[9px] font-bold bg-error-50 border border-error-100 text-error-500 px-1.5 py-0.5 rounded tracking-wide animate-pulse">
                          EMERGENCY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium">{job.service}</p>
                    <div className="flex items-center gap-1 text-[11px] text-[var(--text-tertiary)]">
                      <MapPin size={12} className="text-emerald-500" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-xs font-bold text-[var(--text-primary)] whitespace-nowrap">{job.amount}</span>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-xl border tracking-wide",
                        job.status === "CONFIRMED" && "bg-emerald-50 border-emerald-100 text-emerald-500 dark:bg-emerald-950/20 dark:border-emerald-900/30",
                        job.status === "COMPLETED" && "bg-info-50 border-info-100 text-info-500 dark:bg-info-950/20 dark:border-info-900/30",
                        job.status === "PENDING" && "bg-warning-50 border-warning-100 text-warning-500 dark:bg-warning-950/20 dark:border-warning-900/30"
                      )}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </div>
          <CardHeader className="pt-4 border-t border-[var(--border-subtle)] text-center pb-4">
            <button
              onClick={() => setActiveTab("bookings")}
              className="w-full text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1 cursor-pointer"
            >
              View all active bookings
              <ArrowUpRight size={14} />
            </button>
          </CardHeader>
        </Card>

        {/* Real-time Activity Feed */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-[var(--border-subtle)]">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                Real-Time Operations
              </CardTitle>
              <CardDescription className="text-xs">Live business activity updates</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="relative border-l-2 border-[var(--border-subtle)] pl-4 ml-2 space-y-6 text-left">
                {recentActivity.map((act) => (
                  <div key={act.id} className="relative">
                    {/* Circle Dot Overlay */}
                    <div
                      className={cn(
                        "absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--surface-card)] shadow-sm",
                        act.type === "booking" && "bg-emerald-500",
                        act.type === "payment" && "bg-info-500",
                        act.type === "review" && "bg-gold-500"
                      )}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-[var(--text-primary)] leading-none">{act.title}</h4>
                        <span className="text-[10px] text-[var(--text-tertiary)] shrink-0 whitespace-nowrap">{act.time}</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          <CardHeader className="pt-4 border-t border-[var(--border-subtle)] text-center pb-4">
            <button className="w-full text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1 cursor-pointer">
              Download Audit Trail
              <ArrowUpRight size={14} />
            </button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
