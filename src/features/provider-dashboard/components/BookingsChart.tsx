"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// ------ Mock Data -----------------------------------------------------------

const SERVICE_DISTRIBUTION = [
  { name: "Cleaning", count: 180, color: "#1e1b4b" }, // Navy
  { name: "AC Service", count: 120, color: "#10b981" }, // Emerald
  { name: "Plumbing", count: 85, color: "#f59e0b" }, // Amber
  { name: "Electrical", count: 64, color: "#3b82f6" }, // Blue
  { name: "Handyman", count: 42, color: "#6b7280" }, // Slate
];

import { useProviderDataStore } from "../store/useProviderDataStore";

// ------ Custom Tooltip Component --------------------------------------------

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const totalJobs = payload[0].value || 1;
    return (
      <div className="bg-navy-950 text-white p-3 rounded-xl border border-navy-900 shadow-xl text-left">
        <p className="text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-1">
          {label} Category
        </p>
        <p className="text-sm font-extrabold text-white">
          {payload[0].value} jobs
        </p>
      </div>
    );
  }
  return null;
}

// ------ Bookings Chart Component ---------------------------------------------

export function BookingsChart() {
  const { serviceDistributionData } = useProviderDataStore();

  return (
    <Card className="w-full flex flex-col justify-between">
      <CardHeader className="pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
            Service Distribution
          </CardTitle>
          <CardDescription className="text-xs">
            Volume segmentation across core categories
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-72 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={serviceDistributionData}
              margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
              barSize={20}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border-subtle)"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                stroke="var(--text-tertiary)"
                fontSize={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="var(--text-tertiary)"
                fontSize={10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.02)" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {serviceDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
