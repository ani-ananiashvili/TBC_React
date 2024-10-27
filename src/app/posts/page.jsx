import PostFilter from "../components/PostSearch/PostSearch";
import PostList from "../components/PostList/PostList";
import "./index.css";

export default async function PostsPage({ searchParams }) {
  const searchTerm = searchParams.search || "";

  let url = "https://dummyjson.com/posts";
  if (searchTerm) {
    url = `https://dummyjson.com/posts/search?q=${searchTerm}`;
  }

  console.log("Fetching URL:", url); 

  let posts = [];
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    posts = data.posts || [];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return <p>Error loading posts... Please try again later...</p>; 
  }

  return (
    <div className="posts-page">
      <h1 className="page-title">Blog Posts</h1>
      <PostFilter />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="not-found">Post Not Found...</p>
      )}
    </div>
  );
}
