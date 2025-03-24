"use client";

import { useState } from "react";
import { addBlogs } from "./action"; // Ensure correct import

export default function AddBlogButton({ onAddBlog }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setFormError("Please fill all fields");
      return;
    }

    try {
      const { data, error } = await addBlogs(title, description);

      if (error) {
        console.error(error);
        setFormError("Something went wrong. Try again.");
        return;
      }

      // Update parent state
      onAddBlog({ title, description });

      // Reset fields
      setTitle("");
      setDescription("");
      setFormError("");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setFormError("Unexpected error occurred");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Add Blog
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Blog</h2>
            <form onSubmit={handleAddBlog}>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              ></textarea>
              {formError && <p className="text-red-500">{formError}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
