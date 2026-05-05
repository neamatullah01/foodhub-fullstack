"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

interface ChartDataPoint {
  date: string;
  ordersCount: number;
  revenue: number;
}

interface DashboardChartProps {
  data: ChartDataPoint[];
}

export function DashboardChart({ data }: DashboardChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Format dates for display (e.g., "Jan 01")
  const formattedData = data.map((item) => {
    const d = new Date(item.date);
    return {
      ...item,
      displayDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Performance Overview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
              chartType === "line"
                ? "bg-[#e5ae1e] text-black"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
              chartType === "bar"
                ? "bg-[#e5ae1e] text-black"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="displayDate" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `৳${value}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue (৳)"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="ordersCount"
                name="Orders"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <BarChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="displayDate" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `৳${value}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                cursor={{ fill: "#f1f5f9" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                name="Revenue (৳)"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="ordersCount"
                name="Orders"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
