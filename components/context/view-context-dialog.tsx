import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { GeneratedContext } from "@/types/generated-context";
import { Button } from "../ui/button";
import { DeleteContextDialog } from "./delete-context-dialog";

type Props = {
    context: GeneratedContext | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function ViewContextDialog ({
    context,
    open,
    onOpenChange
}: Props) {
    if (!context) return null;

    return (
        <Dialog
          open={open}
          onOpenChange={onOpenChange}
        >
            <DialogContent className='border border-zinc-800/80 bg-zinc-900/95 text-white shadow-2xl shadow-black/50 backdrop-blur max-w-3xl'>
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>
                            {context.name}
                        </DialogTitle>
                        <DeleteContextDialog workspaceId={context.workspace_id} contextId={context.id}>
                            <Button variant="destructive" size="sm">
                                Delete
                            </Button>
                        </DeleteContextDialog>
                    </div>
                </DialogHeader>
                <pre className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm">
                    {context.content}
                </pre>
            </DialogContent>
        </Dialog>
    )
}