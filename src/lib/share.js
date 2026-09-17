// Dle-style share text: one row of squares per message, one square per try.
import { puzzleNumber } from './day.js';
import { MAX_TRIES } from './progress.js';

const WRONG = '🟥';
const RIGHT = '🟩';
const UNUSED = '⬜';

export function tryRow(answer) {
  const used = answer.guesses.length;
  const cells = answer.guesses.map((_, i) => (answer.correct && i === used - 1 ? RIGHT : WRONG));
  return cells.concat(Array(MAX_TRIES - used).fill(UNUSED)).join('');
}

export function buildShareText({ day, prompts, answers, streak, url }) {
  const score = prompts.filter((p) => answers[p.slot]?.correct).length;
  const lines = [
    `nagadle #${puzzleNumber(day)} · ${score}/${prompts.length}`,
    ...prompts.map((p) => tryRow(answers[p.slot])),
  ];
  if (streak > 0) lines.push(`🔥 ${streak}`);
  if (url) lines.push(url);
  return lines.join('\n');
}
