import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { GeneratedContext } from '@/types/generated-context';
import { CopyIcon, CopyCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = { context: GeneratedContext | null; children: React.ReactElement };

export function ViewContextDialog({ context, children }: Props) {
  const [copied, setCopied] = useState(false);
  if (!context) return null;

  async function handleCopy() {
    if (!context?.content) {
      return;
    }

    try {
      await navigator.clipboard.writeText(context.content);
      setCopied(true);
      toast.success('Context copied to clipboard');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error('Failed to copy context');
    }
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur max-w-3xl'>
        <DialogHeader className='border-b border-zinc-700 pb-4'>
          <DialogTitle>{context.name}</DialogTitle>
        </DialogHeader>
        <div className='relative'>
            {
                copied ? (
                    <CopyCheckIcon className='absolute right-3 top-0' size='15' color='#71717a' />
                ) : (
                    <CopyIcon onClick={handleCopy} className='absolute right-3 top-0 cursor-pointer' size='15' color='#71717a' />
                )
            }
          <pre className='max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm'>
            {context.content}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
