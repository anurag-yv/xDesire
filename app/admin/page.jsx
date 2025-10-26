"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("products"); // toggle between 'products' and 'orders'

  // Fetch all products
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  // Fetch all orders
  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    if (view === "products") fetchProducts();
    else fetchOrders();
  }, [view]);

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("✅ Product added!");
      setForm({ name: "", description: "", price: "", image: "", category: "" });
      fetchProducts();
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Update order status
  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setView("products")}
            className={`px-4 py-2 rounded ${view === "products" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            🛒 Products
          </button>
          <button
            onClick={() => setView("orders")}
            className={`px-4 py-2 rounded ${view === "orders" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            📦 Orders
          </button>
        </div>

        {/* Product Management */}
        {view === "products" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={addProduct} className="grid grid-cols-2 gap-3 mb-8">
              {["name", "description", "price", "image", "category"].map((f) => (
                <input
                  key={f}
                  placeholder={f}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
              ))}
              <button className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Add Product
              </button>
            </form>

            <h2 className="text-xl font-semibold mb-3">All Products</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p._id} className="border rounded-lg p-4 shadow-sm">
                  <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-2" />
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.category}</p>
                  <p className="text-blue-700 font-bold">₹{p.price}</p>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Management */}
        {view === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">User Email</th>
                    <th className="border p-2">Items</th>
                    <th className="border p-2">Total</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td className="border p-2">{o.userEmail}</td>
                      <td className="border p-2">
                        {o.items.map((i) => (
                          <div key={i.productId}>
                            {i.name} × {i.qty}
                          </div>
                        ))}
                      </td>
                      <td className="border p-2 font-semibold">₹{o.total}</td>
                      <td className="border p-2">{o.status}</td>
                      <td className="border p-2">
                        <select
                          value={o.status}
                          onChange={(e) => updateStatus(o._id, e.target.value)}
                          className="border rounded p-1"
                        >
                          <option>Pending</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
