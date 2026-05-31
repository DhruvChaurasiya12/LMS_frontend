"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function DisbursementPage() {
  const [loans, setLoans] = useState<any[]>([]);

  const fetchLoans = async () => {
    try {
      const res = await api.get("/dashboard/disbursement");

      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const disburseLoan = async (id: string) => {
    try {
      await api.patch(`/dashboard/disbursement/${id}`);

      alert("Loan Disbursed Successfully");

      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <AuthGuard allowedRoles={["ADMIN", "DISBURSEMENT"]}>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Disbursement Dashboard
        </h1>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
            <thead>
              <tr>
                <th className="bg-slate-100 text-left p-4">Amount</th>

                <th className="bg-slate-100 text-left p-4">Tenure</th>

                <th className="bg-slate-100 text-left p-4">Status</th>

                <th className="bg-slate-100 text-left p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td className="p-4 border-b">₹{loan.amount}</td>

                  <td className="p-4 border-b">{loan.tenure} days</td>

                  <td className="p-4 border-b">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {loan.status}
                    </span>
                  </td>

                  <td className="p-4 border-b">
                    <button
                      onClick={() => disburseLoan(loan._id)}
                      className="
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          transition
                        "
                    >
                      Mark Disbursed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="
                  bg-white
                  rounded-xl
                  shadow
                  p-4
                "
            >
              <div className="space-y-3">
                <p>
                  <strong>Amount:</strong> ₹{loan.amount}
                </p>

                <p>
                  <strong>Tenure:</strong> {loan.tenure} days
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {loan.status}
                  </span>
                </p>

                <button
                  onClick={() => disburseLoan(loan._id)}
                  className="
                      w-full
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      py-2
                      rounded-lg
                    "
                >
                  Mark Disbursed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
