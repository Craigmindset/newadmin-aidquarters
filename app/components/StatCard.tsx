"use client";
import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  color?: "blue" | "green" | "purple" | "orange";
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const colorStyles: Record<NonNullable<StatCardProps["color"]>, string> = {
  blue: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40",
  green: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/40",
  purple:
    "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/40",
  orange:
    "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/40",
};

export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`rounded-lg p-2 ${colorStyles[color]}`}>{icon}</div>
      </div>
      {trend ? (
        <p
          className={`mt-4 text-sm ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {trend.isPositive ? "+" : "-"}
          {Math.abs(trend.value)}%
        </p>
      ) : null}
    </div>
  );
}
