import { fetchPostsData } from "./fetchPostsData";  
import "./index.css";  

export default async function PostsPage() {
  const data = await fetchPostsData();

  return (
    <div className="posts-page">
      <h1>All Posts</h1>
      <div className="posts-list">
        {data.posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <a href={`/posts/${post.id}`}>Read More</a> 
          </div>
        ))}
      </div>
    </div>
  );
}
