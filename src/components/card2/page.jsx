"use client";

export default function Card2({ title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-3 text-base leading-relaxed">{description}</p>
    </div>
  );
}