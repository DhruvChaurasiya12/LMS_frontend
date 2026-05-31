"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function SanctionPage() {
  const [loans, setLoans] = useState<any[]>([]);

  const fetchLoans = async () => {
    try {
      const res = await api.get("/dashboard/sanction");

      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveLoan = async (id: string) => {
    try {
      await api.patch(`/dashboard/sanction/${id}/approve`);

      alert("Loan Approved");

      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectLoan = async (id: string) => {
    const reason = prompt("Enter rejection reason");

    if (!reason) return;

    try {
      await api.patch(`/dashboard/sanction/${id}/reject`, {
        reason,
      });

      alert("Loan Rejected");

      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <AuthGuard allowedRoles={["ADMIN", "SANCTION"]}>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Sanction Dashboard
        </h1>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
            <thead>
              <tr>
                <th className="bg-slate-100 text-left p-4">Borrower</th>

                <th className="bg-slate-100 text-left p-4">Amount</th>

                <th className="bg-slate-100 text-left p-4">Tenure</th>

                <th className="bg-slate-100 text-left p-4">Status</th>

                <th className="bg-slate-100 text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td className="p-4 border-b">{loan.borrower?.name}</td>

                  <td className="p-4 border-b">₹{loan.amount}</td>

                  <td className="p-4 border-b">{loan.tenure} days</td>

                  <td className="p-4 border-b">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {loan.status}
                    </span>
                  </td>

                  <td className="p-4 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveLoan(loan._id)}
                        className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                          "
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectLoan(loan._id)}
                        className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                          "
                      >
                        Reject
                      </button>
                    </div>
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
                  <strong>Borrower:</strong> {loan.borrower?.name}
                </p>

                <p>
                  <strong>Amount:</strong> ₹{loan.amount}
                </p>

                <p>
                  <strong>Tenure:</strong> {loan.tenure} days
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {loan.status}
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => approveLoan(loan._id)}
                    className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        py-2
                        rounded-lg
                      "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectLoan(loan._id)}
                    className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        py-2
                        rounded-lg
                      "
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
