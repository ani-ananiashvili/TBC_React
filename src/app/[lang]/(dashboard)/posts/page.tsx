import Link from "next/link";

interface Post{
  id:number,
  Title:string,
  Description:string,

}
export default async function PostsPage() {
  const response = await fetch("http://localhost:3000/api/posts");
  const posts:Post[] = await response.json();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {post.Title}
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {post.Description}
            </p>
            <Link
              className="text-slate-600 font-medium transition-colors duration-200"
              href={`/ka/posts/${post.id}`}
            >
              see more ...
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

}