"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import Spinner from "../../../components/Spinner/Spinner";

interface Blog {
  id: number;
  Title?: string;
  Description?: string;
  Title_Ka?: string;
  Description_Ka?: string;
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
      const data: Blog[] = await response.json();

      const normalizedBlog = data.map((blog) => ({
        id: blog.id,
        Title: language === "ka" ? blog.Title_Ka : blog.Title,
        Description: language === "ka" ? blog.Description_Ka : blog.Description,
      }));

      setBlog(normalizedBlog);
    } catch (error) {
      console.error("Error fetching blog:", error);
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {language === "ka" ? "ბლოგი" : "Blog"}
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder={language === "ka" ? "ძიება..." : "Search..."}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-headerColor"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlog.length > 0 ? (
          filteredBlog.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {blog.Title}
              </h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {blog.Description}
              </p>
              <Link
                className="text-headerColor font-medium transition-colors duration-200"
                href={`/${language}/blog/${blog.id}`}
              >
                {language === "ka" ? "დაწვრილებით..." : "See more..."}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            {language === "ka"
              ? "ასეთი პოსტი არ არსებობს"
              : "No such blog exists"}
          </p>
        )}
      </div>
    </div>
  );
}
