import { CreateWorkspaceDialog } from "./create-workspace-dialog";
import { Button } from "../ui/button";
import { Plus } from 'lucide-react';
import { createDemoWorkspace } from "@/lib/demo-seed";

export function EmptyState() {
  return (
    <div className='flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-zinc-800/80 bg-zinc-900/40 text-center shadow-xl shadow-black/20'>
      <h2 className='text-2xl font-semibold tracking-tight'>
        Welcome to ContextDrop
      </h2>

      <p className='mt-3 max-w-sm text-sm leading-6 text-zinc-400'>
        Store reusable context blocks and generate
        perfect AI prompts instantly.
      </p>
      <div className="mt-3">
        <CreateWorkspaceDialog />
      </div>
      <div className="mt-1">
        <Button onClick={createDemoWorkspace} className='h-11 rounded-xl border border-zinc-800/80 bg-zinc-900 px-5 text-white hover:bg-zinc-800/80 mt-5'>
          <Plus className='mr-2 h-4 w-4' />
          Explore Demo Workspace
        </Button>
      </div>
    </div>
  );
}
