export const fetchPostData = async (id) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};
