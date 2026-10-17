import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";

const MCP_SERVER_URL = "https://mcp.usecontextdrop.com/mcp";

const CHATGPT_INSTRUCTIONS = `Use ContextDrop as the persistent memory layer for project-specific work.

Retrieval:
- At the start of project-specific tasks, search ContextDrop for relevant memories.
- Treat retrieved memories as supporting context and check for conflicts.
- If nothing relevant is found, continue normally.

Memory maintenance:
- Identify durable knowledge such as architecture, decisions, conventions, requirements, and technical discoveries.
- Search existing memories before saving to avoid duplicates.
- Save new durable knowledge and update existing memories when established knowledge changes.
- Ignore temporary debugging details, speculation, secrets, and irrelevant information.
- Never claim a save or update succeeded unless the tool confirms it.

Conversational continuity:
- Keep memory operations unobtrusive.
- Continue the user's original task immediately after a successful operation.
- Do not announce routine searches or successful saves.
- Explain memory operations only when asked or when a meaningful conflict, failure, or clarification requires attention.

Security:
- Use only the authenticated user's authorized ContextDrop workspace.
- Never attempt to access another user's or workspace's memories.`;

export default function ChatGPTMcpPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
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
            ChatGPT Setup
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Connect ContextDrop to ChatGPT
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Connect ChatGPT to ContextDrop through MCP and access persistent
            project knowledge shared across your AI clients.
          </p>
        </div>

        {/* Compatibility note */}
        <section className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <p className="text-sm leading-6 text-zinc-400">
            Custom MCP server availability and supported capabilities depend on
            your ChatGPT plan and account settings. The interface may differ
            from the screenshots in this guide.
          </p>
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
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                A ContextDrop account
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                Access to custom MCP server connections in ChatGPT
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                A project with memories in ContextDrop
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
            Open ChatGPT Plugins
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Open {"ChatGPT's"} Plugins page. Click the{" "}
            <strong className="text-zinc-300">Add</strong> button and select{" "}
            <strong className="text-zinc-300">
              Add custom MCP server
            </strong>
            .
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            If the option {"isn't"} available, check whether your account supports
            custom MCP connections.
          </p>

          <a
            href="https://chatgpt.com/plugins"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900"
          >
            Open ChatGPT Plugins ↗
          </a>
        </section>

        {/* Step 2 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 2
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Configure the connection
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Enter the following details in the Add custom MCP server form.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
            <div className="grid gap-4 p-5 sm:grid-cols-[140px_1fr]">
              <p className="text-sm text-zinc-500">Name</p>
              <p className="text-sm font-medium text-zinc-200">ContextDrop</p>

              <p className="text-sm text-zinc-500">Description</p>
              <p className="text-sm leading-6 text-zinc-300">
                Persistent project memory shared across AI clients. Retrieve,
                search, save, and update project knowledge.
              </p>

              <p className="text-sm text-zinc-500">Connection</p>
              <p className="text-sm text-zinc-300">Server URL</p>

              <p className="text-sm text-zinc-500">Server URL</p>
              <code className="break-all text-sm text-zinc-300">
                {MCP_SERVER_URL}
              </code>

              <p className="text-sm text-zinc-500">Authentication</p>
              <p className="text-sm text-zinc-300">OAuth</p>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 3
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Configure OAuth
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Select OAuth as the authentication method and expand Advanced OAuth
            settings. ChatGPT should discover {"ContextDrop's"} OAuth endpoints
            automatically.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm font-medium text-zinc-200">
              Select User-Defined OAuth Client
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              In our tested setup, Dynamic Client Registration (DCR) was
              selected by default, but ChatGPT reported that the server did not
              advertise CIMD support. We selected User-Defined OAuth Client
              instead.
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Leave the discovered OAuth endpoints unchanged. Review the
              available scopes and settings, acknowledge the custom-server
              warning if you trust the server, and click{" "}
              <strong className="text-zinc-300">Create as a plugin</strong>.
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
            After creating the plugin, ChatGPT displays a connection prompt.
            Click Connect ContextDrop to open the OAuth flow.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <ol className="space-y-3 text-sm leading-6 text-zinc-400">
              <li>1. Click Connect ContextDrop.</li>
              <li>2. Sign in to your ContextDrop account.</li>
              <li>3. Authorize ChatGPT when prompted.</li>
              <li>
                4. Confirm the connection completes successfully.
              </li>
            </ol>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 5
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Select a project and configure instructions
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            In ContextDrop, open Settings → MCP &amp; Integrations and select
            the project you want to use as your active MCP workspace.
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            To encourage autonomous memory retrieval and capture, you can also
            add ContextDrop instructions in {"ChatGPT's"} Custom Instructions.
            This is optional for basic MCP connectivity and retrieval.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Recommended instructions
              </p>
            </div>

            <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs leading-5 text-zinc-300">
              {CHATGPT_INSTRUCTIONS}
            </pre>

            <p className="mt-3 text-xs leading-5 text-zinc-500">
              ChatGPT Custom Instructions have a 1,500-character limit for this
              field. The instructions above are designed to fit, but verify the
              count if you edit them.
            </p>
          </div>
        </section>

        {/* Step 6 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 6
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Verify the connection
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Start a new chat and make sure ContextDrop is enabled for that
            conversation. Ask ChatGPT to retrieve an existing project memory
            that was previously saved by another connected AI client.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-3">
              <p className="text-xs font-medium text-zinc-500">
                Example verification prompt
              </p>
            </div>

            <pre className="whitespace-pre-wrap p-5 text-sm leading-6 text-zinc-300">
              <code>{`Search ContextDrop for the API validation and authorization convention established in another AI client.

Retrieve the saved memory and summarize the standards I should follow when implementing an API endpoint. Don't save anything new yet.`}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm font-medium text-zinc-200">
              Successful verification
            </p>

            <ul className="mt-3 space-y-3 text-sm leading-6 text-zinc-400">
              <li className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                ChatGPT invokes {"ContextDrop's"} memory tools.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                It retrieves the memory saved by the other AI client.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                Its answer reflects the retrieved project knowledge.
              </li>
            </ul>
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
                ContextDrop uses OAuth to authorize ChatGPT. Sign in through
                ContextDrop and review the authorization prompt before
                granting access. You should not share your ContextDrop password
                or tokens in a chat.
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