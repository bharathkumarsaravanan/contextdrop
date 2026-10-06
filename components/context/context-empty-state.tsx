import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContextEmptyState({workspaceId}: {workspaceId: string}) {
  return (
    <Card className="h-full border-zinc-800 bg-zinc-900/40">
      <CardContent className="flex h-full min-h-[300px] flex-col items-center justify-center px-6 text-center">
        <Sparkles className="mb-4 h-10 w-10 text-zinc-500" />

        <h3 className="font-semibold text-zinc-300">No saved contexts yet</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Contexts are generated from your project memories and can be saved for
          reuse across your AI workflow.
        </p>

        <Button asChild className="mt-6">
          <Link href={`/dashboard/workspaces/${workspaceId}/contexts/new`}>
            Create Context
          </Link>
        </Button>

        <p className="mt-4 text-xs text-zinc-600">
          Your saved contexts will appear here.
        </p>
      </CardContent>
    </Card>
  );
}
