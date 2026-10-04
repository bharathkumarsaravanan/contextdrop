"use client";
import Link from "next/link";
import { Workspace } from "@/types/workspace";
import { usePathname } from "next/navigation";
import { Settings, LayoutGrid } from "lucide-react";

type Props = { workspaces: Workspace[], recentlyUsedWorkspaces: Workspace[] };

export function DashboardSidebar({ workspaces, recentlyUsedWorkspaces }: Props) {
  const pathname = usePathname();
  return (
    <aside className="hidden w-72 shrink-0 border-r border-zinc-800 lg:block">
      <div className="sticky top-0 h-screen p-5 flex flex-col">
        <div className="mb-8">
          <Link href={"/dashboard"} className="text-xl font-bold">
            ContextDrop
          </Link>
          <p className="mt-1 text-sm text-zinc-500">
            {workspaces.length} workspace
            {workspaces.length !== 1 && "s"}
          </p>
        </div>
        <div className="flex-1">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                pathname === "/dashboard"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Workspaces
            </Link>

            <div className="ml-2 space-y-1 pt-1">
              {recentlyUsedWorkspaces.map((workspace) => (
                <Link
                  key={workspace.id}
                  href={`/dashboard/workspaces/${workspace.id}`}
                  className={`
              block rounded-xl px-3 py-2 text-sm transition
              ${
                pathname.includes(workspace.id)
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }
              `}
                >
                  {workspace.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-4">
          <Link
            href="/dashboard/config"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
              pathname.includes("/config")
                ? "bg-zinc-900 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
}
