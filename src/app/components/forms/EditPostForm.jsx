import React, { useState, useEffect } from 'react';
import './EditPostForm.css'; 

const EditPostForm = ({ post, onUpdatePost, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { ...post, title, body };
    onUpdatePost(updatedPost);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Edit Post</h2>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className='titles'>
            Description:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
          <button type="submit">Update Post</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;
