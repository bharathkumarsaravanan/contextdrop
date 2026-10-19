export const PLAN_LIMITS = {
  free: {
    name: "Free",
    workspaces: 3,
    aiClients: 3,
    memoryBlocks: 250,
    optimizations: 10,
  },
  pro: {
    name: "ContextDrop Pro",
    workspaces: 25,
    aiClients: 10,
    memoryBlocks: 2000,
    optimizations: 100,
  },
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;

export type BillingSubscription = {
  user_id: string;
  paddle_customer_id: string | null;
  paddle_subscription_id: string | null;
  status: string;
  price_id: string | null;
  current_period_end: string | null;
  scheduled_change_action: string | null;
};

export function canManageSubscription(status: string | null) {
  return status !== null && ["active", "trialing", "past_due", "paused"].includes(status);
}

export function isProSubscription(
  subscription: Pick<BillingSubscription, "status" | "current_period_end"> | null,
) {
  if (!subscription || !["active", "trialing"].includes(subscription.status)) {
    return false;
  }

  return (
    !subscription.current_period_end ||
    new Date(subscription.current_period_end).getTime() > Date.now()
  );
}
