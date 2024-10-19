"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { debounce } from "../utils/debounce";

const SearchBar = ({ searchTerm }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchTerm);

  const debouncedSearch = useCallback(
    debounce((value) => {
      router.push(`/products?q=${value}`);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
