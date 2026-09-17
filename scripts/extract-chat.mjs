// Parses the WhatsApp export in raw_data/ into a sanitized data/messages.json.
// Usage: node scripts/extract-chat.mjs [input.txt] [output.json]
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const input = process.argv[2] ?? path.join(root, 'raw_data', 'Whatsapp Chat with Pecinta Naga.txt');
const output = process.argv[3] ?? path.join(root, 'data', 'messages.json');

// Export name (or number) -> display name used by the game.
const SENDER_ALIASES = {
  '+62 877-4796-1912': 'Ilham',
  '+62 821-3048-6258': 'Ilham',
  '+62 851-6168-0373': 'Ilham',
  '+62 822-1161-7892': 'Candra',
  '~candra': 'Candra',
  'Amru': 'Shaddam',
  'Amru Bisnis': 'Shaddam',
  'Deka': 'Adrian',
  'munawariz': 'Hariz',
  'Ijul (Paninti)': 'Julianto',
  'SiAk': 'Septian',
};
const displayName = (name) => SENDER_ALIASES[name] ?? name;

const HEADER = /^(\d{1,2})\/(\d{1,2})\/(\d{2}), (\d{1,2}):(\d{2})[\s ](AM|PM) - (.*)$/;
const SKIP_BODIES = new Set([
  '<Media omitted>',
  '<Video note omitted>',
  'This message was deleted',
  'You deleted this message',
  'Waiting for this message',
  'live location shared',
  'null',
]);
const SKIP_PATTERNS = [
  /^location: https:\/\/maps\.google\.com\//,
  /\.vcf \(file attached\)$/,
  /^You received a view once message\./,
];
const DROPPED_SENDERS = new Set(['Meta AI']);
// Laughter-only once punctuation/emoji/spaces are gone: wkwk, wkwkkw, awokwok, wkwk ok...
const isLaughOnly = (text) => {
  const letters = text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  return /^[awkoh]+$/.test(letters) && /wk|kw/.test(letters) && !/^wakwaw+$/.test(letters);
};
// Generic reactions, written the way normalizeWords() spells them (repeated letters collapsed).
const REACTIONS = new Set([
  'aduh', 'bener', 'benar', 'bner', 'bnr', 'gelo', 'keren', 'sok', 'gpp', 'gp',
  'alhamdulilah', 'alhamdulila', 'astaghfirulah', 'astagfirulah', 'astaghfirula', 'astagfirula',
  'gg', 'g', 'hoh', 'heh',
]);
// Words that only pad a reaction ("bener jg", "gelo siah", "kok gelo").
const REACTION_FILLERS = new Set([
  'euy', 'ey', 'jg', 'juga', 'sih', 'ah', 'ih', 'eh', 'oh', 'da', 'siah', 'we', 'weh', 'dong', 'atuh',
  'mah', 'deh', 'lah', 'sekali', 'banget', 'bgt', 'pisan', 'ya', 'iya', 'oiya', 'kok', 'ko', 'naha', 'knp',
]);
const normalizeWords = (text) =>
  text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/(\p{L})\1+/gu, '$1').trim().split(' ');
const isReactionOnly = (text) => {
  const words = normalizeWords(text);
  return (
    words.some((w) => REACTIONS.has(w)) &&
    words.every((w) => REACTIONS.has(w) || REACTION_FILLERS.has(w) || isLaughOnly(w))
  );
};
// Real WhatsApp tags are wrapped in U+2068/U+2069; also catch typed "@name" but not emails/URLs.
const hasMention = (body) =>
  /@⁨/.test(body) || // WhatsApp tag
  /<@!?\d+>/.test(body) || // pasted Discord tag
  /(?<![\p{L}\p{N}._%+\-/])@[\p{L}\[_~]/u.test(body); // typed @name, @[nomor], @_handle, @~contact
const isEmojiOnly = (text) => /\p{Extended_Pictographic}/u.test(text) && !/[\p{L}\p{N}]/u.test(text);
// Messages sent (in normalized form) by at least this many people are generic reactions.
const MAX_SHARED_SENDERS = 4;
const normalizeForSharing = (text) => {
  const lower = text.toLowerCase();
  const words = lower.replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/(\p{L})\1+/gu, '$1').trim();
  return words || lower.replace(/\s+/g, '');
};
const EDITED_SUFFIX = /\s*<This message was edited>$/;
const MENTION = /@⁨([^⁩]*)⁩/g;
// Indonesian phone numbers ((+62) / +62 / 628xx / 08xx) with optional separators.
const PHONE = /(?<![\w@])(?:(?:\(\+62\)|\+62)[\s-]?\d|628|08)(?:[\s-]?\d){7,11}(?!\d)/g;
// Personal mailbox providers only; custom domains (e.g. munawariz.dev) are part of the jokes.
const EMAIL = /[\w.+-]+@(?:gmail|googlemail|yahoo|ymail|outlook|hotmail|live|icloud|proton(?:mail)?)\.[\w.]+/gi;

