"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function CollectionPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [utrMap, setUtrMap] = useState<Record<string, string>>({});
  const [amountMap, setAmountMap] = useState<Record<string, string>>({});

  const fetchLoans = async () => {
    try {
      const res = await api.get("/dashboard/collection");
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPayment = async (loanId: string) => {
    try {
      await api.post("/dashboard/payment", {
        loanId,
        utr: utrMap[loanId],
        amount: Number(amountMap[loanId]),
      });

      alert("Payment Recorded");

      setUtrMap((prev) => ({
        ...prev,
        [loanId]: "",
      }));

      setAmountMap((prev) => ({
        ...prev,
        [loanId]: "",
      }));

      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Payment Failed");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <AuthGuard allowedRoles={["ADMIN", "COLLECTION"]}>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Collection Dashboard
        </h1>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
            <thead>
              <tr>
                <th className="bg-slate-100 text-left p-4">Amount</th>

                <th className="bg-slate-100 text-left p-4">Total Repayment</th>

                <th className="bg-slate-100 text-left p-4">Paid</th>

                <th className="bg-slate-100 text-left p-4">Outstanding</th>

                <th className="bg-slate-100 text-left p-4">UTR</th>

                <th className="bg-slate-100 text-left p-4">Amount</th>

                <th className="bg-slate-100 text-left p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => {
                const outstanding = loan.totalRepayment - loan.paidAmount;

                return (
                  <tr key={loan._id}>
                    <td className="p-4 border-b">₹{loan.amount}</td>

                    <td className="p-4 border-b">
                      ₹{loan.totalRepayment.toFixed(2)}
                    </td>

                    <td className="p-4 border-b">₹{loan.paidAmount}</td>

                    <td className="p-4 border-b">₹{outstanding.toFixed(2)}</td>

                    <td className="p-4 border-b">
                      <input
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="UTR"
                        value={utrMap[loan._id] || ""}
                        onChange={(e) =>
                          setUtrMap({
                            ...utrMap,
                            [loan._id]: e.target.value,
                          })
                        }
                      />
                    </td>

                    <td className="p-4 border-b">
                      <input
                        type="number"
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="Amount"
                        value={amountMap[loan._id] || ""}
                        onChange={(e) =>
                          setAmountMap({
                            ...amountMap,
                            [loan._id]: e.target.value,
                          })
                        }
                      />
                    </td>

                    <td className="p-4 border-b">
                      <button
                        onClick={() => addPayment(loan._id)}
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
                        Add Payment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {loans.map((loan) => {
            const outstanding = loan.totalRepayment - loan.paidAmount;

            return (
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
                    <strong>Total Repayment:</strong> ₹
                    {loan.totalRepayment.toFixed(2)}
                  </p>

                  <p>
                    <strong>Paid:</strong> ₹{loan.paidAmount}
                  </p>

                  <p>
                    <strong>Outstanding:</strong> ₹{outstanding.toFixed(2)}
                  </p>

                  <input
                    className="
                      border
                      rounded-lg
                      px-3
                      py-2
                      w-full
                    "
                    placeholder="UTR"
                    value={utrMap[loan._id] || ""}
                    onChange={(e) =>
                      setUtrMap({
                        ...utrMap,
                        [loan._id]: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    className="
                      border
                      rounded-lg
                      px-3
                      py-2
                      w-full
                    "
                    placeholder="Amount"
                    value={amountMap[loan._id] || ""}
                    onChange={(e) =>
                      setAmountMap({
                        ...amountMap,
                        [loan._id]: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={() => addPayment(loan._id)}
                    className="
                      w-full
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      py-2
                      rounded-lg
                    "
                  >
                    Add Payment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AuthGuard>
  );
}
