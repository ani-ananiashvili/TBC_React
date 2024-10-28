"use client";

import { useEffect, useState } from "react";
import "./index.css";

export default function PostDetailPage({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = storedPosts.find((p) => p.id === Number(id));
    setPost(foundPost);
  }, [id]);

  if (!post) return <p>Post not found...</p>;

  return (
    <div className="post-detail">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
      <p className="post-views">Views: <strong>{post.views || 0}</strong></p>
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          <p><strong>Tags:</strong></p>
          <div className="tag-list">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
