"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguageContext } from "../../../../context/LanguageContext";
import Spinner from "../../../../components/Spinner/Spinner";
import { FaTrash } from "react-icons/fa";

interface Blog {
  id: number;
  Title: string;
  Description: string;
  Title_Ka?: string;
  Description_Ka?: string;
  Image?: string;
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
    <div className="flex justify-center items-center pt-28 pb-10 dark:bg-dark-gradient">
      <div className="p-8 bg-white dark:bg-dark-gradient shadow-md rounded-lg max-w-5xl w-full flex">
        {blog.Image && (
          <div className="w-1/2 p-4">
            <img
              src={blog.Image}
              alt={title}
              className="w-full h-auto max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
        <div className="w-1/2 p-4 flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-4 dark:text-white text-center">
            {title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-4 text-justify">
            {description}
          </p>
          <div className="flex space-x-4 mt-6"></div>
          <div className="flex space-x-4 mt-6">
            <button className="bg-white border-2 border-[#4A628A] text-black py-2 w-96 rounded dark:bg-dark-gradient dark:text-white">
              {language === "ka" ? "ბლოგის რედაქტირება" : "Edit Blog"}
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 w-9 rounded dark:bg-red-600 flex justify-center items-center"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
