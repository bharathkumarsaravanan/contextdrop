-- Full rollback: removes all database objects added by the Paddle billing
-- migration, including billing and usage records created since it was applied.
-- Prefer the emergency rollback file first if the issue is caused by plan limits.
begin;

drop trigger if exists enforce_contextdrop_workspace_limit on public.workspaces;
drop trigger if exists enforce_contextdrop_memory_limit on public.memory_blocks;

drop function if exists public.enforce_contextdrop_workspace_limit();
drop function if exists public.enforce_contextdrop_memory_limit();
drop function if exists public.consume_pro_monthly_optimization();
drop function if exists public.apply_paddle_subscription_event(
  text,
  timestamptz,
  uuid,
  text,
  text,
  text,
  text,
  timestamptz,
  text
);

drop table if exists public.paddle_webhook_events;
drop table if exists public.ai_monthly_usage;
drop table if exists public.billing_subscriptions;

commit;
