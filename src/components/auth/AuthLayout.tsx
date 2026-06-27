"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, Star, Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/constants";

// ------ Left Showcase Stats Data ----------------------------

const SHOWCASE_STATS = [
  { label: "Happy Customers", value: "20,000+", icon: Users },
  { label: "Verified Providers", value: "5,000+", icon: ShieldCheck },
  { label: "Customer Satisfaction", value: "98%", icon: Star },
];

const TRUST_BADGES = [
  "Verified Providers",
  "Secure Payments",
  "24/7 Support Available",
];

// ------ AuthLayout Component ---------------------------------

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC] dark:bg-neutral-950 font-sans">
      {/* 1. Left Panel — Premium Showcase (45% on desktop, banner-style on mobile) */}
      <div className="relative w-full lg:w-[45%] flex flex-col justify-between gradient-navy text-white p-8 lg:p-12 overflow-hidden shrink-0">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold-500/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Top: Branding logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
            aria-label={`Go to ${APP_NAME} homepage`}
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 group-hover:bg-emerald-600 transition-colors">
              <span className="text-white font-bold text-sm" aria-hidden="true">P</span>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Pro<span className="text-emerald-400">Serve</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-navy-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to home
          </Link>
        </div>

        {/* Center: Branding Copy (gently animated) */}
        <div className="relative z-10 my-12 lg:my-auto max-w-lg space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 border border-white/12 text-[10px] font-semibold tracking-wider text-emerald-400 uppercase mb-4">
              Premium Marketplace
            </span>

            <h1 className="text-display text-4xl lg:text-5xl font-bold leading-tight text-white mb-4 text-balance">
              Find Trusted{" "}
              <span className="text-gold-400 font-medium">Professionals</span>{" "}
              Across the UAE
            </h1>

            <p className="text-sm lg:text-base text-navy-300 leading-relaxed text-balance">
              Book verified, background-checked specialists for cleaning, HVAC cooling, AC maintenance, electrical, plumbing, renovations, beauty, and wellness at your convenience.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {SHOWCASE_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Icon size={14} aria-hidden="true" className="shrink-0" />
                    <span className="text-sm font-bold text-white tracking-tight">{stat.value}</span>
                  </div>
                  <p className="text-[10px] text-navy-400 leading-tight font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom: Trust Strip (hidden on small displays to avoid vertical clutter) */}
        <div className="relative z-10 hidden lg:flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-6">
            {TRUST_BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-xs text-navy-300">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Right Panel — Form Card Container (55% on desktop) */}
      <main
        className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 select-none bg-[#F8FAFC] dark:bg-neutral-950"
        id="auth-container"
      >
        <motion.div
          className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/80 shadow-xl shadow-neutral-900/5 p-8 lg:p-10"
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
