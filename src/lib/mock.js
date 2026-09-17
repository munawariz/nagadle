// Dev-only stand-in for the Supabase functions: open the app with ?mock.
import { todayKey } from './day.js';

const MEMBERS = ['Akaza', 'Aldy', 'Alsani', 'Amru', 'Aria', 'Candra', 'Dafa Nurul Fauziansyah', 'Deka', 'Dery', 'Ganiya', 'Hariz', 'Hasbi', 'Ilham', 'Julianto', 'Rey', 'Rifki'];

// Invented placeholder lines, not from the chat export.
const ROUNDS = [
  { text: 'mock message number one for the layout', answer: 'Amru' },
  { text: 'a slightly longer made-up line to see how the bubble wraps two rows', answer: 'Aria' },
  { text: 'short one ok', answer: 'Hariz' },
  {
    text: 'this placeholder is here to test a long message that runs over several lines so the smaller type size kicks in and the bubble grows taller',
    answer: 'Ganiya',
  },
  { text: 'line one of a multi-line mock\nline two of it', answer: 'Deka' },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function rpc(fn, args) {
  await wait(250);
  if (fn === 'nagadle_get_members') return MEMBERS.map((name) => ({ name }));
  if (fn === 'nagadle_get_daily') return ROUNDS.map((r, i) => ({ day: todayKey(), slot: i + 1, text: r.text }));
  if (fn === 'nagadle_check_answer') {
    const round = ROUNDS[args.p_slot - 1];
    const correct = round.answer.toLowerCase() === args.p_guess.trim().toLowerCase();
    const show = correct || args.p_reveal;
    return [{ correct, answer: show ? round.answer : null, sent_at: show ? '2023-03-12T14:04:00Z' : null }];
  }
  throw new Error(`Unknown function ${fn}`);
}
