"use client";

import { useRouter } from "next/navigation";

const SearchBar = ({ searchTerm }) => {
  const router = useRouter();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    router.push(`/products?q=${value}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
