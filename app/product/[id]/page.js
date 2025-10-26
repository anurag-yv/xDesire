import Navbar from "@/components/Navbar";

export default async function ProductPage({ params }) {
  const res = await fetch(`http://localhost:3000/api/products`, { cache: "no-store" });
  const products = await res.json();
  const product = products.find((p) => p._id === params.id);

  if (!product) return <p>Product not found</p>;

  return (
    <main>
      <Navbar />
      <div className="p-6 flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="w-1/2 rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-4 text-xl font-semibold">₹{product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
