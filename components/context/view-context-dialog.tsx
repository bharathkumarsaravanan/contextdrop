"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { GeneratedContext } from "@/types/generated-context";

type Props = {
  context: GeneratedContext | null;
  children: React.ReactElement;
};

export function ViewContextDialog({ context, children }: Props) {
  const [copied, setCopied] = useState(false);

  if (!context) {
    return null;
  }

  async function handleCopy() {
    if (!context?.content) {
      return;
    }

    try {
      await navigator.clipboard.writeText(context.content);

      setCopied(true);
      toast.success("Context copied to clipboard");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy context");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
          w-[calc(100vw-2rem)]
          sm:max-w-4xl
          border-zinc-800
          bg-zinc-900
          p-0
          text-white
          shadow-2xl
        "
      >
        {/* Header */}
        <DialogHeader className="border-b border-zinc-800 px-6 py-5">
          <DialogTitle className="text-base font-semibold">
            {context.name}
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={handleCopy}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-3
                py-2
                text-xs
                font-medium
                text-zinc-300
                transition
                hover:bg-zinc-700
                hover:text-white
              "
            >
              {copied ? (
                <>
                  <CopyCheckIcon className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="max-h-[65vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-zinc-300">
              {context.content}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 px-6 py-4">
          <p className="text-xs text-zinc-500">
            Generated from your saved project memories.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}