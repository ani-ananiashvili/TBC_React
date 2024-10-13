export const fetchPostData = async (id) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  const data = await response.json();
  return data;
};
