"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "./PostSearch.css";

export default function PostSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, 400); 
  };

  return (
    <div className="post-filter">
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
}
