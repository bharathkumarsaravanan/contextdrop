# Paddle Sandbox billing setup

This integration is configured for Paddle Sandbox. It does not switch the app to Paddle Live or deploy any settings.

## Required server environment values

Add these to the local `.env.local` file and to the server runtime when deploying the Sandbox integration:

- `PADDLE_API_KEY`: Paddle Sandbox API key. Keep it server-only.
- `PADDLE_PRO_PRICE_ID`: the Paddle Sandbox monthly $9 ContextDrop Pro price ID.
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`: Paddle Sandbox client-side token used by Paddle.js. It is designed to be public and should start with `test_`.
- `PADDLE_WEBHOOK_SECRET`: the secret generated for the Paddle notification destination.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service-role key used only by the signed webhook handler.

`PADDLE_API_KEY` is never read by browser code. The checkout action uses it to create a transaction with the signed-in ContextDrop user ID in Paddle custom data. The webhook verifies `Paddle-Signature` against the raw request body before updating subscription state.
The settings page initializes Paddle.js with `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` and opens the transaction returned by the server action. Paddle requires a default payment link before creating transactions. In Sandbox, set it to the ContextDrop settings page that loads Paddle.js (for local development, `http://localhost:3000/dashboard/config` is supported).

## API key permissions

The current implementation needs only:

- Transactions: **Write** — create the checkout transaction.
- Customer portal sessions: **Write** — create a temporary link for the customer to manage or cancel a subscription.

It does not call product, price, customer, or subscription read APIs. Webhook verification uses the separate notification destination secret, not the API key. Do not enable `All` or broad access.

## Paddle Sandbox notification destination

For local testing, run Hookdeck with `hookdeck listen 3000 paddle-local --path /api/paddle/webhook` and use the public URL shown after `Requests to` as the Paddle destination URL. For a deployed Sandbox app, use its public URL ending in `/api/paddle/webhook`. Subscribe to `subscription.created`, `subscription.updated`, `subscription.canceled`, `subscription.activated`, `subscription.past_due`, `subscription.paused`, `subscription.resumed`, and `subscription.trialing`.

Configure the destination secret as `PADDLE_WEBHOOK_SECRET`. The webhook handler deduplicates event IDs, ignores unrelated subscriptions, and removes Pro access if a linked subscription no longer uses the configured Pro price.

## Database

Apply `supabase/migrations/20261019000000_paddle_billing_and_plan_limits.sql` to the Supabase project before using checkout or plan settings. It creates subscription and monthly usage records, a server-only webhook event store, an optimization quota function, and database triggers enforcing workspace and memory limits across both the web app and MCP service.

The existing free AI optimization allowance remains 10 uses. Pro receives 100 included optimizations per UTC calendar month. Users using their own OpenRouter key continue to bypass the included optimization quota.

## Rollback

If new workspace or memory writes are blocked unexpectedly, run `20261019000000_paddle_billing_and_plan_limits.emergency-rollback.sql` to remove only the plan-limit triggers while preserving billing records. Run `20261019000000_paddle_billing_and_plan_limits.full-rollback.sql` only when intentionally removing all billing tables and their records.
