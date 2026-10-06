import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function McpEmptyState() {
  return (
    <Card className="h-full border-zinc-800 bg-zinc-900/40">
      <CardContent className="flex h-full min-h-[300px] flex-col items-center justify-center px-6 text-center">
        <Sparkles className="mb-4 h-10 w-10 text-zinc-500" />

        <h3 className="font-semibold text-zinc-300">No AI clients connected yet</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Connect an MCP-compatible AI tool to get started.
        </p>
      </CardContent>
    </Card>
  );
}
