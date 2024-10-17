import SearchBar from "../components/SearchBar/SearchBar";
import PostList from "../components/PostList/PostList";
import "./index.css";

export default async function PostsPage({ searchParams }) {
  const searchTerm = searchParams.search || "";

  let url = "https://dummyjson.com/posts";
  if (searchTerm) {
    url = `https://dummyjson.com/posts/search?q=${searchTerm}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  const posts = data.posts || [];

  return (
    <div className="posts-page">
      <h1 className="page-title">Blog Posts</h1>
      <SearchBar />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="not-found">Post Not Found...</p>
      )}
    </div>
  );
}
