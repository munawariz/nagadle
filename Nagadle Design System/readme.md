# Nagadle Design System

Nagadle is a **daily quiz game**: five questions, one drop a day, a streak you can lose. The brand is loud, rounded and flat — Japanese-graphic-design energy (wave patterns, chunky rounded lettering, saturated flat fills) with a deadpan green turtle as the mascot.

## Sources this system was built from

Two files were supplied; there was no codebase, Figma file or deck.

| Source | Role |
| --- | --- |
| `uploads/3153c80cb5b29402b4736eaf85e28f67.jpg` (kept at `assets/reference-brandkit.jpg`) | **Hard reference.** A one-page UI style sheet for an unrelated ramen product ("oishii"): type scale, colour swatches, inputs, card active/inactive, pill buttons with hover/clicked states, progress-bar elements, wavy progress line, links, seigaiha wave pattern. Every component treatment in this system is copied from it. |
| `uploads/file.jpg` (cut out to `assets/mascot-nagadle.png`) | **The mascot.** A lime-green turtle with a human face. Also the source of the palette: the reference kit's royal blue (`#1820EF`) is replaced everywhere by mascot lime (`#BCD147`) and moss (`#494F21`, `#6E823B`). |

Carried over from the reference kit unchanged: Cherry Red `#FF4E42`, Burgundy `#832626`, Yellow Ramen `#FFC024`, Vanilla cream `#FAFAED`, Black `#000000`, and the typeface RoundedMplus1c.

**No logo was supplied.** Wherever a mark belongs, the name is set in type — lowercase `nagadle` in M PLUS Rounded 1c Black — optionally beside the mascot (see the "Lockup" card). Nothing has been drawn or reconstructed.

## Products

One product: the **daily game**, a single-column web app played on phone or desktop (`ui_kits/daily-game/`). Home, round, result and stats screens. No marketing site, docs site or admin surface was provided, so none is recreated here.

---

## CONTENT FUNDAMENTALS

The voice is a friend who runs the pub quiz: short, dry, never cheerful about it.

- **Sentence case everywhere** except button labels and small meta labels, which are UPPERCASE with +8% tracking (`Share result` renders as `SHARE RESULT`). Headings are sentence case, not Title Case.
- **The wordmark is always lowercase**: `nagadle`. Never "Nagadle" in the mark, never all-caps.
- **Second person, mostly implied.** "Play today", "Your record", "Come back tomorrow". The product says "you"; it does not say "we" and never says "I".
- **Short declaratives, full stops.** "Five questions. One a day." / "So close." / "Miss a day and the streak resets." Fragments are fine. Exclamation marks are rare — at most one per screen, and only in a win state.
- **Numbers are numerals and they are the point**: `12`, `4/5`, `#218`, `04:31`. Set in tabular figures (`.ngd-numeric`). Don't spell them out in UI.
- **Verdict copy is two or three words**: "Clean sweep." / "So close." / "Not bad." / "Rough one." Never "Congratulations!" and never a participation trophy.
- **Errors state the fact, no apology, no "please"**: "Not a valid answer", "Error message", "Already guessed". 12px ExtraBold cherry red.
- **Placeholders are examples, not instructions**: "Type a name", not "Please enter your guess".
- **No emoji, anywhere.** Not in copy, not in share strings, not as icons. The mascot carries all the personality the product needs.
- **Nothing gamified-cute**: no "Nice job, quiz master!", no streak-guilt ("Don't lose your streak!!"). State what happened and what is next: "Come back tomorrow before midnight and it keeps going."

Example screen, end to end:

> **Five questions. One a day.**
> Answer today's five before midnight. Keep the streak, feed the turtle.
> `PLAY TODAY →`  ·  #218 · Thursday, 17 September

---

## VISUAL FOUNDATIONS

**Colour.** Cream (`#FAFAED`) page, white cards, black text — the reference kit's ground. One saturated accent per purpose: lime = actions and correct answers, cherry red = destructive and wrong, ramen yellow = progress and the CTA *on* dark surfaces, deep moss = active/selected fills and inverted panels. Two background colours per screen, maximum (cream + one wave band). No tints of tints: use the token, not `color-mix`. Approved ink pairings are on the "Ink pairings" card — black on lime/yellow, cream on moss, white on cherry (headline scale only).

