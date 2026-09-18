-- The archive now holds every chat message, not just the cleaned-up ones, so a wrong
-- guess can show what was said next in the chat. scripts/extract-chat.mjs decides which
-- messages can be a daily prompt and flags them with quiz_eligible.
-- After applying this, reload the archive with `npm run seed:reset`.

-- Safe to re-run: an earlier draft of this migration was applied by hand.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'nagadle_messages' and column_name = 'quiz_eligible'
  ) then
    alter table public.nagadle_messages add column quiz_eligible boolean not null default false;

    -- Until the reseed, keep the current rows playable under the rules nagadle_ensure_rounds used.
    update public.nagadle_messages m
    set quiz_eligible = true
    where char_length(m.text) between 12 and 280
      and array_length(regexp_split_to_array(btrim(m.text), '\s+'), 1) >= 3
      and array_length(string_to_array(m.text, E'\n'), 1) <= 6
      and m.text !~ '^\s*https?://\S+\s*$'
      and m.text !~ '\[(nomor|email)\]'
      and m.text !~* '(pass(word)?|pwd|token|secret|api[_ ]?key)\s*[:=]';
  end if;
end;
$$;

create or replace function public.nagadle_ensure_rounds(p_day date)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  max_id bigint;
  attempt int := 0;
  filled int;
  candidate bigint;
  candidate_member smallint;
begin
  select count(*) into filled from public.nagadle_daily_rounds where day = p_day;
  if filled >= 5 then
    return;
  end if;

  select max(id) into max_id from public.nagadle_messages;
  if max_id is null then
    raise exception 'nagadle archive is empty';
  end if;

  while filled < 5 and attempt < 20000 loop
    candidate := (('x' || substr(md5(p_day::text || ':' || attempt), 1, 15))::bit(60)::bigint % max_id) + 1;
    attempt := attempt + 1;

    select m.member_id into candidate_member
    from public.nagadle_messages m
    where m.id = candidate and m.quiz_eligible;

    continue when not found;
    -- no repeats, and at most two messages from the same person per day
    continue when exists (
      select 1 from public.nagadle_daily_rounds r where r.day = p_day and r.message_id = candidate
    );
    continue when (
      select count(*) from public.nagadle_daily_rounds r
      join public.nagadle_messages m on m.id = r.message_id
      where r.day = p_day and m.member_id = candidate_member
    ) >= 2;

    filled := filled + 1;
    insert into public.nagadle_daily_rounds (day, slot, message_id)
    values (p_day, filled, candidate)
    on conflict do nothing;
  end loop;
end;
$$;

-- Only people who can be an answer (the archive also has senders like Meta AI).
create or replace function public.nagadle_get_members()
returns table (name text)
language sql
stable
security definer
set search_path = ''
as $$
  select mb.name
  from public.nagadle_members mb
  where exists (
    select 1 from public.nagadle_messages m where m.member_id = mb.id and m.quiz_eligible
  )
  order by mb.name;
$$;

-- A wrong guess now also returns what was said next in the chat, as next_messages:
-- [{ text, sent_at, same_sender }]. p_shown is how many follow-up messages the player already
-- has; this returns the one after those, plus one more for free when that one is just a
-- media placeholder. same_sender says whether the prompt's sender wrote it, never who did.
-- p_shown is capped at 2: two wrong tries, at most one freebie each.
drop function if exists public.nagadle_check_answer(date, smallint, text, boolean);
drop function if exists public.nagadle_check_answer(date, smallint, text, boolean, smallint); -- earlier draft

create function public.nagadle_check_answer(
  p_day date, p_slot smallint, p_guess text, p_reveal boolean default false, p_shown smallint default 0
)
returns table (correct boolean, answer text, sent_at timestamptz, next_messages jsonb)
language sql
stable
security definer
set search_path = ''
as $$
  select g.correct,
         case when g.correct or p_reveal then g.name end,
         case when g.correct or p_reveal then g.sent_at end,
         case when not (g.correct or p_reveal) then (
           select coalesce(jsonb_agg(
             jsonb_build_object('text', n.text, 'sent_at', n.sent_at, 'same_sender', n.member_id = g.member_id)
             order by n.id
           ), '[]'::jsonb)
           from (
             select f.*, lag(f.text) over (order by f.id) as prev_text
             from (
               select m.id, m.text, m.sent_at, m.member_id
               from public.nagadle_messages m
               where m.id > g.id
               order by m.id
               offset least(greatest(p_shown, 0), 2)
               limit 2
             ) f
           ) n
           where n.prev_text is null or n.prev_text in ('<Media omitted>', '<Video note omitted>')
         ) end
  from (
    select lower(btrim(p_guess)) = lower(mb.name) as correct, mb.name, m.id, m.member_id, m.sent_at
    from public.nagadle_daily_rounds r
    join public.nagadle_messages m on m.id = r.message_id
    join public.nagadle_members mb on mb.id = m.member_id
    where r.day = p_day
      and r.slot = p_slot
      and r.day <= public.nagadle_today()
  ) g;
$$;

revoke execute on function public.nagadle_check_answer(date, smallint, text, boolean, smallint) from public;
grant execute on function public.nagadle_check_answer(date, smallint, text, boolean, smallint) to anon, authenticated;
