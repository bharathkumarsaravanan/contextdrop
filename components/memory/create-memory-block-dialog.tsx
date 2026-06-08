"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createMemoryBlock } from "@/app/dashboard/workspaces/[workspaceId]/actions";
import { Button } from "../ui/button";
import { MemoryForm } from "./memory-form";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";

type Props = {
    workspaceId: string;
};

export function CreateMemoryBlockDialog({
    workspaceId
}: Props) {
    
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData:FormData) {
        setLoading(true);
        
        const result =  await createMemoryBlock(workspaceId, formData);

        if (result?.error) {
            toast.error(result.error);
            setLoading(false);
            return;
        };

        toast.success("Memory block created");
        setOpen(false);
        router.refresh();
        setLoading(false);
    }

    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='h-11 rounded-xl border border-zinc-800/80 bg-zinc-900 px-5 text-white hover:bg-zinc-800/80'>
            <Plus className='mr-2 h-4 w-4' />
            Add Memory
          </Button>
        </DialogTrigger>

        <DialogContent className='border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur'>
          <DialogHeader>
            <DialogTitle>Create Memory Block</DialogTitle>
          </DialogHeader>

          <MemoryForm 
            isLoading={loading}
            submitText="Create Memory"
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    );
}