// Puzzle days follow Asia/Jakarta (UTC+7, no DST), matching nagadle_today() in the database.
const TZ = 'Asia/Jakarta';
const OFFSET_MS = 7 * 3600 * 1000;
const DAY_MS = 24 * 3600 * 1000;
const LAUNCH_DAY = '2026-09-17'; // puzzle #1

export function todayKey(now = Date.now()) {
  return new Date(now + OFFSET_MS).toISOString().slice(0, 10);
}

export function shiftDay(day, delta) {
  return new Date(Date.parse(`${day}T00:00:00Z`) + delta * DAY_MS).toISOString().slice(0, 10);
}

export function puzzleNumber(day) {
  return Math.round((Date.parse(`${day}T00:00:00Z`) - Date.parse(`${LAUNCH_DAY}T00:00:00Z`)) / DAY_MS) + 1;
}

export function msUntilNextDay(now = Date.now()) {
  return DAY_MS - ((now + OFFSET_MS) % DAY_MS);
}

export function formatDay(day) {
  return new Date(`${day}T00:00:00+07:00`).toLocaleDateString('en-GB', {
    timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long',
  });
}

export function formatSentAt(iso) {
  return new Date(iso).toLocaleString('en-GB', {
    timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}