function toIso(m) {
  let hour = Number(m[4]) % 12;
  if (m[6] === 'PM') hour += 12;
  const pad = (n) => String(n).padStart(2, '0');
  return `20${m[3]}-${pad(m[1])}-${pad(m[2])}T${pad(hour)}:${m[5]}:00`;
}

function sanitize(text) {
  return text
    .replace(EDITED_SUFFIX, '')
    .replace(MENTION, (_, name) => {
      const n = displayName(name);
      return /^\+?\d[\d\s-]+$/.test(n) ? '@[nomor]' : `@${n}`;
    })
    .replace(EMAIL, '[email]')
    .replace(PHONE, '[nomor]')
    .replace(/[⁨⁩‎‏]/g, '')
    .trim();
}

const lines = fs.readFileSync(input, 'utf8').split(/\r?\n/);
const raw = [];
let current = null;
for (const line of lines) {
  const m = HEADER.exec(line);
  if (!m) {
    if (current) current.body += '\n' + line;
    continue;
  }
  const rest = m[7];
  const sep = rest.indexOf(': ');
  // Lines without "sender: " are system events (joins, pins, number changes).
  current = sep === -1 ? null : { timestamp: toIso(m), sender: rest.slice(0, sep), body: rest.slice(sep + 2) };
  if (current) raw.push(current);
}

const stats = { parsed: raw.length, skipped: {} };
const skip = (reason) => (stats.skipped[reason] = (stats.skipped[reason] ?? 0) + 1);
const messages = [];
for (const r of raw) {
  const body = r.body.replace(/\s+$/, '');
  if (DROPPED_SENDERS.has(displayName(r.sender))) { skip(`sender: ${r.sender}`); continue; }
  if (SKIP_BODIES.has(body)) { skip(body); continue; }
  if (SKIP_PATTERNS.some((p) => p.test(body))) { skip('attachment/location'); continue; }
  if (body.startsWith('POLL:\n')) { skip('poll'); continue; }
  if (hasMention(body)) { skip('mention'); continue; }

  const msg = { id: messages.length + 1, sender: displayName(r.sender), timestamp: r.timestamp, text: sanitize(body) };
  if (!msg.text) { skip('empty'); continue; }
  if (isLaughOnly(msg.text)) { skip('laughter only'); continue; }
  if (isEmojiOnly(msg.text)) { skip('emoji only'); continue; }
  if (isReactionOnly(msg.text)) { skip('reaction only'); continue; }
  if (!/[\p{L}\p{N}]/u.test(msg.text)) { skip('punctuation/symbols only'); continue; }
  messages.push(msg);
}

// Second pass: drop messages that too many different people have sent.
const sendersByText = new Map();
for (const m of messages) {
  const key = normalizeForSharing(m.text);
  if (!sendersByText.has(key)) sendersByText.set(key, new Set());
  sendersByText.get(key).add(m.sender);
}
const droppedShared = new Map();
const kept = messages.filter((m) => {
  const key = normalizeForSharing(m.text);
  if (sendersByText.get(key).size <= MAX_SHARED_SENDERS) return true;
  droppedShared.set(key, (droppedShared.get(key) ?? 0) + 1);
  skip(`sent by ${MAX_SHARED_SENDERS + 1}+ people`);
  return false;
});
messages.length = 0;
kept.forEach((m, i) => messages.push({ ...m, id: i + 1 }));

const senderCounts = {};
for (const m of messages) senderCounts[m.sender] = (senderCounts[m.sender] ?? 0) + 1;
const senders = Object.entries(senderCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({ name, count }));

const result = {
  meta: {
    source: path.basename(input),
    generatedAt: new Date().toISOString(),
    timezone: 'Asia/Jakarta (timestamps are local time as exported)',
    range: { from: messages[0]?.timestamp, to: messages.at(-1)?.timestamp },
    total: messages.length,
    senders,
  },
  messages,
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(result));
console.log(`Wrote ${messages.length} messages to ${output}`);
console.log(JSON.stringify(stats, null, 2));
console.log(`Shared texts dropped: ${droppedShared.size}. Most common:`);
console.log([...droppedShared].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([t, n]) => `${t} ${n}`).join(' · '));
console.table(senders);
