"use client"; 

import Link from "next/link";
import "./PostList.css";

export default function PostList({ posts }) {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h2 className="post-title">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="post-body">{post.body.slice(0, 100)}...</p>
          
          <Link href={`/posts/${post.id}`}>
            <button className="read-more-btn">Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
