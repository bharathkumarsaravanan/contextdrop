import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";

const MCP_SERVER_URL = "https://mcp.usecontextdrop.com/mcp";

export default function CursorMcpPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        {/* Back */}
        <Link
          href="/docs/mcp"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to MCP setup
        </Link>

        {/* Header */}
        <div className="mt-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Cursor Setup
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Connect ContextDrop to Cursor
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Connect Cursor to ContextDrop and give it access to your persistent
            project memory through MCP.
          </p>
        </div>

        {/* Video */}
        <section className="mt-10">
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <p className="text-sm text-zinc-600">
              Cursor setup video coming soon
            </p>
          </div>
        </section>

        {/* Before you start */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Before you start
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            What you need
          </h2>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />A
                ContextDrop account
              </li>

              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                Cursor installed
              </li>
            </ul>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 1
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Create the MCP configuration
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            In the root of your Cursor project, create a{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
              .cursor/mcp.json
            </code>{" "}
            file.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-3">
              <p className="text-xs font-medium text-zinc-500">
                .cursor/mcp.json
              </p>
            </div>

            <pre className="overflow-x-auto p-5 text-sm leading-6 text-zinc-300">
              <code>{`{
  "mcpServers": {
    "contextdrop": {
      "url": "${MCP_SERVER_URL}"
    }
  }
}`}</code>
            </pre>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 2
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Open {"Cursor's"} MCP settings
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            After saving the configuration, open {"Cursor's"} MCP settings.
            ContextDrop will appear in your connected MCP servers.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm font-medium text-zinc-300">ContextDrop</p>

            <p className="mt-1 text-sm text-zinc-500">
              Your ContextDrop MCP server will appear in the MCP list.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 3
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Authenticate with ContextDrop
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            On your first connection, Cursor will show that ContextDrop requires
            authentication.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-zinc-300">
                Authentication required
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-500">
              Click the authentication option and complete the ContextDrop OAuth
              flow in your browser. Sign in to ContextDrop and authorize the
              connection when prompted.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 4
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Confirm the connection
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Once authentication is complete, Cursor reconnects to ContextDrop
            and the MCP server becomes available.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-4 w-4 text-green-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-200">
                  ContextDrop connected
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Your ContextDrop MCP tools are now available in Cursor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verify */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Verify
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Verify the connection in ContextDrop
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            You can also confirm that Cursor has been authorized from your
            ContextDrop dashboard.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-400" />

              <p className="text-sm font-medium text-zinc-200">
                Settings → MCP & Integrations → Authorized Clients
              </p>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Your Cursor connection will appear in the list of authorized MCP
              clients.
            </p>
          </div>
        </section>

        {/* Security */}
        <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-zinc-800 p-2">
              <ShieldCheck className="h-5 w-5 text-zinc-300" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Secure OAuth authentication
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                ContextDrop uses OAuth to authorize Cursor. You authenticate
                through ContextDrop without sharing your ContextDrop password
                with Cursor.
              </p>
            </div>
          </div>
        </section>

        {/* Back */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <Link
            href="/docs/mcp"
            className="text-sm font-medium text-primary transition hover:underline"
          >
            ← Back to MCP setup
          </Link>
        </div>
      </div>
    </main>
  );
}
