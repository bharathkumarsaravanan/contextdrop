import Link from "next/link";
import { ArrowLeft, Check, Info, ShieldCheck } from "lucide-react";

import { CopyContextButton } from "@/components/shared/copy-button";

const MCP_SERVER_URL = "https://mcp.usecontextdrop.com/mcp";

export default function McpDocsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ContextDrop
          </Link>

          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              MCP Setup Guide
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Connect an MCP Client
            </h1>

            <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
              Connect ContextDrop to any MCP-compatible AI tool and give it
              secure access to your project memory.
            </p>
          </div>
        </div>

        {/* Server URL */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div>
            <p className="text-sm font-medium text-zinc-200">
              ContextDrop MCP Server
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Use this URL when adding ContextDrop to your AI {"client's"} MCP
              settings.
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <div className="flex min-w-0 flex-1 items-center rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <code className="truncate text-sm text-zinc-300">
                {MCP_SERVER_URL}
              </code>
            </div>

            <CopyContextButton
              title="MCP Server URL"
              content={MCP_SERVER_URL}
            />
          </div>
        </section>

        {/* How to connect */}
        <section className="mt-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Getting Started
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              How to connect
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              The exact location of MCP settings depends on the AI client you
              use, but the connection flow is the same.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <Step
              number="1"
              title="Copy the MCP server URL"
              description="Copy the ContextDrop MCP server URL shown above."
            />

            <Step
              number="2"
              title="Add ContextDrop to your AI client"
              description="Open your AI client's MCP settings and add the ContextDrop server URL."
            />

            <Step
              number="3"
              title="Complete authentication"
              description="Your AI client will start the ContextDrop authentication flow. Sign in and authorize access when prompted."
            />

            <Step
              number="4"
              title="Start using your project memory"
              description="Once connected, your AI client can access the memories available to your active workspace through MCP."
            />
          </div>
        </section>

        {/* What happens after connecting */}
        <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-zinc-800 p-2">
              <Info className="h-5 w-5 text-zinc-300" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                What happens after connecting?
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                ContextDrop becomes the persistent memory layer for your AI
                workflow. Your connected MCP client can retrieve and work with
                the memories available to your active ContextDrop workspace.
              </p>
            </div>
          </div>
        </section>

        {/* Verify connection */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Verify
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Verify your connection
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            After completing the authentication flow, you can verify that the
            MCP client has been authorized from your ContextDrop dashboard.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
              <Check className="h-4 w-4 text-green-400" />
              Settings → MCP & Integrations → Authorized Clients
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Your authorized MCP clients will appear there once the connection
              has been completed.
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
                Your connection is authorized securely
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                ContextDrop uses OAuth authentication for MCP connections.
                Access is authorized through your ContextDrop account and
                existing workspace permissions.
              </p>
            </div>
          </div>
        </section>

        {/* Video placeholder */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Setup Guides
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Choose your MCP client
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Follow the setup guide for the AI tool you want to connect to
            ContextDrop.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ClientGuideCard
              name="Cursor"
              description="Connect ContextDrop to Cursor and give it access to your project memory."
              href="/docs/mcp/cursor"
            />

            <ClientGuideCard
              name="Claude"
              description="Connect ContextDrop to Claude and give it access to your project memory."
              href="/docs/mcp/claude"
            />
          </div>

          <div className="mt-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-5">
            <p className="text-sm font-medium text-zinc-300">
              Using another MCP client?
            </p>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              You can use the same ContextDrop MCP server URL with any
              MCP-compatible client.
            </p>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="mt-16 border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-500">Already connected?</p>

          <Link
            href="/dashboard/config"
            className="mt-2 inline-flex text-sm font-medium text-primary transition hover:underline"
          >
            Open MCP & Integrations settings →
          </Link>
        </div>
      </div>
    </main>
  );
}

type StepProps = {
  number: string;
  title: string;
  description: string;
};

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-300">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>

        <p className="mt-1.5 text-sm leading-6 text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function ClientGuideCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/60"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-200">{name}</h3>

        <span className="text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-300">
          →
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>

      <p className="mt-4 text-sm font-medium text-primary">
        View setup guide →
      </p>
    </Link>
  );
}
