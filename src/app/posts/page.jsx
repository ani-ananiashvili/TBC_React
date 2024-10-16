import Link from "next/link";
import './index.css'


const fetchPostsData = async () => {
  const response = await fetch("https://dummyjson.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts.");
  }
  const data = await response.json();
  return data;
};

const PostsFetch = async () => {
  let posts = [];

  try {
    const data = await fetchPostsData();
    posts = data.posts;
  } catch (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  return (
    <div className="posts-container">
      <h1 className="header-title">Blog Posts</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body.slice(0, 100)}...</p>
            <div className="post-footer">
              <p className="post-tags">
                Tags:{" "}
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag-item">
                    #{tag}
                  </span>
                ))}
              </p>
              <p className="post-views">Views: {post.views}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsFetch;
