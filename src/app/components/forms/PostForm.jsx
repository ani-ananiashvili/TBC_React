"use client";

import { useState } from "react";
import "./PostForm.css"; 

export default function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      const newPost = { id: Date.now(), title, body }; 
      onAddPost(newPost); 
      setTitle("");
      setBody("");
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
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
        ></textarea>
      </div>
      <button type="submit" className="submit-btn">Add Post</button>
    </form>
  );
}
