export const addPostToLocalStorage = (newPost, posts) => {
  const updatedPosts = [newPost, ...posts];
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return updatedPosts;
};

export const deletePostFromLocalStorage = (postId, posts) => {
  const updatedPosts = posts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return updatedPosts;
};
