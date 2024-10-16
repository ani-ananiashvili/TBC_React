import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./SearchBar.css";


export default function SearchBar({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [noResults, setNoResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      filterPosts(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const filterPosts = (query) => {
    if (query) {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredPosts(filtered);
      setNoResults(filtered.length === 0);
    } else {
      setFilteredPosts(posts);
      setNoResults(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    router.push(`/posts?search=${value}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search Posts..."
        className="search-bar"
      />
      <div className="posts-grid">
        {noResults ? (
          <p>No posts found</p>
        ) : (
          filteredPosts.map((post) => (
            <div className="post-card" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
              <div className="post-footer">
                <span className="post-tags">
                  {post.tags?.map((tag, index) => (
                    <span key={index} className="tag-item">
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="post-views">{post.views} views</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
