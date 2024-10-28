export const addPostToLocalStorage = (newPost, existingPosts) => {
  const updatedPosts = [newPost, ...existingPosts];
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return updatedPosts;
};

export const deletePostFromLocalStorage = (postId, existingPosts) => {
  const updatedPosts = existingPosts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return updatedPosts;
};

export const updatePostInLocalStorage = (updatedPost, existingPosts) => {
  const updatedPosts = existingPosts.map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return updatedPosts;
};
