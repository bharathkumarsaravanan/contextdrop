"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CopyIcon, CopyCheckIcon, AlertCircle, LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { GeneratedContext } from "@/types/generated-context";
import { useState } from "react";
import { handleShareContext } from "@/app/shared/[shareId]/actions";
import { Button } from "../ui/button";
import { handleCopy } from "@/lib/utils";
import { setTimeout } from "timers";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { analytics } from "@/lib/analytics/events";

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
    setError(null);
    const { success, url = null, error } = await handleShareContext(context.id);
    if (success) {
      setUrl(url);
      handleCopy(url || "");
      toast.success("The sharable url " + url + " is copied to ur clipboard.");
      analytics.contextShared();
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg border-zinc-800 bg-zinc-900 p-0 text-white shadow-2xl">
        {/* Header  */}
        <DialogHeader className="border-b border-zinc-700 px-6 py-5">
          <DialogTitle className="text-base font-semibold">
            Share Context
          </DialogTitle>

          <p className="pt-1 text-sm leading-5 text-zinc-400">
            Create a public read-only link for this saved context.
          </p>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          {!url ? (
            <>
              {/* Before Sharing  */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-zinc-800 p-2">
                    <LinkIcon className="h-4 w-4 text-zinc-300" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      Create a shareable link
                    </p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Anyone with the link will be able to view this context
                      without signing in.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-900/50 bg-red-950/20"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Failed to generate share link</AlertTitle>

                  <AlertDescription className="mt-1 text-zinc-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                disabled={urlLoading}
                onClick={shareContext}
                className="h-11 w-full rounded-xl"
              >
                {urlLoading
                  ? "Generating share link..."
                  : "Generate Share Link"}
              </Button>
            </>
          ) : (
            <>
              {/* Success  */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-green-500/10 p-1.5">
                    <CopyCheckIcon className="h-4 w-4 text-green-400" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      Share link created
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Anyone with this link can view this context.
                    </p>
                  </div>
                </div>
              </div>

              {/* Share URL  */}

              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-400">Share link</p>

                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-2">
                  <p className="min-w-0 flex-1 break-all px-2 text-sm text-zinc-300">
                    {url}
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyAgain}
                    className="shrink-0 border-zinc-700 bg-zinc-900"
                  >
                    {copied ? (
                      <>
                        <CopyCheckIcon className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
