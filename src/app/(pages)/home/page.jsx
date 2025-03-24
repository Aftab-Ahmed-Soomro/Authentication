"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { fetchBlogs } from "@/services/blog";
import Card2 from '@/components/card2/page'

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const { data, error } = await fetchBlogs();
      if (error) {
        setFetchError("Could not fetch the blogs");
      } else {
        setBlogs(data);
        setFetchError("");
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="max-w-5xl mx-auto flex justify-between items-center bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <FaSun className="text-yellow-500" />
          <span>Aftab</span>
        </div>
        <div className="flex gap-4">
          <Link href="/signup" className="px-4 py-2 border rounded-md hover:bg-gray-200">Sign Up</Link>
          <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</Link>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="max-w-5xl mx-auto mt-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome to Aftab Platform</h1>
        {fetchError && <p className="text-red-500 mt-2">{fetchError}</p>}
      </section>

      {/* Blog List */}
      <section className="max-w-5xl mx-auto mt-8">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, index) => (
              <Card2 key={index} title={blog.title} description={blog.description} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center mt-6">Loading blogs...</p>
        )}
      </section>
    </div>
  );
}
