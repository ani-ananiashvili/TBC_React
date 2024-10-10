"use client";

import { useEffect, useState } from "react";
import "./index.css";
const PostPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

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
