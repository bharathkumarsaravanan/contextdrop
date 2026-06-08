import { MemoryBlock } from '@/types/memory-block';
import { MemoryActions } from './memory-actions';
import { Checkbox } from '../ui/checkbox';

type Props = {
  block: MemoryBlock;
  selected: boolean;
  onSelect: (blockId: string, checked: boolean) => void;
};

export function MemoryBlockCard({ block, selected, onSelect }: Props) {
  return (
    <div className={`rounded-2xl border transition p-5 transition hover:border-zinc-700 ${selected ? "border-zinc-500 bg-zinc-900" : "border-zinc-800 bg-zinc-900/50"}`}>
      <div className='flex items-start justify-between gap-4'>
        <div className='space-y-4'>
          <div className='flex items-start justify-between gap-4'>
            <Checkbox
              checked={selected}
              onCheckedChange={(checked) =>
                onSelect(block.id, Boolean(checked))
              }
            />
            <div className='flex-1'>
              <h2 className='font-semibold text-white'>{block.title}</h2>
              <p className='mt-1 text-xs text-zinc-500'>{block.category}</p>
            </div>
          </div>
          <p className='line-clamp-6 whitespace-pre-wrap text-sm text-zinc-300'>
            {block.content}
          </p>
        </div>
        <MemoryActions memoryData={block} />
      </div>
    </div>
  );
}
