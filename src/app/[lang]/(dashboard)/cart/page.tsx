"use client";

import { useCartContext } from "../../../context/CartContext";
import { FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const { cart, removeFromCart } = useCartContext();

  return (
    <div className="cart-page p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center bg-white p-4 shadow-md rounded-lg"
            >
              <img
                src={product.photo}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-500 hover:text-red-700 p-2 ml-4"
              >
                <FiTrash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
          <button className="w-full bg-sky-700 text-white font-bold py-3 rounded-lg mt-4">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
