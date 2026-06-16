import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function ContextEmptyState() {
  return (
    <Card className='h-full'>
      <CardContent className='flex h-full min-h-[300px] flex-col items-center justify-center text-center'>
        <Sparkles className='mb-4 h-10 w-10 text-muted-foreground' />

        <h3 className='font-semibold text-zinc-300'>Generated Context</h3>

        <p className='mt-2 max-w-sm text-sm text-muted-foreground text-zinc-500'>
          Select memories and generate context. Your AI-ready prompt will appear
          here.
        </p>

        <p className='mt-4 text-xs text-muted-foreground text-zinc-400'>
          Tip: Select 2–3 related memories for best results.
        </p>
      </CardContent>
    </Card>
  );
}
