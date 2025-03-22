import Link from 'next/link';
import { FaSun } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center gap-2 text-xl font-bold">
          <FaSun className="text-yellow-500" />
          <span>Aftab</span>
        </div>
        <div className="flex gap-4">
          <Link href="/signup" className="px-4 py-2 border rounded-md hover:bg-gray-200">Sign Up</Link>
          <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-semibold">Welcome to Aftab Platform</h1>
      </main>
    </div>
  );
}