"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPostsData } from "./fetchPostsData"; 
import Spinner from "../components/Spinner/Spinner";
import "./index.css";

const PostsFetch = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchPostsData(); 
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="posts-container">
      <h1 className="header-title">Blog Posts</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body.slice(0, 100)}...</p>
            <div className="post-footer">
              <p className="post-tags">
                Tags:{" "}
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag-item">
                    #{tag}
                  </span>
                ))}
              </p>
              <p className="post-views">Views: {post.views}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsFetch;
