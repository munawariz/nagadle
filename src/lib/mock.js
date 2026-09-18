// Dev-only stand-in for the Supabase functions: open the app with ?mock.
import { todayKey } from './day.js';

const MEMBERS = ['Adrian', 'Aldy', 'Alsani', 'Aria', 'Candra', 'Dafa', 'Dery', 'Ganiya', 'Hariz', 'Hasbi', 'Ilham', 'Julianto', 'Rey', 'Rifki', 'Septian', 'Shaddam'];

// Invented placeholder lines, not from the chat export.
// next: the chat messages that follow, as [text, same sender as the prompt].
const ROUNDS = [
  {
    text: 'mock message number one for the layout',
    answer: 'Shaddam',
    next: [['<Media omitted>', false], ['caption for the mock picture', false], ['placeholder reply', true]],
  },
  {
    text: 'a slightly longer made-up line to see how the bubble wraps two rows',
    answer: 'Aria',
    next: [['ok', true], ['a follow-up mock line that is long enough to wrap onto a second row', false]],
  },
  { text: 'short one ok', answer: 'Hariz', next: [['wkwk', false], ['next', false]] },
  {
    text: 'this placeholder is here to test a long message that runs over several lines so the smaller type size kicks in and the bubble grows taller',
    answer: 'Ganiya',
    next: [['mock reply one', true], ['mock reply two', true]],
  },
  { text: 'line one of a multi-line mock\nline two of it', answer: 'Adrian', next: [['multi-line\nreply', false]] },
];

const MEDIA = new Set(['<Media omitted>', '<Video note omitted>']);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function rpc(fn, args) {
  await wait(250);
  if (fn === 'nagadle_get_members') return MEMBERS.map((name) => ({ name }));
  if (fn === 'nagadle_get_daily') return ROUNDS.map((r, i) => ({ day: todayKey(), slot: i + 1, text: r.text }));
  if (fn === 'nagadle_check_answer') {
    const round = ROUNDS[args.p_slot - 1];
    const correct = round.answer.toLowerCase() === args.p_guess.trim().toLowerCase();
    const show = correct || args.p_reveal;
    // Same rule as the SQL: the next message, plus one more when it is a media placeholder.
    const start = Math.min(Math.max(args.p_shown, 0), 2);
    const [first, second] = round.next.slice(start, start + 2);
    const next = [first, MEDIA.has(first?.[0]) && second].filter(Boolean);
    return [{
      correct,
      answer: show ? round.answer : null,
      sent_at: show ? '2023-03-12T14:04:00Z' : null,
      next_messages: show ? null : next.map(([text, same], i) => ({
        text, sent_at: `2023-03-12T14:${String(5 + start + i).padStart(2, '0')}:00Z`, same_sender: same,
      })),
    }];
  }
  throw new Error(`Unknown function ${fn}`);
}
