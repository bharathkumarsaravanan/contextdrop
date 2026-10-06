import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import { getMemoryBlocks } from "@/lib/memory-blocks";
import { CreateContextBuilder } from "./create-context-builder";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function CreateContextPage({
  params,
  searchParams,
}: Props) {
  const { workspaceId } = await params;
  const { q } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let remainingOptimizations = 10;

  if (user) {
    const { data: usage } = await supabase
      .from("ai_usage")
      .select("optimization_count")
      .eq("user_id", user.id)
      .maybeSingle();

    remainingOptimizations = Math.max(10 - (usage?.optimization_count ?? 0), 0);
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId)
    .single();

  if (!workspace) {
    notFound();
  }

  const memoryResult = await getMemoryBlocks(workspaceId, q);

  return (
    <DashboardShell>
        <CreateContextBuilder 
          key={q ?? ""}
          workspace={workspace}
          workspaceId={workspaceId}
          blocks={memoryResult.data}
          searchQuery={q}
          hasMore={memoryResult.hasMore}
          totalMemories={memoryResult.total}
          initialRemainingOptimizations={remainingOptimizations}
        />
    </DashboardShell>
  );
}
