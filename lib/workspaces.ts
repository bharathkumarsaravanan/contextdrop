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

export async function getRecentlyUsedWorkspaces() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("memory_blocks")
    .select("workspace_id, updated_at")
    .order("updated_at", {
      ascending: false
    })
    .limit(50);

  if (error) {
    console.error(error);
    return [];
  }

  const workspaceIds = [...new Set(data.map(memory => memory.workspace_id))].slice(0, 6);

  if (workspaceIds.length === 0) {
    return [];
  }

  const { data: workspaces, error: workspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .in("id", workspaceIds);

  if (workspaceError) {
    console.error(workspaceError);
    return [];
  }

  // Preserve the recent-memory order.
  const workspaceMap = new Map(
    workspaces.map(workspace => [workspace.id, workspace])
  );

  return workspaceIds
   .map(id => workspaceMap.get(id))
   .filter(Boolean)
}