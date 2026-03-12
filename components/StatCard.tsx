import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

const colorClasses = {
  blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  purple:
    "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  orange:
    "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  red: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
};

export default function StatCard({
  title,
  value,
  icon,
  trend,
  color = "blue",
}: StatCardProps) {
  // Format large numbers to be more compact
  const formatValue = (val: string | number) => {
    if (typeof val === "string" && val.startsWith("₦")) {
      // Extract number from currency string
      const numStr = val.replace("₦", "").replace(/,/g, "");
      const num = parseFloat(numStr);

      if (num >= 1000000) {
        return `₦${(num / 1000000).toFixed(1)}M`;
      } else if (num >= 1000) {
        return `₦${(num / 1000).toFixed(1)}K`;
      }
      return val;
    }
    return val;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 truncate">
            {title}
          </p>
          <p
            className="text-xl font-bold text-gray-900 dark:text-white truncate"
            title={typeof value === "string" ? value : value.toString()}
          >
            {formatValue(value)}
          </p>
          {trend && (
            <p
              className={`text-xs mt-1 ${
                trend.isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}%
            </p>
          )}
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color]} flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
