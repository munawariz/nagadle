-- Chat archive seeded from the WhatsApp export (see scripts/seed-supabase.mjs).

create table public.nagadle_members (
  id smallint generated always as identity primary key,
  name text not null unique
);

create table public.nagadle_messages (
  id bigint primary key, -- stable id from data/messages.json
  member_id smallint not null references public.nagadle_members (id),
  sent_at timestamptz not null,
  text text not null
);

create index nagadle_messages_member_id_idx on public.nagadle_messages (member_id);
create index nagadle_messages_sent_at_idx on public.nagadle_messages (sent_at);

-- RLS on with no policies: anon/authenticated clients cannot read the archive directly.
-- The game will go through security-definer functions added in a later migration.
alter table public.nagadle_members enable row level security;
alter table public.nagadle_messages enable row level security;

-- Wipes the archive so the seeder can reload a fresh export. Service role only.
create function public.nagadle_reset_chat_archive()
returns void
language sql
security definer
set search_path = ''
as $$
  truncate table public.nagadle_messages, public.nagadle_members restart identity cascade;
$$;

revoke execute on function public.nagadle_reset_chat_archive() from public, anon, authenticated;
grant execute on function public.nagadle_reset_chat_archive() to service_role;
