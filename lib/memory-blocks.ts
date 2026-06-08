import { createClient } from "./supabase/server";

export async function getMemoryBlocks(workspaceId:string) {
    const supabase = await createClient();

    const{ data, error } = await supabase
      .from("memory_blocks")
      .select("*")
      .eq("workspace_id", workspaceId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
        console.error(error.message);
        return [];
    }

    return data;
}