// Seeds data/messages.json into Supabase (run the migration in supabase/migrations first).
// Birthdays ride along from data/birthdays.json; "npm run seed:birthdays" writes just those.
// Usage: npm run seed [-- --reset] [-- --dry-run]
//   --reset    truncate members/messages before loading (use after a fresh export)
//   --dry-run  build the rows and print a summary without touching the database
import fs from 'node:fs';
import path from 'node:path';
import { readBirthdays } from './birthdays.mjs';

const root = path.resolve(import.meta.dirname, '..');
const input = path.join(root, 'data', 'messages.json');
const birthdaysFile = path.join(root, 'data', 'birthdays.json');
const args = new Set(process.argv.slice(2));
const RESET = args.has('--reset');
const DRY_RUN = args.has('--dry-run');
const BATCH_SIZE = 5000;
const CONCURRENCY = 4;
const TIMEZONE_OFFSET = '+07:00'; // export timestamps are Asia/Jakarta local time

try {
  process.loadEnvFile(path.join(root, '.env'));
} catch {
  // Fall back to variables already in the environment.
}

if (!fs.existsSync(input)) {
  console.error(`Missing ${input}. Run "npm run extract" first.`);
  process.exit(1);
}
const { meta, messages } = JSON.parse(fs.readFileSync(input, 'utf8'));
console.log(`Loaded ${messages.length} messages (${meta.quizTotal} usable as prompts) from ${meta.senders.length} senders`);

if (DRY_RUN) {
  console.log('Dry run, sample row:', toRow(messages[0], 1));
  process.exit(0);
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
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function toRow(m, memberId) {
  return {
    id: m.id,
    member_id: memberId,
    sent_at: m.timestamp + TIMEZONE_OFFSET,
    text: m.text,
    quiz_eligible: m.quiz,
  };
}

async function withRetry(label, fn, attempts = 3) {
  for (let i = 1; ; i++) {
    const { error, data } = await fn();
    if (!error) return data;
    if (i === attempts) throw new Error(`${label}: ${error.message}`);
    console.warn(`${label} failed (${error.message}), retrying ${i}/${attempts - 1}...`);
    await new Promise((r) => setTimeout(r, 1000 * i));
  }
}

if (RESET) {
  await withRetry('reset', () => supabase.rpc('nagadle_reset_chat_archive'));
  console.log('Archive truncated');
}

// data/birthdays.json is the source of truth for the birthday easter egg: a name missing
// from it (or with a null birthday) has its stored birthday cleared.
const birthdays = readBirthdays(birthdaysFile, meta.senders.map((sender) => sender.name));
const memberRows = meta.senders.map((s) =>
  birthdays ? { name: s.name, birthday: birthdays.get(s.name) ?? null } : { name: s.name },
);
const members = await withRetry('members', () =>
  supabase.from('nagadle_members').upsert(memberRows, { onConflict: 'name' }).select('id, name'),
);
const memberIds = new Map(members.map((m) => [m.name, m.id]));
console.log(`Upserted ${members.length} members`);
if (birthdays) console.log(`Set ${memberRows.filter((m) => m.birthday).length} birthdays`);

const batches = [];
for (let i = 0; i < messages.length; i += BATCH_SIZE) batches.push(messages.slice(i, i + BATCH_SIZE));

let done = 0;
let next = 0;
async function worker() {
  while (next < batches.length) {
    const n = next++;
    const rows = batches[n].map((m) => toRow(m, memberIds.get(m.sender)));
    await withRetry(`batch ${n + 1}/${batches.length}`, () =>
      supabase.from('nagadle_messages').upsert(rows, { onConflict: 'id' }),
    );
    done += rows.length;
    process.stdout.write(`\rInserted ${done}/${messages.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log('\nDone');
