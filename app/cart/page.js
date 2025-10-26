"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(storedUser);
    const cartKey = `cart_${storedUser.email}`;
    const userCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(userCart);
  }, []);

  const clearCart = () => {
    if (!user) return;
    localStorage.removeItem(`cart_${user.email}`);
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({
            name: i.name,
            price: i.price,
            qty: i.quantity,
          })),
          userEmail: user.email, // ✅ send user's email for order tracking
        }),
      });

      const data = await res.json();
      if (data.id) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        alert("Checkout failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 😔</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Checkout 💳
            </button>
          </div>

          <button
            onClick={clearCart}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
