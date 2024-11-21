'use client'
import { useState, useEffect } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import Link from "next/link";

interface Product {
  id: number;
  Title: string;
  Description: string;
  Price: number;
  Image: string; 
  Title_Ka?: string; 
  Description_Ka?: string; 
}

export default function ProductsPage() {
  const { language } = useLanguageContext();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://localhost:3000/api/products`);
      const productsData: Product[] = await response.json();
      setProducts(productsData);
    };

    fetchProducts();
  }, [language]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {language === "ka" ? "პროდუქტები" : "Products"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.Image}
              alt={product.Title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {language === "ka" ? product.Title_Ka : product.Title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {language === "ka" ? product.Description_Ka : product.Description}
            </p>
            <p className="text-gray-800 text-base font-medium mb-2">
              Price: ${product.Price}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="text-blue-500 font-medium hover:underline"
            >
              {language === "ka" ? "დეტალები" : "View Details"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
