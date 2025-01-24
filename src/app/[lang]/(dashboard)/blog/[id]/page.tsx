"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguageContext } from "../../../../context/LanguageContext";
import Spinner from "../../../../components/Spinner/Spinner";

interface Blog {
  id: number;
  Title: string;
  Description: string;
  Title_Ka?: string;
  Description_Ka?: string;
}

export default function BlogPage() {
  const { language } = useLanguageContext();
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/blog/${params.id}?language=${language}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data);
        setError(null);
      } catch (err) {
        setError(
          "Error fetching blog: " +
            (err instanceof Error ? err.message : "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id, language]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push(`/blog`);
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Error deleting blog");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  const title = language === "ka" ? blog.Title_Ka : blog.Title;
  const description =
    language === "ka" ? blog.Description_Ka : blog.Description;

  return (
    <div className="flex justify-center items-center m-28">
      <div className="p-8 bg-white shadow-md rounded-lg max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700">{description}</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
}
