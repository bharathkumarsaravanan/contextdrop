import { ReactNode } from 'react';
import { getWorkspaces } from '@/lib/workspaces';
import { DashboardSidebar } from '@/components/layouts/dashboard-sidebar';

type Props = { children: ReactNode };

export default async function DashboardLayout({ children }: Props) {
  const workspaces = await getWorkspaces();

  return (
    <main className='min-h-screen bg-zinc-950 text-white'>
      <div className='flex'>
        <DashboardSidebar workspaces={workspaces} />

        <div className='min-w-0 flex-1'>
          <div className='mx-auto max-w-6xl p-6'>{children}</div>
        </div>
      </div>
    </main>
  );
}
