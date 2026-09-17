-- Daily puzzle: five messages per Jakarta day, exposed to the browser only through
-- security-definer functions so the anon/publishable key never reads the archive.

create table public.nagadle_daily_rounds (
  day date not null,
  slot smallint not null check (slot between 1 and 5),
  message_id bigint not null references public.nagadle_messages (id) on delete cascade,
  primary key (day, slot)
);

alter table public.nagadle_daily_rounds enable row level security;

-- Puzzle days roll over at midnight Jakarta time for everyone.
create function public.nagadle_today()
returns date
language sql
stable
set search_path = ''
as $$
  select (now() at time zone 'Asia/Jakarta')::date;
$$;

-- Picks the day's five messages deterministically from a hash of the date, so the
-- same day always gets the same set even if two players trigger it at once.
create function public.nagadle_ensure_rounds(p_day date)
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
    where m.id = candidate
      -- enough to guess from, short enough for the bubble
      and char_length(m.text) between 12 and 280
      and array_length(regexp_split_to_array(btrim(m.text), '\s+'), 1) >= 3
      and array_length(string_to_array(m.text, E'\n'), 1) <= 6
      -- nothing that is just a link, masked personal data or a credential
      and m.text !~ '^\s*https?://\S+\s*$'
      and m.text !~ '\[(nomor|email)\]'
      and m.text !~* '(pass(word)?|pwd|token|secret|api[_ ]?key)\s*[:=]';

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

revoke execute on function public.nagadle_ensure_rounds(date) from public, anon, authenticated;

-- Today's five prompts. Returns the text only, never the sender.
create function public.nagadle_get_daily()
returns table (day date, slot smallint, text text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  today date := public.nagadle_today();
begin
  perform public.nagadle_ensure_rounds(today);
  return query
    select r.day, r.slot, m.text
    from public.nagadle_daily_rounds r
    join public.nagadle_messages m on m.id = r.message_id
    where r.day = today
    order by r.slot;
end;
$$;

-- Names for the answer field's autocomplete.
create function public.nagadle_get_members()
returns table (name text)
language sql
stable
security definer
set search_path = ''
as $$
  select name from public.nagadle_members order by name;
$$;

-- Checks one guess and reveals the sender. Only for days that have already started.
create function public.nagadle_check_answer(p_day date, p_slot smallint, p_guess text)
returns table (correct boolean, answer text, sent_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select lower(btrim(p_guess)) = lower(mb.name), mb.name, m.sent_at
  from public.nagadle_daily_rounds r
  join public.nagadle_messages m on m.id = r.message_id
  join public.nagadle_members mb on mb.id = m.member_id
  where r.day = p_day
    and r.slot = p_slot
    and r.day <= public.nagadle_today();
$$;

revoke execute on function public.nagadle_get_daily() from public;
revoke execute on function public.nagadle_get_members() from public;
revoke execute on function public.nagadle_check_answer(date, smallint, text) from public;
grant execute on function public.nagadle_get_daily() to anon, authenticated;
grant execute on function public.nagadle_get_members() to anon, authenticated;
grant execute on function public.nagadle_check_answer(date, smallint, text) to anon, authenticated;
