import Link from "next/link";
import { Workspace } from "@/types/workspace";
import { WorkspaceActions } from "./workspace-actions";
import { ArrowUpRight } from "lucide-react";

type Props = { workspace: Workspace };

export function WorkspaceCard({ workspace }: Props) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <Link
          href={`/dashboard/workspaces/${workspace.id}`}
          prefetch={true}
          className="flex-1 min-w-0"
        >
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">
                {workspace.name}
              </h2>
              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-zinc-500">
                {workspace.description || "No description"}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors group-hover:text-white">
              Open workspace
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </Link>
        <WorkspaceActions workspaceId={workspace.id} />
      </div>
    </div>
  );
}
