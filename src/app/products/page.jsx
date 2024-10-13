"use client";

import { useState, useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOption, setSortOption] = useState("price"); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?search=${searchTerm}&sort=${sortOption}`
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts(); 
  }, [searchTerm, sortOption]); 

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="product-title">Product List - Shop With Us!</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="sort-bar">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)} 
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="stock">Stock</option>
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
