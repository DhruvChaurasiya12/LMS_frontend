"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function SalesPage() {
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/dashboard/sales");

      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <AuthGuard allowedRoles={["ADMIN", "SALES"]}>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Sales Dashboard</h1>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
            <thead>
              <tr>
                <th className="bg-slate-100 text-left p-4">Name</th>

                <th className="bg-slate-100 text-left p-4">Email</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td className="p-4 border-b">{lead.name}</td>

                  <td className="p-4 border-b">{lead.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="
                  bg-white
                  rounded-xl
                  shadow
                  p-4
                "
            >
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {lead.name}
                </p>

                <p>
                  <strong>Email:</strong> {lead.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
