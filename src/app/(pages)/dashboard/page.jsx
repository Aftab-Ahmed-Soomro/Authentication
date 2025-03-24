"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddBlogButton from '@/components/addBlogButton/page'
import Card from "@/components/card/page";
import LogoutButton from "@/components/logOutButton/page";
import { fetchUserBlogs, getUserSession } from "@/services/blog";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndBlogs() {
      const userData = await getUserSession();
      if (!userData) {
        router.push("/login"); // Redirect if user not found
      } else {
        setUser(userData);
        fetchBlogs(userData.id);
      }
    }
    fetchUserAndBlogs();
  }, []);

  async function fetchBlogs(userId) {
    const { data, error } = await fetchUserBlogs(userId);
    if (!error) setBlogs(data);
  }

  const handleAddBlog = (newBlog) => {
    setBlogs((prev) => [...prev, newBlog]);
  };

  const handleDeleteBlog = (deletedBlogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== deletedBlogId));
  };  

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="max-w-5xl mx-auto flex justify-between items-center bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-3">
          <AddBlogButton onAddBlog={handleAddBlog} />
          <LogoutButton />
        </div>
      </header>

      {/* Welcome Message */}
      <section className="max-w-5xl mx-auto mt-8 text-center">
        <p className="text-lg text-gray-700">
          Welcome,{" "}
          <span className="font-semibold text-gray-900">{user.email}</span>
        </p>
      </section>

      {/* Blogs List */}
      <section className="max-w-5xl mx-auto mt-8">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, index) => (
              <Card 
                key={index} 
                id={blog.id} 
                title={blog.title} 
                description={blog.description} 
                onUpdate={() => {
                  fetchBlogs(user.id);
                  handleDeleteBlog(blog.id); // Remove from state after delete
                }} 
              />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center mt-6">
            No blogs added yet. Start writing your first blog!
          </p>
        )}
      </section>
    </div>
  );
}
