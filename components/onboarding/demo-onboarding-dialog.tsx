"use client";

import {
  Database,
  FolderKanban,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { createDemoWorkspace, createDemoMemories } from "@/lib/demo-seed";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactElement;
};

export function DemoOnboardingDialog({ children }: Props) {
  const [process, setProcess] = useState<{
    workspace: null | "loading" | "done";
    memories: null | "loading" | "done";
  }>({
    workspace: null,
    memories: null,
  });

  const router = useRouter();

  const isRunning =
    process.workspace === "loading" ||
    process.memories === "loading";

  const isComplete =
    process.workspace === "done" &&
    process.memories === "done";

  async function handleStart() {
    setProcess({
      workspace: "loading",
      memories: null,
    });

    const {
      success: workspaceSuccess,
      data,
      error: workspaceError,
    } = await createDemoWorkspace();

    if (!workspaceSuccess) {
      toast.error(workspaceError);

      setProcess({
        workspace: null,
        memories: null,
      });

      return;
    }

    setProcess({
      workspace: "done",
      memories: "loading",
    });

    const {
      success: memoriesSuccess,
      error: memoriesError,
    } = await createDemoMemories(data);

    if (!memoriesSuccess) {
      toast.error(memoriesError);

      setProcess((prev) => ({
        ...prev,
        memories: null,
      }));

      return;
    }

    setProcess((prev) => ({
      ...prev,
      memories: "done",
    }));

    router.refresh();
  }

  function renderStep(
    state: "workspace" | "memories",
    icon: React.ReactNode,
    title: string,
    description: string
  ) {
    const status = process[state];

    return (
      <div
        className={`flex gap-4 rounded-xl border p-4 transition-colors ${
          status === "loading"
            ? "border-primary/30 bg-primary/[0.04]"
            : status === "done"
              ? "border-zinc-800 bg-zinc-900/40"
              : "border-zinc-800 bg-zinc-950/40"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
            status === "done"
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-zinc-800 bg-zinc-900 text-zinc-400"
          }`}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : status === "done" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            icon
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium">
            {title}
          </p>

          <p className="mt-1 text-sm leading-5 text-zinc-500">
            {status === "loading"
              ? `Setting up ${title.toLowerCase()}...`
              : status === "done"
                ? "Ready"
                : description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-lg border-zinc-800 bg-zinc-950 text-white shadow-2xl shadow-black/50">
        <DialogHeader>
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <DialogTitle className="text-2xl tracking-tight">
            Explore ContextDrop
          </DialogTitle>

          <DialogDescription className="text-base leading-6 text-zinc-400">
            We&apos;ll create a sample project with example memories so you can
            explore the product before creating your own.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 space-y-3">
          {renderStep(
            "workspace",
            <FolderKanban className="h-4 w-4" />,
            "Create demo workspace",
            "Set up a sample project for you to explore."
          )}

          {renderStep(
            "memories",
            <Database className="h-4 w-4" />,
            "Add demo memories",
            "Populate the project with example project knowledge."
          )}
        </div>

        {!isRunning && !isComplete && (
          <div className="mt-5 rounded-xl border border-primary/10 bg-primary/[0.04] px-4 py-3">
            <p className="text-center text-xs leading-5 text-zinc-500">
              This creates sample data in your account. You can explore it
              without affecting your existing projects.
            </p>
          </div>
        )}

        <Button
          disabled={isRunning || isComplete}
          onClick={handleStart}
          className="mt-5 h-11 w-full rounded-xl"
        >
          {isRunning
            ? "Setting up demo..."
            : isComplete
              ? "Demo ready"
              : "Create demo workspace"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}