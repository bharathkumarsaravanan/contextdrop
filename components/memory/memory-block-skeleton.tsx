import { Skeleton } from "@/components/ui/skeleton";

export function MemoryBlockSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-4 w-4 rounded" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[90%]" />
          <Skeleton className="h-3 w-[75%]" />
        </div>
      </div>
    </div>
  );
}