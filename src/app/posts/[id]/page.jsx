import './index.css';

export default async function PostDetailPage({ params }) {
  const { id } = params;
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const post = await res.json();

  return (
    <div className="post-detail">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
      <p className="post-views">Views: <strong>{post.views}</strong></p>
      <div className="post-tags">
        <p><strong>Tags:</strong></p>
        <div className="tag-list">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
