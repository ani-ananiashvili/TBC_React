import React from "react";
 
type Post = {
  id: number;
  Title: string;
  Description: string;
};
 
async function getPost(id: string): Promise<Post> {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });
 
  if (!response.ok) {
    throw new Error("Failed to fetch the post");
  }
 
  return response.json();
}
 
export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
 
  try {
    const post = await getPost(id);
 
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">{post.Title}</h1>
          <p className="text-gray-700">{post.Description}</p>
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
}
 