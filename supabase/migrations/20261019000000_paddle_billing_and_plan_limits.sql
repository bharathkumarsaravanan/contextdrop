create table if not exists public.billing_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  paddle_customer_id text,
  paddle_subscription_id text unique,
  status text not null default 'inactive',
  price_id text,
  current_period_end timestamptz,
  scheduled_change_action text,
  last_event_at timestamptz not null default 'epoch',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.billing_subscriptions enable row level security;
drop policy if exists "Users can view own billing subscription" on public.billing_subscriptions;
create policy "Users can view own billing subscription"
on public.billing_subscriptions
for select
to authenticated
using (auth.uid() = user_id);
revoke insert, update, delete on public.billing_subscriptions from anon, authenticated;
grant select on public.billing_subscriptions to authenticated;

create table if not exists public.paddle_webhook_events (
  event_id text primary key,
  occurred_at timestamptz not null,
  processed_at timestamptz not null default now()
);
alter table public.paddle_webhook_events enable row level security;
revoke all on public.paddle_webhook_events from anon, authenticated;

create table if not exists public.ai_monthly_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  month_start date not null,
  optimization_count integer not null default 0 check (optimization_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, month_start)
);
alter table public.ai_monthly_usage enable row level security;
drop policy if exists "Users can view own monthly AI usage" on public.ai_monthly_usage;
create policy "Users can view own monthly AI usage"
on public.ai_monthly_usage
for select
to authenticated
using (auth.uid() = user_id);
revoke insert, update, delete on public.ai_monthly_usage from anon, authenticated;
grant select on public.ai_monthly_usage to authenticated;

create or replace function public.consume_pro_monthly_optimization()
returns table (allowed boolean, remaining integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_month_start date := date_trunc('month', timezone('utc', now()))::date;
  v_count integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1 from public.billing_subscriptions
    where user_id = v_user_id
      and status in ('active', 'trialing')
      and (current_period_end is null or current_period_end > now())
  ) then
    return query select false, 0;
    return;
  end if;

  perform pg_advisory_xact_lock(hashtext(v_user_id::text), hashtext(v_month_start::text));
  insert into public.ai_monthly_usage (user_id, month_start)
  values (v_user_id, v_month_start)
  on conflict (user_id, month_start) do nothing;

  update public.ai_monthly_usage
  set optimization_count = optimization_count + 1,
      updated_at = now()
  where user_id = v_user_id
    and month_start = v_month_start
    and optimization_count < 100
  returning optimization_count into v_count;

  if found then
    return query select true, greatest(100 - v_count, 0);
  else
    select optimization_count into v_count
    from public.ai_monthly_usage
    where user_id = v_user_id and month_start = v_month_start;
    return query select false, greatest(100 - coalesce(v_count, 100), 0);
  end if;
end;
$$;
revoke all on function public.consume_pro_monthly_optimization() from public, anon;
grant execute on function public.consume_pro_monthly_optimization() to authenticated;

create or replace function public.apply_paddle_subscription_event(
  p_event_id text,
  p_occurred_at timestamptz,
  p_user_id uuid,
  p_customer_id text,
  p_subscription_id text,
  p_status text,
  p_price_id text,
  p_current_period_end timestamptz,
  p_scheduled_change_action text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inserted integer;
begin
  insert into public.paddle_webhook_events (event_id, occurred_at)
  values (p_event_id, p_occurred_at)
  on conflict (event_id) do nothing;

  get diagnostics v_inserted = row_count;
  if v_inserted = 0 then
    return false;
  end if;

  insert into public.billing_subscriptions (
    user_id, paddle_customer_id, paddle_subscription_id, status, price_id,
    current_period_end, scheduled_change_action, last_event_at, updated_at
  ) values (
    p_user_id, p_customer_id, p_subscription_id, p_status, p_price_id,
    p_current_period_end, p_scheduled_change_action, p_occurred_at, now()
  )
  on conflict (user_id) do update set
    paddle_customer_id = excluded.paddle_customer_id,
    paddle_subscription_id = excluded.paddle_subscription_id,
    status = excluded.status,
    price_id = excluded.price_id,
    current_period_end = excluded.current_period_end,
    scheduled_change_action = excluded.scheduled_change_action,
    last_event_at = excluded.last_event_at,
    updated_at = now()
  where public.billing_subscriptions.last_event_at <= excluded.last_event_at;

  return true;
end;
$$;
revoke all on function public.apply_paddle_subscription_event(text, timestamptz, uuid, text, text, text, text, timestamptz, text) from public, anon, authenticated;
grant execute on function public.apply_paddle_subscription_event(text, timestamptz, uuid, text, text, text, text, timestamptz, text) to service_role;

create or replace function public.enforce_contextdrop_workspace_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit integer := 3;
begin
  if new.user_id is null then
    return new;
  end if;

  perform pg_advisory_xact_lock(hashtext(new.user_id::text), 74123);

  if exists (
    select 1 from public.billing_subscriptions
    where user_id = new.user_id
      and status in ('active', 'trialing')
      and (current_period_end is null or current_period_end > now())
  ) then
    v_limit := 25;
  end if;

  if (select count(*) from public.workspaces where user_id = new.user_id) >= v_limit then
    raise exception 'Your plan allows up to % workspaces. Upgrade to ContextDrop Pro for a higher limit.', v_limit
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;
drop trigger if exists enforce_contextdrop_workspace_limit on public.workspaces;
create trigger enforce_contextdrop_workspace_limit
before insert on public.workspaces
for each row execute function public.enforce_contextdrop_workspace_limit();

create or replace function public.enforce_contextdrop_memory_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_limit integer := 250;
begin
  select user_id into v_user_id
  from public.workspaces
  where id = new.workspace_id;

  if v_user_id is null then
    return new;
  end if;

  perform pg_advisory_xact_lock(hashtext(v_user_id::text), 74124);

  if exists (
    select 1 from public.billing_subscriptions
    where user_id = v_user_id
      and status in ('active', 'trialing')
      and (current_period_end is null or current_period_end > now())
  ) then
    v_limit := 2000;
  end if;

  if (
    select count(*)
    from public.memory_blocks mb
    join public.workspaces w on w.id = mb.workspace_id
    where w.user_id = v_user_id
  ) >= v_limit then
    raise exception 'Your plan allows up to % memory blocks. Upgrade to ContextDrop Pro for a higher limit.', v_limit
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;
drop trigger if exists enforce_contextdrop_memory_limit on public.memory_blocks;
create trigger enforce_contextdrop_memory_limit
before insert on public.memory_blocks
for each row execute function public.enforce_contextdrop_memory_limit();
