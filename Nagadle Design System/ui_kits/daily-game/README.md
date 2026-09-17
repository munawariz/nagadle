# Nagadle daily game — UI kit

A click-through recreation of the Nagadle daily quiz: one 420px column (`--width-screen`) centred on the cream page, played on phone or desktop.

Open `index.html`. Flow: **home → round (×5, lock in / next) → result → stats**, with the header mascot returning home and the chart glyph jumping to stats.

| File | What it is |
| --- | --- |
| `AppShell.jsx` | Sticky cream header — mascot + type wordmark, stats and help icon actions — plus the centred content column. |
| `HomeScreen.jsx` | Lime wave hero with the bobbing mascot, the day's pitch, primary CTA, puzzle number/date, how-it-works card. |
| `RoundScreen.jsx` | Question view: step-dot + wave-line rail, the question in a mascot speech bubble, four answer Cards (active = picked, lime = correct, cherry = wrong once locked), fact panel, lock-in button. |
| `ResultScreen.jsx` | Moss wave panel with the mascot, verdict, active streak card with share, answer dots, live countdown to the next puzzle. |
| `StatsScreen.jsx` | Tabular-numeral stat blocks, score-spread bars, streak card, archive action. |
| `data.js` | Fake puzzle + stats content. |

Everything visual comes from the design-system bundle (`Button`, `ArrowLink`, `Input`, `Card`, `Mascot`, `WavePattern`, `StepDots`, `WaveLine`, `Icon`) — no styling is re-implemented here.

Note: the source material for Nagadle was a brand kit plus the mascot, not product screens. Screen *composition* here is an honest extrapolation from that kit; every component treatment (pill buttons, card states, progress elements, wave pattern, type scale) is copied from it.
