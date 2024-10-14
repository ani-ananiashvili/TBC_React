"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import SearchSort from "./SearchSort";
import Spinner from "../../components/Spinner/Spinner";

const ProductList = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  // search input
  const handleSearchChange = async (term) => {
    setLoading(true);
    const res = await fetch(`https://dummyjson.com/products/search?q=${term}`);
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  // debounce function for search
  const debounceSearch = (term) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => handleSearchChange(term), 500);
  };

  // sort
  const handleSortChange = (sortOption) => {
    let sortedProducts = [...products];

    switch (sortOption) {
      case "title-asc":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <div>
      <div className="search-sort-section">
        <SearchSort
          handleSearchChange={debounceSearch}
          handleSortChange={handleSortChange}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products">Products Not Found...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
