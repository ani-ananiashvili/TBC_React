"use client";

import { useCartContext } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import getStripe from "../../../utils/stripe/get-stripejs";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBuy = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/buy-furniture-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (response.ok && data.sessionId) {
        const stripe = await getStripe();
        if (stripe) {
          stripe.redirectToCheckout({ sessionId: data.sessionId });
          clearCart();
        }
      } else {
        throw new Error(data.error || "Failed to initiate purchase.");
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Failed to complete the purchase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 mx-auto px-12 py-8 dark:bg-dark-gradient bg-light-gradient min-h-screen">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">
          Your cart is empty.{" "}
          <button
            onClick={() => router.push("/get-furniture-product")}
            className="text-blue-500 hover:underline"
          >
            Start shopping!
          </button>
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-dark-gradient shadow-md rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-16 w-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Price: ${item.price}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold dark:text-white">
          Total: ${totalAmount.toFixed(2)}
        </h2>
        <button
          onClick={handleBuy}
          className={` px-4 py-2 mt-2 mr-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
