"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [products] = useState([
    { id: 1, name: "Smart Watch", price: 2499 },
    { id: 2, name: "Wireless Earbuds", price: 1899 },
    { id: 3, name: "Bluetooth Speaker", price: 1599 },
  ]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login first to add items to cart.");
      return;
    }

    const cartKey = `cart_${user.email}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-indigo-600 text-white text-center py-16">
        <h1 className="text-5xl font-bold mb-3">Welcome to TrendyCart 🛍️</h1>
        <p className="text-lg mb-6">Shop your favorite gadgets at the best prices!</p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Explore Products
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md p-6 rounded-lg text-center border hover:shadow-lg transition"
          >
            <img
              src={`https://via.placeholder.com/200x150?text=${encodeURIComponent(
                product.name
              )}`}
              alt={product.name}
              className="w-full rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-3">₹{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
