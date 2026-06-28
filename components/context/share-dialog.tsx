"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CopyIcon, CopyCheckIcon, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { GeneratedContext } from "@/types/generated-context";
import { useState } from "react";
import { handleShareContext } from "@/app/shared/[shareId]/actions";
import { Button } from "../ui/button";
import { handleCopy } from "@/lib/utils";
import { setTimeout } from "timers";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

type Props = {
  context: GeneratedContext;
  children: React.ReactElement;
};

export function ShareContextDialog({ context, children }: Props) {
  const [urlLoading, setUrlLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function shareContext() {
    setUrlLoading(true);
    const {
      success,
      url = null,
      error,
    } = await handleShareContext(context.id, context.workspace_id);
    if (success) {
      setUrl(url);
      handleCopy(url || "");
      toast.success("The sharable url " + url + " is copied to ur clipboard.");
    } else {
        setError(error || "Failed to generate share link");
    }
    setUrlLoading(false);
  }

  async function copyAgain() {
    handleCopy(url || "");
    toast.success("The sharable url " + url + " is copied to ur clipboard.");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Dialog>
      <DialogTrigger className="w-100">{children}</DialogTrigger>
      <DialogContent className="border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur max-w-3xl">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle>Share Context</DialogTitle>
          <p className="text-sm text-zinc-400">
            Create a public read-only link for this context.
          </p>
        </DialogHeader>
        <Button
          disabled={!!url || urlLoading}
          onClick={shareContext}
          className="h-11 w-full rounded-xl border border-zinc-800/80 bg-zinc-800 px-5 text-white hover:bg-zinc-800/80"
        >
          {urlLoading ? "Generating share link..." : "Generate Share Link"}
        </Button>
        {error && (
            <Alert className="border border-red-900/50 bg-red-950/20 " variant="destructive">
                <AlertTitle className="flex gap-2 text-red-500 "><AlertCircle className="h-4 w-4" />Failed to generate share link</AlertTitle>
                <AlertDescription className="text-zinc-300 ml-6">{error}</AlertDescription>
            </Alert>
        )}
        {url && (
          <>
            <div className="rounded-md border border-green-900/50 bg-green-950/20 p-3">
              <p className="text-sm text-green-400">
                ✓ Share link created and copied to clipboard
              </p>
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
              <p className="text-xs text-zinc-500 mb-2">Share URL</p>
              <p className="break-all text-sm text-zinc-300">{url}</p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={copyAgain}
              disabled={copied}
            >
              {copied ? (
                <CopyCheckIcon className="mr-2 h-4 w-4" />
              ) : (
                <CopyIcon className="mr-2 h-4 w-4" />
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
