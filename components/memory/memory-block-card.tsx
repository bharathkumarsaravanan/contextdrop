import { MemoryBlock } from "@/types/memory-block";
import { MemoryActions } from "./memory-actions";
import { Checkbox } from "../ui/checkbox";

type Props = {
  block: MemoryBlock;
  selected: boolean;
  onSelect: (blockId: string, checked: boolean) => void;
};

export function MemoryBlockCard({ block, selected, onSelect }: Props) {
  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        selected
          ? "border-zinc-500 bg-zinc-900"
          : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={selected}
              onCheckedChange={(checked) =>
                onSelect(block.id, Boolean(checked))
              }
            />

            <div className="min-w-0">
              <h2 className="font-semibold text-white">{block.title}</h2>

              <p className="mt-1 text-xs text-zinc-500">{block.category}</p>
            </div>
          </div>

          <p className="line-clamp-6 whitespace-pre-wrap text-sm leading-6 text-zinc-300">
            {block.content}
          </p>
        </div>

        <MemoryActions memoryData={block} />
      </div>
    </div>
  );
}
