"use server";

import "server-only";

import { createClient } from "@/lib/supabase/server";
import { canManageSubscription, isProSubscription, type BillingSubscription } from "@/lib/billing/plans";
import { getPaddleApiConfig } from "@/lib/billing/paddle-config";

type PaddleResponse<T> = {
  data?: T;
  error?: {
    code?: string;
    detail?: string;
    errors?: Array<{
      field?: string;
      message?: string;
    }>;
  };
  meta?: {
    request_id?: string;
  };
};

async function paddleRequest<T>(path: string, body: Record<string, unknown>) {
  const { apiKey, apiUrl } = getPaddleApiConfig();

  const response = await fetch(`${apiUrl}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as PaddleResponse<T> | null;
    const errorCode = result?.error?.code ?? "unknown_error";
    const requestId = result?.meta?.request_id;

    console.error("Paddle API request failed", {
      path,
      status: response.status,
      errorCode,
      detail: result?.error?.detail,
      validationErrors: result?.error?.errors,
      requestId,
    });

    throw new Error(`Paddle request failed: ${errorCode}.`);
  }

  return (await response.json()) as PaddleResponse<T>;
}

export async function createPaddleCheckout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sign in to upgrade to ContextDrop Pro." };
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from("billing_subscriptions")
    .select("status, current_period_end, paddle_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (subscriptionError) {
    return { error: "Unable to check your subscription." };
  }

  if (isProSubscription(subscription)) {
    return { error: "Your ContextDrop Pro subscription is already active." };
  }

  if (subscription?.paddle_customer_id && canManageSubscription(subscription.status)) {
    return { error: "Manage your existing Paddle subscription before starting another one." };
  }

  const priceId = process.env.PADDLE_PRO_PRICE_ID;

  if (!priceId) {
    return { error: "The ContextDrop Pro price is not configured." };
  }

  try {
    const result = await paddleRequest<{
      id?: string;
    }>("/transactions", {
      items: [{ price_id: priceId, quantity: 1 }],
      custom_data: { contextdrop_user_id: user.id },
    });

    const transactionId = result.data?.id;

    if (!transactionId) {
      return { error: "Paddle did not return a transaction ID." };
    }

    return { success: true, transactionId };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unable to start Paddle checkout:", error.message);
    }

    return { error: "Unable to start Paddle Sandbox checkout." };
  }
}

export async function createPaddlePortalLink() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sign in to manage your subscription." };
  }

  const { data: subscription, error } = await supabase
    .from("billing_subscriptions")
    .select("user_id, paddle_customer_id, paddle_subscription_id, status, price_id, current_period_end, scheduled_change_action")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !subscription) {
    return { error: "No Paddle subscription was found for your account." };
  }

  const billingSubscription = subscription as BillingSubscription;

  if (!canManageSubscription(billingSubscription.status) || !billingSubscription.paddle_customer_id) {
    return { error: "There is no active subscription to manage." };
  }

  try {
    const result = await paddleRequest<{
      urls?: { general?: { overview?: string } };
    }>(`/customers/${encodeURIComponent(billingSubscription.paddle_customer_id)}/portal-sessions`, {
      subscription_ids: billingSubscription.paddle_subscription_id
        ? [billingSubscription.paddle_subscription_id]
        : [],
    });

    const portalUrl = result.data?.urls?.general?.overview;

    if (!portalUrl) {
      return { error: "Paddle did not return a customer portal link." };
    }

    return { success: true, portalUrl };
  } catch {
    return { error: "Unable to open Paddle's customer portal." };
  }
}
