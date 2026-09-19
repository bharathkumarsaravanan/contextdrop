"use client";

import { useTransition, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { setActiveMcpWorkspace } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

type Workspace = {
  id: string;
  name: string;
};

type Props = {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
};

export function McpProjectSelector({ workspaces, activeWorkspaceId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(activeWorkspaceId);
  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId,
  );
  const router = useRouter();

  function handleSelect(workspaceId: string) {
    if (workspaceId === activeWorkspaceId) {
        setOpen(false);
        return;
    }

    const previousWorkspaceId = selectedWorkspaceId;

    setSelectedWorkspaceId(workspaceId);

    setOpen(false);


    startTransition(async () => {
      const result = await setActiveMcpWorkspace(workspaceId);
      if (result.error) {
        setSelectedWorkspaceId(previousWorkspaceId);
        return;
      }

      router.refresh();
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isPending}
          className="w-full justify-between"
        >
          <span className="truncate">
            {isPending
              ? "Saving..."
              : activeWorkspace?.name ?? "Select a project"}
          </span>

          {isPending ? (
            <Loader2 className="size-4 shrink-0 animate-spin" />
          ) : (
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput
            placeholder="Search projects..."
            className="border-0 bg-transparent text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-0 focus:outline-none focus:ring-0"
          />

          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>

            <CommandGroup>
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.name}
                  onSelect={() => handleSelect(workspace.id)}
                >
                  {workspace.name}

                  <Check
                    className={`ml-auto size-4 ${
                      workspace.id === activeWorkspaceId
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
