// All progress lives in this browser's localStorage; nothing is sent back to the server.
import { shiftDay, todayKey } from './day.js';
import { STORAGE_PREFIX as KEY } from './mode.js';

export const ROUNDS = 5;
export const MAX_TRIES = 3;

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    return parsed && typeof parsed.days === 'object' ? parsed : { days: {} };
  } catch {
    return { days: {} };
  }
}

function write(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked (private mode): the round still plays, it just won't persist.
  }
}

/**
 * { prompts, tries: { [slot]: [wrong guess, ...] },
 *   answers: { [slot]: { correct, answer, sentAt, guesses: [...] } } } or null.
 * A slot lands in answers once it is solved or out of tries.
 */
export function loadDay(day) {
  return read().days[day] ?? null;
}

export function saveDay(day, patch) {
  const state = read();
  const current = state.days[day] ?? { prompts: [], answers: {}, tries: {} };
  state.days[day] = {
    ...current,
    ...patch,
    answers: { ...current.answers, ...patch.answers },
    tries: { ...current.tries, ...patch.tries },
  };
  write(state);
  return state.days[day];
}

export const isComplete = (entry) => !!entry && Object.keys(entry.answers ?? {}).length >= ROUNDS;
export const scoreOf = (entry) => Object.values(entry?.answers ?? {}).filter((a) => a.correct).length;

export function getStats(today = todayKey()) {
  const { days } = read();
  const finished = Object.entries(days).filter(([, e]) => isComplete(e));
  const distribution = Array.from({ length: ROUNDS + 1 }, (_, i) => ROUNDS - i).map((score) => ({
    label: `${score}/${ROUNDS}`,
    count: finished.filter(([, e]) => scoreOf(e) === score).length,
  }));

  // Streak counts finished days back from today (or yesterday, if today is still open).
  let cursor = isComplete(days[today]) ? today : shiftDay(today, -1);
  let streak = 0;
  while (isComplete(days[cursor])) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }

  let best = 0;
  let run = 0;
  let prev = null;
  for (const [day] of finished.sort(([a], [b]) => a.localeCompare(b))) {
    run = prev && shiftDay(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }

  const perfect = finished.filter(([, e]) => scoreOf(e) === ROUNDS).length;
  return {
    played: finished.length,
    perfectRate: finished.length ? Math.round((perfect / finished.length) * 100) : 0,
    streak,
    best,
    distribution,
  };
}
