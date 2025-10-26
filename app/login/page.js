"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ✅ If already logged in, auto-redirect to home
  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (existingUser && existingUser !== "undefined" && existingUser !== "null") {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("userData");
    if (!storedUser) {
      alert("No account found. Please signup first.");
      return;
    }

    const userData = JSON.parse(storedUser);

    if (email === userData.email && password === userData.password) {
      localStorage.setItem("user", JSON.stringify(userData));
      alert(`Welcome back, ${userData.name}!`);
      
      // ✅ Redirect properly after login
      router.push("/");
      setTimeout(() => window.location.reload(), 300); // ensures UI updates to show name
    } else {
      alert("Invalid email or password. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Welcome Back 👋
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full px-3 py-2 mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full px-3 py-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
