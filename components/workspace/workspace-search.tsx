"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Workspace } from "@/types/workspace";
import { WorkspaceCard } from "./workspace-card";
import { Input } from "../ui/input";

type Props = {
  workspaces: Workspace[];
};

export function WorkspaceSearch({ workspaces }: Props) {
  const [query, setQuery] = useState("");

  const filteredWorkspaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return workspaces;
    }

    return workspaces.filter(workspace => {
        const name = workspace.name?.toLowerCase() ?? "";
        const description = workspace.description?.toLowerCase() ?? "";

        return (
            name.includes(normalizedQuery) ||
            description.includes(normalizedQuery)
        )
    });
  }, [query, workspaces]);

  return (
    <div className="space-y-4">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input 
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search workspaces..."
              className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
            />
        </div>

        {filteredWorkspaces.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 px-6 py-12 text-center">
          <p className="text-sm font-medium text-zinc-300">
            No workspaces found
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Try a different search term.
          </p>
        </div>
        ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredWorkspaces.map(workspace => (
                    <WorkspaceCard 
                      key={workspace.id}
                      workspace={workspace}
                    />
                ))}
            </div>
        )}
    </div>
  )
}
