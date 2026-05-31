"use client";

import { useState } from "react";
import api from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function ApplyPage() {
  const [salarySlip, setSalarySlip] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    pan: "",
    dob: "",
    salary: "",
    employmentMode: "SALARIED",
    amount: 100000,
    tenure: 180,
  });

  const interest =
    (Number(form.amount) * 12 * Number(form.tenure)) / (365 * 100);

  const totalRepayment = Number(form.amount) + interest;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("pan", form.pan);

      formData.append("dob", form.dob);

      formData.append("salary", form.salary);

      formData.append("employmentMode", form.employmentMode);

      formData.append("amount", String(form.amount));

      formData.append("tenure", String(form.tenure));

      if (salarySlip) {
        formData.append("salarySlip", salarySlip);
      }

      await api.post("/loan/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Loan Applied Successfully");

      setForm({
        pan: "",
        dob: "",
        salary: "",
        employmentMode: "SALARIED",
        amount: 100000,
        tenure: 180,
      });

      setSalarySlip(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error Applying Loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard allowedRoles={["BORROWER"]}>
      <div className="min-h-screen bg-slate-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
              Apply For Loan
            </h1>

            <p className="text-slate-500 mt-3">
              Complete your application and get it reviewed by our team.
            </p>
          </div>

          <div
            className="
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-slate-200
            p-6
            md:p-8
          "
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  PAN Number
                </label>

                <input
                  className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  "
                  placeholder="ABCDE1234F"
                  value={form.pan}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pan: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-slate-700">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    className="
                    w-full
                    border
                    border-slate-300
                    rounded-xl
                    px-4
                    py-3
                    "
                    value={form.dob}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dob: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-slate-700">
                    Monthly Salary
                  </label>

                  <input
                    type="number"
                    placeholder="50000"
                    className="
                    w-full
                    border
                    border-slate-300
                    rounded-xl
                    px-4
                    py-3
                    "
                    value={form.salary}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        salary: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Employment Type
                </label>

                <select
                  className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  px-4
                  py-3
                  "
                  value={form.employmentMode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      employmentMode: e.target.value,
                    })
                  }
                >
                  <option value="SALARIED">Salaried</option>

                  <option value="SELF_EMPLOYED">Self Employed</option>

                  <option value="UNEMPLOYED">Unemployed</option>
                </select>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5">
                <label className="block font-semibold mb-3">Loan Amount</label>

                <div className="text-3xl font-bold text-blue-600 mb-4">
                  ₹{form.amount.toLocaleString()}
                </div>

                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="1000"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      amount: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="bg-slate-50 rounded-2xl p-5">
                <label className="block font-semibold mb-3">Loan Tenure</label>

                <div className="text-3xl font-bold text-green-600 mb-4">
                  {form.tenure} Days
                </div>

                <input
                  type="range"
                  min="30"
                  max="365"
                  value={form.tenure}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tenure: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div
                className="
                border-2
                border-dashed
                border-slate-300
                rounded-2xl
                p-6
                text-center
              "
              >
                <label className="block font-semibold mb-2">
                  Upload Salary Slip
                </label>

                <p className="text-sm text-slate-500 mb-4">
                  PDF, JPG, JPEG, PNG (Max 5MB)
                </p>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSalarySlip(e.target.files?.[0] || null)}
                  required
                  className="w-full"
                />

                {salarySlip && (
                  <p className="mt-3 text-green-600 text-sm">
                    Selected: {salarySlip.name}
                  </p>
                )}
              </div>

              <div
                className="
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                rounded-2xl
                p-6
              "
              >
                <h3 className="text-xl font-semibold mb-4">
                  Repayment Summary
                </h3>

                <div className="flex justify-between mb-3">
                  <span>Interest</span>

                  <span>₹{interest.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Total Repayment</span>

                  <span>₹{totalRepayment.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-4
                rounded-xl
                text-lg
                font-semibold
                transition
                shadow-lg
                disabled:opacity-50
                "
              >
                {loading ? "Submitting..." : "Apply Loan"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
