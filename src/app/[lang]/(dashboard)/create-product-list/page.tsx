"use client";

import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

export default function CreateProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-create-products", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = async (productId: number) => {
    try {
      const response = await fetch("/api/purchase-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url; 
      } else {
        throw new Error(data.error || "Failed to initiate purchase.");
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Failed to complete the purchase. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-10 mx-auto">
      <h1 className="text-center mb-10 text-4xl font-bold text-[#4a628a]">
        Product List
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-xl text-green-600 font-bold mb-2">
              ${product.price}
            </p>
            <button
              onClick={() => handleBuy(product.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
