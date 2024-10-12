"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "../components/Spinner/Spinner";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="product-title">Product List - Shop With Us!</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
