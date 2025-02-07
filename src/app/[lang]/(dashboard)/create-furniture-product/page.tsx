"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "../../../context/LanguageContext";

export default function CreateProductForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const router = useRouter();
  const { language } = useLanguageContext();

  const categories = [
    "Herman Miller",
    "Ashley",
    "Knoll",
    "Vitra",
    "BoConcept",
    "Cassina",
    "Natuzzi",
    "Restoration Hardware",
    "West Elm",
    "Roche Bobois",

    "IKEA",
    "Flexform",
  ];

  // validation

  const validateForm = (
    name: string,
    price: number,
    photo: string,
    description: string
  ) => {
    const nameRegex = /^[a-zA-Z0-9 ]{3,50}$/;
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
    const descriptionRegex = /^.{10,500}$/;

    if (!name || !nameRegex.test(name)) {
      return language === "ka"
        ? "უსაფრთხო პროდუქტის დასახელება, შეიყვანეთ სათაური 3-დან 50 სიმბოლომდე."
        : "Invalid product title. Please enter a title between 3 and 50 characters.";
    }

    if (!price || !priceRegex.test(price.toString())) {
      return language === "ka"
        ? "შეიყვანეთ სწორი ფასი."
        : "Please enter a valid price.";
    }

    if (photo && !urlRegex.test(photo)) {
      return language === "ka"
        ? "მიუღებელი ფოტო URL."
        : "Invalid photo URL format.";
    }

    if (!description || !descriptionRegex.test(description)) {
      return language === "ka"
        ? "აღწერა უნდა იყოს 10-დან 500 სიმბოლომდე."
        : "Description should be between 10 and 500 characters.";
    }

    if (!selectedCategory) {
      return language === "ka"
        ? "გთხოვთ, შეარჩიეთ ბრენდი."
        : "Please select a brand.";
    }

    return null;
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const photo = formData.get("photo") as string;
    const brand = selectedCategory;
    const description = formData.get("description") as string;

    const validationMessage = validateForm(name, price, photo, description);

    if (validationMessage) {
      setMessage(validationMessage);
      setIsError(true);
      return;
    }

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
    <div className="p-24 pb-16 min-h-screen bg-light-gradient dark:bg-dark-gradient">
      <div className="text-center">
        <img
          src="/assets/logo_blue.png"
          alt="logo"
          className="mx-auto mb-4 w-28 bg-transparent bg-sky-600"
        />
        <h2 className="text-2xl font-semibold text-[#4a628a] mb-6">
          {language === "ka" ? "დაამატეთ ახალი პროდუქტი" : "Add New Product"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg border border-[#4a628a] dark:bg-dark-gradient dark:border-gray-600"
      >
        {message && (
          <div
            className={`p-4 mb-4 ${
              isError ? "text-red-600" : "bg-green-600"
            } rounded-md`}
          >
            {message}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-[#4a628a]"
          >
            {language === "ka" ? "პროდუქტის დასახელება" : "Product Title"}:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={
              language === "ka"
                ? "შეიყვანეთ პროდუქტის დასახელება"
                : "Enter product title"
            }
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a628a] outline-none dark:bg-dark-gradient dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-[#4a628a]"
          >
            {language === "ka" ? "პროდუქტის აღწერა" : "Product Description"}:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder={
              language === "ka"
                ? "შეიყვანეთ პროდუქტის აღწერა"
                : "Enter product description"
            }
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a628a] outline-none dark:bg-dark-gradient dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-lg font-medium text-[#4a628a]"
          >
            {language === "ka" ? "ფასი" : "Price"}:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder={language === "ka" ? "შეიყვანეთ ფასი" : "Enter price"}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a628a] outline-none dark:bg-dark-gradient dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-[#4a628a]"
          >
            {language === "ka" ? "პროდუქტის ბრენდი" : "Product Brand"}:
          </label>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md border text-lg font-medium ${
                  selectedCategory === category
                    ? "bg-[#4a628a] text-white"
                    : "bg-gray-200 text-[#4a628a] hover:bg-[#e4ebf5]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {selectedCategory && (
            <p className="mt-2 text-sm text-[#4a628a]">
              {language === "ka" ? "არჩეული ბრენდი: " : "Selected Brand: "}{" "}
              {selectedCategory}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="photo"
            className="block text-lg font-medium text-[#4a628a]"
          >
            {language === "ka" ? "ფოტოს ატვირთვა" : "Photo Upload"}:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="photo"
              name="photo"
              className="border border-gray-300 p-3 rounded-lg"
              disabled
            />
            <span className="text-[#4a628a]">or</span>
            <input
              type="url"
              id="photo"
              name="photo"
              placeholder={
                language === "ka" ? "შეიყვანეთ ფოტო URL" : "Enter photo URL"
              }
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a628a] outline-none dark:bg-dark-gradient dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#4a628a] text-white font-bold rounded-md hover:bg-[#365f80] dark:bg-[#365f80] dark:hover:bg-[#4a628a]"
        >
          {language === "ka" ? "პროდუქტის დამატება" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
