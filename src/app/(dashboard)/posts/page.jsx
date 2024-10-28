"use client";

import { useEffect, useState } from "react";
import PostFilter from "../../components/PostSearch/PostSearch";
import PostList from "../../components/PostList/PostList";
import PostForm from "../../components/forms/PostForm"; 
import { addPostToLocalStorage, deletePostFromLocalStorage } from "../../components/functions/postActions"; 
import "./index.css";

export default function PostsPage({ searchParams }) {
  const searchTerm = searchParams.search || "";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleAddPost = (newPost) => {
    const updatedPosts = addPostToLocalStorage(newPost, posts); 
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = deletePostFromLocalStorage(postId, posts);
    setPosts(updatedPosts);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="posts-page">
      <h1 className="page-title">Blog Posts</h1>
      <div className="search-and-form">
        <PostFilter />
        <PostForm onAddPost={handleAddPost} />
      </div>
      {filteredPosts.length > 0 ? (
        <PostList posts={filteredPosts} onDeletePost={handleDeletePost} />
      ) : (
        <p className="not-found">Post Not Found...</p>
      )}
    </div>
  );
}
