"use client";
import { useState } from "react";
import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteWorkspace } from "@/app/dashboard/actions";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

type Props = {
    workspaceId: string;
};
 
export function WorkspaceActions({
    workspaceId
}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);
        const result = await deleteWorkspace(workspaceId);

        if (result?.error) {
            toast.error(result.error);
            setLoading(false);

            return;
        }

        toast.success("Workspace deleted!");
        router.refresh();
        setLoading(false);
    }

    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent
                  align="end"
                  className="border-zinc-800 bg-zinc-950 text-white"
                >
                    <AlertDialogTrigger asChild>
                        
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent className="border border-zinc-800/80 bg-zinc-900 text-white shadow-2xl shadow-black/40 backdrop-blur-sm">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold tracking-tight">
                        Delete Workspace?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-sm leading-6 text-zinc-400">
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6 flex justify-end gap-3 border-t border-zinc-800 pt-5">
                    <AlertDialogCancel className="rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={loading}
                      className="rounded-xl bg-red-500 text-white hover:bg-red-400"
                    >
                        {
                            loading
                            ? "Deleting..."
                            : "Delete"
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    )
}