"use server";

import { createServerSupabase } from "../utils/supabase/server";

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