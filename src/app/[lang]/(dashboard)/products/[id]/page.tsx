"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLanguageContext } from "../../../../context/LanguageContext"; 
import Spinner from "../../../../components/Spinner/Spinner"; 

interface Product {
  id: number;
  Title: string;
  Description: string;
  Title_Ka?: string;
  Description_Ka?: string;
  Price: number;
  Image: string;
}

export default function ProductPage() {
  const { language } = useLanguageContext(); 
  const params = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;

      setLoading(true); 
      try {
        console.log("Fetching product with ID:", params.id, "and language:", language);

        const response = await fetch(`/api/products/${params.id}?language=${language}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        console.log("Fetched product data:", data);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Error fetching product: " + (err instanceof Error ? err.message : "Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, language]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const title = language === "ka" ? product.Title_Ka : product.Title;
  const description = language === "ka" ? product.Description_Ka : product.Description;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-md rounded-lg max-w-2xl text-center">
        <img
          src={product.Image}
          alt={title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-gray-700 text-lg font-medium">Price: ${product.Price}</p>
      </div>
    </div>
  );
}
