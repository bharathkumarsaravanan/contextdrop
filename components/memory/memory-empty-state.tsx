export function MemoryEmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 text-center">
      <h2 className="text-lg font-semibold">
        No memory blocks yet
      </h2>

      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Save reusable AI context, coding
        rules, startup knowledge, prompts,
        and workflow memory here.
      </p>
    </div>
  );
}