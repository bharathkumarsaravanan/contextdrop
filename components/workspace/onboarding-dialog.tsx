"use client";

import { useState } from "react";
import {
  Database,
  Link2,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export function OnboardingDialog() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("contextdrop-onboarding") !== "true";
  });

  if (!showOnboarding) return null;

  function onDismiss() {
    localStorage.setItem("contextdrop-onboarding", "true");
    setShowOnboarding(false);
  }

  return (
    <Dialog open={showOnboarding}>
      <DialogContent
        className="border border-zinc-800/80 bg-zinc-950 text-white shadow-2xl shadow-black/50 backdrop-blur sm:max-w-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <DialogTitle className="text-2xl tracking-tight">
            Welcome to ContextDrop
          </DialogTitle>

          <DialogDescription className="mt-2 text-base leading-6 text-zinc-400">
            Persistent memory for your AI projects.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 space-y-3">
          {/* Step 01 */}
          <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
              01
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-zinc-400" />

                <p className="text-sm font-medium">
                  Create a workspace
                </p>
              </div>

              <p className="mt-1 text-sm leading-5 text-zinc-500">
                Organize one project and keep its knowledge in one place.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
              02
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-zinc-400" />

                <p className="text-sm font-medium">
                  Add project memories
                </p>
              </div>

              <p className="mt-1 text-sm leading-5 text-zinc-500">
                Save architecture, requirements, decisions, conventions,
                and other project knowledge.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
              03
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-zinc-400" />

                <p className="text-sm font-medium">
                  Connect your AI
                </p>
              </div>

              <p className="mt-1 text-sm leading-5 text-zinc-500">
                Connect Cursor or Claude through MCP and give your AI
                access to your project memory.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-primary/10 bg-primary/[0.04] px-4 py-3">
          <p className="text-center text-xs font-medium tracking-wide text-zinc-400">
            Your AI
            <span className="mx-2 text-primary">→</span>
            ContextDrop
            <span className="mx-2 text-primary">→</span>
            Project Memory
          </p>
        </div>

        <Button
          className="mt-5 h-11 w-full rounded-xl"
          onClick={onDismiss}
        >
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
}