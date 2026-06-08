'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { workspaceId: string };

export function WorkspaceNav({ workspaceId }: Props) {
  const pathname = usePathname();
  const memoriesPath = `/dashboard/workspaces/${workspaceId}`;

  const contextsPath = `/dashboard/workspaces/${workspaceId}/contexts`;

  return (
    <div className='flex items-center gap-6 border-b border-zinc-800 pb-4 mt-5'>
      <Link
        href={memoriesPath}
        className={
          pathname === memoriesPath
            ? 'text-white font-medium'
            : 'text-zinc-500 hover:text-white'
        }>
        Memories
      </Link>
      <Link
        href={contextsPath}
        className={
          pathname === contextsPath
            ? 'text-white font-medium'
            : 'text-zinc-500 hover:text-white'
        }>
        Contexts
      </Link>
    </div>
  );
}
