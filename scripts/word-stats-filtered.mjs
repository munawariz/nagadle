// Top *meaningful* words per sender: drops particles/function words, fillers and laughter.
// Usage: node scripts/word-stats-filtered.mjs [topN]
//   -> prints per-sender top words + signature words, writes data/word-stats-filtered.json
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const TOP = Number(process.argv[2] ?? 20);
const messages = JSON.parse(fs.readFileSync(path.join(root, 'data', 'messages.json'), 'utf8')).messages.filter((m) => m.quiz);

// Function words: pronouns, particles, conjunctions, prepositions, auxiliaries, discourse markers.
// Indonesian + the common chat spellings, plus the Sundanese the group mixes in.
const FUNCTION_WORDS = `
di ke dari pada untuk buat sama dengan dgn oleh tentang soal kepada terhadap dalam atas
yang yg yng nya ny itu ini nih tuh eta si sang para
dan atau tapi tp tetapi namun karena krn soalnya sebab jadi jd maka kalau kalo klo kl
jika bila ketika saat pas sambil sedangkan padahal meski walau supaya biar agar sampai sampe
hingga kecuali selain seperti kaya kayak kyk spt bagai macam
aku ku saya sy gue gw gua urang urg urng abdi kuring kamu km kmu lu lo elu anda maneh mnh sia
dia dya beliau mereka kita kami kalian nu mu
ada ga gak nggak ngga engga enggak gaada gada tidak tdk tak teu ora bukan bkn belum blm belom
sudah sdh udah udh uda telah masih msh masi lagi lg akan bakal bakalan mau pengen pingin ingin
bisa bs gabisa dapat boleh harus mesti perlu wajib sok
apa apaan siapa sapa kenapa knp napa naha mengapa mana dimana kemana gimana gmn bagaimana
kapan berapa brp brapa kok koq ko kah kan sih deh dong ya yah iya yaa yup oke ok okay sip
aja ajah wae doang mah teh atuh euy weh geuning cenah cnah da ge oge juga jg pun lah loh lho
lagian malah justru trs lalu kemudian abis habis
sangat banget bgt bener beneran emang emg emgnya memang gitu gtu begitu begini gini
mungkin pasti tentu kayaknya kyknya sepertinya keknya kek meren mereun
saja pula serta bahwa yaitu yakni adalah ialah merupakan
lebih paling kurang cukup agak rada sedikit banyak loba semua seluruh setiap tiap
satu dua tiga empat lima enam tujuh delapan sembilan sepuluh
sini situ sana sono dieu ditu
`.trim().split(/\s+/);

// English function words -- the group pastes English articles, docs and song lyrics.
const ENGLISH = `
the a an and or but if then than that this these those there here
is am are was were be been being do does did done have has had
i you he she it we they me him her us them my your his its our their
to of in on at by for from with without about into over under as
not no yes so just can could will would should may might must
what when where why how who which all any some more most very too
`.trim().split(/\s+/);

// Ubiquitous discourse adverbs: near the top for everyone, so they say nothing about a person.
const ADVERBS = `
dulu duluh nanti tadi tdi sekarang skarang skrg skrng kemarin kmaren kmrn berarti brati
langsung terus biasanya baru lain kali cuman cuma pernah lama sekali
`.trim().split(/\s+/);

// Laughter, interjections, typing noise -- the "unmeaningful" words.
const FILLERS = `
ah aah ahh eh ehh oh ooh ohh hm hmm hem heum euh uh uhh um umm aduh duh ih iih idih
astaga asli anjir anjay anjrit anjer njir jir gelo edan cok yaelah elah waduh
heh hah nah neh noh deih
okee okeh siap mantap mantul
image omitted sticker gif audio video media pesan dihapus this message was deleted
`.trim().split(/\s+/);

const STOP = new Set([...FUNCTION_WORDS, ...ENGLISH, ...ADVERBS, ...FILLERS]);

// Laughter has endless spellings: wkwkwk, awokwokwok, awowkwkwk, kwkw, hihihaha, xixixi.
const isLaugh = (w) =>
  (/^[awkoh]+$/.test(w) && w.includes('w') && w.length >= 4
    && ((w.match(/k/g)?.length ?? 0) >= 2 || (w.match(/w/g)?.length ?? 0) >= 2))
  || /^(ha|he|hi|ho|hu){2,}h?$/.test(w) || /^(xi|ix){2,}x?$/.test(w);

// Junk: too short, mostly digits (ids, timestamps, hashes), or one letter held down.
const isJunk = (w) =>
  w.length < 3 || (w.match(/\d/g)?.length ?? 0) * 2 > w.length || /^(.)\1+$/.test(w);

const keep = (w) => !STOP.has(w) && !isLaugh(w) && !isJunk(w);

const bump = (map, key) => map.set(key, (map.get(key) ?? 0) + 1);
const top = (map, n) => [...map].sort((a, b) => b[1] - a[1]).slice(0, n);

const bySender = new Map();
const corpus = new Map();          // word -> count across everyone
let corpusTotal = 0;

for (const m of messages) {
  let s = bySender.get(m.sender);
  if (!s) bySender.set(m.sender, (s = { messages: 0, tokens: 0, words: new Map() }));
  s.messages++;
  const words = m.text.toLowerCase()
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\[(nomor|email)\]/g, ' ')
    .match(/[\p{L}\p{N}']+/gu) ?? [];
  for (const w of words) {
    if (!keep(w)) continue;
    s.tokens++;
    bump(s.words, w);
    bump(corpus, w);
    corpusTotal++;
  }
}

// Signature word: used far more often (per word written) by this person than by everyone else,
// with a floor on the count so one-off typos can't win.
const signature = (s) => [...s.words]
  .filter(([, c]) => c >= Math.max(5, s.tokens / 5000))
  .map(([w, c]) => {
    const mine = c / s.tokens;
    const theirs = (corpus.get(w) - c) / (corpusTotal - s.tokens);
    return { word: w, count: c, ratio: mine / (theirs || 1 / corpusTotal) };
  })
  .sort((a, b) => b.ratio - a.ratio);

const report = [...bySender]
  .sort((a, b) => b[1].messages - a[1].messages)
  .map(([sender, s]) => ({
    sender,
    messages: s.messages,
    words: s.tokens,
    topWords: top(s.words, 100).map(([word, count]) => ({ word, count })),
    signatureWords: signature(s).slice(0, 30)
      .map((x) => ({ word: x.word, count: x.count, xGroupRate: Number(x.ratio.toFixed(1)) })),
  }));

fs.writeFileSync(path.join(root, 'data', 'word-stats-filtered.json'), JSON.stringify(report, null, 2));
for (const r of report) {
  console.log(`\n## ${r.sender} — ${r.messages.toLocaleString()} messages`);
  console.log('top:  ' + r.topWords.slice(0, TOP).map((w) => `${w.word} (${w.count})`).join(' · '));
  console.log('sig:  ' + r.signatureWords.slice(0, 10).map((w) => `${w.word} ${w.xGroupRate}x`).join(' · '));
}
