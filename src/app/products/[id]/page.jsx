"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import './index.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          if (!response.ok) {
            throw new Error("Product not found");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
          setError(error.message); 
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p className="loading-text">Loading...</p>; 
  }

  if (error) {
    return <p className="error-text">{error}</p>; 
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details-container">
      <h1 className="product-title">{product.title}</h1>
      <img className="product-image" src={product.thumbnail} alt={product.title} />
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
};

export default ProductPage;
