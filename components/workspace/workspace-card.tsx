import Link from 'next/link';
import { Workspace } from '@/types/workspace';
import { WorkspaceActions } from './workspace-actions';

type Props = { workspace: Workspace };

export function WorkspaceCard({ workspace }: Props) {
  return (
    <div className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900'>
      <div className='flex items-start justify-between gap-4'>
        <Link
          href={`/dashboard/workspaces/${workspace.id}`}
          prefetch={true}
          className='flex-1 space-y-3'>
          <div className='space-y-3'>
            <div>
              <h2 className='font-semibold text-lg text-white'>
                {workspace.name}
              </h2>
              <p className='font-semibold line-clamp-2 text-sm text-zinc-500'>
                {workspace.description || 'No description'}
              </p>
            </div>
            <div className='text-xs text-zinc-600'>Open workspace →</div>
          </div>
        </Link>
        <WorkspaceActions workspaceId={workspace.id} />
      </div>
    </div>
  );
}
