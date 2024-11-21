"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";

interface Post {
  id: number;
  Title?: string;
  Description?: string;
  Title_Ka?: string;
  Description_Ka?: string;
}

export default function PostsPage() {
  const { language } = useLanguageContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/posts`);
      const data: Post[] = await response.json();

      const normalizedPosts = data.map((post) => ({
        id: post.id,
        Title: language === "ka" ? post.Title_Ka : post.Title,
        Description: language === "ka" ? post.Description_Ka : post.Description,
      }));

      setPosts(normalizedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [language]);

  if (loading) {
    return <div className="text-center">Loading posts...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {language === "ka" ? "პოსტები" : "Posts"}
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
              className="text-headerColor font-medium transition-colors duration-200"
              href={`/${language}/posts/${post.id}`}
            >
              {language === "ka" ? "დაწვრილებით..." : "See more..."}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
