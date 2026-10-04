import Link from "next/link";
import { getGeneratedContexts } from "@/lib/generated-contexts";
import { GeneratedContextList } from "@/components/context/generated-context-list";
import { WorkspaceNav } from "@/components/workspace/workspace-nav";
import { ContextEmptyState } from "@/components/context/context-empty-state";

type Props = { params: Promise<{ workspaceId: string }> };

export const metadata = {
  title: "Saved Context",
};

export default async function ContextsPage({ params }: Props) {
  const { workspaceId } = await params;
  const generatedContexts = await getGeneratedContexts(workspaceId);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Project Context
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Saved Contexts
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          Manage context generated from your project memories.
        </p>

        <WorkspaceNav workspaceId={workspaceId} />
      </div>

      <div className="space-y-4">
        {generatedContexts.length === 0 ? (
          <ContextEmptyState />
        ) : (
          <GeneratedContextList contexts={generatedContexts} />
        )}
      </div>
    </div>
  );
}
