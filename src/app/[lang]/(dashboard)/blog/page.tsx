"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import Spinner from "../../../components/Spinner/Spinner";

interface Blog {
  id: string;
  Title: string;
  Description: string;
  Image: string;
}

export default function BlogPage() {
  const { language } = useLanguageContext();
  const [blog, setBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const normalizedBlog = data.map((blog) => {
          return {
            id: blog.id,
            Title: language === "ka" ? blog.Title_Ka : blog.Title,
            Description:
              language === "ka" ? blog.Description_Ka : blog.Description,
            Image: blog.Image,
          };
        });

        setBlog(normalizedBlog);
      } else {
        console.error("Expected an array but got:", data);
        setBlog([]);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setBlog([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [language]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlog = blog.filter(
    (blog) =>
      blog.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.Description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  const maxDescriptionLength = 120; 

  return (
    <div
      className={`mx-auto p-6 min-h-screen bg-light-gradient dark:bg-dark-gradient`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {language === "ka" ? "ბლოგი" : "Blog"}
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder={language === "ka" ? "ძიება..." : "Search..."}
          value={searchQuery}
          onChange={handleSearchChange}
          className="mt-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-headerColor dark:bg-dark-gradient dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlog.length > 0 ? (
          filteredBlog.map((blog) => (
            <div
              key={blog.id}
              className={`dark:bg-dark-gradient bg-white border border-gray-200 shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 dark:border-gray-600`}
            >
              {blog.Image ? (
                <img
                  src={blog.Image}
                  alt="Blog Image"
                  className="w-full h-56 object-contain rounded-lg mb-4"
                />
              ) : (
                <div
                  className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>No image available</span>
                </div>
              )}

              <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
                {blog.Title}
              </h2>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed dark:text-gray-400">
                {blog.Description?.length > maxDescriptionLength
                  ? `${blog.Description.slice(0, maxDescriptionLength)}...`
                  : blog.Description}
              </p>

              <Link
                className="text-headerColor font-medium transition-colors duration-200 dark:text-blue-300"
                href={`/${language}/blog/${blog.id}`}
              >
                {language === "ka" ? "დაწვრილებით..." : "See more..."}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            {language === "ka"
              ? "ასეთი პოსტი არ არსებობს"
              : "No such blog exists"}
          </p>
        )}
      </div>
    </div>
  );
}
