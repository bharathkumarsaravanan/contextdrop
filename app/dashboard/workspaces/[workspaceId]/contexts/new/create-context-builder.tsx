"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemoryBlockList } from "@/components/memory/memory-block-list";
import { MemoryBlock } from "@/types/memory-block";
import { Workspace } from "@/types/workspace";
import { analytics } from "@/lib/analytics/events";
import { generateContext } from "@/lib/context-generator";
import { ContextPreview } from "@/components/context/context-preview";
import { toast } from "sonner";
import { optimizeContextAction } from "@/app/dashboard/actions/optimize-context";
import { saveGeneratedContext } from "@/app/dashboard/actions/save-generated-context";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  workspace: Workspace;
  workspaceId: string;
  blocks: MemoryBlock[];
  searchQuery?: string;
  hasMore: boolean;
  totalMemories: number;
  initialRemainingOptimizations: number;
};

export function CreateContextBuilder({
  workspace,
  workspaceId,
  blocks,
  searchQuery,
  hasMore,
  totalMemories,
  initialRemainingOptimizations,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedMemories, setSelectedMemories] = useState<MemoryBlock[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generatedContext, setGeneratedContext] = useState("");
  const [contextTimestamp, setContextTimestamp] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [remainingOptimizations, setRemainingOptimizations] = useState<
    number | null
  >(initialRemainingOptimizations);

  function handleSelectionChange(ids: Set<string>, memories: MemoryBlock[]) {
    setSelectedIds(ids);
    setSelectedMemories(memories);
  }

  function handleGenerate() {
    if (selectedMemories.length === 0) {
      return;
    }

    setGenerating(true);

    try {
      const context = generateContext(workspace.name, selectedMemories);
      setGeneratedContext(context);
      analytics.contextGenerated();
      setContextTimestamp(new Date());
    } finally {
      setGenerating(false);
    }
    // previewRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleCopy() {
    if (!generatedContext) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedContext);
      setCopied(true);
      toast.success("Context copied to clipboard");
      analytics.contextCopied();
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy context");
    }
  }

  async function handleOptimize() {
    try {
      setOptimizing(true);
      const { success, data, error, remaining } =
        await optimizeContextAction(generatedContext);
      if (!success) {
        toast.error(error);
        console.error(error);
        return;
      }
      setGeneratedContext(data);

      if (typeof remaining === "number") {
        setRemainingOptimizations(remaining);
      }

      toast.success("Context optimized with AI");
      analytics.aiOptimizeSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to optimize context");
    } finally {
      setOptimizing(false);
      setContextTimestamp(new Date());
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      const { success, error } = await saveGeneratedContext(
        workspace.id,
        generatedContext,
      );
      if (!success) {
        toast.error(error);
        console.error(error);
        return;
      }
      toast.success("Context saved");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save context");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 pb-24">
      <Link
        href={`/dashboard/workspaces/${workspaceId}/contexts`}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Contexts
      </Link>
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Context Builder
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Create Context
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          Select the memories you want to package into reusable AI context.
        </p>
      </div>

      {generatedContext ? (
        <ContextPreview
          content={generatedContext}
          onCopy={handleCopy}
          copied={copied}
          isLoading={optimizing}
          onSave={handleSave}
          saving={saving}
          selectedCount={selectedIds.size}
          lastUpdate={contextTimestamp}
          remainingOptimizations={remainingOptimizations}
          optimizeBtn={
            <Button
              size="sm"
              onClick={handleOptimize}
              disabled={!generatedContext || optimizing}
            >
              {optimizing ? "Optimizing" : "Optimize with AI"}
            </Button>
          }
        />
      ) : (
        <MemoryBlockList
          key={searchQuery ?? ""}
          workspace={workspace}
          blocks={blocks}
          searchQuery={searchQuery}
          hasMore={hasMore}
          totalMemories={totalMemories}
          selectable
          onSelectionChange={handleSelectionChange}
        />
      )}

      {selectedIds.size > 0 && (
        <div className="sticky bottom-4 z-40 -mb-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/95 px-5 py-4 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">
                  {selectedIds.size}{" "}
                  {selectedIds.size === 1 ? "memory" : "memories"} selected
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Generate reusable context from your selected memories.
                </p>
              </div>

              {generatedContext ? (
                <Button size="sm" onClick={() => setGeneratedContext("")}>
                  Back to Selection
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleGenerate}
                  disabled={generating || selectedMemories.length === 0}
                >
                  {generating ? "Generating..." : "Generate Context"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
