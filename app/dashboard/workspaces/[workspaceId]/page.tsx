import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import { getMemoryBlocks } from "@/lib/memory-blocks";
import { MemoryEmptyState } from "@/components/memory/memory-empty-state";
import { CreateMemoryBlockDialog } from "@/components/memory/create-memory-block-dialog";
import { MemoryBlockList } from "@/components/memory/memory-block-list";
import { WorkspaceNav } from "@/components/workspace/workspace-nav";
import { DemoWorkspaceBanner } from "@/components/onboarding/demo-workspace-banner";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function WorkspacePage({ params, searchParams }: Props) {
  const { workspaceId } = await params;
  const { q } = await searchParams;
  const supabase = await createClient();
  const hasSearch = Boolean(q?.trim());

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId)
    .single();

  if (!workspace) {
    notFound();
  }

  const memoryBlocks = await getMemoryBlocks(workspaceId, q);

  

  return (
    <DashboardShell>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {workspace.name}
              </h1>

              {workspace.is_demo && <Badge variant="secondary">Demo</Badge>}
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              {workspace.description || "Your project's persistent AI memory."}
            </p>

            <div className="mt-5">
              <WorkspaceNav workspaceId={workspaceId} />
            </div>
          </div>

          {(memoryBlocks.data.length !== 0 && !hasSearch)&& (
            <div className="shrink-0">
              <CreateMemoryBlockDialog workspaceId={workspaceId} />
            </div>
          )}
        </div>
        {workspace.is_demo && <DemoWorkspaceBanner />}
        {(memoryBlocks.data.length === 0 && !hasSearch)? (
          <MemoryEmptyState workspaceId={workspaceId} />
        ) : (
          <MemoryBlockList
            key={q ?? ""}
            workspace={workspace}
            blocks={memoryBlocks.data}
            // initialRemainingOptimizations={remainingOptimizations}
            searchQuery={q}
            hasMore={memoryBlocks.hasMore}
            totalMemories={memoryBlocks.total}
          />
        )}
      </div>
    </DashboardShell>
  );
}
