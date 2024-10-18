"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      onSearch(searchValue);
    }, 500), // 500ms delay
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel(); // Cleanup debounce on unmount
    };
  }, [searchTerm, debouncedSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
