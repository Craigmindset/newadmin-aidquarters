"use client";
import { Users, UserCheck, Briefcase, CreditCard } from "lucide-react";
import StatCard from "../components/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateStatisticsData } from "../utils/mockData";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Overview() {
  const statsData = useMemo(() => generateStatisticsData(), []);

  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [activeClients, setActiveClients] = useState<number | null>(null);
  const [activeStaff, setActiveStaff] = useState<number | null>(null);
  const totalTransactions = 1247;

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const { count: usersCount, error: uErr } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });
        if (uErr) throw uErr;
        if (mounted) setTotalUsers(usersCount ?? 0);
      } catch {
        if (mounted) setTotalUsers(0);
      }
      try {
        const { count: clCount, error: cErr } = await supabase
          .from("employer_profile")
          .select("*", { count: "exact", head: true });
        if (cErr) throw cErr;
        if (mounted) setActiveClients(clCount ?? 0);
      } catch {
        if (mounted) setActiveClients(0);
      }
      try {
        const { count: stCount, error: sErr } = await supabase
          .from("staff_profile")
          .select("*", { count: "exact", head: true });
        if (sErr) throw sErr;
        if (mounted) setActiveStaff(stCount ?? 0);
      } catch {
        if (mounted) setActiveStaff(0);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Data for charts
  const stateData = statsData.filter((d) => d.state).slice(0, 8);
  const genderData = statsData.filter((d) => d.gender);
  const requestTypeData = statsData.filter((d) => d.requestType);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Dashboard statistics and analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={(totalUsers ?? 0).toLocaleString()}
          icon={<Users className="w-6 h-6" />}
          color="blue"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Active Clients"
          value={(activeClients ?? 0).toLocaleString()}
          icon={<UserCheck className="w-6 h-6" />}
          color="green"
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Active Staff"
          value={(activeStaff ?? 0).toLocaleString()}
          icon={<Briefcase className="w-6 h-6" />}
          color="purple"
          trend={{ value: 15.7, isPositive: true }}
        />
        <StatCard
          title="Total Transactions"
          value={totalTransactions.toLocaleString()}
          icon={<CreditCard className="w-6 h-6" />}
          color="orange"
          trend={{ value: 3.2, isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By State */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Users by State
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="state" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis tick={{ fill: "#9ca3af" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="clients" fill="#0ea5e9" name="Clients" />
              <Bar dataKey="workers" fill="#8b5cf6" name="Workers" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By Gender */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Users by Gender
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="gender" tick={{ fill: "#9ca3af" }} />
              <YAxis tick={{ fill: "#9ca3af" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="clients" fill="#0ea5e9" name="Clients" />
              <Bar dataKey="workers" fill="#8b5cf6" name="Workers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* By Request Type */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Active Users by Staff Type
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={requestTypeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="requestType" tick={{ fill: "#9ca3af" }} />
            <YAxis tick={{ fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="clients" fill="#0ea5e9" name="Clients" />
            <Bar dataKey="workers" fill="#8b5cf6" name="Workers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
