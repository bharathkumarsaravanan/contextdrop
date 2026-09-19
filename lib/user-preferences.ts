import { createClient } from "./supabase/server";

export async function getUserPreferences() {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from("user_preferences")
        .select("user_id, active_mcp_workspace_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Failed to get user preferences:", error);
        return null;
    }

    return data;
}