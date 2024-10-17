"use client";

import "./SortComponent.css";

const Sort = () => {
  return (
    <div className="sort-component">
      <label>Sort by:</label>
      <select
        onChange={(e) => {
          const sortValue = e.target.value;
          window.location.href = `/?sortBy=${sortValue}`;
        }}
      >
        <option value="">Select</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="title-asc">Title (A to Z)</option>
        <option value="title-desc">Title (Z to A)</option>
      </select>
    </div>
  );
};

export default Sort;
