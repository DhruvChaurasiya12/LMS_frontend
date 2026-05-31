"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("role", res.data.role);

      localStorage.setItem("name", res.data.name);

      switch (res.data.role) {
        case "ADMIN":
          router.push("/dashboard");
          break;

        case "SALES":
          router.push("/dashboard/sales");
          break;

        case "SANCTION":
          router.push("/dashboard/sanction");
          break;

        case "DISBURSEMENT":
          router.push("/dashboard/disbursement");
          break;

        case "COLLECTION":
          router.push("/dashboard/collection");
          break;

        default:
          router.push("/apply");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Loan Management System
          </h1>

          <p className="text-slate-500 mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-lg
              font-medium
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="
              w-full
              border
              border-slate-300
              hover:bg-slate-100
              py-3
              rounded-lg
              font-medium
              transition
            "
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
