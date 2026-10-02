"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { revokeMcpClient } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Props = { clientId: string; clientName: string };

export function McpDisconnectButton({ clientId, clientName }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDisconnect = async () => {
    setIsLoading(true);

    const result = await revokeMcpClient(clientId);

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    }

    toast.success(`${clientName} disconnected`);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? "Disconnecting..." : "Disconnect"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border border-zinc-800/80 bg-zinc-900 text-white shadow-2xl shadow-black/40 backdrop-blur-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect {clientName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will revoke this MCP connection. {clientName} will no longer be
            able to access your ContextDrop account through this authorization.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDisconnect}>
            Disconnect
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
