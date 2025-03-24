"use client";

export default function Card({ title, description }) {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      {/* Description */}
      <p className="text-gray-700 mt-2 text-sm">{description}</p>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-end gap-3">
        <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200">
          Edit
        </button>
        <button className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200">
          Delete
        </button>
      </div>
    </div>
  );
}
