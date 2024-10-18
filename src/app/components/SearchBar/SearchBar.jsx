"use client";

import "./SearchBar.css";

const SortComponent = ({ onSort }) => {
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    onSort(sortValue);
  };

  return (
    <div className="sort-component">
      <label>Sort by:</label>
      <select onChange={handleSortChange}>
        <option value="">Select</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="title-asc">Title (A to Z)</option>
        <option value="title-desc">Title (Z to A)</option>
      </select>
    </div>
  );
};

export default SortComponent;
