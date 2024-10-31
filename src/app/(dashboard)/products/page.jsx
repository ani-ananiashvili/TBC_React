"use client";

import { useEffect, useState } from "react";
import AddProductForm from "../../components/forms/AddProductForm";
import SearchBar from "../../components/Search/SearchBar";
import SortComponent from "../../components/Sort/SortComponent";
import Link from "next/link";
import "./products.css";

async function fetchProducts(searchTerm = "", sortOption = "") {
  let url = "https://dummyjson.com/products";

  if (searchTerm) {
    url = `https://dummyjson.com/products/search?q=${searchTerm}`;
  }

  if (sortOption) {
    const [sortBy, order] = sortOption.split("-");
    url = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data.products || [];
}

export default function ProductPage({ searchParams }) {
  const { q: searchTerm = "", sortBy: sortOption = "" } = searchParams;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const apiProducts = await fetchProducts(searchTerm, sortOption);
      const savedProducts =
        JSON.parse(localStorage.getItem("customProducts")) || [];
      setProducts([...savedProducts, ...apiProducts]);
    }
    loadProducts();
  }, [searchTerm, sortOption]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <div className="product-page container">
      <h1>Our Products</h1>

      <AddProductForm onAddProduct={handleAddProduct} />

      <div className="search-sort-container">
        <SearchBar searchTerm={searchTerm} />
        <SortComponent sortOption={sortOption} />
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((item) => (
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
          ))}
        </div>
      ) : (
        <p className="no-products">Product Not Found...</p>
      )}
    </div>
  );
}
