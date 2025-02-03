"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const categories = ["Knoll", "Vitra", "Cassina"];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const photo = formData.get("photo") as string;
    const brand = selectedCategory;
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
    <div className="m-24 max-w-2xl mx-auto space-y-4">
      <div className="text-center">
        <img
          src="/assets/logo_aveji.png"
          alt="logo"
          className="mx-auto mb-4 w-28 bg-gray-600"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Product
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-gray-600 shadow-md rounded-lg"
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
            Product Title:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product title"
            className="w-full p-2 mt-1 border border-gray-300 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Product Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
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

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            Product Brand:
          </label>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md border ${
                  selectedCategory === category
                    ? "bg-sky-700 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {selectedCategory && (
            <p className="mt-2 text-sm text-gray-600">
              Selected Brand: {selectedCategory}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="photo"
            className="block text-lg font-medium text-gray-700"
          >
            Photo Upload:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="photo"
              name="photo"
              className="border border-gray-300 p-2"
              disabled
            />
            <span className="text-gray-700">or</span>
            <input
              type="url"
              id="photo"
              name="photo"
              placeholder="Enter photo URL"
              className="w-full p-2 mt-1 border border-gray-300 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-white text-black font-bold rounded-md"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
