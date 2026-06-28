import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog';
import { ReactNode, useState } from 'react';
import { deleteMemory } from '@/app/dashboard/workspaces/[workspaceId]/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = { children: ReactNode; memoryId: string; workspaceId: string };

export function DeleteMemoryDialog({ children, memoryId, workspaceId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const result = await deleteMemory(workspaceId, memoryId);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);

      return;
    }

    toast.success('Memory block deleted');
    router.refresh();
    setLoading(false);
  }
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className='border border-zinc-800/80 bg-zinc-900 text-white shadow-2xl shadow-black/40 backdrop-blur-sm'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl font-semibold tracking-tight'>
            Delete Memory?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-sm leading-6 text-zinc-400'>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='mt-6 flex justify-end gap-3 border-t border-zinc-800 pt-5'>
          <AlertDialogCancel className='rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className='rounded-xl bg-red-500 text-white hover:bg-red-400'>
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
