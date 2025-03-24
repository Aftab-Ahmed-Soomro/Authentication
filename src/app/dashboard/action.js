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
