/* Fake content for the Nagadle daily-game recreation. */
const NAGADLE_PUZZLE = {
  number: 218,
  date: 'Thursday, 17 September',
  prompt: 'Which of these is a real Japanese wave pattern?',
  rounds: [
    { q: 'Which of these is a real Japanese wave pattern?', options: ['Seigaiha', 'Kumadori', 'Tatamiji', 'Nanohana'], answer: 0, fact: 'Seigaiha — overlapping arcs, first used on ancient maps.' },
    { q: 'A turtle in Japanese folklore lives how many years?', options: ['100', '1,000', '10,000', 'Forever'], answer: 2, fact: 'Ten thousand — cranes get a thousand, turtles get ten.' },
    { q: 'Which soup base is clearest?', options: ['Tonkotsu', 'Shio', 'Miso', 'Tantan'], answer: 1, fact: 'Shio: salt broth, barely cloudy.' },
    { q: 'Nagadle drops at which hour, everywhere?', options: ['Midnight local', '09:00 JST', 'Midnight UTC', 'Whenever'], answer: 0, fact: 'Midnight, your clock. Everyone gets the same five.' },
    { q: 'What ends a Nagadle streak?', options: ['One wrong answer', 'A missed day', 'Two missed days', 'Nothing'], answer: 1, fact: 'Miss a day and the streak resets. Wrong answers just cost points.' },
  ],
};

const NAGADLE_STATS = {
  played: 96,
  winRate: 84,
  streak: 12,
  best: 31,
  distribution: [
    { label: '5/5', count: 41 },
    { label: '4/5', count: 28 },
    { label: '3/5', count: 14 },
    { label: '2/5', count: 8 },
    { label: '1/5', count: 3 },
    { label: '0/5', count: 2 },
  ],
};

Object.assign(window, { NAGADLE_PUZZLE, NAGADLE_STATS });
