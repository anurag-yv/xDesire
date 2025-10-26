"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", category: "" });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("✅ Product added!");
  };

  return (
    <main>
      <Navbar />
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form onSubmit={submit} className="space-y-3">
          {["name", "description", "price", "image", "category"].map((f) => (
            <input
              key={f}
              placeholder={f}
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              className="border p-2 w-full rounded"
              required
            />
          ))}
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </form>
      </div>
    </main>
  );
}
