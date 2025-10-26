"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  // 🧩 Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login first to add items to cart.");
      return;
    }

    const cartKey = `cart_${user.email}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingItem = existingCart.find((item) => item._id === product._id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
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
        <h1 className="text-5xl font-bold mb-3">Welcome to xDesires 🛍️</h1>
        <p className="text-lg mb-6">Shop your favorite gadgets at the best prices!</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md p-6 rounded-lg text-center border hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
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
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500 text-lg">Loading products...</p>
        )}
      </div>
    </main>
  );
}
