// Replaces nagadle_members.birthday with data/birthdays.json: every stored birthday is
// cleared, then the file is written back. Nothing else is touched — no message rows — so this
// is the cheap way to add or fix a birthday.
// Usage: npm run seed:birthdays [-- --dry-run]
import path from 'node:path';
import { readBirthdays } from './birthdays.mjs';

const root = path.resolve(import.meta.dirname, '..');
const birthdaysFile = path.join(root, 'data', 'birthdays.json');
const DRY_RUN = new Set(process.argv.slice(2)).has('--dry-run');

try {
  process.loadEnvFile(path.join(root, '.env'));
} catch {
  // Fall back to variables already in the environment.
}

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env (see .env.example).');
  process.exit(1);
}
if (SUPABASE_SERVICE_ROLE_KEY.startsWith('sb_publishable_')) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is a publishable (public) key. Use the secret key (sb_secret_...) or the legacy service_role key.');
  process.exit(1);
}

const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Everything past here sets process.exitCode and returns: calling process.exit() while the
// client's socket is still closing crashes Node on Windows.
async function main() {
  const { data: members, error } = await supabase.from('nagadle_members').select('id, name, birthday').order('name');
  if (error) {
    const hint = /birthday/.test(error.message)
      ? ' Apply supabase/migrations/20260920000000_birthday_rounds.sql first.'
      : '';
    console.error(`Could not read nagadle_members: ${error.message}.${hint}`);
    return 1;
  }

  const wanted = readBirthdays(birthdaysFile, members.map((m) => m.name));
  if (!wanted) return 1;

  // char(5) comes back blank-padded.
  const stored = members.filter((m) => m.birthday?.trim()).length;
  const rows = [...wanted].map(([name, birthday]) => ({ name, birthday }));
  console.log(`Replacing ${stored} stored birthday(s) with ${rows.length} from birthdays.json`);
  for (const r of rows) console.log(`  ${r.name} ${r.birthday}`);
  if (DRY_RUN) {
    console.log('Dry run, nothing written.');
    return 0;
  }

  // Wipe first, so a member dropped from the file loses their birthday too, then write the
  // file's own rows back. Two requests, and no message row is touched.
  const { error: wipeError } = await supabase
    .from('nagadle_members')
    .update({ birthday: null })
    .not('birthday', 'is', null);
  if (wipeError) {
    console.error(`Could not clear birthdays: ${wipeError.message}`);
    return 1;
  }

  if (rows.length) {
    // Every name here came from the members table, so this only ever updates existing rows.
    const { error: writeError } = await supabase
      .from('nagadle_members')
      .upsert(rows, { onConflict: 'name' });
    if (writeError) {
      console.error(`Could not write birthdays: ${writeError.message}`);
      return 1;
    }
  }
  console.log(`Done: ${rows.length} birthday(s) stored`);
  return 0;
}

process.exitCode = await main();
