import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyContextButton } from "@/components/shared/copy-button";
import { ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MCP_SERVER_URL = "https://mcp.usecontextdrop.com/mcp";

export function McpClientConnection() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Connect an MCP Client</CardTitle>

        <p className="text-sm text-muted-foreground">
          Connect ContextDrop to any MCP-compatible AI tool and give it access
          to your project memory.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">How to connect</p>

              <ol className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>1. Copy the ContextDrop MCP server URL.</li>
                <li>2. Add it to your AI {"client's"} MCP settings.</li>
                <li>3. Complete the ContextDrop authentication flow.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">MCP Server URL</p>

          <div className="flex gap-2">
            <div className="flex min-w-0 flex-1 items-center rounded-md border bg-muted/30 px-3">
              <code className="truncate text-sm text-muted-foreground">
                {MCP_SERVER_URL}
              </code>
            </div>

            <CopyContextButton
              title="MCP Server URL"
              content={MCP_SERVER_URL}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border border-dashed p-4">
          <div>
            <p className="text-sm font-medium">Need help connecting?</p>

            <p className="mt-1 text-sm text-muted-foreground">
              View setup instructions for your MCP client.
            </p>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/docs/mcp">
              Setup Guide
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
