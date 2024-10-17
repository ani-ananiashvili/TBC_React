"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./SearchBar.css";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    router.push(`/posts?search=${value}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search Posts..."
        className="searchInput"
      />
    </div>
  );
}
