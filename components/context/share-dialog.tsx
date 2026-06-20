"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { toast } from "sonner";
import { GeneratedContext } from "@/types/generated-context";
import { useState } from "react";
import { handleShareContext } from "@/app/shared/[shareId]/actions";
import { Button } from "../ui/button";
import { handleCopy } from "@/lib/utils";

type Props = {
  context: GeneratedContext;
  children: React.ReactElement;
};

export function ShareContextDialog({ context, children }: Props) {
  const [urlLoading, setUrlLoading] = useState(false);
  const [url, setUrl] = useState<string|null>(null);

  async function shareContext() {
    setUrlLoading(true);
    const { success, url=null, error } = await handleShareContext(context.id, context.workspace_id);
    if (success) {
        setUrl(url);
        handleCopy(url || "");
        toast.success("The sharable url " + url + " is copied to ur clipboard.")
    }
    setUrlLoading(false);
  }
  
  return (
    <Dialog>
      <DialogTrigger className="w-100">{children}</DialogTrigger>
      <DialogContent className="border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur max-w-3xl">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle>{context.name}</DialogTitle>
        </DialogHeader>
        <Button disabled={!!url} onClick={shareContext}>Click to generate the url</Button>
        {(urlLoading) ? (
          <span>Loading...</span>
        ) : url ? (
          <p className="text-sm text-zinc-500">
            Your context is ready to share copy the below url
            <br />
            {url}{" "}
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
