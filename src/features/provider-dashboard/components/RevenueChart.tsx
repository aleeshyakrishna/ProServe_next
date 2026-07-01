"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// ------ Mock Data -----------------------------------------------------------

const REVENUE_DATA = [
  { name: "Jan", revenue: 18500, bookings: 45 },
  { name: "Feb", revenue: 22000, bookings: 52 },
  { name: "Mar", revenue: 21500, bookings: 48 },
  { name: "Apr", revenue: 29000, bookings: 68 },
  { name: "May", revenue: 31000, bookings: 72 },
  { name: "Jun", revenue: 34250, bookings: 80 },
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
    return (
      <div className="bg-navy-950 text-white p-3 rounded-xl border border-navy-900 shadow-xl text-left">
        <p className="text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-1">
          {label}
        </p>
        <p className="text-sm font-extrabold text-emerald-400">
          AED {payload[0].value.toLocaleString()}
        </p>
        <p className="text-[11px] text-navy-300">
          {payload[1]?.value || 0} bookings completed
        </p>
      </div>
    );
  }
  return null;
}

// ------ Revenue Chart Component ----------------------------------------------

export function RevenueChart() {
  const { revenueChartData } = useProviderDataStore();

  return (
    <Card className="w-full flex flex-col justify-between">
      <CardHeader className="pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
              Revenue Analytics
            </CardTitle>
            <CardDescription className="text-xs">
              Performance metrics
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-1">
            <span className="text-[10px] font-bold text-emerald-500 bg-[var(--surface-card)] shadow-xs px-2 py-0.5 rounded-lg uppercase tracking-wide">
              Revenue
            </span>
            <span className="text-[10px] font-semibold text-[var(--text-tertiary)] px-2 py-0.5 rounded-lg uppercase tracking-wide cursor-pointer hover:text-[var(--text-primary)]">
              Bookings
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-72 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueChartData}
              margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              {/* Hidden field for tooltip mapping */}
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="transparent"
                fill="transparent"
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
