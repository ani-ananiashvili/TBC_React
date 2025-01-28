"use client";

import { useEffect, useState } from "react";
import { useCartContext } from "../../../context/CartContext";
import { FiTrash2 } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  price: number;
  photo: string;
  description: string;
  quantity: number;
}

const GetFurnitureProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-extrabold mb-6">
        Furniture Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add to Cart
              </button>
              <FiTrash2
                className="cursor-pointer text-red-500"
                onClick={() => product.id}
                title="Remove from Cart"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetFurnitureProducts;
