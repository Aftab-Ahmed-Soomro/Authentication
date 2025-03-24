'use client'

import { useState } from "react";
import EditBlog from '../editBlog/page'
import { deleteBlog } from "@/services/blog";

export default function Card({ id, title, description, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const response = await deleteBlog(id);
    if (response.success) {
      onUpdate(); // Refresh the list after deletion
    } else {
      console.error("Failed to delete blog");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-700 mt-2 text-sm">{description}</p>
      <div className="mt-4 flex justify-end gap-3">
        <button 
          onClick={() => setIsEditing(true)} 
          className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
          Edit
        </button>
        <button onClick={handleDelete} className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600">
          Delete
        </button>
      </div>

      {isEditing && <EditBlog blogId={id} onClose={() => setIsEditing(false)} onUpdate={onUpdate} />}
    </div>
  );
}