"use client";

import { logout } from "@/services/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
    >
      Log Out
    </button>
  );
}
