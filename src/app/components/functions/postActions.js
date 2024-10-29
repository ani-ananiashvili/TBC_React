export const addPostToLocalStorage = (newPost, existingPosts) => {
  const updatedPosts = [newPost, ...existingPosts];

  const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
  userPosts.unshift(newPost);
  localStorage.setItem("userPosts", JSON.stringify(userPosts));

  return updatedPosts;
};

export const deletePostFromLocalStorage = (postId, existingPosts) => {
  const updatedPosts = existingPosts.filter((post) => post.id !== postId);

  let userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
  userPosts = userPosts.filter((post) => post.id !== postId);
  localStorage.setItem("userPosts", JSON.stringify(userPosts));

  return updatedPosts;
};

export const updatePostInLocalStorage = (updatedPost, existingPosts) => {
  const updatedPosts = existingPosts.map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );

  let userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
  userPosts = userPosts.map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );
  localStorage.setItem("userPosts", JSON.stringify(userPosts));

  return updatedPosts;
};
