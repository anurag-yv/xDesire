"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <main className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((p) => <ProductCard key={p._id} product={p} />)
      ) : (
        <p>No products found.</p>
      )}
    </main>
  );
}
