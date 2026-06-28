"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { Loader2, Circle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
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

  const renderList = (state: "workspace" | "memories") => {
    const list = state === "workspace" ? "Workspace" : "Memories"
    switch (process[state]) {
      case "loading":
        return (<div className="flex gap-2 text-base items-center text-zinc-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Creating {list}...
        </div>)
      case "done":
        return (<div className="flex gap-2 text-base items-center text-green-400">
            <CheckCircle2 className="h-4 w-4 text-green-500" /> {list} created
        </div>)
      default:
        return(<div className="flex gap-2 text-base items-center">
            <Circle className="h-4 w-4" /> Create {list}
        </div>)
    }
  };

  async function handleStart() {
    setProcess(prev => ({
        ...prev,
        workspace: "loading"
    }));
    const {success:workspaceSuccess, data, error:workspaceError} = await createDemoWorkspace();
    if (!workspaceSuccess) {
        toast.error(workspaceError);
        setProcess(prev => ({
        ...prev,
            workspace: null
        }));
        return;
    }
    setProcess(prev => ({
        workspace: "done",
        memories: "loading"
    }));

    const {success, error} = await createDemoMemories(data);
    if (!success) {
        toast.error(error);
        setProcess(prev => ({
            ...prev,
            memories: null
        }));
        return;
    }
    setProcess(prev => ({
        ...prev,
        memories: "done"
    }));
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur max-w-3xl">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle>The demo process will take some time</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent>
            <div>
                {renderList("workspace")}
                {renderList("memories")}
            </div>
          </CardContent>
        </Card>
        <Button disabled={!!process.workspace || !!process.memories} onClick={handleStart} className="h-11 w-full rounded-xl bg-zinc-100 text-black hover:bg-white">
          Start the process
        </Button>
      </DialogContent>
    </Dialog>
  );
}
