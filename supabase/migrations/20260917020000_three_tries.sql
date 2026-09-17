-- Three tries per message: a wrong guess no longer reveals the sender. The answer comes
-- back only on a correct guess, or when the client asks for it on its last try.

drop function public.nagadle_check_answer(date, smallint, text);

create function public.nagadle_check_answer(p_day date, p_slot smallint, p_guess text, p_reveal boolean default false)
returns table (correct boolean, answer text, sent_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select g.correct,
         case when g.correct or p_reveal then g.name end,
         case when g.correct or p_reveal then g.sent_at end
  from (
    select lower(btrim(p_guess)) = lower(mb.name) as correct, mb.name, m.sent_at
    from public.nagadle_daily_rounds r
    join public.nagadle_messages m on m.id = r.message_id
    join public.nagadle_members mb on mb.id = m.member_id
    where r.day = p_day
      and r.slot = p_slot
      and r.day <= public.nagadle_today()
  ) g;
$$;

revoke execute on function public.nagadle_check_answer(date, smallint, text, boolean) from public;
grant execute on function public.nagadle_check_answer(date, smallint, text, boolean) to anon, authenticated;
