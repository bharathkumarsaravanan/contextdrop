export function EmptyState() {
  return (
    <div className='flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-zinc-800/80 bg-zinc-900/40 text-center shadow-xl shadow-black/20'>
      <h2 className='text-2xl font-semibold tracking-tight'>
        No workspaces yet
      </h2>

      <p className='mt-3 max-w-sm text-sm leading-6 text-zinc-400'>
        Create your first workspace to
        organize reusable AI memory,
        prompts, and project context.
      </p>
    </div>
  );
}
