"use server";

import { createClient } from "@/lib/supabase/server";

export async function setActiveMcpWorkspace(workspaceId: string) {
    const supabase = await createClient();

    const {
        data: {user}
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const { data: workspace } = await supabase
      .from("workspaces")
      .select("*")
      .eq("id", workspaceId)
      .eq("user_id", user.id)
      .maybeSingle()

    if (!workspace) {
        return { error: "Workspace not found." }
    }

    const { error } = await supabase 
      .from("user_preferences")
      .upsert(
        {
            user_id: user.id,
            active_mcp_workspace_id: workspaceId,
            updated_at: new Date().toISOString(),
        },
        {
            onConflict: "user_id"
        }
      )

    if (error) {
        return { error: "Unable to update active project." }
    }

    return {
        success: true
    }
}