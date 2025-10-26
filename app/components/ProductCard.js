"use client";
import Image from "next/image";

export default function ProductCard() {
  const products = [
    {
      id: 1,
      name: "Stylish Headphones",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1606813902711-9bde846b2e96?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Smartwatch Pro",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1606224215608-3c3a1a50738a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        🔥 Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="p-5 text-center">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">₹{product.price}</p>
              <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
