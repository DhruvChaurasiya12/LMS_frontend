"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import AuthGuard from "@/components/AuthGuard";
import api from "@/lib/api";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/dashboard/stats");

      setStats(res.data);
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <AuthGuard allowedRoles={["ADMIN"]}>
        <div className="p-4 md:p-8">Loading...</div>
      </AuthGuard>
    );
  }

  const pieData = [
    {
      name: "Applied",
      value: stats.applied,
    },
    {
      name: "Sanctioned",
      value: stats.sanctioned,
    },
    {
      name: "Disbursed",
      value: stats.disbursed,
    },
    {
      name: "Closed",
      value: stats.closed,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
  ];

  const barData = [
    {
      status: "Applied",
      count: stats.applied,
    },
    {
      status: "Sanctioned",
      count: stats.sanctioned,
    },
    {
      status: "Disbursed",
      count: stats.disbursed,
    },
    {
      status: "Closed",
      count: stats.closed,
    },
    {
      status: "Rejected",
      count: stats.rejected,
    },
  ];

  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">
          Loan Management Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500">Total Loans</p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              {stats.totalLoans}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Closed Loans</p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              {stats.closed}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Disbursed</p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              {stats.disbursed}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Rejected</p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              {stats.rejected}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Loan Status Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={window.innerWidth < 768 ? 70 : 100}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Workflow Status</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="status" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
