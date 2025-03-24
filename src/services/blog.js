// Ensure it's running on the server
"use server";

import { createServerSupabase } from "@/utils/supabase/server";

// Add Blogs from Supabase
export async function addBlogs(title, description) {
  const supabase = createServerSupabase();

  // Get logged-in user
  const user = await getUserSession();
  if (!user || !user.id) {
    console.error("User authentication failed");
    return { error: "User not authenticated", data: null };
  }

  console.log("User ID:", user.id); // Debugging User ID
  console.log("Inserting Blog:", { title, description, user_id: user.id });

  const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, description, user_id: user.id }]);

  if (error) {
    console.error("Error inserting blog:", error);
    return { error: error.message || "Could not add the blog", data: null };
  }

  return { data, error: null };
}

// Fetch blogs from Supabase
export async function fetchBlogs() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("blogs").select();

  if (error) {
    console.error("Error fetching blogs:", error);
    return { error: "Could not fetch the blogs", data: [] };
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

// Get User Session
export async function getUserSession() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null; // If user is not authenticated
  }

  return data.user;
}

// Get Single Blog
export async function fetchSingleBlog(blogId) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", blogId)
    .single(); // Single blog return karega

  if (error) {
    console.error("Error fetching blog:", error);
    return { error: "Could not fetch blog", data: null };
  }

  return { data, error: null };
}

// Update Blog
export async function updateBlog(blogId, updatedTitle, updatedDescription) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("blogs")
    .update({
      title: updatedTitle,
      description: updatedDescription,
    })
    .eq("id", blogId)
    .select();

  if (error) {
    console.error("Error updating blog:", error);
    return { error: "Could not update blog", data: null };
  }

  return { data, error: null };
}
