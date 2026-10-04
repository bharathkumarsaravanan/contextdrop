import { CreateMemoryBlockDialog } from "./create-memory-block-dialog";

type Props = {
  workspaceId: string;
};

export function MemoryEmptyState({ workspaceId }: Props) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 px-6 text-center">
      <div className="max-w-lg">
        <p className="mt-6 text-xs font-medium uppercase tracking-wider text-primary">
          Project Memory
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Give your AI something to remember
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Store the knowledge your AI needs to understand this project.
          Architecture, requirements, decisions, conventions, and other
          project-specific information can live here.
        </p>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Good memories to start with
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              "Project architecture",
              "Product requirements",
              "Technical decisions",
              "Coding conventions",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <CreateMemoryBlockDialog workspaceId={workspaceId} />
        </div>

        <p className="my-4 text-xs text-zinc-600">
          Add your project knowledge once, then connect your AI through MCP.
        </p>
      </div>
    </div>
  );
}