import Link from "next/link";
import { getGeneratedContexts } from "@/lib/generated-contexts";
import { GeneratedContextList } from "@/components/context/generated-context-list";
import { WorkspaceNav } from "@/components/workspace/workspace-nav";
import { ContextEmptyState } from "@/components/context/context-empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <div className="flex items-end justify-between gap-6">
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
          </div>

          <Button asChild>
            <Link href={`/dashboard/workspaces/${workspaceId}/contexts/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Create Context
            </Link>
          </Button>
        </div>

        <WorkspaceNav workspaceId={workspaceId} />
      </div>

      <div className="space-y-4">
        {generatedContexts.length === 0 ? (
          <ContextEmptyState workspaceId={workspaceId} />
        ) : (
          <GeneratedContextList contexts={generatedContexts} />
        )}
      </div>
    </div>
  );
}
