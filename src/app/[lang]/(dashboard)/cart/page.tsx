"use client";

import { useCartContext } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import getStripe from "../../../utils/stripe/get-stripejs";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartContext();
  const router = useRouter();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBuy = async (productId: number) => {
    try {
      const response = await fetch("/api/buy-furniture-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
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
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-16 w-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
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
        <h2 className="text-xl font-semibold">Total: ${totalAmount}</h2>
        <button
          onClick={() => handleBuy(Number(cart[0].id))}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-2 mr-2"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
