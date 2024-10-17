"use client";

import { useState } from "react";

const SearchBar = ({ searchType }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Searching for: ", searchTerm);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={`Search ${searchType}...`}
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
