"use client";

import { useState } from "react";

interface FormData {
  name: string;
  description: string;
  price: string;
  photo: string;
}

export default function CreateProducts() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    photo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceInt = Math.round(parseFloat(formData.price));

    try {
      const response = await fetch("/api/create-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: priceInt,
          photo: formData.photo,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        throw new Error("Failed to create product");
      }

      setFormData({ name: "", description: "", price: "", photo: "" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="p-6 bg-white m-16">
      <h1 className="text-center mt-4 mb-8 text-4xl font-bold text-[#4a628a]">
        Add New Product
      </h1>

      <div className="max-w-2xl mx-auto mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between space-x-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-1/2 p-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div className="relative w-1/2">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600">
                $
              </span>
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full pl-8 pr-3 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          ></textarea>

          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            required
            className="w-full p-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full py-3 text-lg bg-[#4a628a] text-white rounded-lg border-none cursor-pointer hover:bg-[#3d4c6a]"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
