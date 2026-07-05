import { notFound } from 'next/navigation';
import { DashboardShell } from '@/components/layouts/dashboard-shell';
import { createClient } from '@/lib/supabase/server';
import { getMemoryBlocks } from '@/lib/memory-blocks';
import { MemoryEmptyState } from '@/components/memory/memory-empty-state';
import { CreateMemoryBlockDialog } from '@/components/memory/create-memory-block-dialog';
import { MemoryBlockList } from '@/components/memory/memory-block-list';
import { WorkspaceNav } from '@/components/workspace/workspace-nav';
import { DemoWorkspaceBanner } from '@/components/onboarding/demo-workspace-banner';
import { Badge } from '@/components/ui/badge';

type Props = { params: Promise<{ workspaceId: string }> };

export default async function WorkspacePage({ params }: Props) {
  const { workspaceId } = await params;
  const supabase = await createClient();

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', workspaceId)
    .single();

  if (!workspace) {
    notFound();
  }

  const memoryBlocks = await getMemoryBlocks(workspaceId);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  let remainingOptimizations = 10;

  if (user) {
    const { data: usage } = await supabase
      .from("ai_usage")
      .select("optimization_count")
      .eq("user_id", user.id)
      .maybeSingle();

    remainingOptimizations = Math.max(
      10 - (usage?.optimization_count ?? 0),
      0
    );
  } 

  return (
    <DashboardShell>
      <div className='space-y-3'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2'>
              <div className='text-3xl font-bold'>{workspace.name}</div>
              {workspace.is_demo && (
                <Badge variant="secondary">
                  Demo
                </Badge>
              )}
            </div>
            <p className='max-w-2xl text-zinc-500'>{workspace.description}</p>
            <WorkspaceNav workspaceId={workspaceId} />
          </div>
          {memoryBlocks.length !== 0 && <CreateMemoryBlockDialog workspaceId={workspaceId} />}
        </div>
        {workspace.is_demo && (
          <DemoWorkspaceBanner />
        )}
        {memoryBlocks.length === 0 ? (
          <MemoryEmptyState workspaceId={workspaceId} />
        ) : (
          <MemoryBlockList
            workspace={workspace}
            blocks={memoryBlocks}
            initialRemainingOptimizations={remainingOptimizations}
          />
        )}
      </div>
    </DashboardShell>
  );
}
