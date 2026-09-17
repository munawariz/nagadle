The one button in the system — pill-shaped, uppercase ExtraBold label, trailing Lucide glyph, flat fill that lightens on hover and darkens on press.

```jsx
<Button onClick={submit}>Guess</Button>
<Button variant="danger" icon="x" size="sm">Remove</Button>
<Button variant="warn" icon="share-2" fullWidth>Share result</Button>
```

Notes
- `primary` (lime) is the only CTA on a cream screen; `warn` (yellow) is the CTA *on* a moss/dark card, mirroring the brand kit's active-card pairing.
- Keep labels to one or two words; the component uppercases them.
- `icon={null}` only for centred labels inside narrow columns. Never swap the glyph for an emoji.
