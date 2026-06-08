import Link from 'next/link';
import { getGeneratedContexts } from '@/lib/generated-contexts';
import { GeneratedContextList } from '@/components/context/generated-context-list';
import { WorkspaceNav } from '@/components/workspace/workspace-nav';

type Props = { params: Promise<{ workspaceId: string }> };

export default async function ContextsPage({ params }: Props) {
  const { workspaceId } = await params;
  const generatedContexts = await getGeneratedContexts(workspaceId);
  

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <div>
            <h1 className='text-2xl font-bold'>Saved Contexts</h1>
            <p className='text-zinc-500'>Worspace: {workspaceId}</p>
            <WorkspaceNav workspaceId={workspaceId} />
        </div>
        <Link
          href={`/dashboard/workspaces/${workspaceId}`}
          className='text-sm text-zinc-400 hover:text-white'>
          ← Back to Workspace
        </Link>
      </div>
      <div className='mt-12 space-y-4'>
          {generatedContexts.length === 0 ? (
            <p className='text-sm text-zinc-500'>No saved contexts yet.</p>
          ) : (
            <GeneratedContextList contexts={generatedContexts} />
          )}
        </div>
    </div>
  );
}
