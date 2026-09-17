// Most common words (and whole messages) per sender, to guide cleanup before seeding.
// Usage: node scripts/word-stats.mjs [topN]  -> prints words, writes data/word-stats.json
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const TOP = Number(process.argv[2] ?? 25);
const { messages } = JSON.parse(fs.readFileSync(path.join(root, 'data', 'messages.json'), 'utf8'));

const bump = (map, key) => map.set(key, (map.get(key) ?? 0) + 1);
const top = (map, n) => [...map].sort((a, b) => b[1] - a[1]).slice(0, n);

const bySender = new Map();
for (const m of messages) {
  let s = bySender.get(m.sender);
  if (!s) bySender.set(m.sender, (s = { total: 0, words: new Map(), texts: new Map() }));
  s.total++;
  const text = m.text.toLowerCase();
  bump(s.texts, text);
  const words = text
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\[(nomor|email)\]/g, ' ')
    .match(/[\p{L}\p{N}']+/gu) ?? [];
  for (const w of words) bump(s.words, w);
}

const report = [...bySender]
  .sort((a, b) => b[1].total - a[1].total)
  .map(([sender, s]) => ({
    sender,
    messages: s.total,
    topWords: top(s.words, 100).map(([word, count]) => ({ word, count })),
    topMessages: top(s.texts, 100).map(([text, count]) => ({ text, count })),
  }));

fs.writeFileSync(path.join(root, 'data', 'word-stats.json'), JSON.stringify(report, null, 2));
for (const r of report) {
  console.log(`\n## ${r.sender} (${r.messages})`);
  console.log(r.topWords.slice(0, TOP).map((w) => `${w.word} ${w.count}`).join(' · '));
}
