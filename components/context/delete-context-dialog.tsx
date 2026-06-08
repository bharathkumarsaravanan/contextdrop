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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteGeneratedContext } from '@/app/dashboard/actions/delete-generated-context';

type Props = { children: ReactNode; contextId: string; workspaceId: string };

export function DeleteContextDialog({ children, contextId, workspaceId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const result = await deleteGeneratedContext(workspaceId, contextId);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);

      return;
    }

    toast.success('Context block deleted');
    router.refresh();
    setLoading(false);
  }
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className='border border-zinc-800/80 bg-zinc-900 text-white shadow-2xl shadow-black/40 backdrop-blur-sm'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl font-semibold tracking-tight'>
            Delete Context?
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
