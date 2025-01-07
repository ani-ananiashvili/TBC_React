"use client";

import { useState } from "react";

interface FormData {
  name: string;
  description: string;
  price: string;
  photo: string;
  errors: {
    name: string;
    description: string;
    price: string;
    photo: string;
  };
}

export default function CreateProducts() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    photo: "",
    errors: {
      name: "",
      description: "",
      price: "",
      photo: "",
    },
  });

  const [message, setMessage] = useState<string | null>(null);

  const regexPrice = /^[0-9]+$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price" && value !== "" && !regexPrice.test(value)) {
      return;
    }

    let updatedErrors = { ...formData.errors };

    if (name === "price") {
      if (value === "") {
        updatedErrors.price = "";
      } else if (!regexPrice.test(value)) {
        updatedErrors.price = "Please enter a valid number for the price";
      } else {
        updatedErrors.price = "";
      }
    }

    setFormData({ ...formData, [name]: value, errors: updatedErrors });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    let updatedErrors = { ...formData.errors };

    if (formData.name.trim() === "") {
      updatedErrors.name = "Product Name is required";
      isValid = false;
    } else {
      updatedErrors.name = "";
    }

    if (formData.description.trim() === "") {
      updatedErrors.description = "Product Description is required";
      isValid = false;
    } else {
      updatedErrors.description = "";
    }

    if (!regexPrice.test(formData.price)) {
      updatedErrors.price = "Please enter a valid number for the price";
      isValid = false;
    } else {
      updatedErrors.price = "";
    }

    const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regexUrl.test(formData.photo)) {
      updatedErrors.photo = "Please enter a valid URL";
      isValid = false;
    } else {
      updatedErrors.photo = "";
    }

    setFormData({ ...formData, errors: updatedErrors });

    if (!isValid) return;

    try {
      const priceInt = parseInt(formData.price, 10);

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

      setFormData({
        name: "",
        description: "",
        price: "",
        photo: "",
        errors: { name: "", description: "", price: "", photo: "" },
      });

      setMessage("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);

      setMessage("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white m-16">
      <h1 className="text-center mt-4 mb-8 text-4xl font-bold text-[#4a628a]">
        Add New Product
      </h1>

      {message && (
        <div
          className={`text-center p-4 mb-4 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

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
            {formData.errors.name && (
              <span className="text-red-700">{formData.errors.name}</span>
            )}
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
              {formData.errors.price && (
                <span className="text-red-700">{formData.errors.price}</span>
              )}
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {formData.errors.description && (
            <span className="text-red-700">{formData.errors.description}</span>
          )}

          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            required
            className="w-full p-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {formData.errors.photo && (
            <span className="text-red-700">{formData.errors.photo}</span>
          )}

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
