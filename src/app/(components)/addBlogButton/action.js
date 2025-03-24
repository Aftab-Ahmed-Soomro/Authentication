"use server";

import { getUserSession } from "@/app/dashboard/action";
import { createServerSupabase } from "@/app/utils/supabase/server";

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
    console.error("Error inserting blog:", error); // Detailed error logging
    return { error: error.message || "Could not add the blog", data: null };
  }

  return { data, error: null };
}
