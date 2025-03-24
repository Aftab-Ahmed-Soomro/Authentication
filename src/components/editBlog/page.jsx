"use client";

import { fetchSingleBlog, updateBlog } from "@/services/blog";
import { useState, useEffect } from "react";

export default function EditBlog({ blogId, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getBlog() {
      const { data, error } = await fetchSingleBlog(blogId);
      if (error) {
        setError("Error fetching blog");
      } else {
        setTitle(data.title);
        setDescription(data.description);
      }
    }
    getBlog();
  }, [blogId]);

  const handleUpdate = async () => {
    if (!title || !description) {
      setError("Please fill all fields");
      return;
    }

    const { error } = await updateBlog(blogId, title, description);
    if (error) {
      setError("Failed to update blog");
    } else {
      onUpdate({ id: blogId, title, description });
      onClose(); // Close modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold">Edit Blog</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mt-2"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mt-2"
          placeholder="Description"
        ></textarea>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}