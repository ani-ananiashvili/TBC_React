"use client";

import "../products.css";

const SearchSort = ({ handleSearchChange, handleSortChange }) => {
  return (
    <div className="product-search-sort">
      <input
        type="text"
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search Products..."
        className="product-search-input"
      />

      <div className="product-sort">
        <label htmlFor="sort" className="product-sort-label">Sort by:</label>
        <select
          id="sort"
          onChange={(e) => handleSortChange(e.target.value)}
          className="product-sort-select"
        >
          <option value="">Select</option>
          <option value="title-asc">Title: A-Z</option>
          <option value="title-desc">Title: Z-A</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SearchSort;
