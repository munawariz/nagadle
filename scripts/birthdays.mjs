// data/birthdays.json is the source of truth for the birthday easter egg (see
// supabase/migrations/20260920000000_birthday_rounds.sql): a member missing from it, or with a
// null birthday, has no birthday in the database either.
import fs from 'node:fs';

const FORMAT = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * The file as Map(name -> 'MM-DD'), or null when it isn't there yet. Names that aren't in
 * `known` are reported and skipped; a malformed date stops the run rather than being ignored.
 */
export function readBirthdays(file, known) {
  if (!fs.existsSync(file)) {
    console.warn(`No ${file}; leaving birthdays as they are.`);
    return null;
  }
  const { members } = JSON.parse(fs.readFileSync(file, 'utf8'));
  const names = new Set(known);
  const out = new Map();
  for (const { name, birthday } of members ?? []) {
    if (!birthday) continue;
    if (!FORMAT.test(birthday)) {
      console.error(`birthdays.json: ${name} has an invalid birthday "${birthday}" (expected MM-DD).`);
      process.exit(1);
    }
    if (!names.has(name)) console.warn(`birthdays.json: "${name}" is not a known member, skipping.`);
    else out.set(name, birthday);
  }
  return out;
}
