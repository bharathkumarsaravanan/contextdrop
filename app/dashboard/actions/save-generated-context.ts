"use server";
import { createClient } from "@/lib/supabase/server";

export async function saveGeneratedContext(
    workspaceId: string,
    content: string,
) {
    const supabase = await createClient();
    const {error} = await supabase
      .from("generated_contexts")
      .insert({
        workspace_id: workspaceId,
        name: `Context ${new Date().toLocaleString()}`,
        content
      });

    if (error) {
        return {
            success: false,
            error: error.message
        }
    }

    return {
        success: true
    }
}