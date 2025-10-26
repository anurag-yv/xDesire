"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined" && stored !== "null") {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            xDesires 🛍️
          </Link>

          <div className="flex items-center gap-6">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-800 font-medium">
                  Welcome, <b>{user.name}</b>
                </span>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Cart 🛒
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
