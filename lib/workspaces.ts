import { createClient } from "./supabase/server";

export async function getWorkspaces() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}