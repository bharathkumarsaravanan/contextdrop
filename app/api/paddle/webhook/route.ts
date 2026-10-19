import { createHmac, timingSafeEqual } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

type PaddleSubscriptionEvent = {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data: {
    id: string;
    customer_id?: string | null;
    status: string;
    custom_data?: Record<string, unknown> | null;
    current_billing_period?: { ends_at?: string | null } | null;
    next_billed_at?: string | null;
    scheduled_change?: { action?: string | null } | null;
    items?: Array<{
      price_id?: string;
      price?: { id?: string };
    }>;
  };
};

function isValidSignature(rawBody: string, signature: string, secret: string) {
  const parts = signature.split(";").map((part) => part.split("=", 2));
  const timestamp = parts.find(([key]) => key === "ts")?.[1];
  const signatures = parts
    .filter(([key]) => key === "h1")
    .map(([, value]) => value)
    .filter(Boolean);

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}:${rawBody}`)
    .digest();

  return signatures.some((value) => {
    if (!/^[a-f0-9]{64}$/i.test(value)) {
      return false;
    }

    const received = Buffer.from(value, "hex");
    return received.length === expected.length && timingSafeEqual(received, expected);
  });
}

export async function POST(request: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  const rawBody = await request.text();
  const signature = request.headers.get("paddle-signature") ?? "";

  if (!secret || !isValidSignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid Paddle signature" }, { status: 401 });
  }

  let event: PaddleSubscriptionEvent;
  try {
    event = JSON.parse(rawBody) as PaddleSubscriptionEvent;
  } catch {
    return Response.json({ error: "Invalid event body" }, { status: 400 });
  }

  if (!["subscription.created", "subscription.updated", "subscription.canceled", "subscription.activated", "subscription.past_due", "subscription.paused", "subscription.resumed", "subscription.trialing"].includes(event.event_type)) {
    return Response.json({ received: true });
  }

  const subscriptionId = event.data.id;
  const admin = createAdminClient();
  const { data: linkedSubscription } = await admin
    .from("billing_subscriptions")
    .select("user_id, paddle_customer_id, price_id")
    .eq("paddle_subscription_id", subscriptionId)
    .maybeSingle();

  const customUserId = event.data.custom_data?.contextdrop_user_id;
  const userId = typeof customUserId === "string"
    ? customUserId
    : linkedSubscription?.user_id;

  if (!userId) {
    return Response.json({ received: true, ignored: true });
  }

  const priceId = event.data.items?.[0]?.price?.id ?? event.data.items?.[0]?.price_id ?? null;
  const proPriceId = process.env.PADDLE_PRO_PRICE_ID;

  if (!proPriceId) {
    return Response.json({ error: "Paddle Pro price is not configured" }, { status: 500 });
  }

  if (priceId !== proPriceId && !linkedSubscription) {
    return Response.json({ received: true, ignored: true });
  }

  const occurredAt = new Date(event.occurred_at);
  if (!Number.isFinite(occurredAt.getTime())) {
    return Response.json({ error: "Invalid event timestamp" }, { status: 400 });
  }

  const storedPriceId = priceId ?? linkedSubscription?.price_id ?? null;
  const status = event.event_type === "subscription.canceled"
    ? "canceled"
    : storedPriceId === proPriceId
      ? event.data.status
      : "inactive";

  const { error } = await admin.rpc("apply_paddle_subscription_event", {
    p_event_id: event.event_id,
    p_occurred_at: occurredAt.toISOString(),
    p_user_id: userId,
    p_customer_id: event.data.customer_id ?? linkedSubscription?.paddle_customer_id ?? null,
    p_subscription_id: subscriptionId,
    p_status: status,
    p_price_id: storedPriceId,
    p_current_period_end: event.data.current_billing_period?.ends_at ?? event.data.next_billed_at ?? null,
    p_scheduled_change_action: event.data.scheduled_change?.action ?? null,
  });

  if (error) {
    return Response.json({ error: "Unable to store subscription event" }, { status: 500 });
  }

  return Response.json({ received: true });
}
