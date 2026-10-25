# Paddle billing setup

The integration supports Paddle Sandbox and Paddle Live. It defaults to Sandbox when `PADDLE_ENVIRONMENT` is unset. Set it to `live` only in an environment configured with matching Live credentials and Live catalog values.

## Environment values

Add these to the local `.env.local` file for local development, or to the matching server runtime for a deployment:

- `PADDLE_ENVIRONMENT`: `sandbox` (default) or `live`.
- `PADDLE_API_KEY`: API key for the selected environment. Sandbox keys start with `pdl_sdbx_`; Live keys start with `pdl_live_`. Keep it server-only.
- `PADDLE_PRO_PRICE_ID`: the selected environment's monthly $9 ContextDrop Pro price ID.
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`: client-side token for the selected environment. Sandbox tokens start with `test_`; Live tokens start with `live_`. This token is designed to be public.
- `PADDLE_WEBHOOK_SECRET`: the notification destination secret for the selected environment.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service-role key used only by the signed webhook handler.

`PADDLE_API_KEY` is never read by browser code. The checkout action uses it to create a transaction with the signed-in ContextDrop user ID in Paddle custom data. The webhook verifies `Paddle-Signature` against the raw request body before updating subscription state.
The server selects `sandbox-api.paddle.com` or `api.paddle.com` from `PADDLE_ENVIRONMENT` and rejects an API key whose prefix does not match. The settings page initializes Paddle.js in Sandbox only when selected and checks that the client token prefix matches. A missing environment setting remains Sandbox, so existing local configuration cannot silently start creating Live transactions.

Paddle requires a default payment link before creating transactions. Set it to an approved ContextDrop website domain in the matching Paddle environment. Do not use the Hookdeck URL there; Hookdeck is only for webhook delivery. The local app opens checkout from the current page using the transaction ID.

## Sandbox setup

For local development, use the Sandbox API key, Sandbox price ID, Sandbox client-side token, and Sandbox notification destination secret together. For local webhook delivery, run Hookdeck with `hookdeck listen 3000 paddle-local --path /api/paddle/webhook` and use the public URL shown after `Requests to` as the Paddle destination URL. For a deployed Sandbox app, use its public URL ending in `/api/paddle/webhook`. Subscribe to `subscription.created`, `subscription.updated`, `subscription.canceled`, `subscription.activated`, `subscription.past_due`, `subscription.paused`, `subscription.resumed`, and `subscription.trialing`.

For the single ContextDrop Pro subscription, set the Sandbox price quantity minimum and maximum to `1`. Paddle may still show `Qty 1` in its hosted checkout or customer portal, but customers cannot change it.

## API key permissions

The current implementation needs only:

- Transactions: **Write** — create the checkout transaction.
- Customer portal sessions: **Write** — create a temporary link for the customer to manage or cancel a subscription.

It does not call product, price, customer, or subscription read APIs. Webhook verification uses the separate notification destination secret, not the API key. Do not enable `All` or broad access.

Create a separate key with these same narrow permissions in each Paddle environment. Configure that environment's notification destination secret as `PADDLE_WEBHOOK_SECRET`. The webhook handler deduplicates event IDs, ignores unrelated subscriptions, and removes Pro access if a linked subscription no longer uses the configured Pro price.

## Prepare Paddle Live

Paddle Live has separate products, prices, credentials, website approvals, payment-link settings, and notification destinations from Sandbox. Before enabling Live in a deployment:

1. Complete Paddle's Live account and identity verification.
2. In the Live catalog, create the ContextDrop Pro monthly price at `$9` and set its minimum and maximum quantity to `1`. Use its Live price ID for `PADDLE_PRO_PRICE_ID`.
3. Create a Live API key with only Transactions **Write** and Customer portal sessions **Write** permissions. Store it as `PADDLE_API_KEY` in the Live runtime.
4. Create a Live client-side token and set `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` to it. The app will not initialize checkout unless it starts with `live_` when `PADDLE_ENVIRONMENT=live`.
5. Add and get approval for the ContextDrop website domain in Paddle Live, then set the Live default payment link to that approved domain.
6. Create a Live webhook destination at the deployed app URL ending in `/api/paddle/webhook`, select the subscription events above, and set that destination's secret as `PADDLE_WEBHOOK_SECRET` in the Live runtime.
7. Set `PADDLE_ENVIRONMENT=live` only after all corresponding Live values have been entered together. Restart/rebuild the app as required by the hosting platform so the public token is updated too.

The current database stores one Paddle subscription per ContextDrop user, so it is intended to serve one Paddle environment at a time. A second Supabase project is optional for parallel Live staging, not required for launch. Keep the app on Sandbox until the existing Sandbox test subscription is canceled and its webhook has updated the row. Then switch the production app's Paddle settings to Live when you are ready. After that switch, do not start new Sandbox checkouts from local development while it still points at the production Supabase project; those Sandbox events could overwrite the same billing row.

Live checkout processes real payments. Do not enable Live mode or deploy Live credentials until the account is verified, the domain is approved, and you are ready to accept a real purchase. This change only adds code support and setup guidance; it does not change Paddle account settings or deploy the app.

## Database

Apply `supabase/migrations/20261019000000_paddle_billing_and_plan_limits.sql` to the Supabase project before using checkout or plan settings. It creates subscription and monthly usage records, a server-only webhook event store, an optimization quota function, and database triggers enforcing workspace and memory limits across both the web app and MCP service.

The existing free AI optimization allowance remains 10 uses. Pro receives 100 included optimizations per UTC calendar month. Users using their own OpenRouter key continue to bypass the included optimization quota.

## Rollback

If new workspace or memory writes are blocked unexpectedly, run `20261019000000_paddle_billing_and_plan_limits.emergency-rollback.sql` to remove only the plan-limit triggers while preserving billing records. Run `20261019000000_paddle_billing_and_plan_limits.full-rollback.sql` only when intentionally removing all billing tables and their records.
