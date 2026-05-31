"use client";

import { useEffect, useState } from "react";

import AuthGuard from "@/components/AuthGuard";
import api from "@/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [history, setHistory] = useState<any[]>([]);

  const [password, setPassword] = useState("");

  const fetchProfile = async () => {
    const res = await api.get("/users/profile");

    setUser(res.data);
  };

  const fetchHistory = async () => {
    const res = await api.get("/users/history");

    setHistory(res.data);
  };

  const changePassword = async () => {
    if (!password) return;

    try {
      await api.patch("/users/password", {
        password,
      });

      alert("Password Updated");

      setPassword("");
    } catch {
      alert("Error Updating Password");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user?.role === "BORROWER") {
      fetchHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <AuthGuard>
        <div className="p-8">Loading...</div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-xl
          p-6
          mb-8
        "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row
            gap-6
          "
          >
            <div
              className="
              w-24
              h-24
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {user.name?.[0]}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>

              <p className="text-gray-500">{user.email}</p>

              <span
                className="
                inline-block
                mt-3
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                "
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-xl
          p-6
          mb-8
        "
        >
          <h2 className="text-xl font-bold mb-4">Change Password</h2>

          <input
            type="password"
            placeholder="New Password"
            className="
              border
              rounded-xl
              px-4
              py-3
              w-full
              mb-4
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={changePassword}
            className="
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            Update Password
          </button>
        </div>

        {user.role === "BORROWER" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Loan History</h2>

            <div
              className="
              grid
              md:grid-cols-2
              gap-4
            "
            >
              {history.map((loan) => {
                const outstanding = loan.totalRepayment - loan.paidAmount;

                return (
                  <div
                    key={loan._id}
                    className="
                        bg-white
                        rounded-2xl
                        shadow
                        p-5
                      "
                  >
                    <p>
                      <strong>Amount:</strong> ₹{loan.amount}
                    </p>

                    <p>
                      <strong>Status:</strong> {loan.status}
                    </p>

                    <p>
                      <strong>Paid:</strong> ₹{loan.paidAmount}
                    </p>

                    <p>
                      <strong>Outstanding:</strong> ₹{outstanding.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  );
}
