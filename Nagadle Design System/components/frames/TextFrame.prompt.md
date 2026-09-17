Decorative headline plate in 21 pop treatments — use for puzzle titles, sticker labels, result verdicts and section headers, not for body copy or buttons.

```jsx
<TextFrame variant="overlap" accent="lime" size={28}>Play today</TextFrame>
<TextFrame variant="tape" accent="red">Sold out</TextFrame>
<TextFrame variant="circles" accent="yellow" size={22}>NAGADLE</TextFrame>
```

Notes
- One framed plate per screen region; two competing frames read as clip art.
- `accent` is the offset/decoration colour only — the plate stays white and the ink stays deep moss so contrast holds.
- Per-character variants (`diamonds`, `circles`, `separate`, `offset3d`) take short strings, ideally under 8 characters.
- All geometry scales from `size`; never override padding or border directly.
