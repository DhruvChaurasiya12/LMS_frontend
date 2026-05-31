"use client";

import { useState } from "react";
import api from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function UsersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "SALES",
  });

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/users/create", form);

      alert("User Created");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "SALES",
      });
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="max-w-xl mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Create Employee</h1>

        <form
          onSubmit={createUser}
          className="
    bg-white
    shadow-xl
    rounded-2xl
    p-6
    md:p-8
    space-y-5
  "
        >
          <input
            placeholder="Name"
            className="border p-3 w-full rounded"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="border p-3 w-full rounded"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full rounded"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <div className="grid grid-cols-2 gap-2">
            {["SALES", "SANCTION", "DISBURSEMENT", "COLLECTION"].map((role) => (
              <button
                type="button"
                key={role}
                onClick={() =>
                  setForm({
                    ...form,
                    role,
                  })
                }
                className={`
        p-3 rounded-lg border
        ${form.role === role ? "bg-blue-600 text-white" : "bg-white"}
      `}
              >
                {role}
              </button>
            ))}
          </div>

          <button
            className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded
            "
          >
            Create User
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}
