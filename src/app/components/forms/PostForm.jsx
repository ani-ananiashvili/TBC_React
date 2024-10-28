"use client";

import { useState, useEffect } from "react";
import "./PostForm.css"; 

const PostForm = ({ onAddPost, onUpdatePost, post, onCancel }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: post ? post.id : Date.now(), 
      title,
      body,
    };

    if (post) {
      onUpdatePost(newPost);
    } else {
      onAddPost(newPost);
    }
    setTitle("");
    setBody("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{post ? "Edit Post" : "Add Post"}</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Description</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        {post ? "Update Post" : "Add Post"}
      </button>
      {post && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default PostForm;
