"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import PostFilter from "../../components/PostSearch/PostSearch";
import PostList from "../../components/PostList/PostList";
import PostForm from "../../components/forms/PostForm";
import EditPostForm from "../../components/forms/EditPostForm";
import {
  addPostToLocalStorage,
  deletePostFromLocalStorage,
  updatePostInLocalStorage,
} from "../../components/functions/postActions";
import "./index.css";

export default function PostsPage() {
  const searchParams = useSearchParams(); 
  const searchTerm = searchParams.get("search") || ""; 
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();

        const originalPosts = data.posts;
        const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

        const combinedPosts = [...userPosts, ...originalPosts];

        setPosts(combinedPosts);

        localStorage.setItem("originalPosts", JSON.stringify(originalPosts));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = (newPost) => {
    const updatedPosts = addPostToLocalStorage(newPost, posts);
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = deletePostFromLocalStorage(postId, posts);
    setPosts(updatedPosts);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = (updatedPost) => {
    const updatedPosts = updatePostInLocalStorage(updatedPost, posts);
    setPosts(updatedPosts);
    setEditingPost(null);
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
      {editingPost && (
        <EditPostForm
          post={editingPost}
          onUpdatePost={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
        />
      )}
      {filteredPosts.length > 0 ? (
        <PostList
          posts={filteredPosts}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
        />
      ) : (
        <p className="not-found">Post Not Found...</p>
      )}
    </div>
  );
}
