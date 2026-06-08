import { createClient } from "./supabase/server";

export async function getGeneratedContexts(workspaceId:string) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("generated_contexts")
      .select("*")
      .eq("workspace_id", workspaceId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
        console.error(error);
        return [];
    };

    return data;
}