**Type.** One family, three weights: M PLUS Rounded 1c **Black 900** (wordmark 160px, display 32px, headings 20px), **ExtraBold 800** (labels, prices, values, button text, error text), **Medium 500** (all body copy, 16/14px, line-height 1.5). Wordmark tracking −3%; uppercase labels +8%. Nothing below 12px. No italics, no third typeface, no serif.

**Spacing & layout.** 4px base step. Card padding 24, title↔copy 12, sibling controls 16, screen sections 40. The game is a fixed 420px column (`--width-screen`) centred on cream; the header is the only sticky element and it sits on cream with a 1px stone rule — no blur, no floating toolbars, no bottom nav. Body copy caps at 46 characters.

**Backgrounds.** Flat colour, or the seigaiha **wave pattern** — the kit's only decoration. Two-tone and tonal (lime on lime, moss on moss), never contrasty, never faded out. One wave band per screen, full-bleed within its rounded container, behind the mascot or a result panel. **No gradients at all** — not in buttons, not in backgrounds, not as overlays. No photography was supplied; if imagery is ever added it should be warm, saturated and flat-graphic, never desaturated or grainy. No noise textures, no glassmorphism, no blur.

**Cards.** 10px radius, white fill, soft downward moss shadow (`0 6px 18px rgba(73,79,33,.10)`), **no border**. Hover on an interactive card deepens the shadow only (`--shadow-card-hover`) — no lift, no scale. Selected/active cards go solid deep moss with cream ink and drop the shadow entirely (straight from the kit's "Card – Active"). Non-card panels (fact strips, countdown rows) use `--surface-tile` lime-100 with no shadow.

**Buttons.** Always a full pill (`--radius-pill`), 44px tall (34px `sm`), flat fill, no border, uppercase ExtraBold label left, glyph right, wide gap between. Hover = lighter fill + a soft coloured glow (`0 6px 20px` of the fill at ~50%). Press = darker fill, no movement, no scale. Disabled = stone-300 fill, muted ink. The glyph often differs in colour from the label (yellow arrow on cherry, moss arrow on lime) — that contrast is part of the kit.

**Fields.** 8px radius, 2px stroke, white fill. Idle stone-300 → focus deep moss → error cherry red, transitioning colour only (180ms). Label above in 14px ExtraBold; error below in 12px ExtraBold cherry with a `circle-x` glyph. Focus-visible anywhere else is a 2px moss outline, 2px offset.

**Progress.** Dots: faint 2px ring (upcoming), 3px yellow ring (current), filled yellow with a white check (done), joined by the kit's wavy line — tan ahead, yellow behind. Never a percentage bar, never a spinner.

**Borders & shadows.** Strokes are structural (fields, dots, the header rule); shadows are only ever soft, downward and moss-tinted. No inner shadows, no coloured outlines on cards, no rounded-corner-plus-left-accent-border cards.

**Radii.** 6 small, 8 fields, 10 cards/tiles, 16 sheets, pill for anything you click. Nothing is a sharp rectangle except full-bleed wave bands inside rounded containers.

**Transparency & blur.** Effectively unused. Opacity is allowed only to retire a resolved element (dimming the answers you didn't pick, at 0.45). Never translucent panels, never backdrop blur, never protection gradients — if text needs to sit on a busy surface it gets a Card or a moss chip instead.

**Motion.** Short and flat: 120ms for hover/press colour, 180ms for enter/focus, 320ms for reveals and sheets, `cubic-bezier(.2,.8,.2,1)` for everything. One spring (`--ease-pop`) reserved for the mascot and result reveals. Sequential reveals stagger 60ms. The mascot's idle bob (2.4s, ±6px, ±1°) is the only looping animation in the system. No parallax, no confetti, no bouncing buttons; everything honours `prefers-reduced-motion`.

---

## ICONOGRAPHY

- **The brand's own art is illustration, not iconography.** The reference kit's food icons (salt shaker, ramen bowl, noodles) are flat two-colour drawings; they exist only as raster art inside the reference JPG, so they could **not** be extracted and are **not** part of this system. If the real vector set exists, send it and it will be added. Nothing was redrawn.
- **The mascot is the one illustration asset** (`assets/mascot-nagadle.png` + square and 128px crops). One per screen, used as supplied.
- **UI glyphs are Lucide** — *a flagged substitution*, chosen because its 2px rounded-cap stroke is the closest CDN match to the kit's chunky rounded arrows. Delivered through the `Icon` component, loaded from `https://unpkg.com/lucide-static@latest/icons/<name>.svg` as a CSS mask so glyphs inherit `currentColor`.
- In-product set: `arrow-right`, `arrow-left`, `x`, `check`, `circle-x`, `share-2`, `flame`, `calendar-days`, `chart-column`, `circle-help`, `clock`, `copy`. 16px inline, 20px in buttons, 24px+ standalone.
- **No emoji as icons, ever.** No icon fonts, no PNG icons, no unicode arrows in text (`→` typed into copy) — always the `Icon` component.
- Icons never appear alone as the primary action except in the header (stats, help), where they get a 40px pill hit area.

---

## Index

Root files
- `styles.css` — the single entry point consumers link; `@import`s only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `fonts.css` (webfont), `base.css` (resets, type helpers, `.ngd-pattern`).
- `assets/` — `mascot-nagadle.png`, `mascot-nagadle-square.png`, `mascot-icon-128.png`, `reference-brandkit.jpg`.
- `thumbnail.html`, `SKILL.md`, `readme.md`.

Components — `window.NagadleDesignSystem_bb132e.<Name>`; each has a `.d.ts` contract and a `.prompt.md` usage note.
- `components/actions/` — **Button**, **ArrowLink**
- `components/forms/` — **Input**
- `components/surfaces/` — **Card**, **Mascot**, **SpeechBubble**, **WavePattern**
- `components/progress/` — **StepDots**, **WaveLine**
- `components/frames/` — **TextFrame** (21 pop-style headline frame treatments)
- `components/icon/` — **Icon**

Intentional additions (not in the reference kit, added with reason)
- **Icon** — the kit shows arrows and Xs but ships no glyph set; this wraps the substituted Lucide set so the substitution stays in one place.
- **Mascot** — the mascot was supplied separately from the kit and needs one sanctioned way to be placed.
- **WavePattern** — the kit shows the wave as a swatch; this makes it a surface component so it is used consistently.
- **SpeechBubble** — the mascot needed a sanctioned way to talk; holds the question on the round screen and verdict lines on the result screen.
- **TextFrame** — requested pop-style decorative headline frames (overlap, stroke, 3D box, inner rule, dotted/striped shadow, sticky note, pill, masking tape, memo pad, fold, ribbon, flag, browser chrome, pixel, pin, clip, and four per-character treatments), rebuilt from a supplied Japanese "pop text frame" reference sheet in Nagadle colours: white plate, deep-moss stroke and ink, one lime/cherry/yellow/moss offset. Geometry only — borders, clip-path and gradients, no imagery.

Foundations — `guidelines/*.card.html`, shown in the Design System tab under Colors, Type, Spacing and Brand (19 cards: brand greens, neutrals, accents, answer states, ink pairings, wordmark, display, body, labels, numerals, spacing scale, spacing in use, radii, shadows, strokes, mascot, lockup, wave pattern, motion).

UI kit — `ui_kits/daily-game/` (see its README): `index.html` runs the interactive home → round → result → stats flow.

Template — `templates/daily-round/` : a ready-to-edit round screen for new designs.

## Caveats

- The reference kit's food illustrations are raster-only and were not reproduced. Icon glyphs are a flagged Lucide substitution.
- No font binaries were supplied; M PLUS Rounded 1c is loaded from Google Fonts (it is the same typeface as the kit's "RoundedMplus1c"). Drop `.woff2` files into `assets/fonts/` and swap `tokens/fonts.css` to self-host.
- Screen composition in the UI kit is extrapolated from the brand kit — no Nagadle product screens were provided.
