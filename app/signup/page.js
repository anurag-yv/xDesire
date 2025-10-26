"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();

    const newUser = { name, email, password };
    localStorage.setItem("userData", JSON.stringify(newUser));
    alert("Signup successful! Please login now.");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Create Account
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full px-3 py-2 mb-4 rounded"
          required
        />
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
          Signup
        </button>
      </form>
    </div>
  );
}
