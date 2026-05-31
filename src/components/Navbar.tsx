"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const homeLink =
    role === "ADMIN"
      ? "/dashboard"
      : role === "SALES"
        ? "/dashboard/sales"
        : role === "SANCTION"
          ? "/dashboard/sanction"
          : role === "DISBURSEMENT"
            ? "/dashboard/disbursement"
            : role === "COLLECTION"
              ? "/dashboard/collection"
              : "/apply";

  return (
    <nav className="bg-slate-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={homeLink} className="text-2xl font-bold">
          LMS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {role === "ADMIN" && (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <Link href="/dashboard/sales">Sales</Link>

              <Link href="/dashboard/sanction">Sanction</Link>

              <Link href="/dashboard/disbursement">Disbursement</Link>

              <Link href="/dashboard/collection">Collection</Link>

              <Link href="/dashboard/users">Users</Link>
            </>
          )}

          {role === "SALES" && <Link href="/dashboard/sales">Sales</Link>}

          {role === "SANCTION" && (
            <Link href="/dashboard/sanction">Sanction</Link>
          )}

          {role === "DISBURSEMENT" && (
            <Link href="/dashboard/disbursement">Disbursement</Link>
          )}

          {role === "COLLECTION" && (
            <Link href="/dashboard/collection">Collection</Link>
          )}

          {role === "BORROWER" && <Link href="/apply">Apply Loan</Link>}

          <span className="bg-slate-700 px-3 py-1 rounded text-sm">{role}</span>

          <Link href="/profile">
            <div
              className="
      w-10
      h-10
      rounded-full
      bg-blue-600
      text-white
      flex
      items-center
      justify-center
      font-bold
      cursor-pointer
      hover:bg-blue-700
      transition
    "
            >
              {typeof window !== "undefined" &&
                localStorage.getItem("name")?.charAt(0).toUpperCase()}
            </div>
          </Link>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-700 px-6 py-4 flex flex-col gap-4">
          {role === "ADMIN" && (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <Link href="/dashboard/sales">Sales</Link>

              <Link href="/dashboard/sanction">Sanction</Link>

              <Link href="/dashboard/disbursement">Disbursement</Link>

              <Link href="/dashboard/collection">Collection</Link>

              <Link href="/dashboard/users">Users</Link>
            </>
          )}

          {role === "SALES" && <Link href="/dashboard/sales">Sales</Link>}

          {role === "SANCTION" && (
            <Link href="/dashboard/sanction">Sanction</Link>
          )}

          {role === "DISBURSEMENT" && (
            <Link href="/dashboard/disbursement">Disbursement</Link>
          )}

          {role === "COLLECTION" && (
            <Link href="/dashboard/collection">Collection</Link>
          )}

          {role === "BORROWER" && <Link href="/apply">Apply Loan</Link>}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <div
                  className="
      w-10
      h-10
      rounded-full
      bg-blue-600
      text-white
      flex
      items-center
      justify-center
      font-bold
      "
                >
                  {typeof window !== "undefined" &&
                    localStorage.getItem("name")?.charAt(0).toUpperCase()}
                </div>
              </Link>

              <span className="text-sm">{role}</span>
            </div>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
