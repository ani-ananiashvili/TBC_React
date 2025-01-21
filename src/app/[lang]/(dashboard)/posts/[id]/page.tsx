"use client"; 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { useLanguageContext } from "../../../../context/LanguageContext";
import Spinner from "../../../../components/Spinner/Spinner";

interface Post {
  id: number;
  Title: string;
  Description: string;
  Title_Ka?: string; 
  Description_Ka?: string; 
}

export default function PostPage() {
  const { language } = useLanguageContext(); 
  const params = useParams(); 
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.id) return;

      setLoading(true); 
      try {
        console.log("Fetching post with ID:", params.id, "and language:", language);

        const response = await fetch(`/api/posts/${params.id}?language=${language}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        console.log("Fetched post data:", data); 
        setPost(data); 
        setError(null); 
      } catch (err) {
        setError("Error fetching post: " + (err instanceof Error ? err.message : "Unknown error"));
      } finally {
        setLoading(false); 
      }
    };

    fetchPost();
  }, [params.id, language]); 

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  const title = language === "ka" ? post.Title_Ka : post.Title;
  const description = language === "ka" ? post.Description_Ka : post.Description;

  return (
    <div className="flex justify-center items-center m-28">
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
  );
}
