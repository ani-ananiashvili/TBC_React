"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const photo = formData.get("photo") as string;
    const brand = formData.get("brand") as string;
    const description = formData.get("description") as string;

    const productData = { name, price, photo, brand, description };

    try {
      const response = await fetch("/api/create-product", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setIsError(false);
        router.push("/get-furniture-product");
      } else {
        setMessage(result.message || "Failed to create product");
        setIsError(true);
      }
    } catch (error) {
      setMessage("An error occurred while creating the product.");
      setIsError(true);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-10 max-w-lg mx-auto space-y-4 p-6 bg-gray-100 shadow-md rounded-lg"
    >
      {message && (
        <div
          className={`p-4 mb-4 text-white ${
            isError ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {message}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-lg font-medium text-gray-700"
        >
          Product Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-lg font-medium text-gray-700"
        >
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Enter price"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="photo"
          className="block text-lg font-medium text-gray-700"
        >
          Photo Link:
        </label>
        <input
          type="url"
          id="photo"
          name="photo"
          placeholder="Enter photo URL"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="brand"
          className="block text-lg font-medium text-gray-700"
        >
          Brand Name:
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="Enter brand name"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-lg font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-sky-700 text-white font-bold rounded-md hover:bg-sky-600"
      >
        Create Product
      </button>
    </form>
  );
}
