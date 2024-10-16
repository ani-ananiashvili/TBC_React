import { notFound } from "next/navigation";
import { fetchPostsData } from "../fetchPostsData";
import "./index.css";


export default async function PostPage({ params }) {
  const postId = parseInt(params.id);

  const data = await fetchPostsData();

  const post = data.posts.find((post) => post.id === postId);

  if (!post) {
    return notFound();
  }

  return (
    <div className="post-page">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
      <div className="post-footer">
        <span className="post-tags">
          {post.tags?.map((tag, index) => (
            <span key={index} className="tag-item">
              {tag}
            </span>
          ))}
        </span>
        <span className="post-views">{post.views} views</span>
      </div>
    </div>
  );
}
