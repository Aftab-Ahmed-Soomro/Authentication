"use server"; // Ensure it's running on the server

import { createServerSupabase } from "@/app/utils/supabase/server";

// Fetch blogs from Supabase
export async function fetchBlogs() {

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("blogs")
    .select();

  if (error) {
    console.error("Error fetching blogs:", error);
    return { error: "Could not fetch the blogs", data : [] };
  }

  return { data, error: null };
}

// Fetch User blogs from Supabase
export async function fetchUserBlogs(userId) {
  if (!userId) return { data: [], error: "User ID is required" };

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("user_id", userId) // Fetch blogs where user_id matches the logged-in user
    .order("created_at", { ascending: false }); // Sort by newest blogs

  if (error) {
    console.error("Error fetching user's blogs:", error);
    return { error: "Could not fetch the blogs", data: [] };
  }

  return { data, error: null };
}