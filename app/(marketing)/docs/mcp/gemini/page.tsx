import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";

const MCP_SERVER_URL = "https://mcp.usecontextdrop.com/mcp";

const GEMINI_INSTRUCTIONS = `Use ContextDrop as the persistent memory layer for project-specific work.

### Retrieval
- At the start of project-specific tasks, retrieve relevant project context and search existing memories.
- Treat memories as supporting context and check for conflicts with the current conversation.
- If nothing relevant is found, continue normally.

### Autonomous memory
- Identify durable project knowledge such as architecture, decisions, conventions, requirements, constraints, and technical discoveries.
- Search existing memories before saving to avoid duplicates.
- Save new durable knowledge using save_memory.
- Update existing memories using update_memory when established knowledge materially changes.
- Ignore temporary debugging details, speculation, secrets, generic programming knowledge, and short-lived tasks.
- Never claim a save or update succeeded unless the tool confirms it.

### Conversational continuity
- Keep memory operations unobtrusive and do not interrupt the user's workflow.
- Continue the original task immediately after a successful memory operation.
- Do not announce routine searches or successful saves.
- Do not explain memory management unless asked.
- Mention memory operations only when clarification is necessary or a meaningful conflict or failure requires attention.

### Security
- Use only the authenticated user's authorized ContextDrop workspace.
- Never access another user's or workspace's memories.`;

export default function GeminiMcpPage() {
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
            Gemini Setup
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Connect ContextDrop to Gemini
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Connect Gemini to ContextDrop through MCP and give it access to
            persistent project knowledge shared across your AI clients.
          </p>
        </div>

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
                A ContextDrop account with a project and saved memories
              </li>

              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                Access to {"Gemini's"} custom Connected Apps feature
              </li>

              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                A Google account signed in to Gemini
              </li>
            </ul>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            Custom MCP availability can depend on your Google account, region,
            and Gemini feature rollout.
          </p>
        </section>

        {/* Step 1 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 1
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Open Gemini Connectors
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Open Gemini and select Customise from the sidebar. Open the
            Connectors tab, then click the Custom button beside the search
            field.
          </p>

          <a
            href="https://gemini.google.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900"
          >
            Open Gemini ↗
          </a>
        </section>

        {/* Step 2 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 2
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Enter the MCP server URL
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            In the Connect to an MCP server dialog, enter the following URL.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-3">
              <p className="text-xs font-medium text-zinc-500">
                MCP server URL
              </p>
            </div>

            <pre className="overflow-x-auto p-5 text-sm leading-6 text-zinc-300">
              <code>{MCP_SERVER_URL}</code>
            </pre>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            Expand Additional settings if needed. In our tested setup, we left
            the optional Client ID and Client secret fields empty and continued
            with Next. If Gemini requires credentials in your environment,
            {"don't"} enter unrelated credentials; investigate the OAuth
            registration requirements first.
          </p>
        </section>

        {/* Step 3 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 3
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Authorize Gemini
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Review the custom Connected App confirmation and continue to the
            ContextDrop authorization page.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm font-medium text-zinc-200">
              Review the requested permissions
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              The authorization page explains the access requested by the
              connection, including reading project context, searching
              workspace memories, and the ability to create or update memories.
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Verify that {"you're"} signing in to the intended ContextDrop
              account. Click Allow Access only if you trust the connection
              and want to grant the displayed permissions.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 4
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Save the custom app
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            After authorization, Gemini displays a Save your custom app dialog.
            Review the discovered tools and click Connect.
          </p>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm font-medium text-zinc-200">
              ContextDrop MCP tools
            </p>

            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              {[
                ["get_project_context", "Retrieve active project context"],
                ["search_memory", "Search saved project memories"],
                ["save_memory", "Save new project knowledge"],
                ["update_memory", "Update existing project knowledge"],
                ["ping", "Check MCP connectivity"],
              ].map(([name, description]) => (
                <li key={name} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />

                  <div>
                    <code className="text-zinc-200">{name}</code>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 5
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Configure your active project
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            In ContextDrop, open Settings → MCP &amp; Integrations and select
            the project you want Gemini to use as your active MCP workspace.
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            {"Gemini's"} requests will use the authenticated {"user's"} active
            ContextDrop workspace. Ensure the intended project is selected
            before testing retrieval or saving memories.
          </p>
        </section>

        {/* Step 6 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 6
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Configure Gemini instructions
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            To encourage consistent retrieval and autonomous memory
            maintenance, add the following instructions to the instruction
            field you use for your Gemini conversations. The exact settings
            location may vary by Gemini interface.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-3">
              <p className="text-xs font-medium text-zinc-500">
                Recommended Gemini instructions
              </p>
            </div>

            <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap p-5 text-xs leading-5 text-zinc-300">
              <code>{GEMINI_INSTRUCTIONS}</code>
            </pre>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            These instructions guide {"Gemini's"}behavior; they do not guarantee
            that it will invoke MCP tools on every relevant message. Verify
            actual tool calls when testing autonomous memory behavior.
          </p>
        </section>

        {/* Step 7 */}
        <section className="mt-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Step 7
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Verify shared memory retrieval
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Start a new Gemini conversation and ask it to retrieve a memory
            already stored in ContextDrop. For a reliable test, explicitly
            request a search before testing whether Gemini selects the tool
            automatically.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-3">
              <p className="text-xs font-medium text-zinc-500">
                Verification prompt
              </p>
            </div>

            <pre className="whitespace-pre-wrap p-5 text-sm leading-6 text-zinc-300">
              <code>{`Use the ContextDrop MCP app to search for the API validation and authorization convention.

Return the actual matching memory titles and contents. Do not answer from general knowledge, and do not save or update anything.`}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <p className="text-sm font-medium text-zinc-200">
              Successful verification
            </p>

            <ul className="mt-3 space-y-3 text-sm leading-6 text-zinc-400">
              <li className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                Gemini invokes a ContextDrop MCP tool.
              </li>

              <li className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                The tool returns actual saved project memories.
              </li>

              <li className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                Gemini accurately explains the retrieved knowledge.
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
                ContextDrop uses OAuth to authorize Gemini. Review the
                authorization prompt before granting access. Never share your
                ContextDrop password, access tokens, or other credentials in
                chat.
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