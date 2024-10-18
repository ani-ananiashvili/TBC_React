'use client'

import { useState, useEffect } from "react";
import SearchBar from "../components/Search/SearchBar";
import SortComponent from "../components/Sort/SortComponent";
import "./products.css";
import Link from "next/link";
import Spinner from "../components/Spinner/Spinner";

async function fetchProducts(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.products || [];
}

const ProductFetch = ({ searchParams }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let url = "https://dummyjson.com/products";
      if (searchTerm) {
        url = `https://dummyjson.com/products/search?q=${searchTerm}`;
      }
      if (sortOption) {
        url = `https://dummyjson.com/products?sortBy=${sortOption.split("-")[0]}&order=${sortOption.split("-")[1]}`;
      }

      try {
        const fetchedProducts = await fetchProducts(url);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, sortOption]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSort = (value) => {
    setSortOption(value);
  };

  return (
    <div className="product-page container">
      <h1>Our Products</h1>

      <div className="search-sort-container">
        <SearchBar onSearch={handleSearch} />
        <SortComponent onSort={handleSort} />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.id} className="product-card">
                <Link href={`/products/${item.id}`} legacyBehavior>
                  <a>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h2>{item.title}</h2>
                      <p className="product-description">{item.description}</p>
                      <p className="product-price">${item.price}</p>
                    </div>
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-products">Product Not Found...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFetch;
