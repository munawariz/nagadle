-- The celebration screen needs to know whose birthday it is. The name would give away
-- every answer of the day, so it rides along with nagadle_check_answer and only on a
-- resolved round: by then that round's sender is already revealed, so nothing leaks.

-- The birthday member's name, but only while every round of the day really is theirs
-- (nagadle_ensure_rounds falls back to the normal picker if they ran out of messages).
-- Never granted to anon: on its own it is the answer key.
create or replace function public.nagadle_birthday_name(p_day date)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select mb.name
  from public.nagadle_members mb
  where mb.id = public.nagadle_birthday_member(p_day)
    and exists (select 1 from public.nagadle_daily_rounds r where r.day = p_day)
    and not exists (
      select 1
      from public.nagadle_daily_rounds r
      join public.nagadle_messages m on m.id = r.message_id
      where r.day = p_day and m.member_id <> mb.id
    );
$$;

revoke execute on function public.nagadle_birthday_name(date) from public, anon, authenticated;

drop function if exists public.nagadle_check_answer(date, smallint, text, boolean, smallint);

create function public.nagadle_check_answer(
  p_day date, p_slot smallint, p_guess text, p_reveal boolean default false, p_shown smallint default 0
)
returns table (correct boolean, answer text, sent_at timestamptz, next_messages jsonb, birthday text)
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
         ) end,
         -- only once this round is open; null on every ordinary day
         case when g.correct or p_reveal then public.nagadle_birthday_name(p_day) end
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
