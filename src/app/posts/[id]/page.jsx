import './index.css'


const fetchPostData = async (id) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!response.ok) {
    throw new Error("Post not found.");
  }
  const data = await response.json();
  return data;
};

const PostPage = async ({ params }) => {
  const { id } = params;

  let post;

  try {
    post = await fetchPostData(id);
  } catch (error) {
    return (
      <div className="error-message">
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="post-footer">
        <p className="tags">Tags: {post.tags.join(", ")}</p>
        <p className="post-views">Views: {post.views}</p>
      </div>
    </div>
  );
};

export default PostPage;
