-- Easter egg: on a member's birthday the whole day's five prompts come from that member,
-- and the "at most two per person" rule steps aside. Birthdays live on
-- nagadle_members.birthday as 'MM-DD' (no year) and are loaded from data/birthdays.json
-- by scripts/seed-supabase.mjs.

alter table public.nagadle_members
  add column if not exists birthday char(5)
  check (birthday ~ '^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$');

-- Whose day it is, or null on an ordinary day. Someone with nothing quizzable to say
-- does not get an easter egg.
create or replace function public.nagadle_birthday_member(p_day date)
returns smallint
language sql
stable
security definer
set search_path = ''
as $$
  select mb.id
  from public.nagadle_members mb
  where mb.birthday is not null
    and (
      mb.birthday = to_char(p_day, 'MM-DD')
      -- 29 February birthdays are celebrated on the 28th in non-leap years
      or (mb.birthday = '02-29'
          and to_char(p_day, 'MM-DD') = '02-28'
          and to_char(p_day + 1, 'MM-DD') <> '02-29')
    )
    and exists (
      select 1 from public.nagadle_messages m
      where m.member_id = mb.id and m.quiz_eligible
    )
  -- two people can share a date; p_day carries the year, so the pick moves year to year
  order by md5(p_day::text || ':' || mb.id::text)
  limit 1;
$$;

revoke execute on function public.nagadle_birthday_member(date) from public, anon, authenticated;

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
  birthday_member smallint;
begin
  select count(*) into filled from public.nagadle_daily_rounds where day = p_day;
  if filled >= 5 then
    return;
  end if;

  select max(id) into max_id from public.nagadle_messages;
  if max_id is null then
    raise exception 'nagadle archive is empty';
  end if;

  -- Birthday: fill the day from that member alone, hashed on the date so the set is stable.
  birthday_member := public.nagadle_birthday_member(p_day);
  if birthday_member is not null then
    insert into public.nagadle_daily_rounds (day, slot, message_id)
    select p_day, (filled + row_number() over (order by pick.ord))::smallint, pick.id
    from (
      select m.id, md5(p_day::text || ':' || m.id::text) as ord
      from public.nagadle_messages m
      where m.member_id = birthday_member
        and m.quiz_eligible
        and not exists (
          select 1 from public.nagadle_daily_rounds r
          where r.day = p_day and r.message_id = m.id
        )
      order by ord
      limit (5 - filled)
    ) pick
    on conflict do nothing;

    select count(*) into filled from public.nagadle_daily_rounds where day = p_day;
    if filled >= 5 then
      return;
    end if;
    -- Fewer than five eligible messages from them: the rest is picked the usual way.
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
