"use client";

import Navbar from "./Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6">
        {children}
      </main>
    </>
  );
}