import { createClient } from '@supabase/supabase-js';
import { MOCK } from './mode.js';

const url = import.meta.env.SUPABASE_URL;
const key = import.meta.env.SUPABASE_ANON_KEY;

export const configError = !MOCK && (!url || !key) ? 'Set SUPABASE_URL and SUPABASE_ANON_KEY in .env' : null;

const supabase = configError || MOCK ? null : createClient(url, key, { auth: { persistSession: false } });

async function rpc(fn, args) {
  if (import.meta.env.DEV && MOCK) return (await import('./mock.js')).rpc(fn, args);
  if (configError) throw new Error(configError);
  const { data, error } = await supabase.rpc(fn, args);
  if (error) throw new Error(error.message);
  return data;
}

/** Today's puzzle: { day: 'YYYY-MM-DD', prompts: [{ slot, text }] } */
export async function fetchDaily() {
  const rows = await rpc('nagadle_get_daily');
  if (!rows?.length) throw new Error('No puzzle today');
  return { day: rows[0].day, prompts: rows.map((r) => ({ slot: r.slot, text: r.text })) };
}

/** Every guessable sender name. */
export async function fetchMembers() {
  const rows = await rpc('nagadle_get_members');
  return rows.map((r) => r.name);
}

/**
 * { correct, answer, sentAt, next, birthday } for one guess. answer/sentAt stay null on a wrong guess
 * unless reveal is set; a wrong guess instead gets `next`, the chat messages that follow the
 * `shown` ones the player already has: [{ text, sentAt, sameSender }], two when the first is
 * a media placeholder, empty past the end of the archive. `birthday` is the member whose
 * birthday it is when the whole day is theirs, null on any other day; like `answer` it only
 * comes back on a resolved round, so it cannot give the day away early.
 */
export async function checkAnswer(day, slot, guess, shown, reveal = false) {
  const rows = await rpc('nagadle_check_answer', {
    p_day: day, p_slot: slot, p_guess: guess, p_reveal: reveal, p_shown: shown,
  });
  if (!rows?.length) throw new Error('Round not found');
  const { correct, answer, sent_at, next_messages, birthday } = rows[0];
  const next = (next_messages ?? []).map((m) => ({ text: m.text, sentAt: m.sent_at, sameSender: m.same_sender }));
  return { correct, answer, sentAt: sent_at, next, birthday: birthday ?? null };
}
