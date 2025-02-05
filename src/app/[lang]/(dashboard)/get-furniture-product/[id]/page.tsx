"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Spinner from "../../../../components/Spinner/Spinner";
import { useCartContext } from "../../../../context/CartContext";
import { FaTrash } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  photo: string;
  description: string;
  Name_Ka?: string;
  Brand_Ka?: string;
  Description_Ka?: string;
  quantity: number;
  active: boolean;
}

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCartContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/get-products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleDelete = async (productId: string) => {
    if (!productId) return;
    try {
      const response = await fetch(`/api/delete-product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Product deleted successfully!");
        setTimeout(() => router.push("/get-furniture-product"), 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-28 pb-10  dark:bg-dark-gradient ">
      <div className="p-8 bg-white dark:bg-dark-gradient bg-light-gradient shadow-md rounded-lg max-w-5xl w-full flex">
        <div className="p-4 flex flex-col space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-lg"
            ></div>
          ))}
        </div>

        <div className="p-4 flex justify-center">
          {product.photo ? (
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-auto max-h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400">
                No image available
              </span>
            </div>
          )}
        </div>

        <div className="w-1/2 p-4 flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            {product.name}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-3">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Brand: {product.brand}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300">Material: </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300">Category: </p>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                Price: ${product.price}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300">Size: </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300">Style: </p>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="bg-white border-2 border-[#4A628A] text-black py-2 w-96 rounded dark:bg-dark-gradient dark:text-white"
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 text-white py-2 w-9 rounded dark:bg-red-600 flex justify-center items-center"
            >
              <FaTrash />
            </button>
          </div>

          {message && (
            <div className="mt-4 text-center text-green-500">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
