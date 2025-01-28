"use client";

import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";

interface Product {
  name: string;
  price: number;
  photo: string;
  brand: string;
  description: string;
}

const GetFurnitureProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error: any) {
        setError("Error fetching products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-bold">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-extrabold text-gray-900 mb-6">
        Furniture Products
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-base mb-2">
                {product.description}
              </p>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <p className="text-lg font-bold text-gray-800 mt-auto">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetFurnitureProducts;
