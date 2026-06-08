import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { ReactNode, useState } from 'react';
import { updateMemory } from '@/app/dashboard/workspaces/[workspaceId]/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MemoryForm } from './memory-form';
import { MemoryBlock } from '@/types/memory-block';

type Props = { children: ReactNode; memoryData: MemoryBlock; };

export function EditMemoryDialog({ children, memoryData }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData:FormData) {
    setLoading(true);
    const result = await updateMemory(memoryData.worspace_id, memoryData.id, formData);
    if (result?.error) {
            toast.error(result.error);
            setLoading(false);
            return;
        };

        toast.success("Memory block created");
        setOpen(false);
        router.refresh();
        setLoading(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur'>
        <DialogHeader>
          <DialogTitle>Update Memory Block</DialogTitle>
        </DialogHeader>

        <MemoryForm
          initialValues={{
            title: memoryData.title,
            content: memoryData.content,
            category: memoryData.category
          }}
          isLoading={loading}
          submitText='Update Memory'
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
