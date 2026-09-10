"use client";

import { useTransition } from "react";
import { approveAuth, denyAuth } from "./actions";
import { Button } from "@/components/ui/button";

type ConsentActionsProps = {
    authorizationId: string;
}

export function ConsentActions({
    authorizationId
}: ConsentActionsProps) {
    const [isPending, startTransition] = useTransition();

    function handleApprove() {
        startTransition(async () => {
            const result = await approveAuth(authorizationId);
            window.location.assign(result.redirect_url);
        });
    }

    function handleDeny() {
        startTransition(async () => {
            const result = await denyAuth(authorizationId);
            window.location.assign(result.redirect_url);
        })
    }

    return (
        <div className="mt-8 space-y-3">
            <Button
              type="button"
              onClick={handleApprove}
              disabled={isPending}
              variant="secondary"
              size="sm"
              className="w-full rounded-lg text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending ? "Processing..." : "Allow Access"}
            </Button>

            <Button
              type="button"
              onClick={handleDeny}
              disabled={isPending}
              variant="secondary"
              size="sm"
              className="w-full rounded-lg text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending ? "Processing..." : "Deny"}
            </Button>
        </div>
    )
}