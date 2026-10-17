import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";

const MCP_SERVER_URL = "https://mcp.usecontextdrop.com/mcp";

export default function ClaudeMcpPage() {
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
            Claude Setup
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Connect ContextDrop to Claude
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Connect Claude to ContextDrop and give it access to your persistent
            project memory through MCP.
          </p>
        </div>

        {/* Video */}
        <section className="mt-10">
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <p className="text-sm text-zinc-600">
              Claude setup video coming soon
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
                Claude
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
            Open Claude settings
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Open Claude and go to{" "}
            <span className="font-medium text-zinc-300">Settings</span>.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm text-zinc-300">
              Settings → Customize → Connectors
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Open the <span className="text-zinc-300">Connectors</span> section
              under Customize.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 2
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Add a custom connector
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            In the Connectors section, click{" "}
            <span className="font-medium text-zinc-300">Add</span> and select{" "}
            <span className="font-medium text-zinc-300">
              Add a custom connector
            </span>
            .
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm font-medium text-zinc-200">
              Custom connector details
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Name
                </p>

                <code className="mt-2 block rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                  ContextDrop
                </code>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  MCP Server URL
                </p>

                <code className="mt-2 block break-all rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                  {MCP_SERVER_URL}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 3
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Continue the connection
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            After entering the ContextDrop details, click{" "}
            <span className="font-medium text-zinc-300">Continue</span>.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-400" />

              <p className="text-sm font-medium text-zinc-200">
                ContextDrop connector added
              </p>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Claude will add ContextDrop to your connectors and begin the
              authentication process if authentication is required.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 4
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Authenticate with ContextDrop
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            On your first connection, ContextDrop will require authentication.
            Follow the authentication prompt and complete the ContextDrop OAuth
            flow.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-zinc-300">
                Authentication required
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-500">
              Sign in to ContextDrop and authorize Claude to access your
              ContextDrop workspace through MCP.
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 5
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Confirm the connection
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            After authentication is complete, Claude will be connected to
            ContextDrop and can use its available MCP tools.
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
                  Claude can now access your ContextDrop project memory through
                  MCP.
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
            You can confirm that Claude has been authorized from your
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
              Your Claude connection will appear in the list of authorized MCP
              clients.
            </p>
          </div>
        </section>

        {/* Memory Instructions */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 6
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Configure Claude for autonomous memory
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            ContextDrop can automatically preserve durable project knowledge
            from your conversations. Add the following instruction to {"Claude's"}
            project instructions or custom instructions.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Recommended instruction
            </p>

            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm leading-6 text-zinc-300">
              {`When working on this project, use ContextDrop as the persistent memory layer.

During normal conversations, recognize durable project-specific knowledge and proactively preserve it in ContextDrop without waiting for me to explicitly ask you to save it.

Use ContextDrop memory when you need existing project context, decisions, requirements, constraints, conventions, preferences, workflows, or other durable project knowledge.

When new durable knowledge is established:
- Use save_memory when it should be added to project memory.
- Search existing memory first when related knowledge may already exist.
- If an existing memory has materially changed, use update_memory instead of creating a duplicate.
- Ignore information that is temporary, speculative, casual, generic programming knowledge, one-off questions, temporary debugging details, intermediate reasoning, or short-lived tasks.
- Never store secrets or credentials such as API keys, access tokens, refresh tokens, session cookies, database credentials, or signing/encryption keys.
- Avoid creating duplicate memories.
- Use the appropriate ContextDrop category and memory type.
- Continue answering my actual request normally after managing memory.
- Never claim that something was saved unless the ContextDrop tool call succeeds.

ContextDrop owns persistent memory. Do not create a separate memory document or maintain a separate memory system.

### Conversational Continuity

Memory operations should remain unobtrusive and must not interrupt the user's workflow.

When durable project knowledge is established:
- Search existing memories and save or update knowledge when appropriate.
- Continue the user's original task immediately after a successful operation.
- Do not announce routine memory searches or successful saves.
- Do not explain the memory-management process unless the user asks.
- Do not ask unrelated follow-up questions merely because a memory was saved.
- Never claim a save or update succeeded unless the tool confirms success.

Mention memory operations only when the user asks, when clarification is necessary, or when a meaningful conflict, failure, or important decision requires the user's attention.`}
            </pre>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
            <p className="text-sm font-medium text-zinc-200">
              Why this matters
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Claude decides what is worth remembering from the conversation,
              while ContextDrop handles persistent storage, duplicate detection,
              and updating existing project knowledge.
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
                ContextDrop uses OAuth to authorize Claude. You authenticate
                through ContextDrop without sharing your ContextDrop password
                with Claude.
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
