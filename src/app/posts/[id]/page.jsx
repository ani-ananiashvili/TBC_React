"use client";

import { useEffect, useState } from "react";
import { fetchPostData } from "./fetchPostData";
import "./index.css";

const PostPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchPostData(id);

      if (!data) {
        setError("Post Not Found...");
      } else {
        setPost(data);
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="post-footer">
        <p className="tags">Tags: {post.tags.join(", ")}</p>
        <p className="post-views">Views: {post.views}</p>
      </div>
    </div>
  );
};

export default PostPage;
