import { CreateWorkspaceDialog } from "./create-workspace-dialog";
import { Button } from "../ui/button";
import { Database, Sparkles } from "lucide-react";
import { DemoOnboardingDialog } from "../onboarding/demo-onboarding-dialog";

export function EmptyState() {
  return (
    <div className="flex min-h-[440px] flex-col items-center justify-center rounded-3xl border border-zinc-800/80 bg-zinc-950/50 px-6 text-center shadow-xl shadow-black/10">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
        <Sparkles className="h-5 w-5 text-primary" />
      </div>

      <h2 className="mt-6 text-3xl font-semibold tracking-tight">
        Welcome to ContextDrop
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
        Build a persistent memory for your AI project. Store the knowledge your
        AI needs and connect it through MCP.
      </p>

      {/* Primary action */}
      <div className="mt-7">
        <CreateWorkspaceDialog />
      </div>

      {/* Demo */}
      <DemoOnboardingDialog>
        <Button
          variant="ghost"
          className="mt-3 text-sm text-zinc-400 hover:bg-transparent hover:text-white"
        >
          <Database className="mr-2 h-4 w-4" />
          Explore a demo project
        </Button>
      </DemoOnboardingDialog>

      {/* Supporting flow */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-600">
        <span>Workspace</span>
        <span className="text-primary">→</span>
        <span>Memories</span>
        <span className="text-primary">→</span>
        <span>MCP</span>
        <span className="text-primary">→</span>
        <span>AI</span>
      </div>

    </div>
  );
}
