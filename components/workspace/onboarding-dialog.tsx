"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from "../ui/button";

export function OnboardingDialog() {
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const hasSeenOnboarding:string | null =localStorage.getItem("contextdrop-onboarding");
        setShowOnboarding(hasSeenOnboarding !== "true");
    }, []);

    if (!showOnboarding) return null;

    function onDismiss() {
        localStorage.setItem("contextdrop-onboarding", "true");
        setShowOnboarding(false);
    }

    return (
      <Dialog open={showOnboarding}>
        <DialogContent
          className='sm:max-w-md border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur'
          onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>👋 Welcome to ContextDrop</DialogTitle>
            <DialogDescription>
              Turn scattered notes into AI-ready context in seconds.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-3 rounded-lg border p-4'>
            <div>1. Create workspace</div>
            <div>2. Create memories</div>
            <div>3. Select memories</div>
            <div>4. Generate context</div>
            <div>5. Optimize with Ai</div>
            <div>6. Paste into ChatGPT, Claude, or Cursor</div>
          </div>

          <Button
            className="h-11 w-full rounded-xl bg-zinc-100 text-black hover:bg-white"
            onClick={onDismiss}
            >Got it</Button>
        </DialogContent>
      </Dialog>
    );
}