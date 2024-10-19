"use client";

import { useRouter } from "next/navigation";
import './SortComponent.css'

const SortComponent = ({ sortOption }) => {
  const router = useRouter();

  const handleSortChange = (e) => {
    const value = e.target.value;
    router.push(`/products?sortBy=${value}`);
  };

  return (
    <div className="sort-component">
      <label>Sort by:</label>
      <select value={sortOption} onChange={handleSortChange}>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="title-asc">Title: A-Z</option>
        <option value="title-desc">Title: Z-A</option>
      </select>
    </div>
  );
};

export default SortComponent;
