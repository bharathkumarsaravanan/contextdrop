'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createWorkspace } from '@/app/dashboard/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

export function CreateWorkspaceDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createWorkspace(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);

      return;
    }

    toast.success('Workspace created!');
    setOpen(false);
    router.refresh();
    setLoading(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='h-11 rounded-xl border border-zinc-800/80 bg-zinc-900 px-5 text-white hover:bg-zinc-800/80 mt-5'>
          <Plus className='mr-2 h-4 w-4' />
          New Workspace
        </Button>
      </DialogTrigger>

      <DialogContent className='border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur'>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>

        <form
          action={handleSubmit}
          className='space-y-4'>
          <Input
            name='name'
            placeholder='Workspace name'
            className='h-12 rounded-xl border-zinc-800 bg-zinc-950 focus-visible:ring-1 focus-visible:ring-zinc-500'
          />

          <Textarea
            name='description'
            placeholder='Short description'
            className='min-h-[120px] rounded-xl border-zinc-800 bg-zinc-950 focus-visible:ring-1 focus-visible:ring-zinc-500'
          />

          <Button
            type='submit'
            className='h-11 w-full rounded-xl bg-zinc-100 text-black hover:bg-white'
            disabled={loading}>
            {loading ? 'Creating...' : 'Create Workspace'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
