-- Emergency rollback: disable workspace and memory limit enforcement while
-- preserving billing subscriptions, webhook event history, and usage records.
begin;

drop trigger if exists enforce_contextdrop_workspace_limit on public.workspaces;
drop trigger if exists enforce_contextdrop_memory_limit on public.memory_blocks;

drop function if exists public.enforce_contextdrop_workspace_limit();
drop function if exists public.enforce_contextdrop_memory_limit();

commit;
