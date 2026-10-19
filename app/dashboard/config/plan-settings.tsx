"use client";

import { useTransition } from "react";
import { useState } from "react";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { canManageSubscription, PLAN_LIMITS, type PlanName } from "@/lib/billing/plans";
import { createPaddleCheckout, createPaddlePortalLink } from "./billing-actions";
import { toast } from "sonner";

type PaddleClient = {
  Environment: {
    set: (environment: "sandbox") => void;
  };
  Initialize: (options: {
    token: string;
    eventCallback?: (event: { name: string }) => void;
  }) => void;
  Checkout: {
    open: (options: { transactionId: string }) => void;
  };
};

declare global {
  interface Window {
    Paddle?: PaddleClient;
  }
}

let paddleInitialized = false;

type Props = {
  plan: PlanName;
  subscriptionStatus: string | null;
  scheduledChangeAction: string | null;
  currentPeriodEnd: string | null;
  usage: {
    workspaces: number;
    aiClients: number;
    memoryBlocks: number;
    optimizations: number;
  };
};

export function PlanSettings({
  plan,
  subscriptionStatus,
  scheduledChangeAction,
  currentPeriodEnd,
  usage,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [paddleReady, setPaddleReady] = useState(false);
  const limits = PLAN_LIMITS[plan];
  const isPro = plan === "pro";
  const canManage = canManageSubscription(subscriptionStatus);
  const paddleClientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

  function handlePaddleReady() {
    if (!paddleClientToken || !window.Paddle) {
      return;
    }

    if (!paddleInitialized) {
      window.Paddle.Environment.set("sandbox");
      window.Paddle.Initialize({
        token: paddleClientToken,
        eventCallback: (event) => {
          if (event.name === "checkout.completed") {
            window.setTimeout(() => window.location.reload(), 1500);
          }
        },
      });
      paddleInitialized = true;
    }

    setPaddleReady(true);
  }

  function handleUpgrade() {
    startTransition(async () => {
      const result = await createPaddleCheckout();

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      if (!window.Paddle) {
        toast.error("Paddle Checkout is still loading. Try again in a moment.");
        return;
      }

      window.Paddle.Checkout.open({ transactionId: result.transactionId });
    });
  }

  function handleManageSubscription() {
    startTransition(async () => {
      const result = await createPaddlePortalLink();

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      window.location.assign(result.portalUrl);
    });
  }

  const planRows = [
    { label: "Workspaces", value: `${usage.workspaces} / ${limits.workspaces}` },
    { label: "Connected AI clients", value: `${usage.aiClients} / ${limits.aiClients}` },
    { label: "Memory blocks", value: `${usage.memoryBlocks} / ${limits.memoryBlocks}` },
    { label: "AI optimizations", value: `${usage.optimizations} / ${limits.optimizations}${isPro ? " this month" : " included"}` },
  ];

  return (
    <div className="space-y-6">
      {paddleClientToken ? (
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
          onReady={handlePaddleReady}
        />
      ) : null}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Your plan</CardTitle>
              <CardDescription>
                Review your plan, usage, and subscription options.
              </CardDescription>
            </div>
            <Badge variant="secondary">{limits.name}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {planRows.map((row) => (
              <div key={row.label} className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">{row.label}</p>
                <p className="mt-1 font-medium">{row.value}</p>
              </div>
            ))}
          </div>
          {isPro || canManage ? (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">
                  {isPro ? "ContextDrop Pro · $9/month" : "Existing subscription"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {scheduledChangeAction === "cancel" && currentPeriodEnd
                    ? `Cancellation is scheduled for ${new Date(currentPeriodEnd).toISOString().slice(0, 10)}. Pro access continues until then.`
                    : isPro
                      ? `Subscription status: ${subscriptionStatus ?? "active"}. Cancel anytime through Paddle.`
                      : `Subscription status: ${subscriptionStatus}. Manage it through Paddle.`}
                </p>
              </div>
              <Button onClick={handleManageSubscription} disabled={isPending}>
                {isPending ? "Opening..." : "Manage subscription"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Upgrade to ContextDrop Pro · $9/month</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get higher limits and 100 AI optimizations each month. Cancel anytime.
                </p>
              </div>
              <Button onClick={handleUpgrade} disabled={isPending || !paddleReady}>
                {isPending
                  ? "Opening..."
                  : !paddleClientToken
                    ? "Checkout unavailable"
                    : paddleReady
                      ? "Upgrade to Pro"
                      : "Loading checkout..."}
              </Button>
              {!paddleClientToken ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Add the Paddle Sandbox client token to enable checkout.
                </p>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plan limits</CardTitle>
          <CardDescription>
            Core features and supported AI clients are available on both plans.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[460px] text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Included</th>
                <th className="py-3 pr-4 font-medium">Free</th>
                <th className="py-3 font-medium">ContextDrop Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-3 pr-4">Price</td><td className="py-3 pr-4">$0</td><td className="py-3">$9/month</td></tr>
              <tr className="border-b"><td className="py-3 pr-4">Workspaces</td><td className="py-3 pr-4">Up to 3</td><td className="py-3">Up to 25</td></tr>
              <tr className="border-b"><td className="py-3 pr-4">Connected AI clients</td><td className="py-3 pr-4">Up to 3</td><td className="py-3">Up to 10</td></tr>
              <tr className="border-b"><td className="py-3 pr-4">Memory blocks</td><td className="py-3 pr-4">Up to 250</td><td className="py-3">Up to 2,000</td></tr>
              <tr><td className="py-3 pr-4">AI optimizations</td><td className="py-3 pr-4">10 included</td><td className="py-3">100/month</td></tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
