"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { workspaceId: string };

export function WorkspaceNav({ workspaceId }: Props) {
  const pathname = usePathname();

  const memoriesPath = `/dashboard/workspaces/${workspaceId}`;
  const contextsPath = `/dashboard/workspaces/${workspaceId}/contexts`;

  return (
    <nav className="mt-6 flex items-center gap-6 border-b border-zinc-800">
      <Link
        href={memoriesPath}
        className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
          pathname === memoriesPath
            ? "border-white text-white"
            : "border-transparent text-zinc-500 hover:text-zinc-300"
        }`}
      >
        Memories
      </Link>

      <Link
        href={contextsPath}
        className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
          pathname === contextsPath
            ? "border-white text-white"
            : "border-transparent text-zinc-500 hover:text-zinc-300"
        }`}
      >
        Contexts
      </Link>
    </nav>
  );
}
