"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-700">
          TrendyCart 🛒
        </Link>

        {/* Links */}
        <div className="space-x-6 flex items-center">
          <Link
            href="/"
            className={`hover:text-purple-700 ${
              pathname === "/" ? "text-purple-700 font-semibold" : "text-gray-700"
            }`}
          >
            Home
          </Link>

          <Link
            href="/signup"
            className={`hover:text-purple-700 ${
              pathname === "/signup"
                ? "text-purple-700 font-semibold"
                : "text-gray-700"
            }`}
          >
            Signup
          </Link>

          <Link
            href="/login"
            className={`hover:text-purple-700 ${
              pathname === "/login"
                ? "text-purple-700 font-semibold"
                : "text-gray-700"
            }`}
          >
            Login
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="text-gray-700 hover:text-purple-700">
            <ShoppingCart className="inline-block w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
