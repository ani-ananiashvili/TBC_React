"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "../components/Spinner/Spinner";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // search with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      if (value.trim() === "") {
        setFilteredProducts(products);
      } else {
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${value}`
          );
          const data = await response.json();
          setFilteredProducts(data.products);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    }, 300);

    setDebounceTimeout(timeout);
  };

  // sort
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);

    let sortedProducts = [...filteredProducts];
    if (value === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === "name-asc") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "name-desc") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredProducts(sortedProducts);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="product-title">Product List - Shop With Us!</h1>

      <div className="search-sort-section">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="sort-section">
          <label htmlFor="sort-options" className="sort-label">
            Sort list:
          </label>
          <select id="sort-options" value={sortOption} onChange={handleSortChange}>
            <option value="default">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link href={`/products/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-products">Product Not Found...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
