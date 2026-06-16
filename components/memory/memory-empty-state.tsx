import { CreateMemoryBlockDialog } from "./create-memory-block-dialog";

type Props = {
  workspaceId: string
}

export function MemoryEmptyState({
  workspaceId
}: Props) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 text-center">
      <h2 className="text-lg font-semibold">
        No memories yet
      </h2>

      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Memories are reusable chunks of information
        you'll later combine into AI-ready context.
      </p>
      
      <ul className="mt-4 list-disc">
        <p className="my-2 max-w-sm text-sm text-zinc-400 font-bold text-left">
        Examples:
      </p>
        <li className="text-sm text-zinc-500 text-left list-disc list-inside">Product requirements</li>
        <li className="text-sm text-zinc-500 text-left list-disc list-inside">User personas</li>
        <li className="text-sm text-zinc-500 text-left list-disc list-inside">Coding conventions</li>
        <li className="text-sm text-zinc-500 text-left list-disc list-inside">Meeting notes</li>
      </ul>
      <div className="mt-8">
        <CreateMemoryBlockDialog workspaceId={workspaceId} />
      </div>
    </div>
  );
}